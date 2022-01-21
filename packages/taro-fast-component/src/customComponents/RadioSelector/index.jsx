import { View } from '@tarojs/components';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Popup from '../Popup';
import Radio from '../Radio';
import Item from '../Item';
import Icon from '../Icon';

const { IconCloseCircle } = Icon;

const defaultProps = {
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
  hidden: false,
  options: [],
  position: 'bottom',
  closeIcon: <IconCloseCircle size={18} color="#ccc" />,
  arc: false,
  showClose: true,
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
      },
    };
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

  renderFurther() {
    const {
      title,
      prefix,
      style,
      description,
      extraContainerStyle,
      value,
      valueFormat,
      placeholder,
      valueStyle,
      placeholderStyle,
      disabled,
      border,
      hidden,
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
      onChange,
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
            stringIsNullOrWhiteSpace(value) ? (
              <View
                style={{
                  ...{
                    fontSize: 'var(--tfc-px-30)',
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
                    fontSize: 'var(--tfc-px-30)',
                  },
                  ...valueStyle,
                }}
              >
                {isFunction(valueFormat) ? valueFormat(value) : value}
              </View>
            )
          }
          extraContainerStyle={{
            ...{
              paddingRight: 'var(--tfc-px-24)',
            },
            ...extraContainerStyle,
          }}
          onClick={this.showPopup}
        >
          {children}
        </Item>

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
            value={value}
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
            onChange={onChange}
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
