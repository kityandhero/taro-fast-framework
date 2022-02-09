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
  image: null,
  circle: false,
  text: '',
  description: '',
  color: '',
};

class Footer extends ComponentBase {
  renderFurther() {
    const { style, color, circle, image, text, description } = this.props;

    const textHeight = 50;
    const descriptionHeight = 40;

    const showTop =
      !stringIsNullOrWhiteSpace(image) || !stringIsNullOrWhiteSpace(text);

    const showBottom = !stringIsNullOrWhiteSpace(description);

    const totalHeight =
      (showTop ? textHeight : 0) + (showBottom ? descriptionHeight : 0);

    return (
      <View
        style={{
          ...style,
          ...{ height: transformSize(totalHeight) },
        }}
      >
        {showTop ? (
          <View style={{ height: transformSize(textHeight) }}>
            <CenterBox>
              <FlexBox
                left={
                  stringIsNullOrWhiteSpace(image) ? null : (
                    <VerticalBox>
                      <View
                        style={{
                          padding: `${transformSize(10)} ${transformSize(10)}`,
                          width: transformSize(40),
                        }}
                      >
                        <ImageBox src={image} circle={circle} lazyLoad />
                      </View>
                    </VerticalBox>
                  )
                }
                right={
                  stringIsNullOrWhiteSpace(text) ? null : (
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
                        {text}
                      </View>
                    </VerticalBox>
                  )
                }
              />
            </CenterBox>
          </View>
        ) : null}

        {showBottom ? (
          <View style={{ height: transformSize(descriptionHeight) }}>
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
                {description}
              </View>
            </CenterBox>
          </View>
        ) : null}
      </View>
    );
  }
}

Footer.defaultProps = {
  ...defaultProps,
};

export default Footer;
