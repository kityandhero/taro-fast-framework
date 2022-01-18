import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';

import './index.less';

const classPrefix = `tfc-card`;

const modeCollection = ['through', 'card'];

const defaultProps = {
  mode: 'through',
  style: {},
  header: null,
  headerStyle: {},
  bodyStyle: {},
  footer: null,
  footerStyle: {},
  space: true,
  extra: null,
};

class Card extends ComponentBase {
  renderFurther() {
    const {
      style,
      header,
      headerStyle,
      bodyStyle,
      footer,
      footerStyle,
      extra,
      mode: modeSource,
      space,
      children,
    } = this.props;

    const mode = inCollection(modeCollection, modeSource)
      ? modeSource
      : 'default';

    return (
      <View
        className={classNames(classPrefix, `${classPrefix}-${mode}`)}
        style={style}
      >
        {header ? (
          <FlexBox
            left={
              <View className={`${classPrefix}-header`} style={headerStyle}>
                {header}
              </View>
            }
            right={extra ? <VerticalBox>{extra}</VerticalBox> : null}
            rightStyle={extra ? { padding: '0 20rpx 0 0' } : null}
          />
        ) : null}

        <View
          className={classNames(`${classPrefix}-body`, {
            [`${classPrefix}-body-space`]: !!space,
          })}
          style={bodyStyle}
        >
          <View className={`${classPrefix}-body-inner`}>{children}</View>
        </View>

        {footer ? (
          <View
            className={classNames(`${classPrefix}-footer`)}
            style={footerStyle}
          >
            {footer}
          </View>
        ) : null}
      </View>
    );
  }
}

Card.defaultProps = {
  ...defaultProps,
};

export default Card;
