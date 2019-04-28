import jwt from 'jsonwebtoken';

// Bearer Token String -> Boolean

export default function checkTokenExpiry(token:string):boolean {
  const decoded = jwt.decode(token.split(' ')[1]);
  console.log(decoded);
  const now = Date.now().valueOf() / 1000;
  if (decoded && decoded.exp > now) {
    return true;
  }
  return false;
}