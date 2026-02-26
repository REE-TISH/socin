const LOCAL_URL = "http://localhost:8000"; // for local development
const PROD_URL = 'https://socin-backend-6s67.onrender.com' // replace with your backend
const CURRENT_URL = PROD_URL; // change to PROD_URL for production
const REFRESH_URL = `${CURRENT_URL}/user/token/refresh/`; // endpoint to refresh token



export { LOCAL_URL, PROD_URL, REFRESH_URL,CURRENT_URL };
