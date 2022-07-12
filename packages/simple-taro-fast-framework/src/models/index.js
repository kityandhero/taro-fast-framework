import { embedModelCollection } from 'taro-fast-framework/es/models';

import administrativeDivision from './administrativeDivision';
import article from './article';
import customer from './customer';
import entrance from './entrance';
import global from './global';
import news from './news';
import session from './session';
import simulation from './simulation';

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
