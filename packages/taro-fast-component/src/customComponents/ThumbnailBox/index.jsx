import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';
import { FlexBox } from '../FlexBox';
import { IconChevronDown, IconChevronUp } from '../Icon';
import { Overlay } from '../Overlay';

import './index.less';

const classPrefix = `tfc-thumbnail-box`;

const actionHeight = 60;

const defaultProps = {
  initialExpand: false,
  repeatShrink: false,
  height: 200,
  expandText: '展开阅读全文',
  shrinkText: '收起',
  actionColor: 'var(--tfc-color-primary)',
  actionBackgroundColor: '',
  backgroundColor: '',
  onChange: null,
};

class ThumbnailBox extends BaseComponent {
  constructor(properties) {
    super(properties);

    const { initialExpand } = properties;

    this.state = {
      ...this.state,
      expandStage: initialExpand,
    };
  }

  getStyle = () => {
    const { height, backgroundColor, actionBackgroundColor, actionColor } =
      this.props;
    const { expandStage } = this.state;

    return {
      ...(checkStringIsNullOrWhiteSpace(backgroundColor)
        ? {}
        : {
            '--background-color': backgroundColor,
          }),
      ...(checkStringIsNullOrWhiteSpace(actionBackgroundColor)
        ? {}
        : {
            '--action-background-color': actionBackgroundColor,
          }),
      ...(checkStringIsNullOrWhiteSpace(actionColor)
        ? {}
        : {
            '--action-color': actionColor,
          }),
      ...(isNumber(actionHeight) && actionHeight > 0
        ? {
            '--action-height': transformSize(actionHeight),
          }
        : {}),
      ...(expandStage
        ? {}
        : {
            height: transformSize(height),
            overflow: 'hidden',
          }),
    };
  };

  toggleExpand = (expand) => {
    const { onChange } = this.props;

    this.setState({
      expandStage: !expand,
    });

    if (isFunction(onChange)) {
      onChange({ expandStage: !expand });
    }
  };

  renderFurther() {
    const {
      initialExpand,
      expandText,
      shrinkText,
      repeatShrink,
      actionColor,
      children,
    } = this.props;
    const { expandStage } = this.state;

    const style = this.getStyle();

    return (
      <View className={classNames(classPrefix)} style={style}>
        <View
          className={classNames(`${classPrefix}__content`)}
          style={{
            ...(expandStage
              ? {}
              : {
                  height: `calc(100% - ${transformSize(actionHeight)})`,
                  overflow: 'hidden',
                }),

            ...(repeatShrink
              ? {
                  paddingBottom: transformSize(actionHeight),
                }
              : {}),
          }}
        >
          {children}
        </View>

        <Overlay
          visible={!expandStage}
          mode="fullParent"
          zIndex={99}
          color="transparent"
          duration={100}
          lockScroll={false}
        >
          <View className={classNames(`${classPrefix}__mask`)}>
            <FlexBox
              direction=""
              flexAuto="top"
              style={{ height: '100%' }}
              top={
                <View className={classNames(`${classPrefix}__mask__inner`)} />
              }
              bottom={<View style={{ height: transformSize(actionHeight) }} />}
            />
          </View>
        </Overlay>

        {(!initialExpand && !expandStage && !repeatShrink) || repeatShrink ? (
          <View
            className={classNames(`${classPrefix}__action`)}
            onClick={() => {
              this.toggleExpand(expandStage);
            }}
          >
            <View>
              <FlexBox
                flexAuto="left"
                left={
                  <View className={classNames(`${classPrefix}__action__box`)}>
                    {expandStage ? shrinkText : expandText}
                  </View>
                }
                right={
                  <CenterBox>
                    {expandStage ? (
                      <IconChevronUp size={38} color={actionColor} />
                    ) : (
                      <IconChevronDown size={38} color={actionColor} />
                    )}
                  </CenterBox>
                }
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

ThumbnailBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { ThumbnailBox };
