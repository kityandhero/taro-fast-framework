import { modulePackageName } from '../utils';

export function buildPrimaryCallName(name) {
  return `${modulePackageName}::interactiveWrappers::${name || ''}`;
}
