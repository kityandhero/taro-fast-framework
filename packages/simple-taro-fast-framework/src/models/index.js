import { embedModelCollection } from 'taro-fast-framework/es/models';

import global from './global';
import session from './session';
import entrance from './entrance';

import simulation from './simulation';

import news from './news';
import article from './article';
import customer from './customer';
import administrativeDivision from './administrativeDivision';

export default embedModelCollection(
  global,
  session,
  entrance,
  simulation,
  news,
  article,
  customer,
  administrativeDivision,
);
