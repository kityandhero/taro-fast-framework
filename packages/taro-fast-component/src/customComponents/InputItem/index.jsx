import { Input, Text, Textarea, View } from '@tarojs/components';

import {
  buildStringStyle,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isObject,
  isString,
  toNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { ColorText } from '../ColorText';
import { Col } from '../Flex/Col';
import { Row } from '../Flex/Row';
import { FlexBox } from '../FlexBox';
import { IconCloseCircle } from '../Icon';
import { Item } from '../Item';
import { VerticalBox } from '../VerticalBox';

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
  areaMode: false,
  areaAutoHeight: false,
  holdKeyboard: false,
  afterChange: null,
  onFocus: null,
  onBlur: null,
  onConfirm: null,
  onKeyboardHeightChange: null,
};

class InputItem extends BaseComponent {
  currentValue = '';

  constructor(properties) {
    super(properties);

    const { value } = properties;

    this.state = {
      valueFlag: value,
      clearVisible: false,
    };

    this.currentValue = value;
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { value: valueNext } = nextProperties;
    const { valueFlag: valuePrevious } = previousState;

    if (valueNext !== valuePrevious) {
      return {
        valueFlag: valueNext,
      };
    }

    return {};
  }

  // eslint-disable-next-line no-unused-vars
  doWorkBeforeUpdate = (nextProperties, nextState) => {
    const { value: valueNext } = nextProperties;
    const { valueFlag: valuePrevious } = this.state;

    if (valueNext !== valuePrevious) {
      this.currentValue = valueNext;
    }
  };

  getLayout = () => {
    const { layout } = this.props;

    return checkInCollection(layoutCollection, layout) ? layout : 'horizontal';
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

  onInput = (event) => {
    const {
      detail: { value: v },
    } = event;

    this.currentValue = v;

    const { clearable } = this.props;

    if (clearable) {
      const { clearVisible } = this.state;

      if (clearVisible && checkStringIsNullOrWhiteSpace(this.currentValue)) {
        this.setState({
          clearVisible: false,
        });
      }

      if (!clearVisible && !checkStringIsNullOrWhiteSpace(this.currentValue)) {
        this.setState({
          clearVisible: true,
        });
      }
    }

    this.triggerChange(v);
  };

  triggerFocus = (event) => {
    const { onFocus } = this.props;

    if (isFunction(onFocus)) {
      onFocus(event);
    }
  };

  triggerBlur = (event) => {
    const { onBlur } = this.props;

    if (isFunction(onBlur)) {
      onBlur(event);
    }
  };

  triggerConfirm = (event) => {
    const { onConfirm } = this.props;

    if (isFunction(onConfirm)) {
      onConfirm(event);
    }
  };

  triggerKeyboardHeightChange = (event) => {
    const { onKeyboardHeightChange } = this.props;

    if (isFunction(onKeyboardHeightChange)) {
      onKeyboardHeightChange(event);
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
      areaMode,
      areaAutoHeight,
    } = this.props;

    const layout = this.getLayout();
    const type = checkInCollection(typeCollection, typeSource)
      ? typeSource
      : 'text';
    const confirmType = checkInCollection(
      confirmTypeCollection,
      confirmTypeSource,
    )
      ? confirmTypeSource
      : 'done';

    const showBody = !!description;

    const clearDisplay = this.checkClearDisplay();

    const labelComponent =
      isObject(label) ||
      (isString(label) && !checkStringIsNullOrWhiteSpace(label)) ? (
        <FlexBox
          style={{
            height: '100%',
          }}
          flexAuto="right"
          left={
            required ? (
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
                  fontSize: transformSize(28),
                  marginRight: transformSize(20),
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
            paddingRight: transformSize(40),
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
                    ...valueStyle,
                    ...(align == 'right' ? { textAlign: 'right' } : {}),
                    ...(align == 'center' ? { textAlign: 'center' } : {}),
                    // ...{ width: '100%' },
                  }}
                >
                  {checkStringIsNullOrWhiteSpace(this.currentValue) ? (
                    <View style={placeholderStyle}>{placeholder}</View>
                  ) : (
                    this.currentValue
                  )}
                </View>
              ) : areaMode ? (
                <Textarea
                  value={this.currentValue}
                  style={{
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
                    ...valueStyle,
                    ...(align == 'right' ? { textAlign: 'right' } : {}),
                    ...(align == 'center' ? { textAlign: 'center' } : {}),
                    // ...{ width: '100%' },
                  }}
                  placeholder={placeholder}
                  placeholderStyle={
                    isString(placeholderStyle)
                      ? placeholderStyle
                      : isObject(placeholderStyle)
                        ? buildStringStyle(placeholderStyle)
                        : ''
                  }
                  autoHeight={areaAutoHeight}
                  placeholderClass={placeholderClass}
                  disabled={disabled}
                  maxlength={maxlength}
                  cursorSpacing={cursorSpacing}
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
              ) : (
                <Input
                  value={this.currentValue}
                  type={type}
                  style={{
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
                    ...valueStyle,
                    ...(align == 'right' ? { textAlign: 'right' } : {}),
                    ...(align == 'center' ? { textAlign: 'center' } : {}),
                    // ...{ width: '100%' },
                  }}
                  password={!!password}
                  placeholder={placeholder}
                  placeholderStyle={
                    isString(placeholderStyle)
                      ? placeholderStyle
                      : isObject(placeholderStyle)
                        ? buildStringStyle(placeholderStyle)
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
                fontSize: transformSize(28),
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
            width: transformSize(180),
            ...contentStyle,

            padding: '0',
            flex: 'none',
            paddingBottom: transformSize(showBody ? 12 : 0),
          }}
          border={border}
          extra={inputPart}
          extraContainerStyle={{
            padding: `0 ${transformSize(showBody ? 12 : 24)} 0 0`,
            ...inputStyle,

            flex: 'auto',
            paddingRight: '0',
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
      <View style={{ width: '100%', ...style }}>
        {labelComponent == null ? null : (
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
        )}

        <Row>
          <Col size={12}>
            <Item
              label={null}
              contentStyle={{
                width: transformSize(180),
                ...contentStyle,

                flex: 'none',
                padding: `${transformSize(
                  labelComponent == null ? 24 : 12,
                )} 0 ${transformSize(showBody ? 12 : 24)} 0`,
              }}
              border={border}
              borderColor={borderColor}
              borderTopDistance={borderTopDistance}
              extra={inputPart}
              extraContainerStyle={{
                padding: `0 ${transformSize(
                  showBody ? 12 : 24,
                )} 0 ${transformSize(24)}`,
                ...inputStyle,

                flex: 'auto',
                paddingRight: '0',
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

export { InputItem };
