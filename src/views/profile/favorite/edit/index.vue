<template>
  <div class="save-container">
    <div class="save-header">
      <div class="back-btn">
        <m-icon name="close" :size="32" @click="$router.back()" />
      </div>
      <h6 class="save-title">编辑收藏夹</h6>
      <div class="create-btn" @click="updateUserFavorite()">保存</div>
    </div>

    <div class="save-content">
      <div class="form">
        <div class="field-item">
          <input
            v-model.trim="form.name"
            maxlength="20"
            placeholder="请输入收藏夹名称"
          />
          <div class="field-word-count">{{ nameCount }}/20</div>
        </div>
        <div class="field-item">
          <div
            @input="inputChange"
            contenteditable
            ref="input"
            class="content"
            autosize
            placeholder="请输入收藏夹描述（选填）"
          ></div>

          <!-- <textarea
            v-model.trim="form.brief"
            maxlength="100"
            placeholder="请输入收藏夹描述（选填）"
          /> -->
          <div class="field-word-count">{{ briefCount }}/100</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserFavorite } from "@/api/user";

export default {
  name: "UpdateFavorite",

  props: {
    id: {
      required: true,
    },
    favorite: {
      type: Object,
    },
  },

  data() {
    return {
      form: {
        name: "",
        brief: "",
      },
    };
  },

  computed: {
    nameCount() {
      return this.form.name?.length || 0;
    },
    briefCount() {
      return this.form.brief?.length || 0;
    },
  },

  watch: {
    favorite: {
      handler(val) {
        this.form = Object.assign({}, val);
      },
      deep: true,
    },
  },

  mounted() {
    this.form = Object.assign({}, this.favorite);
  },

  methods: {
    inputChange(event) {
      this.form.brief = event.target.innerHTML;
    },

    async updateUserFavorite() {
      if (this.loading) return;

      if (this.form.name === "") {
        this.$message.warning("请输入收藏夹名称");
        return;
      }

      const toast = this.$toast({
        message: "保存中",
        type: "loading",
        duration: 0,
        mask: true,
      });

      this.loading = true;
      let res = await updateUserFavorite(this.id, this.form);
      this.loading = false;

      toast.close();

      if (res.code === 200) {
        this.$emit("on-change", this.form);

        this.$toast({
          position: "top",
          message: "保存成功",
        });
        this.$router.back();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.save-container {
  z-index: 99;
  position: fixed;
  left: 0;
  top: 100px;
  right: 0;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  .save-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 88px;
    .save-title {
      font-weight: bold;
      font-size: 28px;
    }
    .back-btn {
      width: 90px;
    }
    .m-icon {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: $color-theme;
    }
    .create-btn {
      color: $color-theme;
      padding: 0 20px;
    }
  }
  .save-content {
    .form {
      .field-item {
        position: relative;
        margin: 0 30px;
        padding: 20px 0;
        input,
        textarea {
          width: 100%;
          border: none;
          border-bottom: 1px solid #e5e5e5;
          &::-webkit-input-placeholder {
            color: rgb(197, 197, 197);
          }
        }
        input {
          height: 92px;
          line-height: 92px;
        }
        textarea {
          min-height: 92px;
          line-height: 1.5;
        }
        .field-word-count {
          position: absolute;
          right: 0;
          bottom: 46px;
          color: rgb(197, 197, 197);
        }
        .content {
          outline:none;
          min-height: 92px;
          line-height: 1.5;
          border-bottom: 1px solid #e5e5e5;
          &:empty::after {
            content: attr(placeholder);
            color: #ccc;
            font-size: 28px;
          }
        }
      }
    }
  }
}
</style>