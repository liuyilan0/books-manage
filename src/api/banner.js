import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/home/banners',
    method: 'get',
    data
  })
}
export function addBanner(data) {
  return request({
    url: '/home/addBanner',
    method: 'post',
    data
  })
}
export function editBanner(data) {
  return request({
    url: '/home/updateBanner',
    method: 'post',
    data
  })
}
export function deleteBanner(id) {
  return request({
    url: `/home/deleteBanner/${id}`,
    method: 'delete'
  })
}
