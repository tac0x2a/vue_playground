Vue.js に関するメモ

# Vue.js の基本
基本ルートのテンプレート
```html
<body>
  <div id="app">
    <!-- ここに書く -->
  </div>
</body>
```

```js
var app = new Vue({
  el: '#app',
  ...
})
```

`app`はセレクタ(`#app`)に対応。
アプリと配置する要素を紐付けることをマウントという。
`var app` に代入してもしなくてもよい。

-----------------------------------------------------------
## ディレクティブ

[ディレクティブ](https://012-jp.vuejs.org/guide/directives.html)
> ディレクティブとは、 DOM 要素に対して何かを実行することをライブラリに伝達する、マークアップ中の特別なトークンです。
> Vue.js でのディレクティブのコンセプトは徹底的にシンプルです。Vue.js のディレクティブは、下記のフォーマットのように、接頭辞のついた HTML 属性の形でのみ表されます。


基本は以下。
`ディレクティブ`:`引数`.`修飾子` = `値`

(ex) `v-bind:value.sync = "message"`


### Text(`v-text="式"`, `{{式}}`)
```html
<!-- dataオプションにmessageプロパティが登録されているとして  -->

<!-- messageの値を表示 -->
<h1 v-text="message"></h1>

<!-- こう書く場合のほうが多そう -->
<h1>{{message}}</h1>

<!-- 42が表示される -->
<h1>{{40+2}}</h1>
```

### 繰り返し(`v-for="ループっぽい式"`)
```html
<!-- dataオプションにitemsプロパティがリストとして登録されているとして  -->

<li v-for="i in items">{{i}}</li>
<li v-for="(item, index) in items">{{i}}</li>

 <!-- 要素ごとに条件でclass設定できたりする -->
<li v-for="item in array" v-bind:class="{rainbow_badge: lv <= 50}" v-if="item != 'a'">
```

`key`としてユニークな値をとるプロパティを指定することで、要素の識別と効率的な描画処理が可能になる。`key`がないと、リストが更新された際に、リスト内の全要素を再描画してしまう。(変化した要素をvueが特定できないため。)
```html
<li v-for="item in array" :key="item.id">
```


### 条件
式を評価した結果に応じて要素を消したりする。値の真偽値解釈はJavaScriptの条件式と同じ。

#### `v-if="式"`, `v-show="式"`

```html
<!-- dataオプションにshowプロパティが登録されているとして  -->

<!-- DOMごと消える  -->
<div v-if="show">v-if {{show}}</div>
<template v-if="show"></template>

<!-- DOMには残るが、style="display: none;" 属性が付与されるため、消えたように見える -->
<div v-show="show">v-show {{show}} </div>
```

+ `v-if`はDOMごと消えてるため、配下の要素で参照するプロパティの有無を条件に入れる等でエラー回避したりできる。また、監視が解除されて破棄されるため、次に描画されるときは状態が初期化されてしまう。`v-if`は単一な要素にしか付与で機内が、`template`要素に付与することで、`template`配下の要素をまとめて消したりできる。
+ `v-show`は消えたように見えるだけ。切り替え頻度が高いものはこちらを使うのが良い。

#### `v-else-if="式"`, `v-else`
いわゆる`elseif`節や`else`節に相当。

### データバインディング
#### 属性のデータバインディング(`v-bind:属性名="属性値の式"`)
+ `<div key="id">`: "id" という文字列
+ `<div v-bind:key="id">`: `id` というJavaScriptの変数の値が展開される

以下はどちらで書いても同じ
+ `<div v-bind:key="id">`
+ `<div :key="id">`



直値で与えた属性と併用する例。
```html
<!-- dataオプションのurlプロパティは展開される。 -->
<!-- 直値で与えた属性と同じ名前のプロパティを指定する場合、プロパティの値で上書きされる -->
<a v-bind:href="url" href="https://default.com" target="_blank">URL</a>
```

#### クラスとスタイルのデータバインディング(`v-bind:class="{属性名: 条件式, ...}"`, `v-bind:style="{属性名: 式, ...}"`)
オブジェクトや配列をバインドすると、クラス名やCSSプロパティとして展開される。

```html
<p v-bind:class="{a: isA, b: isB, c: isC }">
<p v-bind:style="{color: textColor, backgroundColor: bgColor}">
```

```js
var app = new Vue({
  el: '#app',
  data: {
      isA: true,
      isB: false,
      isC: true,
      textColor: 'blue',
      bgColor: 'green',
  }
})
```

これで動かすと

```html
<p class="a c">
<p style="color: blue; backgroundColor: green;">
```

となる。
`class`で指定する式は条件式として評価され、真となる値だけが残るようだ。
`style`の方は値が文字列として展開されるようだ。

属性のデータバインディングと同じように、以下はどちらで書いても同じ。
+ `<p v-bind:class={...}>`
+ `<p :class={...}>`

オブジェクトデータを直接渡すこともできる。

```html
<p v-bind:style="styleObject">
```
```js
var app = new Vue({
  el: '#app',
  data: {
      styleObject: {
        color: 'blue',
        backgroundColor: 'green'
      }
  }
})
```

#### まとめてバインディングする(`v-bind="評価するとobjectになる式"`)
以下はどちらで書いても同じ。

+ `<img v-bind:src="item.src" v-bind:alt="item.alt" v-bind:width="item.width" v-bind:height="item.height">`
+ `<img v-bind="item">`

一部だけ書き換えることもできる。
```html
<img v-bind="item" v-bind:width="item.width*2">
```

### イベントハンドリング(`v-on:click="評価するとfunctionになる式"`, `v-on:click="式"`)
+ `v-on:click` ボタンクリック時
+ `v-on:load` 画像などの読み込みが完了したとき
+ `v-on:scroll` 要素のスクロールイベント
+ `v-on:mousewheel` マウスホイールイベント
+ `v-on:dragstart` ドラッグ
+ `v-on:input` inputに値が入力された


```html
<button v-on:click="handleClick">Click</button>

<!-- 引数を与える場合は()で指定する。ループの中でインデックスを与えたりして使う -->
<button v-on:click="bracket(42)">Click</button>
```

```js
var app = new Vue({
  ...
  methods: {
    handleClick: function (event) {
      alert(event.target)
    },
    bracket: function (idx) {
      // 配列の要素を置き換える場合は $set を使う必要がある。
      // 代入すると配列要素が更新されただけになってしまうため、再描画されない。

      // $set は値をリアクティブデータとして追加する。
      this.$set(this.array, idx, "[" + this.array[idx] + "]")
      }
  }
})
```

以下はどちらで書いても同じ。

+ `<button v-on:click="bracket(42)">Click</button>`
+ `<button @click="bracket(42)">Click</button>`

もとのイベントはこんな感じで拾える。
```html
<button v-on:click="handleClick($event)">Click</button>
```
```js
var app = new Vue({
    ...
    handleClick: function (event) {
      alert(event.target)
    },
    ...
})
```

[イベントの修飾子についてはこちら](https://jp.vuejs.org/v2/guide/events.html#%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E4%BF%AE%E9%A3%BE%E5%AD%90)


コンポーネントは`v-on`でイベントをハンドルできるが、`window`や`body`については`addeventListener`メソッドで登録しておく必要がある。

### フォーム入力バインディング(`v-model="リアクティブデータの変数"`)
input 要素 や textarea 要素、 select 要素に双方向 (two-way) データバインディングを作成し、指定したリアクティブデータの変数に入力値がセットされる。

```html
<input v-model="out" />
<input v-model="round" type="range" min="0" max="50" />
```

`v-model`を使わずに、`v-bind`や`v-on`で頑張ることもできる。自分でバリデーションしたいときはこっち？
```html
<input v-bind:value="out" v-on:input="handleInput" />
```
```js
var app = new Vue({
  ...
  methods: {
    // 10文字未満に制限する
    handleInput: function (event) {
      if (event.target.value.length < 10) {
        this.out = event.target.value;
      }
    },
  }
  ...
})
```

いろいろ
```html
<!-- 文字列 -->
<input v-model="out" />

<!-- 複数行であっても文字列 -->
<textarea v-model="out" />

<!-- v-model.numberとすることで、プロパティに数値として値を設定できる -->
<input type="range" v-model.number="r">

<!-- "#008000" みたいな文字列 -->
<input type="color" v-model="col">

<!-- ラジオボックスは文字列 -->
<input type="radio" value="フシギダネ" v-model="poke"> フシギダネ キミにきめた！ </label>
<input type="radio" value="ヒトカゲ" v-model="poke"> ヒトカゲ キミにきめた！ </label>
<input type="radio" value="ゼニガメ" v-model="poke"> ゼニガメ キミにきめた！ </label>

<!-- 択一なselectは文字列 -->
<select v-model="out">
  <option disabled="disabled">以下から選択！</option>
  <option value="a"> A </option>
  <option value="b"> B </option>
  <option value="c"> C </option>
</select>

<!-- 複数選択のselectは配列 -->
<select v-model="out" multiple>
  <option disabled="disabled">以下から選択！</option>
  <option value="a"> A </option>
  <option value="b"> B </option>
  <option value="c"> C </option>
</select>

<!-- チェックボックスはBoolean。値を指定することもできる -->
<input v-model="out" type="checkbox" />
<input v-model="out" type="checkbox" true-value="真" false-value="偽" />
```

複数のチェックボックスは配列にもできる
```html
<label><input v-model="array" type="checkbox" value="a"> A </label>
<label><input v-model="array" type="checkbox" value="b"> B </label>
<label><input v-model="array" type="checkbox" value="c"> C </label>

<!-- AとCにチェックを入れると ["a", "c"] になる -->
<p>{{array}}</p>
```
```js
var app = new Vue({
  ...
  data: {
    array: []
  }
  ...
})
```

[修飾子についてはこちら](https://jp.vuejs.org/v2/guide/forms.html#%E4%BF%AE%E9%A3%BE%E5%AD%90)
数値に変換したり(`.number`)、余白を取り除いたり(`.trim`)できる。

なお、画像などの`type="file"`は`v-model`を使えないので、`change`イベントをハンドルする。
```html
<input type="file" v-on:change="handleChange">
```

### 算出プロパティ
計算をキャッシュしておいて、`{{halfWidth}}`のように参照できる。
```js
var app = new Vue({
  computed: {
    halfWidth: function(){
      ...
      return width/2.0;
    },
    halfRect: function(){
      return {
        w: halfWidth,
        h: width*0.6 / 2.0
      }
    }
  }
})
```
functionの中でリアクティブデータを参照している場合、値が変更されると再計算される。
計算コストの高い処理結果をキャッシュするのに使える。例えばリストの絞り込み結果とか。


### 監視
```js
var app = new Vue({
  watch: {
    監視対象のリアクティブデータやプロパティ: function(新しい値, 古い値){
      ...
    },
  }
})
```
フォームの入力を監視して、値が変更されたら検索APIコールして・・・みたいな使い方で動的検索ができる。

### フィルタ
```js
var app = new Vue({
  filters: {
    bracket: function(v){
      return "[" + v + "]"
    },
    upper: function(v){
      return v.toUpeerCase()
    }
  }
})
```
```html
<p>{{ str | upper | bracket }}</p>
```
methodsとよく似ているが、文字列を加工するときは便利。
パイプみたいになっていて、左から右へデータが流れていく。

### カスタムディレクティブ
`v-`から始まるディレクティブを自分で作れるらしい。

-----------------------------------------------------------
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


### コンポーネントを自作する

グローバルに登録
```js
Vue.component('new-component', {
  template: '<p>New Component!!</p>',
  data: function(){
    return {
      ...
    }
  },
  methods: {
    ...
  }
})
```
```html
<div id="app">
  <!-- どのVueテンプレートからでも参照できる -->
  <new-component></new-component>
  <!-- <p>New Component!!</p> として表示される -->
</div>
```
+ `new Vue()`と同じように定義する。ただし、`data`はObjectを返すfunctionになっていなければならない。
+ `template`で指定するhtmlはツリーになってないとだめ。ルートは1つ。`<div>`とかでくくっておくのがよい。
+ コンポーネントはネストできる。

ローカルへの登録
```js
var newComponent = {
  template: '<p>New Component!!</p>'
  data: function(){
    return {
      ...
    }
  },
  methods: {
    ...
  }
}

var app = new Vue({
  el: '#app',
  components: {
    //これで<new-components>が使用できるようになる
    'new-components': newComponents
  }
})
```
基本的にローカル登録にしておいてスコープを絞っといたほうがいい。


### コンポーネント間の通信
#### ネストしたコンポーネントの親から子(props down)
静的に値を渡す。引数の値渡しみたいな感じ？
```html
<!-- 親のテンプレート -->
<child name='Mario', age=10></child>
<child name='Luigi', age=8></child>
```
```js
Vue.component('child', {
  template: '<p>{{name}}({{age}})</p>',

  props: ['name', 'age'] //ここで受け取る属性を指定する

// 型指定することもできる
// props: {
//   name: String
//   age: Number
// }
})
```

リアクティブデータを渡す場合
```html
<child v-bind:name='Mario', age=10></child>
```
これで、親側で`name`を変更すると、子のnameが変更される。

#### ネストしたコンポーネントの子から親(event up)
```html
<!-- 親 -->
<child v-on:child-event="parentsHandler"></child>
```
```js
// 子
this.$emit('child-event')
```
`$emit('イベント名', 引数,...,)`を使う。子要素のボタンを押したときに、親要素をどうこうしたいときに。

#### 親子で双方向のデータバインディングする(`v-model`)
```html
<!-- 親 -->
<child v-model:"date"></child>

<!-- 上記は以下の糖衣構文 -->
<child v-bind:value="date" v-on:input="date = $event"></child>
```
```js
// 子から以下のように$emitすることで、dateが自動で更新される。
// v-modelで子へ渡されるプロパティはvalueなので、子側のpropsに指定するのを忘れないように！
this.$emit('input', '20210-04-28')
```

いくつもバインドする場合は `.sync` 修飾子を使う。


#### 親子ではないコンポーネント間
```js
var bus = new Vue() //イベントバス。

var bus = new Vue({
  data: {
      ... //値をもたせることもできる。
  }
})

```
というのを作っておいて

```js
// 受け取る方
bus.$on('何らかの-event', function(){
  ...
})
```
```js
// eventを発行する方
bus.$emit('何らかの-event')
```

### スロット
親コンポーネントから、子コンポーネントのテンプレートの一部に何かを差し込むのに使う機能。
```html
<!-- 子のテンプレート -->
<p>ここに入る→ <slot></slot><p>
```

```html
<!-- 親 -->
<child>これを入れる</child>

<!-- するとこんな感じになる -->
<p>ここに入る→ これを入れる</p>
```
`<slot>` タグが置き換わる。 `<slot name=''>` とすることで複数のスロットを名前付きで挿入することができる。

ほかにもいろいろ使えるらしい。



------------------------------------------
# Vue でアプリを作る
+ Vuex: 状態管理用ライブラリ。複数コンポーネントでのデータ共有や、アプリの状態の一元管理を行う。
+ Vue Router: 複数の画面とURLを紐付ける、SPA構築用ライブラリ

### Vue CLI
アプリ構築用ツール郡のCLI。
かんたんにwebpackで単一ファイルコンポーネントを作ることができる。

[webpackとは](https://qiita.com/soarflat/items/28bf799f7e0335b68186#webpack%E3%81%A8%E3%81%AF)

内部ではBabel使ってるらしい。

#### プロジェクトを作る
[参考: Creating Project](https://cli.vuejs.org/guide/creating-a-project.html#vue-create)
```shell
$ vue create <プロジェクト名>
  # 対話形式で色々設定する。 `vue ui` でブラウザから同様のプロジェクト作成を行える。
$ cd <プロジェクト名>
$ npm run serve
```

http://localhost:8080/ にアクセスすると、アプリ画面が表示される。

[参考: Vue CLI3について](https://cr-vue.mio3io.com/guide/chapter7.html#vue-cli3-%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB)
> ビルド設定のカスタマイズは、プロジェクトルートに vue.config.js というファイル作成してそこに追加していきます。


### 単一ファイルコンポーネント(`.vue`ファイル)
単一ファイルコンポーネント(SFC, Single File Components) として、 HTML/JavaScript/CSSをまとめた `.vue`ファイル単位で管理する。

###### index.html
```html
<div id="app"></div>
```

###### index.js
```js
import Vue from "vue";
import App from "./Hello";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
});
```

###### Hello.vue
```html
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
export default {
  data: function() {
    return {
      greeting: "Hello"
    }
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
```

+ `<template>` : コンポーネントのテンプレート部分。必要なパッケージ入れて `lang="jade"` とすると Jadeで書けたりする。
+ `<script>`: コンポーネントのテンプレート以外の部分。
+ `<style>`: CSSの部分。`scoped` にすると、このコンポーネントとその配下のコンポーネントで有効になる。こちらも`lang=stylus`でStylusで書けたりする。


## Vuex
[Vuexとは何か?](https://vuex.vuejs.org/ja/)
> Vuex は Vue.js アプリケーションのための 状態管理パターン + ライブラリ

> あなたのアプリがシンプルであれば、Vuex なしで問題ないでしょう。

コンポーネント横断で使えるリアクティブなグローバル変数群？

###### `src/store.js`
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: state => state.count++
  }
})

export default store
```

```js
import store from '@/store.js' // @はsrcのエイリアス

console.log(store.state.count) // -> 0
store.commit('mutation')
console.log(store.state.count) // -> 1
```

複数のコンポーネントで使う場合は`new Vue`するときに指定する
###### `src/App.vue`
```js
import store from './store.js'
new Vue({
  ...
  store,
  ...
})
```

`適当なコンポーネント.vue`
```js
export default {
  craeted() {
    console.log(this.$store.state.count)
    this.$store.commit('increment')
  }
}
```
`this.$state` でアクセスする。


## Vue Router
コンポーネントとURLを紐付けてコンテンツを生成し、SPAを構築するための拡張ライブラリ。

[Vue Router](https://router.vuejs.org/ja/)
> Vue Router は Vue.js 公式ルータです。これは Vue.js のコアと深く深く統合されており、Vue.js でシングルページアプリケーションを構築します。機能は次の通りです:
> ・ネストされたルート/ビューマッピング
> ・モジュール式、コンポーネントベースのルータ構造
> ・ルートパラメータ、クエリ、ワイルドカード
> ・Vue.js の transition 機能による、transition エフェクトの表示
> ・細かいナビゲーションコントロール
> ・自動で付与される active CSS クラス
> ・HTML5 history モードまたは hash モードと IE9 の互換性
> ・カスタマイズ可能なスクロール動作

### 準備
```sh
$ npm install vue-router
```

### 使ってみる
慣例として、ルートに直接紐づくコンポーネントは`views`や`pages`のようなディレクトリにまとめることが多い。

###### src/views/Home.vue
```html
<template>
  <h1>Home</h1>
</template>
```

###### src/views/Product.vue
```html
<template>
  <h1>Product</h1>
</template>
```

###### src/router.js
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Product from '@/views/Product.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/product', component: Product },
  ]
})

export default router
```

###### src/main.js
```js
import Vue from 'vue'
import App from './App.vue'

import router from '@/router.js'

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
```

###### src/App.vue
```html
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/product">Product</router-link>
    </nav>
    <router-view />
  </div>
</template>
```

これで、 http://localhost:8080 にアクセスすると、"Home" と "Product" リンクが生成されて、クリックするとそれぞれのコンポーネントが `<router-view />`の位置に表示される。

### ハッシュモードとヒストリーモード
[HTML5 History モード](https://router.vuejs.org/ja/guide/essentials/history-mode.html)
> vue-router のデフォルトは hash モード です - 完全な URL を hash を使ってシミュレートし、 URL が変更された時にページのリロードが起きません。
> history モードを使用する時は、URL は "普通" に見えます e.g. http://oursite.com/user/id 。美しいですね!

ヒストリーモードを有効にするには、`VueRouter`の`mode`プロパティを`'history'`にして、サーバの設定を変更する必要がある。

###### src/router.js
```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

###### nginxの例
```
location / {
  try_files $uri $uri/ /index.html;
}
```

その他サーバの設定方法は[こちら](https://router.vuejs.org/ja/guide/essentials/history-mode.html#%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%81%AE%E8%A8%AD%E5%AE%9A%E4%BE%8B)参照。

### ルート定義のオプション
```js
...
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'prod',
      path: '/product/:id', //URLからパラメータを受け取る場合はこう書く。
      //path: '/product/:id(\\d+)', //正規表現で数字のみにマッチさせることもできる
      compnent: Product,
      meta: { requiresAuth: true } //認証が必要な場合はtrue
    },
    {
      name: 'prodlist',
      path: '/product', // パラメータなしの場合はrouteを別にすることもできる。
      compnent: ProductList,
      meta: { requiresAuth: true } //認証が必要な場合はtrue
    }
  ],
  // リダイレクトの設定。リダイレクト先はパスまたは名前で指定する
  { path: '/a', redirect: '/product' },
  { path: '/a', redirect: { name: 'prod'} },
})
```

受け取ったパラメータはこのように参照する。
```js
this.$route.params.id //URLパラメータを受け取る
this.$route.query.id //クエリパラメータを受け取る場合はこう
```
`$route` は マッチしたルートの情報が入ったオブジェクト。

ちなみに、パラメータは`$route`ではなくpropsとして受け取っておいたほうがいい。ユニットテストがしやすいので。

###### src/Product.vue
```html
<template>
  <div>
    <h1>Product</h1>
    <div v-if="pid">Param: ID:{{pid}}</div>
    <div v-if="qid">Query: ID:{{qid}}</div>
  </div>
</template>

<script>
export default {
  props: {pid: Number,  qid: Number} //受け取るパラメータ
}
</script>
```

###### src/router.js
```js
...
const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    {
      path: '/product/:id(\\d+)',
      component: Product,
      props: r => ({ qid: r.query.id,  pid: r.params.id}) //こんな感じで。
    },
  ]
})
...
```



### ナビゲーション
```html
<template>
  <div id="app">

    <!-- 基本はこれ -->
    <router-link to="/product"></router-link>

    <!-- テンプレートリテラルを使う場合。込み入った記述をするとき便利 -->
    <!-- =より右をJavaScriptの式として評価したい場合は `:to` を使うっぽい -->
    <router-link :to="`/product/${ id }`"></router-link>

    <!-- aタグ以外で囲みたい場合は`tag`で指定する -->
    <router-link to="/product" tag="button"></router-link>

    <!-- objectで指定できる。パラメータを渡す場合に便利か -->
    <!-- paramsを渡す場合は、routerにnameを登録しておく必要がある -->
    <router-link :to="{ path: '/product' }"></router-link>
    <router-link :to="{ path: '/product', query: { id: 42 } }"></router-link>
    <router-link :to="{ name: 'prod', params: { id: 42 } }"></router-link>

  </div>
</template>
```

アクティブなルートにマッチする `router-link` には `.router-link-exact-active` や `.router-link-active` が付与されるので、簡単にハイライトできる。
```css
.router-link-exact-active {background: #ff00ff} //完全一致したルート
.router-link-active {background: #ff00ff} //マッチしたパスを含むルート
```


コードから遷移するには `$router` に対していろいろやる
```js
this.$router.push('/product') // push, replace, go
this.$router.push({name: 'prod', params: { id: 1}}) //router-linkのようにパラメータを渡すこともできる
```



### 動的ルートのサンプル
ポケモン図鑑(Pokedex)を作る。データは `src/DummyPokedex.js`にハードコードしたダミーを使う。

###### src/App.vue
```html
<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/pokemon">Pokedex</router-link>
    </nav>
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>
      <router-view />
    </p>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>
```

###### src/api/DummyPokedex.js
```js
const pokedex = [
  { number: 1, name: "フシギダネ", types: ["くさ", "どく"], height: 0.7, weight: 6.9 },
  { number: 4, name: "ヒトカゲ", types: ["ほのお"], height: 0.6, weight: 8.5 },
  { number: 7, name: "ゼニガメ", types: ["みず"], height: 0.5, weight: 9.0},
]

//ダミーデータとアクセス用のAPIを定義する
export default {
  fetchAll() { return pokedex },
  findFirst(number) { return pokedex.find(p => p.number == number) },

  // DB等から読み込んでるように振る舞わせるため、`setTimeout` で2秒後にコールバックする
  asyncFindFirst(number, callback) {
    setTimeout(() => {
      callback(this.findFirst(number))
    }, 2000) // 2000ms 後に callbackする
  }
}
```

###### src/router.js
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Pokedex from '@/views/Pokedex.vue'
import Pokemon from '@/views/Pokemon.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/pokemon', component: Pokedex },
    {
      path: '/pokemon/:number(\\d+)',
      component: Pokemon,
      props: route => ({
        number: Number(route.params.number)
      })
    },
  ]
})

export default router
```

###### src/views/Pokedex.vue
```html
<template>
  <div>
    <h1>Pokedex</h1>
    <ul>
      <!-- ポケモン一覧をを表示する -->
      <li v-for="{number, name} in pokedex" :key="number">
        <router-link :to="`/pokemon/${number}`">No.{{number}} {{name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Pokedex from '@/api/DummyPokedex.js'

export default {
  computed: {
    pokedex: () => Pokedex.fetchAll()
  }
}
</script>
```

###### src/views/Pokemon.vue
```html
<template>
  <div>
    <div v-if="pokemon">
      <h1>No. {{pokemon.number}} {{pokemon.name}}</h1>
      <h2>体長:{{pokemon.height}}[m] 重さ:{{pokemon.weight}}[kg]</h2>
      <h2>タイプ</h2>
      <p v-for="type in pokemon.types" :key="type">{{type}}</p>
    </div>
    <div v-else>
      <h2>Loading...</h2>
    </div>
  </div>
</template>

<script>
import Pokedex from '@/api/DummyPokedex.js'

export default {
  props: {number: Number},
  data(){
    return {pokemon: null}
  },
  // computed では this.numberを参照できないので、watch で numberを監視するように。
  watch: {
    number: {
      handler(){
        // 遅延読み込みした結果を格納する
        Pokedex.asyncFindFirst(this.number, pokemon => {
          this.pokemon = pokemon
        })
      }, immediate: true //ここがtrueじゃないと、すぐにhandlerが呼ばれない。
    }
  }
}
</script>
```

`src/views/Pokemon.vue` の下に子コンポーネントを作る場合は、`src/views/Pokemon/*.vue` とするのがいいらしい。

### 遷移アニメーション
```html
<transition name="viewwww">
  <router-view />
</transition>
...
<style>
.viewwww-enter-active {
  transition: opacity 0.5s;
}
.viewwww-enter, .viewwww-leave-to {
  opacity: 0;
}
</style>
```
`name`に指定した`viewwww`が一致してないといけない。


### ナビゲーションガード
遷移を操作するためのフック。
+ `to()`: 遷移後のrouteオブジェクトを受け取る
+ `from()`: 遷移前のrouteオブジェクトを受け取る
+ `next()`: これを呼ぶとフックが解決してrouteの遷移が行われる。遷移を中止する場合は`next(false)`をコールする。`next('/pokemon')`などで任意のrouteにリダイレクトもできる。

```js
const router = new VueRouter({
  routes: [
    ...
    {
      path: '/pokemon',
      component: Pokedex
      beforeEnter(to, from, next){ //このrouteへ遷移する前に呼ばれる。
        next() //遷移してもOKな場合に呼ぶ
      }
    },
    ...
  ]
})
//グローバルなガードも使える
router.beforEeach((to, from, next) => {
//コンポーネントガード解決前に呼ばれる
...
})

router.afterResolve((to, from, next) => {
//コンポーネントガード解決後に呼ばれる
...
});

router.afterEeach((to, from) => { // 遷移が終わってから呼ばれるのでnextは使えない。
//すべてのルートの遷移後に呼ばれる
...
});
```

```html
<script>
export default {
  // beforeRoute{Enter, Update, Leave} が使える

  beforeRouteEnter(to,from,next){
    // この時点ではコンポーネントのインスタンスはまだ作られていないので、thisにアクセスできないことに注意。
    next(vm => {
      // vm には VueComponent が入っている
      // このコールバックでthisにアクセスできる。
    })
  }
}
</script>
```

`beforEeach`とかで、認証認可のチェックができる？

------------------------------------------
# ES2015(ES6)関連
## 文法いろいろ
```js
// 変数宣言
// var x = 0 //スコープ広い
let x = 0 //スコープ内でのみ有効
const y = 42 //再代入不可

// function
new Vue({
  methods: {
    // 以下は handle: function(){ ... } と同じ。
    // プロパティとして関数を宣言するときは function を省略できる。
    handle(){  ...  }
  }
})

//アロー関数
let hoge = () => "hoge"
let fuga = arg => "fuga and " + arg
let piyo = (arg1, arg2) => {
  let joined = arg1 + "piyo" + arg2;
  return joined;
}

//テンプレートリテラル
let template = `
  <div class="sample">
    <p>${ this.variable }</p>
  </div>`

// オブジェクトプロパティのショートバンド
let short = {
  hoge, fuga // 変数名がプロパティの名前になる
}
// let short = {
//   hoge: hoge,
//   fuga: fuga
// }

// 多重代入(分割代入)
let [a,b] = [1,2] // aに1, bに2が代入される
let { a } = {a:'A', b:'B', c:'C'} // a に 'A'が 代入される

// スプレッド演算子
let args = [1,2]
piyo(...args) // piyo(1,2)と同義
let args_ex = [ ...args, 3] // [1,2,3]
```

## モジュール定義とインポート
###### Sample.js
```js
var state = {
  count: 1
}

export default state
```

`export default state` は、デフォルトのimport文で呼ばれたときに返すデータを定義している。
```js
import Sample from './Sample.js'
```
みたいに書くと、stateのオブジェクトをSampleという変数名としてインポートする。


### `export default` vs `module.exports =`

[こちら参照](https://qiita.com/kiyodori/items/01d07d5c0659e539ecb9)
> ・基本的にはexport defaultを使う
> ・複数のモジュールをexportするときはexportを使う
> ・受け取り側はimportを使う

### `require` vs `import`

[こちら参照](https://qiita.com/minato-naka/items/39ecc285d1e37226a283)
> モジュール読み込みの仕様の主要なものとして、ESM (ECMAScript Modules)とCJS (CommonJS Modules)があります。
> importを使うのがESM方式で、requireを使うのがCJS方式
> require文は、CommonJSの仕様で、Nodejsの環境で動作してくれる書き方です。Nodejs環境ということはつまり、サーバサイドでの実行ということになります。

import を使うのが良さそう。



------------------------------------------
# メモ

## 開発環境
### Ubuntu(WSL)環境にNode.jsをインストールする
```sh
$ sudo apt update
$ sudo apt install nodejs npm
$ sudo npm install n -g
$ sudo n stable
$ # sudo apt purge -y nodejs npm #古いのは消すex
```

### Vue CLI
```sh
$ sudo npm install -g @vue/cli
$ vue --version
@vue/cli 4.3.1
```

### VS Codeに入れた拡張
+ ESLint
+ Prettier
+ Veture (主な使い方は[ここ](https://vuejs.github.io/vetur/snippet.html)。[このあたり](https://biz-navi.site/vscode%EF%BC%8Bvetur/)も参考に。)
+ Vue Peek
+ Auto Rename Tag


## いろいろ
+ `<ol>`: 連番
+ `<ul>`: `・` だけ。
