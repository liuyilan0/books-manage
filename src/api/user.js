import request from '@/utils/request'

export function getList(data) {
  const { username, type, status, pageRow, pageNum } = data
  return request({
    url: `/user/getList?username=${encodeURIComponent(username)}&type=${type}&status=${status}&page=${pageNum}&limit=${pageRow}`,
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/user/deleteUser/${id}`,
    method: 'delete'
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
