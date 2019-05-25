ルートのテンプレート
```html
<body>
    <div id="app"></div>
    <!-- ここに書く -->
</body>
```

`app`はセレクタ(`#app`)に対応。
アプリと配置する要素を紐付けることをマウントという。

## ディレクティブ
+ `<div key="id">`: "id" という文字列
+ `<div v-bind:key="id">`: `id` というJavaScriptの変数

`ディレクティブ`:`引数`.`修飾子` = `値`
(ex) `v-bind:value.sync = "message"`

```html
<li v-for="i in items">{{i}}</li>
<li v-for="(item, index) in items">{{i}}</li>

 <!-- 要素ごとに条件でclass設定できたりする -->
<li v-for="item in array" v-bind:class="{rainbow_badge: lv <= 50}" v-if="item != 'a'">

```

```html
<!-- DOMごと消える  -->
<div v-if="show">v-if {{show}}</div>
<template v-if="show"></template>

<!-- display: none で消える -->
<div v-show="show">v-show {{show}} </div>
```


```html
<input v-model="out" />
<input v-model="round" type="range" min="0" max="50" />
```

```html
<button v-on:click="handleClick">Click</button>
```

```html
<p v-if="url">
    <a v-bind:href="url" target="_blank">URL</a>
</p>
```



```js
var app = new Vue({
    el: '#app',
    data: {...}
    methods: {
        handleClick: function (event) {
            alert(event.target)
        }
    }
})
```


## コンポーネント
JavaScriptとテンプレート(HTML, CSS)を1つにまとめたもの。帰納単位に分離して開発する仕組み。

コンポーネントはWebにも転がっている
awesome-vue
https://github.com/vuejs/awesome-vue

Vue Curated
https://curated.vuejs.org/


element
https://github.com/ElemeFE/element
紹介記事: https://s8a.jp/vue-js-library-element

Onsen UI
https://ja.onsen.io/
モバイル向けのUIを簡単につくれる。良さそう。




------------------------------------------
# メモ

`<ol>`: 連番
`<ul>`: ・だけ