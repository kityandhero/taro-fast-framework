import React from 'react';
import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isUndefined,
  toNumber,
  transparentImage,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';
import {
  CenterBox,
  FlexBox,
  ImageBox,
  Line,
  MultiLineText,
  VerticalBox,
} from 'taro-fast-component';

import { defaultConfig } from '../../constant';

function LineAttention(properties) {
  const {
    general,
    data,

    lineStyle,
    labelBoxStyle,
    valueBoxStyle,
    labelContainerStyle,
    valueContainerStyle,
    signetStyle,
  } = properties;

  const minHeightAdjust = defaultConfig.minHeight;

  const { labelWidth } = { labelWidth: '0', ...general };

  const labelWidthAdjust =
    isUndefined(labelWidth) ||
    checkStringIsNullOrWhiteSpace(labelWidth) ||
    toNumber(labelWidth) <= 0
      ? ''
      : labelWidth;

  const { title, note, signet, time } = {
    title: '',
    note: '',
    signet: '',
    time: '',
    ...data,
  };

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
              <VerticalBox fillWidth>
                <View style={{ width: '100%' }}>
                  {checkStringIsNullOrWhiteSpace(note) ? (
                    <Line transparent height={49} />
                  ) : (
                    <View
                      style={{
                        paddingTop: transformSize(10),
                        paddingRight: 0,
                        paddingBottom: transformSize(5),
                        paddingLeft: 0,
                      }}
                    >
                      {note}
                    </View>
                  )}

                  <View
                    style={{
                      paddingTop: transformSize(5),
                      paddingRight: 0,
                      paddingBottom: transformSize(10),
                      paddingLeft: 0,
                    }}
                  >
                    <FlexBox
                      flexAuto="left"
                      left={<View></View>}
                      right={
                        <View>
                          <FlexBox
                            flexAuto="left"
                            left={
                              <View
                                style={{
                                  height: transformSize(40),
                                  position: 'relative',
                                }}
                              >
                                <View
                                  style={{
                                    width: transformSize(40),
                                    top: '0',
                                    ...signetStyle,
                                    right: '0',
                                    position: 'absolute',
                                  }}
                                >
                                  <ImageBox
                                    aspectRatio={0.353}
                                    src={signet || transparentImage}
                                  />
                                </View>
                              </View>
                            }
                            rightStyle={{
                              paddingLeft: transformSize(10),
                              paddingRight: transformSize(10),
                            }}
                            right={
                              <View
                                style={{
                                  fontSize: transformSize(24),
                                  paddingTop: transformSize(16),
                                  paddingBottom: transformSize(6),
                                  height: transformSize(40),
                                  lineHeight: transformSize(40),
                                  fontWeight: 'normal',
                                }}
                              >
                                {time}
                              </View>
                            }
                          />
                        </View>
                      }
                    />
                  </View>
                </View>
              </VerticalBox>
            </View>
          </View>
        </View>
      }
    />
  );
}

export { LineAttention };
