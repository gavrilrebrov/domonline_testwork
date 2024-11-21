const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: `@import "@/sass/variables.sass";`, // Путь к вашему файлу с переменными
  //     },
  //   },
  // },
});
