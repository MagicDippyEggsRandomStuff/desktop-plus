import * as common from './webpack.common'
import * as webpack from 'webpack'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config: webpack.Configuration = {
  mode: 'production',
  devtool: 'source-map',
}

const rendererConfig = merge({}, common.renderer, config, {
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'renderer.css' }),
  ],
})

webpack.default(rendererConfig, (err, stats) => {
  if (err) {
    console.error("Webpack error:", err);
    process.exit(1);
  }
  if (stats && stats.hasErrors()) {
    console.error("Stats errors:", stats.toJson().errors);
    process.exit(1);
  }
  console.log("Renderer compiled successfully!");
})
