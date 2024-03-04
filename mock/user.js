
// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://img1.baidu.com/it/u=844609329,4070348072&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    name: '超级管理员'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

// const Mock = require('mockjs')

// const data = Mock.mock({
//   'items|30': [{
//     'key|+1': 0,
//     id: '@id',
//     'type|2': ['管理员', '用户', '传承人'],
//     username: '@cword(3, 7)',
//     'status|1': [1, 2],
//     nickname: '@cword(5, 10)',
//     createTime: '@datetime',
//     achive: '@cword(10, 50)'
//   }]
// })

module.exports = [
  // {
  //   url: '/user/login',
  //   type: 'post',
  //   response: config => {
  //     const { username } = config.body
  //     const token = tokens[username]

  //     // mock error
  //     if (!token) {
  //       return {
  //         code: 60204,
  //         message: 'Account and password are incorrect.'
  //       }
  //     }

  //     return {
  //       code: 200,
  //       data: token
  //     }
  //   }
  // },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }

  // {
  //   url: '/user/list',
  //   type: 'get',
  //   response: config => {
  //     const items = data.items
  //     return {
  //       code: 200,
  //       data: {
  //         total: items.length,
  //         items: items
  //       }
  //     }
  //   }
  // }
]
