import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Authentication, {PageType} from './pages/Authentication.jsx'
import AddProduct from './pages/AddProduct.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
   {
    path: "/login",
    element: <Authentication pageType={PageType.LOGIN} />,
  },
  {
    path: "/register",
    element: <Authentication pageType={PageType.REGISTER} />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  {
    path: "/*",
    element: <App />,
  },  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
