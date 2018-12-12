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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/environment.js":
/*!****************************!*\
  !*** ./src/environment.js ***!
  \****************************/
/*! exports provided: gravity, map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gravity\", function() { return gravity; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"map\", function() { return map; });\nvar gravity = 0.5;\nvar map = [[-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [-1, -1, -1, -1, -1, -1, -1, -1, -1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1]];\n\n\n//# sourceURL=webpack:///./src/environment.js?");

/***/ }),

/***/ "./src/grid.js":
/*!*********************!*\
  !*** ./src/grid.js ***!
  \*********************/
/*! exports provided: init, update, render, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"init\", function() { return init; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"update\", function() { return update; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reset\", function() { return reset; });\n/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environment */ \"./src/environment.js\");\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n/* harmony import */ var _image_preloader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-preloader */ \"./src/image-preloader.js\");\n/* harmony import */ var _party__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./party */ \"./src/party.js\");\n\n\n\n\nvar canvas = document.getElementById('grid');\nvar ctx = canvas.getContext('2d');\nvar numRows;\nvar numColumns;\nvar cellSize;\nvar grid = [];\nvar tileImages = [];\nvar dragging = false;\nvar dragStartX;\nvar dragStartY;\nvar draggingTile = {\n  row: null,\n  col: null\n};\nvar swappingTiles = [];\nvar swappedTiles = [];\nvar startSwapTime = null;\nvar bufferRowCount;\nvar bufferHeight;\n\nvar handleMouseMove = function handleMouseMove(event) {\n  if (dragging) {\n    var mouseX = event.offsetX;\n    var mouseY = event.offsetY;\n    var cellRow = Math.floor((mouseY + bufferHeight) / cellSize);\n    var cellCol = Math.floor(mouseX / cellSize); // if the mouse moves to a different tile\n\n    if (draggingTile.row !== cellRow || draggingTile.col !== cellCol) {\n      dragging = false; // swap the tiles\n\n      swappingTiles.push({\n        row: draggingTile.row,\n        col: draggingTile.col\n      });\n      swappingTiles.push({\n        row: cellRow,\n        col: cellCol\n      });\n      Object(_party__WEBPACK_IMPORTED_MODULE_3__[\"sendEvent\"])('movemade');\n    }\n  }\n};\n\nvar handleMouseDown = function handleMouseDown(event) {\n  dragging = true; // work out which cell the user has clicked on\n\n  var mouseX = event.offsetX;\n  var mouseY = event.offsetY;\n  dragStartX = mouseX;\n  dragStartY = mouseY;\n  draggingTile.row = Math.floor((dragStartY + bufferHeight) / cellSize);\n  draggingTile.col = Math.floor(dragStartX / cellSize);\n};\n\nvar handleMouseUp = function handleMouseUp(event) {\n  dragging = false;\n};\n\nvar parseGrid = function parseGrid(cb) {\n  var row;\n  var col; // loop through the rows\n\n  for (row = 0; row < grid.length; row += 1) {\n    // loop through the cell in each row\n    for (col = 0; col < grid[row].length; col += 1) {\n      cb(row, col, grid[row][col]);\n    }\n  }\n};\n\nvar render = function render(matches) {\n  parseGrid(function (row, col, value) {\n    if (tileInCell(row, col)) {\n      grid[row][col].render(ctx);\n    }\n  });\n};\n/**\n * Remove matches generated when the grid is first created\n *\n * @return {void}\n */\n\n\nvar clearNonUserMatches = function clearNonUserMatches() {\n  var matches = getMatches(true);\n\n  while (matches.length) {\n    removeTiles(matches);\n    dropTiles();\n    fillEmptyCells();\n    updateTiles(false);\n    matches = getMatches(true);\n  }\n};\n\nvar init = function init(cb) {\n  var i;\n  var j;\n  numRows = 9;\n  numColumns = 9;\n  cellSize = canvas.width / numColumns;\n  bufferRowCount = numRows;\n  canvas.addEventListener(\"mousedown\", handleMouseDown);\n  canvas.addEventListener(\"mousemove\", handleMouseMove);\n  canvas.addEventListener(\"mouseup\", handleMouseUp);\n  var imageURLs = ['./img/kitten.jpeg', './img/cage.jpg', './img/murray.jpg', './img/seagal.jpg', './img/bear.jpeg', './img/beard.jpeg'];\n  Object(_image_preloader__WEBPACK_IMPORTED_MODULE_2__[\"preloadImages\"])(imageURLs, function (loadedImages) {\n    tileImages = loadedImages; // create a grid of tiles\n\n    createGrid(_environment__WEBPACK_IMPORTED_MODULE_0__[\"map\"]); // clear matches accidentally created\n\n    clearNonUserMatches();\n    cb();\n  });\n};\n\nvar clearCanvas = function clearCanvas() {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n};\n/**\n * Swap two adjacent tiles in the grid\n *\n * @return Object Array containing tiles that have been swapped when they have finished swapping. The array is empty at all other times\n */\n\n\nvar swapTiles = function swapTiles() {\n  // bail if tiles aren't currently being swapped\n  if (!swappingTiles.length) {\n    return swappedTiles;\n  } // capture the current time because the tiles need to know when the\n  // animation was triggered\n\n\n  if (startSwapTime === null) {\n    startSwapTime = Date.now();\n  }\n\n  var duration = 200;\n  grid[swappingTiles[0].row][swappingTiles[0].col].move(swappingTiles[0], swappingTiles[1], duration, startSwapTime);\n  grid[swappingTiles[1].row][swappingTiles[1].col].move(swappingTiles[1], swappingTiles[0], duration, startSwapTime);\n  var now = Date.now(); // has the duration of animation now passed?\n\n  if (now - startSwapTime >= duration) {\n    // Yes! The tile has reached its destination\n    // swap the tile data over in the grid\n    var _ref = [grid[swappingTiles[1].row][swappingTiles[1].col], grid[swappingTiles[0].row][swappingTiles[0].col]];\n    grid[swappingTiles[0].row][swappingTiles[0].col] = _ref[0];\n    grid[swappingTiles[1].row][swappingTiles[1].col] = _ref[1];\n    swappedTiles = Object.assign([], swappingTiles); // clear the time that the animation was triggered\n\n    startSwapTime = null; // clear the swapping tiles\n\n    swappingTiles.length = 0;\n  }\n};\n\nvar isBufferCell = function isBufferCell(row, col) {\n  return _environment__WEBPACK_IMPORTED_MODULE_0__[\"map\"][row][col] === -1;\n};\n\nvar cellAllowedTile = function cellAllowedTile(row, col) {\n  return _environment__WEBPACK_IMPORTED_MODULE_0__[\"map\"][row][col] === 1;\n};\n\nvar cellExists = function cellExists(row, col) {\n  return row < grid.length && col < grid[row].length;\n};\n\nvar tileInCell = function tileInCell(row, col) {\n  return cellExists(row, col) && grid[row][col] !== null;\n};\n\nvar getCellValue = function getCellValue(row, col) {\n  return tileInCell(row, col) ? grid[row][col].value : -1;\n};\n\nvar tilesBeingSwapped = function tilesBeingSwapped() {\n  return swappingTiles.length > 0;\n};\n\nvar getMatches = function getMatches(shouldGetMatches) {\n  var matches = []; // bail if tiles are currently dropping, because we want to wait\n  // for all of the tiles to finish moving before checking for matches\n\n  if (!shouldGetMatches) {\n    return matches;\n  }\n\n  parseGrid(function (row, col, value) {\n    if (_environment__WEBPACK_IMPORTED_MODULE_0__[\"map\"][row][col] === 1 && grid[row][col] !== null) {\n      //check horizontal\n      if (getCellValue(row, col + 1) > -1 && getCellValue(row, col + 1) === getCellValue(row, col) && getCellValue(row, col + 2) > -1 && getCellValue(row, col + 2) === getCellValue(row, col)) {\n        matches.push({\n          row: row,\n          col: col\n        });\n        matches.push({\n          row: row,\n          col: col + 1\n        });\n        matches.push({\n          row: row,\n          col: col + 2\n        });\n      } //check vertical\n\n\n      if (getCellValue(row + 1, col) > -1 && getCellValue(row + 1, col) === getCellValue(row, col) && getCellValue(row + 2, col) > -1 && getCellValue(row + 2, col) === getCellValue(row, col)) {\n        matches.push({\n          row: row,\n          col: col\n        });\n        matches.push({\n          row: row + 1,\n          col: col\n        });\n        matches.push({\n          row: row + 2,\n          col: col\n        });\n      }\n    }\n  });\n  return matches;\n};\n/**\n * Remove tiles from the grid\n *\n * @param  {Object} list list of tiles that need to be removed\n * @return {void}\n */\n\n\nvar removeTiles = function removeTiles(list) {\n  if (list.length) {\n    list.forEach(function (match) {\n      grid[match.row][match.col] = null;\n    });\n    Object(_party__WEBPACK_IMPORTED_MODULE_3__[\"sendEvent\"])(\"tilesremoved\", list.length);\n  }\n};\n\nvar updateTiles = function updateTiles(shouldAnimate) {\n  if (tilesBeingSwapped()) {\n    return;\n  }\n\n  var tilesDidMove = false;\n  parseGrid(function (row, col, value) {\n    if ((_environment__WEBPACK_IMPORTED_MODULE_0__[\"map\"][row][col] === -1 || cellAllowedTile(row, col)) && tileInCell(row, col)) {\n      var tileMoved = grid[row][col].updatePosition(row, col, _environment__WEBPACK_IMPORTED_MODULE_0__[\"gravity\"], shouldAnimate);\n\n      if (!tilesDidMove && tileMoved) {\n        tilesDidMove = true;\n      }\n    }\n  });\n  return tilesDidMove;\n};\n\nvar dropTiles = function dropTiles() {\n  parseGrid(function (row, col, value) {\n    //swap the tile in a cell with the cell below, if the cell below doesn't contain a tile\n    if (tileInCell(row, col) && cellExists(row + 1, col) && !tileInCell(row + 1, col)) {\n      var _ref2 = [grid[row + 1][col], grid[row][col]];\n      grid[row][col] = _ref2[0];\n      grid[row + 1][col] = _ref2[1];\n    }\n  }); // are any of the empty cells below cells with tile in\n\n  var emptyCellsStillBelowTiles = grid.some(function (val, row) {\n    return grid[row].some(function (val, col) {\n      return tileInCell(row, col) && cellExists(row + 1, col) && !tileInCell(row + 1, col);\n    });\n  });\n\n  if (emptyCellsStillBelowTiles) {\n    dropTiles();\n  }\n};\n\nvar fillEmptyCells = function fillEmptyCells() {\n  parseGrid(function (row, col, value) {\n    if (isBufferCell(row, col) && !tileInCell(row, col)) {\n      var _value = chooseRandomTileValue();\n\n      var x = col * cellSize;\n      var y = row * cellSize;\n      var width = cellSize;\n      var height = cellSize;\n      grid[row][col] = new _tile__WEBPACK_IMPORTED_MODULE_1__[\"Tile\"](_value, x, y, width, height, tileImages[_value]);\n    }\n  });\n};\n\nvar createGrid = function createGrid(cellMap) {\n  var i;\n  var j;\n  var randValue;\n  var x;\n  var y;\n  var width = cellSize;\n  var height = cellSize;\n  var numRows = cellMap.length;\n  var numCols = cellMap[0].length;\n  bufferHeight = cellMap.reduce(function (accumulator, row) {\n    if (row[0] === -1) {\n      accumulator += cellSize;\n    }\n\n    return accumulator;\n  }, 0);\n\n  for (i = 0; i < numRows; i += 1) {\n    // create empty row\n    grid[i] = [];\n\n    for (j = 0; j < numColumns; j += 1) {\n      switch (cellMap[i][j]) {\n        case -1: // buffer cells - tiles should be placed in these cells but are all positioned above the visible area\n\n        case 1:\n          // playable cells - tiles can be placed in these cells\n          // generate a random tile value\n          randValue = chooseRandomTileValue();\n          x = j * cellSize;\n          y = i * cellSize - bufferHeight; // create a tile in the cell\n\n          grid[i][j] = new _tile__WEBPACK_IMPORTED_MODULE_1__[\"Tile\"](randValue, x, y, width, height, tileImages[randValue]);\n          break;\n        // visible but non-playable cells\n\n        case 0:\n          grid[i][j] = null;\n          break;\n      }\n    }\n  }\n};\n\nvar chooseRandomTileValue = function chooseRandomTileValue() {\n  return Math.floor(Math.random() * 6);\n};\n\nvar update = function update() {\n  clearCanvas();\n  swapTiles();\n  var tilesDidMove = updateTiles(true);\n  var matches = getMatches(!tilesDidMove);\n  removeTiles(matches);\n  dropTiles();\n  fillEmptyCells();\n  render(matches);\n};\n\nvar reset = function reset() {\n  grid.length = 0;\n  createGrid(_environment__WEBPACK_IMPORTED_MODULE_0__[\"map\"]);\n  clearNonUserMatches();\n};\n\n\n\n//# sourceURL=webpack:///./src/grid.js?");

/***/ }),

/***/ "./src/image-preloader.js":
/*!********************************!*\
  !*** ./src/image-preloader.js ***!
  \********************************/
/*! exports provided: preloadImages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"preloadImages\", function() { return preloadImages; });\nvar preloadImages = function preloadImages(imageURLs, cb) {\n  var images = [];\n  var promises = imageURLs.map(function (val, index) {\n    return new Promise(function (resolve, reject) {\n      images[index] = new Image();\n      images[index].onload = resolve;\n\n      images[index].onerror = function (error) {\n        console.log(\"error\", error);\n      };\n\n      images[index].src = val;\n    });\n  });\n  Promise.all(promises).then(function () {\n    cb(images);\n  });\n};\n\n\n\n//# sourceURL=webpack:///./src/image-preloader.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ \"./src/grid.js\");\n/* harmony import */ var _party__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./party */ \"./src/party.js\");\n\n\nvar defaultScore = 0;\nvar defaultMoves = 5;\nvar score = defaultScore;\nvar moves = defaultMoves;\n\nvar isGameOver = function isGameOver() {\n  return moves === 0;\n};\n\nvar ui = {\n  score: document.getElementById('score-value'),\n  moves: document.getElementById('moves-value'),\n  gameOver: document.getElementById('game-over'),\n  btnReset: document.getElementById('btn-reset')\n};\n\nvar handleTilesRemoved = function handleTilesRemoved(event) {\n  var numTilesRemoved = event.detail;\n  var pointsToBeAdded = numTilesRemoved * 60;\n  score += pointsToBeAdded;\n  ui.score.innerHTML = score;\n};\n\nvar handleMoveMade = function handleMoveMade(event) {\n  moves -= 1;\n  ui.moves.innerHTML = moves;\n};\n\nvar handleBtnReset = function handleBtnReset(event) {\n  reset();\n};\n\nvar gameOver = function gameOver() {\n  if (moves > 0) {\n    return;\n  }\n\n  ui.gameOver.style.display = 'block';\n};\n\nvar main = function main() {\n  requestAnimationFrame(main);\n  _grid__WEBPACK_IMPORTED_MODULE_0__[\"update\"]();\n  _grid__WEBPACK_IMPORTED_MODULE_0__[\"render\"]();\n  gameOver();\n};\n\nvar init = function init() {\n  Object(_party__WEBPACK_IMPORTED_MODULE_1__[\"bindEvent\"])('tilesremoved', handleTilesRemoved);\n  Object(_party__WEBPACK_IMPORTED_MODULE_1__[\"bindEvent\"])('movemade', handleMoveMade);\n  ui.score.innerHTML = score;\n  ui.moves.innerHTML = moves;\n  ui.btnReset.addEventListener('click', handleBtnReset);\n  _grid__WEBPACK_IMPORTED_MODULE_0__[\"init\"](main);\n};\n\nvar reset = function reset() {\n  _grid__WEBPACK_IMPORTED_MODULE_0__[\"reset\"]();\n  score = defaultScore;\n  moves = defaultMoves;\n  ui.score.innerHTML = score;\n  ui.moves.innerHTML = moves;\n  ui.gameOver.style.display = 'none';\n};\n\ninit();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/party.js":
/*!**********************!*\
  !*** ./src/party.js ***!
  \**********************/
/*! exports provided: sendEvent, bindEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sendEvent\", function() { return sendEvent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bindEvent\", function() { return bindEvent; });\nvar sendEvent = function sendEvent(name) {\n  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  return document.dispatchEvent(new CustomEvent(name, {\n    detail: value\n  }));\n};\n\nvar bindEvent = function bindEvent(name, cb) {\n  return document.addEventListener(name, cb);\n};\n\n\n\n//# sourceURL=webpack:///./src/party.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! exports provided: Tile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tile\", function() { return Tile; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Tile =\n/*#__PURE__*/\nfunction () {\n  function Tile(value, x, y, w, h, img) {\n    _classCallCheck(this, Tile);\n\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n    this.value = value;\n    this.img = img;\n    this.vy = 0;\n    this.terminalvy = 10;\n  }\n  /**\n   * Change the x,y position of the tile if it needs to fall\n   *\n   * @param  {Number} row           The row in the grid the tile is in\n   * @param  {Number} col           The column in the grid the tile is in\n   * @param  {Number} gravity       Force of gravity applied to the tile\n   * @param  {Boolean} shouldAnimate Should the tile snap straight to it's final position or should gravity take over\n   * @return {Boolean}               Whether or not the tile moved from its original position\n   */\n\n\n  _createClass(Tile, [{\n    key: \"updatePosition\",\n    value: function updatePosition(row, col, gravity, shouldAnimate) {\n      var currentY = this.y;\n      var targetVerticalPosition = row * this.h - 9 * this.h;\n\n      if (shouldAnimate) {\n        this.vy += gravity;\n        this.y += Math.min(this.vy, this.terminalvy);\n        var bounceDampening = 6; // is the tile colliding with the bottom of the grid?\n\n        if (this.y > 500 - 500 / 9) {\n          this.y = 500 - 500 / 9; // this.vy = -this.vy / bounceDampening\n\n          this.vy = 0;\n        } // is the tile below where it should fall to?\n\n\n        if (this.y > targetVerticalPosition) {\n          this.y = targetVerticalPosition; // this.vy = -this.vy / bounceDampening\n\n          this.vy = 0;\n        }\n      } else {\n        this.y = targetVerticalPosition;\n      } // return whether or not the tile has moved\n\n\n      return this.y !== currentY;\n    }\n    /**\n     * Draw the tile image\n     *\n     * @param  {Object} ctx The canvas on which to draw the tile image\n     * @return {void}\n     */\n\n  }, {\n    key: \"render\",\n    value: function render(ctx) {\n      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);\n    }\n    /**\n     * Get the position along a linear scale something has moved based on how much\n     * time has passed since the animation began\n     *\n     * @param  {Number} start         Starting value\n     * @param  {Number} end           Ending value\n     * @param  {Number} duration      How many ms should it take to complete the animation\n     * @param  {Number} startSwapTime The timestamp at the beginning of the animation\n     * @return {Number}               The new position along the linear scale\n     */\n\n  }, {\n    key: \"getUpdatedAnimationPosition\",\n    value: function getUpdatedAnimationPosition(start, end, duration, startSwapTime) {\n      var now = Date.now();\n      return Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"easeInQuad\"])(now - startSwapTime, start, end - start, duration);\n    }\n    /**\n     * Move the tile\n     *\n     * Changes the x and y values based on the direction of movement\n     * and the amount of time that's passed since the animation started\n     *\n     * @param  {Object} tileFrom      Object containing row and col values for the tile\n     * @param  {Object} tileTo        Object containing row and col values for where the tile should be moved to\n     * @param  {Number} duration      How long in ms the tile should take to move\n     * @param  {Number} startSwapTime The time the animation was triggered\n     * @return {void}\n     */\n\n  }, {\n    key: \"move\",\n    value: function move(tileFrom, tileTo, duration, startSwapTime) {\n      var bufferHeight = this.h * 9;\n      var tileXStart = tileFrom.col * this.w;\n      var tileXEnd = tileTo.col * this.w;\n      var tileYStart = tileFrom.row * this.h - bufferHeight;\n      var tileYEnd = tileTo.row * this.h - bufferHeight;\n      var tilex = this.getUpdatedAnimationPosition(tileXStart, tileXEnd, duration, startSwapTime);\n      var tiley = this.getUpdatedAnimationPosition(tileYStart, tileYEnd, duration, startSwapTime);\n\n      if (tileXEnd > tileXStart) {\n        this.x = Math.min(tilex, tileXEnd);\n      } else {\n        this.x = Math.max(tilex, tileXEnd);\n      }\n\n      if (tileYEnd > tileYStart) {\n        this.y = Math.min(tiley, tileYEnd);\n      } else {\n        this.y = Math.max(tiley, tileYEnd);\n      }\n    }\n  }]);\n\n  return Tile;\n}();\n\n\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: easeInQuad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInQuad\", function() { return easeInQuad; });\nvar easeInQuad = function easeInQuad(t, b, c, d) {\n  return c * (t /= d) * t + b;\n};\n\n\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });