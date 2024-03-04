import request from '@/utils/request'

export function getStatisticAmount(params) {
  return request({
    url: `/statistic/getAmount`,
    method: 'get'
  })
}
export function getProjectTableList(params) {
  return request({
    url: `/china/heritages`,
    method: 'get'
  })
}

export function getUserTableList(params) {
  return request({
    url: `/user/getList`,
    method: 'get'
  })
}
