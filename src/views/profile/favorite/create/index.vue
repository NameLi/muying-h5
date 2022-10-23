<template>
  <page half round z-index="99" title="新建收藏夹">
    <template v-slot:headerLeft>
      <m-icon name="close" :size="32" @click="$router.back()" />
    </template>

    <template v-slot:headerRight>
      <div class="create-btn" @click="createUserFavorite()">创建</div>
    </template>

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
          <textarea
            v-model.trim="form.brief"
            maxlength="200"
            placeholder="请输入收藏夹描述（选填）"
          />
          <div class="field-word-count">{{ briefCount }}/200</div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import { createUserFavorite } from "@/api/user";

export default {
  name: "CreateFavorite",
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
      return this.form.name.length || 0;
    },
    briefCount() {
      return this.form.brief.length || 0;
    },
  },

  methods: {
    async createUserFavorite() {
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
      const { code, data } = await createUserFavorite(this.form);
      this.loading = false;

      toast.close();

      if (code === 200) {
        this.$toast({
          position: "top",
          message: "创建成功",
        });

        this.$emit("on-create");

        this.$router.back();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.m-icon {
  color: $color-theme;
  padding: 0 10px;
}
.create-btn {
  font-size: 28px;
  color: $color-theme;
  padding: 0 10px;
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
    }
  }
}
</style>