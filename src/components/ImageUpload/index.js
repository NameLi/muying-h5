import ImageUploadComponent from './src/index.vue';

const ImageUpload = {
  install: function (Vue) {
    Vue.component('ImageUpload', ImageUploadComponent)
  }
}

export default ImageUpload;