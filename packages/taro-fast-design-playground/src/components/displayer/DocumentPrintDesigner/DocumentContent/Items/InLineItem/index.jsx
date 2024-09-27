import React from 'react';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common';
import { CenterBox, FlexBox, MultiLineText } from 'taro-fast-component';

import {
  colorStyle,
  fontFamilyStyle,
  labelFrontStyle,
  valueFrontStyle,
} from '../../constant';
import { buildDisplayValue } from '../../tools';

function InLineItem(properties) {
  const {
    data,
    values,
    color,
    labelBoxStyle,
    labelContainerStyle,
    valueBoxStyle,
  } = properties;

  const { title } = { ...data };

  const displayValue = buildDisplayValue(data, values);

  const filedComponent = (
    <FlexBox
      flexAuto="right"
      style={{
        height: '100%',
        overflow: 'hidden',
      }}
      leftStyle={{
        paddingTop: transformSize(12),
        paddingBottom: transformSize(12),
        paddingLeft: transformSize(10),
        paddingRight: transformSize(10),
        borderLeft: `${transformSize(1)} solid ${color}`,
        borderRight: `${transformSize(1)} solid ${color}`,
        textAlign: 'center',
        ...labelFrontStyle,
        ...colorStyle,
        ...fontFamilyStyle,
        ...labelBoxStyle,
        width: 'auto',
      }}
      left={
        <CenterBox>
          <View
            style={{
              paddingLeft: transformSize(6),
              paddingRight: transformSize(6),
              ...labelContainerStyle,
              height: '100%',
              fontSize: transformSize(26),
              whiteSpace: 'nowrap',
            }}
          >
            <MultiLineText fontSize={26} lineHeight={36} text={title} />
          </View>
        </CenterBox>
      }
      rightStyle={{
        ...valueFrontStyle,
        ...colorStyle,
        ...fontFamilyStyle,
        ...valueBoxStyle,
        borderRight: '0',
      }}
      right={
        <View
          style={{
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
      }
    />
  );

  return filedComponent;
}

export { InLineItem };
