import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react/dist";    
import { Draggable } from "gsap/dist/Draggable";
import { GSDevTools } from "gsap/dist/GSDevTools";
import { SplitText } from "gsap/dist/SplitText";
gsap.registerPlugin(useGSAP,Draggable,GSDevTools,SplitText);
import './gsapstyles.css'

function Gsap() {


    return <>
	<main>   
  <div className="slides-container">
    <div className="slides-inner">
      <div className="slide">1</div>
      <div className="slide">2</div>
      <div className="slide">3</div>
      <div className="slide">4</div>
      <div className="slide">5</div>
      <div className="slide">6</div>
      <div className="slide">7</div>
      <div className="slide">8</div>
      <div className="slide">9</div>
      <div className="slide">10</div>
    </div>
  </div>
  
  <div className="controls">
    <button id="prevButton">Prev</button>
    <button id="nextButton">Next</button>
  </div>
  
</main>
	</>;
}

export default Gsap;