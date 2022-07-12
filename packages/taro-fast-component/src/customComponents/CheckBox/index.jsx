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

import BaseComponent from '../BaseComponent';
import Card from '../Card';
import FlexBox from '../FlexBox';
import Grid from '../Grid';
import Icon from '../Icon';
import Item from '../Item';
import { Space } from '../Space';

const { IconCheck } = Icon;

const layoutCollection = ['list', 'checkBox', 'column', 'space'];

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
        display: 'flex',
        alignSelf: 'center',
      },
    }}
  >
    <IconCheck size={30} color="#fff" />
  </View>
);

const checkStatusIconForListView = <IconCheck size={38} color="#1677ff" />;

const uncheckStatusIconForListView = <IconCheck size={38} color="#ddd" />;

const defaultProps = {
  style: {},
  layout: 'list',
  header: null,
  headerStyle: {},
  strip: false,
  stripLeft: 0,
  stripWidth: 8,
  stripHeight: 36,
  stripBorderRadius: 6,
  stripColor: '#ccc',
  extra: null,
  extraContainerStyle: {},
  bodyStyle: {},
  value: [],
  options: [],
  border: true,
  iconUncheck: null,
  iconCheck: null,
  columns: 3,
  columnGap: 8,
  spaceSize: 16,
  afterChange: null,
};

class CheckBox extends BaseComponent {
  constructor(props) {
    super(props);

    const { value } = props;

    this.state = {
      valueFlag: value,
      valueStage: value,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: valueNext } = nextProps;
    const { valueFlag: valuePrev } = prevState;

    if (valueNext !== valuePrev) {
      return {
        valueFlag: valueNext,
        valueStage: valueNext,
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

    const { afterChange } = this.props;
    const { valueStage } = this.state;
    const { value } = option;

    let valueChanged = [];

    if (inCollection(valueStage || [], value)) {
      (valueStage || []).forEach((o) => {
        if (o !== value) {
          valueChanged.push(o);
        }
      });
    } else {
      valueChanged = [...(valueStage || [])];

      valueChanged.push(value);
    }

    const result = [];

    valueChanged.forEach((o) => {
      if (!stringIsNullOrWhiteSpace(o)) {
        result.push(o);
      }
    });

    this.setState({
      valueStage: [...result],
    });

    if (isFunction(afterChange)) {
      afterChange(result, option);
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
      strip,
      stripLeft,
      stripWidth,
      stripHeight,
      stripBorderRadius,
      stripColor,
      extra,
      extraContainerStyle,
      columns,
      columnGap,
      spaceSize,
    } = this.props;
    const { valueStage } = this.state;

    const layout = this.getLayout();

    const listCount = (isArray(options) ? options : []).length;

    if (layout === 'column') {
      return (
        <Grid columns={columns} gap={columnGap}>
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
                    inCollection(valueStage || [], valueItem)
                      ? iconCheck || checkStatusIcon
                      : iconUncheck || uncheckStatusIcon
                  }
                  right={
                    isString(label) ? (
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
                    )
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

    if (layout === 'space') {
      return (
        <Space wrap size={spaceSize}>
          {(isArray(options) ? options : []).map((o, index) => {
            const { label, style: styleItem, disabled, value: valueItem } = o;

            const key = `item_${index}`;

            return (
              <View
                key={key}
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
                    inCollection(valueStage || [], valueItem)
                      ? iconCheck || checkStatusIcon
                      : iconUncheck || uncheckStatusIcon
                  }
                  right={
                    isString(label) ? (
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
                    )
                  }
                  rightStyle={{
                    paddingLeft: transformSize(10),
                  }}
                />
              </View>
            );
          })}
        </Space>
      );
    }

    return (
      <Card
        header={header}
        headerStyle={headerStyle}
        bodyStyle={bodyStyle}
        style={style}
        strip={strip}
        stripLeft={stripLeft}
        stripWidth={stripWidth}
        stripHeight={stripHeight}
        stripBorderRadius={stripBorderRadius}
        stripColor={stripColor}
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
                label={label}
                style={styleItem}
                description={description}
                clickable
                arrow={false}
                disabled={disabled}
                border={index === listCount - 1 ? false : border}
                extra={
                  inCollection(valueStage || [], valueItem)
                    ? iconCheck || checkStatusIconForListView
                    : iconUncheck || uncheckStatusIconForListView
                }
                extraContainerStyle={{
                  ...{},
                  ...extraContainerStyle,
                }}
                onClick={() => {
                  this.handleClick(o);
                }}
              />
            );
          }

          return (
            <Item
              key={key}
              prefix={
                inCollection(valueStage || [], valueItem)
                  ? iconCheck || checkStatusIcon
                  : iconUncheck || uncheckStatusIcon
              }
              title={title}
              label={label}
              style={styleItem}
              description={description}
              clickable
              arrow={false}
              disabled={disabled}
              border={index === listCount - 1 ? false : border}
              extra={
                extraItem ? (
                  isString(extraItem) ? (
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
                  )
                ) : null
              }
              extraContainerStyle={{
                ...{},
                ...extraContainerStyle,
              }}
              onClick={() => {
                this.handleClick(o);
              }}
            />
          );
        })}
      </Card>
    );
  }
}

CheckBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default CheckBox;
