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
  afterChange: null,
  arc: false,
  border: true,
  closeIcon: <IconCloseCircle size={36} color="#ccc" />,
  defaultValue: '',
  disabled: false,
  disabledStyle: null,
  hidden: false,
  options: [],
  placeholder: '请选择',
  position: 'bottom',
  radioBodyStyle: {},
  radioBorder: true,
  radioIconCheck: null,
  radioIconUncheck: null,
  radioLayout: 'list',
  radioStyle: {},
  readOnly: false,
  readOnlyStyle: null,
  showClose: true,
  style: {},
  valueFormat: null,
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
    const { disabled, readOnly } = this.props;

    if (readOnly || disabled) {
      return;
    }

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
      arc,
      closeIcon,
      defaultValue,
      disabled,
      disabledStyle,
      hidden,
      options,
      placeholder,
      position,
      radioBodyStyle,
      radioBorder,
      radioIconCheck,
      radioIconUncheck,
      radioLayout,
      radioStyle,
      readOnly,
      readOnlyStyle,
      showClose,
      style,
      valueFormat,
      viewBuilder,
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
        <View
          style={{
            ...style,
            ...(readOnly ? readOnlyStyle : {}),
            ...(disabled ? disabledStyle : {}),
          }}
          onClick={this.showPopup}
        >
          {inner || '视图构建器未返回构建结果'}
        </View>

        {readOnly || disabled ? null : (
          <Popup
            arcTop={arc}
            bodyBorder={false}
            border={false}
            closeIcon={closeIcon}
            closeWhenOverlayClick
            footerBorder={false}
            header={placeholder}
            onClose={this.hidePopup}
            position={position}
            showClose={showClose}
            space={false}
            visible={popupVisible}
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
        )}
      </>
    );
  }
}

RadioPopup.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { RadioPopup };
