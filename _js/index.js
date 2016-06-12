document.addEventListener("DOMContentLoaded", init);

function init() {
  addEvents();
}

function addEvents() {
  window.addEventListener('scroll', onScroll, true);
}

function onScroll() {
  // const scrollPosition = document.body.scrollTop;
  const scrollPosition = window.pageYOffset;
  const winHeight = window.innerHeight;
  const classList = document.getElementById('docs').classList;
  const className = 'scrollable';

  if (winHeight - scrollPosition < 5) {
    !classList.contains(className) && classList.add(className);
  } else {
    classList.contains(className) && classList.remove(className);
  }
}