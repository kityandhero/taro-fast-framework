import { View, Text, Input } from '@tarojs/components';

import {
  inCollection,
  showErrorMessage,
  styleToString,
  stringIsNullOrWhiteSpace,
  transformSize,
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
  contentStyle: {},
  prefix: null,
  border: true,
  align: 'left',
  required: false,
  hidden: false,
  clearable: false,
  clearSize: 36,
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
  focus: false,
  confirmType: 'done',
  confirmHold: false,
  cursor: 0,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  afterChange: null,
  onFocus: null,
  onBlur: null,
  onConfirm: null,
  onKeyboardHeightChange: null,
};

class InputItem extends ComponentBase {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      valueFlag: value,
      existValue: !stringIsNullOrWhiteSpace(value),
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev } = prevState;

    if (valueNext !== valuePrev) {
      return {
        valueFlag: valueNext,
        existValue: !stringIsNullOrWhiteSpace(valueNext),
      };
    }

    return {};
  }

  triggerChange = (v) => {
    const { afterChange } = this.props;
    const { existValue } = this.state;

    if (existValue && stringIsNullOrWhiteSpace(v)) {
      this.setState({
        existValue: false,
      });
    }

    if (!existValue && !stringIsNullOrWhiteSpace(v)) {
      this.setState({
        existValue: true,
      });
    }

    if (isFunction(afterChange)) {
      afterChange(v);
    }
  };

  onInput = (e) => {
    const {
      detail: { value: v },
    } = e;

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
    this.triggerChange('');
  };

  renderFurther() {
    const {
      style,
      prefix,
      title,
      description,
      contentStyle,
      border,
      align,
      required,
      hidden,
      clearable,
      clearSize,
      clearColor,
      label,
      value,
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
    const { existValue } = this.state;

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
                    width: transformSize(24),
                    height: transformSize(45),
                    lineHeight: transformSize(45),
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
                    fontSize: transformSize(28),
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
              paddingRight: transformSize(40),
            },
            ...{
              height: '100%',
            },
          }}
        />
      ) : null;

    return (
      <Item
        style={style}
        prefix={prefix}
        title={title}
        label={labelComponent}
        description={description}
        contentStyle={{
          ...{ width: transformSize(180) },
          ...contentStyle,
          ...{
            flex: 'none',
          },
        }}
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
                    value={value}
                    type={type}
                    style={{
                      ...{
                        fontSize: transformSize(28),
                        padding: `${transformSize(22)} 0 ${transformSize(
                          22,
                        )} 0`,
                      },
                      ...valueStyle,
                      ...(align == 'right' ? { textAlign: 'right' } : {}),
                      ...(align == 'center' ? { textAlign: 'center' } : {}),
                    }}
                    password={!!password}
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
                        paddingLeft: transformSize(10),
                        height: '100%',
                      }}
                      onClick={this.clearValue}
                    >
                      <VerticalBox>
                        {existValue ? (
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
            right={extra ? <VerticalBox>{extra}</VerticalBox> : null}
            rightStyle={
              extra
                ? {
                    ...{
                      fontSize: transformSize(28),
                    },
                    ...extraContainerStyle,
                  }
                : null
            }
          />
        }
        extraContainerStyle={{
          ...{
            padding: `0 ${transformSize(24)} 0 0`,
          },
          ...inputStyle,
          ...{
            flex: 'auto',
          },
        }}
      />
    );
  }
}

InputItem.defaultProps = {
  ...defaultProps,
};

export default InputItem;
