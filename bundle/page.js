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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ({

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PageLoader_1 = __webpack_require__(38);
new PageLoader_1.PageLoader(window).load();


/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class PageLoader {
    constructor(pageWindow) {
        this.loadAttempts = 1;
        this.pageWindow = pageWindow;
        this.pagePathname = pageWindow.location.pathname;
        window.addonPagePathname = this.pagePathname;
    }
    load() {
        (async () => {
            await this.main();
        })();
    }
    async loader() {
        const backgroundWindow = chrome.extension.getBackgroundPage();
        if ('addonBackgroundApp' in backgroundWindow) {
            const backgroundApp = backgroundWindow.addonBackgroundApp;
            const pageApp = await backgroundApp.createPageApp(this.pagePathname, this.pageWindow);
            await pageApp.init();
            window.addonPageApp = pageApp;
        }
        else {
            this.loadAttempts++;
            if (this.loadAttempts > 30) {
                throw new Error('Cannot get background page');
            }
            setTimeout(this.main.bind(this), 50);
        }
    }
    async main() {
        try {
            await this.loader();
        }
        catch (error) {
            console.log(`${this.pagePathname} load attempt: ${this.loadAttempts}`);
            this.pageWindow.document.body.innerText = `${error.toString()}`;
            this.pageWindow.document.body.classList.remove('hidden');
            console.error(error);
        }
    }
}
exports.PageLoader = PageLoader;


/***/ })

/******/ });