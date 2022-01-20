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
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';
import Item from '../Item';
import Icon from '../Icon';

const { IconCloseCircle } = Icon;

const typeCollection = ['number', 'text', 'idcard', 'digit'];
const confirmTypeCollection = ['send', 'search', 'next', 'go', 'done'];

const defaultProps = {
  style: {},
  title: null,
  description: null,
  prefix: null,
  border: true,
  align: 'left',
  required: false,
  hidden: false,
  clearable: false,
  clearSize: '18',
  clearColor: '#ccc',
  label: '',
  extra: null,
  labelStyle: {},
  inputStyle: {},
  valueStyle: {},
  labelContainerStyle: {},
  inputContainerStyle: {},
  extraContainerStyle: {},
  value: '',
  type: 'text',
  password: false,
  placeholder: '请输入',
  placeholderStyle: { color: '#ccc' },
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

  renderFurther() {
    const {
      style,
      prefix,
      title,
      description,
      border,
      align,
      required,
      hidden,
      clearable,
      clearSize,
      clearColor,
      label,
      extra,
      labelStyle,
      inputStyle,
      valueStyle,
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

    const labelComponent =
      isObject(label) ||
      (isString(label) && !stringIsNullOrWhiteSpace(label)) ? (
        <FlexBox
          style={{
            height: '100%',
          }}
          flexAuto="right"
          left={
            !!required ? (
              <VerticalBox>
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
              </VerticalBox>
            ) : null
          }
          right={
            <VerticalBox>
              <View
                style={{
                  ...{
                    fontSize: '28rpx',
                  },
                  ...labelStyle,
                }}
              >
                {label}
              </View>
            </VerticalBox>
          }
          rightStyle={{
            ...{
              paddingRight: '40rpx',
            },
            ...{
              height: '100%',
            },
          }}
        />
      ) : null;

    const { valueTemp } = this.state;

    return (
      <Item
        style={style}
        prefix={prefix}
        title={title}
        description={description}
        border={border}
        extra={
          <FlexBox
            flexAuto="left"
            style={{ width: '100%' }}
            left={
              <FlexBox
                flexAuto="left"
                style={{ width: '100%' }}
                left={
                  <Input
                    value={valueTemp}
                    type={type}
                    style={{
                      ...{
                        fontSize: '28rpx',
                      },
                      ...valueStyle,
                      ...(align == 'right' ? { textAlign: 'right' } : {}),
                      ...(align == 'center' ? { textAlign: 'center' } : {}),
                    }}
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
                      onClick={this.clearValue}
                    >
                      <VerticalBox>
                        {valueTemp ? (
                          <IconCloseCircle
                            size={toNumber(clearSize)}
                            color={clearColor}
                          />
                        ) : null}
                      </VerticalBox>
                    </View>
                  ) : null
                }
              />
            }
            right={extra ? extra : null}
            rightStyle={
              extra
                ? {
                    ...{
                      fontSize: '28rpx',
                    },
                    ...extraContainerStyle,
                  }
                : null
            }
          />
        }
        extraContainerStyle={{
          ...{
            width: '75%',
            paddingRight: '24rpx',
          },
          ...inputStyle,
        }}
      >
        {labelComponent}
      </Item>
    );
  }
}

AdvanceInput.defaultProps = {
  ...defaultProps,
};

export default AdvanceInput;
