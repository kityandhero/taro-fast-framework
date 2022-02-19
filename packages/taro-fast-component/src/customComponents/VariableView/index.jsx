import classNames from 'classnames';
import { ScrollView, View } from '@tarojs/components';

import {
  createAnimation,
  createSelectorQuery,
  getGuid,
  getRect,
  stringIsNullOrWhiteSpace,
  getSystemInfo,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import Icon from '../Icon';
import CenterBox from '../CenterBox';
import ActivityIndicator from '../ActivityIndicator';
import Transition from '../Transition';
import { Empty } from '../Empty';
import Divider from '../Divider';
import FlexBox from '../FlexBox';
import FadeInBox from '../FadeInBox';

import './index.less';

const classPrefix = `tfc-variable-view`;

const { IconLoading, IconLoading3 } = Icon;

const defaultProps = {
  scroll: false,
  height: '',
  enablePullDownRefresh: false,
  refreshing: false,
  enableCustomPullDown: false,
  enableScrollLowerLoad: false,
  enableEmptyPlaceholder: false,
  enableInitialActivityIndicator: false,
  useRefreshingBox: true,
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
  lowerLoading: false,
  lowerLoadingBackgroundColor: '#dbd9d9',
  lowerLoadingBorder: '0',
  lowerLoadingSuspendBox: null,
  lowerLoadingFooterBox: null,
  lowerLoadingPosition: 'footer',
  needNextLoad: false,
  emptyPlaceholderVisible: false,
  emptyPlaceholder: null,
  initialActivityIndicatorVisible: false,
  upperBox: null,
  style: {},
  onRefresh: null,
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
  touchMoveMaxY = 240;

  /**
   *下拉时的距离折算比例
   */
  calculatePercentage = 3;

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
    this.touchMoveMaxY = (screenHeight * 1) / 2;
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
        const { onRefresh } = this.props;

        if (isFunction(onRefresh)) {
          onRefresh();

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

    const { onRefresh } = this.props;

    if (isFunction(onRefresh)) {
      onRefresh();
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
    const { enableScrollLowerLoad, needNextLoad, onScrollLowerLoad } =
      this.props;

    if (!enableScrollLowerLoad) {
      return;
    }

    if (!needNextLoad) {
      return;
    }

    if (isFunction(onScrollLowerLoad)) {
      onScrollLowerLoad();
    }
  };

  adjustView = () => {
    const { enablePullDownRefresh, scroll } = this.props;

    if (!enablePullDownRefresh) {
      return;
    }

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
      enableEmptyPlaceholder,
      emptyPlaceholderVisible,
      emptyPlaceholder,
    } = this.props;

    if (!enableEmptyPlaceholder) {
      return null;
    }

    if (!emptyPlaceholderVisible) {
      return null;
    }

    return (
      <View style={{ margin: 'var(--tfc-20) 0' }}>
        <CenterBox>
          {emptyPlaceholder || <Empty description="暂无数据" />}
        </CenterBox>
      </View>
    );
  };

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

  /**
   * 构建外部加载提示组件
   * @returns
   */
  buildLowerLoadingSuspendBox = () => {
    const { lowerLoadingSuspendBox } = this.props;

    return (
      lowerLoadingSuspendBox || (
        <CenterBox>
          <View
            className={classNames(
              `${classPrefix}__lower-loading-box__inner__lower-loading`,
            )}
          >
            <ActivityIndicator
              className={classNames(
                `${classPrefix}__lower-loading-box__inner__lower-loading__inner`,
              )}
              content="加载中, 请稍后"
            />
          </View>
        </CenterBox>
      )
    );
  };

  /**
   * 构建底部加载提示组件
   * @param {*} lowerLoading
   * @param {*} needNextLoad
   * @returns
   */
  buildLowerLoadingFooterBox = (lowerLoading, needNextLoad) => {
    const { lowerLoadingFooterBox } = this.props;

    return (
      lowerLoadingFooterBox || (
        <Divider
          style={{
            marginLeft: 'var(--tfc-20))',
            marginRight: 'var(--tfc-20))',
          }}
        >
          {lowerLoading ? (
            <ActivityIndicator content="加载中" />
          ) : needNextLoad ? (
            '点击或上滑加载更多'
          ) : (
            '没有更多了'
          )}
        </Divider>
      )
    );
  };

  buildUpperBox = () => {
    const { upperBox } = this.props;

    return upperBox || null;
  };

  checkUseCustomPullDown = () => {
    const { enablePullDownRefresh, enableCustomPullDown } = this.props;

    return !!enablePullDownRefresh && !!enableCustomPullDown;
  };

  buildInitialActivityIndicator = () => {
    return (
      <FadeInBox duration={200} style={{ height: transformSize(340) }}>
        <CenterBox>
          <ActivityIndicator type="comet" content="加载中" />
        </CenterBox>
      </FadeInBox>
    );
  };

  renderFurther() {
    const {
      scroll,
      height,
      enablePullDownRefresh,
      enableScrollLowerLoad,
      enableCustomPullDown,
      enableInitialActivityIndicator,
      scrollRefresherThreshold,
      scrollRefresherDefaultStyle,
      scrollRefresherBackground,
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
      needNextLoad,
      lowerLoadingBackgroundColor,
      lowerLoadingBorder,
      lowerLoadingPosition,
      useRefreshingBox,
      initialActivityIndicatorVisible,
      style,
      children,
    } = this.props;
    const { scrollRefreshTriggered } = this.state;

    const {
      scrollTopTarget,
      refreshBoxAnimationData,
      refreshBoxPreloadAnimationData,
      needRefresh,
    } = this.state;

    const useCustomPullDown = this.checkUseCustomPullDown();

    const styleAdjust = {
      ...style,
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

    const upperBox = this.buildUpperBox();

    if (scroll) {
      const scrollViewMain = (
        <ScrollView
          id={this.scrollViewId || ''}
          className={classNames(`${classPrefix}__scrollView`)}
          style={upperBox ? { flex: 'flex: 1 1 auto' } : { height: '100%' }}
          refresherEnabled={!!enablePullDownRefresh && !enableCustomPullDown}
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
            {enableInitialActivityIndicator && initialActivityIndicatorVisible
              ? this.buildInitialActivityIndicator()
              : null}

            {this.buildScrollEmptyPlaceholder()}

            {children}

            {enableScrollLowerLoad &&
            lowerLoadingPosition !== 'absolute' &&
            lowerLoadingPosition !== 'fixed' ? (
              <View onClick={this.onScrollToLower}>
                {this.buildLowerLoadingFooterBox(lowerLoading, needNextLoad)}
              </View>
            ) : null}
          </View>
        </ScrollView>
      );

      return (
        <View
          className={classNames(classPrefix)}
          style={styleAdjust}
          onTouchStart={this.onViewTouchStart}
          onTouchMove={this.onViewTouchMove}
          onTouchCancel={this.onViewTouchCancel}
          onTouchEnd={this.onViewTouchEnd}
        >
          {useCustomPullDown ? (
            <View
              id={this.refreshBoxId || ''}
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

          {enableScrollLowerLoad &&
          (lowerLoadingPosition === 'absolute' ||
            lowerLoadingPosition === 'fixed') ? (
            <Transition
              show={lowerLoading}
              className={classNames(`${classPrefix}__lower-loading-box`, {
                [`${classPrefix}__lower-loading-box--absolute`]:
                  lowerLoadingPosition === 'absolute',
                [`${classPrefix}__lower-loading-box--fixed`]:
                  lowerLoadingPosition === 'fixed',
              })}
            >
              <View
                className={classNames(
                  `${classPrefix}__lower-loading-box__inner`,
                )}
              >
                {this.buildLowerLoadingSuspendBox()}
              </View>
            </Transition>
          ) : null}

          {upperBox ? (
            <View
              style={{
                height: '100%',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'stretch',
              }}
            >
              {upperBox}

              {scrollViewMain}
            </View>
          ) : (
            scrollViewMain
          )}

          <FlexBox
            direction="vertical"
            flexAuto="bottom"
            verticalHeight="100%"
            top={upperBox}
            bottom={scrollViewMain}
          />
        </View>
      );
    }

    return (
      <View
        style={{
          minHeight: height,
        }}
      >
        {enableInitialActivityIndicator && initialActivityIndicatorVisible
          ? this.buildInitialActivityIndicator()
          : null}

        {children}
      </View>
    );
  }
}

VariableView.defaultProps = {
  ...defaultProps,
};

export default VariableView;
