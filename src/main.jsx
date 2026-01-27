import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter, createHashRouter, createStaticRouter,
	RouterProvider,
} from 'react-router-dom';

import './index.css';
//import App from './App.jsx'
import Root from './Root.jsx';
import Product from './routes/product.jsx';
import ErrorPage404 from './error-page-404.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
const router = createHashRouter([
	{
		path: '/',
		element: <Root />,
    	errorElement: <ErrorPage404 />,
	},
	{
	path: '/product1/',
	element: <Product />,
},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
      <RouterProvider router={router} />
	</React.StrictMode>
);

