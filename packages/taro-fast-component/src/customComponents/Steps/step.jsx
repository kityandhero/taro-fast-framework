import classNames from 'classnames';
import { View } from '@tarojs/components';

import { inCollection, transformSize } from 'taro-fast-common/es/utils/tools';

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
          style={
            direction === 'horizontal'
              ? { height: transformSize(24) }
              : { width: transformSize(48) }
          }
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
            style={
              direction === 'horizontal'
                ? { height: transformSize(2) }
                : { width: transformSize(2) }
            }
          />
        </View>

        <View
          className={`${classPrefix}__item-${direction}__content`}
          style={
            direction === 'horizontal'
              ? { paddingTop: transformSize(22) }
              : { paddingBottom: transformSize(28) }
          }
        >
          <View className={`${classPrefix}__item-${direction}__content__title`}>
            {title}
          </View>
          {!!description && (
            <View
              className={`${classPrefix}__item-${direction}__content__description`}
              style={
                direction === 'horizontal'
                  ? { marginTop: transformSize(8) }
                  : { paddingTop: transformSize(4) }
              }
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
