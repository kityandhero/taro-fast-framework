// eslint-disable-next-line no-undef
export default defineAppConfig({
  entryPagePath: 'pages/entry/main/index',
  pages: [
    'pages/user/main/index',
    'pages/entry/main/index',
    'pages/home/main/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
  },
  subpackages: [
    {
      root: 'webPage',
      name: '网页',
      pages: ['pages/general/main/index'],
    },
    {
      root: 'user',
      name: 'User',
      pages: [
        'pages/changePassword/main/index',
        'pages/detailApplicationUserFeedback/main/index',
        'pages/editInformation/main/index',
        'pages/pageListApplicationUserFeedback/main/index',
        'pages/resetPassword/main/index',
        'pages/security/main/index',
        'pages/setAddress/main/index',
        'pages/setAvatar/main/index',
        'pages/setBirthday/main/index',
        'pages/signIn/main/index',
        'pages/submitApplicationUserFeedback/main/index',
        'pages/signInWithWeChat/main/index',
      ],
    },
  ],
  preloadRule: {
    'pages/entry/main/index': {
      network: 'all',
      packages: ['user'],
    },
  },
  // permission: {
  //   'scope.userLocation': {
  //     desc: '你的位置信息将用于显示当地天气等信息。',
  //   },
  // },
  // requiredPrivateInfos: [
  //   'getFuzzyLocation',
  //   'onLocationChange',
  //   'chooseAddress',
  //   'choosePoi',
  //   'chooseLocation',
  //   'startLocationUpdate',
  // ],
  requiredPrivateInfos: [],
  serviceProviderTicket: '',
  tabBar: {
    color: '#353535',
    selectedColor: '#3778F4',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/main/index',
        iconPath: './assets/tab-bar/workbench.png',
        selectedIconPath: './assets/tab-bar/workbench-active.png',
        text: '首页',
      },
      // {
      //   pagePath: 'pages/workbench/main/index',
      //   iconPath: './assets/tab-bar/workbench.png',
      //   selectedIconPath: './assets/tab-bar/workbench-active.png',
      //   text: '工作台',
      // },
      // {
      //   pagePath: 'pages/contact/main/index',
      //   iconPath: './assets/tab-bar/news.png',
      //   selectedIconPath: './assets/tab-bar/news-active.png',
      //   text: '通讯录',
      // },
      {
        pagePath: 'pages/user/main/index',
        iconPath: './assets/tab-bar/user.png',
        selectedIconPath: './assets/tab-bar/user-active.png',
        text: '我的',
      },
    ],
  },
  // lazyCodeLoading: 'requiredComponents',
});
