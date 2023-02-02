import { View } from '@tarojs/components';

import { checkStringIsNullOrWhiteSpace, isFunction } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import BaseComponent from '../BaseComponent';
import Icon from '../Icon';
import Item from '../Item';
import Popup from '../Popup';
import Radio from '../Radio';

const { IconCloseCircle } = Icon;

const defaultProps = {
  label: '',
  title: '',
  prefix: null,
  style: {},
  description: '',
  extraContainerStyle: {},
  value: '',
  valueFormat: null,
  placeholder: '请选择',
  valueStyle: {},
  placeholderStyle: {},
  disabled: false,
  border: true,
  options: [],
  position: 'bottom',
  closeIcon: <IconCloseCircle size={36} color="#ccc" />,
  arc: false,
  showClose: true,
  radioStyle: {},
  radioLayout: 'list',
  radioBodyStyle: {},
  radioBorder: true,
  radioIconUncheck: null,
  radioIconCheck: null,
  afterChange: null,
};

class RadioSelector extends BaseComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      valueFlag: value,
      valueStage: value,
      popupVisible: false,
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

  triggerChange = (value, option) => {
    const { afterChange } = this.props;

    this.setState({
      valueStage: value,
    });

    if (isFunction(afterChange)) {
      afterChange(value, option);
    }
  };

  renderFurther() {
    const {
      label,
      title,
      prefix,
      style,
      description,
      extraContainerStyle,
      valueFormat,
      placeholder,
      valueStyle,
      placeholderStyle,
      disabled,
      border,
      options,
      position,
      closeIcon,
      arc,
      showClose,
      radioStyle,
      radioLayout,
      radioBodyStyle,
      radioBorder,
      radioIconUncheck,
      radioIconCheck,
      children,
    } = this.props;
    const { popupVisible, valueStage } = this.state;

    return (
      <>
        <Item
          prefix={prefix}
          title={title}
          label={children || label}
          style={style}
          description={description}
          clickable
          arrow={false}
          disabled={disabled}
          border={border}
          extra={
            checkStringIsNullOrWhiteSpace(valueStage) ? (
              <View
                style={{
                  ...{
                    fontSize: transformSize(30),
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
                    fontSize: transformSize(30),
                  },
                  ...valueStyle,
                }}
              >
                {isFunction(valueFormat) ? valueFormat(valueStage) : valueStage}
              </View>
            )
          }
          extraContainerStyle={{
            ...{
              paddingRight: transformSize(24),
            },
            ...extraContainerStyle,
          }}
          onClick={this.showPopup}
        />

        <Popup
          visible={popupVisible}
          header={placeholder}
          position={position}
          space={false}
          border={false}
          bodyBorder={false}
          footerBorder={false}
          closeWhenOverlayClick
          closeIcon={closeIcon}
          arcTop={arc}
          showClose={showClose}
          onClose={this.hidePopup}
        >
          <Radio
            value={valueStage}
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
            afterChange={this.triggerChange}
          />
        </Popup>
      </>
    );
  }
}

RadioSelector.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default RadioSelector;
