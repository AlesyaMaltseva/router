import Navbar from '../components/navbar'
//import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
//import { HashRouter, Switch, Route } from "react-router-dom";

import {
	createRoutesFromElements,
	createBrowserRouter,
	RouterProvider,
	Route,
} from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from '../components/home'
import Contact from '../components/contact'
import About from '../components/about'
import { redirect } from "react-router-dom";


function Homepage() {

return <>
<Navbar />
</>
}


export default Homepage;


{/* <div>
<HashRouter>
<Navbar></Navbar>
<div className="content">

<Switch>
<Route exact path="/" element={<Home />}/>
<Route path="/contact" element={<Contact />}/>
<Route path="/about" element={<About />}/>
</Switch>
</div>
</HashRouter>
</div> */}