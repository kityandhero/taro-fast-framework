import React from 'react';
import { Input, Text, Textarea, View } from '@tarojs/components';

import {
  buildStringStyle,
  canToNumber,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isNumber,
  isObject,
  isString,
  throttle,
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
import { Line } from '../Line';
import { VerticalBox } from '../VerticalBox';

const layoutCollection = ['horizontal', 'vertical'];
const typeCollection = ['number', 'text', 'idcard', 'digit'];
const confirmTypeCollection = ['send', 'search', 'next', 'go', 'done'];
const fontSizeDefault = 28;

const defaultProps = {
  adjustPosition: true,
  afterChange: null,
  align: 'left',
  areaAutoHeight: false,
  areaHeight: 100,
  areaMode: false,
  border: true,
  borderColor: 'var(--tfc-border-color)',
  borderTopDistance: 0,
  clearColor: '#ccc',
  clearSize: 36,
  clearable: false,
  confirmHold: false,
  confirmType: 'done',
  contentStyle: {},
  cursor: 0,
  cursorSpacing: 0,
  description: null,
  descriptionStyle: {},
  disabled: false,
  extra: null,
  extraContainerStyle: {},
  fontSize: fontSizeDefault,
  hidden: false,
  holdKeyboard: false,
  icon: null,
  inputContainerStyle: {},
  inputStyle: {},
  label: '',
  labelAlign: 'left',
  labelContainerStyle: {},
  labelStyle: {},
  labelWidth: 0,
  maxlength: 140,
  onBlur: null,
  onConfirm: null,
  onFocus: null,
  onKeyboardHeightChange: null,
  password: false,
  placeholder: '请输入',
  placeholderClass: 'input-placeholder',
  placeholderStyle: { color: '#ccc' },
  readonly: false,
  required: false,
  selectionEnd: -1,
  selectionStart: -1,
  style: {},
  type: 'text',
  value: '',
  valueStyle: {},
};

class InputItem extends BaseComponent {
  currentValue = '';

  inputRef = React.createRef();

  constructor(properties) {
    super(properties);

    const { value } = properties;

    this.state = {
      valueFlag: value,
      focus: false,
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

    const that = this;

    that.currentValue = v;

    that.triggerChange(that.currentValue);
  };

  triggerFocus = (event) => {
    const { onFocus } = this.props;

    this.setState({
      focus: true,
    });

    if (isFunction(onFocus)) {
      onFocus(event);
    }
  };

  triggerBlur = (event) => {
    const { onBlur } = this.props;

    this.setState({
      focus: false,
    });

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
    this.inputRef.current.value = '';

    this.setState({
      focus: true,
    });

    this.triggerChange(this.currentValue);
  };

  renderFurther() {
    const {
      adjustPosition,
      align,
      areaAutoHeight,
      areaHeight,
      areaMode,
      border,
      borderColor,
      borderTopDistance,
      clearColor,
      clearSize,
      clearable,
      confirmHold,
      confirmType: confirmTypeSource,
      contentStyle,
      cursor,
      cursorSpacing,
      description,
      descriptionStyle,
      disabled,
      extra,
      extraContainerStyle,
      fontSize,
      holdKeyboard,
      icon,
      inputContainerStyle,
      inputStyle,
      label,
      labelAlign,
      labelStyle,
      labelWidth,
      maxlength,
      password,
      placeholder,
      placeholderClass,
      placeholderStyle,
      readonly,
      required,
      selectionEnd,
      selectionStart,
      style,
      type: typeSource,
      valueStyle,
    } = this.props;

    const { focus } = this.state;

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

    const showDescription = !!description;

    const fontSizeAdjust = canToNumber(fontSize)
      ? toNumber(fontSize)
      : fontSizeDefault;

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
                  fontSize: transformSize(fontSizeAdjust),
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
                    fontSize: transformSize(fontSizeAdjust),
                    borderColor: borderColor,
                    margin:
                      layout === 'horizontal'
                        ? `${transformSize(0)} 0 ${transformSize(
                            showDescription ? 11 : 0,
                          )} 0`
                        : `${transformSize(11)} 0 ${transformSize(
                            showDescription ? 11 : 22,
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
                <View
                  style={{
                    margin:
                      layout === 'horizontal'
                        ? `${transformSize(0)} 0 ${transformSize(
                            showDescription ? 11 : 0,
                          )} 0`
                        : `${transformSize(0)} 0 ${transformSize(
                            showDescription ? 11 : 0,
                          )} 0`,
                  }}
                >
                  <Textarea
                    ref={this.inputRef}
                    defaultValue={this.currentValue}
                    style={{
                      fontSize: transformSize(fontSizeAdjust),
                      borderColor: borderColor,
                      ...valueStyle,
                      width: '100%',
                      ...(align == 'right' ? { textAlign: 'right' } : {}),
                      ...(align == 'center' ? { textAlign: 'center' } : {}),
                      ...(areaAutoHeight
                        ? {}
                        : { height: transformSize(areaHeight) }),
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
                    onInput={throttle(this.onInput, 400)}
                    onFocus={this.triggerFocus}
                    onBlur={this.triggerBlur}
                    onConfirm={this.triggerConfirm}
                    onKeyboardHeightChange={this.triggerKeyboardHeightChange}
                  />
                </View>
              ) : (
                <Input
                  ref={this.inputRef}
                  defaultValue={this.currentValue}
                  type={type}
                  focus={focus}
                  style={{
                    fontSize: transformSize(fontSizeAdjust),
                    borderColor: borderColor,
                    margin:
                      layout === 'horizontal'
                        ? `${transformSize(0)} 0 ${transformSize(
                            showDescription ? 11 : 0,
                          )} 0`
                        : `${transformSize(11)} 0 ${transformSize(
                            showDescription ? 11 : 22,
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
                  onInput={throttle(this.onInput, 400)}
                  onFocus={this.triggerFocus}
                  onBlur={this.triggerBlur}
                  onConfirm={this.triggerConfirm}
                  onKeyboardHeightChange={this.triggerKeyboardHeightChange}
                />
              )
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
                fontSize: transformSize(fontSizeAdjust),
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
            ...(isNumber(labelWidth) && toNumber(labelWidth) > 0
              ? { width: transformSize(labelWidth) }
              : {}),
            padding: '0',
            flex: 'none',
            paddingBottom: transformSize(showDescription ? 12 : 0),
          }}
          border={border}
          extra={inputPart}
          extraContainerStyle={{
            padding: `0 ${transformSize(showDescription ? 12 : 24)} 0 0`,
            ...inputStyle,
            flex: 'auto',
            paddingRight: '0',
          }}
          showBody={showDescription}
          body={description}
          borderColor={borderColor}
          borderTopDistance={borderTopDistance}
          bodyContentStyle={{
            ...descriptionStyle,
            ...(showDescription
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
            {/* <View
              style={{
                padding: `0 ${transformSize(
                  showBody ? 12 : 24,
                )} 0 ${transformSize(24)}`,
                ...inputStyle,
              }}
            >
              {inputPart}
            </View> */}

            <Item
              label={null}
              contentStyle={{
                width: transformSize(180),
                ...contentStyle,
                flex: 'none',
                padding: `${transformSize(
                  labelComponent == null ? 24 : 12,
                )} 0 ${transformSize(showDescription ? 12 : 24)} 0`,
              }}
              border={false}
              borderTopDistance={0}
              // extra={inputPart}
              // extraContainerStyle={{
              //   padding: `0 ${transformSize(
              //     showBody ? 12 : 24,
              //   )} 0 ${transformSize(24)}`,
              //   ...inputStyle,
              //   flex: 'auto',
              //   paddingLeft: '0',
              //   paddingRight: '0',
              // }}
              showBody
              bodyContentStyle={{
                borderTop: 0,
                paddingTop: transformSize(4),
                paddingBottom: 0,
              }}
              body={
                <View>
                  {inputPart}

                  {border ? (
                    <>
                      <Line transparent height={borderTopDistance} />

                      <Line color={borderColor} height={2} />
                    </>
                  ) : null}

                  {showDescription ? (
                    <View
                      style={{
                        ...descriptionStyle,
                        ...(showDescription
                          ? {
                              paddingTop: transformSize(11),
                            }
                          : {}),
                      }}
                    >
                      {description}
                    </View>
                  ) : null}
                </View>
              }
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
