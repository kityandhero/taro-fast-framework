import { View } from '@tarojs/components';

import {
  filter,
  isArray,
  isEmptyArray,
  isFunction,
  toString,
} from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { CheckBox } from '../CheckBox';
import { IconCloseCircle } from '../Icon';
import { Popup } from '../Popup';

function AdjustValue(value, options) {
  if (!isArray(options) || isEmptyArray(options)) {
    return {
      value: [],
      option: [],
    };
  }

  const selectList = filter(options, (one) => {
    const { value: v } = one;

    return toString(v) === toString(value);
  });

  return selectList.length > 0
    ? {
        value: selectList.map((o) => {
          const { value: v } = {
            value: '',
            ...o,
          };

          return v;
        }),
        option: selectList,
      }
    : {
        value: [],
        option: [],
      };
}

const defaultProps = {
  afterChange: null,
  arc: false,
  border: true,
  checkBoxBodyStyle: {},
  checkBoxBorder: true,
  checkBoxIconCheck: null,
  checkBoxIconUncheck: null,
  checkBoxLayout: 'list',
  checkBoxStyle: {},
  closeIcon: <IconCloseCircle size={36} color="#ccc" />,
  defaultValue: [],
  disabled: false,
  disabledStyle: null,
  hidden: false,
  options: [],
  placeholder: '请选择',
  position: 'bottom',
  readOnly: false,
  readOnlyStyle: null,
  showClose: true,
  style: {},
  valueFormat: null,
  viewBuilder: null,
};

class CheckBoxPopup extends BaseComponent {
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
      checkBoxBodyStyle,
      checkBoxBorder,
      checkBoxIconCheck,
      checkBoxIconUncheck,
      checkBoxLayout,
      checkBoxStyle,
      closeIcon,
      defaultValue,
      disabled,
      disabledStyle,
      hidden,
      options,
      placeholder,
      position,
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
            <CheckBox
              defaultValue={defaultValue}
              style={{
                ...checkBoxStyle,
                borderTop: '0',
              }}
              layout={checkBoxLayout}
              bodyStyle={checkBoxBodyStyle}
              border={checkBoxBorder}
              iconUncheck={checkBoxIconUncheck}
              iconCheck={checkBoxIconCheck}
              options={options}
              afterChange={this.triggerChange}
            />
          </Popup>
        )}
      </>
    );
  }
}

CheckBoxPopup.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { CheckBoxPopup };
