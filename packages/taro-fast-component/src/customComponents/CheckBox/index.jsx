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
  columns: 3,
  columnGap: 8,
  spaceSize: 16,
  afterChange: null,
};

class CheckBox extends ComponentBase {
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
      extra,
      extraContainerStyle,
      columns,
      columnGap,
      spaceSize,
    } = this.props;
    const { valueStage } = this.state;

    const layout = this.getLayout();

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
                    <CenterBox>
                      {inCollection(valueStage || [], valueItem)
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
                    <CenterBox>
                      {inCollection(valueStage || [], valueItem)
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
                border={border}
                extra={
                  inCollection(valueStage || [], valueItem)
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
            />
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
