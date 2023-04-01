AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 750, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});


document.addEventListener('click', function (event) {
  var trigger = document.querySelector('.navbar-toggler');
  var isClickInsideNavbar = trigger.contains(event.target);
  var navbarCollapse = document.querySelector('.navbar-collapse');
  var isCollapsed = navbarCollapse.classList.contains('show');

  if (!isClickInsideNavbar && isCollapsed) {
    navbarCollapse.classList.remove('show');
  }
});


function typingEffect(text, element) {
  var i = 0;
  var speed = 50; // Typing speed in milliseconds
  function typeLetter() {
      if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeLetter, speed);
      } else {
      element.classList.add("complete"); // add CSS class when typing is done
      }
  }
  typeLetter();
}
typingEffect("Hello, world!", document.getElementById("text"));