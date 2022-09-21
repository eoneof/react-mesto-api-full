export function requestErrorHandler(err) {
  console.warn(
    `Произошла трагическая, непоправимая ошибка: ${err.message} | ${err.stack}`,
  );
}

export function getToken(){
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    return;
  } else {
    return jwt;
  }
}
