import { View } from '@tarojs/components';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import CenterBox from '../CenterBox';
import VerticalBox from '../VerticalBox';
import FlexBox from '../FlexBox';
import ImageBox from '../ImageBox';

const defaultProps = {
  style: {},
  logo: null,
  circle: false,
  name: '',
  copyright: '',
  color: '',
};

class Copyright extends ComponentBase {
  renderFurther() {
    const { style, color, circle, logo, name, copyright } = this.props;

    const nameHeight = 50;
    const copyrightHeight = 40;

    const showName =
      !stringIsNullOrWhiteSpace(logo) || !stringIsNullOrWhiteSpace(name);

    const showCopyright = !stringIsNullOrWhiteSpace(copyright);

    const totalHeight =
      (showName ? nameHeight : 0) + (showCopyright ? copyrightHeight : 0);

    return (
      <View
        style={{
          ...style,
          ...{ height: `${totalHeight}rpx` },
        }}
      >
        {showName ? (
          <View style={{ height: `${nameHeight}rpx` }}>
            <CenterBox>
              <FlexBox
                left={
                  stringIsNullOrWhiteSpace(logo) ? null : (
                    <VerticalBox>
                      <View
                        style={{
                          padding: 'var(--tfc-px-10) var(--tfc-px-10)',
                          width: 'var(--tfc-px-40)',
                        }}
                      >
                        <ImageBox src={logo} circle={circle} lazyLoad />
                      </View>
                    </VerticalBox>
                  )
                }
                right={
                  stringIsNullOrWhiteSpace(name) ? null : (
                    <VerticalBox>
                      <View
                        style={{
                          ...{
                            color: '#00000073',
                            fontSize: 'var(--tfc-px-24)',
                          },
                          ...(!stringIsNullOrWhiteSpace(color)
                            ? {
                                color,
                              }
                            : {}),
                        }}
                      >
                        {name}
                      </View>
                    </VerticalBox>
                  )
                }
              />
            </CenterBox>
          </View>
        ) : null}

        {showCopyright ? (
          <View style={{ height: `${copyrightHeight}rpx` }}>
            <CenterBox>
              <View
                style={{
                  ...{
                    color: '#00000073',
                    fontSize: '20rpx',
                  },
                  ...(!stringIsNullOrWhiteSpace(color)
                    ? {
                        color,
                      }
                    : {}),
                }}
              >
                {copyright}
              </View>
            </CenterBox>
          </View>
        ) : null}
      </View>
    );
  }
}

Copyright.defaultProps = {
  ...defaultProps,
};

export default Copyright;
