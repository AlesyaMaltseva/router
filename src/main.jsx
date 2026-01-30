import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter, createHashRouter, createStaticRouter,
	RouterProvider,
} from 'react-router-dom';

import './index.module.css';
//import App from './App.jsx'
import Root from './Root.jsx';
// import Product1 from './routes/product1.jsx';
// import Product2 from './routes/product2.jsx';
import Product1 from './router/product1.jsx';
import Product2 from './router/product2.jsx';
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
	element: <Product1 />,
},
{
	path: '/product2/',
	element: <Product2 />,
},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
      <RouterProvider router={router} />
	</React.StrictMode>
);

