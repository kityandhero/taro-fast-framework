import { View } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
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
          ...{ height: transformSize(totalHeight) },
        }}
      >
        {showName ? (
          <View style={{ height: transformSize(nameHeight) }}>
            <CenterBox>
              <FlexBox
                left={
                  stringIsNullOrWhiteSpace(logo) ? null : (
                    <VerticalBox>
                      <View
                        style={{
                          padding: `${transformSize(10)} ${transformSize(10)}`,
                          width: transformSize(40),
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
                            fontSize: transformSize(24),
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
          <View style={{ height: transformSize(copyrightHeight) }}>
            <CenterBox>
              <View
                style={{
                  ...{
                    color: '#00000073',
                    fontSize: transformSize(20),
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
