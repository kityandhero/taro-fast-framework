import classNames from 'classnames';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import { createAnimation } from 'taro-fast-common/es/utils/tools';
import { isUndefined } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../../BaseComponent';

import CenterBox from '../../CenterBox';
import Icon from '../../Icon';
import Transition from '../../Transition';
import ActivityIndicator from '../../ActivityIndicator';

import './index.less';

const classPrefix = `tfc-pull-indicator`;

const { IconLoading, IconLoading3 } = Icon;

class PullIndicator extends BaseComponent {
  refreshBoxAnimation = null;

  refreshBoxPreloadAnimation = null;

  pullAnimalStep = 8;

  currentPullAnimalStep = 1;

  constructor(props) {
    super(props);

    this.refreshBoxAnimation = createAnimation({
      duration: 300,
      timingFunction: 'linear',
    });

    this.refreshBoxPreloadAnimation = createAnimation({
      duration: 300,
      timingFunction: 'linear',
    });

    this.state = {
      refreshBoxAnimationData: this.refreshBoxAnimation.export(),
      refreshBoxPreloadAnimationData: this.refreshBoxPreloadAnimation.export(),
    };
  }

  bindMessageListener = () => {
    Taro.eventCenter.on('tfc-pull-indicator', (options = {}) => {
      const { maxMoveY, moveY, rotate, needRefresh } = options;
      const { needRefresh: needRefreshPrev } = this.state;

      if (moveY === 0) {
        this.currentPullAnimalStep = 1;

        this.setState({
          ...{
            refreshBoxAnimationData: this.refreshBoxAnimation
              .translateY(moveY)
              .step()
              .export(),
            refreshBoxPreloadAnimationData: this.refreshBoxPreloadAnimation
              .rotate(rotate)
              .step()
              .export(),
          },
          ...(isUndefined(needRefresh) ? {} : { needRefresh }),
        });
      } else {
        const nextStep = Math.ceil(moveY / (maxMoveY / this.pullAnimalStep));

        if (
          this.currentPullAnimalStep != nextStep ||
          (!isUndefined(needRefresh) && needRefreshPrev != needRefresh)
        ) {
          this.currentPullAnimalStep = nextStep;

          this.setState({
            ...{
              refreshBoxAnimationData: this.refreshBoxAnimation
                .translateY(moveY)
                .step()
                .export(),
              refreshBoxPreloadAnimationData: this.refreshBoxPreloadAnimation
                .rotate(rotate)
                .step()
                .export(),
            },
            ...(isUndefined(needRefresh) ? {} : { needRefresh }),
          });
        }
      }
    });

    Taro.changePullIndicator = Taro.eventCenter.trigger.bind(
      Taro.eventCenter,
      'tfc-pull-indicator',
    );
  };

  componentDidShow() {
    this.bindMessageListener();
  }

  componentDidMount() {
    this.bindMessageListener();
  }

  componentDidHide() {
    Taro.eventCenter.off('tfc-pull-indicator');
  }

  componentWillUnmount() {
    Taro.eventCenter.off('tfc-pull-indicator');
  }

  buildRefreshingBox = () => {
    const { refreshingBox } = this.props;

    return (
      refreshingBox || (
        <CenterBox>
          <View
            className={classNames(
              `${classPrefix}__refreshing-box__inner__refreshing`,
            )}
          >
            <ActivityIndicator
              className={classNames(
                `${classPrefix}__refreshing-box__inner__refreshing__inner`,
              )}
              content="加载中"
            />
          </View>
        </CenterBox>
      )
    );
  };

  render() {
    const {
      className,
      enablePullDownRefresh,
      useCustomPullDown,
      useRefreshingBox,
      refreshing,
    } = this.props;
    const {
      refreshBoxAnimationData,
      needRefresh,
      refreshBoxPreloadAnimationData,
    } = this.state;

    return (
      <View className={className}>
        {useCustomPullDown ? (
          <View
            className={classNames(`${classPrefix}__refresh-box`)}
            animation={refreshBoxAnimationData}
          >
            <View
              className={classNames(
                `${classPrefix}__refresh-box__pull-refresh`,
              )}
            >
              <CenterBox>
                {!needRefresh ? (
                  <View
                    className={classNames(
                      `${classPrefix}__refresh-box__pull-refresh__iconBox`,
                    )}
                    animation={refreshBoxPreloadAnimationData}
                  >
                    <IconLoading3 size={46} />
                  </View>
                ) : null}

                {needRefresh ? (
                  <View
                    className={classNames(
                      `${classPrefix}__refresh-box__pull-refresh__iconBox`,
                    )}
                  >
                    <IconLoading
                      className={classNames(
                        `${classPrefix}__refresh-box__pull-refresh__iconBox__icon`,
                      )}
                      size={42}
                      borderWidth={2}
                    />
                  </View>
                ) : null}
              </CenterBox>
            </View>
          </View>
        ) : null}

        {enablePullDownRefresh ? (
          <Transition
            show={refreshing && useRefreshingBox}
            className={classNames(`${classPrefix}__refreshing-box`)}
          >
            <View
              className={classNames(`${classPrefix}__refreshing-box__inner`)}
            >
              {this.buildRefreshingBox()}
            </View>
          </Transition>
        ) : null}
      </View>
    );
  }
}

export default PullIndicator;
