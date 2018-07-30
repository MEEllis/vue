import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

// 登录接口 ，获取公司列表
export async function fakeAccountLogin(params) {
  return request('/manager/emp/empLoginAjax.do', {
    method: 'POST',
    body: params,
  });
}
