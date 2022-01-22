import { View } from '@tarojs/components';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Popup from '../Popup';
import CheckBox from '../CheckBox';
import Item from '../Item';
import Icon from '../Icon';

const { IconCloseCircle } = Icon;

const defaultProps = {
  title: '',
  prefix: null,
  style: {},
  description: '',
  extraContainerStyle: {},
  value: [],
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
  checkBoxStyle: {},
  checkBoxLayout: 'list',
  checkBoxBodyStyle: {},
  checkBoxBorder: true,
  checkBoxIconUncheck: null,
  checkBoxIconCheck: null,
};

class CheckBoxSelector extends ComponentBase {
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
      checkBoxStyle,
      checkBoxLayout,
      checkBoxBodyStyle,
      checkBoxBorder,
      checkBoxIconUncheck,
      checkBoxIconCheck,
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
                    fontSize: 'var(--tfc-30)',
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
                    fontSize: 'var(--tfc-30)',
                  },
                  ...valueStyle,
                }}
              >
                {isFunction(valueFormat)
                  ? valueFormat(value)
                  : isArray(value)
                  ? value.join()
                  : value}
              </View>
            )
          }
          extraContainerStyle={{
            ...{
              paddingRight: 'var(--tfc-24)',
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
          <CheckBox
            value={value}
            style={{
              ...checkBoxStyle,
              ...{
                borderTop: '0',
              },
            }}
            layout={checkBoxLayout}
            bodyStyle={checkBoxBodyStyle}
            border={checkBoxBorder}
            iconUncheck={checkBoxIconUncheck}
            iconCheck={checkBoxIconCheck}
            options={options}
            onChange={onChange}
          />
        </Popup>
      </>
    );
  }
}

CheckBoxSelector.defaultProps = {
  ...defaultProps,
};

export default CheckBoxSelector;
