import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter, createHashRouter, createStaticRouter,
	RouterProvider,
} from 'react-router-dom';
import './index.css'
import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
const router = createHashRouter([
	{
		path: '/router/',
		element: <div>Hello Router!</div>,
	},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
      <RouterProvider router={router} />
	</React.StrictMode>
);

