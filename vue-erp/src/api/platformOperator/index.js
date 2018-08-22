import request from '@/utils/request'

// 查询用户分页
export function getUserVoPageList(data) {
  return request({
    url: '/api/v1/manager/user/getUserVoPageList',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser(data) {
  return request({
    url: '/api/v1/manager/user/deleteUser',
    method: 'post',
    data
  })
}

// 启用禁用用户
export function enableUser(data) {
  return request({
    url: '/api/v1/manager/user/enableUser',
    method: 'post',
    data
  })
}

// 获取角色集合
export function getRoleList(data) {
  return request({
    url: '/api/v1/manager/role/getRoleList',
    method: 'post',
    data
  })
}

// 修改用户
export function userAuthUpdate(data) {
  return request({
    url: '/api/v1/manager/user/saveUser/auth_update',
    method: 'post',
    data
  })
}

// 新增用户
export function userAuthAdd(data) {
  return request({
    url: '/api/v1/manager/user/saveUser/auth_add',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: '/api/v1/manager/role/deleteRole',
    method: 'post',
    data
  })
}

// 新增角色
export function roleAuthAdd(data) {
  return request({
    url: '/api/v1/manager/role/saveRole/auth_add',
    method: 'post',
    data
  })
}

// 修改角色
export function roleAuthUpdate(data) {
  return request({
    url: '/api/v1/manager/role/saveRole/auth_update',
    method: 'post',
    data
  })
}

// 角色授权
export function rolePrivileges(data) {
  return request({
    url: '/api/v1/manager/role/privileges',
    method: 'post',
    data
  })
}

// 角色授权
export function resetPassword(data) {
  return request({
    url: '/api/v1/manager/user/resetPassword',
    method: 'post',
    data
  })
}
