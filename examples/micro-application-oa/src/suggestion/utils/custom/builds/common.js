import { View } from '@tarojs/components';

import { buildLinearGradient, isFunction } from 'easy-soft-utility';

import { emptyImage, transformSize } from 'taro-fast-common';
import {
  CenterBox,
  ColorText,
  FlexBox,
  HeadNavigation,
  IconChevronDown,
  ImageBox,
  MultiLineText,
  VerticalBox,
} from 'taro-fast-component';

import {
  customerMessageListItemArrow,
  customerMessageListItemTitlePrefix,
} from '../../../customConfig';

export function HeadNavigationBox({
  title = '',
  arrow = false,
  titleBold = false,
}) {
  return (
    <HeadNavigation
      style={{
        overflow: 'hidden',
        backgroundImage: buildLinearGradient({
          direct: 90,
          list: ['#3173aa', '#3e81bc'],
        }),
      }}
      backboardStyle={{
        width: '100%',
        height: '100%',
        backgroundImage: buildLinearGradient({
          direct: 90,
          list: ['#3173aa', '#3e81bc'],
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
                <IconChevronDown size={36} color="#fff" />
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

export function buildMessageListItem({
  key,
  title = '',
  description = '',
  createTime = '',
  onClick = null,
}) {
  return (
    <View
      key={key}
      style={{
        borderRadius: transformSize(30),
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingTop: transformSize(24),
        paddingLeft: transformSize(24),
        paddingRight: transformSize(24),
        paddingBottom: transformSize(24),
      }}
    >
      <View>
        <MultiLineText
          style={{ color: '#333' }}
          fontSize={40}
          lineHeight={52}
          text={title}
          prefixStyle={{
            marginRight: transformSize(14),
          }}
          prefix={
            <View
              style={{
                width: transformSize(52),
              }}
            >
              <ImageBox src={customerMessageListItemTitlePrefix} />
            </View>
          }
        />
      </View>

      <View
        style={{
          fontSize: transformSize(28),
          lineHeight: transformSize(48),
          color: '#949494',
          marginTop: transformSize(10),
        }}
      >
        {description}
      </View>

      <View
        style={{
          marginTop: transformSize(10),
        }}
      >
        <FlexBox
          style={{ width: '100%' }}
          flexAuto="left"
          left={
            <CenterBox>
              <ColorText
                color="#688f6b"
                fontSize={30}
                separator=""
                text={`【 ${createTime} 】`}
              />
            </CenterBox>
          }
          right={
            <View
              style={{
                backgroundColor: '#3c83c1',
                borderRadius: transformSize(24),
                overflow: 'hidden',
              }}
            >
              <FlexBox
                style={{ width: '100%' }}
                flexAuto="left"
                left={
                  <View
                    style={{
                      width: transformSize(144),
                      paddingTop: transformSize(10),
                      paddingBottom: transformSize(10),
                    }}
                    onClick={() => {
                      if (!isFunction(onClick)) {
                        return;
                      }

                      onClick();
                    }}
                  >
                    <CenterBox>
                      <ColorText color="#fff" fontSize={28} text="查看详情" />
                    </CenterBox>
                  </View>
                }
                rightStyle={{
                  marginRight: transformSize(4),
                }}
                right={
                  <View
                    style={{
                      width: transformSize(38),
                      borderRadius: '50%',
                    }}
                  >
                    <ImageBox
                      src={customerMessageListItemArrow}
                      circle
                      errorImage={emptyImage}
                    />
                  </View>
                }
              />
            </View>
          }
        />
      </View>
    </View>
  );
}
