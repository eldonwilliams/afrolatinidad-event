import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Presenter from './attendance/Presenter.tsx'
import Guest from './attendance/Guest.tsx'
import Admin from './admin/Admin.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/attendance/presenter",
    element: <Presenter />
  },
  {
    path: "/attendance/guest",
    element: <Guest />
  },
  {
    path: "/admin",
    element: <Admin />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
