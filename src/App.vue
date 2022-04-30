<template>
  <div id="app">
    <keep-alive include="Layout,MovieDetail">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>


<style lang="scss">
.skeleton-animation {
  height: 100%;
  animation: skeleton 1.3s ease-in-out infinite alternate;
}
@keyframes skeleton {
  from {
    opacity: 0.35;
  }
  to {
    opacity: 0.96;
  }
}

.summary {
  font-size: 28px;
  line-height: 1.6;
  text-align: justify;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.m-rate__content {
  margin-right: 6px !important;
}

.overflow-hidden {
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.layer-enter-active,
.layer-leave-active {
  transition: all 0.3s;
}
.layer-enter,
.layer-leave-to {
  transform: translateY(100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s;
}
.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s;
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>