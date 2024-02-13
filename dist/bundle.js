/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Storage = /*#__PURE__*/function () {
  function Storage(key) {
    _classCallCheck(this, Storage);
    this.key = key;
    if (!localStorage[key]) {
      var data = {
        todos: []
      };
      localStorage[key] = JSON.stringify(data);
    }
  }
  _createClass(Storage, [{
    key: "read",
    value: function read() {
      return JSON.parse(localStorage[this.key]).todos;
    }
  }, {
    key: "save",
    value: function save(toDoData, id) {
      var data = JSON.parse(localStorage[this.key]);
      var toDos = data.todos;
      if (id) {
        // update
        var targetIndex = -1;
        toDos.forEach(function (todo, index) {
          if (todo.id === id) {
            for (var key in toDoData) {
              todo[key] = toDoData[key];
            }
            targetIndex = index;
          }
        });
        // 맨뒤로 삽입
        if (targetIndex !== -1) toDos.push(toDos.splice(targetIndex, 1)[0]);
        localStorage.setItem(this.key, JSON.stringify(data));
      } else {
        toDos.push(toDoData);
        localStorage.setItem(this.key, JSON.stringify(data));
      }
    }
  }, {
    key: "write",
    value: function write(list) {
      var data = JSON.parse(localStorage[this.key]);
      data.todos = list;
      localStorage.setItem(this.key, JSON.stringify(data));
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var data = JSON.parse(localStorage[this.key]);
      var toDos = data.todos;
      data.todos = toDos.filter(function (todo) {
        return todo.id !== id;
      });
      localStorage.setItem(this.key, JSON.stringify(data));
    }
  }]);
  return Storage;
}();


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Model)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var Model = /*#__PURE__*/function () {
  function Model(storage) {
    _classCallCheck(this, Model);
    this.storage = storage;
  }
  _createClass(Model, [{
    key: "insert",
    value: function insert(item) {
      if (item) {
        var newItem = {
          id: item.id,
          title: item.title,
          manager: item.manager,
          createdDate: item.createdDate,
          stage: item.stage
        };
        this.storage.save(newItem);
      }
    }
  }, {
    key: "update",
    value: function update(updateItem, id) {
      this.storage.save(updateItem, id);
    }
  }, {
    key: "updateOrder",
    value: function updateOrder(updateList) {
      this.storage.write(updateList);
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      this.storage["delete"](id);
    }
  }]);
  return Model;
}();


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Kanban)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
// DOM selectors
var toDoUl = document.querySelector(".to-do");
var inProgressUl = document.querySelector(".in-progress");
var doneUl = document.querySelector(".done");
var modal = document.querySelector(".modal");
var overlay = document.querySelector(".modal-overlay");


var Kanban = /*#__PURE__*/function () {
  function Kanban(storage) {
    _classCallCheck(this, Kanban);
    this.storage = storage;
    this.dragToDo = null;
  }

  // 칸반보드 렌더링
  _createClass(Kanban, [{
    key: "render",
    value: function render() {
      var toDoList = this.storage.read();
      if (toDoList) {
        for (var i = 0; i < toDoList.length; i++) {
          var li = document.createElement("li");
          li.setAttribute("draggable", "true");
          li.innerHTML = (0,_todo__WEBPACK_IMPORTED_MODULE_0__["default"])(toDoList[i]);
          if (toDoList[i].stage === "To Do") {
            toDoUl.appendChild(li);
          }
          if (toDoList[i].stage === "In Progress") {
            inProgressUl.appendChild(li);
          }
          if (toDoList[i].stage === "Done") {
            doneUl.appendChild(li);
          }
        }
      }
    }

    // 모달
  }, {
    key: "show",
    value: function show() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var inputStage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");
      var data = this.storage.read().find(function (todo) {
        return todo.id === parseInt(id);
      }) || null;
      var modalWindow = (0,_modal__WEBPACK_IMPORTED_MODULE_1__["default"])(data, inputStage);
      overlay.insertAdjacentHTML("afterend", modalWindow);
    }
  }, {
    key: "hide",
    value: function hide() {
      var modalWindow = document.querySelector(".modal-window");
      modal.removeChild(modalWindow);
      modal.classList.add("hidden");
    }
  }, {
    key: "inputValue",
    value: function inputValue() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var title = document.querySelector("#title");
      var manager = document.querySelector('#manager');
      var stage = document.querySelector("#stage");
      var inputTitle = title.value;
      var inputManager = manager.value;
      var inputStageText = stage.innerHTML;
      if (inputTitle.trim() === '') {
        alert("제목을 입력해주세요.");
        return;
      }
      if (inputManager.trim() === '') {
        alert("담당자를 입력해주세요.");
        return;
      }

      // 항목 추가인 경우
      if (id == null) {
        id = localStorage.getItem('id') || 0;
        id++;
        localStorage.setItem('id', id);
      }

      // 생성 시간 or 변경 시간
      function getToday() {
        var today = new Date();
        var year = today.getFullYear();
        var month = "0".concat(today.getMonth() + 1).slice(-2);
        var date = "0".concat(today.getDate()).slice(-2);
        var hour = "0".concat(today.getHours()).slice(-2);
        var minute = "0".concat(today.getMinutes()).slice(-2);
        today = "".concat(year, ".").concat(month, ".").concat(date, " ").concat(hour, ":").concat(minute);
        return today;
      }
      return {
        id: id,
        title: inputTitle,
        createdDate: getToday(),
        manager: inputManager,
        stage: inputStageText
      };
    }

    // 투두 카드 추가
  }, {
    key: "addToDo",
    value: function addToDo() {
      var toDo = this.inputValue();
      if (toDo) {
        var newToDo = document.createElement("li");
        newToDo.setAttribute("draggable", "true");
        newToDo.innerHTML = (0,_todo__WEBPACK_IMPORTED_MODULE_0__["default"])(toDo);
        if (toDo.stage === "To Do") {
          toDoUl.appendChild(newToDo);
        }
        if (toDo.stage === "In Progress") {
          inProgressUl.appendChild(newToDo);
        }
        if (toDo.stage === "Done") {
          doneUl.appendChild(newToDo);
        }
      }
      return toDo;
    }

    // 투두 카드 수정
  }, {
    key: "updateToDo",
    value: function updateToDo(id) {
      var updatedEl = document.querySelector("[data-id=\"".concat(id, "\"]")).parentNode;
      var updatedData = this.inputValue(id);
      if (updatedData) {
        updatedEl.innerHTML = (0,_todo__WEBPACK_IMPORTED_MODULE_0__["default"])(updatedData);
        if (updatedData.stage === "To Do") {
          toDoUl.appendChild(updatedEl);
        }
        if (updatedData.stage === "In Progress") {
          inProgressUl.appendChild(updatedEl);
        }
        if (updatedData.stage === "Done") {
          doneUl.appendChild(updatedEl);
        }
      }
      return updatedData;
    }

    // 투두 카드 삭제
  }, {
    key: "deleteToDo",
    value: function deleteToDo(id) {
      var data = this.storage.read().find(function (todo) {
        return todo.id === id;
      });
      var deleteEl = document.querySelector("[data-id=\"".concat(id, "\"]")).parentNode;
      if (deleteEl) {
        if (data.stage === "To Do") {
          toDoUl.removeChild(deleteEl);
        }
        if (data.stage === "In Progress") {
          inProgressUl.removeChild(deleteEl);
        }
        if (data.stage === "Done") {
          doneUl.removeChild(deleteEl);
        }
      }
    }

    // Drag and Drop
  }, {
    key: "dragStart",
    value: function dragStart(target) {
      this.dragToDo = target;
      this.dragToDo.classList.add("dragged");
    }
  }, {
    key: "dragEnd",
    value: function dragEnd() {
      this.dragToDo.classList.remove("dragged");
    }
  }, {
    key: "dragEnter",
    value: function dragEnter(target) {
      var Uls = [toDoUl, inProgressUl, doneUl];
      Uls.forEach(function (ul) {
        if (ul.contains(target)) {
          target.style.background = "#bdbdbd";
        }
      });
    }
  }, {
    key: "dragOver",
    value: function dragOver(e) {
      e.preventDefault();
    }
  }, {
    key: "dragLeave",
    value: function dragLeave(target) {
      target.style.background = "";
    }
  }, {
    key: "dragDropAtCard",
    value: function dragDropAtCard(target) {
      var _this = this;
      var referenceNode = target.parentElement;
      var id = parseInt(target.dataset.id);
      var currentList = this.storage.read();
      var index1 = currentList.findIndex(function (item) {
        return item.id === parseInt(_this.dragToDo.children[0].dataset.id);
      });
      var data = currentList[index1];

      // 원래 자리에 drop한 경우
      if (id === data.id) {
        return currentList;
      }

      // drop될 위치 확인
      var list = ['to-do', 'in-progress', 'done'];
      while (!list.includes(target.className)) {
        target = target.parentElement;
      }
      target.insertBefore(this.dragToDo, referenceNode);
      target.style.background = "";

      // storage에 적용하기 위한 Array 수정
      currentList.splice(index1, 1);
      var index2 = currentList.findIndex(function (item) {
        return item.id === id;
      });
      data.stage = currentList[index2].stage;
      currentList.splice(index2, 0, data);
      return currentList;
    }
  }, {
    key: "dragDrop",
    value: function dragDrop(target) {
      var _this2 = this;
      var stage = target.previousElementSibling.innerText;
      var data = this.storage.read().find(function (todo) {
        return todo.id === parseInt(_this2.dragToDo.children[0].dataset.id);
      });
      data.stage = stage;
      target.appendChild(this.dragToDo);
      target.style.background = "";
      return data;
    }
  }]);
  return Kanban;
}();


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ todo)
/* harmony export */ });
function todo(data) {
  return "\n            <div class='card' data-id=".concat(data ? data.id : "", "> \n            <p>ISSUE-").concat(data ? data.id : "", "</p>\n                <p class=\"card-title\">").concat(data ? data.title : "", "</p>\n                \n                <p class=\"card-btn\"> \n                    <button class=\"updateBtn\" type=\"button\" data-id=").concat(data ? data.id : "", ">\uC218\uC815</button> \n                    <button class=\"deleteBtn\" type=\"button\" data-id=").concat(data ? data.id : "", ">\uC0AD\uC81C</button>\n                </p>\n                <br>\n                <div class=\"card-content\">\n                    <span>").concat(data ? data.manager : "", "</span>\n                    <span>").concat(data ? data.createdDate : "", "</span>\n                </div>\n            </div>\n        ");
}

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modal)
/* harmony export */ });
function modal() {
  var toDoData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var stage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // data !null 이면 update, stage !null 이면 add
  return "\n        <div class=\"modal-window\">\n            <h1 class=\"modal-title\">\uD56D\uBAA9 \uCD94\uAC00/\uC218\uC815</h1>\n            <div class=\"modal-form\" data-id=".concat(toDoData === null ? "" : toDoData.id, ">\n                <div>\n                    <label for=\"title\">\uC774\uC288 \uC81C\uBAA9</label>\n                    <input id=\"title\" placeholder=\"\uC774\uC288 \uC81C\uBAA9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694\" value=\"").concat(toDoData === null ? "" : toDoData.title, "\">\n                </div>\n                <div>\n                    <label for=\"manager\">\uB2F4\uB2F9\uC790 id</label>\n                    <input id=\"manager\" placeholder=\"\uB2F4\uB2F9\uC790 id\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694\" value=\"").concat(toDoData === null ? "" : toDoData.manager, "\">\n                </div>\n                <div style=\"display:none;\" id=\"stage\">").concat(toDoData === null ? stage : toDoData.stage, "</div>\n                <div class=\"btn-row\">\n                    <button class=\"submitBtn-cancel\" type=\"button\">\uCDE8\uC18C</button>\n                    <button class=").concat(toDoData === null ? "submitBtn-add" : "submitBtn-update", " type=\"button\">\uD655\uC778</button>\n                </div>\n            </div>\n        </div>      \n    ");
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Controller)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
// DOM selectors
var addBtn = document.querySelectorAll(".addBtn");
var overlay = document.querySelector(".modal-overlay");
var Controller = /*#__PURE__*/function () {
  function Controller(model, kanban, todo) {
    _classCallCheck(this, Controller);
    this.model = model;
    this.kanban = kanban;
    this.init();
    this.attachEvent();
  }

  // 유저 입력값 받기
  _createClass(Controller, [{
    key: "addItem",
    value: function addItem() {
      var _this = this;
      // console.log(1);
      // Promise 객체 사용
      return Promise.resolve(true).then(function () {
        var data = _this.kanban.addToDo();
        if (!data) return false;
        _this.model.insert(data);
        return true;
      });
    }
  }, {
    key: "updateItem",
    value: function updateItem(id) {
      var _this2 = this;
      return Promise.resolve(true).then(function () {
        id = parseInt(id);
        var data = _this2.kanban.updateToDo(id);
        console.log(data);
        if (!data) return false;
        _this2.model.update(data, id);
        return true;
      });
    }
  }, {
    key: "removeItem",
    value: function removeItem(id) {
      id = parseInt(id);
      alert('Deleted!');
      this.kanban.deleteToDo(id);
      this.model["delete"](id);
    }

    // event 처리
  }, {
    key: "init",
    value: function init() {
      this.kanban.render();
    }
  }, {
    key: "attachEvent",
    value: function attachEvent() {
      this.attachClickEvent();
      this.attachDragDropEvent();
    }
  }, {
    key: "attachDragDropEvent",
    value: function attachDragDropEvent() {
      var _this3 = this;
      document.body.ondragstart = function (e) {
        _this3.kanban.dragStart(e.target);
      };
      document.body.ondragend = function (e) {
        _this3.kanban.dragEnd();
      };
      document.body.ondragover = function (e) {
        e.preventDefault();
        _this3.kanban.dragOver(e);
      };
      document.body.ondragenter = function (e) {
        e.preventDefault();
        _this3.kanban.dragEnter(e.target);
      };
      document.body.ondragleave = function (e) {
        _this3.kanban.dragLeave(e.target);
      };
      document.body.ondrop = function (e) {
        e.preventDefault();
        var dest = e.target.className;
        var list = ['to-do', 'in-progress', 'done'];
        if (list.includes(dest)) {
          // ul에 드랍하는 경우
          var dragItem = _this3.kanban.dragDrop(e.target);
          _this3.model.update(dragItem, dragItem.id);
        } else if (list.includes(e.target.id)) {
          // h2에 드랍하는 경우
          var _dragItem = _this3.kanban.dragDrop(e.target.nextElementSibling);
          _this3.model.update(_dragItem, _dragItem.id);
        } else {
          // card에 드랍하는 경우
          var parentTag = e.target;
          while (parentTag !== null && parentTag.className !== "card") {
            parentTag = parentTag.parentElement;
          }
          _this3.kanban.dragLeave(e.target);
          if (parentTag === null) {
            return;
          }
          var updatedList = _this3.kanban.dragDropAtCard(parentTag);
          _this3.model.updateOrder(updatedList);
        }
      };
    }
  }, {
    key: "attachClickEvent",
    value: function attachClickEvent() {
      var _this4 = this;
      addBtn.forEach(function (el) {
        return el.addEventListener("click", function () {
          var stage = el.nextElementSibling.innerHTML;
          _this4.kanban.show(null, stage);
        });
      });
      overlay.addEventListener("click", function () {
        _this4.kanban.hide();
      });
      document.body.onclick = function (e) {
        if (e.target.className === "updateBtn") {
          _this4.kanban.show(e.target.dataset.id);
        }
        if (e.target.className === "deleteBtn") {
          _this4.removeItem(e.target.dataset.id);
        }
        if (e.target.className.includes("submitBtn")) {
          if (e.target.className === "submitBtn-cancel") {
            _this4.kanban.hide();
          } else if (e.target.className === "submitBtn-update") {
            var parentTag = e.target;
            while (parentTag.className !== "modal-form") {
              parentTag = parentTag.parentElement;
            }
            _this4.updateItem(parentTag.dataset.id).then(function (res) {
              if (!res) return false;
              _this4.kanban.hide();
            });
          } else {
            _this4.addItem().then(function (res) {
              if (!res) return false;
              _this4.kanban.hide();
            });
          }
        }
      };
    }
  }]);
  return Controller;
}();


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 8 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 9 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 10 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 11 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 12 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 13 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 14 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*, *:before, *:after {\n  box-sizing: border-box;\n}\n\nhtml, body, div, span, object, iframe, figure, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, code, em, img, small, strike, strong, sub, sup, tt, b, u, i, ol, ul, li, fieldset, form, label, table, caption, tbody, tfoot, thead, tr, th, td, main, canvas, embed, footer, header, nav, section, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  text-size-adjust: none;\n}\n\nfooter, header, nav, section, main {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after, q:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ninput, textarea {\n  -webkit-appearance: none;\n  border-radius: 0;\n}\n\nbody {\n  box-sizing: border-box;\n}\n\nbutton {\n  font-weight: bold;\n  border: none;\n  border-radius: 3px;\n  color: white;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\nbutton:hover {\n  opacity: 0.6;\n}\n\nheader {\n  font-size: 32px;\n  font-weight: bold;\n  text-align: left;\n  margin: 50px 0;\n}\n\n#kanban {\n  width: 1000px;\n  margin: 0 auto;\n}\n\n.main {\n  width: 100%;\n}\n.main-bar {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n.main-bar #sorting {\n  padding: 5px;\n  border-radius: 3px;\n  font-weight: 500;\n  cursor: pointer;\n}\n\nsection {\n  width: 100%;\n  display: flex;\n  gap: 15px;\n}\n\narticle {\n  min-height: 100vh;\n  flex: 1;\n}\narticle .to-do, article .in-progress, article .done {\n  pointer-events: auto;\n}\narticle .addBtn {\n  float: inline-end;\n  background-color: black;\n  padding: 5px 8px;\n  margin: 15px 15px;\n}\narticle h2 {\n  border-color: black;\n  border-width: 1px;\n  border-style: solid;\n  padding: 10px;\n  text-align: left;\n  color: black;\n  font-size: 24px;\n  font-weight: bold;\n  margin: 5px 5px;\n}\narticle ul {\n  min-height: 500px;\n  border-radius: 3px;\n  border-color: black;\n  border-width: 1px;\n  border-style: solid;\n  padding: 1px;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\narticle ul li.dragged {\n  opacity: 0.5;\n  cursor: move;\n}\narticle ul li .card {\n  border-color: black;\n  border-width: 1px;\n  border-style: solid;\n  padding: 10px;\n  position: relative;\n  background-color: white;\n  cursor: pointer;\n}\narticle ul li .card p:not(:last-child) {\n  margin-bottom: 15px;\n  pointer-events: none;\n}\narticle ul li .card-title {\n  font-size: 15px;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  pointer-events: none;\n}\narticle ul li .card-content {\n  display: flex;\n  justify-content: space-between;\n  pointer-events: none;\n}\narticle ul li .card-btn {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  display: flex;\n  gap: 5px;\n}\narticle ul li .card-btn .updateBtn, article ul li .card-btn .deleteBtn {\n  color: black;\n  background-color: lightgray;\n  padding: 5px 10px;\n  pointer-events: auto;\n}\n\n.modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  pointer-events: auto;\n}\n.modal-title {\n  margin: 10px 20px;\n  font-weight: bold;\n}\n.modal-overlay {\n  background-color: rgba(0, 0, 0, 0.7);\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n.modal-window {\n  width: 400px;\n  padding: 5px;\n  background-color: white;\n  border: 1px solid black;\n  border-radius: 5px;\n  position: relative;\n}\n.modal-window .modal-form {\n  padding: 20px;\n}\n.modal-window .modal-form div {\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.modal-window .modal-form div label {\n  margin-top: 20px;\n  font-weight: 700;\n}\n.modal-window .modal-form div input {\n  margin-top: 5px;\n  height: 25px;\n  width: 100%;\n  border: 1px solid black;\n  padding: 10px;\n}\n.modal-window .modal-form div textarea {\n  width: 100%;\n  margin-top: 30px;\n}\n.modal-window .modal-form .btn-row {\n  margin: 10px 0px;\n  justify-content: flex-end;\n  float: right;\n  gap: 10px;\n}\n.modal-window .modal-form .btn-row .submitBtn-cancel, .modal-window .modal-form .btn-row .submitBtn-add, .modal-window .modal-form .btn-row .submitBtn-update {\n  padding: 5px 20px;\n  margin-left: 10px;\n  color: black;\n  background-color: lightgray;\n}\n\n.hidden {\n  display: none;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 15 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 16 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _views_kanban__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var App = /*#__PURE__*/_createClass(function App() {
  _classCallCheck(this, App);
  this.storage = new _storage__WEBPACK_IMPORTED_MODULE_0__["default"]("todoList");
  // window.localStorage.clear();
  this.model = new _model__WEBPACK_IMPORTED_MODULE_1__["default"](this.storage);
  this.kanban = new _views_kanban__WEBPACK_IMPORTED_MODULE_2__["default"](this.storage);
  this.controller = new _controller__WEBPACK_IMPORTED_MODULE_3__["default"](this.model, this.kanban);
});
new App();
})();

/******/ })()
;