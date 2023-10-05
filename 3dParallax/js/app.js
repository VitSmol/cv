const layers = document.querySelector('.layers')
layers.addEventListener("mousemove", e => {
  Object.assign(document.documentElement, {
    style: `
      --move-x: ${(e.clientX - window.innerWidth / 2 ) * -0.005}deg;
      --move-y: ${(e.clientY - window.innerHeight / 2) * 0.009}deg;
    `,
  })
})


window.addEventListener('scroll', e => {
  const layersH = document.querySelector('.layers').clientHeight;
  const second = document.querySelector('.second')
  if (this.scrollY >= layersH) {
    second.style.cssText += `--scrollTop: ${this.scrollY - layersH}px`
  } else {
    second.style.cssText += `--scrollTop: ${0}px`
  }
    // document.documentElement.style.setProperty('--scrollTop', `${this.scrollY}px`) // Update method
  })


gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({
	wrapper: '.wrapper',
	content: '.content'
})