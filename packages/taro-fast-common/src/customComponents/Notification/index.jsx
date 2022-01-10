import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import { inCollection } from '../../utils/tools';
import ComponentBase from '../../customComponents/ComponentBase';

const typeCollection = ['info', 'success', 'error', 'warning'];

const defaultProps = {
  customStyle: '',
  className: '',
  message: '',
  type: '',
  duration: 3000,
};

const styleSource = {
  animation: 'ease both',
  background: '#78a4fa',
  boxSizing: 'border-box',
  color: '#fff',
  fontSize: ' 28rpx',
  left: '0',
  lineHeight: '1.5',
  opacity: '0',
  padding: '24rpx 20rpx',
  position: 'fixed',
  right: '0',
  textAlign: 'center',
  top: '0',
  transform: 'translate3d(0, -100%, 0)',
  transition: 'all 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)',
  width: '100%',
  zIndex: '1010',
};

const styleSuccess = {
  background: '#13ce66',
};

const styleError = {
  background: '#ff4949',
};

const styleWarning = {
  background: '#ffc82c',
};

const styleInfo = {
  background: '#78a4fa',
};

const styleShow = {
  opacity: 1,
  transform: 'translateZ(0)',
};

const styleHidden = {
  opacity: 0,
  transform: 'translate3d(0, -100%, 0)',
};

class Notification extends ComponentBase {
  timer = null;

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      messageText: '',
      typeValue: 'info',
      durationTime: 3000,
    };

    this.timer = null;
  }

  bindMessageListener = () => {
    Taro.eventCenter.on('tfc-message', (options = {}) => {
      const { message, type: typeSource, duration } = options;

      const type = inCollection(typeCollection, typeSource)
        ? typeSource
        : 'info';

      const newState = {
        show: true,
        messageText: message,
        typeValue: type,
        durationTime: duration || this.state.durationTime,
      };

      this.setState(newState, () => {
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
          this.setState({
            show: false,
          });
        }, this.state.durationTime);
      });
    });

    Taro.bannerNotify = Taro.eventCenter.trigger.bind(
      Taro.eventCenter,
      'tfc-message',
    );
  };

  componentDidShow() {
    this.bindMessageListener();
  }

  componentDidMount() {
    this.bindMessageListener();
  }

  componentDidHide() {
    Taro.eventCenter.off('tfc-message');
  }

  componentWillUnmount() {
    Taro.eventCenter.off('tfc-message');
  }

  render() {
    const { customStyle } = this.props;
    const { messageText, show, typeValue } = this.state;

    let styleBackground = styleInfo;

    switch (typeValue) {
      case 'success':
        styleBackground = styleSuccess;
        break;

      case 'error':
        styleBackground = styleError;
        break;

      case 'warning':
        styleBackground = styleWarning;
        break;

      default:
        styleBackground = styleInfo;
        break;
    }

    const style = {
      ...styleSource,
      ...(show ? styleShow : styleHidden),
      ...styleBackground,
      ...customStyle,
    };

    return <View style={style}>{messageText}</View>;
  }
}

Notification.defaultProps = {
  ...defaultProps,
};

export default Notification;
