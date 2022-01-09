import { View, Text, Input } from '@tarojs/components';

import {
  inCollection,
  showErrorMessage,
  styleToString,
  recordError,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import {
  isFunction,
  isNull,
  isString,
  isObject,
} from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Icon from '../Icon';
import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';

const { IconCloseCircle } = Icon;

const typeCollection = ['number', 'text', 'idcard', 'digit'];
const confirmTypeCollection = ['send', 'search', 'next', 'go', 'done'];

const defaultProps = {
  align: 'left',
  required: false,
  hidden: false,
  clearable: false,
  label: '',
  extra: null,
  labelStyle: {},
  labelContainerStyle: {},
  inputContainerStyle: {},
  extraContainerStyle: {},
  value: '',
  type: 'text',
  password: false,
  placeholder: '请输入',
  placeholderStyle: '',
  placeholderClass: 'input-placeholder',
  disabled: false,
  maxlength: 140,
  cursorSpacing: 0,
  focus: true,
  confirmType: 'done',
  confirmHold: false,
  cursor: 0,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  onChange: null,
  onFocus: null,
  onBlur: null,
  onConfirm: null,
  onKeyboardHeightChange: null,
};

class AdvanceInput extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        valueFlag: '',
        valueTemp: '',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev } = prevState;

    if (valueNext !== valuePrev) {
      return {
        valueFlag: valueNext,
        valueTemp: valueNext ?? '',
      };
    }

    return {};
  }

  triggerChange = (v) => {
    const { onChange } = this.props;

    if (!isNull(onChange)) {
      if (!isFunction(onChange)) {
        showErrorMessage({
          message: 'onChange must be function',
        });

        recordError('AdvanceInput: onChange must be function');
      } else {
        onChange(v);
      }
    } else {
      showErrorMessage({
        message:
          'onChange in props is null,please defined it,onChange must be function',
      });

      recordError(
        'AdvanceInput: onChange in props is null,please defined it,onChange must be function',
      );
    }
  };

  onInput = (e) => {
    const { clearable } = this.props;

    const {
      detail: { value: v },
    } = e;

    if (clearable) {
      this.setState({
        valueTemp: v,
      });
    }

    this.triggerChange(v);
  };

  triggerFocus = (e) => {
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

  triggerBlur = (e) => {
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

  triggerConfirm = (e) => {
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

  triggerKeyboardHeightChange = (e) => {
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

  clearValue = () => {
    this.setState({
      valueTemp: '',
    });

    this.triggerChange('');
  };

  render() {
    const {
      align,
      required,
      hidden,
      clearable,
      label,
      extra,
      labelStyle,
      labelContainerStyle,
      inputContainerStyle,
      extraContainerStyle,
      type: typeSource,
      password,
      placeholder,
      placeholderStyle,
      placeholderClass,
      disabled,
      maxlength,
      cursorSpacing,
      focus,
      confirmType: confirmTypeSource,
      confirmHold,
      cursor,
      selectionStart,
      selectionEnd,
      adjustPosition,
      holdKeyboard,
    } = this.props;

    if (!!hidden) {
      return null;
    }

    const type = inCollection(typeCollection, typeSource) ? typeSource : 'text';
    const confirmType = inCollection(confirmTypeCollection, confirmTypeSource)
      ? confirmTypeSource
      : 'done';

    let labelComponent = label;

    if (isString(label)) {
      if (!stringIsNullOrWhiteSpace(label)) {
        labelComponent = (
          <VerticalBox>
            <View style={{ ...{ paddingRight: '40rpx' }, ...labelStyle }}>
              {!!required ? (
                <Text
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    textAlign: 'center',
                    width: '24rpx',
                    height: '45rpx',
                    lineHeight: '45rpx',
                    color: 'red',
                  }}
                >
                  *
                </Text>
              ) : null}
              {label}
            </View>
          </VerticalBox>
        );
      } else {
        labelComponent = null;
      }
    }

    const { valueTemp } = this.state;

    return (
      <FlexBox
        flexAuto="right"
        left={labelComponent ? labelComponent : null}
        leftStyle={labelContainerStyle}
        right={
          <FlexBox
            left={
              <FlexBox
                left={
                  <Input
                    value={valueTemp}
                    type={type}
                    style={align == 'right' ? { textAlign: 'right' } : {}}
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
                    focus={focus}
                    confirmType={confirmType}
                    confirmHold={confirmHold}
                    cursor={cursor}
                    selectionStart={selectionStart}
                    selectionEnd={selectionEnd}
                    adjustPosition={adjustPosition}
                    holdKeyboard={holdKeyboard}
                    onInput={this.onInput}
                    onFocus={this.triggerFocus}
                    onBlur={this.triggerBlur}
                    onConfirm={this.triggerConfirm}
                    onKeyboardHeightChange={this.triggerKeyboardHeightChange}
                  />
                }
                leftStyle={inputContainerStyle}
                right={
                  clearable ? (
                    <View
                      style={{
                        paddingLeft: '10rpx',
                        height: '100%',
                      }}
                    >
                      <VerticalBox>
                        <IconCloseCircle
                          size={18}
                          color="#ccc"
                          hidden={!valueTemp}
                          onClick={this.clearValue}
                        />
                      </VerticalBox>
                    </View>
                  ) : null
                }
                rightStyle={clearable ? extraContainerStyle : null}
              />
            }
            right={extra ? extra : null}
            rightStyle={extra ? extraContainerStyle : null}
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
