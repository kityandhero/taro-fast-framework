import { View, Text, Input } from '@tarojs/components';

import {
  inCollection,
  styleToString,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  isFunction,
  isString,
  isObject,
} from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

import BaseComponent from '../BaseComponent';

import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';
import Item from '../Item';
import Icon from '../Icon';
import Row from '../Flex/Row';
import Col from '../Flex/Col';
import ColorText from '../ColorText';

const { IconCloseCircle } = Icon;

const layoutCollection = ['horizontal', 'vertical'];
const typeCollection = ['number', 'text', 'idcard', 'digit'];
const confirmTypeCollection = ['send', 'search', 'next', 'go', 'done'];

const defaultProps = {
  style: {},
  description: null,
  descriptionStyle: {},
  contentStyle: {},
  icon: null,
  border: true,
  align: 'left',
  required: false,
  hidden: false,
  clearable: false,
  clearSize: 36,
  clearColor: '#ccc',
  label: '',
  labelAlign: 'left',
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
  borderColor: 'var(--tfc-border-color)',
  borderTopDistance: 0,
  disabled: false,
  readonly: false,
  maxlength: 140,
  cursorSpacing: 0,
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

class InputItem extends BaseComponent {
  currentValue = '';

  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      valueFlag: value,
      clearVisible: false,
    };

    this.currentValue = value;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev } = prevState;

    if (valueNext !== valuePrev) {
      return {
        valueFlag: valueNext,
      };
    }

    return {};
  }

  // eslint-disable-next-line no-unused-vars
  doWorkBeforeUpdate = (nextProps, nextState) => {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev } = this.state;

    if (valueNext !== valuePrev) {
      this.currentValue = valueNext;
    }
  };

  getLayout = () => {
    const { layout } = this.props;

    return inCollection(layoutCollection, layout) ? layout : 'horizontal';
  };

  checkClearDisplay = () => {
    const { clearable } = this.props;

    if (!clearable) {
      return false;
    }

    const { clearVisible } = this.state;

    return !!clearVisible;
  };

  triggerChange = (v) => {
    const { afterChange } = this.props;

    if (isFunction(afterChange)) {
      afterChange(v);
    }
  };

  onInput = (e) => {
    const {
      detail: { value: v },
    } = e;

    this.currentValue = v;

    const { clearable } = this.props;

    if (clearable) {
      const { clearVisible } = this.state;

      if (clearVisible && stringIsNullOrWhiteSpace(this.currentValue)) {
        this.setState({
          clearVisible: false,
        });
      }

      if (!clearVisible && !stringIsNullOrWhiteSpace(this.currentValue)) {
        this.setState({
          clearVisible: true,
        });
      }
    }

    this.triggerChange(v);
  };

  triggerFocus = (e) => {
    const { onFocus } = this.props;

    if (isFunction(onFocus)) {
      onFocus(e);
    }
  };

  triggerBlur = (e) => {
    const { onBlur } = this.props;

    if (isFunction(onBlur)) {
      onBlur(e);
    }
  };

  triggerConfirm = (e) => {
    const { onConfirm } = this.props;

    if (isFunction(onConfirm)) {
      onConfirm(e);
    }
  };

  triggerKeyboardHeightChange = (e) => {
    const { onKeyboardHeightChange } = this.props;

    if (isFunction(onKeyboardHeightChange)) {
      onKeyboardHeightChange(e);
    }
  };

  clearValue = () => {
    this.currentValue = '';

    this.increaseCounter();

    this.triggerChange('');
  };

  renderFurther() {
    const {
      style,
      icon,
      description,
      descriptionStyle,
      contentStyle,
      border,
      align,
      required,
      clearSize,
      clearColor,
      label,
      labelAlign,
      extra,
      labelStyle,
      inputStyle,
      valueStyle,
      borderColor,
      borderTopDistance,
      inputContainerStyle,
      extraContainerStyle,
      type: typeSource,
      password,
      placeholder,
      placeholderStyle,
      placeholderClass,
      disabled,
      readonly,
      maxlength,
      cursorSpacing,
      confirmType: confirmTypeSource,
      confirmHold,
      cursor,
      selectionStart,
      selectionEnd,
      adjustPosition,
      holdKeyboard,
    } = this.props;

    const layout = this.getLayout();
    const type = inCollection(typeCollection, typeSource) ? typeSource : 'text';
    const confirmType = inCollection(confirmTypeCollection, confirmTypeSource)
      ? confirmTypeSource
      : 'done';

    const showBody = !!description;

    const clearDisplay = this.checkClearDisplay();

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
                    height: transformSize(40),
                    lineHeight: transformSize(40),
                    color: 'red',
                  }}
                >
                  *
                </Text>
              </VerticalBox>
            ) : null
          }
          right={
            <VerticalBox
              alignJustify={labelAlign === 'right' ? 'end' : 'start'}
            >
              <View
                style={{
                  ...{
                    fontSize: transformSize(28),
                    marginRight: transformSize(20),
                  },
                  ...labelStyle,
                }}
              >
                {isObject(label) ? (
                  label
                ) : (
                  <VerticalBox>
                    <ColorText
                      icon={icon}
                      text={label}
                      textStyle={labelStyle}
                    />
                  </VerticalBox>
                )}
              </View>
            </VerticalBox>
          }
          rightStyle={{
            ...{
              paddingRight: transformSize(40),
            },
            ...{
              // height: '100%',
            },
          }}
        />
      ) : null;

    const inputPart = (
      <FlexBox
        flexAuto="left"
        style={{ width: '100%' }}
        left={
          <FlexBox
            flexAuto="left"
            style={{ width: '100%' }}
            left={
              !disabled && readonly ? (
                <View
                  style={{
                    ...{
                      fontSize: transformSize(28),
                      borderColor: borderColor,
                      margin:
                        layout === 'horizontal'
                          ? `${transformSize(0)} 0 ${transformSize(
                              showBody ? 11 : 0,
                            )} 0`
                          : `${transformSize(11)} 0 ${transformSize(
                              showBody ? 11 : 22,
                            )} 0`,
                    },
                    ...valueStyle,
                    ...(align == 'right' ? { textAlign: 'right' } : {}),
                    ...(align == 'center' ? { textAlign: 'center' } : {}),
                    ...{ width: '100%' },
                  }}
                >
                  {stringIsNullOrWhiteSpace(this.currentValue) ? (
                    <View style={placeholderStyle}>{placeholder}</View>
                  ) : (
                    this.currentValue
                  )}
                </View>
              ) : (
                <Input
                  value={this.currentValue}
                  type={type}
                  style={{
                    ...{
                      fontSize: transformSize(28),
                      borderColor: borderColor,
                      margin:
                        layout === 'horizontal'
                          ? `${transformSize(0)} 0 ${transformSize(
                              showBody ? 11 : 0,
                            )} 0`
                          : `${transformSize(11)} 0 ${transformSize(
                              showBody ? 11 : 22,
                            )} 0`,
                    },
                    ...valueStyle,
                    ...(align == 'right' ? { textAlign: 'right' } : {}),
                    ...(align == 'center' ? { textAlign: 'center' } : {}),
                    ...{ width: '100%' },
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
              )
            }
            leftStyle={inputContainerStyle}
            right={
              clearDisplay ? (
                <View
                  style={{
                    paddingLeft: transformSize(10),
                    height: '100%',
                  }}
                  onClick={this.clearValue}
                >
                  <VerticalBox>
                    <IconCloseCircle
                      size={toNumber(clearSize)}
                      color={clearColor}
                    />
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
    );

    if (layout === 'horizontal') {
      return (
        <Item
          style={style}
          label={labelComponent}
          contentStyle={{
            ...{ width: transformSize(180) },
            ...contentStyle,
            ...{
              padding: '0',
            },
            ...{
              flex: 'none',
              paddingBottom: transformSize(showBody ? 12 : 0),
            },
          }}
          border={border}
          extra={inputPart}
          extraContainerStyle={{
            ...{
              padding: `0 ${transformSize(showBody ? 12 : 24)} 0 0`,
            },
            ...inputStyle,
            ...{
              flex: 'auto',
              paddingRight: '0',
            },
          }}
          showBody={showBody}
          body={description}
          borderColor={borderColor}
          borderTopDistance={borderTopDistance}
          bodyContentStyle={{
            ...descriptionStyle,
            ...(showBody
              ? {
                  paddingTop: transformSize(11),
                }
              : {}),
          }}
        />
      );
    }

    return (
      <View style={{ ...{ width: '100%' }, ...style }}>
        {labelComponent != null ? (
          <Row>
            <Col size={12}>
              <View
                style={{
                  padding: `${transformSize(22)} ${transformSize(
                    24,
                  )} ${transformSize(12)} ${transformSize(24)}`,
                }}
              >
                {labelComponent}
              </View>
            </Col>
          </Row>
        ) : null}

        <Row>
          <Col size={12}>
            <Item
              label={null}
              contentStyle={{
                ...{ width: transformSize(180) },
                ...contentStyle,
                ...{
                  flex: 'none',
                  padding: `${transformSize(
                    labelComponent != null ? 12 : 24,
                  )} 0 ${transformSize(showBody ? 12 : 24)} 0`,
                },
              }}
              border={border}
              borderColor={borderColor}
              borderTopDistance={borderTopDistance}
              extra={inputPart}
              extraContainerStyle={{
                ...{
                  padding: `0 ${transformSize(
                    showBody ? 12 : 24,
                  )} 0 ${transformSize(24)}`,
                },
                ...inputStyle,
                ...{
                  flex: 'auto',
                  paddingRight: '0',
                },
              }}
              showBody={showBody}
              body={description}
              bodyContentStyle={{
                ...descriptionStyle,
                ...(showBody
                  ? {
                      paddingTop: transformSize(11),
                    }
                  : {}),
              }}
            />
          </Col>
        </Row>
      </View>
    );
  }
}

InputItem.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default InputItem;
