import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react/dist";    
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";
import { GSDevTools } from "gsap/dist/GSDevTools";
import { SplitText } from "gsap/dist/SplitText";
gsap.registerPlugin(useGSAP,Draggable,GSDevTools,InertiaPlugin,SplitText);
import './gsapstyles.css';
import Allround from './img/Allround.png';
import Economy from './img/Economy.png';
import Premium from './img/Premium.png';
import Smooth from './img/Smooth.png';
import Ultra from './img/Ultra.png';


function Gsap() {

const slidesCarousel = useRef();
const {contextSafe} = useGSAP({scope:slidesCarousel})

const carousel = contextSafe(() => {

let slideDelay = 2;
let slideDuration = 1.3;
let snapX;

let slides = document.querySelectorAll(".slide");
let autoPlayLimit = slides.length * 100;
let autoPlayCount = 1;
let prevButton = document.querySelector("#prevButton");
let nextButton = document.querySelector("#nextButton");
let progressWrap = gsap.utils.wrap(0,1);

let numSlides = slides.length;

gsap.set(slides, {
//   backgroundColor: "random([red, blue, green, purple, orange, yellow, lime, pink])",
//   backgroundImage: "random(['url('./img/Allround.png')', 'url('./img/Economy.png')'])",
  xPercent: i => i * 100
});

let wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
let timer = gsap.delayedCall(slideDelay, autoPlay);

let animation = gsap.to(slides, {
  xPercent: "+=" + (numSlides * 100),
  duration: 1,
  ease: "none",
  paused: true,
  repeat: -1,
  modifiers: {
    xPercent: wrap
  }
});

let proxy = document.createElement("div");
let slideAnimation = gsap.to({}, {});
let slideWidth = 0;
let wrapWidth = 0;
resize();

let draggable = new Draggable(proxy, {
  trigger: ".slides-container",
  inertia: true,
  onPress: updateDraggable,
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  snap: {     
    x: snapX
  }
});

window.addEventListener("resize", resize);

prevButton.addEventListener("click", function() {
  animateSlides(1);
});

nextButton.addEventListener("click", function() {
  animateSlides(-1);
});

function updateDraggable() {
  timer.restart(true);
  slideAnimation.kill();
  this.update();
}

function animateSlides(direction) {
    
  timer.restart(true);
  slideAnimation.kill();
  
  let x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
  
  slideAnimation = gsap.to(proxy, {
    x: x,
    duration: slideDuration,
    onUpdate: updateProgress
  });  
}

function autoPlay() {  
  if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
    timer.restart(true);
  } else {
    autoPlayCount++;
    if (autoPlayCount < autoPlayLimit) {
      animateSlides(-1);
    }
  }
}

function updateProgress() { 
  animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
}

function resize() {
  
  let norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
  
  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;
  snapX = gsap.utils.snap(slideWidth);
  
  gsap.set(proxy, {
    x: norm * wrapWidth
  });
  
  animateSlides(0);
  slideAnimation.progress(1);
}

});


useLayoutEffect(() => {
  carousel();
})

    return <>
	<main>   
  <div className="slides-carousel" ref={slidesCarousel}>
    <div className="slides-container">
      <div className="slides-inner">
        <div className="slide"><img src={Allround} /></div>
        <div className="slide"><img src={Economy} /></div>
        <div className="slide"><img src={Premium} /></div>
        <div className="slide"><img src={Smooth} /></div>
        <div className="slide"><img src={Ultra} /></div>    
      </div>    
    </div>
  
    <div className="controls">
      <button id="prevButton">Prev</button>
      <button id="nextButton">Next</button>
    </div>
  </div>
  
</main>
	</>;
}

export default Gsap;