document.addEventListener("DOMContentLoaded", init);

function init() {
  addEvents();
}

function addEvents() {
  window.addEventListener('scroll', onScroll, true);
}

function onScroll() {
  const scrollPosition = document.body.scrollTop;
  const winHeight = window.innerHeight;
  const classList = document.getElementById('docs').classList;
  const className = 'scrollable';

  if (winHeight - scrollPosition < 10) {
    !classList.contains(className) && classList.add(className);
  } else {
    classList.contains(className) && classList.remove(className);
  }
}