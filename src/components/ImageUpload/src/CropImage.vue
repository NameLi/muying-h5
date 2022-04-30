<template>
  <div class="camera">
    <div class="camera-photo">
      <img id="image" ref="img" :src="img" />
    </div>

    <div class="tool">
      <m-button type="info" size="small" @click="cancle()">取 消</m-button>
      <m-button type="primary" size="small" @click="clipImage()"
        >保 存</m-button
      >
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

export default {
  name: "CropImage",
  props: {
    img: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      cropper: null,
      imgUrl: "",
    };
  },

  watch: {
    img(val) {
      console.log(val);

      if (val === "" && this.cropper) {
        this.cropper.destroy();
      }

      if (!this.cropper) {
        this.initCropper();
      } else {
        if (val) {
          this.cropper.replace(val);
        }
      }
    },
  },

  mounted() {
    this.initCropper();
  },

  methods: {
    // 初始化裁剪
    initCropper() {
      this.$nextTick(() => {
        this.cropper = new Cropper(this.$refs.img, {
          aspectRatio: 1 / 1,
          viewMode: 1,
          guides: true, // 裁剪框的虚线(九宫格)
          autoCropArea: 1,
          zoomable: true,
          zoomOnTouch: true,
          initialAspectRatio: 0.9,
          // dragMode: 'move',
          // cropBoxMovable: false,
          minCropBoxWidth: 200,
        });
      });
    },

    // 取消
    cancle() {
      this.$router.back();
    },

    // 裁剪图片
    clipImage() {
      this.$nextTick(() => {
        let canvas = this.cropper.getCroppedCanvas({
          maxWidth: 300,
          maxHeight: 300,
        });

        canvas.toBlob((blob) => {
          this.$emit("on-change", blob);
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.camera {
  background: #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  bottom: 0;
  .camera-photo {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
    #image {
      max-width: 100%;
    }
  }
  .tool {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    .m-button {
      flex: 1;
      margin: 0 20px;
    }
  }
}
</style>