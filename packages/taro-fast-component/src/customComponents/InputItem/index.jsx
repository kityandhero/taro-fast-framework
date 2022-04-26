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
  disabled: false,
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
      counter: 0,
    };

    this.currentValue = value;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev, counter } = prevState;

    if (valueNext !== valuePrev) {
      return {
        valueFlag: valueNext,
        counter: counter + 1,
      };
    }

    return {};
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { valueFlag: valueFlagPre } = preState;
    const { valueFlag } = this.state;

    if (valueFlagPre !== valueFlag) {
      this.currentValue = valueFlag;
    }
  };

  getLayout = () => {
    const { layout } = this.props;

    return inCollection(layoutCollection, layout) ? layout : 'horizontal';
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
    const { counter } = this.state;

    this.currentValue = '';

    this.setState({ counter: counter + 1 });

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
      clearable,
      clearSize,
      clearColor,
      label,
      extra,
      labelStyle,
      inputStyle,
      valueStyle,
      borderColor,
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
            <VerticalBox>
              <View
                style={{
                  ...{
                    fontSize: transformSize(28),
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
              height: '100%',
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
              <Input
                value={this.currentValue}
                type={type}
                style={{
                  ...{
                    fontSize: transformSize(28),
                    padding:
                      layout === 'horizontal'
                        ? `${transformSize(22)} 0 ${transformSize(
                            showBody ? 11 : 22,
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
              flex: 'none',
              paddingBottom: transformSize(showBody ? 12 : 24),
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
