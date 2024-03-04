import request from '@/utils/request'

export function getList(data) {
  const { name, pageRow, pageNum } = data
  return request({
    url: `/forum/getForumList?name=${encodeURIComponent(name)}&page=${pageNum}&limit=${pageRow}`,
    method: 'get'
  })
}

export function addForum(data) {
  return request({
    url: '/forum/addForum',
    method: 'post',
    data
  })
}

export function editForum(data) {
  return request({
    url: `/forum/updateForum/${data.id}`,
    method: 'put',
    data
  })
}

export function deleteForum(data) {
  console.log(data)
  return request({
    url: `/forum/deleteForum/${data.id}`,
    method: 'delete'
  })
}
