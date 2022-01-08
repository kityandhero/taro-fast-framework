import { Input } from '@tarojs/components';

import {
  inCollection,
  showErrorMessage,
  styleToString,
} from 'taro-fast-common/es/utils/tools';
import {
  isFunction,
  isNull,
  isString,
  isObject,
} from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import FlexBox from '../FlexBox';

const typeCollection = ['number', 'text', 'idcard', 'digit'];
const confirmTypeCollection = ['send', 'search', 'next', 'go', 'done'];

const defaultProps = {
  clearable: false,
  value: '',
  type: 'text',
  password: false,
  placeholder: '请输入',
  placeholderStyle: '',
  placeholderClass: 'input-placeholder',
  disabled: false,
  maxlength: 140,
  cursorSpacing: 0,
  autoFocus: false,
  focus: false,
  confirmType: 'done',
  confirmHold: false,
  cursor: 0,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  onInput: null,
  onFocus: null,
  onBlur: null,
  onConfirm: null,
  onKeyboardHeightChange: null,
};

class AdvanceInput extends ComponentBase {
  afterInput = (e) => {
    const { onInput } = this.props;

    if (!isNull(onInput)) {
      if (!isFunction(onInput)) {
        showErrorMessage({
          message: 'onInput must be function',
        });
      } else {
        onInput(e);
      }
    }
  };

  afterFocus = (e) => {
    const { onFocus } = this.props;

    if (!isNull(onFocus)) {
      if (!isFunction(onFocus)) {
        showErrorMessage({
          message: 'onFocus must be function',
        });
      } else {
        onFocus(e);
      }
    }
  };

  afterBlur = (e) => {
    const { onBlur } = this.props;

    if (!isNull(onBlur)) {
      if (!isFunction(onBlur)) {
        showErrorMessage({
          message: 'onBlur must be function',
        });
      } else {
        onBlur(e);
      }
    }
  };

  afterChange = (e) => {
    const { onConfirm } = this.props;

    if (!isNull(onConfirm)) {
      if (!isFunction(onConfirm)) {
        showErrorMessage({
          message: 'onConfirm must be function',
        });
      } else {
        onConfirm(e);
      }
    }
  };

  afterKeyboardHeightChange = (e) => {
    const { onKeyboardHeightChange } = this.props;

    if (!isNull(onKeyboardHeightChange)) {
      if (!isFunction(onKeyboardHeightChange)) {
        showErrorMessage({
          message: 'onKeyboardHeightChange must be function',
        });
      } else {
        onKeyboardHeightChange(e);
      }
    }
  };

  render() {
    const {
      label,
      extra,
      labelContainerStyle: labelContainerStyleSource,
      inputContainerStyle,
      extraContainerStyle,
      value,
      type: typeSource,
      password,
      placeholder,
      placeholderStyle,
      placeholderClass,
      disabled,
      maxlength,
      cursorSpacing,
      autoFocus,
      focus,
      confirmType: confirmTypeSource,
      confirmHold,
      cursor,
      selectionStart,
      selectionEnd,
      adjustPosition,
      holdKeyboard,
    } = this.props;

    const type = inCollection(typeCollection, typeSource) ? typeSource : 'text';
    const confirmType = inCollection(confirmTypeCollection, confirmTypeSource)
      ? confirmTypeSource
      : 'done';

    const labelContainerStyle = isString(label)
      ? {
          ...{
            paddingRight: '40rpx',
          },
          ...labelContainerStyleSource,
        }
      : labelContainerStyleSource;

    return (
      <FlexBox
        flexAuto="right"
        left={label ? label : null}
        leftStyle={labelContainerStyle}
        right={
          <FlexBox
            left={
              <Input
                value={value}
                type={type}
                password={password}
                placeholder={placeholder}
                placeholderStyle={
                  isString(placeholderStyle)
                    ? placeholderStyle
                    : isObject(placeholderStyle)
                    ? styleToString(placeholderStyle)
                    : ''
                }
                placeholderClass={placeholderClass}
                disabled={disabled}
                maxlength={maxlength}
                cursorSpacing={cursorSpacing}
                autoFocus={autoFocus}
                focus={focus}
                confirmType={confirmType}
                confirmHold={confirmHold}
                cursor={cursor}
                selectionStart={selectionStart}
                selectionEnd={selectionEnd}
                adjustPosition={adjustPosition}
                holdKeyboard={holdKeyboard}
                onInput={this.afterInput}
                onFocus={this.afterFocus}
                onBlur={this.afterBlur}
                onConfirm={this.afterChange}
                onKeyboardHeightChange={this.afterKeyboardHeightChange}
              />
            }
            leftStyle={inputContainerStyle}
            right={extra ? extra : null}
            rightStyle={extraContainerStyle}
          />
        }
      />
    );
  }
}

AdvanceInput.defaultProps = {
  ...defaultProps,
};

export default AdvanceInput;
