import { View } from '@tarojs/components';

import {
  filter,
  isArray,
  isEmptyArray,
  isFunction,
  toString,
} from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { IconCloseCircle } from '../Icon';
import { Popup } from '../Popup';
import { Radio } from '../Radio';

function AdjustValue(value, options) {
  if (!isArray(options) || isEmptyArray(options)) {
    return {
      value: '',
      option: null,
    };
  }

  const selectList = filter(options, (one) => {
    const { value: v } = one;

    return toString(v) === toString(value);
  });

  return selectList.length > 0
    ? {
        value: selectList[0].value,
        option: selectList[0],
      }
    : {
        value: '',
        option: null,
      };
}

const defaultProps = {
  style: {},
  defaultValue: '',
  valueFormat: null,
  placeholder: '请选择',
  border: true,
  hidden: false,
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
  viewBuilder: null,
};

class RadioPopup extends BaseComponent {
  currentValue = [];

  currentOption = [];

  constructor(properties) {
    super(properties);

    const { defaultValue, options } = properties;

    const { value: valueAdjust, option } = AdjustValue(defaultValue, options);

    this.state = {
      ...this.state,
      popupVisible: false,
    };

    this.currentValue = valueAdjust;

    this.currentOption = option;
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

    this.currentValue = value;

    this.currentOption = option;

    this.forceUpdateAdditional();

    if (isFunction(afterChange)) {
      afterChange(value, option);
    }
  };

  renderFurther() {
    const {
      style,
      valueFormat,
      placeholder,
      options,
      position,
      closeIcon,
      hidden,
      arc,
      showClose,
      radioStyle,
      radioLayout,
      radioBodyStyle,
      radioBorder,
      radioIconUncheck,
      radioIconCheck,
      viewBuilder,
      defaultValue,
    } = this.props;
    const { popupVisible } = this.state;

    if (hidden) {
      return null;
    }

    if (!isFunction(viewBuilder)) {
      return null;
    }

    const inner = viewBuilder(
      isFunction(valueFormat)
        ? valueFormat(this.currentValue, this.currentOption)
        : this.currentValue,
      this.currentOption,
    );

    return (
      <>
        <View style={style} onClick={this.showPopup}>
          {inner || '视图构建器未返回构建结果'}
        </View>

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
            defaultValue={defaultValue}
            style={{
              ...radioStyle,
              borderTop: '0',
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

RadioPopup.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { RadioPopup };
