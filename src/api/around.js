import request from '@/utils/request'

export function getList(data) {
  const { name, pageRow, pageNum } = data
  return request({
    url: `/around/getList?name=${encodeURIComponent(name)}&page=${pageNum}&limit=${pageRow}`,
    method: 'get'
  })
}

export function addAround(data) {
  return request({
    url: '/around/addAround',
    method: 'post',
    data
  })
}

export function editAround(data) {
  return request({
    url: `/around/updateAround/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteAround(data) {
  return request({
    url: `/around/deleteAround/${data.id}`,
    method: 'delete'
  })
}
