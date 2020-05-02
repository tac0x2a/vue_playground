ルートのテンプレート
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
# メモ

+ `<ol>`: 連番
+ `<ul>`: `・` だけ。