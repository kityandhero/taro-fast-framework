import { View } from '@tarojs/components';
import classNames from 'classnames';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import Step from './step';

const classPrefix = `tfc-steps`;

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  direction: 'horizontal',
  list: [],
  listStatus: [],
  titleFontSize: 26,
  descriptionFontSize: 24,
  indicatorMarginRight: 0,
  iconSize: 18,
};

class Steps extends BaseComponent {
  getDirection = () => {
    const { direction } = this.props;

    return inCollection(directionCollection, direction)
      ? direction
      : 'horizontal';
  };

  getStyle = () => {
    const {
      titleFontSize,
      descriptionFontSize,
      indicatorMarginRight,
      iconSize,
    } = this.props;

    return {
      ...{
        '--title-font-size': transformSize(titleFontSize),
        '--description-font-size': transformSize(descriptionFontSize),
        '--indicator-margin-right': transformSize(indicatorMarginRight),
        '--icon-size': transformSize(iconSize),
      },
    };
  };

  getIcon = (status) => {
    return (
      <View
        className={classNames(`${classPrefix}__item__icon__dot`, {
          [`${classPrefix}__item__icon__dot-processing`]: status === 'process',
        })}
      />
    );
  };

  buildListStatus = () => {
    const { listStatus } = this.props;

    const listStatusData = isArray(listStatus) ? listStatus : [];

    return listStatusData;
  };

  buildList = () => {
    const { list } = this.props;

    const listData = isArray(list) ? list : [];

    const listStatus = this.buildListStatus();
    const count = listData.length;
    const statusCount = listStatus.length;

    const result = [];

    let statusPrev = '';

    listData.forEach((item, index) => {
      let status =
        count <= statusCount
          ? listStatus[index]
          : index <= statusCount
          ? listStatus[index]
          : '';

      if (stringIsNullOrWhiteSpace(status)) {
        if (statusPrev === 'finish') {
          status = 'process';
        } else {
          status = 'wait';
        }
      }

      statusPrev = status;

      delete item.status;

      result.push({ ...item, ...{ status } });
    });

    return result;
  };

  buildItem = ({
    title = '',
    description = '',
    icon,
    status = 'wait',
    index,
  }) => {
    return (
      <Step
        key={`${this.keyPrefix}_${index}`}
        title={title || ''}
        description={description || ''}
        icon={icon || this.getIcon(status)}
        status={status || 'wait'}
      />
    );
  };

  renderFurther() {
    const { className, children } = this.props;

    const direction = this.getDirection();

    const classString = classNames(
      classPrefix,
      `${classPrefix}-${direction}`,
      className,
    );

    const style = this.getStyle();

    const list = this.buildList();

    return (
      <View className={classString} style={style}>
        {list.map((item, index) => {
          const {
            hidden,
            title,
            description,
            icon,
            status: statusSource,
          } = {
            ...Step.defaultProps,
            ...item,
          };

          if (hidden) {
            return null;
          }

          return this.buildItem({
            hidden,
            title,
            description,
            icon,
            status: !stringIsNullOrWhiteSpace(statusSource)
              ? statusSource
              : 'wait',
            index,
          });
        })}

        {children || null}
      </View>
    );
  }
}

Steps.defaultProps = {
  ...defaultProps,
};

export default Steps;
