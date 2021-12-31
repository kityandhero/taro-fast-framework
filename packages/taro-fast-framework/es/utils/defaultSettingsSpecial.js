import '../classCallCheck.js';
import '../defineProperty.js';
import { _ as _objectSpread2 } from '../objectSpread2.js';
import './mediaDefault.js';
import { emptyLogo, apiSuccessCode, authenticationFailCode } from './constants.js';
import 'lodash';
import './typeCheck.js';
import './typeConvert.js';
import '@tarojs/taro';
import './tips.js';
import { getAppInitConfigData, stringIsNullOrWhiteSpace } from './tools.js';
import 'qs';

var defaultSettingsLayoutCustom = {
  getTinymceImagesUploadUrl: function getTinymceImagesUploadUrl() {
    var appInit = getAppInitConfigData();

    var _tinymceImagesUploadU = _objectSpread2(_objectSpread2({}, {
      tinymceImagesUploadUrl: null
    }), appInit || {}),
        tinymceImagesUploadUrl = _tinymceImagesUploadU.tinymceImagesUploadUrl;

    return tinymceImagesUploadUrl || '';
  },
  getTinymceApiKey: function getTinymceApiKey() {
    var appInit = getAppInitConfigData();

    var _tinymceApiKey = _objectSpread2(_objectSpread2({}, {
      tinymceApiKey: ''
    }), appInit || {}),
        tinymceApiKey = _tinymceApiKey.tinymceApiKey;

    return tinymceApiKey || '';
  },
  getUseNprogress: function getUseNprogress() {
    var appInit = getAppInitConfigData();

    var _useNprogress = _objectSpread2(_objectSpread2({}, {
      useNprogress: true
    }), appInit || {}),
        useNprogress = _useNprogress.useNprogress;

    return useNprogress;
  },
  getFileUploadMaxSize: function getFileUploadMaxSize() {
    var appInit = getAppInitConfigData();

    var _fileUploadMaxSize = _objectSpread2(_objectSpread2({}, {
      fileUploadMaxSize: 2
    }), appInit || {}),
        fileUploadMaxSize = _fileUploadMaxSize.fileUploadMaxSize;

    return fileUploadMaxSize || 2;
  },
  getAudioUploadMaxSize: function getAudioUploadMaxSize() {
    var appInit = getAppInitConfigData();

    var _audioUploadMaxSize = _objectSpread2(_objectSpread2({}, {
      audioUploadMaxSize: 4
    }), appInit || {}),
        audioUploadMaxSize = _audioUploadMaxSize.audioUploadMaxSize;

    return audioUploadMaxSize || 4;
  },
  getVideoUploadMaxSize: function getVideoUploadMaxSize() {
    var appInit = getAppInitConfigData();

    var _videoUploadMaxSize = _objectSpread2(_objectSpread2({}, {
      videoUploadMaxSize: 4
    }), appInit || {}),
        videoUploadMaxSize = _videoUploadMaxSize.videoUploadMaxSize;

    return videoUploadMaxSize || 4;
  },
  getImageUploadMaxSize: function getImageUploadMaxSize() {
    var appInit = getAppInitConfigData();

    var _imageUploadMaxSize = _objectSpread2(_objectSpread2({}, {
      imageUploadMaxSize: 2
    }), appInit || {}),
        imageUploadMaxSize = _imageUploadMaxSize.imageUploadMaxSize;

    return imageUploadMaxSize || 2;
  },
  getShowSelectLanguage: function getShowSelectLanguage() {
    var appInit = getAppInitConfigData();

    var _showSelectLanguage = _objectSpread2(_objectSpread2({}, {
      showSelectLanguage: false
    }), appInit || {}),
        showSelectLanguage = _showSelectLanguage.showSelectLanguage;

    return showSelectLanguage || false;
  },
  getShowLogoInLoginView: function getShowLogoInLoginView() {
    var appInit = getAppInitConfigData();

    var _showLogoInLoginView = _objectSpread2(_objectSpread2({}, {
      showLogoInLoginView: false
    }), appInit || {}),
        showLogoInLoginView = _showLogoInLoginView.showLogoInLoginView;

    return showLogoInLoginView || false;
  },
  getEmptyLogo: function getEmptyLogo() {
    var appInit = getAppInitConfigData();

    var _emptyLogo = _objectSpread2(_objectSpread2({}, {
      emptyLogo: emptyLogo
    }), appInit || {}),
        emptyLogo$1 = _emptyLogo.emptyLogo;

    return emptyLogo$1 || emptyLogo;
  },
  getApiSuccessCode: function getApiSuccessCode() {
    var appInit = getAppInitConfigData();

    var _apiSuccessCode = _objectSpread2(_objectSpread2({}, {
      apiSuccessCode: apiSuccessCode
    }), appInit || {}),
        apiSuccessCode$1 = _apiSuccessCode.apiSuccessCode;

    return apiSuccessCode$1 || apiSuccessCode;
  },
  getAuthenticationFailCode: function getAuthenticationFailCode() {
    var appInit = getAppInitConfigData();

    var _authenticationFailCo = _objectSpread2({}, _objectSpread2({
      authenticationFailCode: authenticationFailCode
    }, appInit || {})),
        authenticationFailCode$1 = _authenticationFailCo.authenticationFailCode;

    return authenticationFailCode$1 || authenticationFailCode;
  },
  getLoginPath: function getLoginPath() {
    var appInit = getAppInitConfigData();

    var _loginPath = _objectSpread2(_objectSpread2({}, {
      loginPath: ''
    }), appInit || {}),
        loginPath = _loginPath.loginPath;

    return loginPath || '';
  },
  getApiVersion: function getApiVersion() {
    var appInit = getAppInitConfigData();

    var _apiVersion = _objectSpread2(_objectSpread2({}, {
      apiVersion: ''
    }), appInit || {}),
        apiVersion = _apiVersion.apiVersion;

    return apiVersion || '';
  },
  getUseVirtualRequest: function getUseVirtualRequest() {
    var appInit = getAppInitConfigData();

    var _useVirtualRequest = _objectSpread2(_objectSpread2({}, {
      useVirtualRequest: false
    }), appInit || {}),
        useVirtualRequest = _useVirtualRequest.useVirtualRequest;

    return useVirtualRequest || false;
  },
  getShowUseVirtualRequestMessage: function getShowUseVirtualRequestMessage() {
    var appInit = getAppInitConfigData();

    var _showUseVirtualReques = _objectSpread2(_objectSpread2({}, {
      showUseVirtualRequestMessage: false
    }), appInit || {}),
        showUseVirtualRequestMessage = _showUseVirtualReques.showUseVirtualRequestMessage;

    return showUseVirtualRequestMessage || false;
  },
  getShowLogInConsole: function getShowLogInConsole() {
    var appInit = getAppInitConfigData();

    var _showLogInConsole = _objectSpread2(_objectSpread2({}, {
      showLogInConsole: false
    }), appInit || {}),
        showLogInConsole = _showLogInConsole.showLogInConsole;

    return showLogInConsole || false;
  },
  getShowRequestInfo: function getShowRequestInfo() {
    var appInit = getAppInitConfigData();

    var _showRequestInfo = _objectSpread2(_objectSpread2({}, {
      showRequestInfo: false
    }), appInit || {}),
        showRequestInfo = _showRequestInfo.showRequestInfo;

    return showRequestInfo || false;
  },
  getPlatformName: function getPlatformName() {
    var appInit = getAppInitConfigData();

    var _platformName = _objectSpread2(_objectSpread2({}, {
      platformName: ''
    }), appInit || {}),
        platformName = _platformName.platformName;

    return platformName || '';
  },
  getAppName: function getAppName() {
    var appInit = getAppInitConfigData();

    var _appName = _objectSpread2(_objectSpread2({}, {
      appName: ''
    }), appInit || {}),
        appName = _appName.appName;

    return appName || '';
  },
  getAppDescription: function getAppDescription() {
    var appInit = getAppInitConfigData();

    var _appDescription = _objectSpread2(_objectSpread2({}, {
      appDescription: ''
    }), appInit || {}),
        appDescription = _appDescription.appDescription;

    return appDescription || '';
  },
  getTitle: function getTitle() {
    var appInit = getAppInitConfigData();

    var _appName2 = _objectSpread2(_objectSpread2({}, {
      appName: ''
    }), appInit || {}),
        appName = _appName2.appName;

    return appName || '';
  },
  getLoginLogo: function getLoginLogo() {
    var appInit = getAppInitConfigData();

    var _loginLogo = _objectSpread2(_objectSpread2({}, {
      loginLogo: emptyLogo
    }), appInit || {}),
        loginLogo = _loginLogo.loginLogo;

    return loginLogo || emptyLogo;
  },
  getShareLogo: function getShareLogo() {
    var appInit = getAppInitConfigData();

    var _shareLogo = _objectSpread2(_objectSpread2({}, {
      shareLogo: emptyLogo
    }), appInit || {}),
        shareLogo = _shareLogo.shareLogo;

    return shareLogo || emptyLogo;
  },
  getShareLogoName: function getShareLogoName() {
    var appInit = getAppInitConfigData();

    var _shareLogoName = _objectSpread2(_objectSpread2({}, {
      shareLogoName: ''
    }), appInit || {}),
        shareLogoName = _shareLogoName.shareLogoName;

    return shareLogoName || '';
  },
  getCompanyName: function getCompanyName() {
    var appInit = getAppInitConfigData();

    var _companyName = _objectSpread2(_objectSpread2({}, {
      companyName: ''
    }), appInit || {}),
        companyName = _companyName.companyName;

    return companyName || '';
  },
  getLeftBarLogo: function getLeftBarLogo(remoteLogo) {
    if (!stringIsNullOrWhiteSpace(remoteLogo || null)) {
      return remoteLogo;
    }

    var appInit = getAppInitConfigData();

    var _leftBarLogo = _objectSpread2(_objectSpread2({}, {
      leftBarLogo: emptyLogo
    }), appInit || {}),
        leftBarLogo = _leftBarLogo.leftBarLogo;

    return leftBarLogo || emptyLogo;
  },
  getLeftBarText: function getLeftBarText() {
    var appInit = getAppInitConfigData();

    var _leftBarText = _objectSpread2(_objectSpread2({}, {
      leftBarText: ''
    }), appInit || {}),
        leftBarText = _leftBarText.leftBarText;

    return leftBarText || '';
  },
  getCopyright: function getCopyright() {
    var appInit = getAppInitConfigData();

    var _copyright = _objectSpread2(_objectSpread2({}, {
      copyright: ''
    }), appInit || {}),
        copyright = _copyright.copyright;

    return copyright || '';
  }
};
/**
 * 占位函数
 *
 * @export
 * @returns
 */

function empty() {
  return {};
}

export { defaultSettingsLayoutCustom, empty };
