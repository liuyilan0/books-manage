const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    name: '@cword(3, 7)',
    desc: '@cword(5, 10)',
    'price|30-1000': 30,
    'star|1-5': '★',
    'stock|30-100': 30,
    url: '@image("200x100", "@color", "@color")',
    pic: '@image("200x100", "@color", "@color")'
  }]
})

module.exports = [
  {
    url: '/around/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
