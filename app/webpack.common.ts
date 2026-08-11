import * as path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { getReplacements } from './app-info'

export const externals = ['7zip']

const outputDir = 'out'
export const replacements = getReplacements()

const commonConfig: webpack.Configuration = {
  optimization: {
    emitOnErrors: false,
  },
  externals: externals,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', outputDir),
    library: {
      name: '[name]',
      type: 'commonjs2',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        loader: 'awesome-node-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
}

export const main = merge({}, commonConfig, {
  entry: { main: path.resolve(__dirname, 'src/main-process/main') },
  target: 'electron-main',
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({}, replacements, {
        __PROCESS_KIND__: JSON.stringify('main'),
      })
    ),
  ],
})

export const renderer = merge({}, commonConfig, {
  entry: { renderer: path.resolve(__dirname, 'src/ui/index') },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: ['file?name=[path][name].[ext]'],
      },
      {
        test: /\.cmd$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'static', 'index.html'),
      chunks: ['renderer'],
    }),
    new webpack.NormalModuleReplacementPlugin(/^vscode-jsonrpc$/, resource => {
      resource.request = 'vscode-jsonrpc/lib/node/main.js'
    }),
    new webpack.NormalModuleReplacementPlugin(
      /vscode-jsonrpc[\\/]node(\.js)?$/,
      resource => {
        resource.request = 'vscode-jsonrpc/lib/node/main.js'
      }
    ),
    new webpack.NormalModuleReplacementPlugin(/^node:/, resource => {
      resource.request = path.resolve(__dirname, 'src/lib/empty.ts')
    }),
    new webpack.NormalModuleReplacementPlugin(/^fs\/promises$/, resource => {
      resource.request = path.resolve(__dirname, 'src/lib/empty.ts')
    }),
    new webpack.NormalModuleReplacementPlugin(/^fs$/, resource => {
      resource.request = path.resolve(__dirname, 'src/lib/empty.ts')
    }),
    new webpack.DefinePlugin(
      Object.assign({}, replacements, {
        __PROCESS_KIND__: JSON.stringify('ui'),
        __dirname: JSON.stringify('/'),
        __filename: JSON.stringify('/index.js'),
      })
    ),
  ],
  resolve: {
    // Prevent the renderer from using browser-specific versions of modules
    aliasFields: [],
    alias: {
      fs: path.resolve(__dirname, 'src/lib/empty.ts'),
      'fs/promises': path.resolve(__dirname, 'src/lib/empty.ts'),
      path: path.resolve(__dirname, 'src/lib/empty.ts'),
      child_process: path.resolve(__dirname, 'src/lib/empty.ts'),
      os: path.resolve(__dirname, 'src/lib/empty.ts'),
      url: path.resolve(__dirname, 'src/lib/empty.ts'),
      util: path.resolve(__dirname, 'src/lib/empty.ts'),
      assert: path.resolve(__dirname, 'src/lib/empty.ts'),
      stream: path.resolve(__dirname, 'src/lib/empty.ts'),
      constants: path.resolve(__dirname, 'src/lib/empty.ts'),
      crypto: path.resolve(__dirname, 'src/lib/empty.ts'),
      http: path.resolve(__dirname, 'src/lib/empty.ts'),
      https: path.resolve(__dirname, 'src/lib/empty.ts'),
      zlib: path.resolve(__dirname, 'src/lib/empty.ts'),
      electron: path.resolve(__dirname, 'src/lib/empty.ts'),
      net: path.resolve(__dirname, 'src/lib/empty.ts'),
      module: path.resolve(__dirname, 'src/lib/empty.ts'),
      timers: path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:child_process': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:dns': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:net': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:path': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:url': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:module': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:fs': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:crypto': path.resolve(__dirname, 'src/lib/empty.ts'),
      keytar: path.resolve(__dirname, 'src/lib/empty.ts'),
      'registry-js': path.resolve(__dirname, 'src/lib/empty.ts'),
      dugite: path.resolve(__dirname, 'src/lib/empty.ts'),
      'fs-admin': path.resolve(__dirname, 'src/lib/empty.ts'),
      'desktop-notifications': path.resolve(__dirname, 'src/lib/empty.ts'),
    }
  },
})

export const crash = merge({}, commonConfig, {
  entry: { crash: path.resolve(__dirname, 'src/crash/index') },
  target: 'web',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Desktop Plus',
      filename: 'crash.html',
      chunks: ['crash'],
    }),
    new webpack.NormalModuleReplacementPlugin(/^node:/, resource => {
      resource.request = path.resolve(__dirname, 'src/lib/empty.ts')
    }),
    new webpack.NormalModuleReplacementPlugin(/^fs\/promises$/, resource => {
      resource.request = path.resolve(__dirname, 'src/lib/empty.ts')
    }),
    new webpack.NormalModuleReplacementPlugin(/^fs$/, resource => {
      resource.request = path.resolve(__dirname, 'src/lib/empty.ts')
    }),
    new webpack.DefinePlugin(
      Object.assign({}, replacements, {
        __PROCESS_KIND__: JSON.stringify('crash'),
        __dirname: JSON.stringify('/'),
        __filename: JSON.stringify('/index.js'),
      })
    ),
  ],
  resolve: {
    alias: {
      fs: path.resolve(__dirname, 'src/lib/empty.ts'),
      'fs/promises': path.resolve(__dirname, 'src/lib/empty.ts'),
      path: path.resolve(__dirname, 'src/lib/empty.ts'),
      child_process: path.resolve(__dirname, 'src/lib/empty.ts'),
      os: path.resolve(__dirname, 'src/lib/empty.ts'),
      url: path.resolve(__dirname, 'src/lib/empty.ts'),
      util: path.resolve(__dirname, 'src/lib/empty.ts'),
      assert: path.resolve(__dirname, 'src/lib/empty.ts'),
      stream: path.resolve(__dirname, 'src/lib/empty.ts'),
      constants: path.resolve(__dirname, 'src/lib/empty.ts'),
      crypto: path.resolve(__dirname, 'src/lib/empty.ts'),
      http: path.resolve(__dirname, 'src/lib/empty.ts'),
      https: path.resolve(__dirname, 'src/lib/empty.ts'),
      zlib: path.resolve(__dirname, 'src/lib/empty.ts'),
      electron: path.resolve(__dirname, 'src/lib/empty.ts'),
      net: path.resolve(__dirname, 'src/lib/empty.ts'),
      module: path.resolve(__dirname, 'src/lib/empty.ts'),
      timers: path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:child_process': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:dns': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:net': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:path': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:url': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:module': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:fs': path.resolve(__dirname, 'src/lib/empty.ts'),
      'node:crypto': path.resolve(__dirname, 'src/lib/empty.ts'),
      keytar: path.resolve(__dirname, 'src/lib/empty.ts'),
      'registry-js': path.resolve(__dirname, 'src/lib/empty.ts'),
      dugite: path.resolve(__dirname, 'src/lib/empty.ts'),
      'fs-admin': path.resolve(__dirname, 'src/lib/empty.ts'),
      'desktop-notifications': path.resolve(__dirname, 'src/lib/empty.ts'),
    }
  }
})

export const cli = merge({}, commonConfig, {
  entry: { cli: path.resolve(__dirname, 'src/cli/main') },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({}, replacements, {
        __PROCESS_KIND__: JSON.stringify('cli'),
      })
    ),
  ],
})

export const highlighter = merge({}, commonConfig, {
  entry: { highlighter: path.resolve(__dirname, 'src/highlighter/index') },
  output: {
    library: {
      name: '[name]',
      type: 'var',
    },
    chunkFilename: 'highlighter/[name].js',
  },
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        modes: {
          enforce: true,
          name: (mod: any) => {
            const builtInMode =
              /node_modules[\\\/]codemirror[\\\/]mode[\\\/](\w+)[\\\/]/i.exec(
                mod.resource
              )
            if (builtInMode) {
              return `mode/${builtInMode[1]}`
            }
            const external =
              /node_modules[\\\/]codemirror-mode-(\w+)[\\\/]/i.exec(
                mod.resource
              )
            if (external) {
              return `ext/${external[1]}`
            }
            return 'common'
          },
        },
      },
    },
  },
  target: 'webworker',
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({}, replacements, {
        __PROCESS_KIND__: JSON.stringify('highlighter'),
      })
    ),
  ],
  resolve: {
    // We don't want to bundle all of CodeMirror in the highlighter. A web
    // worker doesn't have access to the DOM and most of CodeMirror's core
    // code is useless to us in that context. So instead we use this super
    // nifty subset of codemirror that defines the minimal context needed
    // to run a mode inside of node. Now, we're not running in node
    // but CodeMirror doesn't have to know about that.
    alias: {
      codemirror$: 'codemirror/addon/runmode/runmode.node.js',
      '../lib/codemirror$': '../addon/runmode/runmode.node.js',
      '../../lib/codemirror$': '../../addon/runmode/runmode.node.js',
      '../../addon/runmode/runmode$': '../../addon/runmode/runmode.node.js',
    },
  },
})

highlighter.module!.rules = [
  {
    test: /\.ts$/,
    include: path.resolve(__dirname, 'src/highlighter'),
    use: [
      {
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'src/highlighter/tsconfig.json'),
        },
      },
    ],
    exclude: /node_modules/,
  },
]
