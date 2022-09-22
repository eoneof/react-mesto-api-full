import { apiConfig as cfg } from './constants.js';

function handleResponse(res) {
  if (res.ok) {
    return res;
  }
  return Promise.reject(res.status);
}

export function register({ email, password }) {
  return fetch(`${cfg.API_URL}/${cfg.REGISTER}`, {
    method: 'POST',
    headers: cfg.RES_HEADERS,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return handleResponse(res);
  });
}

export function authorize({ email, password }) {
  return fetch(`${cfg.API_URL}/${cfg.LOGIN}`, {
    method: 'POST',
    headers: cfg.RES_HEADERS,
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return handleResponse(res);
  });
}

export function getUserInfo(jwt) {
  return fetch(`${cfg.API_URL}/${cfg.USER}`, {
    method: 'GET',
    headers: {
      ...cfg.RES_HEADERS,
      authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    return handleResponse(res);
  });
}
