import React from 'react';
import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isUndefined,
  toNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  CenterBox,
  Col,
  FlexBox,
  MultiLineText,
  Row,
} from 'taro-fast-component';

import { defaultConfig } from '../../constant';
import { buildDisplayValue } from '../../tools';
import { InLineItem } from '../InLineItem';

function LineItem(properties) {
  const {
    general,
    data,
    values,
    currentName,
    highlightMode,
    lineStyle,
    labelBoxStyle,
    valueBoxStyle,
    labelContainerStyle,
    valueContainerStyle,
    onClick: onClickCallback,
  } = properties;

  let dataAdjust;
  let otherList = [];

  if (isArray(data)) {
    if (data.length <= 0) {
      return null;
    } else {
      dataAdjust = data.shift();

      otherList = [...data];
    }
  } else {
    dataAdjust = data;
  }

  const { title, width, minHeight } = {
    title: '',
    width: '0',
    minHeight: '0',
    ...dataAdjust,
  };

  const minHeightAdjust =
    isUndefined(minHeight) ||
    checkStringIsNullOrWhiteSpace(minHeight) ||
    toNumber(minHeight) <= 0
      ? defaultConfig.minHeight
      : minHeight;

  const widthAdjust =
    isUndefined(width) ||
    checkStringIsNullOrWhiteSpace(width) ||
    toNumber(width) <= 0
      ? toNumber(defaultConfig.width)
      : toNumber(width);

  const { labelWidth } = { labelWidth: '0', ...general };

  const labelWidthAdjust =
    isUndefined(labelWidth) ||
    checkStringIsNullOrWhiteSpace(labelWidth) ||
    toNumber(labelWidth) <= 0
      ? ''
      : labelWidth;

  const displayValue = buildDisplayValue(dataAdjust, values);

  return (
    <FlexBox
      flexAuto="right"
      style={{
        ...lineStyle,
        ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
          ? {}
          : {
              minHeight: transformSize(toNumber(minHeightAdjust)),
            }),
        overflow: 'hidden',
      }}
      leftStyle={{
        ...labelBoxStyle,
        position: 'relative',
        // padding: '0',
        ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
          ? {}
          : {
              minHeight: transformSize(toNumber(minHeightAdjust)),
            }),
        ...(checkStringIsNullOrWhiteSpace(labelWidthAdjust)
          ? {}
          : {
              width: transformSize(toNumber(labelWidthAdjust)),
            }),
      }}
      left={
        <>
          <View
            style={{
              labelBoxStyle,
              height: '100%',
              width: '100%',
              ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
                ? {}
                : {
                    minHeight: transformSize(toNumber(minHeightAdjust)),
                  }),
            }}
          >
            <View
              style={{
                paddingLeft: transformSize(10),
                paddingRight: transformSize(10),
                ...labelContainerStyle,
                height: '100%',
                fontSize: transformSize(30),
              }}
            >
              <CenterBox>
                <MultiLineText fontSize={30} lineHeight={42} text={title} />
              </CenterBox>
            </View>
          </View>
        </>
      }
      rightStyle={{
        ...valueBoxStyle,
        ...(otherList.length <= 0
          ? {}
          : { paddingLeft: '0', paddingRight: '0' }),
        ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
          ? {}
          : {
              minHeight: transformSize(toNumber(minHeightAdjust)),
            }),
      }}
      right={
        otherList.length <= 0 ? (
          <View
            style={{
              ...valueContainerStyle,
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <View
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <View
                style={{
                  paddingLeft: transformSize(10),
                  paddingRight: transformSize(10),
                  height: '100%',
                }}
              >
                {displayValue}
              </View>
            </View>
          </View>
        ) : (
          <Row style={{ width: '100%', height: '100%' }} wrap={false}>
            <Col flex={widthAdjust <= 0 ? 'auto' : transformSize(width)}>
              <View
                style={{
                  ...valueContainerStyle,
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                <View
                  style={{
                    ...valueBoxStyle,
                    width: '100%',
                    height: '100%',
                    borderRight: '0',
                  }}
                >
                  <View
                    style={{
                      paddingLeft: transformSize(10),
                      paddingRight: transformSize(10),
                      height: '100%',
                    }}
                  >
                    {displayValue}
                  </View>
                </View>
              </View>
            </Col>

            {otherList.map((o, columnIndex) => {
              const { width: widthItem } = o;

              const widthItemAdjust =
                isUndefined(widthItem) ||
                checkStringIsNullOrWhiteSpace(widthItem) ||
                toNumber(widthItem) <= 0
                  ? toNumber(defaultConfig.width)
                  : toNumber(widthItem);

              return (
                <Col
                  key={`line_column_${columnIndex}`}
                  flex={
                    widthItemAdjust <= 0
                      ? 'auto'
                      : transformSize(widthItemAdjust)
                  }
                >
                  <InLineItem
                    values={values}
                    data={o}
                    currentName={currentName}
                    highlightMode={highlightMode}
                    labelBoxStyle={labelBoxStyle}
                    labelContainerStyle={labelContainerStyle}
                    valueBoxStyle={valueBoxStyle}
                    onClick={onClickCallback}
                  />
                </Col>
              );
            })}
          </Row>
        )
      }
    />
  );
}

export { LineItem };
