import { appendExtraBuilder } from 'easy-soft-utility';

import { buildAdministrativeDivision } from './administrativeDivision';
import { buildArticle } from './article';
import { buildCustomer } from './customer';
import { buildEntrance } from './entrance';
import { buildGlobal } from './global';
import { buildNews } from './news';
import { buildSession } from './session';
import { buildSimulation } from './simulation';

function collectModelBuilder() {
  appendExtraBuilder(buildAdministrativeDivision);
  appendExtraBuilder(buildArticle);
  appendExtraBuilder(buildCustomer);
  appendExtraBuilder(buildEntrance);
  appendExtraBuilder(buildGlobal);
  appendExtraBuilder(buildNews);
  appendExtraBuilder(buildSession);
  appendExtraBuilder(buildSimulation);
}

collectModelBuilder();

export function prepareModel() {}
