new Vue({
    el: '#app', //# マウントする要素。html上の `<div id="app">` と対応する。

    data: { //リアクティブデータ。変数と初期値。
        message: "Hello,Vue.js!",
        array: ["a", "b", "c"],
        out: "Blank",
        url: "https://www.tac42.net"
    },

    methods: { // イベントハンドラを書いたり、処理を分割するのにつかう
        handleClick: function (event) {
            alert(this.out)
        }
    }
})

new Vue({
    el: '#app2', //# マウントする要素。html上の `<div id="app">` と対応する。

    data: { //リアクティブデータ。変数と初期値。
        message: "Hello,Vue.js 2!",
        isChild: true,
        isActive: true,
        textColor: "blue",
        bgColor: "green",
        round: 10
    }
})