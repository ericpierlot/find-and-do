"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = exports.InputPassword = exports.InputEmail = exports.Button = exports.H1 = exports.FormContainer = exports.Container = exports.Section = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  width: 70%;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: auto;\n  padding-bottom: 1rem;\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 70%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.2);\n  margin-bottom: 1rem;\n  padding-left: 1rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  :focus {\n    background-color: rgba(255, 255, 255, 0.6);\n    border-bottom: 2px #eb3941 solid;\n  }\n\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 70%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.2);\n  margin-bottom: 1rem;\n  padding-left: 1rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n\n  :focus {\n    background-color: rgba(255, 255, 255, 0.6);\n    border-bottom: 2px #eb3941 solid;\n  }\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: 50%;\n  text-align: center;\n  padding: 0.3rem 1rem 0.3rem 1rem;\n  font-size: 1.2rem;\n  color: ", ";\n  cursor: pointer;\n  height: 3rem;\n  text-align: center;\n  border: none;\n  border-radius: 10px;\n  transition: all 0.4s ease-in-out;\n  background-color: #eb9e82;\n\n  font-weight: 600;\n  :hover {\n    border: 3px rgba(255, 255, 255, 0.2) solid;\n    transition: all 0.4s ease-in-out;\n  }\n  :focus {\n    outline: none;\n  }\n  margin-bottom: 1rem;\n  border: 3px transparent solid;\n  background-clip: padding-box;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  font-size: 2rem;\n  padding: 2rem;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 90%;\n  margin: auto;\n  display: flex;\n  flex-direction: column;\n  border-radius: 10px;\n  background-color: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(30px) contrast(120%);\n  border: 3px solid transparent;\n  background-clip: padding-box;\n  padding: 1rem;\n  text-align: center;\n  @media (min-width: 840px) {\n    min-height: 50vh;\n    max-width: 40vw;\n    border-radius: 30px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  @media (min-width: 840px) {\n    flex-direction: row;\n    min-height: 100vh;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Section = _styledComponents["default"].div(_templateObject());

exports.Section = Section;

var Container = _styledComponents["default"].section(_templateObject2());

exports.Container = Container;

var FormContainer = _styledComponents["default"].form(_templateObject3());

exports.FormContainer = FormContainer;

var H1 = _styledComponents["default"].h1(_templateObject4());

exports.H1 = H1;

var Button = _styledComponents["default"].button(_templateObject5(), function (_ref) {
  var theme = _ref.theme;
  return theme.text;
});

exports.Button = Button;

var InputEmail = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'email'
  };
})(_templateObject6());

exports.InputEmail = InputEmail;

var InputPassword = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'password'
  };
})(_templateObject7());

exports.InputPassword = InputPassword;

var Label = _styledComponents["default"].label(_templateObject8());

exports.Label = Label;