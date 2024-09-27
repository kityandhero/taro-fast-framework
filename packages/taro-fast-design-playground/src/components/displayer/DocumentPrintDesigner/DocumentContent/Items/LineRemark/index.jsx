import React from 'react';
import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isUndefined,
  toNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  CenterBox,
  FlexBox,
  MultiLineText,
  VerticalBox,
} from 'taro-fast-component';

import { defaultConfig } from '../../constant';

function LineRemark(properties) {
  const {
    general,
    title,
    value,
    lineStyle,
    labelBoxStyle,
    valueBoxStyle,
    labelContainerStyle,
    valueContainerStyle,
  } = properties;

  const minHeightAdjust = defaultConfig.minHeight;

  const { labelWidth } = { labelWidth: '0', ...general };

  const labelWidthAdjust =
    isUndefined(labelWidth) ||
    checkStringIsNullOrWhiteSpace(labelWidth) ||
    toNumber(labelWidth) <= 0
      ? ''
      : labelWidth;

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
        padding: '0',
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
            <CenterBox>
              <View
                style={{
                  paddingLeft: transformSize(10),
                  paddingRight: transformSize(10),
                  ...labelContainerStyle,
                  fontSize: transformSize(26),
                }}
              >
                <MultiLineText fontSize={26} lineHeight={36} text={title} />
              </View>
            </CenterBox>
          </View>
        </>
      }
      rightStyle={{
        ...valueBoxStyle,
        ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
          ? {}
          : {
              minHeight: transformSize(toNumber(minHeightAdjust)),
            }),
      }}
      right={
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
              <VerticalBox>
                <View>{value}</View>
              </VerticalBox>
            </View>
          </View>
        </View>
      }
    />
  );
}

export { LineRemark };
