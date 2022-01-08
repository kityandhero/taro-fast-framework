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
        'pages/imageBox/index',
        'pages/avatar/index',
        'pages/badge/index',
        'pages/noticeBar/index',
        'pages/layout/index',
        'pages/steps/index',
        'pages/button/index',
        'pages/autoCenter/index',
        'pages/divider/index',
        'pages/tag/index',
        'pages/advanceInput/index',
      ],
    },
  ],
};
