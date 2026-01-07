import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="527023026393-c5c5gijjhjo7fr9io169ing4q0lfctah.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
