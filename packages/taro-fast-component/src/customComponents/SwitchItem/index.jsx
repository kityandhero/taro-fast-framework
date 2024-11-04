import { BaseComponent } from '../BaseComponent';
import { Item } from '../Item';
import { Switch } from '../Switch';

const defaultProps = {
  key: null,
  confirm: false,
  style: {},
  title: null,
  label: '',
  contentStyle: {},
  description: null,
  prefix: null,
  border: true,
  extraContainerStyle: {},
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

class SwitchItem extends BaseComponent {
  renderFurther() {
    const {
      key,
      confirm,
      prefix,
      title,
      label,
      contentStyle,
      description,
      style,
      border,
      extraContainerStyle,
      checked,
      disabled,
      checkedText,
      uncheckedText,
      size,
      color,
      onChange,
      afterChange,
    } = this.props;

    return (
      <Item
        key={key}
        prefix={prefix}
        title={title}
        label={label}
        style={style}
        contentStyle={contentStyle}
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
          ...extraContainerStyle,
        }}
      />
    );
  }
}

SwitchItem.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { SwitchItem };
