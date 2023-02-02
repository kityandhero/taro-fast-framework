import { View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';

import {
  checkInCollection,
  notificationTypeCollection,
} from 'easy-soft-utility';

import { transformSize } from '../../utils/styleAssist';
import { AbstractComponent } from '../AbstractComponent';

const typeCollection = ['info', 'success', 'error', 'warning'];

const defaultProps = {
  style: {},
  className: '',
  message: '',
  type: '',
  duration: 3000,
};

const styleInit = {
  animation: 'ease both',
  background: '#78a4fa',
  boxSizing: 'border-box',
  color: '#fff',
  fontSize: transformSize(28),
  left: '0',
  lineHeight: '1.5',
  opacity: '0',
  padding: `${transformSize(12)} ${transformSize(20)}`,
  position: 'fixed',
  right: '0',
  textAlign: 'center',
  top: '0',
  transform: 'translate3d(0, -100%, 0)',
  transition: 'all 0.3s cubic-bezier(0.47, 0, 0.745, 0.715)',
  width: '100%',
  zIndex: '1010',
};

const styleOpen = {
  background: '#CCCCCC',
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

class Notification extends AbstractComponent {
  currentInstance = getCurrentInstance();

  timer = null;

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      styleStage: {},
      classNameStage: defaultProps.className,
      messageStage: '',
      typeStage: defaultProps.type,
      durationTime: defaultProps.duration,
    };

    this.timer = null;
  }

  bindMessageListener = () => {
    Taro.eventCenter.on('tfc-message', (options = {}) => {
      const { style, className, message, type: typeSource, duration } = options;

      const type = checkInCollection(typeCollection, typeSource)
        ? typeSource
        : defaultProps.type;

      const newState = {
        show: true,
        styleStage: style,
        classNameStage: className,
        messageStage: message,
        typeStage: type,
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

    Taro.notifyMessage = Taro.eventCenter.trigger.bind(
      Taro.eventCenter,
      'tfc-message',
    );
  };

  unbindMessageListener = () => {
    Taro.eventCenter.off('tfc-message');
  };

  componentDidMount() {
    const onShowEventId = this.currentInstance.router.onShow;
    const onHideEventId = this.currentInstance.router.onHide;

    Taro.eventCenter.on(onShowEventId, this.bindMessageListener);
    Taro.eventCenter.on(onHideEventId, this.unbindMessageListener);
  }

  componentWillUnmount() {
    this.unbindMessageListener();
  }

  render() {
    const { styleStage, classNameStage, messageStage, show, typeStage } =
      this.state;

    let styleBackground = styleInfo;

    switch (typeStage) {
      case notificationTypeCollection.open:
        styleBackground = styleOpen;
        break;

      case notificationTypeCollection.loading:
        styleBackground = styleOpen;
        break;

      case notificationTypeCollection.warn:
        styleBackground = styleWarning;
        break;

      case notificationTypeCollection.warning:
        styleBackground = styleWarning;
        break;

      case notificationTypeCollection.success:
        styleBackground = styleSuccess;
        break;

      case notificationTypeCollection.error:
        styleBackground = styleError;
        break;

      default:
        styleBackground = styleInfo;
        break;
    }

    const style = {
      ...styleInit,
      ...(show ? styleShow : styleHidden),
      ...styleBackground,
      ...styleStage,
    };

    return (
      <View className={classNameStage} style={style}>
        {messageStage}
      </View>
    );
  }
}

Notification.defaultProps = {
  ...AbstractComponent.defaultProps,
  ...defaultProps,
};

export { Notification };
