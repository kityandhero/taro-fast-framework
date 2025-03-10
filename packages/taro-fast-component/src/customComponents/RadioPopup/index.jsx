import { View } from '@tarojs/components';

import { isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { IconCloseCircle } from '../Icon';
import { Popup } from '../Popup';
import { Radio } from '../Radio';

const defaultProps = {
  style: {},
  value: '',
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
  constructor(properties) {
    super(properties);

    const { value } = properties;

    this.state = {
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
      radioStyle,
      radioLayout,
      radioBodyStyle,
      radioBorder,
      radioIconUncheck,
      radioIconCheck,
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
          <Radio
            value={valueStage}
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
