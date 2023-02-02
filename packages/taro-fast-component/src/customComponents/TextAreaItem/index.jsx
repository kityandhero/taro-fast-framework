import { Textarea, View } from '@tarojs/components';

import {
  buildStringStyle,
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isObject,
  isString,
  showInfoMessage,
  toString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import BaseComponent from '../BaseComponent';
import Button from '../Button';
import Ellipsis from '../Ellipsis';
import Item from '../Item';
import Popup from '../Popup';

const defaultProps = {
  key: null,
  style: {},
  title: null,
  label: '',
  description: null,
  prefix: null,
  border: true,
  disabled: false,
  editable: true,
  position: 'bottom',
  arc: false,
  header: '请输入内容',
  placeholder: '请输入内容',
  placeholderStyle: {},
  contentLine: 3,
  contentMaxlength: 500,
  contentStyle: {},
  editButtonStyle: {},
  textareaStyle: {},
  confirmStyle: {},
  onChange: null,
  value: '',
  emptyValue: '当前无内容',
  emptyValueStyle: {},
};

class TextAreaItem extends BaseComponent {
  text = '';

  textLength = 0;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        popupVisible: false,
        valueFlag: '',
        valueStage: '',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev } = prevState;

    if (valueNext !== valuePrev) {
      return {
        valueFlag: valueNext,
        valueStage: valueNext,
      };
    }

    return {};
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { popupVisible: popupVisiblePre } = preState;
    const { popupVisible } = this.state;
    const { value } = this.props;

    if (popupVisiblePre !== popupVisible && popupVisible) {
      this.text = value;
    }
  };

  triggerFocus = () => {
    const { contentMaxlength } = this.props;

    if (this.text.length >= contentMaxlength) {
      showInfoMessage({
        text: '已达最大输入长度',
      });
    }
  };

  triggerInput = (e) => {
    const { contentMaxlength } = this.props;

    const {
      detail: { value },
    } = e;

    this.text = value;

    if (this.text.length >= contentMaxlength) {
      showInfoMessage({
        text: '已达最大输入长度',
      });
    }
  };

  triggerConfirm = (e) => {
    const {
      detail: { value },
    } = e;

    this.text = value;

    this.triggerClose();
  };

  triggerFinish = () => {
    this.triggerClose();
  };

  triggerClose = () => {
    this.setState({
      popupVisible: false,
      valueStage: this.text,
    });

    const { onChange } = this.props;

    if (isFunction(onChange)) {
      onChange(this.text);
    }
  };

  openPopup = () => {
    this.setState({
      popupVisible: true,
    });
  };

  renderFurther() {
    const {
      key,
      prefix,
      title,
      label,
      description,
      style,
      border,
      disabled,
      emptyValue,
      emptyValueStyle,
      editable,
      position,
      arc,
      header,
      placeholder,
      placeholderStyle,
      contentLine,
      contentMaxlength,
      contentStyle,
      editButtonStyle,
      onContentClick,
      textareaStyle,
      confirmStyle,
    } = this.props;
    const { popupVisible, valueStage } = this.state;

    return (
      <Item
        key={key}
        prefix={prefix}
        title={title}
        label={label}
        style={style}
        description={description}
        clickable={false}
        arrow={false}
        border={border}
        disabled={disabled}
        extra={
          editable ? (
            <Button
              style={{
                ...{
                  fontSize: transformSize(28),
                },
                ...editButtonStyle,
              }}
              fill="none"
              size="mini"
              onClick={this.openPopup}
            >
              编辑
            </Button>
          ) : null
        }
        showBody
        body={
          checkStringIsNullOrWhiteSpace(valueStage) ? (
            <View
              style={{
                ...{
                  fontSize: transformSize(28),
                  color: '#666',
                },
                ...emptyValueStyle,
              }}
            >
              {isString(emptyValue) ? emptyValue : toString(emptyValue)}
            </View>
          ) : (
            <Ellipsis
              line={contentLine}
              style={{
                ...{
                  fontSize: transformSize(28),
                  color: '#666',
                },
                ...contentStyle,
              }}
              onClick={onContentClick}
            >
              {valueStage}
            </Ellipsis>
          )
        }
      >
        <Popup
          visible={popupVisible}
          header={header}
          extra={
            <Button
              style={{
                ...{
                  fontSize: transformSize(28),
                },
                ...confirmStyle,
              }}
              fill="none"
              size="mini"
              onClick={this.triggerFinish}
            >
              确定
            </Button>
          }
          position={position}
          border
          bodyBorder
          footerBorder={false}
          closeWhenOverlayClick
          arcTop={arc}
          showClose={false}
          closeIconStyle={{
            visibility: 'hidden',
          }}
        >
          <Textarea
            style={{
              ...{ fontSize: transformSize(28) },
              ...textareaStyle,
              ...{
                width: '100%',
                height: transformSize(300),
              },
            }}
            placeholderStyle={
              isString(placeholderStyle)
                ? placeholderStyle
                : isObject(placeholderStyle)
                ? buildStringStyle(placeholderStyle)
                : ''
            }
            value={isString(valueStage) ? valueStage : toString(valueStage)}
            maxlength={contentMaxlength}
            placeholder={placeholder}
            disabled={disabled}
            showConfirmBar
            fixed
            onFocus={this.triggerFocus}
            onInput={this.triggerInput}
            onConfirm={this.triggerConfirm}
          />
        </Popup>
      </Item>
    );
  }
}

TextAreaItem.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default TextAreaItem;
