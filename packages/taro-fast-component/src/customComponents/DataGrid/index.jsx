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
  renderFurther() {
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

      let margin = 'var(--tfc-px-32) var(--tfc-px-48)';
      let paddingBottomNoBorder = 'var(--tfc-px-12)';
      let backgroundColor = '';

      if (sizeSource === 'middle') {
        margin = 'var(--tfc-px-24) var(--tfc-px-48)';
        paddingBottomNoBorder = 'var(--tfc-px-24)';
      }

      if (sizeSource === 'small') {
        margin = 'var(--tfc-px-16) var(--tfc-px-32)';
        paddingBottomNoBorder = 'var(--tfc-px-16)';
      }

      const columnSize = 12 / column;

      const bordered = borderedSource;
      const colon = bordered ? false : colonSource;

      if (bordered) {
        backgroundColor = '#fafafa';
      }

      const containorStyle = bordered
        ? {
            borderTop: 'var(--tfc-px-2) solid #f0f0f0',
            borderLeft: 'var(--tfc-px-2) solid #f0f0f0',
          }
        : null;

      const labelStyle = {
        ...{
          fontSize: 'var(--tfc-px-30)',
          width: '1var(--tfc-px-80)',
        },
        ...(labelStyleSource || {}),
        ...(bordered ? { margin } : {}),
      };

      const contentStyle = {
        ...{
          fontSize: 'var(--tfc-px-30)',
        },
        ...(contentStyleSource || {}),
        ...(bordered
          ? {
              ...{
                margin: 'var(--tfc-px-32) var(--tfc-px-48)',
              },

              ...{ margin },
            }
          : {}),
      };

      const titleComponent = stringIsNullOrWhiteSpace(title) ? null : (
        <View
          style={{
            marginBottom: 'var(--tfc-px-16)',
            color: '#000000d9',
            fontWeight: 500,
            fontSize: 'var(--tfc-px-32)',
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
                    borderRight: 'var(--tfc-px-2) solid #f0f0f0',
                    borderBottom: 'var(--tfc-px-2) solid #f0f0f0',
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

              return (
                <Col
                  key={itemKey}
                  style={itemStyle}
                  label={itemLabel}
                  size={
                    columnSize * (toNumber(itemSpan) || 1) > 12
                      ? 12
                      : columnSize * (toNumber(itemSpan) || 1)
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
                        ? { borderRight: 'var(--tfc-px-2) solid #f0f0f0' }
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
                            style={{ marginLeft: 'var(--tfc-px-40)' }}
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
