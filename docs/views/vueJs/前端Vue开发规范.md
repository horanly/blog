--- 
title: 前端Vue开发规范，项目优化
date: 2020-07-15
categories: 
 - vue
tags: 
 - vue
---
## 一、强制

### 1、v-for 和 v-if 不要一起使用

> v-for 的优先级高于 v-if，所以当两个指令出现在一个 DOM 中时候，v-for 渲染的当前列表每一次都需要进行一次 v-if 的判断。而相应的列表也会重新变化。因此当你需要进行同步指令的时候。尽量使用计算属性，先将 v-if 不需要的值过滤掉。

```js
// 计算属性 computed: { filterList: function () { return
this.showData.filter(function (data) { return data.status > 0 }) } } // DOM
<ul>
  <li v-for="item in filterList" :key="item.id">
  {{ item.name }}
  </li>
</ul>
```

### 2. v-for 的 key 避免使用 index 作为标识

> 其实大家都知道的 v-for 需要使用 key 作为每次循环的标识，然而使用下标作为 key 的值，这是一个开销比较大的操作。如下图，当 index 作为标识的时候，插入一条数据的时候，列表中它后面的 key 都发生了变化，那么当前的 `vFor` 都会对 key 变化的 `Element` 重新渲染，但是其实它们除了插入的 `Element` 数据都没有发生改变，这就导致了没有必要的开销。所以，尽量不要用 index 作为标识，而去采用数据中的唯一值，如 `id` 等字段。

![img](https://user-gold-cdn.xitu.io/2020/7/15/17352fed4fc2aced?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 3. 合理的释放组件资源

> 什么是资源? 每创建出一个事物都需要消耗资源，资源不是凭空产生的，是分配出来的。所以说，当组件销毁后，尽量把我们开辟出来的资源块给销毁掉，比如 setInterval , addEventListener 等，如果你不去手动给释放掉，那么它们依旧会占用一部分资源。这就导致了没有必要的资源浪费。多来几次后，可以想象下资源占用率肯定是上升的。

```js
// 添加的事件
created() {
  addEventListener('click', Function, false)
},
beforeDestroy() {
  removeEventListener('click', Function false)
}
```

```js
// 定时器
created() {
  this.currentInterVal = setInterval(code,millisec,lang)
},
beforeDestroy() {
  clearInterval(this.currentInterVal)
}
```

### 4. 路由的懒加载

> 当路由按需加载后，那么 Vue 服务在第一次加载时的压力就能够相应的小一些，不会出现 `超长白屏问题` 。

下面是两种路由懒加载的写法：

```js
// require法
component: (resolve) => require(['@/components/HelloWorld'], resolve)

// import
component: () => import('@/components/HelloWorld')
```

### 5. Prop 定义

> Prop 定义应该尽量详细。
> 在你提交的代码中，prop 的定义应该尽量详细，至少需要指定其类型。

正例：

```js
props: {
  status: String
}
// 更好的做法！
props: {
  status: {
    type: String,
    required: true,
    default: "默认值"
  }
}
```

反例：

```js
// 这样做只有开发原型系统时可以接受
props: ['status']
```

## 二、强烈推荐（增强可读性）

### 1. 组件文件

> 只要有能够拼接文件的构建系统，就把每个组件单独分成文件。
> 当你需要编辑一个组件或查阅一个组件的用法时，可以更快速的找到它。

### 2. 模板中的组件名大小写

> 总是 PascalCase 的（定义，引用，使用）

正例：

```vue
<!-- 在单文件组件和字符串模板中 -->
<MyComponent/>
```

反例：

```vue
<!-- 在单文件组件和字符串模板中 -->
<mycomponent/>
<!-- 在单文件组件和字符串模板中 -->
<myComponent/>
```

### 3. 多个特性的元素

> 多个特性的元素应该分多行撰写，每个特性一行。

正例：

```vue
<img
  src="https://vuejs.org/images/logo.png"
  alt="Vue Logo"
>
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

反例：

```vue
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
<MyComponent foo="a" bar="b" baz="c"/>
```

### 4. 模板中简单的表达式

> 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。
> 复杂表达式会让你的模板变得不那么声明式。我们应该尽量描述应该出现的是什么，而非如何计算那个值。而且计算属性和方法使得代码可以重用。

正例：

```vue
<!-- 在模板中 -->
{{ normalizedFullName }}
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

反例：

```vue
{
  {
    fullName
      .split(' ')
      .map(function(word) {
        return word[0].toUpperCase() + word.slice(1)
      })
      .join(' ')
  }
}
```

## 三、推荐

### 1. 单文件组件的顶级元素的顺序

> 单文件组件应该总是让script、template 和 style 标签的顺序保持一致。且 style 要放在最后，因为另外两个标签至少要有一个。

正例：

```vue
<!-- ComponentA.vue -->
<template>...</template>
<script>
/* ... */
</script>
<style>
/* ... */
</style>
```

### 2. scoped 中的元素选择器

> 元素选择器应该避免在 scoped 中出现。
> 在 scoped 样式中，类选择器比元素选择器更好，因为大量使用元素选择器是很慢的。

正例：

```vue
<template>
  <button class="btn btn-close">X</button>
</template>

<style scoped>
.btn-close {
  background-color: red;
}
</style>
```

反例：

```vue
<template>
  <button>X</button>
</template>

<style scoped>
button {
  background-color: red;
}
</style>
```

## 附录

### 1. 推荐使用 vs code 进行前端编码，规定 Tab 大小为 2 个空格

1. vs code 配置

```json
{
  "editor.tabSize": 2,
  "workbench.startupEditor": "newUntitledFile",
  "workbench.iconTheme": "vscode-icons",

  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
    "javascriptreact",
    "html",
    "vue"
  ],
  "eslint.options": { "plugins": ["html"] },
  "prettier.singleQuote": true,
  "prettier.semi": false,
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
  "vetur.format.js.InsertSpaceBeforeFunctionParenthesis": false,
  "vetur.format.defaultFormatter.js": "prettier"
  // "prettier.eslintIntegration": true
}
```

1. vs code 插件

- Auto Close Tag
- Path Intellisense
- Prettier
- Vetur
- vscode-icons
