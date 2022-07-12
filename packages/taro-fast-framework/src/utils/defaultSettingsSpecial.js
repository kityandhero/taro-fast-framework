import {
  apiSuccessCode as apiSuccessCodeDefault,
  authenticationFailCode as authenticationFailCodeDefault,
  emptyLogo as emptyLogoImage,
  locationModeCollection,
  verifySignInResult,
} from 'taro-fast-common/es/utils/constants';
import {
  getAppInitConfigData,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

export const defaultSettingsLayoutCustom = {
  /**
   * 无权限时的跳转目标
   * @returns path string
   */
  getWithoutPermissionRedirectPath: () => {
    const appInit = getAppInitConfigData();

    const { withoutPermissionRedirectPath } = {
      ...{ withoutPermissionRedirectPath: '' },
      ...(appInit || {}),
    };

    return withoutPermissionRedirectPath || '';
  },
  getFileUploadMaxSize: () => {
    const appInit = getAppInitConfigData();

    const { fileUploadMaxSize } = {
      ...{ fileUploadMaxSize: 2 },
      ...(appInit || {}),
    };

    return fileUploadMaxSize || 2;
  },
  getAudioUploadMaxSize: () => {
    const appInit = getAppInitConfigData();

    const { audioUploadMaxSize } = {
      ...{ audioUploadMaxSize: 4 },
      ...(appInit || {}),
    };

    return audioUploadMaxSize || 4;
  },
  getVideoUploadMaxSize: () => {
    const appInit = getAppInitConfigData();

    const { videoUploadMaxSize } = {
      ...{ videoUploadMaxSize: 4 },
      ...(appInit || {}),
    };

    return videoUploadMaxSize || 4;
  },
  getImageUploadMaxSize: () => {
    const appInit = getAppInitConfigData();

    const { imageUploadMaxSize } = {
      ...{ imageUploadMaxSize: 2 },
      ...(appInit || {}),
    };

    return imageUploadMaxSize || 2;
  },
  getShowSelectLanguage: () => {
    const appInit = getAppInitConfigData();

    const { showSelectLanguage } = {
      ...{ showSelectLanguage: false },
      ...(appInit || {}),
    };

    return showSelectLanguage || false;
  },
  getShowLogoInLoginView: () => {
    const appInit = getAppInitConfigData();

    const { showLogoInLoginView } = {
      ...{ showLogoInLoginView: false },
      ...(appInit || {}),
    };

    return showLogoInLoginView || false;
  },
  getEmptyLogo: () => {
    const appInit = getAppInitConfigData();

    const { emptyLogo } = {
      ...{ emptyLogo: emptyLogoImage },
      ...(appInit || {}),
    };

    return emptyLogo || emptyLogoImage;
  },
  getInitialLocationMode: () => {
    const appInit = getAppInitConfigData();

    const { initialLocationMode } = {
      ...{ initialLocationMode: locationModeCollection.custom },
      ...(appInit || {}),
    };

    return toNumber(initialLocationMode || locationModeCollection.custom);
  },
  getTokenAnonymous: () => {
    const appInit = getAppInitConfigData();

    const { tokenAnonymous } = {
      ...{ tokenAnonymous: 'anonymous' },
      ...(appInit || {}),
    };

    return tokenAnonymous || 'anonymous';
  },
  getWeatherApi: () => {
    const appInit = getAppInitConfigData();

    const { weatherApi } = {
      ...{ weatherApi: '' },
      ...(appInit || {}),
    };

    return weatherApi || '';
  },
  getDefaultMetaData: () => {
    const appInit = getAppInitConfigData();

    const { defaultMetaData } = {
      ...{ defaultMetaData: {} },
      ...(appInit || {}),
    };

    return defaultMetaData || {};
  },
  getNavigationToSignInWhenSignInSilentFail: () => {
    const appInit = getAppInitConfigData();

    const { navigationToSignInWhenSignInSilentFail } = {
      ...{ navigationToSignInWhenSignInSilentFail: false },
      ...(appInit || {}),
    };

    return navigationToSignInWhenSignInSilentFail || false;
  },
  getApiSuccessCode: () => {
    const appInit = getAppInitConfigData();

    const { apiSuccessCode } = {
      ...{ apiSuccessCode: apiSuccessCodeDefault },
      ...(appInit || {}),
    };

    return apiSuccessCode || apiSuccessCodeDefault;
  },
  getAuthenticationFailCode: () => {
    const appInit = getAppInitConfigData();

    const { authenticationFailCode } = {
      ...{
        authenticationFailCode: authenticationFailCodeDefault,
        ...(appInit || {}),
      },
    };

    return authenticationFailCode || authenticationFailCodeDefault;
  },
  getSignInSuccessFlag: () => {
    const appInit = getAppInitConfigData();

    const { signInSuccessFlag } = {
      ...{ signInSuccessFlag: verifySignInResult.success },
      ...(appInit || {}),
    };

    return signInSuccessFlag || verifySignInResult.success;
  },
  getSignInFailFlag: () => {
    const appInit = getAppInitConfigData();

    const { signInFailFlag } = {
      ...{ signInFailFlag: verifySignInResult.fail },
      ...(appInit || {}),
    };

    return signInFailFlag || verifySignInResult.fail;
  },
  getSignInUnknownFlag: () => {
    const appInit = getAppInitConfigData();

    const { signInUnknownFlag } = {
      ...{ signInUnknownFlag: verifySignInResult.unknown },
      ...(appInit || {}),
    };

    return signInUnknownFlag || verifySignInResult.unknown;
  },
  getSignInPath: () => {
    const appInit = getAppInitConfigData();

    const { signInPath } = {
      ...{ signInPath: '' },
      ...(appInit || {}),
    };

    return signInPath || '';
  },
  getDefaultLongitude: () => {
    const appInit = getAppInitConfigData();

    const { defaultLongitude } = {
      ...{ defaultLongitude: '' },
      ...(appInit || {}),
    };

    return defaultLongitude || '';
  },
  getDefaultLatitude: () => {
    const appInit = getAppInitConfigData();

    const { defaultLatitude } = {
      ...{ defaultLatitude: '' },
      ...(appInit || {}),
    };

    return defaultLatitude || '';
  },
  getUseLocation: () => {
    const appInit = getAppInitConfigData();

    const { useLocation } = {
      ...{ useLocation: false },
      ...(appInit || {}),
    };

    return useLocation || false;
  },
  getMapKey: () => {
    const appInit = getAppInitConfigData();

    const { mapKey } = {
      ...{ mapKey: '' },
      ...(appInit || {}),
    };

    return mapKey || '';
  },
  getApiVersion: () => {
    const appInit = getAppInitConfigData();

    const { apiVersion } = {
      ...{ apiVersion: '' },
      ...(appInit || {}),
    };

    return apiVersion || '';
  },
  getUseVirtualRequest: () => {
    const appInit = getAppInitConfigData();

    const { useVirtualRequest } = {
      ...{ useVirtualRequest: false },
      ...(appInit || {}),
    };

    return useVirtualRequest || false;
  },
  getShowUseVirtualRequestMessage: () => {
    const appInit = getAppInitConfigData();

    const { showUseVirtualRequestMessage } = {
      ...{ showUseVirtualRequestMessage: false },
      ...(appInit || {}),
    };

    return showUseVirtualRequestMessage || false;
  },
  getShowLogInConsole: () => {
    const appInit = getAppInitConfigData();

    const { showLogInConsole } = {
      ...{ showLogInConsole: false },
      ...(appInit || {}),
    };

    return showLogInConsole || false;
  },
  getShowRequestInfo: () => {
    const appInit = getAppInitConfigData();

    const { showRequestInfo } = {
      ...{ showRequestInfo: false },
      ...(appInit || {}),
    };

    return showRequestInfo || false;
  },
  getPlatformName: () => {
    const appInit = getAppInitConfigData();

    const { platformName } = {
      ...{ platformName: '' },
      ...(appInit || {}),
    };

    return platformName || '';
  },
  getAppName: () => {
    const appInit = getAppInitConfigData();

    const { appName } = {
      ...{ appName: '' },
      ...(appInit || {}),
    };

    return appName || '';
  },
  getAppDescription: () => {
    const appInit = getAppInitConfigData();

    const { appDescription } = {
      ...{ appDescription: '' },
      ...(appInit || {}),
    };

    return appDescription || '';
  },
  getTitle: () => {
    const appInit = getAppInitConfigData();

    const { appName } = {
      ...{ appName: '' },
      ...(appInit || {}),
    };

    return appName || '';
  },
  getLoginLogo: () => {
    const appInit = getAppInitConfigData();

    const { loginLogo } = {
      ...{ loginLogo: emptyLogoImage },
      ...(appInit || {}),
    };

    return loginLogo || emptyLogoImage;
  },
  getShareLogo: () => {
    const appInit = getAppInitConfigData();

    const { shareLogo } = {
      ...{ shareLogo: emptyLogoImage },
      ...(appInit || {}),
    };

    return shareLogo || emptyLogoImage;
  },
  getShareLogoName: () => {
    const appInit = getAppInitConfigData();

    const { shareLogoName } = {
      ...{ shareLogoName: '' },
      ...(appInit || {}),
    };

    return shareLogoName || '';
  },
  getCompanyName: () => {
    const appInit = getAppInitConfigData();

    const { companyName } = {
      ...{ companyName: '' },
      ...(appInit || {}),
    };

    return companyName || '';
  },
  getLeftBarLogo: (remoteLogo) => {
    if (!stringIsNullOrWhiteSpace(remoteLogo || null)) {
      return remoteLogo;
    }

    const appInit = getAppInitConfigData();

    const { leftBarLogo } = {
      ...{ leftBarLogo: emptyLogoImage },
      ...(appInit || {}),
    };

    return leftBarLogo || emptyLogoImage;
  },
  getLeftBarText: () => {
    const appInit = getAppInitConfigData();

    const { leftBarText } = {
      ...{ leftBarText: '' },
      ...(appInit || {}),
    };

    return leftBarText || '';
  },
  getFooterImage: () => {
    const appInit = getAppInitConfigData();

    const { footerImage } = {
      ...{ footerImage: '' },
      ...(appInit || {}),
    };

    return footerImage || '';
  },
  getFooterText: () => {
    const appInit = getAppInitConfigData();

    const { footerText } = {
      ...{ footerText: '' },
      ...(appInit || {}),
    };

    return footerText || '';
  },
  getFooterDescription: () => {
    const appInit = getAppInitConfigData();

    const { footerDescription } = {
      ...{ footerDescription: '' },
      ...(appInit || {}),
    };

    return footerDescription || '';
  },
  getAppId: () => {
    const appInit = getAppInitConfigData();

    const { appId } = {
      ...{ appId: '' },
      ...(appInit || {}),
    };

    return appId || '';
  },
  getSimulationLocation: () => {
    const appInit = getAppInitConfigData();

    const { simulationLocation } = {
      ...{ simulationLocation: false },
      ...(appInit || {}),
    };

    return !!(simulationLocation || false);
  },
  getSimulationLocationData: () => {
    const appInit = getAppInitConfigData();

    const { simulationLocationData } = {
      ...{ simulationLocationData: {} },
      ...(appInit || {}),
    };

    return simulationLocationData || {};
  },
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
