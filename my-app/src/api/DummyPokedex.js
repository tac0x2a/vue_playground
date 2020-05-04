const pokedex = [
  { number: 1, name: "フシギダネ", types: ["くさ", "どく"], height: 0.7, weight: 6.9 },
  { number: 4, name: "ヒトカゲ", types: ["ほのお"], height: 0.6, weight: 8.5 },
  { number: 7, name: "ゼニガメ", types: ["みず"], height: 0.5, weight: 9.0},
]

export default {
  fetchAll() { return pokedex },

  findFirst(number) { return pokedex.find(p => p.number == number) },

  asyncFindFirst(number, callback) {
    setTimeout(() => {
      callback(this.findFirst(number))
    }, 2000)
  }
}
