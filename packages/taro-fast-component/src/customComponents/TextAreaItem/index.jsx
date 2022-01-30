import { View, Textarea } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  styleToString,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  isString,
  isObject,
  isFunction,
} from 'taro-fast-common/es/utils/typeCheck';
import { toString } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Button from '../Button';
import Item from '../Item';
import Ellipsis from '../Ellipsis';
import Popup from '../Popup';

const defaultProps = {
  key: null,
  style: {},
  title: null,
  label: '',
  description: null,
  prefix: null,
  border: true,
  hidden: false,
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

class TextAreaItem extends ComponentBase {
  text = '';

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        popupVisible: false,
      },
    };
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

  triggerInput = (e) => {
    const {
      detail: { value },
    } = e;

    this.text = value;
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
      value,
      emptyValue,
      emptyValueStyle,
      hidden,
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
    const { popupVisible } = this.state;

    if (hidden) {
      return null;
    }

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
          stringIsNullOrWhiteSpace(value) ? (
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
              {value}
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
          // space={false}
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
                ? styleToString(placeholderStyle)
                : ''
            }
            value={isString(value) ? value : toString(value)}
            maxlength={contentMaxlength}
            placeholder={placeholder}
            disabled={disabled}
            showConfirmBar
            fixed
            onInput={this.triggerInput}
            onConfirm={this.triggerConfirm}
          />
        </Popup>
      </Item>
    );
  }
}

TextAreaItem.defaultProps = {
  ...defaultProps,
};

export default TextAreaItem;
