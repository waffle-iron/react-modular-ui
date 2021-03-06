import React from 'react';

import settings from '../settings';

export default class AbstractComponent extends React.Component {
  camelCaseToDashCase(word) {
    return word.replace(/([A-Z])/g, (match) => {
      return `-${match.toLowerCase()}`;
    });
  }

  modifier(...modifiers) {
    return modifiers.filter(m => m !== '').join(settings.getClasses().separator);
  }

  blockClassName(blockName) {
    return `${settings.getPrefix()}${settings.getClasses().block
      .replace('{b}', this.camelCaseToDashCase(blockName))}`;
  }

  elementClassName(blockName, elementName) {
    return `${settings.getPrefix()}${settings.getClasses().element
      .replace('{b}', this.camelCaseToDashCase(blockName))
      .replace('{e}', this.camelCaseToDashCase(elementName))}`;
  }

  blockModifierClassName(blockName, modifierName) {
    return settings.getClasses().blockModifier
      .replace('{b}', this.camelCaseToDashCase(blockName))
      .replace('{m}', this.camelCaseToDashCase(modifierName));
  }

  elementModifierClassName(blockName, elementName, modifierName) {
    return settings.getClasses().elementModifier
      .replace('{b}', this.camelCaseToDashCase(blockName))
      .replace('{e}', this.camelCaseToDashCase(elementName))
      .replace('{m}', this.camelCaseToDashCase(modifierName));
  }

  complexModifierValues(modifierValue) {
    const modifierValues = modifierValue.split(' ');
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

  blockModifierWithComplexValueClassName(blockName, modifierKey, modifierValue, modifierMedia = '') {
    const modifierValues = this.complexModifierValues(modifierValue);
    return Object.keys(modifierValues).filter((key) => modifierValues[key] !== '0').map((key) => {
      const newModifierKey = key === 'default' ? modifierKey : `${modifierKey}-${key}`;
      return this.blockModifierClassName(
        blockName, this.modifier(newModifierKey, modifierValues[key], modifierMedia)
      );
    }).join(' ');
  }

  elementModifierWithComplexValueClassName(blockName, elementName, modifierKey, modifierValue, modifierMedia = '') {
    const modifierValues = this.complexModifierValues(modifierValue);
    return Object.keys(modifierValues).filter((key) => modifierValues[key] !== '0').map((key) => {
      const newModifierKey = key === 'default' ? modifierKey : `${modifierKey}-${key}`;
      return this.elementModifierClassName(
        blockName, elementName, this.modifier(newModifierKey, modifierValues[key], modifierMedia)
      );
    }).join(' ');
  }

  blockName(blockName, modifiers) {
    const blockNameClass = this.blockClassName(blockName);
    const modifiersClass = this.modifiers(blockName, null, modifiers);

    if (modifiersClass !== '') {
      return `${blockNameClass} ${modifiersClass}`
    }

    return blockNameClass;
  }

  elementName(blockName, elementName, modifiers, isStatic) {
    const elementNameClass = this.elementClassName(blockName, elementName);

    const modifiersClass = modifiers instanceof Array ? this.modifiers(blockName, elementName, modifiers, isStatic) : '';

    if (modifiersClass !== '') {
      return `${elementNameClass} ${modifiersClass}`
    }

    return elementNameClass;
  }

  modifiers(blockName, elementName, modifiers, isStatic) {
    return modifiers.map((key) => {
      const value = this.props[key];
      if ((typeof value === 'boolean' && value === true) || isStatic) {
        if (elementName) {
          return this.elementModifierClassName(blockName, elementName, key);
        }

        return this.blockModifierClassName(blockName, key);
      }

      if (typeof value === 'string' || typeof value === 'number') {
        if (elementName) {
          return this.elementModifierWithComplexValueClassName(blockName, elementName, key, value.toString());
        }

        return this.blockModifierWithComplexValueClassName(blockName, key, value.toString());
      }

      if (typeof value === 'object') {
        const result = [];
        Object.keys(value).forEach((valueKey) => {
          const valueValue = value[valueKey];
          if (typeof valueValue === 'boolean' && valueValue === false) {
            return;
          }

          let className = '';
          if (typeof valueValue === 'string' || typeof valueValue === 'number') {
            className = valueValue.toString()
          }

          const media = valueKey;

          if (elementName) {
            if (className !== '') {
              result.push(
                this.elementModifierWithComplexValueClassName(blockName, elementName, key, className, media)
              );
            } else {
              result.push(
                this.elementModifierClassName(blockName, elementName, this.modifier(key, media))
              );
            }
          } else {
            if (className !== '') {
              result.push(
                this.blockModifierWithComplexValueClassName(blockName, key, className, media)
              );
            } else {
              result.push(
                this.blockModifierClassName(blockName, this.modifier(key, media))
              );
            }
          }
        });
        return result.join(' ');
      }

      return '';
    }).filter(modifier => modifier !== '').join(' ');
  }
}
