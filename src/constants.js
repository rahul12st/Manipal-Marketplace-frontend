
const API_URL = process.env.NODE_ENV != 'development' ?
    'https://manipal-marketplace-backend-dp7l.vercel.app/' :
    'https://manipal-marketplace-backend-dp7l.vercel.app/';

console.log(process.env, "API_URL");

export default API_URL;
