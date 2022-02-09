import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Switch from '../Switch';
import Item from '../Item';

const defaultProps = {
  key: null,
  confirm: false,
  style: {},
  title: null,
  label: '',
  description: null,
  prefix: null,
  border: true,
  extraContainerStyle: {},
  hidden: false,
  disabled: false,
  checked: false,
  beforeChange: null,
  checkedText: '',
  uncheckedText: '',
  size: 2,
  color: '',
  onChange: null,
  afterChange: null,
};

class SwitchItem extends ComponentBase {
  renderFurther() {
    const {
      key,
      confirm,
      prefix,
      title,
      label,
      description,
      style,
      border,
      extraContainerStyle,
      hidden,
      checked,
      disabled,
      checkedText,
      uncheckedText,
      size,
      color,
      onChange,
      afterChange,
    } = this.props;

    if (hidden) {
      return null;
    }

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
          <Switch
            confirm={confirm}
            checked={checked}
            checkedText={checkedText}
            uncheckedText={uncheckedText}
            size={size}
            color={color}
            disabled={disabled}
            onChange={onChange}
            afterChange={afterChange}
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

SwitchItem.defaultProps = {
  ...defaultProps,
};

export default SwitchItem;
