/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/focus-trap/dist/focus-trap.esm.js":
/*!********************************************************!*\
  !*** ./node_modules/focus-trap/dist/focus-trap.esm.js ***!
  \********************************************************/
/*! exports provided: createFocusTrap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createFocusTrap\", function() { return createFocusTrap; });\n/* harmony import */ var tabbable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tabbable */ \"./node_modules/tabbable/dist/index.esm.min.js\");\n/*!\n* focus-trap 6.0.1\n* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE\n*/\n\n\nvar activeFocusDelay;\n\nvar activeFocusTraps = (function () {\n  var trapQueue = [];\n  return {\n    activateTrap: function (trap) {\n      if (trapQueue.length > 0) {\n        var activeTrap = trapQueue[trapQueue.length - 1];\n        if (activeTrap !== trap) {\n          activeTrap.pause();\n        }\n      }\n\n      var trapIndex = trapQueue.indexOf(trap);\n      if (trapIndex === -1) {\n        trapQueue.push(trap);\n      } else {\n        // move this existing trap to the front of the queue\n        trapQueue.splice(trapIndex, 1);\n        trapQueue.push(trap);\n      }\n    },\n\n    deactivateTrap: function (trap) {\n      var trapIndex = trapQueue.indexOf(trap);\n      if (trapIndex !== -1) {\n        trapQueue.splice(trapIndex, 1);\n      }\n\n      if (trapQueue.length > 0) {\n        trapQueue[trapQueue.length - 1].unpause();\n      }\n    },\n  };\n})();\n\nfunction createFocusTrap(element, userOptions) {\n  var doc = document;\n  var container =\n    typeof element === 'string' ? doc.querySelector(element) : element;\n\n  var config = {\n    returnFocusOnDeactivate: true,\n    escapeDeactivates: true,\n    ...userOptions,\n  };\n\n  var state = {\n    firstTabbableNode: null,\n    lastTabbableNode: null,\n    nodeFocusedBeforeActivation: null,\n    mostRecentlyFocusedNode: null,\n    active: false,\n    paused: false,\n  };\n\n  var trap = {\n    activate: activate,\n    deactivate: deactivate,\n    pause: pause,\n    unpause: unpause,\n  };\n\n  return trap;\n\n  function activate(activateOptions) {\n    if (state.active) return;\n\n    updateTabbableNodes();\n\n    state.active = true;\n    state.paused = false;\n    state.nodeFocusedBeforeActivation = doc.activeElement;\n\n    var onActivate =\n      activateOptions && activateOptions.onActivate\n        ? activateOptions.onActivate\n        : config.onActivate;\n    if (onActivate) {\n      onActivate();\n    }\n\n    addListeners();\n    return trap;\n  }\n\n  function deactivate(deactivateOptions) {\n    if (!state.active) return;\n\n    clearTimeout(activeFocusDelay);\n\n    removeListeners();\n    state.active = false;\n    state.paused = false;\n\n    activeFocusTraps.deactivateTrap(trap);\n\n    var onDeactivate =\n      deactivateOptions && deactivateOptions.onDeactivate !== undefined\n        ? deactivateOptions.onDeactivate\n        : config.onDeactivate;\n    if (onDeactivate) {\n      onDeactivate();\n    }\n\n    var returnFocus =\n      deactivateOptions && deactivateOptions.returnFocus !== undefined\n        ? deactivateOptions.returnFocus\n        : config.returnFocusOnDeactivate;\n    if (returnFocus) {\n      delay(function () {\n        tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));\n      });\n    }\n\n    return trap;\n  }\n\n  function pause() {\n    if (state.paused || !state.active) return;\n    state.paused = true;\n    removeListeners();\n  }\n\n  function unpause() {\n    if (!state.paused || !state.active) return;\n    state.paused = false;\n    updateTabbableNodes();\n    addListeners();\n  }\n\n  function addListeners() {\n    if (!state.active) return;\n\n    // There can be only one listening focus trap at a time\n    activeFocusTraps.activateTrap(trap);\n\n    // Delay ensures that the focused element doesn't capture the event\n    // that caused the focus trap activation.\n    activeFocusDelay = delay(function () {\n      tryFocus(getInitialFocusNode());\n    });\n\n    doc.addEventListener('focusin', checkFocusIn, true);\n    doc.addEventListener('mousedown', checkPointerDown, {\n      capture: true,\n      passive: false,\n    });\n    doc.addEventListener('touchstart', checkPointerDown, {\n      capture: true,\n      passive: false,\n    });\n    doc.addEventListener('click', checkClick, {\n      capture: true,\n      passive: false,\n    });\n    doc.addEventListener('keydown', checkKey, {\n      capture: true,\n      passive: false,\n    });\n\n    return trap;\n  }\n\n  function removeListeners() {\n    if (!state.active) return;\n\n    doc.removeEventListener('focusin', checkFocusIn, true);\n    doc.removeEventListener('mousedown', checkPointerDown, true);\n    doc.removeEventListener('touchstart', checkPointerDown, true);\n    doc.removeEventListener('click', checkClick, true);\n    doc.removeEventListener('keydown', checkKey, true);\n\n    return trap;\n  }\n\n  function getNodeForOption(optionName) {\n    var optionValue = config[optionName];\n    var node = optionValue;\n    if (!optionValue) {\n      return null;\n    }\n    if (typeof optionValue === 'string') {\n      node = doc.querySelector(optionValue);\n      if (!node) {\n        throw new Error('`' + optionName + '` refers to no known node');\n      }\n    }\n    if (typeof optionValue === 'function') {\n      node = optionValue();\n      if (!node) {\n        throw new Error('`' + optionName + '` did not return a node');\n      }\n    }\n    return node;\n  }\n\n  function getInitialFocusNode() {\n    var node;\n    if (getNodeForOption('initialFocus') !== null) {\n      node = getNodeForOption('initialFocus');\n    } else if (container.contains(doc.activeElement)) {\n      node = doc.activeElement;\n    } else {\n      node = state.firstTabbableNode || getNodeForOption('fallbackFocus');\n    }\n\n    if (!node) {\n      throw new Error(\n        'Your focus-trap needs to have at least one focusable element'\n      );\n    }\n\n    return node;\n  }\n\n  function getReturnFocusNode(previousActiveElement) {\n    var node = getNodeForOption('setReturnFocus');\n    return node ? node : previousActiveElement;\n  }\n\n  // This needs to be done on mousedown and touchstart instead of click\n  // so that it precedes the focus event.\n  function checkPointerDown(e) {\n    if (container.contains(e.target)) return;\n    if (config.clickOutsideDeactivates) {\n      deactivate({\n        returnFocus: !Object(tabbable__WEBPACK_IMPORTED_MODULE_0__[\"isFocusable\"])(e.target),\n      });\n      return;\n    }\n    // This is needed for mobile devices.\n    // (If we'll only let `click` events through,\n    // then on mobile they will be blocked anyways if `touchstart` is blocked.)\n    if (\n      config.allowOutsideClick &&\n      (typeof config.allowOutsideClick === 'boolean'\n        ? config.allowOutsideClick\n        : config.allowOutsideClick(e))\n    ) {\n      return;\n    }\n    e.preventDefault();\n  }\n\n  // In case focus escapes the trap for some strange reason, pull it back in.\n  function checkFocusIn(e) {\n    // In Firefox when you Tab out of an iframe the Document is briefly focused.\n    if (container.contains(e.target) || e.target instanceof Document) {\n      return;\n    }\n    e.stopImmediatePropagation();\n    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());\n  }\n\n  function checkKey(e) {\n    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {\n      e.preventDefault();\n      deactivate();\n      return;\n    }\n    if (isTabEvent(e)) {\n      checkTab(e);\n      return;\n    }\n  }\n\n  // Hijack Tab events on the first and last focusable nodes of the trap,\n  // in order to prevent focus from escaping. If it escapes for even a\n  // moment it can end up scrolling the page and causing confusion so we\n  // kind of need to capture the action at the keydown phase.\n  function checkTab(e) {\n    updateTabbableNodes();\n    if (e.shiftKey && e.target === state.firstTabbableNode) {\n      e.preventDefault();\n      tryFocus(state.lastTabbableNode);\n      return;\n    }\n    if (!e.shiftKey && e.target === state.lastTabbableNode) {\n      e.preventDefault();\n      tryFocus(state.firstTabbableNode);\n      return;\n    }\n  }\n\n  function checkClick(e) {\n    if (config.clickOutsideDeactivates) return;\n    if (container.contains(e.target)) return;\n    if (\n      config.allowOutsideClick &&\n      (typeof config.allowOutsideClick === 'boolean'\n        ? config.allowOutsideClick\n        : config.allowOutsideClick(e))\n    ) {\n      return;\n    }\n    e.preventDefault();\n    e.stopImmediatePropagation();\n  }\n\n  function updateTabbableNodes() {\n    var tabbableNodes = Object(tabbable__WEBPACK_IMPORTED_MODULE_0__[\"tabbable\"])(container);\n    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();\n    state.lastTabbableNode =\n      tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();\n  }\n\n  function tryFocus(node) {\n    if (node === doc.activeElement) return;\n    if (!node || !node.focus) {\n      tryFocus(getInitialFocusNode());\n      return;\n    }\n    node.focus({ preventScroll: !!config.preventScroll });\n    state.mostRecentlyFocusedNode = node;\n    if (isSelectableInput(node)) {\n      node.select();\n    }\n  }\n}\n\nfunction isSelectableInput(node) {\n  return (\n    node.tagName &&\n    node.tagName.toLowerCase() === 'input' &&\n    typeof node.select === 'function'\n  );\n}\n\nfunction isEscapeEvent(e) {\n  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;\n}\n\nfunction isTabEvent(e) {\n  return e.key === 'Tab' || e.keyCode === 9;\n}\n\nfunction delay(fn) {\n  return setTimeout(fn, 0);\n}\n\n\n//# sourceMappingURL=focus-trap.esm.js.map\n\n\n//# sourceURL=webpack:///./node_modules/focus-trap/dist/focus-trap.esm.js?");

/***/ }),

/***/ "./node_modules/tabbable/dist/index.esm.min.js":
/*!*****************************************************!*\
  !*** ./node_modules/tabbable/dist/index.esm.min.js ***!
  \*****************************************************/
/*! exports provided: isFocusable, isTabbable, tabbable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isFocusable\", function() { return c; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isTabbable\", function() { return u; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tabbable\", function() { return r; });\nvar e=[\"input\",\"select\",\"textarea\",\"a[href]\",\"button\",\"[tabindex]\",\"audio[controls]\",\"video[controls]\",'[contenteditable]:not([contenteditable=\"false\"])',\"details>summary\"],t=e.join(\",\"),n=\"undefined\"==typeof Element?function(){}:Element.prototype.matches||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;function r(e,r){r=r||{};var u,i,a=[],c=[],f=e.querySelectorAll(t);r.includeContainer&&n.call(e,t)&&(f=Array.prototype.slice.apply(f)).unshift(e);for(var m=0;m<f.length;m++)o(u=f[m])&&(0===(i=d(u))?a.push(u):c.push({documentOrder:m,tabIndex:i,node:u}));return c.sort(l).map((function(e){return e.node})).concat(a)}function o(e){return!(!i(e)||function(e){return function(e){return f(e)&&\"radio\"===e.type}(e)&&!function(e){if(!e.name)return!0;var t=function(e,t){for(var n=0;n<e.length;n++)if(e[n].checked&&e[n].form===t)return e[n]}((e.form||e.ownerDocument).querySelectorAll('input[type=\"radio\"][name=\"'+e.name+'\"]'),e.form);return!t||t===e}(e)}(e)||d(e)<0)}function u(e){if(!e)throw new Error(\"No node provided\");return!1!==n.call(e,t)&&o(e)}function i(e){return!(e.disabled||function(e){return f(e)&&\"hidden\"===e.type}(e)||function(e){return null===e.offsetParent||\"hidden\"===getComputedStyle(e).visibility}(e))}var a=e.concat(\"iframe\").join(\",\");function c(e){if(!e)throw new Error(\"No node provided\");return!1!==n.call(e,a)&&i(e)}function d(e){var t=parseInt(e.getAttribute(\"tabindex\"),10);return isNaN(t)?function(e){return\"true\"===e.contentEditable}(e)?0:\"AUDIO\"!==e.nodeName&&\"VIDEO\"!==e.nodeName||null!==e.getAttribute(\"tabindex\")?e.tabIndex:0:t}function l(e,t){return e.tabIndex===t.tabIndex?e.documentOrder-t.documentOrder:e.tabIndex-t.tabIndex}function f(e){return\"INPUT\"===e.tagName}\n//# sourceMappingURL=index.esm.min.js.map\n\n\n//# sourceURL=webpack:///./node_modules/tabbable/dist/index.esm.min.js?");

/***/ }),

/***/ "./src/js/carousel.js":
/*!****************************!*\
  !*** ./src/js/carousel.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar slideIndex = 0;\n\nfunction showSlides() {\n  var slides = document.getElementsByClassName('carousel__item');\n\n  if (slides.length > 0) {\n    for (var i = 0; i < slides.length; i++) {\n      slides[i].classList.remove('carousel__item--active');\n    }\n\n    slideIndex++;\n    if (slideIndex > slides.length) slideIndex = 1;\n    slides[slideIndex - 1].classList.add('carousel__item--active');\n    setTimeout(showSlides, 5000);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (showSlides);\n\n//# sourceURL=webpack:///./src/js/carousel.js?");

/***/ }),

/***/ "./src/js/navigation.js":
/*!******************************!*\
  !*** ./src/js/navigation.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var focus_trap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! focus-trap */ \"./node_modules/focus-trap/dist/focus-trap.esm.js\");\n\n\nfunction mobileMainNavigation() {\n  var mobileBtn = document.querySelector('#mobile-nav-button');\n  var menu = document.querySelector('.nav');\n  var navigation = document.querySelector('.navigation');\n  var focusTrap = Object(focus_trap__WEBPACK_IMPORTED_MODULE_0__[\"createFocusTrap\"])('.navigation', {\n    onActivate: function onActivate() {\n      navigation.className = 'navigation navigation--mobile';\n    },\n    onDeactivate: function onDeactivate() {\n      navigation.className = 'navigation';\n    }\n  });\n  mobileBtn.addEventListener('click', function () {\n    mobileBtn.classList.toggle('hamburger--active');\n\n    if (menu.classList.contains('nav--mobile')) {\n      this.setAttribute('aria-expanded', 'false');\n      menu.classList.remove('nav--mobile');\n      focusTrap.deactivate();\n    } else {\n      menu.classList.add('nav--mobile');\n      this.setAttribute('aria-expanded', 'true');\n      focusTrap.activate();\n    }\n  });\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mobileMainNavigation);\n\n//# sourceURL=webpack:///./src/js/navigation.js?");

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel */ \"./src/js/carousel.js\");\n/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navigation */ \"./src/js/navigation.js\");\n\n\n\n\nvar init = function init() {\n  Object(_navigation__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n  Object(_carousel__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n};\n\ninit();\n\n//# sourceURL=webpack:///./src/js/script.js?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/style.scss?");

/***/ })

/******/ });