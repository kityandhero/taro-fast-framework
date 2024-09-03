import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction, isNumber } from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-fade-in-box`;

const defaultProps = {
  duration: 300,
  style: {},
  onClick: null,
};

class FadeInBox extends BaseComponent {
  fadeInAnimation = null;

  constructor(properties) {
    super(properties);

    const { duration } = this.props;

    this.state = {
      ...this.state,
      animalStyle: isNumber(duration)
        ? { '--animation-duration': `${duration}ms` }
        : {},
    };
  }

  triggerClick = (value, event) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(value, event);
    }
  };

  renderFurther() {
    const { animalStyle } = this.state;
    const { style, children } = this.props;

    return (
      <View
        className={classNames(classPrefix)}
        style={{ ...style, ...animalStyle }}
        onClick={this.triggerClick}
      >
        {children}
      </View>
    );
  }
}

FadeInBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { FadeInBox };
