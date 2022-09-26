const isDev = () => {
  if (process.env.REACT_APP_ENV === 'development') {
    return true;
  }
  return false;
};

export const apiConfig = {
  CARDS: 'cards',
  LIKES: 'likes',
  AVATAR: 'avatar',
  REQ_HEADERS: {
    'content-type': 'application/json',
  },

  API_URL: isDev() ? '127.0.0.1:3001' : 'api.eoneof.nomoredomains.sbs',
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
