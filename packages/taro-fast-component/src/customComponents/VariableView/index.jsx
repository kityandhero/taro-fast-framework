import classNames from 'classnames';
import { ScrollView, View } from '@tarojs/components';

import {
  createAnimation,
  createSelectorQuery,
  getGuid,
  getRect,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import Icon from '../Icon';
import CenterBox from '../CenterBox';

import './index.less';

const classPrefix = `tfc-variable-view`;

const { IconLoading, IconLoading3 } = Icon;

const defaultProps = {
  scroll: false,
  height: '',
  refreshColor: '',
  refreshBackgroundColor: '',
};

class VariableView extends BaseComponent {
  refreshBoxAnimation = null;
  refreshBoxPreloadAnimation = null;
  refreshBoxInitTop = -100;
  touchStartY = 0;
  touchEndY = 0;
  prepareRefresh = false;
  refreshBoxHeight = 0;
  touchMoveMaxY = 80;

  refreshBoxId = '';
  scrollViewId = '';

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      refreshBoxAnimationData: null,
      refreshBoxPreloadAnimationData: null,
      showRefreshBackgroundBox: false,
    };

    this.refreshBoxId = getGuid();
    this.scrollViewId = getGuid();
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    setTimeout(() => {
      that.adjustView();
    }, 400);
  };

  onViewTouchStart = (e) => {
    const { enablePullDownRefresh: enablePullDownRefreshValue } = this.props;

    const enablePullDownRefresh = enablePullDownRefreshValue || false;

    if (!enablePullDownRefresh) {
      return;
    }

    createSelectorQuery()
      .select(`#${this.scrollViewId}`)
      .scrollOffset((rect) => {
        const { scrollTop } = rect;

        if (scrollTop === 0) {
          this.prepareRefresh = true;

          this.touchStartY = e.touches[0].pageY;
        }
      })
      .exec();
  };

  onViewTouchMove = (e) => {
    const { enablePullDownRefresh: enablePullDownRefreshValue } = this.props;

    const enablePullDownRefresh = enablePullDownRefreshValue || false;

    if (!enablePullDownRefresh) {
      return;
    }

    if (this.prepareRefresh) {
      this.touchEndY = e.touches[0].pageY;

      let moveY = this.touchEndY - this.touchStartY;

      if (moveY > 0) {
        const { showRefreshBackgroundBox } = this.state;

        if (!showRefreshBackgroundBox) {
          this.setState({ showRefreshBackgroundBox: true });
        }
      }

      moveY = moveY > this.touchMoveMaxY ? this.touchMoveMaxY : moveY;

      if (moveY === this.touchMoveMaxY) {
        this.setState({ needRefresh: true });
      }

      if (moveY < this.touchMoveMaxY) {
        this.setState({ needRefresh: false });
      }

      if (this.refreshBoxAnimation != null) {
        this.refreshBoxAnimation.translateY(moveY).step();
        this.refreshBoxPreloadAnimation
          .rotate((moveY / this.touchMoveMaxY) * 360)
          .step();

        this.setState({
          refreshBoxAnimationData: this.refreshBoxAnimation.export(),
          refreshBoxPreloadAnimationData:
            this.refreshBoxPreloadAnimation.export(),
        });
      }
    }
  };

  onViewTouchCancel = () => {
    const { enablePullDownRefresh: enablePullDownRefreshValue } = this.props;

    const enablePullDownRefresh = enablePullDownRefreshValue || false;

    if (!enablePullDownRefresh) {
      return;
    }

    if (this.prepareRefresh) {
      if (this.refreshBoxAnimation != null) {
        this.refreshBoxAnimation.translateY(0).step();
        this.refreshBoxPreloadAnimation.rotate(0).step();

        this.setState({
          showRefreshBackgroundBox: false,
          refreshBoxAnimationData: this.refreshBoxAnimation.export(),
          refreshBoxPreloadAnimationData:
            this.refreshBoxPreloadAnimation.export(),
        });
      } else {
        this.setState({ showRefreshBackgroundBox: false });
      }

      this.prepareRefresh = false;
    }
  };

  onViewTouchEnd = () => {
    const { enablePullDownRefresh: enablePullDownRefreshValue } = this.props;

    const enablePullDownRefresh = enablePullDownRefreshValue || false;

    if (!enablePullDownRefresh) {
      return;
    }

    if (this.prepareRefresh) {
      const { needRefresh } = this.state;

      if (needRefresh) {
        const { onReload } = this.props;

        if (isFunction(onReload)) {
          onReload();

          this.setState({ needRefresh: false });
        }
      }

      if (this.refreshBoxAnimation != null) {
        this.refreshBoxAnimation.translateY(0).step();
        this.refreshBoxPreloadAnimation.rotate(0).step();

        this.setState({
          showRefreshBackgroundBox: false,
          refreshBoxAnimationData: this.refreshBoxAnimation.export(),
          refreshBoxPreloadAnimationData:
            this.refreshBoxPreloadAnimation.export(),
        });
      } else {
        this.setState({ showRefreshBackgroundBox: false });
      }

      this.prepareRefresh = false;
    }
  };

  onScrollToLower = () => {
    const { onLoadMore } = this.props;

    if (isFunction(onLoadMore)) {
      onLoadMore();
    }
  };

  adjustView = () => {
    const { scroll } = this.props;

    if (scroll) {
      this.refreshBoxAnimation = createAnimation({
        duration: 300,
        timingFunction: 'linear',
      });

      this.refreshBoxPreloadAnimation = createAnimation({
        duration: 300,
        timingFunction: 'linear',
      });

      this.setState(
        {
          refreshBoxAnimationData: this.refreshBoxAnimation.export(),
          refreshBoxPreloadAnimationData:
            this.refreshBoxPreloadAnimation.export(),
        },
        () => {
          const that = this;

          getRect(`#${this.refreshBoxId}`).then((rect) => {
            if (rect != null) {
              const { height: refreshBoxHeight } = rect;
              that.refreshBoxHeight = refreshBoxHeight;
              that.touchMoveMaxY = that.touchMoveMaxY + refreshBoxHeight;
            }
          });
        },
      );
    }
  };

  renderFurther() {
    const { scroll, height, refreshColor, refreshBackgroundColor, children } =
      this.props;

    const {
      scrollTopTarget,
      refreshBoxAnimationData,
      refreshBoxPreloadAnimationData,
      needRefresh,
    } = this.state;

    const style = {
      ...(stringIsNullOrWhiteSpace(height)
        ? {}
        : !scroll
        ? {
            height: height,
          }
        : {
            minHeight: height,
          }),
      ...(stringIsNullOrWhiteSpace(refreshColor)
        ? {}
        : { '--refresh-color': refreshColor }),
      ...(stringIsNullOrWhiteSpace(refreshBackgroundColor)
        ? {}
        : { '--refresh-background-color': refreshBackgroundColor }),
    };

    if (scroll) {
      return (
        <View
          className={classNames(classPrefix)}
          style={style}
          onTouchStart={this.onViewTouchStart}
          onTouchMove={this.onViewTouchMove}
          onTouchCancel={this.onViewTouchCancel}
          onTouchEnd={this.onViewTouchEnd}
        >
          <View
            id={this.refreshBoxId || ''}
            className={classNames(`${classPrefix}__refreshBox`)}
            animation={refreshBoxAnimationData}
          >
            <View
              className={classNames(`${classPrefix}__refreshBox__pullRefresh`)}
            >
              <CenterBox>
                {!needRefresh ? (
                  <View
                    className={classNames(
                      `${classPrefix}__refreshBox__pullRefresh__iconBox`,
                    )}
                    animation={refreshBoxPreloadAnimationData}
                  >
                    <IconLoading3 size={46} />
                  </View>
                ) : null}

                {needRefresh ? (
                  <View
                    className={classNames(
                      `${classPrefix}__refreshBox__pullRefresh__iconBox`,
                    )}
                  >
                    <IconLoading
                      className={classNames(
                        `${classPrefix}__refreshBox__pullRefresh__iconBox__icon`,
                      )}
                      size={42}
                      borderWidth={2}
                    />
                  </View>
                ) : null}
              </CenterBox>
            </View>
          </View>

          <ScrollView
            id={this.scrollViewId || ''}
            className={classNames(`${classPrefix}__scrollView`)}
            scrollY
            scrollTop={scrollTopTarget}
            lowerThreshold={80}
            onScrollToLower={this.onScrollToLower}
          >
            <View>{children}</View>
          </ScrollView>
        </View>
      );
    }

    return (
      <View
        style={{
          minHeight: height,
        }}
      >
        {children}
      </View>
    );
  }
}

VariableView.defaultProps = {
  ...defaultProps,
};

export default VariableView;
