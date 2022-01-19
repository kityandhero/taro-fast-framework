import { View } from '@tarojs/components';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Popup from '../Popup';
import Radio from '../Radio';
import Item from '../Item';

const defaultProps = {
  title: '',
  prefix: null,
  style: {},
  description: '',
  value: '',
  placeholder: '请选择',
  valueStyle: {},
  placeholderStyle: {},
  disabled: false,
  border: true,
  hidden: false,
  options: [],
  radioStyle: {},
  radioLayout: 'list',
  radioBodyStyle: {},
  radioBorder: true,
  radioIconUncheck: null,
  radioIconCheck: null,
};

class RadioSelector extends ComponentBase {
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
        valueStage: valueNext ?? '',
      };
    }

    return {};
  }

  handleClick = (option) => {
    if (option.disabled) {
      return;
    }

    this.setState({
      valueStage: option.value,
    });

    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(option.value);
    }
  };

  showPopup = () => {
    this.setState({
      popupVisible: true,
    });
  };

  hidePopup = () => {
    this.setState({
      popupVisible: false,
    });
  };

  renderFurther() {
    const {
      title,
      prefix,
      style,
      description,
      value,
      placeholder,
      valueStyle,
      placeholderStyle,
      disabled,
      border,
      hidden,
      options,
      radioStyle,
      radioLayout,
      radioBodyStyle,
      radioBorder,
      radioIconUncheck,
      radioIconCheck,
      children,
    } = this.props;
    const { popupVisible } = this.state;

    if (hidden) {
      return null;
    }

    return (
      <>
        <Item
          prefix={prefix}
          title={title}
          style={style}
          description={description}
          clickable
          arrow={false}
          disabled={disabled}
          border={border}
          extra={
            !stringIsNullOrWhiteSpace(value) ? (
              <View
                style={{
                  ...{
                    fontSize: '28rpx',
                    color: '#999 ',
                  },
                  ...placeholderStyle,
                }}
              >
                {placeholder}
              </View>
            ) : (
              <View
                style={{
                  ...{
                    fontSize: '28rpx',
                  },
                  ...valueStyle,
                }}
              >
                {value}
              </View>
            )
          }
          onClick={this.showPopup}
        >
          {children}
        </Item>

        <Popup
          visible={popupVisible}
          header={placeholder}
          position="bottom"
          space={false}
          border={false}
          bodyBorder={false}
          footerBorder={false}
          closeWhenOverlayClick
          showClose
          onClose={this.hidePopup}
        >
          <Radio
            style={{
              ...radioStyle,
              ...{
                borderTop: '0',
              },
            }}
            layout={radioLayout}
            bodyStyle={radioBodyStyle}
            border={radioBorder}
            iconUncheck={radioIconUncheck}
            iconCheck={radioIconCheck}
            options={options}
          />
        </Popup>
      </>
    );
  }
}

RadioSelector.defaultProps = {
  ...defaultProps,
};

export default RadioSelector;
