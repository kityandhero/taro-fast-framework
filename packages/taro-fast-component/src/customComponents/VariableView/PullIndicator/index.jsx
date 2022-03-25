import classNames from 'classnames';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';

import { createAnimation, inCollection } from 'taro-fast-common/es/utils/tools';
import { isUndefined } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../../BaseComponent';

import CenterBox from '../../CenterBox';
import Icon from '../../Icon';
import Transition from '../../Transition';
import ActivityIndicator from '../../ActivityIndicator';

import './index.less';

const classPrefix = `tfc-pull-indicator`;

const { IconLoading, IconLoading3 } = Icon;

const refreshingBoxEffectCollection = ['pull', 'scale'];

const defaultProps = {
  className: '',
  enablePullDownRefresh: false,
  useCustomPullDown: false,
  useRefreshingBox: false,
  refreshing: false,
  maxMove: 0,
  refreshingBoxEffect: 'pull',
  refreshingBox: null,
};

class PullIndicator extends BaseComponent {
  refreshBoxAnimation = null;

  refreshBoxPreloadAnimation = null;

  pullAnimalStep = 8;

  currentPullAnimalStep = 1;

  currentMove = 0;

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

  getRefreshingBoxEffect = () => {
    const { refreshingBoxEffect } = this.props;

    return inCollection(refreshingBoxEffectCollection, refreshingBoxEffect)
      ? refreshingBoxEffect
      : 'pull';
  };

  bindMessageListener = () => {
    Taro.eventCenter.on('tfc-pull-indicator', (options = {}) => {
      const { maxMoveY, moveY, rotate, needRefresh } = options;
      const { needRefresh: needRefreshPrev } = this.state;

      this.maxMoveY = maxMoveY;

      const refreshingBoxEffect = this.getRefreshingBoxEffect();

      if (moveY === 0) {
        this.currentPullAnimalStep = 1;
        this.currentMove = 0;

        this.setState({
          ...{
            refreshBoxAnimationData:
              refreshingBoxEffect !== 'scale'
                ? this.refreshBoxAnimation.translateY(moveY).step().export()
                : this.refreshBoxAnimation
                    .scale(moveY / maxMoveY)
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
          this.currentMove = moveY;

          this.setState({
            ...{
              refreshBoxAnimationData:
                refreshingBoxEffect !== 'scale'
                  ? this.refreshBoxAnimation.translateY(moveY).step().export()
                  : this.refreshBoxAnimation
                      .scale(moveY / maxMoveY)
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

  renderFurther() {
    const {
      className,
      enablePullDownRefresh,
      useCustomPullDown,
      useRefreshingBox,
      refreshing,
      maxMove,
    } = this.props;
    const {
      refreshBoxAnimationData,
      needRefresh,
      refreshBoxPreloadAnimationData,
    } = this.state;

    const refreshingBoxEffect = this.getRefreshingBoxEffect();

    return (
      <View className={className}>
        {enablePullDownRefresh && useCustomPullDown ? (
          <View
            className={classNames(`${classPrefix}__refresh-box`, {
              [`${classPrefix}__refresh-box--scale`]:
                refreshingBoxEffect === 'scale',
            })}
            animation={refreshBoxAnimationData}
            style={
              refreshingBoxEffect !== 'scale'
                ? {}
                : {
                    top: `${maxMove}px`,
                  }
            }
          >
            <View
              className={classNames(
                `${classPrefix}__refresh-box__pull-refresh`,
              )}
            >
              <CenterBox>
                {needRefresh && this.currentMove === maxMove ? (
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
                ) : (
                  <View
                    className={classNames(
                      `${classPrefix}__refresh-box__pull-refresh__iconBox`,
                    )}
                    animation={refreshBoxPreloadAnimationData}
                  >
                    <IconLoading3 size={46} />
                  </View>
                )}
              </CenterBox>
            </View>
          </View>
        ) : null}

        <Transition
          show={refreshing && useRefreshingBox}
          className={classNames(`${classPrefix}__refreshing-box`)}
          name="fade"
        >
          <View className={classNames(`${classPrefix}__refreshing-box__inner`)}>
            {this.buildRefreshingBox()}
          </View>
        </Transition>
      </View>
    );
  }
}

PullIndicator.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default PullIndicator;
