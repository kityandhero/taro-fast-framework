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
  style: {},
  defaultValue: [],
  valueFormat: null,
  placeholder: '请选择',
  border: true,
  hidden: false,
  options: [],
  position: 'bottom',
  closeIcon: <IconCloseCircle size={36} color="#ccc" />,
  arc: false,
  showClose: true,
  checkBoxStyle: {},
  checkBoxLayout: 'list',
  checkBoxBodyStyle: {},
  checkBoxBorder: true,
  checkBoxIconUncheck: null,
  checkBoxIconCheck: null,
  afterChange: null,
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
      checkBoxStyle,
      checkBoxLayout,
      checkBoxBodyStyle,
      checkBoxBorder,
      checkBoxIconUncheck,
      checkBoxIconCheck,
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
      </>
    );
  }
}

CheckBoxPopup.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { CheckBoxPopup };
