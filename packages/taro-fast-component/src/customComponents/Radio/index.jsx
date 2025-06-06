import { View } from '@tarojs/components';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  filter,
  isArray,
  isEmptyArray,
  isFunction,
  isString,
  toLower,
  toMd5,
  toString,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { Card } from '../Card';
import { FlexBox } from '../FlexBox';
import { Grid } from '../Grid';
import { IconCheck } from '../Icon';
import { Item } from '../Item';
import { Space } from '../Space';

const layoutCollection = ['list', 'radio', 'column', 'space'];

const iconContainerStyle = {
  border: `${transformSize(2)} solid #ccc`,
  width: transformSize(30),
  height: transformSize(30),
  padding: transformSize(4),
  lineHeight: transformSize(30),
  borderRadius: '50%',
};

const uncheckStatusIcon = (
  <View
    style={{
      ...iconContainerStyle,
      borderColor: '#ccc',
    }}
  ></View>
);

const checkStatusIcon = (
  <View
    style={{
      ...iconContainerStyle,
      borderColor: '#1677ff',
      backgroundColor: '#1677ff',
      display: 'flex',
      alignSelf: 'center',
    }}
  >
    <IconCheck size={30} color="#fff" />
  </View>
);

const checkStatusIconForListView = <IconCheck size={38} color="#1677ff" />;

function AdjustValue(value, options) {
  if (!isArray(options) || isEmptyArray(options)) {
    return {
      value: '',
      option: null,
    };
  }

  const selectList = filter(options, (one) => {
    const { value: v } = one;

    return toString(v) === toString(value);
  });

  return selectList.length > 0
    ? {
        value: selectList[0].value,
        option: selectList[0],
      }
    : {
        value: '',
        option: null,
      };
}

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
  defaultValue: '',
  options: [],
  border: true,
  iconUncheck: null,
  iconCheck: null,
  columns: 3,
  columnGap: 8,
  spaceSize: 16,
  afterChange: null,
};

class Radio extends BaseComponent {
  constructor(properties) {
    super(properties);

    const { defaultValue, options } = properties;

    const { value: valueAdjust, option } = AdjustValue(defaultValue, options);

    this.state = {
      valueFlag: toMd5(toString(defaultValue || '')),
      optionFlag: toMd5(JSON.stringify(isArray(options) ? options : [])),
      valueStage: valueAdjust,
      optionStage: option,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { defaultValue: defaultValueNext, options: optionsNext } =
      nextProperties;
    const { valueFlag: valueFlagPrevious, optionFlag: optionFlagPrevious } =
      previousState;

    const valueFlagNext = toMd5(toString(defaultValueNext || ''));

    const optionFlagNext = toMd5(
      JSON.stringify(isArray(optionsNext) ? optionsNext : []),
    );

    if (
      valueFlagPrevious !== valueFlagNext ||
      optionFlagPrevious !== optionFlagNext
    ) {
      const { value: valueAdjust, option } = AdjustValue(
        defaultValueNext,
        optionsNext,
      );

      return {
        valueFlag: valueFlagNext,
        optionFlag: optionFlagNext,
        valueStage: valueAdjust,
        optionStage: option,
      };
    }

    return {};
  }

  getLayout = () => {
    const { layout } = this.props;

    return toLower(
      checkInCollection(layoutCollection, layout)
        ? layout
        : defaultProps.layout,
    );
  };

  handleClick = (option) => {
    if (option.disabled) {
      return;
    }

    const { valueStage } = this.state;

    const { value } = option;

    if (value !== valueStage) {
      const { afterChange } = this.props;

      this.setState({
        valueStage: value,
      });

      if (isFunction(afterChange)) {
        afterChange(value, option);
      }
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
                    padding: 'var(--tfc-10) var(--tfc-12)',
                    ...styleItem,
                    ...(disabled
                      ? {
                          opacity: '0.6',
                          pointerEvents: 'none',
                        }
                      : {}),

                    height: '100%',
                  }}
                  left={
                    !checkStringIsNullOrWhiteSpace(valueStage) &&
                    valueStage === valueItem
                      ? iconCheck || checkStatusIcon
                      : iconUncheck || uncheckStatusIcon
                  }
                  right={
                    isString(label) ? (
                      <View
                        style={{
                          fontSize: transformSize(28),
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
                    padding: 'var(--tfc-10) var(--tfc-12)',
                    ...styleItem,
                    ...(disabled
                      ? {
                          opacity: '0.6',
                          pointerEvents: 'none',
                        }
                      : {}),

                    height: '100%',
                  }}
                  left={
                    !checkStringIsNullOrWhiteSpace(valueStage) &&
                    valueStage === valueItem
                      ? iconCheck || checkStatusIcon
                      : iconUncheck || uncheckStatusIcon
                  }
                  right={
                    isString(label) ? (
                      <View
                        style={{
                          fontSize: transformSize(28),
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
        border={!!header || !!extra}
        bodyBorder={!!header || !!extra}
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
                  !checkStringIsNullOrWhiteSpace(valueStage) &&
                  valueStage === valueItem
                    ? iconCheck || checkStatusIconForListView
                    : iconUncheck || null
                }
                extraContainerStyle={{
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
                !checkStringIsNullOrWhiteSpace(valueStage) &&
                valueStage === valueItem
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

Radio.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Radio };
