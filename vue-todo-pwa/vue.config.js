const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxOptions: {
      // 프리 캐시할 파일을 지정
      include: [
        /^index\.html$/,
        /\.css$/,
        /\.js$/,
        /^manifest\.json$/,
        /\.png$/,
      ],
      exclude: [],
    },
  },
});
