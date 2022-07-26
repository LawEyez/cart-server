const items = [
  {
    total: 20
  },
  {
    total: 20
  },
  {
    total: 20
  },
]

const total = items.reduce((_total, item) => _total + item.total, 0)

console.log(total)