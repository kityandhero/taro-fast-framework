import { View } from '@tarojs/components';
import { Fragment } from 'react';

import {
  stringIsNullOrWhiteSpace,
  copyToClipboard,
  getGuid,
  transformSize,
  inCollection,
} from 'taro-fast-common/es/utils/tools';
import { isArray, isNumber } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

import BaseComponent from '../BaseComponent';

import Ellipsis from '../Ellipsis';
import FlexBox from '../FlexBox';
import ColorText from '../ColorText';
import Row from '../Flex/Row';
import Col from '../Flex/Col';

const layoutCollection = ['row', 'column'];

const defaultProps = {
  title: '',
  layout: 'column',
  column: 2,
  list: [],
  hidden: false,
  labelStyle: {},
  contentStyle: {},
  emptyValue: null,
  emptyStyle: null,
  bordered: false,
  colon: true,
  size: null,
  fontSize: 28,
  ellipsis: true,
  ellipsisLine: 1,
  ellipsisLineHeight: '',
  ellipsisHeight: '',
};

class DataGrid extends BaseComponent {
  getLayout = () => {
    const { layout } = this.props;

    return inCollection(layoutCollection, layout) ? layout : 'column';
  };

  renderFurther() {
    const { list } = this.props;

    const layout = this.getLayout();

    if (isArray(list)) {
      const dataList = list.map((o, index) => {
        const d = { ...{}, ...o };

        d.key = `item_${index}`;

        return { ...{ canCopy: false }, ...d };
      });

      let column = 2;

      const {
        title,
        column: columnSource,
        labelStyle: labelStyleSource,
        contentStyle: contentStyleSource,
        emptyValue: globalEmptyValue,
        emptyStyle: globalEmptyStyle,
        bordered: borderedSource,
        colon: colonSource,
        size: sizeSource,
        fontSize: fontSizeSource,
      } = {
        ...defaultProps,
        ...(this.props || {}),
      };

      if (!isNumber(columnSource)) {
        column = 3;
      }

      column = toNumber(columnSource);

      if (column <= 0 || column >= 6) {
        column = 3;
      }

      let margin = `${transformSize(32)} ${transformSize(48)}`;
      let paddingBottomNoBorder = transformSize(12);
      let backgroundColor = '';

      if (sizeSource === 'middle') {
        margin = `${transformSize(24)} ${transformSize(48)}`;
        paddingBottomNoBorder = transformSize(24);
      }

      if (sizeSource === 'small') {
        margin = `${transformSize(16)} ${transformSize(32)}`;
        paddingBottomNoBorder = transformSize(16);
      }

      const columnSize = 12 / column;

      const bordered = borderedSource;
      const colon = bordered ? false : colonSource;

      if (bordered) {
        backgroundColor = '#fafafa';
      }

      const containorStyle = bordered
        ? {
            borderTop: `${transformSize(2)} solid #f0f0f0`,
            borderLeft: `${transformSize(2)} solid #f0f0f0`,
          }
        : null;

      const labelStyle = {
        ...{
          fontSize: transformSize(30),
          width: transformSize(180),
        },
        ...(labelStyleSource || {}),
        ...(bordered ? { margin } : {}),
        ...(layout === 'row' ? { width: 'auto' } : {}),
      };

      const contentStyle = {
        ...{
          fontSize: transformSize(30),
        },
        ...(contentStyleSource || {}),
        ...(bordered
          ? {
              ...{
                margin: `${transformSize(32)} ${transformSize(48)}`,
              },

              ...{ margin },
            }
          : {}),
      };

      const titleComponent = stringIsNullOrWhiteSpace(title) ? null : (
        <View
          style={{
            marginBottom: transformSize(16),
            color: '#000000d9',
            fontWeight: 500,
            fontSize: transformSize(32),
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          <ColorText text={title} />
        </View>
      );

      return (
        <View>
          {titleComponent}

          <Row style={containorStyle} wrap>
            {dataList.map((item) => {
              const {
                ellipsis,
                ellipsisLine,
                ellipsisLineHeight,
                ellipsisHeight,
                hidden: hiddenItem,
              } = {
                ...{
                  ellipsis: true,
                  ellipsisLine: 1,
                  ellipsisLineHeight: '',
                  ellipsisHeight: '',
                  hidden: false,
                },
                ...(item || {}),
              };

              if (hiddenItem) {
                return null;
              }

              const itemStyle = bordered
                ? {
                    borderRight: `${transformSize(2)} solid #f0f0f0`,
                    borderBottom: `${transformSize(2)} solid #f0f0f0`,
                  }
                : {
                    paddingBottom: paddingBottomNoBorder,
                  };

              const {
                key: itemKey,
                label: itemLabel,
                value: itemValue,
                emptyValue: itemEmptyValue,
                emptyStyle: itemEmptyStyle,
                span: itemSpan,
                canCopy: itemCanCopy,
                copyData: itemCopyData,
                props: itemProps,
              } = {
                ...{
                  key: getGuid(),
                  label: '',
                  value: '',
                  emptyValue: null,
                  emptyStyle: null,
                  span: 1,
                  canCopy: false,
                  copyData: null,
                  props: null,
                },
                ...(item || {}),
              };

              const v = itemValue || itemEmptyValue || globalEmptyValue;

              const isEmpty =
                (itemValue || itemEmptyValue || globalEmptyValue) ==
                (itemEmptyValue || globalEmptyValue);

              const labelComponent = (
                <View style={labelStyle}>{`${itemLabel}${
                  colon ? ': ' : ''
                }`}</View>
              );

              const valueComponent = (
                <View
                  style={{
                    ...contentStyle,
                    ...(isEmpty ? globalEmptyStyle || {} : {}),
                    ...(isEmpty ? itemEmptyStyle || {} : {}),
                    ...{
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-all',
                      whiteSpace: 'normal',
                    },
                  }}
                  onClick={() => {
                    if (itemCanCopy && (itemCanCopy || null) != null) {
                      copyToClipboard({
                        text: itemCopyData || itemValue,
                      });
                    }
                  }}
                >
                  {ellipsis ? (
                    <Ellipsis
                      line={ellipsisLine}
                      style={{
                        ...{
                          width: '100%',
                          fontSize: transformSize(fontSizeSource),
                        },
                        ...(ellipsisLine > 1 &&
                        !stringIsNullOrWhiteSpace(ellipsisHeight)
                          ? {
                              height: ellipsisHeight,
                            }
                          : {}),
                        ...(ellipsisLine > 1 &&
                        !stringIsNullOrWhiteSpace(ellipsisLineHeight)
                          ? {
                              lineHeight: ellipsisLineHeight,
                            }
                          : {}),
                      }}
                    >
                      {v}
                    </Ellipsis>
                  ) : (
                    v
                  )}
                </View>
              );

              if (layout === 'column') {
                return (
                  <Col
                    key={itemKey}
                    style={itemStyle}
                    size={
                      columnSize * (toNumber(itemSpan) || 1) > 12
                        ? 12
                        : columnSize * (toNumber(itemSpan) || 1)
                    }
                    {...(itemProps || {})}
                  >
                    <FlexBox
                      center={false}
                      flexAuto="right"
                      left={labelComponent}
                      leftStyle={{
                        ...{ backgroundColor },
                        ...(bordered
                          ? { borderRight: `${transformSize(2)} solid #f0f0f0` }
                          : {}),
                      }}
                      right={valueComponent}
                    />
                  </Col>
                );
              }

              return (
                <Fragment key={itemKey}>
                  <Col
                    style={{
                      ...itemStyle,
                      ...{
                        backgroundColor,
                      },
                    }}
                    size={12}
                    {...(itemProps || {})}
                  >
                    {labelComponent}
                  </Col>

                  <Col style={itemStyle} size={12} {...(itemProps || {})}>
                    {valueComponent}
                  </Col>
                </Fragment>
              );
            })}
          </Row>
        </View>
      );
    }

    return null;
  }
}

DataGrid.defaultProps = {
  ...defaultProps,
};

export default DataGrid;
