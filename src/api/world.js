import request from '@/utils/request'

export function getList(name, page, limit) {
  return request({
    url: `/world/getAllWorld?name=${encodeURIComponent(name)}&page=${page}&limit=${limit}`,
    method: 'get'
  })
}

export function getByID(id) {
  return request({
    url: `/world/getWorldById/${id}`,
    method: 'get'
  })
}

export function createNew(data) {
  return request({
    url: '/world/addWorld',
    method: 'post',
    data
  })
}

export function updateById(data) {
  return request({
    url: `/world/updateWorld/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteById(id) {
  return request({
    url: `/world/deleteWorld/${id}`,
    method: 'delete'
  })
}
