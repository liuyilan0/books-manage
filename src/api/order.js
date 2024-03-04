import request from '@/utils/request'

export function getList(data) {
  const { username, pageRow, pageNum } = data
  return request({
    url: `/order/getList?username=${encodeURIComponent(username)}&page=${pageNum}&limit=${pageRow}`,
    method: 'get'
  })
}

export function deleteOrder(data) {
  return request({
    url: `/order/delete/${data.id}`,
    method: 'delete'
  })
}
