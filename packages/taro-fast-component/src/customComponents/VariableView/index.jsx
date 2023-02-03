import classNames from 'classnames';
import { ScrollView, View } from '@tarojs/components';
import Taro from '@tarojs/taro';

import {
  checkStringIsNullOrWhiteSpace,
  getGuid,
  isFunction,
  logException,
} from 'easy-soft-utility';

import {
  createSelectorQuery,
  getRect,
  getSystemInfo,
  transformSize,
} from 'taro-fast-common';

import { ActivityIndicator } from '../ActivityIndicator';
import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';
import { Divider } from '../Divider';
import { Line } from '../Line';
import { Transition } from '../Transition';

import { PullIndicator } from './PullIndicator';

import './index.less';

const classPrefix = `tfc-variable-view`;

const defaultProps = {
  scroll: false,
  height: '',
  enablePullDownRefresh: false,
  refreshing: false,
  enableCustomPullDown: false,
  enableLowerLoad: false,
  enableSafeAreaInsetBottom: false,
  useRefreshingBox: true,
  scrollRefresherThreshold: 100,
  scrollRefresherDefaultStyle: '',
  scrollRefresherBackground: '',
  refreshingBox: null,
  refreshingBoxEffect: 'pull',
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
  displayLowerLoadingFooterBoxWhenNoData: false,
  existData: true,
  needNextLoad: false,
  emptyPlaceholderVisible: false,
  emptyPlaceholder: null,
  upperBox: null,
  style: {},
  onRefresh: null,
  onLowerLoad: null,
  onExternalScroll: null,
  footer: null,
  bottomSpaceHeight: 0,
};

class VariableView extends BaseComponent {
  touchStartY = 0;

  touchEndY = 0;

  prepareRefresh = false;

  refreshBoxHeight = 0;

  /**
   *手指下拉操作记录
   */
  touchMoveMaxY = 320;

  /**
   *下拉时的距离折算比例
   */
  calculatePercentage = 4;

  scrollRefresherFreshing = false;

  /**
   *内置属性, 禁止覆盖
   */
  refreshBoxId = '';

  scrollViewId = '';

  /**
   * needRefresh
   */
  needRefresh = false;

  /**
   * 外部触摸滑动初始纵轴坐标
   */
  externalTouchStartY = 0;

  /**
   * 外部触摸滑动方向评判是否完成
   */
  externalTouchDirectionJudgeComplete = false;

  /**
   * 外部触摸滑动经过评判后是否继续进行
   */
  externalTouchContinue = false;

  constructor(props) {
    super(props);

    const { screenHeight } = getSystemInfo();

    this.state = {
      ...this.state,
      ...{
        scrollRefreshTriggered: false,
      },
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
    const { scroll } = this.props;

    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
      return;
    }

    if (scroll) {
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
    } else {
      //外部触摸处理

      const { onExternalScroll } = this.props;

      if (isFunction(onExternalScroll)) {
        const that = this;

        onExternalScroll(({ scrollTop }) => {
          if (scrollTop === 0) {
            that.prepareRefresh = true;

            that.touchStartY = e.touches[0].pageY;

            this.externalTouchStartY = e.touches[0].pageY;
          }
        });
      }
    }
  };

  onViewTouchMove = (e) => {
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
      return;
    }

    if (this.prepareRefresh) {
      const { pageY } = e.touches[0];

      //进行滑档评判
      if (!this.externalTouchDirectionJudgeComplete) {
        if (pageY < this.externalTouchStartY) {
          this.prepareRefresh = false;
          this.externalTouchDirectionJudgeComplete = true;
          this.externalTouchContinue = false;
        } else {
          this.externalTouchDirectionJudgeComplete = true;
          this.externalTouchContinue = true;
        }

        return;
      }

      if (!this.externalTouchContinue) {
        return;
      }

      this.touchEndY = pageY;

      let moveY = this.touchEndY - this.touchStartY;

      moveY = moveY > this.touchMoveMaxY ? this.touchMoveMaxY : moveY;

      let needRefreshData = {};

      if (moveY === this.touchMoveMaxY) {
        if (!this.needRefresh) {
          needRefreshData = { needRefresh: true };

          this.needRefresh = true;
        }
      }

      if (moveY < this.touchMoveMaxY) {
        if (this.needRefresh) {
          needRefreshData = { needRefresh: false };

          this.needRefresh = false;
        }
      }

      Taro.changePullIndicator({
        ...{
          maxMoveY: this.touchMoveMaxY / this.calculatePercentage,
          moveY: moveY / this.calculatePercentage,
          rotate: (moveY / this.touchMoveMaxY) * 360,
        },
        ...needRefreshData,
      });
    }
  };

  onViewTouchCancel = () => {
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
      this.externalTouchDirectionJudgeComplete = false;
      this.externalTouchContinue = false;

      return;
    }

    if (this.prepareRefresh) {
      Taro.changePullIndicator({
        ...{
          maxMoveY: this.touchMoveMaxY / this.calculatePercentage,
          moveY: 0,
          rotate: 0,
        },
      });

      this.prepareRefresh = false;
    }

    this.externalTouchDirectionJudgeComplete = false;
    this.externalTouchContinue = false;
  };

  onViewTouchEnd = () => {
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
      this.externalTouchDirectionJudgeComplete = false;
      this.externalTouchContinue = false;

      return;
    }

    if (this.prepareRefresh) {
      let needRefreshData = {};

      if (this.needRefresh) {
        const { onRefresh } = this.props;

        if (isFunction(onRefresh)) {
          onRefresh();

          needRefreshData = { needRefresh: false };

          this.needRefresh = false;
        }
      }

      Taro.changePullIndicator({
        ...{
          maxMoveY: this.touchMoveMaxY / this.calculatePercentage,
          moveY: 0,
          rotate: 0,
        },
        ...needRefreshData,
      });

      this.prepareRefresh = false;
    }

    this.externalTouchDirectionJudgeComplete = false;
    this.externalTouchContinue = false;
  };

  onScrollRefresherRefresh = () => {
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (useCustomPullDown) {
      return;
    }

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
    const { enableLowerLoad, needNextLoad, onLowerLoad } = this.props;

    if (!enableLowerLoad) {
      return;
    }

    if (!needNextLoad) {
      return;
    }

    if (isFunction(onLowerLoad)) {
      onLowerLoad();
    }
  };

  adjustView = () => {
    const { enablePullDownRefresh } = this.props;

    if (!enablePullDownRefresh) {
      return;
    }

    const that = this;

    getRect(`#${this.refreshBoxId}`)
      .then((rect) => {
        if (rect != null) {
          const { height: refreshBoxHeight } = rect;

          that.refreshBoxHeight = refreshBoxHeight;
          that.touchMoveMaxY = that.touchMoveMaxY + refreshBoxHeight;
        }

        return rect;
      })
      .catch((error) => {
        logException(error);
      });
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
    const {
      existData,
      displayLowerLoadingFooterBoxWhenNoData,
      lowerLoadingFooterBox,
    } = this.props;

    if (!displayLowerLoadingFooterBoxWhenNoData) {
      if (!existData) {
        return null;
      }
    }

    return (
      lowerLoadingFooterBox || (
        <Divider padding="var(--tfc-32) var(--tfc-20) var(--tfc-32) var(--tfc-20)">
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

  buildSafeAreaInsetBottom = () => {
    return (
      <View style={{ padding: '0 0 calc(env(safe-area-inset-bottom)) 0' }} />
    );
  };

  checkUseCustomPullDown = () => {
    const { enablePullDownRefresh, enableCustomPullDown } = this.props;

    return !!enablePullDownRefresh && !!enableCustomPullDown;
  };

  renderFurther() {
    const {
      scroll,
      height,
      enablePullDownRefresh,
      enableCustomPullDown,
      enableLowerLoad,
      enableSafeAreaInsetBottom,
      scrollRefresherThreshold,
      scrollRefresherDefaultStyle,
      scrollRefresherBackground,
      refreshingBox,
      refreshingBoxEffect,
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
      style,
      footer,
      bottomSpaceHeight,
      children,
    } = this.props;
    const { scrollRefreshTriggered } = this.state;

    const { scrollTopTarget } = this.state;

    const useCustomPullDown = this.checkUseCustomPullDown();

    const styleAdjust = {
      ...style,
      ...(checkStringIsNullOrWhiteSpace(height)
        ? {}
        : !scroll
        ? {
            minHeight: height,
          }
        : {
            height: height,
          }),
      ...(checkStringIsNullOrWhiteSpace(refreshColor)
        ? {}
        : { '--refresh-color': refreshColor }),
      ...(checkStringIsNullOrWhiteSpace(refreshBackgroundColor)
        ? {}
        : { '--refresh-background-color': refreshBackgroundColor }),
      ...(checkStringIsNullOrWhiteSpace(refreshingBackgroundColor)
        ? {}
        : { '--refreshing-background-color': refreshingBackgroundColor }),
      ...(checkStringIsNullOrWhiteSpace(refreshingBorder)
        ? {}
        : { '--refreshing-border': `${refreshingBorder}` }),

      ...(checkStringIsNullOrWhiteSpace(lowerLoadingBackgroundColor)
        ? {}
        : { '--lower-loading-background-color': lowerLoadingBackgroundColor }),
      ...(checkStringIsNullOrWhiteSpace(lowerLoadingBorder)
        ? {}
        : { '--lower-loading-border': `${lowerLoadingBorder}` }),
      ...{
        position: 'relative',
        overflowX: 'hidden',
      },
    };

    const styleScroll = {
      ...styleAdjust,
      ...{
        overflowY: 'hidden',
      },
    };

    const upperBox = this.buildUpperBox();

    const lowerLoadingOuterBoxAdjust =
      enableLowerLoad && lowerLoadingPosition === 'outer' ? (
        <Transition
          show={lowerLoading}
          className={classNames(`${classPrefix}__lower-loading-box`, {
            [`${classPrefix}__lower-loading-box--outer`]:
              lowerLoadingPosition === 'outer',
          })}
          name="fade"
        >
          <View
            className={classNames(`${classPrefix}__lower-loading-box__inner`)}
          >
            {this.buildLowerLoadingSuspendBox()}
          </View>
        </Transition>
      ) : null;

    const lowerLoadingFooterBoxAdjust =
      enableLowerLoad &&
      (lowerLoadingPosition !== 'outer' || (!lowerLoading && !needNextLoad)) ? (
        <View onClick={this.onScrollToLower}>
          {this.buildLowerLoadingFooterBox(lowerLoading, needNextLoad)}
        </View>
      ) : null;

    const pullIndicator = (
      <View className={classNames(`${classPrefix}__pull-indicator`)}>
        <PullIndicator
          id={this.refreshBoxId || ''}
          enablePullDownRefresh={enablePullDownRefresh}
          useCustomPullDown={useCustomPullDown}
          useRefreshingBox={useRefreshingBox}
          refreshing={refreshing}
          refreshingBox={refreshingBox}
          maxMove={this.touchMoveMaxY / this.calculatePercentage}
          refreshingBoxEffect={refreshingBoxEffect}
        />
      </View>
    );

    let scrollViewMain = null;

    if (scroll) {
      const { height: heightScrollMode } = styleAdjust;

      scrollViewMain = (
        <ScrollView
          id={this.scrollViewId || ''}
          className={classNames(`${classPrefix}__scrollView`)}
          style={upperBox ? { flex: '1 1 auto' } : { height: '100%' }}
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
          {/* 由margin-top 垂直方向塌陷将导致的出现滚动条，加一个空元素处理 */}
          <View
            style={{
              content: '',
              overflow: 'hidden',
            }}
          />

          <View
            style={
              footer
                ? {
                    minHeight: `calc(${heightScrollMode} - ${transformSize(
                      90,
                    )} - env(safe-area-inset-bottom))`,
                  }
                : {}
            }
          >
            {children}

            {lowerLoadingFooterBoxAdjust}

            {bottomSpaceHeight > 0 ? (
              <Line transparent height={bottomSpaceHeight} />
            ) : null}
          </View>

          {footer}

          {enableSafeAreaInsetBottom ? this.buildSafeAreaInsetBottom() : null}
        </ScrollView>
      );
    }

    const { minHeight } = styleAdjust;

    return (
      <View
        className={classNames(classPrefix)}
        style={scroll ? styleScroll : styleAdjust}
        onTouchStart={this.onViewTouchStart}
        onTouchMove={this.onViewTouchMove}
        onTouchCancel={this.onViewTouchCancel}
        onTouchEnd={this.onViewTouchEnd}
      >
        {pullIndicator}

        {scroll ? (
          upperBox ? (
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
          )
        ) : null}

        {scroll ? null : footer ? (
          <View
            style={
              footer
                ? {
                    minHeight: `calc(${minHeight} - ${transformSize(
                      90,
                    )} - env(safe-area-inset-bottom))`,
                  }
                : {}
            }
          >
            {upperBox}

            {children}

            {lowerLoadingFooterBoxAdjust}

            {bottomSpaceHeight > 0 ? (
              <Line transparent height={bottomSpaceHeight} />
            ) : null}
          </View>
        ) : (
          <>
            {upperBox}

            {children}

            {lowerLoadingFooterBoxAdjust}
          </>
        )}

        {scroll ? null : footer}

        {!scroll && enableSafeAreaInsetBottom
          ? this.buildSafeAreaInsetBottom()
          : null}

        {lowerLoadingOuterBoxAdjust}
      </View>
    );
  }
}

VariableView.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { VariableView };
