import request from '@/utils/request'

export function getList(name, page, limit) {
  return request({
    url: `/china/heritages?name=${encodeURIComponent(name)}&page=${page}&limit=${limit}`,
    method: 'get'
  })
}

export function getByID(id) {
  return request({
    url: `/china/heritage/${id}`,
    method: 'get'
  })
}

export function createNew(data) {
  return request({
    url: '/china/addHeritage',
    method: 'post',
    data
  })
}

export function updateById(data) {
  return request({
    url: `/china/updateHeritage/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteById(id) {
  return request({
    url: `/china/deleteHeritage/${id}`,
    method: 'delete'
  })
}
