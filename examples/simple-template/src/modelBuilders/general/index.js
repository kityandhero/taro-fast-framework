import {
  administrativeDivisionTypeCollection,
  buildModel as buildAdministrativeDivisionModel,
} from './administrativeDivision';
import {
  applicationUserFeedbackTypeCollection,
  buildModel as buildApplicationUserFeedbackModel,
} from './applicationUserFeedback';
import {
  buildModel as buildEntranceModel,
  entranceTypeCollection,
} from './entrance';
import { buildModel as buildGlobalModel, globalTypeCollection } from './global';
import {
  buildModel as buildSessionModel,
  sessionTypeCollection,
} from './session';
import { buildModel as buildShareModel, shareTypeCollection } from './share';
import { buildModel as buildUserModel, userTypeCollection } from './user';

export const modelTypeCollection = {
  sessionTypeCollection,
  entranceTypeCollection,
  globalTypeCollection,
  shareTypeCollection,
  userTypeCollection,
  administrativeDivisionTypeCollection,
  applicationUserFeedbackTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(
    buildSessionModel,
    buildEntranceModel,
    buildGlobalModel,
    buildShareModel,
    buildUserModel,
    buildAdministrativeDivisionModel,
    buildApplicationUserFeedbackModel,
  );

  return list;
}
