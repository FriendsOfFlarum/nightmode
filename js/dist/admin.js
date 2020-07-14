module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
/* empty/unused harmony star reexport *//*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


/***/ }),

/***/ "./src/admin/addSettingsModal.js":
/*!***************************************!*\
  !*** ./src/admin/addSettingsModal.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fof_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fof-components */ "@fof-components");
/* harmony import */ var _fof_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fof_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "./src/common/config.js");


var SettingsModal = _fof_components__WEBPACK_IMPORTED_MODULE_0__["settings"].SettingsModal,
    SelectItem = _fof_components__WEBPACK_IMPORTED_MODULE_0__["settings"].items.SelectItem;
var transPrefix = "fof-nightmode.admin.settings.modal";

function populateThemes() {
  var options = {}; // add themes based on JS enum

  Object.keys(_common_config__WEBPACK_IMPORTED_MODULE_1__["default"]).forEach(function (theme, i) {
    if (theme === 'DEFAULT') return;
    options[i] = app.translator.trans(transPrefix + ".theme_" + theme.toLowerCase());
  });
  return options;
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  app.extensionSettings['fof-nightmode'] = function () {
    return app.modal.show(new SettingsModal({
      title: app.translator.trans(transPrefix + ".title"),
      size: 'small',
      className: 'fof-nightmode',
      items: [m("div", {
        className: "Form-group"
      }, m("label", null, app.translator.trans(transPrefix + ".default_theme")), SelectItem.component({
        options: populateThemes(),
        key: 'fof-nightmode.default_theme',
        required: false,
        cast: function cast(inVar) {
          return inVar === '' ? 0 : inVar;
        }
      })), m("p", null, app.translator.trans(transPrefix + ".default_theme_helper")), m("p", {
        style: "color:#f00c;font-weight:bold;"
      }, app.translator.trans(transPrefix + ".default_theme_important"))]
    }));
  };
});

/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _addSettingsModal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addSettingsModal */ "./src/admin/addSettingsModal.js");
/* harmony import */ var _common_setSelectedTheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/setSelectedTheme */ "./src/common/setSelectedTheme.js");


app.initializers.add('fof-nightmode', function () {
  Object(_addSettingsModal__WEBPACK_IMPORTED_MODULE_0__["default"])();
  Object(_common_setSelectedTheme__WEBPACK_IMPORTED_MODULE_2__["default"])();
});

/***/ }),

/***/ "./src/common/config.js":
/*!******************************!*\
  !*** ./src/common/config.js ***!
  \******************************/
/*! exports provided: default, Themes, Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Themes", function() { return Themes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
/*

    JS enum equivalent. Makes sure no value mix-ups are made!

    DEFAULT is used when an invalid value has been set, as well as for guest and new users.

*/
var Themes = {
  AUTO: 0,
  LIGHT: 1,
  DARK: 2,
  // adds an "ultra default" of 0 if the admins don't set a default tsk tsk tsk
  DEFAULT: function DEFAULT() {
    return Number.parseInt(app.data['fof-nightmode.default_theme']);
  }
};
var Constants = {
  localStorageKey: "fofNightMode_deviceTheme"
};
/* harmony default export */ __webpack_exports__["default"] = (Themes);


/***/ }),

/***/ "./src/common/setSelectedTheme.js":
/*!****************************************!*\
  !*** ./src/common/setSelectedTheme.js ***!
  \****************************************/
/*! exports provided: default, setTheme, getUrls, getCurrentStyle, setThemeFromID, setStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTheme", function() { return setTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUrls", function() { return getUrls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentStyle", function() { return getCurrentStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setThemeFromID", function() { return setThemeFromID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStyle", function() { return setStyle; });
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/common/config.js");
/* harmony import */ var _forum_fixInvalidThemeSetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../forum/fixInvalidThemeSetting */ "./src/forum/fixInvalidThemeSetting.js");
/* harmony import */ var _forum_getTheme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../forum/getTheme */ "./src/forum/getTheme.js");





/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'init', setTheme);
});
function setTheme() {
  var user = app.session.user;

  if (!user) {
    // Default to automatic theme when visiting as guest
    setThemeFromID(_config__WEBPACK_IMPORTED_MODULE_2__["default"].DEFAULT());
    return;
  }

  var PerDevice = user.preferences().fofNightMode_perDevice;

  if (PerDevice) {
    Object(_forum_fixInvalidThemeSetting__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }

  var CurrentTheme = Object(_forum_getTheme__WEBPACK_IMPORTED_MODULE_4__["default"])(app);
  setThemeFromID(CurrentTheme);
}
function getUrls() {
  return {
    day: app.data['fof-nightmode.assets.day'],
    night: app.data['fof-nightmode.assets.night']
  };
}
function getCurrentStyle() {
  var urls = getUrls();
  return Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find(function (el) {
    return el.href === urls.day || el.href === urls.night;
  });
}
function setThemeFromID(theme) {
  var urls = getUrls();
  var forumStyle = getCurrentStyle();

  if (theme === _config__WEBPACK_IMPORTED_MODULE_2__["default"].DARK) {
    setStyle(forumStyle, urls.night);
  } else if (theme === _config__WEBPACK_IMPORTED_MODULE_2__["default"].LIGHT) {
    setStyle(forumStyle, urls.day);
  } else {
    var preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setStyle(forumStyle, urls[preferDark ? 'night' : 'day']);
  }
}

var showBody = function showBody() {
  return document.body.style.display = 'block';
};

function setStyle(forumStyle, url) {
  if (forumStyle && url === forumStyle.href) return;
  var el;

  if (forumStyle) {
    el = forumStyle.cloneNode();
  } else {
    el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
  }

  el.setAttribute('href', url);
  document.head.append(el);

  if (forumStyle) {
    el.onload = function () {
      forumStyle.remove();
      showBody();
    };
  } else {
    el.onload = showBody;
    el.onerror = showBody;
  }
}

/***/ }),

/***/ "./src/forum/fixInvalidThemeSetting.js":
/*!*********************************************!*\
  !*** ./src/forum/fixInvalidThemeSetting.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return fixInvalidThemeSetting; });
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/config */ "./src/common/config.js");
/*
    This function is designed to catch invalid theme values
    and handle them before they can break Flarum for users.

    E.g. if a user manually edited their local storage to
    set their theme to an invalid value, this theme would
    detect that, and reset it to 0 (auto).

    I'm sure there are still cases where users can break this
    (maybe faking XHRs to Flarum and setting their user prefs
    to use an invalid value) bt those are extremes which
    wouldn't happen unless someone's being an idiot. If someone
    if being an idiot, they deserve to lose Flarum .

    :)

    ---

    David Wheatley
    GitHub: davwheat || giffgaff: mrjeeves
    (not a giffgaff employee, though)
*/

var LocalStorageKey = _common_config__WEBPACK_IMPORTED_MODULE_0__["Constants"].localStorageKey;
function fixInvalidThemeSetting() {
  // get array of valid values without duplicate entries
  var validValues = Array.from(new Set(Object.values(_common_config__WEBPACK_IMPORTED_MODULE_0__["Themes"])));
  var Theme = parseInt(localStorage.getItem(LocalStorageKey));

  if (isNaN(Theme)) {
    resetTheme('Theme is not a valid integer! Resetting...');
  } else if (!validValues.includes(Theme)) {
    // theme out of bounds
    resetTheme("Theme is out of bounds! Resetting...");
  }
}

function resetTheme(reason) {
  console.warn(reason);
  localStorage.setItem(LocalStorageKey, _common_config__WEBPACK_IMPORTED_MODULE_0__["Themes"].DEFAULT());
}

/***/ }),

/***/ "./src/forum/getTheme.js":
/*!*******************************!*\
  !*** ./src/forum/getTheme.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getTheme; });
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/config */ "./src/common/config.js");

function getTheme(app) {
  var user = app.session.user;
  var IsUsingPerDeviceSettings = !!user.preferences().fofNightMode_perDevice;
  var SelectedTheme = user.preferences().fofNightMode;

  if (IsUsingPerDeviceSettings) {
    // fetch through LS is per device enabled
    return parseInt(localStorage.getItem(_common_config__WEBPACK_IMPORTED_MODULE_0__["Constants"].localStorageKey));
  } else {
    if (typeof SelectedTheme === 'number' && SelectedTheme !== -1) {
      // use user prefs
      return SelectedTheme;
    } else {
      // pref is not valid
      return _common_config__WEBPACK_IMPORTED_MODULE_0__["Themes"].DEFAULT();
    }
  }
}

/***/ }),

/***/ "@fof-components":
/*!******************************************************!*\
  !*** external "flarum.extensions['fof-components']" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.extensions['fof-components'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map