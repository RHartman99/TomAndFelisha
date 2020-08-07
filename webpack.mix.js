let mix = require("laravel-mix");
const glob = require("glob");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const files = ["dist/*.*", "dist/scripts/*.*", "index.html"];

mix
  .options({ processCssUrls: false })
  .js("src/scripts/app.js", "dist/scripts/app.js")
  .postCss("src/styles/app.pcss", "dist/styles/app.css", [
    require("postcss-import")(),
    require("precss")(),
    require("tailwindcss")(),
  ])
  .webpackConfig({
    plugins: [
      new ImageminPlugin({
        externalImages: {
          context: ".",
          sources: glob.sync("./src/images/**/*.{jpg,png}"),
          destination: "dist/images/",
          fileName: "[name].[ext]",
        },
        test: /\.(jpe?g|png|gif|svg)$/i,
        cacheFolder: "./.cache",
        plugins: [
          imageminMozjpeg({
            quality: 80,
          }),
        ],
      }),
    ],
  })
  .browserSync({
    ui: false,
    injectChanges: true,
    files: files,
    proxy: "localhost:1234",
    watch: true,
    logChanges: false,
  });
