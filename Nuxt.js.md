Nuxt.js に関するメモ

## はじめに

### とりあえず雛形で作る

```sh
npx create-nuxt-app <アプリ名>

Successfully created project <アプリ名>

  To get started:

        cd <アプリ名>
        npm run dev

  To build & start for production:

        cd <アプリ名>
        npm run build
        npm run start
```

### うごかす
```sh
npm run dev
```

## ディレクトリ構造
https://ja.nuxtjs.org/guide/directory-structure

## 設定ファイル(`nuxt.config.js`)
https://ja.nuxtjs.org/guide/configuration


## ルーティング
`pages` ディレクトリ配下のディレクトリ構成に応じてルーティングを作ってくれるらしい

### 静的ルーティング
+ ディレクトリ
  ```
  pages/
    | user/
      | index.vue
      | one.vue
    | index.vue
  ```

+ 作られるルーティング
  ```js
  router: {
    routes: [
      {
        name: 'index',
        path: '/',
        component: 'pages/index.vue'
      },
      {
        name: 'user',
        path: '/user',
        component: 'pages/user/index.vue'
      },
      {
        name: 'user-one',
        path: '/user/one',
        component: 'pages/user/one.vue'
      }
    ]
  }
  ```

### 動的ルーティング
> パラメータを使って動的なルーティングを定義するには .vue ファイル名またはディレクトリ名に アンダースコアのプレフィックス を付ける必要があります。

+ パラメータがあってもなくてもOKにしたい場合: `.../_id.vue` みたいなファイルを作る
+ パラメータを必須にしたい場合: `.../_id/index.vue` みたいにフォルダとファイルを作る

パスの途中は省略できないのでこういう仕様になってるのかも。

+ ディレクトリ
  ```
  pages/
    | _slug/
      | comments.vue
      | index.vue
    | users/
      | _id.vue
    | index.vue
  ```

+ 作られるルーティング
  ```js
  router: {
    routes: [
      {
        name: 'index',
        path: '/',
        component: 'pages/index.vue'
      },
      {
        name: 'users-id',
        path: '/users/:id?',
        component: 'pages/users/_id.vue'
      },
      {
        name: 'slug',
        path: '/:slug',
        component: 'pages/_slug/index.vue'
      },
      {
        name: 'slug-comments',
        path: '/:slug/comments',
        component: 'pages/_slug/comments.vue'
      }
    ]
  }
  ```

+ 他にもネストしたりできるらしい。

+ `_.vue`ってファイル作ると、リクエストにマッチしなかったパスに動的にマッチさせることができる。404とか作るのに良さそう。

+ vueファイルにこう書けばバリデーションできる。
  ```js
  export default {
    validate ({ params }) {
      // 数値でなければならない
      return /^\d+$/.test(params.id)
    }
  }
  ```

## ビュー

階層関係(Nuxt.jsページより)
![](https://ja.nuxtjs.org/nuxt-views-schema.svg)


### Document - HTML file
`app.html` をプロジェクト直下( `srcDir`の直下)に作って置くと、全ページ共通で使われるHTMLの雛形になる。
```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>

  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```


### Layout
> layouts ディレクトリのすべてのファイル（第一階層）は、ページコンポーネントの layout プロパティでアクセス可能なカスタムレイアウトを作成します。

`layouts`配下にテンプレートとなるvueファイル作って、`pages`配下の各vueファイルから利用する。


+ `layouts/blog.vue`
  ```html
  <template>
    <div>
      <div>ブログのナビゲーションバーをここに設置します</div>
      <nuxt/>
    </div>
  </template>
  ```

+ `pages/posts.vue`
  ```html
  <template>
    <!-- テンプレート -->
  </template>

  <script>
  export default {
    layout: 'blog' //レイアウトを指定している

    // ページコンポーネントの定義...
  }
  </script>
  ```

ブログのレイアウトみたいなものを作って

layout プロパティについての詳細： layout プロパティ