<template>
  <div class="upload-container">
    <div class="avatar-wrapper" @click="chosenFileHandle">
      <img class="avatar" v-if="src" :src="src" />
    </div>

    <!-- 头像图片选择 -->
    <input
      type="file"
      name="file"
      accept="image/*"
      ref="fileInput"
      class="upload-input"
      @change="fileChangeHandle"
    />

    <!-- 头像上传 -->
    <div class="avatar-modal" v-if="isShowCrop">
      <div class="crop-image">
        <crop-image
          ref="cropImage"
          @on-change="submitAvatar"
          :img="avatarImg"
        />
      </div>
      <span slot="footer">
        <m-button @click="isShowAvatar = false">取 消</m-button>
        <m-button type="primary" @click="cropImage()" :loading="uploading"
          >确 定</m-button
        >
      </span>
    </div>
  </div>
</template>

<script>
import { getQiniuUpToken } from "@/api/common";
import * as qiniu from "qiniu-js";
import CropImage from "./CropImage";
import { FILE_DOMAIN } from "@/config";

export default {
  name: "ImageUpload",

  components: {
    CropImage,
  },

  props: {
    src: {
      type: String,
    },
  },

  data() {
    return {
      isShowAvatar: false,
      avatarImg: null,
      uploading: false,
    };
  },

  computed: {
    isShowCrop() {
      return this.$route.hash === "#avatar";
    },
  },

  methods: {
    // 触发选择文件事件
    chosenFileHandle() {
      this.avatarImg = "";

      let evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      this.$refs.fileInput.dispatchEvent(evt);
    },

    // 选择图片
    fileChangeHandle(evt) {
      if (!evt.target.files || !evt.target.files[0]) return;

      const file = evt.target.files[0];

      if (file.size > 1024 * 1024 * 10) {
        this.$message.warning("头像图片不能超过 10MB");
        return;
      }

      if (file.size < 1024 * 2) {
        this.$message.warning("头像图片不能小于 2KB");
        return;
      }

      let url = URL.createObjectURL(file);

      let img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
      };

      this.isShowAvatar = true;

      this.avatarImg = url;

      this.$router.push("#avatar");
    },

    cropImage() {
      this.$refs.cropImage.clipImage();
    },

    submitAvatar(file) {
      this.handleInsertImg(file);
    },

    // 头像上传
    async handleInsertImg(file) {
      this.uploading = true;

      let res = await getQiniuUpToken();

      if (res.code === 200) {
        const token = res.data;
        const key = null;
        const putExtra = {
          fname: "",
          params: {},
          mimeType: ["image/png", "image/jpeg", "image/gif"],
        };
        const config = {
          useCdnDomain: true, //使用cdn加速
        };
        const observable = qiniu.upload(file, key, token, putExtra, config);

        observable.subscribe({
          next: (result) => {
            // 主要用来展示进度
            // console.warn(result);
          },
          error: () => {
            this.$message.danger("上传图片失败");
            this.uploading = false;
          },

          complete: (res) => {
            let url = `${FILE_DOMAIN}/${res.key}@avatar`;
            this.isShowAvatar = false;

            this.uploading = false;

            this.$emit("on-change", url);

            this.$router.back();
          },
        });
      } else {
        this.uploading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.avatar-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 4px;
  }
}

.upload-input {
  display: none;
}
</style>