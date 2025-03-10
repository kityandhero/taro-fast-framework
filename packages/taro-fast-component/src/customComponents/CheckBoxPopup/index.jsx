import { View } from '@tarojs/components';

import { isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { CheckBox } from '../CheckBox';
import { IconCloseCircle } from '../Icon';
import { Popup } from '../Popup';

const defaultProps = {
  style: {},
  value: [],
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
  constructor(properties) {
    super(properties);

    const { value } = properties;

    this.state = {
      ...this.state,
      valueFlag: value,
      valueStage: value,
      popupVisible: false,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { value: valueNext } = nextProperties;
    const { valueFlag: valuePrevious } = previousState;

    if (valueNext !== valuePrevious) {
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
    } = this.props;
    const { popupVisible, valueStage } = this.state;

    if (hidden) {
      return null;
    }

    if (!isFunction(viewBuilder)) {
      return null;
    }

    const inner = viewBuilder(
      isFunction(valueFormat) ? valueFormat(valueStage) : valueStage,
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
            value={valueStage}
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
