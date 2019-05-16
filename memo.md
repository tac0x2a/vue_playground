ルートのテンプレート
```html
<body>
    <div id="app"></div>
    <!-- ここに書く -->
</body>
```

`app`はセレクタ(`#app`)に対応。
アプリと配置する要素を紐付けることをマウントという。

+ `<div key="id">`: "id" という文字列
+ `<div v-bind:key="id">`: `id` というJavaScriptの変数

`ディレクティブ`:`引数`.`修飾子` = `値`
(ex) `v-bind:value.sync = "message"`

コンポーネント = JavaScriptとテンプレート(HTML, CSS)を1つにまとめたもの。帰納単位に分離して開発する仕組み。

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








