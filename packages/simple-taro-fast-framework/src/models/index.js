import { embedModelCollection } from 'taro-fast-framework/es/models';

import global from './global';
import session from './session';
import entrance from './entrance';

import simulation from './simulation';

import news from './news';
import article from './article';

export default embedModelCollection(
  global,
  session,
  entrance,
  simulation,
  news,
  article,
);
