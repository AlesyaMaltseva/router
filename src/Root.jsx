import Anchor from './components/anchor.jsx'
import Buttons from "./style/Buttons.jsx"
import classes from "./index.module.css"
import { Link } from "react-router";
import {useState, useEffect } from 'react';
	

function Root() {

const [text, setText] = useState('Тайтл');

	useEffect(()=>{
		document.title = text;
	}, [text]	
	);

	function changeText() {
	setText('Меняем title');
}

	return <>

	<div>		
		<button onClick={changeText}>change</button>
	</div>

	<div className={classes.app}>
			<h2 className={classes.title}>CSS Module Buttons</h2>
			<div id={classes.wrapper} className={classes.pink}>
				<div>Это абзац для проверки стилей.</div>
				<div>Второй абзац для теста.</div>
				<div>Для тестового нужен третий абзац.</div>
				<Buttons />
			</div>
	</div>

		
		<br /><br />
			<a href={`#/product1/`}>Product1</a><br />
			<a href={`#/product2/`}>Product2</a><br />
			<a href={`#/product3/`}>Product3</a><br />
			<a href={`#/gsap/`}>Gsap</a>

			{/* <Anchor /> */}
	</>
}

export default Root;