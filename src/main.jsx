import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
// <StrictMode>
    <GoogleOAuthProvider clientId='386551261515-36odi8olp9alj5748mnfhetkkl67i3bd.apps.googleusercontent.com'>
        <App />
    </GoogleOAuthProvider>
    
// </StrictMode>
)
