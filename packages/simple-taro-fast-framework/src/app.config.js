export default {
  pages: ['pages/home/main/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  subpackages: [
    {
      root: 'example',
      name: '组件示例',
      pages: [
        'pages/basic/index',
        'pages/element/index',
        'pages/form/index',
        'pages/layout/index',
        'pages/action/index',
        'pages/extraComponent/index',
        'pages/interact/index',
        'pages/webPage/index',
        'pages/ellipsis/index',
        'pages/more/index',
        'pages/price/index',
        'pages/colorText/index',
        'pages/imageBox/index',
        'pages/avatar/index',
        'pages/badge/index',
        'pages/backTop/index',
        'pages/noticeBar/index',
        'pages/flex/index',
        'pages/fadeInBox/index',
        'pages/fixedBox/index',
        'pages/steps/index',
        'pages/divider/index',
        'pages/tag/index',
        'pages/inputItem/index',
        'pages/stepper/index',
        'pages/stepperItem/index',
        'pages/button/index',
        'pages/switch/index',
        'pages/switchItem/index',
        'pages/progress/index',
        'pages/progressBox/index',
        'pages/progressItem/index',
        'pages/notification/index',
        'pages/grid/index',
        'pages/selector/index',
        'pages/tabs/index',
        'pages/transition/index',
        'pages/card/index',
        'pages/item/index',
        'pages/overlay/index',
        'pages/popup/index',
        'pages/circle/index',
        'pages/swiper/index',
        'pages/scrollBox/index',
        'pages/radio/index',
        'pages/radioSelector/index',
        'pages/checkBox/index',
        'pages/checkBoxSelector/index',
        'pages/countdown/index',
        'pages/helpBox/index',
        'pages/extraBox/index',
        'pages/footer/index',
        'pages/floatAction/index',
        'pages/verticalBox/index',
        'pages/horizontalCenterBox/index',
        'pages/translucentBox/index',
        'pages/flexBox/index',
        'pages/htmlBox/index',
        'pages/centerBox/index',
        'pages/thumbnailBox/index',
        'pages/scaleBox/index',
        'pages/titleBox/index',
        'pages/backboardBox/index',
        'pages/dataGrid/index',
        'pages/searchBar/index',
        'pages/multiLineText/index',
        'pages/textAreaItem/index',
        'pages/actionSheet/index',
        'pages/modal/index',
        'pages/cascader/index',
        'pages/space/index',
        'pages/angleBox/index',
        'pages/loading/index',
        'pages/activityIndicator/index',
        'pages/collapse/index',
        'pages/tabbar/index',
        'pages/line/index',
        'pages/link/index',
        'pages/headNavigation/index',
        'pages/popover/index',
        'pages/icon/index',
        'pages/color/index',
        'pages/cssVariable/index',
        'pages/utils/index',
      ],
    },
    {
      root: 'framework',
      name: '快速框架',
      pages: [
        'pages/home/index',
        'pages/pageExtend/index',
        'pages/pageExtend/buildInConfig/index',
        'pages/pageExtend/buildInState/index',
        'pages/pageExtend/builtInEffect/index',
        'pages/pageExtend/builtInEffect/buildEmptyPlaceholder/index',
        'pages/pageExtend/builtInEffect/buildInitialActivityIndicator/index',
        'pages/pageExtend/capsulePrompt/index',
        'pages/pageExtend/fullAdministrativeDivisionSelector/index',
        'pages/pageExtend/footer/index',
        'pages/pageExtend/normal/index',
        'pages/pageExtend/normal/basic/index',
        'pages/pageExtend/normal/upperBox/index',
        'pages/pageExtend/normal/backTop/index',
        'pages/pageExtend/normal/remoteLoad/index',
        'pages/pageExtend/normal/remoteLoadSpecial/index',
        'pages/pageExtend/normal/pullRefresh/index',
        'pages/pageExtend/normal/pullRefreshSpecial/index',
        'pages/pageExtend/normal/lowerLoad/index',
        'pages/pageExtend/normal/lowerLoadSpecial/index',
        'pages/pageExtend/normal/complexSample/index',
        'pages/pageExtend/scroll/index',
        'pages/pageExtend/scroll/basic/index',
        'pages/pageExtend/scroll/upperBox/index',
        'pages/pageExtend/scroll/remoteLoad/index',
        'pages/pageExtend/scroll/remoteLoadSpecial/index',
        'pages/pageExtend/scroll/pullRefresh/index',
        'pages/pageExtend/scroll/pullRefreshSpecial/index',
        'pages/pageExtend/scroll/lowerLoad/index',
        'pages/pageExtend/scroll/lowerLoadSpecial/index',
        'pages/pageExtend/scroll/complexSample/index',
        'pages/pageExecuteFlow/index',
        'pages/pageExecuteFlow/verifySession/index',
      ],
    },
    {
      root: 'template',
      name: '模板页',
      pages: [
        'pages/entry/main/index',
        'pages/signIn/main/index',
        'pages/register/main/index',
        'pages/weather/main/index',
        'pages/gridBanner/main/index',
        'pages/loading/main/index',
      ],
    },
    {
      root: 'templateRemote',
      name: '远程模板页',
      pages: [
        'pages/entry/main/index',
        'pages/override/main/index',
        'pages/signInSilent/main/index',
        'pages/exchangePhone/main/index',
        'pages/getCustomer/main/index',
      ],
    },
    {
      root: 'news',
      name: '新闻应用',
      pages: [
        'pages/entry/main/index',
        'pages/home/main/index',
        'pages/home2/main/index',
        'pages/section/main/index',
      ],
    },
  ],
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于获取所在地的天气信息',
    },
  },
  requiredPrivateInfos: ['getFuzzyLocation'],
};
