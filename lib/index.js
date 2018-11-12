// babel-core生成AST树
const babel = require("babel-core");
const types = require("babel-types");
// https://www.jianshu.com/p/2bbc7d50220f
module.exports = function(babel) {
  return {
    visitor: {
      // 这里的ref是ImportDeclaration的第二个参数，这里的值是.babelrc中的 {
      // "library": "xxx"
      //}, 这里是指定 我们在引用哪个库的时候使用这个插件
      // ESM的import语法在AST node type中是ImportDeclaration：
      ImportDeclaration(path, ref = { opts: {} }) {
        let { opts } = ref;
        let node = path.node;
        let specifiers = node.specifiers;
        // babel-type: https://github.com/jamiebuilds/babel-types
        // 确认导入库 是否是 .babelrc library属性指定库 以及 如果不是默认导入 才进行按需导入加载
        if (
          opts.library == node.source.value &&
          !types.isImportDeclaration(specifiers[0]) &&
          !types.isImportDefaultSpecifier(specifiers[0]) &&
          !types.isImportNamespaceSpecifier(specifiers[0])
        ) {
          let newImport = specifiers.map(specifier =>
            types.importDeclaration(
              [types.ImportDefaultSpecifier(specifier.local)],
              types.stringLiteral(`${node.source.value}/lib/${specifier.local.name}`)
            )
          );
          path.replaceWithMultiple(newImport);
        }
      }
    }
  };
};
