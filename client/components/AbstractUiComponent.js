'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _AbstractComponent2 = require('./AbstractComponent');

var _AbstractComponent3 = _interopRequireDefault(_AbstractComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractUiComponent = function (_AbstractComponent) {
  _inherits(AbstractUiComponent, _AbstractComponent);

  function AbstractUiComponent() {
    _classCallCheck(this, AbstractUiComponent);

    return _possibleConstructorReturn(this, (AbstractUiComponent.__proto__ || Object.getPrototypeOf(AbstractUiComponent)).apply(this, arguments));
  }

  _createClass(AbstractUiComponent, [{
    key: 'camelCaseToDashCase',
    value: function camelCaseToDashCase(word) {
      return word.replace(/([A-Z])/g, function (match) {
        return '-' + match.toLowerCase();
      });
    }
  }, {
    key: 'blockClassName',
    value: function blockClassName(blockName) {
      return '' + _settings2.default.getPrefix() + _settings2.default.getClasses().block.replace('{b}', this.camelCaseToDashCase(blockName));
    }
  }, {
    key: 'elementClassName',
    value: function elementClassName(blockName, elementName) {
      return '' + _settings2.default.getPrefix() + _settings2.default.getClasses().element.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{e}', this.camelCaseToDashCase(elementName));
    }
  }, {
    key: 'blockModifierClassName',
    value: function blockModifierClassName(blockName, modifierName) {
      return _settings2.default.getClasses().blockModifier.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{m}', this.camelCaseToDashCase(modifierName));
    }
  }, {
    key: 'elementModifierClassName',
    value: function elementModifierClassName(blockName, elementName, modifierName) {
      return _settings2.default.getClasses().elementModifier.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{e}', this.camelCaseToDashCase(elementName)).replace('{m}', this.camelCaseToDashCase(modifierName));
    }
  }, {
    key: 'blockModifierWithValueClassName',
    value: function blockModifierWithValueClassName(blockName, modifierKey, modifierValue) {
      return _settings2.default.getClasses().blockModifierWithValue.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{mk}', this.camelCaseToDashCase(modifierKey)).replace('{mv}', this.camelCaseToDashCase(modifierValue));
    }
  }, {
    key: 'elementModifierWithValueClassName',
    value: function elementModifierWithValueClassName(blockName, elementName, modifierKey, modifierValue) {
      return _settings2.default.getClasses().elementModifierWithValue.replace('{b}', this.camelCaseToDashCase(blockName)).replace('{e}', this.camelCaseToDashCase(elementName)).replace('{mk}', this.camelCaseToDashCase(modifierKey)).replace('{mv}', this.camelCaseToDashCase(modifierValue));
    }
  }, {
    key: 'complexModifierValues',
    value: function complexModifierValues(modifierValue) {
      var modifierValues = modifierValue.split(' ');
      if (modifierValues.length === 1) {
        return {
          default: modifierValue
        };
      }
      if (modifierValues.length === 2) {
        return {
          vertical: modifierValues[0],
          horizontal: modifierValues[1]
        };
      }
      if (modifierValues.length === 3) {
        return {
          top: modifierValues[0],
          horizontal: modifierValues[1],
          bottom: modifierValues[2]
        };
      }
      if (modifierValues.length === 4) {
        return {
          top: modifierValues[0],
          right: modifierValues[1],
          bottom: modifierValues[2],
          left: modifierValues[3]
        };
      }
    }
  }, {
    key: 'blockModifierWithComplexValueClassName',
    value: function blockModifierWithComplexValueClassName(blockName, modifierKey, modifierValue) {
      var _this2 = this;

      var modifierValues = this.complexModifierValues(modifierValue);
      return Object.keys(modifierValues).map(function (key) {
        var newModifierKey = key === 'default' ? modifierKey : modifierKey + '-' + key;
        return _this2.blockModifierWithValueClassName(blockName, newModifierKey, modifierValues[key]);
      }).join(' ');
    }
  }, {
    key: 'elementModifierWithComplexValueClassName',
    value: function elementModifierWithComplexValueClassName(blockName, elementName, modifierKey, modifierValue) {
      var _this3 = this;

      var modifierValues = this.complexModifierValues(modifierValue);
      return Object.keys(modifierValues).map(function (key) {
        var newModifierKey = key === 'default' ? modifierKey : modifierKey + '-' + key;
        return _this3.elementModifierWithValueClassName(blockName, elementName, newModifierKey, modifierValues[key]);
      }).join(' ');
    }
  }, {
    key: 'blockName',
    value: function blockName(_blockName, modifiers) {
      var blockNameClass = this.blockClassName(_blockName);
      var modifiersClass = this.modifiers(_blockName, null, modifiers);

      if (modifiersClass !== '') {
        return blockNameClass + ' ' + modifiersClass;
      }

      return blockNameClass;
    }
  }, {
    key: 'elementName',
    value: function elementName(blockName, _elementName, modifiers) {
      var elementNameClass = this.elementClassName(blockName, _elementName);

      var modifiersClass = modifiers instanceof Array ? this.modifiers(null, _elementName, modifiers) : '';

      if (modifiersClass !== '') {
        return elementNameClass + ' ' + modifiersClass;
      }

      return elementNameClass;
    }
  }, {
    key: 'modifiers',
    value: function modifiers(blockName, elementName, _modifiers) {
      var _this4 = this;

      return _modifiers.map(function (key) {
        var value = _this4.props[key];
        if (typeof value === 'boolean' && value === true) {
          if (elementName) {
            return _this4.elementModifierClassName(blockName, elementName, key);
          }

          return _this4.blockModifierClassName(blockName, key);
        }

        if (typeof value === 'string' || typeof value === 'number') {
          if (elementName) {
            return _this4.elementModifierWithComplexValueClassName(blockName, elementName, key, value.toString());
          }

          return _this4.blockModifierWithComplexValueClassName(blockName, key, value.toString());
        }

        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          var _ret = function () {
            var result = [];
            Object.keys(value).forEach(function (valueKey) {
              var valueValue = value[valueKey];
              if (typeof valueValue === 'boolean' && valueValue === false) {
                return;
              }

              var className = '';
              if (typeof valueValue === 'boolean') {
                if (valueKey !== 'default') {
                  className = valueKey;
                }
              } else if (typeof valueValue === 'string' || typeof valueValue === 'number') {
                if (valueKey !== 'default') {
                  className = valueValue.toString() + '-' + valueKey;
                } else {
                  className = valueValue.toString();
                }
              }

              if (elementName) {
                if (className !== '') {
                  result.push(_this4.elementModifierWithComplexValueClassName(blockName, elementName, key, className));
                } else {
                  result.push(_this4.elementModifierClassName(blockName, elementName, key));
                }
              } else {
                if (className !== '') {
                  result.push(_this4.blockModifierWithComplexValueClassName(blockName, key, className));
                } else {
                  result.push(_this4.blockModifierClassName(blockName, elementName, key));
                }
              }
            });
            return {
              v: result.join(' ')
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }

        return '';
      }).filter(function (modifier) {
        return modifier !== '';
      }).join(' ');
    }
  }]);

  return AbstractUiComponent;
}(_AbstractComponent3.default);

exports.default = AbstractUiComponent;