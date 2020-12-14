"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = exports.SelectMonths = exports.InputYears = exports.InputDays = exports.InputFirstName = exports.InputPassword = exports.InputEmail = exports.Button = exports.Back = exports.H1 = exports.Flex = exports.FormContainer = exports.Container = exports.Section = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  width: 70%;\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  margin: auto;\n  padding-bottom: 1rem;\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 31%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4);\n  margin-bottom: 1rem;\n  padding-left: 0.2rem;\n  border: none;\n  border: 0.5px white solid;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n  :-webkit-inner-spin-button,\n  :-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  :focus {\n    border-bottom: 2px #eb3941 solid;\n  }\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 21%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4);\n  margin-bottom: 1rem;\n  padding-left: 0.5rem;\n  border: none;\n  border: 0.5px white solid;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  :focus {\n    border-bottom: 2px #eb3941 solid;\n  }\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 16%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4);\n  margin-bottom: 1rem;\n  padding-left: 0.5rem;\n  border: none;\n  border: 0.5px white solid;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n  :focus {\n    border-bottom: 2px #eb3941 solid;\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 70%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4);\n  margin-bottom: 1rem;\n  padding-left: 1rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n\n  :focus {\n    border-bottom: 2px #eb3941 solid;\n  }\n\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 70%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.4);\n  margin-bottom: 1rem;\n  padding-left: 1rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n\n  :focus {\n    border-bottom: 2px #eb3941 solid;\n  }\n\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1.2rem;\n  width: 70%;\n  height: 2rem;\n  outline: none;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  background-color: rgba(255, 255, 255, 0.2);\n  margin-bottom: 1rem;\n  padding-left: 1rem;\n  border: none;\n  border-bottom: 2px black solid;\n  margin-bottom: 2.5rem;\n  transition: all 330ms ease-in-out;\n\n  :focus {\n    background-color: rgba(255, 255, 255, 0.6);\n    border-bottom: 2px #eb3941 solid;\n  }\n  @media (min-width: 840px) {\n    width: 50%;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  background-image: linear-gradient(\n    to right,\n    #353535,\n    #555555,\n    #795b5c,\n    #412e2f\n  );\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  width: 50%;\n  text-align: center;\n  padding: 0.3rem 1rem 0.3rem 1rem;\n  font-size: 1.2rem;\n  color: #fff;\n  cursor: pointer;\n  height: 3rem;\n  text-align: center;\n  border: none;\n  background-size: 300% 100%;\n  border-radius: 50px;\n  transition: all 0.3s ease-in-out;\n  background-image: linear-gradient(\n    to right,\n    #eb3941,\n    #f15e64,\n    #e14e53,\n    #e2373f\n  );\n  font-weight: 600;\n  box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);\n  line-height: 0;\n  :hover {\n    background-position: 100% 0;\n    transition: all 0.3s ease-in-out;\n  }\n  :focus {\n    outline: none;\n  }\n  margin: auto;\n  margin-bottom: 1rem;\n  border: 3px rgba(255, 255, 255, 0.3) solid;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  text-align: center;\n  font-size: 2rem;\n  padding: 2rem;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  align-items: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]);

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
  var data = _taggedTemplateLiteral(["\n  margin: auto;\n  height: 100vh;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  @media (min-width: 840px) {\n    height: 100vh;\n    width: 80%;\n    flex-direction: row;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Section = _styledComponents["default"].section(_templateObject());

exports.Section = Section;

var Container = _styledComponents["default"].section(_templateObject2());

exports.Container = Container;

var FormContainer = _styledComponents["default"].form(_templateObject3());

exports.FormContainer = FormContainer;

var Flex = _styledComponents["default"].div(_templateObject4());

exports.Flex = Flex;

var H1 = _styledComponents["default"].h1(_templateObject5());

exports.H1 = H1;

var Button = _styledComponents["default"].button(_templateObject6());

exports.Button = Button;
var Back = (0, _styledComponents["default"])(Button)(_templateObject7());
exports.Back = Back;

var InputEmail = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'email'
  };
})(_templateObject8());

exports.InputEmail = InputEmail;

var InputPassword = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'password'
  };
})(_templateObject9());

exports.InputPassword = InputPassword;

var InputFirstName = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'text',
    name: 'firstName'
  };
})(_templateObject10());

exports.InputFirstName = InputFirstName;

var InputDays = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'number',
    name: 'days'
  };
})(_templateObject11());

exports.InputDays = InputDays;

var InputYears = _styledComponents["default"].input.attrs(function (props) {
  return {
    type: 'number',
    name: 'years'
  };
})(_templateObject12());

exports.InputYears = InputYears;

var SelectMonths = _styledComponents["default"].select.attrs(function (props) {
  return {
    type: 'text',
    name: 'months'
  };
})(_templateObject13());

exports.SelectMonths = SelectMonths;

var Label = _styledComponents["default"].label(_templateObject14());

exports.Label = Label;