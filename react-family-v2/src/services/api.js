import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function querySellingPoint(params) {
  return request('/api/querySellingPoint', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function addSellingPoint(params) {
  return request('/api/addSellingPoint', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSellingPoint(params) {
  return request('/api/updateSellingPoint', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function updateSellingPointState(params) {
  return request('/api/updateSellingPointState', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function deleteSellingPoint(params) {
  return request('/api/deleteSellingPoint', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
