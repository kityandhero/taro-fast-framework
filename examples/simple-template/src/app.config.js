// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: [
    'pages/customer/main/index',
    'pages/entry/main/index',
    'pages/flowCase/main/index',
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
      root: 'information',
      name: '信息',
      pages: [
        'pages/pageListNotice/main/index',
        'pages/noticeDetail/main/index',
      ],
    },
    {
      root: 'communication',
      name: '通讯',
      pages: ['pages/singleListAddressBook/main/index'],
    },
    {
      root: 'webPage',
      name: '网页',
      pages: ['pages/general/main/index'],
    },
    {
      root: 'customer',
      name: '用户',
      pages: [
        'pages/approve/main/index',
        'pages/changePassword/main/index',
        'pages/detailFlowCase/main/index',
        'pages/editInformation/main/index',
        'pages/pageListCreateApprove/main/index',
        'pages/pageListLatestApprove/main/index',
        'pages/pageListWaitApprove/main/index',
        'pages/resetPassword/main/index',
        'pages/setAddress/main/index',
        'pages/setAvatar/main/index',
        'pages/setBirthday/main/index',
        'pages/setting/main/index',
        'pages/signIn/main/index',
        'pages/signInWithWeChat/main/index',
      ],
    },
  ],
  preloadRule: {
    'pages/entry/main/index': {
      network: 'all',
      packages: ['information', 'communication'],
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
        text: '工作台',
      },
      {
        pagePath: 'pages/flowCase/main/index',
        iconPath: './assets/tab-bar/approve.png',
        selectedIconPath: './assets/tab-bar/approve_active.png',
        text: '审批',
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
        pagePath: 'pages/customer/main/index',
        iconPath: './assets/tab-bar/user.png',
        selectedIconPath: './assets/tab-bar/user-active.png',
        text: '我的',
      },
    ],
  },
});
