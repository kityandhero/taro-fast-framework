import { View, Text } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  copyToClipboard,
  getGuid,
} from 'taro-fast-common/es/utils/tools';
import { isArray, isNumber } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import FlexBox from '../FlexBox';
import ColorText from '../ColorText';
import Row from '../Flex/Row';
import Col from '../Flex/Col';

const defaultProps = {
  title: '',
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
  ellipsis: true,
};

class DataGrid extends ComponentBase {
  render() {
    const { list, hidden } = this.props;

    if (hidden) {
      return null;
    }

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
        ellipsis,
      } = {
        ...{
          title: '',
          column: 2,
          labelStyle: {},
          contentStyle: {},
          emptyValue: null,
          emptyStyle: null,
          bordered: false,
          colon: true,
          size: null,
          ellipsis: true,
        },
        ...(this.props || {}),
      };

      if (!isNumber(columnSource)) {
        column = 3;
      }

      column = toNumber(columnSource);

      if (column <= 0 || column >= 6) {
        column = 3;
      }

      let margin = '32rpx 48rpx';
      let paddingBottomNoBorder = '12rpx';
      let backgroundColor = '';

      if (sizeSource === 'middle') {
        margin = '24rpx 48rpx';
        paddingBottomNoBorder = '24rpx';
      }

      if (sizeSource === 'small') {
        margin = '16rpx 32rpx';
        paddingBottomNoBorder = '16rpx';
      }

      const columnSize = 12 / column;

      const bordered = borderedSource;
      const colon = bordered ? false : colonSource;

      if (bordered) {
        backgroundColor = '#fafafa';
      }

      const containorStyle = bordered
        ? { borderTop: '2rpx solid #f0f0f0', borderLeft: '2rpx solid #f0f0f0' }
        : null;

      const labelStyle = {
        ...{
          width: '180rpx',
        },
        ...(labelStyleSource || {}),
        ...(bordered ? { margin } : {}),
      };

      const contentStyle = {
        ...(contentStyleSource || {}),
        ...(bordered
          ? {
              ...{
                margin: '32rpx 48rpx',
              },

              ...{ margin },
            }
          : {}),
      };

      const titleComponent = stringIsNullOrWhiteSpace(title) ? null : (
        <View
          style={{
            marginBottom: '16rpx',
            color: '#000000d9',
            fontWeight: 500,
            fontSize: '32rpx',
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
              const { hidden: hiddenItem } = {
                ...{ hidden: false },
                ...(item || {}),
              };

              if (hiddenItem) {
                return null;
              }

              const itemStyle = bordered
                ? {
                    borderRight: '2rpx solid #f0f0f0',
                    borderBottom: '2rpx solid #f0f0f0',
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
                size: itemSize,
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
                  size: 1,
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

              return (
                <Col
                  key={itemKey}
                  style={itemStyle}
                  label={itemLabel}
                  size={
                    columnSize * (toNumber(itemSize) || 1) > 12
                      ? 12
                      : columnSize * (toNumber(itemSize) || 1)
                  }
                  {...(itemProps || {})}
                >
                  <FlexBox
                    flexAuto="right"
                    left={
                      <View style={labelStyle}>{`${itemLabel}${
                        colon ? '：' : ''
                      }`}</View>
                    }
                    leftStyle={{
                      ...{ backgroundColor },
                      ...(bordered
                        ? { borderRight: '2rpx solid #f0f0f0' }
                        : {}),
                    }}
                    right={
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
                          ...(ellipsis ? { WebkitLineClamp: '1' } : {}),
                        }}
                      >
                        {v}
                        {itemCanCopy && (itemCanCopy || null) != null ? (
                          <Text
                            style={{ marginLeft: '40rpx' }}
                            onClick={() => {
                              copyToClipboard({
                                text: itemCopyData || itemValue,
                              });
                            }}
                          >
                            [复制]
                          </Text>
                        ) : null}
                      </View>
                    }
                  />
                </Col>
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
