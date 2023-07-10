import React from 'react'
import ReactDOM from 'react-dom/client'
import router from "./Routes/app.routes.jsx"
import { RouterProvider } from 'react-router-dom'
import './index.css'
import AuthProvider from './Auth/AuthProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
)
