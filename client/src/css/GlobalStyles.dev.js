"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStyles = void 0;

var _styledComponents = require("styled-components");

var _wallpaper = _interopRequireDefault(require("../images/wallpaper.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nhtml {\n  scroll-behavior: smooth;\n}\n\nh1,\nh2,\nh3 {\n  font-family: 'Poppins', sans-serif;\n}\n\nbody {\n    position: relative;\n    background: url(", ");\n    background-attachment: fixed;\n    background-size: cover;\n    color: ", ";\n    font-family: Montserrat, Tahoma, Helvetica, Arial, Roboto, sans-serif;\n    &:before {\n      content: '';\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top:0;\n      left:0;\n      background-color: ", ";\n      transition: background-color 500ms linear;\n     z-index: -5;\n    }\n  }\n  \n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GlobalStyles = (0, _styledComponents.createGlobalStyle)(_templateObject(), _wallpaper["default"], function (_ref) {
  var theme = _ref.theme;
  return theme.text;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.bg;
});
exports.GlobalStyles = GlobalStyles;