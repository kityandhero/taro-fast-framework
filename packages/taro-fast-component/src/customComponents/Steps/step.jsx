import classNames from 'classnames';
import { View } from '@tarojs/components';

import { checkInCollection, isFunction } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

const classPrefix = `tfc-steps`;

const statusCollection = ['wait', 'process', 'finish', 'error'];

const defaultProps = {
  title: '',
  description: '',
  status: 'wait',
  icon: null,
  direction: '',
  data: null,
  bodyStyle: null,
  style: null,
  titleBuilder: null,
  descriptionBuilder: null,
};

class Step extends BaseComponent {
  getStatus = () => {
    const { status } = this.props;

    return checkInCollection(statusCollection, status) ? status : 'wait';
  };

  renderFurther() {
    const {
      title,
      description,
      icon,
      direction,
      data,
      style,
      bodyStyle,
      titleBuilder,
      descriptionBuilder,
    } = this.props;

    const status = this.getStatus();

    const titleComponent = isFunction(titleBuilder)
      ? titleBuilder(data)
      : title;

    const descriptionComponent = isFunction(descriptionBuilder)
      ? descriptionBuilder(data)
      : description;

    return (
      <View
        className={classNames(
          `${classPrefix}__item-${direction}`,
          `${classPrefix}__item__status-${status}`,
        )}
      >
        <View
          className={classNames(
            `${classPrefix}__item__indicator`,
            `${classPrefix}__item-${direction}__indicator`,
          )}
        >
          <View
            className={classNames(
              `${classPrefix}__item__indicator__icon__container`,
              `${classPrefix}__item-${direction}__indicator__icon__container`,
            )}
          >
            {icon}
          </View>

          <View
            className={classNames(
              `${classPrefix}__item__indicator__line`,
              `${classPrefix}__item-${direction}__indicator__line`,
            )}
          />
        </View>

        <View
          className={`${classPrefix}__item-${direction}__content`}
          style={{ ...bodyStyle, ...style }}
        >
          <View className={`${classPrefix}__item-${direction}__content__title`}>
            {titleComponent}
          </View>

          {descriptionComponent && (
            <View
              className={`${classPrefix}__item-${direction}__content__description`}
            >
              {descriptionComponent}
            </View>
          )}
        </View>
      </View>
    );
  }
}

Step.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Step };
