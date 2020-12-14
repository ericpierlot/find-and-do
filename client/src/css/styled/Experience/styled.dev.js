"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Wrapper = exports.Section = exports.Top = exports.Article = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: 80%;\n  margin: auto;\n  padding-top: 3rem;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n\n  a {\n    text-decoration: none;\n    color: black;\n  }\n  @media (max-width: 1400px) {\n    width: 100%;\n    flex-direction: row;\n  }\n\n  @media (max-width: 1020px) {\n    width: 100%;\n    flex-direction: column;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 80%;\n  margin: auto;\n  padding-top: 1rem;\n\n  @media (max-width: 920px) {\n    width: 100%;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);\n  min-height: 90vh;\n  margin: auto;\n  margin-top: 5vh;\n  max-width: 90vw;\n  border-radius: 30px;\n\n  background-color: rgba(255, 255, 255, 0.2);\n\n  @media (max-width: 920px) {\n    max-width: 100vw;\n    margin-top: 0;\n    border-radius: 0;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: auto;\n  width: 100%;\n  margin-top: 90px;\n  margin-bottom: 45px;\n  @media (max-width: 920px) {\n    margin: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Section = _styledComponents["default"].section(_templateObject());

exports.Section = Section;

var Wrapper = _styledComponents["default"].section(_templateObject2());

exports.Wrapper = Wrapper;

var Top = _styledComponents["default"].header(_templateObject3());

exports.Top = Top;

var Article = _styledComponents["default"].article(_templateObject4());

exports.Article = Article;