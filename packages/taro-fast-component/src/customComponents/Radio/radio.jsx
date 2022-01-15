import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import List from '../List';
import Icon from '../Icon';

const { IconCheck } = Icon;

const defaultProps = {
  style: {},
  header: null,
  headerStyle: {},
  bodyStyle: {},
  extra: null,
  value: '',
  options: [],
  border: true,
  icon: <IconCheck size={18} color="#1677ff" />,
  onClick: null,
};

class Radio extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        show: true,
        valueFlag: '',
        valueStage: '',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev } = prevState;

    if (valueNext !== valuePrev) {
      return {
        valueFlag: valueNext,
        valueStage: valueNext ?? '',
      };
    }

    return {};
  }

  handleClick = (option) => {
    if (option.disabled) {
      return;
    }

    this.setState({
      valueStage: option.value,
    });

    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(option.value);
    }
  };

  render() {
    const {
      header,
      style,
      headerStyle,
      bodyStyle,
      icon,
      options,
      border,
      extra,
    } = this.props;
    const { valueStage } = this.state;

    return (
      <List
        header={header}
        headerStyle={headerStyle}
        bodyStyle={bodyStyle}
        style={style}
        extra={extra}
      >
        {(isArray(options) ? options : []).map((o, index) => {
          const {
            prefix,
            title,
            label,
            description,
            style: styleItem,
            disabled,
            value: valueItem,
          } = o;

          const key = `item_${index}`;

          return (
            <List.Item
              key={key}
              prefix={prefix}
              title={title}
              style={styleItem}
              description={description}
              clickable
              arrow={false}
              disabled={disabled}
              border={border}
              extra={
                !stringIsNullOrWhiteSpace(valueStage) &&
                valueStage === valueItem
                  ? icon
                  : null
              }
              onClick={() => {
                this.handleClick(o);
              }}
            >
              {label}
            </List.Item>
          );
        })}
      </List>
    );
  }
}

Radio.defaultProps = {
  ...defaultProps,
};

export default Radio;
