import { View } from '@tarojs/components';

import { buildLinearGradient } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  ColorText,
  FlexBox,
  HeadNavigation,
  // IconArrowDown,
  IconChevronDown,
  // ImageBox,
  VerticalBox,
} from 'taro-fast-component';

// import { arrowDownGreyImage } from '../../../customConfig';

export function HeadNavigationBox({
  title = '',
  arrow = false,
  titleBold = false,
}) {
  return (
    <HeadNavigation
      style={{
        overflow: 'hidden',
      }}
      backboardStyle={{
        width: '100%',
        height: '100%',
        backgroundImage: buildLinearGradient({
          direct: 45,
          list: ['#55ade0', '#0075ff'],
        }),
      }}
    >
      <FlexBox
        flexAuto="right"
        leftStyle={{
          paddingLeft: transformSize(20),
          paddingRight: transformSize(16),
        }}
        left={
          <ColorText
            // color="#323232"
            color="#fff"
            fontSize={34}
            text={title || '无归属企业'}
            style={{ ...(titleBold ? { fontWeight: 'bold' } : {}) }}
          />
        }
        right={
          arrow ? (
            <VerticalBox>
              <View style={{ width: transformSize(30) }}>
                {/* <ImageBox src={arrowDownGreyImage} /> */}
                <IconChevronDown size={34} color="#fff" />
              </View>
            </VerticalBox>
          ) : (
            <View></View>
          )
        }
      />
    </HeadNavigation>
  );
}
