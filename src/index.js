import './index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';
import ProductDetail from './components/ProductDetail';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/MyProducts';
import MyProfile from './components/MyProfile';

// Directly set the backend API URL
const API_URL = 'https://manipal-marketplace-backend-dp7l.vercel.app';

// Use the API URL in your components when making requests
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home apiUrl={API_URL} />),
  },
  {
    path: "/category/:catName",
    element: (<CategoryPage apiUrl={API_URL} />),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login apiUrl={API_URL} />),
  },
  {
    path: "/signup",
    element: (<Signup apiUrl={API_URL} />),
  },
  {
    path: "/add-product",
    element: (<AddProduct apiUrl={API_URL} />),
  },
  {
    path: "/liked-products",
    element: (<LikedProducts apiUrl={API_URL} />),
  },
  {
    path: "/my-products",
    element: (<MyProducts apiUrl={API_URL} />),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetail apiUrl={API_URL} />),
  },
  {
    path: "/my-profile",
    element: (<MyProfile apiUrl={API_URL} />),
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
