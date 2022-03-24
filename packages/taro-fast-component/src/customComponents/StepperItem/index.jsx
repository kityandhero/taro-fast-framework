import BaseComponent from '../BaseComponent';

import Item from '../Item';
import Stepper from '../Stepper';

const defaultProps = {
  key: null,
  style: {},
  stepperStyle: {},
  title: null,
  label: '',
  description: null,
  prefix: null,
  border: true,
  extraContainerStyle: {},
  defaultValue: 0,
  step: 1,
  min: 0,
  digits: 0,
  max: 100000,
  disabled: false,
  editable: true,
  useBackground: true,
  backgroundColor: '',
  circle: false,
  operateColor: '',
  iconSize: 36,
  onChange: null,
};

class StepperItem extends BaseComponent {
  renderFurther() {
    const {
      key,
      prefix,
      title,
      label,
      description,
      style,
      stepperStyle,
      border,
      extraContainerStyle,
      defaultValue,
      step,
      min,
      digits,
      max,
      disabled,
      editable,
      useBackground,
      backgroundColor,
      operateColor,
      circle,
      iconSize,
      onChange,
    } = this.props;

    return (
      <Item
        key={key}
        prefix={prefix}
        title={title}
        label={label}
        style={style}
        description={description}
        clickable={false}
        arrow={false}
        border={border}
        disabled={disabled}
        extra={
          <Stepper
            style={stepperStyle}
            defaultValue={defaultValue}
            step={step}
            min={min}
            digits={digits}
            max={max}
            disabled={disabled}
            editable={editable}
            useBackground={useBackground}
            backgroundColor={backgroundColor}
            circle={circle}
            operateColor={operateColor}
            iconSize={iconSize}
            onChange={onChange}
          />
        }
        extraContainerStyle={{
          ...{},
          ...extraContainerStyle,
        }}
      />
    );
  }
}

StepperItem.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default StepperItem;
