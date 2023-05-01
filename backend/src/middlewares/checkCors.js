const allowedCors = [
  'https://imakedthese.xyz',
  'localhost:3000',
  '127.0.0.1:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  }
  next();
};
