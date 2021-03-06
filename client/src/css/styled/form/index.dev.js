"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectMonths = exports.InputYears = exports.InputDays = exports.InputFirstName = exports.Label = exports.InputPassword = exports.Flex = exports.InputEmail = exports.Back = exports.Button = exports.H1 = exports.FormContainer = exports.Container = exports.Section = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 31%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4);\n  padding-left: 0.2rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n  :-webkit-inner-spin-button,\n  :-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  :focus {\n    background-color: rgba(255, 255, 255, 0.6);\n    border-bottom: 2px #eb3941 solid;\n  }\n  @media (min-width: 840px) {\n    width: 25%;\n  }\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 21%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4);\n  padding-left: 0.5rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  :focus {\n    background-color: rgba(255, 255, 255, 0.6);\n    border-bottom: 2px #eb3941 solid;\n  }\n  @media (min-width: 840px) {\n    width: 15%;\n  }\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 16%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4);\n  padding-left: 0.5rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  :focus {\n    background-color: rgba(255, 255, 255, 0.6);\n    border-bottom: 2px #eb3941 solid;\n  }\n  @media (min-width: 840px) {\n    width: 10%;\n  }\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 70%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4);\n  padding-left: 1rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n\n  :focus {\n    background-color: rgba(255, 255, 255, 0.6);\n    border-bottom: 2px #eb3941 solid;\n  }\n\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  width: 70%;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: auto;\n  padding-bottom: 1rem;\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 70%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.2);\n  margin-bottom: 1rem;\n  padding-left: 1rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n\n  :focus {\n    background-color: rgba(255, 255, 255, 0.6);\n    border-bottom: 2px #eb3941 solid;\n  }\n\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  align-items: center;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 70%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.2);\n  margin-bottom: 1rem;\n  padding-left: 1rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n\n  :focus {\n    background-color: rgba(255, 255, 255, 0.6);\n    border-bottom: 2px #eb3941 solid;\n  }\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  background-color: #4d4d4d;\n"]);

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
var Back = (0, _styledComponents["default"])(Button)(_templateObject6());
exports.Back = Back;

var InputEmail = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'email'
  };
})(_templateObject7());

exports.InputEmail = InputEmail;

var Flex = _styledComponents["default"].div(_templateObject8());

exports.Flex = Flex;

var InputPassword = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'password'
  };
})(_templateObject9());

exports.InputPassword = InputPassword;

var Label = _styledComponents["default"].label(_templateObject10());

exports.Label = Label;

var InputFirstName = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'text',
    name: 'firstName'
  };
})(_templateObject11());

exports.InputFirstName = InputFirstName;

var InputDays = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'number',
    name: 'days'
  };
})(_templateObject12());

exports.InputDays = InputDays;

var InputYears = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'number',
    name: 'years'
  };
})(_templateObject13());

exports.InputYears = InputYears;

var SelectMonths = _styledComponents["default"].select.attrs(function (props) {
  return {
    type: 'text',
    name: 'months'
  };
})(_templateObject14());

exports.SelectMonths = SelectMonths;