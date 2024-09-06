import { buildPromptModuleInfo, mergeTextMessage } from 'easy-soft-utility';

/**
 * Module Package Name
 */
export const modulePackageName = 'taro-fast-framework';

export function buildPromptModuleInfoText(
  moduleName,
  text,
  ancillaryInformation = '',
) {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}
