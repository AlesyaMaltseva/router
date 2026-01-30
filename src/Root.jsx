import Anchor from './components/anchor.jsx'
import Buttons from "./components/Buttons.jsx"
import { Link } from "react-router";

function Root() {
	return <>
			<Buttons /><br /><br />
			<a href={`#/product1/`}>Product1</a><br />
			<a href={`#/product2/`}>Product2</a>

			<Anchor />
	</>
}

export default Root;