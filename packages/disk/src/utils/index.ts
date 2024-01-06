import COS from 'cos-js-sdk-v5';
import { SECRET_ID, SECRET_KEY } from './const';
export const getCos = () => {
  return new COS({
    SecretId: SECRET_ID,
    SecretKey: SECRET_KEY,
  });
}