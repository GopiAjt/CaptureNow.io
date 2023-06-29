var t1 = gsap.timeline();

t1
  .to('#loader', {
    height: 0,
    duration: 2,
    ease: Expo.easeInOut
  })
  .to("#white", {
    height: "100%",
    duration: 2,
    delay: -1.6,
    ease: Expo.easeInOut
  })

function revelToSpan() {
  document.querySelectorAll(".reveal")
    .forEach(function (elem) {
      //create two spans
      let spanParent = document.createElement("span")
      let spanChild = document.createElement("span")

      //give respective class name to the elemets
      spanParent.classList.add("parent");
      spanChild.classList.add("child");

      //span parent gets child and child gets elem details
      spanChild.innerHTML = elem.innerHTML;
      spanParent.appendChild(spanChild);

      //elem replaces its value with parent span
      elem.innerHTML = "";
      elem.appendChild(spanParent);
    });
}
revelToSpan();

t1.from(".parent .child",{
  y: "100%",
  ease: Circ.easeInOut
})
.to(".parent .child",{
  y: "0%",
  ease: Circ.easeInOut
})