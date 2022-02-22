import classNames from 'classnames';
import Taro from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';

import {
  createSelectorQuery,
  getGuid,
  getRect,
  stringIsNullOrWhiteSpace,
  getSystemInfo,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import CenterBox from '../CenterBox';
import ActivityIndicator from '../ActivityIndicator';
import Transition from '../Transition';
import Divider from '../Divider';
import FlexBox from '../FlexBox';

import PullIndicator from './PullIndicator';

import './index.less';

const classPrefix = `tfc-variable-view`;

const defaultProps = {
  scroll: false,
  height: '',
  enablePullDownRefresh: false,
  refreshing: false,
  enableCustomPullDown: false,
  enableLowerLoad: false,
  useRefreshingBox: true,
  scrollRefresherThreshold: 100,
  scrollRefresherDefaultStyle: '',
  scrollRefresherBackground: '',
  refreshingBox: null,
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
  upperBox: null,
  style: {},
  onRefresh: null,
  onLowerLoad: null,
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

  refreshBoxId = '';

  scrollViewId = '';

  needRefresh = false;

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
  };

  onViewTouchEnd = () => {
    const useCustomPullDown = this.checkUseCustomPullDown();

    if (!useCustomPullDown) {
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
    const { enablePullDownRefresh, scroll } = this.props;

    if (!enablePullDownRefresh) {
      return;
    }

    if (scroll) {
      const that = this;

      getRect(`#${this.refreshBoxId}`).then((rect) => {
        if (rect != null) {
          const { height: refreshBoxHeight } = rect;

          that.refreshBoxHeight = refreshBoxHeight;
          that.touchMoveMaxY = that.touchMoveMaxY + refreshBoxHeight;
        }
      });
    }
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

  renderFurther() {
    const {
      scroll,
      height,
      enablePullDownRefresh,
      enableCustomPullDown,
      enableLowerLoad,
      scrollRefresherThreshold,
      scrollRefresherDefaultStyle,
      scrollRefresherBackground,
      refreshingBox,
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
      children,
    } = this.props;
    const { scrollRefreshTriggered } = this.state;

    const { scrollTopTarget } = this.state;

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
      ...{
        position: 'relative',
      },
    };

    const upperBox = this.buildUpperBox();

    const lowerLoadingOuterBoxAdjust =
      enableLowerLoad &&
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
            className={classNames(`${classPrefix}__lower-loading-box__inner`)}
          >
            {this.buildLowerLoadingSuspendBox()}
          </View>
        </Transition>
      ) : null;

    const lowerLoadingFooterBoxAdjust =
      enableLowerLoad &&
      ((lowerLoadingPosition !== 'absolute' &&
        lowerLoadingPosition !== 'fixed') ||
        (!lowerLoading && !needNextLoad)) ? (
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
        />
      </View>
    );

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
            {children}

            {lowerLoadingFooterBoxAdjust}
          </View>
        </ScrollView>
      );

      return (
        <View
          className={classNames(classPrefix)}
          style={{
            ...styleAdjust,
            ...{
              overflow: 'hidden',
            },
          }}
          onTouchStart={this.onViewTouchStart}
          onTouchMove={this.onViewTouchMove}
          onTouchCancel={this.onViewTouchCancel}
          onTouchEnd={this.onViewTouchEnd}
        >
          {pullIndicator}

          {lowerLoadingOuterBoxAdjust}

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
            flexAuto="bottom"
            verticalHeight="100%"
            top={upperBox}
            bottom={scrollViewMain}
          />
        </View>
      );
    }

    return (
      <View className={classNames(classPrefix)}>
        {pullIndicator}

        {lowerLoadingOuterBoxAdjust}

        {upperBox}

        {children}

        {lowerLoadingFooterBoxAdjust}
      </View>
    );
  }
}

VariableView.defaultProps = {
  ...defaultProps,
};

export default VariableView;
