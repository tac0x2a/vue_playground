var app = new Vue({
    el: '#app',
    data: {
        message: "Hello,Vue.js!",
        array: ["a", "b", "c"],
        out: "Blank"
    },
    methods: {
        handleClick: function (event) {
            alert(event.target)
        }
    }
})