import { View } from '@tarojs/components';
import classNames from 'classnames';

import { inCollection } from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

const classPrefix = `tfc-steps`;

const statusCollection = ['wait', 'process', 'finish', 'error'];

const defaultProps = {
  title: '',
  description: '',
  icon: null,
  direction: '',
};

class Step extends BaseComponent {
  getStatus = () => {
    const { status } = this.props;

    return inCollection(statusCollection, status) ? status : 'wait';
  };

  renderFurther() {
    const { title, description, icon, direction } = this.props;

    const status = this.getStatus();

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

        <View className={`${classPrefix}__item-${direction}__content`}>
          <View className={`${classPrefix}__item-${direction}__content__title`}>
            {title}
          </View>
          {!!description && (
            <View
              className={`${classPrefix}__item-${direction}__content__description`}
            >
              {description}
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

export default Step;
