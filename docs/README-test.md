'# Hello VuePress!' 

bolog


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


:tada: :100:

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

[[toc]]

::: danger STOP
Danger zone, do not proceed
:::



``` js
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```


<<< @/foot



{{ 1 + 1 }}


<span v-for="i in 3">{{ i }} </span>

::: v-pre
`{{ This will be displayed as-is }}`
:::

{{ $page }}


======================================

---
meta:
  - name: description
    content: hello
  - name: keywords
    content: super duper SEO
---



--- 
title: 【vue】跨域解决方案之proxyTable  
date: 2017-12-28
categories: 
 - frontEnd
tags: 
 - vue
---

> 请注意， `categories` 和 `categories` 要以数组的方式填写。


某些页面的侧边栏为 `false` 呢？因为您启用了分类，这与自定义侧边栏功能有点冲突，所以您全局打开自动侧边栏功能，然后在不需要侧标记的地方关闭它。



