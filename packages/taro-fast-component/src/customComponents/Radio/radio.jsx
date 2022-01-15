import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { toLower } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import List from '../List';
import Icon from '../Icon';

const { IconCheck } = Icon;

const layoutCollection = ['list', 'radio'];

const iconContainerStyle = {
  border: '2rpx solid #ccc',
  width: '36rpx',
  height: '36rpx',
  padding: '4rpx',
  lineHeight: '36rpx',
  borderRadius: '50%',
};

const uncheckIcon = (
  <View
    style={{
      ...iconContainerStyle,
      ...{
        borderColor: '#ccc',
      },
    }}
  ></View>
);

const checkIcon = (
  <View
    style={{
      ...iconContainerStyle,
      ...{
        borderColor: '#1677ff',
        backgroundColor: '#1677ff',
      },
    }}
  >
    <IconCheck size={18} color="#fff" />,
  </View>
);

const defaultProps = {
  style: {},
  layout: 'list',
  header: null,
  headerStyle: {},
  bodyStyle: {},
  extra: null,
  value: '',
  options: [],
  border: true,
  iconUncheck: checkIcon,
  iconCheck: uncheckIcon,
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

  getLayout = () => {
    const { layout } = this.props;

    return toLower(
      inCollection(layoutCollection, layout) ? layout : defaultProps.layout,
    );
  };

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
      iconUncheck,
      iconCheck,
      options,
      border,
      extra,
    } = this.props;
    const { valueStage } = this.state;

    const layout = this.getLayout();

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

          if (layout === 'list') {
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
                    ? iconCheck
                    : iconUncheck
                }
                onClick={() => {
                  this.handleClick(o);
                }}
              >
                {label}
              </List.Item>
            );
          }

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
                  ? iconCheck
                  : iconUncheck
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
