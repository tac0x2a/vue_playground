Vue.component("new-component", {
  template: "<p>New Component!!</p>",
})

new Vue({
  el: "#app", //# マウントする要素。html上の `<div id="app">` と対応する。

  data: {
    //リアクティブデータ。変数と初期値。
    message: "Hello,Vue.js!",
    itemName: "item",
    array: ["a", "b", "c"],
    out: "Blank",
    select: "えらんでね",
    selectMulti: [],
    poke: "どれにする？",
    url: "https://www.tac42.net",
    show: true,
  },

  methods: {
    // イベントハンドラを書いたり、処理を分割するのにつかう
    handleClick: function (event) {
      alert(this.out);
    },
    handleClick: function (i, event) {
      alert(this.out + "" + i);
    },
    removeItem: function (idx) {
      this.array.splice(idx, 1);
    },

    addItem: function () {
      //this.array[2] = "d"; // 配列要素の更新は反映されない・・・
      this.array.push(this.itemName);
    },
    bracket: function (idx) {
      // 要素を置き換える場合は $set で。
      this.$set(this.array, idx, "[" + this.array[idx] + "]");
    },

    handleInput: function (event) {
      if (event.target.value.length < 10) {
        this.out = event.target.value; //別の変数の値を更新する
      }
    },
  },
});

new Vue({
  el: "#app2", //# マウントする要素。html上の `<div id="app">` と対応する。

  data: {
    //リアクティブデータ。変数と初期値。
    isA: true,
    isB: false,
    isC: true,
    message: "Hello,Vue.js 2!",
    isChild: true,
    isActive: true,
    textColor: "blue",
    bgColor: "green",
    round: 10,
    col: "#008000",
    show: false,
  },

  computed: {
    cmp: function () {
      return this.round * 2;
    },
  },

  methods: {
    toggle: function () {
      this.show = !this.show;
    },
  },
});
