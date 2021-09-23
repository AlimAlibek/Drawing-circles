/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./circle_creator.js":
/*!***************************!*\
  !*** ./circle_creator.js ***!
  \***************************/
/***/ ((module) => {

eval("module.exports = {\r\n    // начальные точки рисунка\r\n    startX: 0,\r\n    startY: 0,\r\n\r\n    // конечные точки рисунка для проверки валидности окружности\r\n    endX: 0,\r\n    endY: 0,\r\n\r\n    // крайние точки рисунка для вычисления размеров окружности\r\n    // крайные левая и верхняя точка изначально большие числа потому\r\n    // что при вычислении в методе checkExtremePoints будет выбираться меньшее значение\r\n    maxRight: 0,\r\n    maxLeft: 100000,\r\n    maxTop: 100000,\r\n    maxBottom: 0,\r\n\r\n    // архив нарисованных окружностей для отрисовки после очистки холста\r\n    circles: [],\r\n\r\n    getCircles() {\r\n        return this.circles;\r\n    },\r\n\r\n    appointStartPoints(event) {\r\n       this.startX = event.pageX\r\n       this.startY = event.pageY\r\n    },\r\n\r\n    appointEndPoints(event) {\r\n        this.endX = event.pageX,\r\n        this.endY = event.pageY\r\n    },\r\n\r\n    checkExtremePoints(event) {\r\n    // проверка на преодоления текущих крайних точек и перезапись\r\n        this.maxRight = Math.max(event.pageX, this.maxRight);\r\n        this.maxLeft = Math.min(event.pageX, this.maxLeft);\r\n        this.maxTop = Math.min(event.pageY, this.maxTop);\r\n        this.maxBottom = Math.max(event.pageY, this.maxBottom);\r\n    \r\n    },\r\n\r\n    calculateRadiusAndPosition() {\r\n    // вычисление радиуса и позиции окружности\r\n \r\n        if (\r\n        // если стартовая точка рисунка и конечная не смыкаются, то окружность не будет добавлена\r\n        // допустил погрешность 30px\r\n            Math.abs(this.endX - this.startX) > 30  \r\n            || Math.abs(this.endY - this.startY) > 30\r\n        ) { return }\r\n        \r\n        // высота и ширина рисунка для получения среднего диаметра\r\n        const width = this.maxRight - this.maxLeft;\r\n        const height = this.maxBottom - this.maxTop;\r\n        \r\n        // вычисление радиуса и цетра окружности \r\n        const radius = (width/2 + height/2) / 2;\r\n        const centerX = this.maxLeft + width/2;\r\n        const centerY = this.maxTop + height/2;\r\n\r\n        this.circles.push ({\r\n        // вычисленные данные окружности добавляются в архив \r\n            radius,\r\n            centerX,\r\n            centerY,\r\n        })\r\n\r\n        // после добовления окружности, очищаются данные для новой\r\n        this.clear();\r\n    },\r\n\r\n    clear() {\r\n    // очистка данных последнего рисунка\r\n        this.startX = 0;\r\n        this.startY = 0;\r\n        this.maxRight = 0;\r\n        this.maxLeft = 100000;\r\n        this.maxTop = 100000;\r\n        this.maxBottom = 0;\r\n    }\r\n}\n\n//# sourceURL=webpack://circles/./circle_creator.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const creator = __webpack_require__(/*! ./circle_creator */ \"./circle_creator.js\");\r\n\r\nconst canvas = document.getElementById(\"canvas\");\r\n\r\ncanvas.width = document.body.offsetWidth;\r\ncanvas.height = document.body.offsetHeight;\r\n\r\nconst ctx = canvas.getContext(\"2d\");\r\nctx.lineWidth = 5;\r\n\r\n\r\n\r\ncanvas.addEventListener(\"mousedown\", event => {\r\n    startDrawing(event);\r\n    canvas.addEventListener( \"mousemove\", draw);\r\n    canvas.addEventListener(\"mouseup\", endDrawing);\r\n\r\n})\r\n\r\nfunction startDrawing(event) {\r\n    // в начале рисования записываются стартовые точки в объект creator\r\n    creator.appointStartPoints(event);\r\n\r\n    ctx.beginPath();\r\n    ctx.moveTo(event.pageX, event.pageY);\r\n}\r\n\r\nfunction draw(event) {\r\n    ctx.lineTo(event.pageX, event.pageY);\r\n    ctx.stroke(); \r\n    // при рисовании будет вызываться метод checkExtremePoints \r\n    // чтобы в объекте всегда были актуальные размеры\r\n    creator.checkExtremePoints(event);\r\n}\r\n\r\n\r\nfunction endDrawing(event) {   \r\n    // с завершением рисования в объект creator записываются конечные точки \r\n    creator.appointEndPoints(event);\r\n    canvas.removeEventListener( \"mousemove\", draw);   \r\n\r\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n\r\n    // в объекте creator инкапсулированы методы для вычисления и добовления окружности\r\n    creator.calculateRadiusAndPosition();   \r\n    // остаётся получить все окружности и отрисовать\r\n    creator.getCircles().forEach(options => {\r\n        drawCircle(options);\r\n    }) \r\n}\r\n\r\n\r\n\r\nfunction drawCircle(options) {\r\n    ctx.beginPath();\r\n    ctx.arc(options.centerX, options.centerY, options.radius, 0, Math.PI * 2, true);\r\n    ctx.stroke();\r\n}\n\n//# sourceURL=webpack://circles/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;