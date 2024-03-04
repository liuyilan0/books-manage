import request from '@/utils/request'

export function getAllPolicies(filters) {
  const params = new URLSearchParams()
  Object.keys(filters).forEach((key) => {
    if (filters[key] !== null && filters[key] !== undefined) {
      params.append(key, filters[key].toString())
    }
  })
  return request({
    url: `/policy/policies?${params.toString()}`,
    method: 'get'
  })
}
export function createNew(data) {
  return request({
    url: '/policy/addPolicy',
    method: 'post',
    data
  })
}
export function update(data) {
  return request({
    url: `/policy/update/${data.id}`,
    method: 'put',
    data
  })
}
export function deleteById(id) {
  return request({
    url: `/policy/deletePolicy/${id}`,
    method: 'delete'
  })
}
