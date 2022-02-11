import classNames from 'classnames';
import { View } from '@tarojs/components';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';
import { isFunction, isUrl } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import { Badge } from '../Badge';
import ImageBox from '../ImageBox';
import Icon from '../Icon/icon';

import './index.less';

const classPrefix = `tfc-tabbar`;

const defaultProps = {
  activeIcon: null,
  inactiveIcon: null,
  badgeContent: null,
  badgeColor: '',
  dot: false,
  text: '',
  badgeStyle: {},
  color: '#606266',
  active: false,
  activeColor: '',
  inactiveColor: '',
  onClick: null,
};

class Tag extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        placeholderHeight: 50,
      },
    };
  }

  triggerClick = (o) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(o);
    }
  };

  renderFurther() {
    const {
      style: styleSource,
      activeIcon,
      inactiveIcon,
      dot,
      badgeContent,
      badgeColor,
      text,
      color,
      active,
      activeColor,
      inactiveColor,
      hidden,
    } = this.props;

    if (hidden) {
      return null;
    }

    const style = {
      ...{
        '--item-color': color,
      },
      ...styleSource,
    };

    const itemCore = (
      <View
        className={classNames(`${classPrefix}__item`)}
        style={style}
        onClick={this.triggerClick}
      >
        <View
          className={classNames(`${classPrefix}__item__icon`)}
          style={{
            color: active ? activeColor : inactiveColor,
          }}
        >
          {active ? (
            isUrl(activeIcon) ? (
              <ImageBox src={activeIcon} />
            ) : (
              <Icon value={activeIcon} />
            )
          ) : isUrl(inactiveIcon) ? (
            <ImageBox src={inactiveIcon} />
          ) : (
            <Icon value={inactiveIcon} />
          )}
        </View>

        <View
          className={classNames(`${classPrefix}__item__text`)}
          style={{
            color: active ? activeColor : inactiveColor,
          }}
        >
          {text}
        </View>
      </View>
    );

    if (dot || !stringIsNullOrWhiteSpace(badgeContent)) {
      return (
        <Badge color={badgeColor} content={badgeContent} dot={dot}>
          {itemCore}
        </Badge>
      );
    }

    return itemCore;
  }
}

Tag.defaultProps = {
  ...defaultProps,
};

export default Tag;
