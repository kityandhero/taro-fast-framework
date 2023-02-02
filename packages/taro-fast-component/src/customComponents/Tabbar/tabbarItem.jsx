import classNames from 'classnames';
import { View } from '@tarojs/components';

import { checkStringIsNullOrWhiteSpace, isFunction } from 'easy-soft-utility';

import { Badge } from '../Badge';
import { BaseComponent } from '../BaseComponent';
import { Icon } from '../Icon/icon';
import { ImageBox } from '../ImageBox';

import './index.less';

const classPrefix = `tfc-tabbar`;

const defaultProps = {
  icon: null,
  activeIcon: null,
  image: null,
  activeImage: null,
  badgeContent: null,
  badgeColor: '',
  dot: false,
  text: '',
  badgeStyle: {},
  active: false,
  color: '#606266',
  activeColor: '',
  onClick: null,
};

class TabbarItem extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        placeholderHeight: 50,
      },
    };
  }

  triggerClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const {
      style: styleSource,
      icon,
      activeIcon,
      image,
      activeImage,
      dot,
      badgeContent,
      badgeColor,
      text,
      active,
      color,
      activeColor,
    } = this.props;

    const style = {
      ...{
        '--item-color': color,
      },
      ...styleSource,
    };

    const iconSize = 44;

    const imageBoxStyle = { width: 'var(--tfc-44)' };

    const iconInactive = checkStringIsNullOrWhiteSpace(icon) ? (
      checkStringIsNullOrWhiteSpace(image) ? null : (
        <ImageBox src={image} imageBoxStyle={imageBoxStyle} />
      )
    ) : (
      <Icon value={icon} size={iconSize} />
    );

    const iconActive = checkStringIsNullOrWhiteSpace(activeIcon) ? (
      checkStringIsNullOrWhiteSpace(activeImage) ? (
        checkStringIsNullOrWhiteSpace(icon) ? (
          checkStringIsNullOrWhiteSpace(image) ? null : (
            <ImageBox src={image} imageBoxStyle={imageBoxStyle} />
          )
        ) : (
          <Icon value={icon} size={iconSize} />
        )
      ) : (
        <ImageBox src={activeImage} imageBoxStyle={imageBoxStyle} />
      )
    ) : (
      <Icon value={activeIcon} size={iconSize} />
    );

    let itemCore = (
      <>
        <View
          className={classNames(`${classPrefix}__item__icon`)}
          style={{
            color: active ? activeColor : color,
          }}
        >
          {active ? iconActive : iconInactive}
        </View>

        <View
          className={classNames(`${classPrefix}__item__text`)}
          style={{
            color: active ? activeColor : color,
          }}
        >
          {text}
        </View>
      </>
    );

    if (dot || !checkStringIsNullOrWhiteSpace(badgeContent)) {
      itemCore = (
        <Badge color={badgeColor} content={badgeContent} dot={dot}>
          {itemCore}
        </Badge>
      );
    }

    return (
      <View
        className={classNames(`${classPrefix}__item`)}
        style={style}
        onClick={this.triggerClick}
      >
        {itemCore}
      </View>
    );
  }
}

TabbarItem.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { TabbarItem };
