import {
  checkStringIsNullOrWhiteSpace,
  getApplicationMergeConfig,
  requestMode,
  toNumber,
} from 'easy-soft-utility';

import {
  apiSuccessCode as apiSuccessCodeDefault,
  authenticationFailCode as authenticationFailCodeDefault,
  locationModeCollection,
  verifySignInResult,
} from './constants';
import { emptyLogo as emptyLogoImage } from './mediaDefault';

export function getWebRootFontSize() {
  const { webRootFontSize } = {
    webRootFontSize: '142%',
    ...getApplicationMergeConfig(),
  };

  return webRootFontSize || '142%';
}

/**
 * 无权限时的跳转目标
 * @returns path string
 */
export function getWithoutPermissionRedirectPath() {
  const { withoutPermissionRedirectPath } = {
    withoutPermissionRedirectPath: '',
    ...getApplicationMergeConfig(),
  };

  return withoutPermissionRedirectPath || '';
}

export function getFileUploadMaxSize() {
  const { fileUploadMaxSize } = {
    fileUploadMaxSize: 2,
    ...getApplicationMergeConfig(),
  };

  return fileUploadMaxSize || 2;
}

export function getAudioUploadMaxSize() {
  const { audioUploadMaxSize } = {
    audioUploadMaxSize: 4,
    ...getApplicationMergeConfig(),
  };

  return audioUploadMaxSize || 4;
}

export function getVideoUploadMaxSize() {
  const { videoUploadMaxSize } = {
    videoUploadMaxSize: 4,
    ...getApplicationMergeConfig(),
  };

  return videoUploadMaxSize || 4;
}

export function getImageUploadMaxSize() {
  const { imageUploadMaxSize } = {
    imageUploadMaxSize: 2,
    ...getApplicationMergeConfig(),
  };

  return imageUploadMaxSize || 2;
}

export function getShowSelectLanguage() {
  const { showSelectLanguage } = {
    showSelectLanguage: false,
    ...getApplicationMergeConfig(),
  };

  return showSelectLanguage || false;
}

export function getShowLogoInLoginView() {
  const { showLogoInLoginView } = {
    showLogoInLoginView: false,
    ...getApplicationMergeConfig(),
  };

  return showLogoInLoginView || false;
}

export function getEmptyLogo() {
  const { emptyLogo } = {
    emptyLogo: emptyLogoImage,
    ...getApplicationMergeConfig(),
  };

  return emptyLogo || emptyLogoImage;
}

export function getInitialLocationMode() {
  const { initialLocationMode } = {
    initialLocationMode: locationModeCollection.custom,
    ...getApplicationMergeConfig(),
  };

  return toNumber(initialLocationMode || locationModeCollection.custom);
}

export function getTokenAnonymous() {
  const { tokenAnonymous } = {
    tokenAnonymous: 'anonymous',
    ...getApplicationMergeConfig(),
  };

  return tokenAnonymous || 'anonymous';
}

export function getWeatherApi() {
  const { weatherApi } = {
    weatherApi: '',
    ...getApplicationMergeConfig(),
  };

  return weatherApi || '';
}

export function getDefaultMetaData() {
  const { defaultMetaData } = {
    defaultMetaData: {},
    ...getApplicationMergeConfig(),
  };

  return defaultMetaData || {};
}

export function getNavigationToSignInWhenSignInSilentFail() {
  const { navigationToSignInWhenSignInSilentFail } = {
    navigationToSignInWhenSignInSilentFail: false,
    ...getApplicationMergeConfig(),
  };

  return navigationToSignInWhenSignInSilentFail || false;
}

export function getApiSuccessCode() {
  const { apiSuccessCode } = {
    apiSuccessCode: apiSuccessCodeDefault,
    ...getApplicationMergeConfig(),
  };

  return apiSuccessCode || apiSuccessCodeDefault;
}

export function getAuthenticationFailCode() {
  const { authenticationFailCode } = {
    authenticationFailCode: authenticationFailCodeDefault,
    ...getApplicationMergeConfig(),
  };

  return authenticationFailCode || authenticationFailCodeDefault;
}

export function getSignInSuccessFlag() {
  const { signInSuccessFlag } = {
    signInSuccessFlag: verifySignInResult.success,
    ...getApplicationMergeConfig(),
  };

  return signInSuccessFlag || verifySignInResult.success;
}

export function getSignInFailFlag() {
  const { signInFailFlag } = {
    signInFailFlag: verifySignInResult.fail,
    ...getApplicationMergeConfig(),
  };

  return signInFailFlag || verifySignInResult.fail;
}

export function getSignInUnknownFlag() {
  const { signInUnknownFlag } = {
    signInUnknownFlag: verifySignInResult.unknown,
    ...getApplicationMergeConfig(),
  };

  return signInUnknownFlag || verifySignInResult.unknown;
}

export function getSignInPath() {
  const { signInPath } = {
    signInPath: '',
    ...getApplicationMergeConfig(),
  };

  return signInPath || '';
}

export function getDefaultLongitude() {
  const { defaultLongitude } = {
    defaultLongitude: '',
    ...getApplicationMergeConfig(),
  };

  return defaultLongitude || '';
}

export function getDefaultLatitude() {
  const { defaultLatitude } = {
    defaultLatitude: '',
    ...getApplicationMergeConfig(),
  };

  return defaultLatitude || '';
}

export function getUseLocation() {
  const { useLocation } = {
    useLocation: false,
    ...getApplicationMergeConfig(),
  };

  return useLocation || false;
}

export function getMapKey() {
  const { mapKey } = {
    mapKey: '',
    ...getApplicationMergeConfig(),
  };

  return mapKey || '';
}

export function getApiVersion() {
  const { apiVersion } = {
    apiVersion: '',
    ...getApplicationMergeConfig(),
  };

  return apiVersion || '';
}

export function getDefaultRequestMode() {
  const { defaultRequestMode } = {
    defaultRequestMode: requestMode.real,
    ...getApplicationMergeConfig(),
  };

  return checkStringIsNullOrWhiteSpace(defaultRequestMode)
    ? requestMode.real
    : defaultRequestMode;
}

export function getPromptSimulation() {
  const { promptSimulation } = {
    promptSimulation: false,
    ...getApplicationMergeConfig(),
  };

  return promptSimulation || false;
}

export function getShowRequestInfo() {
  const { showRequestInfo } = {
    showRequestInfo: false,
    ...getApplicationMergeConfig(),
  };

  return showRequestInfo || false;
}

export function getPlatformName() {
  const { platformName } = {
    platformName: '',
    ...getApplicationMergeConfig(),
  };

  return platformName || '';
}

export function getAppName() {
  const { appName } = {
    appName: '',
    ...getApplicationMergeConfig(),
  };

  return appName || '';
}

export function getAppDescription() {
  const { appDescription } = {
    appDescription: '',
    ...getApplicationMergeConfig(),
  };

  return appDescription || '';
}

export function getTitle() {
  const { appName } = {
    appName: '',
    ...getApplicationMergeConfig(),
  };

  return appName || '';
}

export function getLoginLogo() {
  const { loginLogo } = {
    loginLogo: emptyLogoImage,
    ...getApplicationMergeConfig(),
  };

  return loginLogo || emptyLogoImage;
}

export function getShareLogo() {
  const { shareLogo } = {
    shareLogo: emptyLogoImage,
    ...getApplicationMergeConfig(),
  };

  return shareLogo || emptyLogoImage;
}

export function getShareLogoName() {
  const { shareLogoName } = {
    shareLogoName: '',
    ...getApplicationMergeConfig(),
  };

  return shareLogoName || '';
}

export function getCompanyName() {
  const { companyName } = {
    companyName: '',
    ...getApplicationMergeConfig(),
  };

  return companyName || '';
}

export function getLeftBarLogo(remoteLogo) {
  if (!checkStringIsNullOrWhiteSpace(remoteLogo || null)) {
    return remoteLogo;
  }

  const { leftBarLogo } = {
    leftBarLogo: emptyLogoImage,
    ...getApplicationMergeConfig(),
  };

  return leftBarLogo || emptyLogoImage;
}

export function getLeftBarText() {
  const { leftBarText } = {
    leftBarText: '',
    ...getApplicationMergeConfig(),
  };

  return leftBarText || '';
}

export function getFooterImage() {
  const { footerImage } = {
    footerImage: '',
    ...getApplicationMergeConfig(),
  };

  return footerImage || '';
}

export function getFooterText() {
  const { footerText } = {
    footerText: '',
    ...getApplicationMergeConfig(),
  };

  return footerText || '';
}

export function getFooterDescription() {
  const { footerDescription } = {
    footerDescription: '',
    ...getApplicationMergeConfig(),
  };

  return footerDescription || '';
}

export function getAppId() {
  const { appId } = {
    appId: '',
    ...getApplicationMergeConfig(),
  };

  return appId || '';
}

export function getSimulationLocation() {
  const { simulationLocation } = {
    simulationLocation: false,
    ...getApplicationMergeConfig(),
  };

  return !!(simulationLocation || false);
}

export function getSimulationLocationData() {
  const { simulationLocationData } = {
    simulationLocationData: {},
    ...getApplicationMergeConfig(),
  };

  return simulationLocationData || {};
}

export function getRefreshSessionAliasName() {
  const { refreshSessionAliasName } = {
    refreshSessionAliasName: 'refreshSessionApiData',
    ...getApplicationMergeConfig(),
  };

  return refreshSessionAliasName || 'refreshSessionApiData';
}

export function getCheckTicketValidityAliasName() {
  const { checkTicketValidityAliasName } = {
    checkTicketValidityAliasName: 'checkTicketValidityApiData',
    ...getApplicationMergeConfig(),
  };

  return checkTicketValidityAliasName || 'checkTicketValidityApiData';
}

export function getRegisterWithWeChatAliasName() {
  const { registerWithWeChatAliasName } = {
    registerWithWeChatAliasName: 'registerWithWeChatApiData',
    ...getApplicationMergeConfig(),
  };

  return registerWithWeChatAliasName || 'registerWithWeChatApiData';
}

export function getRegisterAliasName() {
  const { registerAliasName } = {
    registerAliasName: 'registerApiData',
    ...getApplicationMergeConfig(),
  };

  return registerAliasName || 'registerApiData';
}

export function getExchangePhoneAliasName() {
  const { exchangePhoneAliasName } = {
    exchangePhoneAliasName: 'exchangePhoneApiData',
    ...getApplicationMergeConfig(),
  };

  return exchangePhoneAliasName || 'exchangePhoneApiData';
}

export function getGetFullAdministrativeDivisionDataAliasName() {
  const { fullAdministrativeDivisionDataAliasName } = {
    fullAdministrativeDivisionDataAliasName:
      'fullAdministrativeDivisionDataApiData',
    ...getApplicationMergeConfig(),
  };

  return (
    fullAdministrativeDivisionDataAliasName ||
    'fullAdministrativeDivisionDataApiData'
  );
}

export function getSignInAliasName() {
  const { signInAliasName } = {
    signInAliasName: 'signInApiData',
    ...getApplicationMergeConfig(),
  };

  return signInAliasName || 'signInApiData';
}

export function getSignInSilentAliasName() {
  const { signInSilentAliasName } = {
    signInSilentAliasName: 'signInSilentApiData',
    ...getApplicationMergeConfig(),
  };

  return signInSilentAliasName || 'signInSilentApiData';
}

export function getMetaDataApi() {
  const { metaDataAliasName } = {
    metaDataApi: '',
    ...getApplicationMergeConfig(),
  };

  return metaDataAliasName || '';
}

export function getMetaDataAliasName() {
  const { metaDataAliasName } = {
    metaDataAliasName: 'metaDataApiData',
    ...getApplicationMergeConfig(),
  };

  return metaDataAliasName || 'metaDataApiData';
}

export function getGetCurrentOperatorAliasName() {
  const { getCurrentOperatorAliasName } = {
    getCurrentOperatorAliasName: 'getCurrentOperatorApiData',
    ...getApplicationMergeConfig(),
  };

  return getCurrentOperatorAliasName || 'getCurrentOperatorApiData';
}

export function getShowLogInConsole() {
  const { showLogInConsole } = {
    showLogInConsole: false,
    ...getApplicationMergeConfig(),
  };

  return showLogInConsole || false;
}
