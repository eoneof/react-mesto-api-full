
export const apiConfig = {
  CARDS: 'cards',
  LIKES: 'likes',
  AVATAR: 'avatar',
  REQ_HEADERS: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'content-type': 'application/json',
  },

  API_URL: 'http://127.0.0.1:3001',
  LOGIN: 'signin',
  REGISTER: 'signup',
  USER: 'users/me',
  RES_HEADERS: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
};

export const paths = {
  any: '*',
  root: '/',
  login: '/signin',
  register: '/signup',
};
