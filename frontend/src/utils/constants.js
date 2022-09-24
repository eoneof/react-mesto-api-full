export const apiConfig = {
  CARDS: 'cards',
  LIKES: 'likes',
  AVATAR: 'avatar',
  REQ_HEADERS: {
    'content-type': 'application/json',
  },

  API_URL: 'http://localhost:3001',
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
