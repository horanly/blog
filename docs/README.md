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