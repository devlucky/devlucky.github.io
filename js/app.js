(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener("DOMContentLoaded", init);

function init() {
  addEvents();
}

function addEvents() {
  window.addEventListener('scroll', onScroll, true);
}

function onScroll() {
  // const scrollPosition = document.body.scrollTop;
  var scrollPosition = window.pageYOffset;
  var winHeight = window.innerHeight;
  var classList = document.getElementById('docs').classList;
  var className = 'scrollable';

  if (winHeight - scrollPosition < 5) {
    !classList.contains(className) && classList.add(className);
  } else {
    classList.contains(className) && classList.remove(className);
  }
}

},{}]},{},[1]);
