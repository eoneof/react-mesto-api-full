export function requestErrorHandler(err) {
  console.warn(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`,
  );
}

export function getToken() {
  const jwt = localStorage.getItem('jwt');
  if (!jwt) {
    return null;
  }
  return jwt;
}
