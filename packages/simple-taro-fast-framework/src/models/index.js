import { appendBuilder } from 'taro-fast-framework/es/models';

import { buildAdministrativeDivision } from './administrativeDivision';
import { buildArticle } from './article';
import { buildCustomer } from './customer';
import { buildEntrance } from './entrance';
import { buildGlobal } from './global';
import { buildNews } from './news';
import { buildSession } from './session';
import { buildSimulation } from './simulation';

function collectModelBuilder() {
  appendBuilder(buildAdministrativeDivision);
  appendBuilder(buildArticle);
  appendBuilder(buildCustomer);
  appendBuilder(buildEntrance);
  appendBuilder(buildGlobal);
  appendBuilder(buildNews);
  appendBuilder(buildSession);
  appendBuilder(buildSimulation);
}

collectModelBuilder();

export function prepareModel() {}
