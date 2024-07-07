# 附带

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# 资源

[视频教程](https://www.youtube.com/watch?v=FkowOdMjvYo)

[react入门](https://juejin.cn/post/6960262593265025031)

[react three fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene#adding-lights)

其他相关教程：

[react+three](https://www.bilibili.com/video/BV1hX4y1y7nn/?spm_id_from=333.788&vd_source=5270415d668b21206238403450bb29b5)

# 笔记

[link](): 外层的README.md


# 报错

```
[plugin:vite:css] Preprocessor dependency "stylus" not found. Did you install it? Try `npm install -D stylus`.
```

```
E:/PersonalCV/about_portfolio/src/components/modelThreeExp/Earth/index.styl
```

解决：

```
npm install -D stylus
```


---



我npm run dev之后，报错为 src/components/modelThreeExp/Earth/index.js:131:6:
      131 │       `<div className="earth_page">`
          ╵       ^

  The esbuild loader for this file is currently set to "js" but it must be set to "jsx" to be able to parse JSX syntax. You can use "loader: { '.js': 'jsx' }" to do that.

解决：

这个错误提示说明你的项目在使用 esbuild 来构建时，遇到了 JSX 语法的文件，但是文件的扩展名为 `.js` 而不是 `.jsx`，而且 esbuild 的配置没有正确设置来处理这种情况。esbuild 默认将 `.js` 文件作为普通的 JavaScript 文件处理，不会解析 JSX 语法。

为了解决这个问题，你可以按照错误提示中的建议，修改你的构建配置，使其能够正确处理 `.js` 文件中的 JSX 语法。这里有几种方法来解决这个问题：

方法1：修改文件扩展名

将所有包含 JSX 的 `.js` 文件改为 `.jsx` 扩展名。这样 esbuild 默认会正确处理 JSX 语法。如果你选择这个方法，确保也更新了所有相关的导入路径。

方法2：配置 esbuild

在你的构建脚本或配置文件中，指定 esbuild 应该如何处理 `.js` 文件。具体操作取决于你是如何使用 esbuild 的（命令行、API 或通过其他工具如 Vite）。

如果你直接使用 esbuild:

在命令行中或在 esbuild 的配置文件中，你可以添加如下配置：

```javascript
require('esbuild').build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'out.js',
  loader: { '.js': 'jsx' }  // 这里告诉 esbuild 如何处理 .js 文件
}).catch(() => process.exit(1))
```

如果你是通过 Vite 使用 esbuild:

Vite 通常会自动处理 JSX，但如果需要手动配置，可以在 `vite.config.js` 文件中修改 esbuild 的选项：

```javascript
export default {
  esbuild: {
    loader: 'jsx',  // 设置默认加载器为 'jsx'，适用于所有 .js 文件
  }
}
```

根据你的项目设置选择适合的方法来调整。如果你使用的是其他集成 esbuild 的框架（如 Next.js 或 Gatsby），那么也可能需要查看特定框架的文档来了解如何覆盖默认的加载器设置。
