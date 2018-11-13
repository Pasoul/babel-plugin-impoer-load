# Descrip

jtools按需加载插件

# Usage

## 安装

`yarn add babel-plugin-import-load --dev`
or
`npm install babel-plugin-import-load --save-dev`

## 在webpack中配置

```js
// .babelrc
{
	// ...
	"plugins": [
	     ["import-load", {"library": "jlb-tools"}]
	]
}
// webpack.config.js
module: {
	rules: [
		{
		  	test: /\.js$/,
			loader: 'babel-loader'
		}
	]
}
```

or

```diff
module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
 +       options: {
 +         plugins: [["import-load", { library: "jlb-tools" }]]
 +       }
      }
    ]
 }
```

# tip

通过 `import {handleEmoji} from 'jlb-tools'` 查找依赖时，babel会自动解析成 `import handleEmoji from 'jlb-tools/lib/handleEmoji'`,从而实现按需加载
