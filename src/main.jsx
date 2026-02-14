import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter, createHashRouter, createStaticRouter,
	RouterProvider,
} from 'react-router-dom';

import './index.module.css';
import './App.module.css';
//import App from './App.jsx'
import Root from './Root.jsx';
// import Product1 from './routes/product1.jsx';
// import Product2 from './routes/product2.jsx';
import Product1 from './router/product1.jsx';
import Product2 from './router/product2.jsx';
import Product3 from './router/product3.jsx';
import Gsap from './router/Gsap.jsx';
import GsapVertical from './router/GsapVertical.jsx';
import GsapCarousel from './router/GsapCarousel.jsx';
import GsapScrollTrigger from './router/GsapScrollTrigger.jsx';

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
{
	path: '/product3/',
	element: <Product3 />,
},
{
	path: '/gsap/',
	element: <Gsap />,
},
{
	path: '/gsap-vertical/',
	element: <GsapVertical />,
},
{
	path: '/gsap-carousel/',
	element: <GsapCarousel />,
},
{
	path: '/gsap-scroll-trigger/',
	element: <GsapScrollTrigger />,
},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
      <RouterProvider router={router} />
	</React.StrictMode>
);

