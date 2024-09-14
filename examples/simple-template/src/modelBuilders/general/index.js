import {
  administrativeDivisionTypeCollection,
  buildModel as buildAdministrativeDivisionModel,
} from './administrativeDivision';
import {
  buildModel as buildCustomerModel,
  customerTypeCollection,
} from './customer';
import {
  buildModel as buildEntranceModel,
  entranceTypeCollection,
} from './entrance';
import {
  buildModel as buildFlowCaseModel,
  flowCaseTypeCollection,
} from './flowCase';
import { buildModel as buildGlobalModel, globalTypeCollection } from './global';
import {
  buildModel as buildSessionModel,
  sessionTypeCollection,
} from './session';
import { buildModel as buildShareModel, shareTypeCollection } from './share';

export const modelTypeCollection = {
  sessionTypeCollection,
  entranceTypeCollection,
  globalTypeCollection,
  shareTypeCollection,
  flowCaseTypeCollection,
  customerTypeCollection,
  administrativeDivisionTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(
    buildSessionModel,
    buildEntranceModel,
    buildGlobalModel,
    buildShareModel,
    buildFlowCaseModel,
    buildCustomerModel,
    buildAdministrativeDivisionModel,
  );

  return list;
}
