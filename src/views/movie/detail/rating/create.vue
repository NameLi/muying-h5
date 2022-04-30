<template>
  <page half round title="我的评分">
    <template v-slot:header-left>
      <m-icon name="close" :size="32" @click="$router.back()" />
    </template>

    <template v-if="!readonly" v-slot:headerRight>
      <div class="create-btn" @click="createUserMovieRating()">发布</div>
    </template>

    <div class="rate-content">
      <div class="rate-score">{{ rating }}</div>

      <div class="rate">
        <m-rate
          :readonly="readonly"
          v-model="form.rating"
          allow-half
          :size="60"
          :step="2"
          :max="10"
        />
      </div>
      <div class="form">
        <div class="field-item">
          <textarea
            :readonly="readonly"
            v-model.trim="form.content"
            maxlength="200"
            placeholder="分享你的观后感（选填）"
          />
          <div class="field-word-count">{{ contentCount }}/200</div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
import { createUserMovieRating } from "@/api/user";

export default {
  name: "RateCreate",

  props: ["id", "movie"],

  data() {
    return {
      form: {
        rating: 0,
        content: "",
      },
    };
  },

  computed: {
    readonly() {
      return this.$route.query.type === "edit";
    },
    contentCount() {
      return this.form.content.length || 0;
    },
    rating() {
      const rating = this.form.rating;
      return rating ? `${rating}.0` : "";
    },
  },

  mounted() {
    this.$preventScroll(true);
    if (this.movie && this.movie.my_rating) {
      this.form.rating = Number(this.movie.my_rating.rating);
      this.form.content = this.movie.my_rating.content;
    }
  },

  beforeDestroy() {
    this.$preventScroll(false);
  },

  methods: {
    async createUserMovieRating() {
      if (this.form.rating === 0) {
        this.$toast("请选择评分");
        return;
      }

      if (this.loading) return;

      if (this.form.rate === 0) {
        this.$message.warning("请选择评分");
        return;
      }

      const toast = this.$toast({
        message: "保存中",
        type: "loading",
        duration: 0,
        mask: true,
      });

      this.loading = true;
      let res = await createUserMovieRating(this.id, this.form);
      this.loading = false;

      toast.close();

      if (res.code === 200) {
        this.$toast({
          position: "top",
          message: "发布成功",
        });

        this.$emit("ratingChange");

        this.$router.back();
      } else {
        this.$toast(res.message);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.m-icon {
  color: $color-theme;
}
.create-btn {
  font-size: 28px;
  color: $color-theme;
}
.rate-content {
  .rate-score {
    margin-top: 20px;
    text-align: center;
    font-size: 28px;
    line-height: 60px;
    height: 60px;
    color: $color-theme;
  }
  .rate {
    margin-top: 10px;
    text-align: center;
  }
  .form {
    margin-top: 60px;
    .field-item {
      position: relative;
      margin: 0 30px;
      padding: 20px 0;
      textarea {
        padding: 20px;
        width: 100%;
        border: 1px solid #e5e5e5;
        border-radius: 12px;
        &::-webkit-input-placeholder {
          color: rgb(197, 197, 197);
        }
      }

      textarea {
        min-height: 200px;
        line-height: 1.5;
      }
      .field-word-count {
        position: absolute;
        right: 20px;
        bottom: 40px;
        color: rgb(197, 197, 197);
      }
    }
  }
}
</style>