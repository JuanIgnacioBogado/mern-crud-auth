export const TOKEN_SECRET = 'some secret key';

const whitelist = ['http://localhost:5173', 'http://localhost:4173/']
export const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}