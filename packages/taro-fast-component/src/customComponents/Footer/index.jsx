import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';
import CenterBox from '../CenterBox';
import ImageBox from '../ImageBox';
import VerticalBox from '../VerticalBox';

const defaultProps = {
  style: {},
  image: null,
  circle: false,
  text: '',
  description: '',
  color: '',
};

class Footer extends BaseComponent {
  renderFurther() {
    const { style, color, circle, image, text, description } = this.props;

    const textHeight = 50;
    const descriptionHeight = 40;

    const showTop =
      !checkStringIsNullOrWhiteSpace(image) ||
      !checkStringIsNullOrWhiteSpace(text);

    const showBottom = !checkStringIsNullOrWhiteSpace(description);

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
              {checkStringIsNullOrWhiteSpace(image) ? null : (
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
              )}

              {checkStringIsNullOrWhiteSpace(text) ? null : (
                <VerticalBox>
                  <View
                    style={{
                      ...{
                        color: '#00000073',
                        fontSize: transformSize(24),
                      },
                      ...(!checkStringIsNullOrWhiteSpace(color)
                        ? {
                            color,
                          }
                        : {}),
                    }}
                  >
                    {text}
                  </View>
                </VerticalBox>
              )}
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
                  ...(!checkStringIsNullOrWhiteSpace(color)
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
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Footer;
