import classNames from 'classnames';
import { ScrollView, View } from '@tarojs/components';

import {
  createAnimation,
  createSelectorQuery,
  getGuid,
  getRect,
  stringIsNullOrWhiteSpace,
  getSystemInfo,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import Icon from '../Icon';
import CenterBox from '../CenterBox';
import ActivityIndicator from '../ActivityIndicator';
import Transition from '../Transition';
import { Empty } from '../Empty';

import './index.less';

const classPrefix = `tfc-variable-view`;

const { IconLoading, IconLoading3 } = Icon;

const defaultProps = {
  scroll: false,
  height: '',
  enablePullDownRefresh: false,
  useCustomPullDown: false,
  scrollRefresherThreshold: 100,
  scrollRefresherDefaultStyle: '',
  scrollRefresherBackground: '',
  refreshColor: '',
  refreshBackgroundColor: '',
  refreshingBackgroundColor: '#dbd9d9',
  refreshingBorder: '0',
  scrollWithAnimation: true,
  scrollAnchoring: true,
  scrollEnhanced: true,
  scrollBounces: true,
  scrollShowScrollbar: false,
  scrollFastDeceleration: false,
  refreshing: false,
  lowerLoading: false,
  lowerLoadingBackgroundColor: '#dbd9d9',
  lowerLoadingBorder: '0',
  useLoadingBox: true,
  scrollLoadingBox: null,
  useScrollEmptyPlaceholder: true,
  showScrollEmptyPlaceholder: true,
  scrollEmptyPlaceholder: null,
  onReload: null,
  onScrollLowerLoad: null,
};

class VariableView extends BaseComponent {
  refreshBoxAnimation = null;

  refreshBoxPreloadAnimation = null;

  refreshBoxInitTop = -100;

  touchStartY = 0;

  touchEndY = 0;

  prepareRefresh = false;

  refreshBoxHeight = 0;

  /**
   *手指下拉操作记录
   */
  touchMoveMaxY = 400;

  /**
   *下拉时的距离折算比例
   */
  calculatePercentage = 5;

  scrollRefresherFreshing = false;

  refreshBoxId = '';

  scrollViewId = '';

  constructor(props) {
    super(props);

    const { screenHeight } = getSystemInfo();

    this.state = {
      ...this.state,
      refreshBoxAnimationData: null,
      refreshBoxPreloadAnimationData: null,
      showRefreshBackgroundBox: false,
      scrollRefreshTriggered: false,
    };

    this.refreshBoxId = getGuid();
    this.scrollViewId = getGuid();
    this.touchMoveMaxY = (screenHeight * 3) / 5;
    this.calculatePercentage = this.touchMoveMaxY / 80;
  }

  doWorkAdjustDidMount = () => {
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
      return;
    }

    const that = this;

    setTimeout(() => {
      that.adjustView();
    }, 400);
  };

  onViewTouchStart = (e) => {
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
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
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
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
        this.refreshBoxAnimation
          .translateY(moveY / this.calculatePercentage)
          .step();
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
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
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
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
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

  onScrollRefresherRefresh = () => {
    if (this.scrollRefresherFreshing) return;

    this.scrollRefresherFreshing = true;

    this.setState({
      scrollRefreshTriggered: true,
    });

    const { onReload } = this.props;

    if (isFunction(onReload)) {
      onReload();
    }

    const that = this;

    setTimeout(() => {
      that.setState({
        scrollRefreshTriggered: false,
      });

      that.scrollRefresherFreshing = false;
    }, 1000);
  };

  onScrollToLower = () => {
    const { onScrollLowerLoad } = this.props;

    if (isFunction(onScrollLowerLoad)) {
      onScrollLowerLoad();
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

  buildScrollEmptyPlaceholder = () => {
    const {
      useScrollEmptyPlaceholder,
      showScrollEmptyPlaceholder,
      scrollEmptyPlaceholder,
    } = this.props;

    if (!useScrollEmptyPlaceholder) {
      return null;
    }

    if (!showScrollEmptyPlaceholder) {
      return null;
    }

    return (
      <CenterBox>
        {scrollEmptyPlaceholder || <Empty description="暂无数据" />}
      </CenterBox>
    );
  };

  buildLoadingBox = () => {
    const { scrollLoadingBox } = this.props;

    return (
      scrollLoadingBox || (
        <CenterBox>
          <View
            className={classNames(
              `${classPrefix}__refreshingBox__inner__refreshing`,
            )}
          >
            <ActivityIndicator mode="center" content="Loading" />
          </View>
        </CenterBox>
      )
    );
  };

  buildLowerLoadingBox = () => {
    const { scrollLoadingBox } = this.props;

    return (
      scrollLoadingBox || (
        <CenterBox>
          <View
            className={classNames(
              `${classPrefix}__lowerLoadingBox__inner__lowerLoading`,
            )}
          >
            <ActivityIndicator mode="center" content="Loading" />
          </View>
        </CenterBox>
      )
    );
  };

  checkUseCustomPullDown = () => {
    const { enablePullDownRefresh, useCustomPullDown } = this.props;

    return !!enablePullDownRefresh && !!useCustomPullDown;
  };

  renderFurther() {
    const {
      scroll,
      height,
      enablePullDownRefresh,
      scrollRefresherThreshold,
      scrollRefresherDefaultStyle,
      scrollRefresherBackground,
      useCustomPullDown,
      refreshColor,
      refreshBackgroundColor,
      refreshingBackgroundColor,
      refreshingBorder,
      scrollWithAnimation,
      scrollAnchoring,
      scrollEnhanced,
      scrollBounces,
      scrollShowScrollbar,
      scrollFastDeceleration,
      refreshing,
      lowerLoading,
      lowerLoadingBackgroundColor,
      lowerLoadingBorder,
      useLoadingBox,
      children,
    } = this.props;
    const { scrollRefreshTriggered } = this.state;

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
            minHeight: height,
          }
        : {
            height: height,
          }),
      ...(stringIsNullOrWhiteSpace(refreshColor)
        ? {}
        : { '--refresh-color': refreshColor }),
      ...(stringIsNullOrWhiteSpace(refreshBackgroundColor)
        ? {}
        : { '--refresh-background-color': refreshBackgroundColor }),
      ...(stringIsNullOrWhiteSpace(refreshingBackgroundColor)
        ? {}
        : { '--refreshing-background-color': refreshingBackgroundColor }),
      ...(stringIsNullOrWhiteSpace(refreshingBorder)
        ? {}
        : { '--refreshing-border': `${refreshingBorder}` }),

      ...(stringIsNullOrWhiteSpace(lowerLoadingBackgroundColor)
        ? {}
        : { '--lower-loading-background-color': lowerLoadingBackgroundColor }),
      ...(stringIsNullOrWhiteSpace(lowerLoadingBorder)
        ? {}
        : { '--lower-loading-border': `${lowerLoadingBorder}` }),
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

          <Transition
            show={refreshing && useLoadingBox}
            className={classNames(`${classPrefix}__refreshingBox`)}
          >
            <View
              className={classNames(`${classPrefix}__refreshingBox__inner`)}
            >
              {this.buildLoadingBox()}
            </View>
          </Transition>

          <Transition
            show={lowerLoading}
            className={classNames(`${classPrefix}__lowerLoadingBox`)}
          >
            <View
              className={classNames(`${classPrefix}__lowerLoadingBox__inner`)}
            >
              {this.buildLowerLoadingBox()}
            </View>
          </Transition>

          <ScrollView
            id={this.scrollViewId || ''}
            className={classNames(`${classPrefix}__scrollView`)}
            refresherEnabled={!!enablePullDownRefresh && !useCustomPullDown}
            refresherThreshold={scrollRefresherThreshold}
            refresherDefaultStyle={scrollRefresherDefaultStyle || ''}
            refresherBackground={scrollRefresherBackground || ''}
            refresherTriggered={scrollRefreshTriggered}
            scrollY
            scrollTop={scrollTopTarget}
            lowerThreshold={80}
            onScrollToLower={this.onScrollToLower}
            scrollWithAnimation={scrollWithAnimation}
            scrollAnchoring={scrollAnchoring}
            enhanced={scrollEnhanced}
            bounces={scrollBounces}
            showScrollbar={scrollShowScrollbar}
            fastDeceleration={scrollFastDeceleration}
            onRefresherRefresh={this.onScrollRefresherRefresh}
          >
            <View>
              {this.buildScrollEmptyPlaceholder()}

              {children}
            </View>
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
