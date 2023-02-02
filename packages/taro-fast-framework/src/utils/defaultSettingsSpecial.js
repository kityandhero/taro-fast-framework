import {
  checkStringIsNullOrWhiteSpace,
  getApplicationMergeConfig,
  requestMode,
  toNumber,
} from 'easy-soft-utility';

import {
  apiSuccessCode as apiSuccessCodeDefault,
  authenticationFailCode as authenticationFailCodeDefault,
  emptyLogo as emptyLogoImage,
  locationModeCollection,
  verifySignInResult,
} from 'taro-fast-common';

export function getSettingsAgency() {
  const appInit = getApplicationMergeConfig();

  return {
    getWebRootFontSize: () => {
      const { webRootFontSize } = {
        ...{ webRootFontSize: '142%' },
        ...(appInit || {}),
      };

      return webRootFontSize || '142%';
    },
    /**
     * 无权限时的跳转目标
     * @returns path string
     */
    getWithoutPermissionRedirectPath: () => {
      const { withoutPermissionRedirectPath } = {
        ...{ withoutPermissionRedirectPath: '' },
        ...(appInit || {}),
      };

      return withoutPermissionRedirectPath || '';
    },
    getFileUploadMaxSize: () => {
      const { fileUploadMaxSize } = {
        ...{ fileUploadMaxSize: 2 },
        ...(appInit || {}),
      };

      return fileUploadMaxSize || 2;
    },
    getAudioUploadMaxSize: () => {
      const { audioUploadMaxSize } = {
        ...{ audioUploadMaxSize: 4 },
        ...(appInit || {}),
      };

      return audioUploadMaxSize || 4;
    },
    getVideoUploadMaxSize: () => {
      const { videoUploadMaxSize } = {
        ...{ videoUploadMaxSize: 4 },
        ...(appInit || {}),
      };

      return videoUploadMaxSize || 4;
    },
    getImageUploadMaxSize: () => {
      const { imageUploadMaxSize } = {
        ...{ imageUploadMaxSize: 2 },
        ...(appInit || {}),
      };

      return imageUploadMaxSize || 2;
    },
    getShowSelectLanguage: () => {
      const { showSelectLanguage } = {
        ...{ showSelectLanguage: false },
        ...(appInit || {}),
      };

      return showSelectLanguage || false;
    },
    getShowLogoInLoginView: () => {
      const { showLogoInLoginView } = {
        ...{ showLogoInLoginView: false },
        ...(appInit || {}),
      };

      return showLogoInLoginView || false;
    },
    getEmptyLogo: () => {
      const { emptyLogo } = {
        ...{ emptyLogo: emptyLogoImage },
        ...(appInit || {}),
      };

      return emptyLogo || emptyLogoImage;
    },
    getInitialLocationMode: () => {
      const { initialLocationMode } = {
        ...{ initialLocationMode: locationModeCollection.custom },
        ...(appInit || {}),
      };

      return toNumber(initialLocationMode || locationModeCollection.custom);
    },
    getTokenAnonymous: () => {
      const { tokenAnonymous } = {
        ...{ tokenAnonymous: 'anonymous' },
        ...(appInit || {}),
      };

      return tokenAnonymous || 'anonymous';
    },
    getWeatherApi: () => {
      const { weatherApi } = {
        ...{ weatherApi: '' },
        ...(appInit || {}),
      };

      return weatherApi || '';
    },
    getDefaultMetaData: () => {
      const { defaultMetaData } = {
        ...{ defaultMetaData: {} },
        ...(appInit || {}),
      };

      return defaultMetaData || {};
    },
    getNavigationToSignInWhenSignInSilentFail: () => {
      const { navigationToSignInWhenSignInSilentFail } = {
        ...{ navigationToSignInWhenSignInSilentFail: false },
        ...(appInit || {}),
      };

      return navigationToSignInWhenSignInSilentFail || false;
    },
    getApiSuccessCode: () => {
      const { apiSuccessCode } = {
        ...{ apiSuccessCode: apiSuccessCodeDefault },
        ...(appInit || {}),
      };

      return apiSuccessCode || apiSuccessCodeDefault;
    },
    getAuthenticationFailCode: () => {
      const { authenticationFailCode } = {
        ...{
          authenticationFailCode: authenticationFailCodeDefault,
          ...(appInit || {}),
        },
      };

      return authenticationFailCode || authenticationFailCodeDefault;
    },
    getSignInSuccessFlag: () => {
      const { signInSuccessFlag } = {
        ...{ signInSuccessFlag: verifySignInResult.success },
        ...(appInit || {}),
      };

      return signInSuccessFlag || verifySignInResult.success;
    },
    getSignInFailFlag: () => {
      const { signInFailFlag } = {
        ...{ signInFailFlag: verifySignInResult.fail },
        ...(appInit || {}),
      };

      return signInFailFlag || verifySignInResult.fail;
    },
    getSignInUnknownFlag: () => {
      const { signInUnknownFlag } = {
        ...{ signInUnknownFlag: verifySignInResult.unknown },
        ...(appInit || {}),
      };

      return signInUnknownFlag || verifySignInResult.unknown;
    },
    getSignInPath: () => {
      const { signInPath } = {
        ...{ signInPath: '' },
        ...(appInit || {}),
      };

      return signInPath || '';
    },
    getDefaultLongitude: () => {
      const { defaultLongitude } = {
        ...{ defaultLongitude: '' },
        ...(appInit || {}),
      };

      return defaultLongitude || '';
    },
    getDefaultLatitude: () => {
      const { defaultLatitude } = {
        ...{ defaultLatitude: '' },
        ...(appInit || {}),
      };

      return defaultLatitude || '';
    },
    getUseLocation: () => {
      const { useLocation } = {
        ...{ useLocation: false },
        ...(appInit || {}),
      };

      return useLocation || false;
    },
    getMapKey: () => {
      const { mapKey } = {
        ...{ mapKey: '' },
        ...(appInit || {}),
      };

      return mapKey || '';
    },
    getApiVersion: () => {
      const { apiVersion } = {
        ...{ apiVersion: '' },
        ...(appInit || {}),
      };

      return apiVersion || '';
    },
    getDefaultRequestMode: () => {
      const { defaultRequestMode } = {
        ...{ defaultRequestMode: requestMode.real },
        ...(appInit || {}),
      };

      return checkStringIsNullOrWhiteSpace(defaultRequestMode)
        ? requestMode.real
        : defaultRequestMode;
    },
    getPromptSimulation: () => {
      const { promptSimulation } = {
        ...{ promptSimulation: false },
        ...(appInit || {}),
      };

      return promptSimulation || false;
    },
    getShowRequestInfo: () => {
      const { showRequestInfo } = {
        ...{ showRequestInfo: false },
        ...(appInit || {}),
      };

      return showRequestInfo || false;
    },
    getPlatformName: () => {
      const { platformName } = {
        ...{ platformName: '' },
        ...(appInit || {}),
      };

      return platformName || '';
    },
    getAppName: () => {
      const { appName } = {
        ...{ appName: '' },
        ...(appInit || {}),
      };

      return appName || '';
    },
    getAppDescription: () => {
      const { appDescription } = {
        ...{ appDescription: '' },
        ...(appInit || {}),
      };

      return appDescription || '';
    },
    getTitle: () => {
      const { appName } = {
        ...{ appName: '' },
        ...(appInit || {}),
      };

      return appName || '';
    },
    getLoginLogo: () => {
      const { loginLogo } = {
        ...{ loginLogo: emptyLogoImage },
        ...(appInit || {}),
      };

      return loginLogo || emptyLogoImage;
    },
    getShareLogo: () => {
      const { shareLogo } = {
        ...{ shareLogo: emptyLogoImage },
        ...(appInit || {}),
      };

      return shareLogo || emptyLogoImage;
    },
    getShareLogoName: () => {
      const { shareLogoName } = {
        ...{ shareLogoName: '' },
        ...(appInit || {}),
      };

      return shareLogoName || '';
    },
    getCompanyName: () => {
      const { companyName } = {
        ...{ companyName: '' },
        ...(appInit || {}),
      };

      return companyName || '';
    },
    getLeftBarLogo: (remoteLogo) => {
      if (!checkStringIsNullOrWhiteSpace(remoteLogo || null)) {
        return remoteLogo;
      }

      const { leftBarLogo } = {
        ...{ leftBarLogo: emptyLogoImage },
        ...(appInit || {}),
      };

      return leftBarLogo || emptyLogoImage;
    },
    getLeftBarText: () => {
      const { leftBarText } = {
        ...{ leftBarText: '' },
        ...(appInit || {}),
      };

      return leftBarText || '';
    },
    getFooterImage: () => {
      const { footerImage } = {
        ...{ footerImage: '' },
        ...(appInit || {}),
      };

      return footerImage || '';
    },
    getFooterText: () => {
      const { footerText } = {
        ...{ footerText: '' },
        ...(appInit || {}),
      };

      return footerText || '';
    },
    getFooterDescription: () => {
      const { footerDescription } = {
        ...{ footerDescription: '' },
        ...(appInit || {}),
      };

      return footerDescription || '';
    },
    getAppId: () => {
      const { appId } = {
        ...{ appId: '' },
        ...(appInit || {}),
      };

      return appId || '';
    },
    getSimulationLocation: () => {
      const { simulationLocation } = {
        ...{ simulationLocation: false },
        ...(appInit || {}),
      };

      return !!(simulationLocation || false);
    },
    getSimulationLocationData: () => {
      const { simulationLocationData } = {
        ...{ simulationLocationData: {} },
        ...(appInit || {}),
      };

      return simulationLocationData || {};
    },
    getRefreshSessionAliasName: () => {
      const { refreshSessionAliasName } = {
        ...{ refreshSessionAliasName: 'refreshSessionApiData' },
        ...(appInit || {}),
      };

      return refreshSessionAliasName || 'refreshSessionApiData';
    },
    getCheckTicketValidityAliasName: () => {
      const { checkTicketValidityAliasName } = {
        ...{ checkTicketValidityAliasName: 'checkTicketValidityApiData' },
        ...(appInit || {}),
      };

      return checkTicketValidityAliasName || 'checkTicketValidityApiData';
    },
    getSignInSilentAliasName: () => {
      const { signInSilentAliasName } = {
        ...{ signInSilentAliasName: 'signInSilentApiData' },
        ...(appInit || {}),
      };

      return signInSilentAliasName || 'signInSilentApiData';
    },
    getMetaDataAliasName: () => {
      const { metaDataAliasName } = {
        ...{ metaDataAliasName: 'metaDataApiData' },
        ...(appInit || {}),
      };

      return metaDataAliasName || 'metaDataApiData';
    },
  };
}
