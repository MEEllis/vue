import request from '../utils/request';

export async function accountLogin(params) {
  return request('/login/account', {
    method: 'POST',
    body: params,
  });
}