import { showInfoMessage } from 'taro-fast-common/es/utils/tools';
import { pretreatmentRemoteSingleData } from 'taro-fast-framework/es/utils/requestAssistor';
import { reducerCommonCollection } from 'taro-fast-framework/es/utils/dva';
import { modelCollection } from 'taro-fast-framework/es/utils/globalModel';

import { getMetaDataCache, setMetaDataCache } from '@/utils/storageAssist';
import { getData } from '@/services/global';

export default {
  namespace: 'global',

  state: {
    ...(modelCollection || {}),
    ...{
      needSyncUserInfo: false,
      globalQuery: { path: '', query: {}, scene: 0 },
      rankList: [],
      sectionList: [],
    },
  },

  effects: {
    *getMetaData({ payload }, { call, put }) {
      const { force, showMessage } = payload || {
        force: false,
        showMessage: true,
      };
      let result = {};
      let fromRemote = force || false;

      if (!force) {
        result = getMetaDataCache();

        if ((result || null) == null) {
          fromRemote = true;
          result = {};
        }
      }

      if (fromRemote) {
        if (showMessage) {
          const text = '初始数据正在努力加载中, 需要一点点时间哦';

          showInfoMessage({
            message: text,
          });
        }

        const response = yield call(getData, payload);

        const data = pretreatmentRemoteSingleData(response);

        const { dataSuccess, data: metaData } = data;

        if (dataSuccess) {
          const { rankList, sectionList } = metaData;

          result = {
            rankList,
            sectionList,
          };

          setMetaDataCache(result);
        }
      }

      yield put({
        type: 'changeMetaData',
        payload: result,
      });
    },
  },

  reducers: {
    changeMetaData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    ...reducerCommonCollection,
  },
};
