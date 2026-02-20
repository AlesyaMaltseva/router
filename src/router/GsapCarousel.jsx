import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react/dist";    
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";
import { GSDevTools } from "gsap/dist/GSDevTools";
import { SplitText } from "gsap/dist/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP,Draggable,ScrollTrigger,GSDevTools,InertiaPlugin,SplitText);
import './gsapcarousel.css'
import { useEffect } from "react";

function GsapCarousel() {

const gallery = useRef();
const { contextSafe } = useGSAP({scope: gallery});


contextSafe(() => {
useEffect(() => {

let iteration = 1; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.
//повторяется, когда мы прокручиваем до конца или до начала и оборачиваем - позволяет нам плавно продолжить очистку головки воспроизведения в правильном направлении.

// set initial state of items
// установите начальное состояние элементов
gsap.set('.cards li', {yPercent: 150, opacity: 0, scale: 0});

const spacing = 0.13, // spacing of the cards (stagger) // расстояние между картами (в шахматном порядке)
  snapTime = gsap.utils.snap(spacing), // we'll use this to snapTime the playhead on the seamlessLoop // мы будем использовать это, чтобы привязать время воспроизведения к бесшовной петле
  cards = gsap.utils.toArray('.cards li'),
  // this function will get called for each element in the buildSeamlessLoop() function, and we just need to return an animation that'll get inserted into a master timeline, spaced
  // эта функция будет вызываться для каждого элемента в функции buildSeamlessLoop(), и нам просто нужно вернуть анимацию, которая будет вставлена в основную временную шкалу с интервалом
  animateFunc = element => {
    const tl = gsap.timeline();
    tl.fromTo(element, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: -1, ease: "power1.in", immediateRender: false})
      .fromTo(element, {yPercent: 150}, {yPercent: -150, duration: 1, ease: "none", repeat: -1, immediateRender: false}, 0);
    return tl;
  },
  seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
  playhead = {offset: 0}, // a proxy object we use to simulate the playhead position, but it can go infinitely in either direction and we'll just use an onUpdate to convert it to the corresponding time on the seamlessLoop timeline.
  // прокси-объект, который мы используем для имитации положения точки воспроизведения, но оно может изменяться бесконечно в любом направлении, и мы просто используем onUpdate, чтобы преобразовать его в соответствующее время на временной шкале seamlessLoop.

  wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()), // feed in any offset (time) and it'll return the corresponding wrapped time (a safe value between 0 and the seamlessLoop's duration) // введите любое смещение (время), и оно вернет соответствующее время обертывания (безопасное значение между 0 и продолжительностью бесшовной петли).

  scrub = gsap.to(playhead, { // we reuse this tween to smoothly scrub the playhead on the seamlessLoop // мы используем это средство повторно, чтобы плавно отшлифовать направляющую на бесшовной петле
    offset: 0,
    onUpdate() {
      seamlessLoop.time(wrapTime(playhead.offset)); // convert the offset to a "safe" corresponding time on the seamlessLoop timeline
    },
    duration: 0.5,
    ease: "power3",
    paused: true
  }),
  trigger = ScrollTrigger.create({
    start: 0,
    onUpdate(self) {
      let scroll = self.scroll();
      if (scroll > self.end - 1) {
        wrap(1, 2);
      } else if (scroll < 1 && self.direction < 0) {
        wrap(-1, self.end - 2);
      } else {
        scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
        scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update. //чтобы повысить производительность, мы просто отключаем и перезапускаем ту же анимацию. Нет необходимости перезаписывать или создавать новую анимацию при каждом обновлении.
      }
    },
    end: "+=3000",
    pin: ".gallery"
  }),
  // converts a progress value (0-1, but could go outside those bounds when wrapping) into a "safe" scroll value that's at least 1 away from the start or end because we reserve those for sensing when the user scrolls ALL the way up or down, to wrap.
  // преобразует значение хода выполнения (0-1, но при переносе может выйти за эти границы) в "безопасное" значение прокрутки, которое находится на расстоянии не менее 1 от начала или конца, потому что мы сохраняем их для определения того, когда пользователь прокручивает до конца вверх или вниз для переноса.
  progressToScroll = progress => gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end),
  wrap = (iterationDelta, scrollTo) => {
    iteration += iterationDelta;
    trigger.scroll(scrollTo);
    trigger.update(); // by default, when we trigger.scroll(), it waits 1 tick to update(). // по умолчанию, когда мы запускаем.scroll(), он ожидает 1 тик для обновления().
  };

// when the user stops scrolling, snap to the closest item. // когда пользователь перестанет прокручивать, перейдите к ближайшему элементу.
ScrollTrigger.addEventListener("scrollEnd", () => scrollToOffset(scrub.vars.offset));

// feed in an offset (like a time on the seamlessLoop timeline, but it can exceed 0 and duration() in either direction; it'll wrap) and it'll set the scroll position accordingly. That'll call the onUpdate() on the trigger if there's a change.
// введите смещение (например, время на временной шкале seamlessLoop, но оно может превышать 0 и duration() в любом направлении; это приведет к перетеканию) и соответствующим образом задаст положение прокрутки. Это вызовет onUpdate() в триггере, если произойдут изменения.
function scrollToOffset(offset) { // moves the scroll playhead to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary. // перемещает элемент прокрутки в положение, соответствующее значению totalTime для бесшовной петли, и при необходимости перемещает его.
  let snappedTime = snapTime(offset),
    progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration(),
    scroll = progressToScroll(progress);
  if (progress >= 1 || progress < 0) {
    return wrap(Math.floor(progress), scroll);
  }
  trigger.scroll(scroll);
}

document.querySelector(".next").addEventListener("click", () => scrollToOffset(scrub.vars.offset + spacing));
document.querySelector(".prev").addEventListener("click", () => scrollToOffset(scrub.vars.offset - spacing));


// below is the dragging functionality (mobile-friendly too)... // ниже приведена функциональность перетаскивания (также удобная для мобильных устройств).
Draggable.create(".drag-proxy", {
  type: "y",
  trigger: ".cards",
  onPress() {
    this.startOffset = scrub.vars.offset;
  },
  onDrag() {
    scrub.vars.offset = this.startOffset + (this.startY - this.y) * 0.001;
    scrub.invalidate().restart(); // same thing as we do in the ScrollTrigger's onUpdate // то же самое, что мы делаем при обновлении ScrollTrigger
  },
  onDragEnd() {
    scrollToOffset(scrub.vars.offset);
  }
});


function buildSeamlessLoop(items, spacing, animateFunc) {
  let overlap = Math.ceil(1 / spacing), // number of EXTRA animations on either side of the start/end to accommodate the seamless looping // количество ДОПОЛНИТЕЛЬНЫХ анимаций по обе стороны от начала / конца для обеспечения плавного зацикливания
    startTime = items.length * spacing + 0.5, // the time on the rawSequence at which we'll start the seamless loop // время в исходной последовательности, с которого мы начнем непрерывный цикл
    loopTime = (items.length + overlap) * spacing + 1, // the spot at the end where we loop back to the startTime // точка в конце, где мы возвращаемся к началу цикла
    rawSequence = gsap.timeline({paused: true}), // this is where all the "real" animations live // именно здесь живут все "настоящие" анимации
    seamlessLoop = gsap.timeline({ // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop // это просто стирает начальную часть rawSequence, так что кажется, что она плавно зацикливается
      paused: true,
      repeat: -1, // to accommodate infinite scrolling/looping // для обеспечения бесконечной прокрутки/зацикливания
      onRepeat() { // works around a super rare edge case bug that's fixed GSAP 3.6.1 // работает над устранением очень редкой ошибки edge case, исправленной в GSAP 3.6.1
        this._time === this._dur && (this._tTime += this._dur - 0.01);
      }
    }),
    l = items.length + overlap * 2,
    time, i, index;

  // now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping. //теперь выполните цикл и создайте все анимации в шахматном порядке. Помните, что мы должны создать дополнительные анимации в конце, чтобы обеспечить плавное зацикливание.
  for (i = 0; i < l; i++) {
    index = i % items.length;
    time = i * spacing;
    rawSequence.add(animateFunc(items[index]), time);
    i <= items.length && seamlessLoop.add("label" + i, time); // we don't really need these, but if you wanted to jump to key spots using labels, here ya go. // на самом деле нам это не нужно, но если вы хотите перейти к ключевым моментам, используя ярлыки, то вот, пожалуйста.
  }

  // here's where we set up the scrubbing of the playhead to make it appear seamless. // здесь мы настраиваем очистку головки воспроизведения, чтобы она выглядела бесшовной.
  rawSequence.time(startTime);
  seamlessLoop.to(rawSequence, {
    time: loopTime,
    duration: loopTime - startTime,
    ease: "none"
  }).fromTo(rawSequence, {time: overlap * spacing + 1}, {
    time: startTime,
    duration: startTime - (overlap * spacing + 1),
    immediateRender: false,
    ease: "none"
  });
  return seamlessLoop;
}
} 
)
}) 

return <>
    <div className="gallery" ref={gallery}>
    
  <ul className="cards">
  
    <li style={{backgroundImage:"url('src/router/img/Allround.png')"}}></li>
    <li style={{backgroundImage:"url('src/router/img/Premium.png')"}}></li>
    <li style={{backgroundImage:"url('src/router/img/Economy.png')"}}></li>
    <li style={{backgroundImage:"url('src/router/img/Smooth.png')"}}></li>
    <li style={{backgroundImage:"url('src/router/img/Ultra.png')"}}></li>
    <li style={{backgroundImage:"url('src/router/img/Allround.png')"}}></li>
    <li style={{backgroundImage:"url('src/router/img/Economy.png')"}}></li>
    <li style={{backgroundImage:"url('src/router/img/Smooth.png')"}}></li>
    <li style={{backgroundImage:"url('src/router/img/Premium.png')"}}></li>
    

  </ul>
  <div className="actions">
    <button className="prev">Prev</button>
    <button className="next">Next</button>
  </div>
</div>
<div className="drag-proxy"></div>
</>
}

export default GsapCarousel;

/*<li style={{backgroundImage:"url(https://assets.codepen.io/16327/portrait-number-01.png)"}}></li>
    <li style={{backgroundImage:"url(https://assets.codepen.io/16327/portrait-number-02.png)"}}></li>
    <li style={{backgroundImage:"url(https://assets.codepen.io/16327/portrait-number-03.png)"}}></li>
    <li style={{backgroundImage:"url(https://assets.codepen.io/16327/portrait-number-04.png)"}}></li>
    <li style={{backgroundImage:"url(https://assets.codepen.io/16327/portrait-number-05.png)"}}></li>
    <li style={{backgroundImage:"url(https://assets.codepen.io/16327/portrait-number-06.png)"}}></li>
    <li style={{backgroundImage:"url(https://assets.codepen.io/16327/portrait-number-07.png)"}}></li>*/