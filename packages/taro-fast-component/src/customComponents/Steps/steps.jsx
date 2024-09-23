import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

import { Step } from './step';

const classPrefix = `tfc-steps`;

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  direction: 'horizontal',
  itemStyle: null,
  list: [],
  listStatus: [],
  titleFontSize: 26,
  descriptionFontSize: 24,
  indicatorMarginRight: 0,
  iconSize: 18,
  titleBuilder: null,
  descriptionBuilder: null,
};

class Steps extends BaseComponent {
  getDirection = () => {
    const { direction } = this.props;

    return checkInCollection(directionCollection, direction)
      ? direction
      : 'horizontal';
  };

  getStyle = () => {
    const {
      titleFontSize,
      descriptionFontSize,
      indicatorMarginRight,
      iconSize,
      style,
    } = this.props;

    const direction = this.getDirection();

    let paddingStyle = {};

    switch (direction) {
      case 'horizontal': {
        paddingStyle = {
          paddingTop: transformSize(16),
          paddingRight: 0,
          paddingBottom: transformSize(16),
          paddingLeft: 0,
        };

        break;
      }

      case 'vertical': {
        paddingStyle = {
          paddingTop: transformSize(16),
          paddingRight: transformSize(32),
          paddingBottom: transformSize(16),
          paddingLeft: transformSize(32),
        };

        break;
      }

      default: {
        break;
      }
    }

    return {
      '--title-font-size': transformSize(titleFontSize),
      '--description-font-size': transformSize(descriptionFontSize),
      '--indicator-margin-right': transformSize(indicatorMarginRight),
      '--icon-size': transformSize(iconSize),
      ...paddingStyle,
      ...style,
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

  // buildListStatus = () => {
  //   const { listStatus } = this.props;

  //   const listStatusData = isArray(listStatus) ? listStatus : [];

  //   return listStatusData;
  // };

  buildList = () => {
    const { list } = this.props;

    const listData = isArray(list) ? list : [];

    return listData;

    // const listStatus = this.buildListStatus();
    // const count = listData.length;
    // const statusCount = listStatus.length;

    // const result = [];

    // let statusPrevious = '';

    // for (const [index, item] of listData.entries()) {
    //   let status =
    //     count <= statusCount
    //       ? listStatus[index]
    //       : index <= statusCount
    //         ? listStatus[index]
    //         : '';

    //   if (checkStringIsNullOrWhiteSpace(status)) {
    //     status = statusPrevious === 'finish' ? 'process' : 'wait';
    //   }

    //   statusPrevious = status;

    //   delete item.status;

    //   result.push({ ...item, status });
    // }

    // return result;
  };

  buildItem = ({
    title = '',
    description = '',
    icon,
    status = 'wait',
    index,
    direction,
    data = null,
    style = null,
  }) => {
    const { titleBuilder, descriptionBuilder, itemStyle } = this.props;

    return (
      <Step
        key={`${this.keyPrefix}_${index}`}
        title={title || ''}
        description={description || ''}
        icon={icon || this.getIcon(status)}
        status={status || 'wait'}
        direction={direction}
        data={data}
        style={style || null}
        bodyStyle={itemStyle || null}
        titleBuilder={titleBuilder}
        descriptionBuilder={descriptionBuilder}
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
            status: checkStringIsNullOrWhiteSpace(statusSource)
              ? 'wait'
              : statusSource,
            index,
            direction,
            data: item,
          });
        })}

        {children || null}
      </View>
    );
  }
}

Steps.Step = Step;

Steps.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Steps };
