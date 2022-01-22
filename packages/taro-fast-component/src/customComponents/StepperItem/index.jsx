import { ComponentBase } from 'taro-fast-common/es/customComponents';

import { transformSize } from 'taro-fast-common/es/utils/tools';

import Item from '../Item';
import Stepper from '../Stepper';

const defaultProps = {
  key: null,
  style: {},
  title: null,
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
  hidden: false,
  editable: true,
  onChange: null,
};

class StepperItem extends ComponentBase {
  renderFurther() {
    const {
      key,
      prefix,
      title,
      description,
      style,
      border,
      extraContainerStyle,
      defaultValue,
      step,
      min,
      digits,
      max,
      disabled,
      hidden,
      editable,
      onChange,
      children,
    } = this.props;

    if (hidden) {
      return null;
    }

    return (
      <Item
        key={key}
        prefix={prefix}
        title={title}
        style={style}
        description={description}
        clickable={false}
        arrow={false}
        border={border}
        disabled={disabled}
        extra={
          <Stepper
            defaultValue={defaultValue}
            step={step}
            min={min}
            digits={digits}
            max={max}
            disabled={disabled}
            editable={editable}
            onChange={onChange}
          />
        }
        extraContainerStyle={{
          ...{
            paddingRight: transformSize(24),
          },
          ...extraContainerStyle,
        }}
      >
        {children}
      </Item>
    );
  }
}

StepperItem.defaultProps = {
  ...defaultProps,
};

export default StepperItem;
