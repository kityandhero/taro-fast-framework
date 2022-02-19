import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-fade-in-box`;

const defaultProps = {
  duration: 200,
  style: {},
};

class FadeInBox extends BaseComponent {
  constructor(props) {
    super(props);

    const { duration } = props;

    this.state = {
      ...this.state,
      ...{
        transitionStyle: {
          transition: `opacity ${duration}ms`,
        },
        completeStyle: {},
      },
    };
  }

  doWorkAdjustDidMount = () => {
    this.setState({
      completeStyle: { opacity: '1' },
    });
  };

  triggerClick = (value, e) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(value, e);
    }
  };

  renderFurther() {
    const { transitionStyle, completeStyle } = this.state;
    const { style, children } = this.props;

    const styleAdjust = { ...style, ...transitionStyle, ...completeStyle };

    return (
      <View
        className={classNames(classPrefix)}
        style={styleAdjust}
        onClick={this.triggerClick}
      >
        {children}
      </View>
    );
  }
}

FadeInBox.defaultProps = {
  ...defaultProps,
};

export default FadeInBox;
