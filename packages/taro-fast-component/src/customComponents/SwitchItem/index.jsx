import { transformSize } from 'taro-fast-common/es/utils/tools';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Switch from '../Switch';
import Item from '../Item';

const defaultProps = {
  key: null,
  style: {},
  title: null,
  label: '',
  description: null,
  prefix: null,
  border: true,
  extraContainerStyle: {},
  hidden: false,
  loading: false,
  disabled: false,
  checked: false,
  beforeChange: null,
  onChange: null,
  checkedText: '',
  uncheckedText: '',
  size: 2,
  color: '',
  onChange: null,
};

class SwitchItem extends ComponentBase {
  renderFurther() {
    const {
      key,
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
      loading,
      checkedText,
      uncheckedText,
      size,
      color,
      onChange,
    } = this.props;

    if (hidden) {
      return null;
    }

    if (!!hidden) {
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
          <Switch
            checked={checked}
            loading={loading}
            checkedText={checkedText}
            uncheckedText={uncheckedText}
            size={size}
            color={color}
            disabled={disabled}
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
        {label}
      </Item>
    );
  }
}

SwitchItem.defaultProps = {
  ...defaultProps,
};

export default SwitchItem;
