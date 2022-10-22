<template>
  <page>
    <header-bar title="个人资料" />

    <div class="main">
      <m-cell-group border>
        <m-cell title="头像">
          <image-upload :src="user.avatar" @on-change="submitAvatar" />
        </m-cell>
        <m-cell title="用户名" :value="user.username" @click="showUsername" />
      </m-cell-group>

      <m-cell-group border class="group-two">
        <m-cell title="手机号" :value="user.phone" />
        <m-cell
          title="性别"
          :value="user.gender"
          @click="isShowGender = true"
        />
        <m-cell title="生日">
          <input
            type="date"
            v-model="user.birthday"
            min="1980-01-01"
            max="2021-01-01"
            @change="birthdayChange"
            class="birthday"
          />
        </m-cell>
      </m-cell-group>
    </div>

    <!-- 姓名 -->
    <m-modal
      title="编辑用户名"
      :visible="isShowUsername"
      @cancel="isShowUsername = false"
      @confirm="usernameModalConfirm"
    >
      <div class="username-content">
        <input
          v-model.trim="username"
          placeholder="请输入用户名"
          ref="username"
          class="username"
        />
        <span class="count">{{ username.length }}/10</span>
      </div>
    </m-modal>

    <!-- 性别 -->
    <m-action-sheet
      show-cancel
      :visible="isShowGender"
      :actions="genders"
      @cancel="isShowGender = false"
      @click="handleClickItem"
    />
  </page>
</template>

<script>
import { mapGetters } from "vuex";
import { updateUserInfo } from "@/api/user";

export default {
  name: "Information",

  data() {
    return {
      isShowUsername: false,
      isShowGender: false,
      username: "",
      genders: [
        {
          name: "保密",
        },
        {
          name: "男",
        },
        {
          name: "女",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      user: "user/getUser",
    }),
  },

  methods: {
    // 封面图片变更
    submitAvatar(url) {
      this.user.avatar = url;
      this.updateUserInfo();
    },

    // 姓名
    showUsername() {
      this.username = this.user.username;
      this.isShowUsername = true;

      this.$nextTick(() => {
        this.$refs.username.focus();
      });
    },

    // 保存用户名
    usernameModalConfirm() {
      if (this.username.length === 0) {
        this.$message.warning("请输入用户名");
        return;
      }
      if (this.username.length > 10) {
        this.$message.warning("用户名不能超过10个字符");
        return;
      }

      this.user.username = this.username;
      this.updateUserInfo();

      this.isShowUsername = false;
    },

    // 性别
    handleClickItem(index) {
      this.user.gender = this.genders[index].name;
      this.updateUserInfo();

      this.isShowGender = false;
    },

    // 生日
    birthdayChange(value) {
      this.updateUserInfo();
    },

    // 更新用户信息
    async updateUserInfo() {
      let params = this.user;

      this.submitLoading = true;
      let res = await updateUserInfo(params);
      this.submitLoading = false;

      if (res.code === 200) {
        this.$store.commit("user/SET_USER", Object.assign({}, this.user));
        this.$toast("更新成功");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  background-color: #f5f5f5;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 4px;
  }
  .group-two {
    margin-top: 20px;
  }
  .birthday {
    width: 100%;
    height: 40px;
    font-size: 28px;
    color: #999;
    border: 0;
    background-color: #fff;
    &::-webkit-inner-spin-button {
      display: none;
    }
    &::-webkit-calendar-picker-indicator {
      display: none;
      visibility: hidden;
    }
    &::-webkit-clear-button {
      display: none;
      visibility: hidden;
    }
  }
}
.upload-input {
  display: none;
}
.username-content {
  position: relative;
  .username {
    padding: 0 20px;
    width: 100%;
    height: 72px;
    line-height: 72px;
    border: 1px solid #e5e5e5;
    font-size: 28px;
    border-radius: 4px;
  }
  .count {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 20px;
    color: #999;
    height: 72px;
    line-height: 70px;
    font-size: 24px;
  }
}
</style>