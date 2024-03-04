import request from '@/utils/request'

export function queryAll(type) {
  return request({
    url: `/my/getRecords`,
    method: 'get'
  })
}

export function updateByID(data) {
  return request({
    url: `/my/update/${data.id}`,
    method: 'put',
    data
  })
}
