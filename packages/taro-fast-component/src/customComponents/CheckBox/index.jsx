import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
  transformSize,
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
import VerticalBox from '../VerticalBox';
import FlexBox from '../FlexBox';
import Grid from '../Grid';

const { IconCheck } = Icon;

const layoutCollection = ['list', 'checkBox', 'mini'];

const iconContainerStyle = {
  border: `${transformSize(2)} solid #ccc`,
  width: transformSize(30),
  height: transformSize(30),
  padding: transformSize(4),
  lineHeight: transformSize(30),
  borderRadius: transformSize(6),
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
      <IconCheck size={28} color="#fff" />
    </CenterBox>
  </View>
);

const checkStatusIconForListView = (
  <CenterBox>
    <IconCheck size={38} color="#1677ff" />
  </CenterBox>
);

const uncheckStatusIconForListView = (
  <CenterBox>
    <IconCheck size={38} color="#ddd" />
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
  value: [],
  options: [],
  border: true,
  iconUncheck: null,
  iconCheck: null,
  miniColumns: 3,
  miniGap: 8,
  onChange: null,
};

class CheckBox extends ComponentBase {
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
      const { value } = this.props;

      let valueChanged = [];

      if (inCollection(value || [], option.value)) {
        (value || []).forEach((o) => {
          if (o !== option.value) {
            valueChanged.push(o);
          }
        });
      } else {
        valueChanged = [...(value || [])];

        valueChanged.push(option.value);
      }

      const result = [];

      valueChanged.forEach((o) => {
        if (!stringIsNullOrWhiteSpace(o)) {
          result.push(o);
        }
      });

      onChange(result);
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
      miniColumns,
      miniGap,
    } = this.props;

    const layout = this.getLayout();

    if (layout === 'mini') {
      return (
        <Grid columns={miniColumns} gap={miniGap}>
          {(isArray(options) ? options : []).map((o, index) => {
            const {
              label,
              span,
              style: styleItem,
              disabled,
              value: valueItem,
            } = o;

            const key = `item_${index}`;

            return (
              <Grid.Item
                key={key}
                span={span || 1}
                onClick={() => {
                  this.handleClick(o);
                }}
              >
                <FlexBox
                  flexAuto="right"
                  style={{
                    ...{
                      padding: 'var(--tfc-10) var(--tfc-12)',
                    },
                    ...styleItem,
                    ...(disabled
                      ? {
                          opacity: '0.6',
                          pointerEvents: 'none',
                        }
                      : {}),
                    ...{
                      height: '100%',
                    },
                  }}
                  left={
                    <CenterBox>
                      {inCollection(value || [], valueItem)
                        ? iconCheck || checkStatusIcon
                        : iconUncheck || uncheckStatusIcon}
                    </CenterBox>
                  }
                  right={
                    <VerticalBox>
                      {isString(label) ? (
                        <View
                          style={{
                            ...{
                              fontSize: transformSize(28),
                            },
                          }}
                        >
                          {label}
                        </View>
                      ) : (
                        label || ''
                      )}
                    </VerticalBox>
                  }
                  rightStyle={{
                    paddingLeft: transformSize(10),
                  }}
                />
              </Grid.Item>
            );
          })}
        </Grid>
      );
    }

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
                  inCollection(value || [], valueItem)
                    ? iconCheck || checkStatusIconForListView
                    : iconUncheck || uncheckStatusIconForListView
                }
                extraContainerStyle={{
                  ...{
                    paddingRight: transformSize(24),
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
              prefix={
                inCollection(value || [], valueItem)
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
                          fontSize: transformSize(30),
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
                  paddingRight: transformSize(24),
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

CheckBox.defaultProps = {
  ...defaultProps,
};

export default CheckBox;
