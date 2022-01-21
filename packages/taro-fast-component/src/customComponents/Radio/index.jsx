import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import {
  isArray,
  isFunction,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';
import { toLower } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import Card from '../Card';
import Item from '../Item';
import Icon from '../Icon';
import CenterBox from '../CenterBox';

const { IconCheck } = Icon;

const layoutCollection = ['list', 'radio'];

const iconContainerStyle = {
  border: '2rpx solid #ccc',
  width: '32rpx',
  height: '32rpx',
  padding: '4rpx',
  lineHeight: '32rpx',
  borderRadius: '50%',
};

const uncheckStatusIcon = (
  <View
    style={{
      ...iconContainerStyle,
      ...{
        borderColor: '#ccc',
      },
    }}
  ></View>
);

const checkStatusIcon = (
  <View
    style={{
      ...iconContainerStyle,
      ...{
        borderColor: '#1677ff',
        backgroundColor: '#1677ff',
      },
    }}
  >
    <CenterBox>
      <IconCheck size={14} color="#fff" />
    </CenterBox>
  </View>
);

const checkStatusIconForListView = (
  <CenterBox>
    <IconCheck size={19} color="#1677ff" />
  </CenterBox>
);

const defaultProps = {
  style: {},
  layout: 'list',
  header: null,
  headerStyle: {},
  bodyStyle: {},
  extra: null,
  extraContainerStyle: {},
  value: '',
  options: [],
  border: true,
  iconUncheck: null,
  iconCheck: null,
  onChange: null,
};

class Radio extends ComponentBase {
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

    const { onChange } = this.props;

    if (isFunction(onChange)) {
      onChange(option.value);
    }
  };

  renderFurther() {
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
      extraContainerStyle,
      value,
    } = this.props;

    const layout = this.getLayout();

    return (
      <Card
        header={header}
        headerStyle={headerStyle}
        bodyStyle={bodyStyle}
        style={style}
        extra={extra}
        space={false}
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
            extra: extraItem,
          } = o;

          const key = `item_${index}`;

          if (layout === 'list') {
            return (
              <Item
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
                  !stringIsNullOrWhiteSpace(value) && value === valueItem
                    ? iconCheck || checkStatusIconForListView
                    : iconUncheck || null
                }
                extraContainerStyle={{
                  ...{
                    paddingRight: '24rpx',
                  },
                  ...extraContainerStyle,
                }}
                onClick={() => {
                  this.handleClick(o);
                }}
              >
                {label}
              </Item>
            );
          }

          return (
            <Item
              key={key}
              // prefix={prefix}
              prefix={
                !stringIsNullOrWhiteSpace(value) && value === valueItem
                  ? iconCheck || checkStatusIcon
                  : iconUncheck || uncheckStatusIcon
              }
              title={title}
              style={styleItem}
              description={description}
              clickable
              arrow={false}
              disabled={disabled}
              border={border}
              extra={
                extraItem ? (
                  <CenterBox>
                    {isString(extraItem) ? (
                      <View
                        style={{
                          fontSize: '30rpx',
                          color: 'var(--tfc-color-weak)',
                        }}
                      >
                        {extraItem}
                      </View>
                    ) : (
                      extraItem
                    )}
                  </CenterBox>
                ) : null
              }
              extraContainerStyle={{
                ...{
                  paddingRight: '24rpx',
                },
                ...extraContainerStyle,
              }}
              onClick={() => {
                this.handleClick(o);
              }}
            >
              {label}
            </Item>
          );
        })}
      </Card>
    );
  }
}

Radio.defaultProps = {
  ...defaultProps,
};

export default Radio;
