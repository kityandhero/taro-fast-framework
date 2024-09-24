import {
  checkObjectIsNullOrEmpty,
  getTacitlyState,
  isArray,
  isEmptyArray,
  logTrace,
  mergeArrowText,
  mergeTextMessage,
  promptTextBuilder,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'switchControl',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *open({ payload, alias }, { put }) {
        const { flag, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::open',
              promptTextBuilder.buildMustString({ name: 'payload.flag' }),
              'disallow empty string',
            ),
          );
        }

        const data = {};

        data[flag] = true;

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'switchControl::open'),
          `switch flag "${flag}" change to true`,
        );

        return data;
      },
      *close({ payload, alias }, { put }) {
        const { flag, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::close',
              promptTextBuilder.buildMustString({ name: 'payload.flag' }),
              'disallow empty string',
            ),
          );
        }

        const data = {};

        data[flag] = false;

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'switchControl::close'),
          `switch flag "${flag}" change to false`,
        );

        return data;
      },
      *openMulti({ payload, alias }, { put }) {
        const { flags, message } = { flags: [], message: [], ...payload };

        if (!isArray(flags) || isEmptyArray(flags)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::openMulti',
              promptTextBuilder.buildMustArray({ name: 'payload.flags' }),
              'must be string array, disallow empty array',
            ),
          );
        }

        const data = {};

        for (const o of flags) {
          data[o] = true;
        }

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'switchControl::openMulti'),
          `switch flags "${flags.join(',')}" change to true`,
        );

        return data;
      },
      *closeMulti({ payload, alias }, { put }) {
        const { flags, message } = { flags: [], message: [], ...payload };

        if (!isArray(flags) || isEmptyArray(flags)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::closeMulti',
              promptTextBuilder.buildMustArray({ name: 'payload.flags' }),
              'must be string array, disallow empty array',
            ),
          );
        }

        const data = {};

        for (const o of flags) {
          data[o] = false;
        }

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'switchControl::closeMulti'),
          `switch flags "${flags.join(',')}" change to false`,
        );

        return data;
      },
      *remove({ payload, alias }, { put }) {
        const { flag, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::remove',
              promptTextBuilder.buildMustString({ name: 'payload.flag' }),
              'disallow empty string',
            ),
          );
        }

        yield put({
          type: reducerNameCollection.reducerRemoveKey,
          payload: flag,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'switchControl::remove'),
          `switch flag "${flag}" will remove`,
        );
      },
      *removeMulti({ payload, alias }, { put }) {
        const { flags, message } = { flags: [], message: [], ...payload };

        if (!isArray(flags) || isEmptyArray(flags)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::removeMulti',
              promptTextBuilder.buildMustArray({ name: 'payload.flags' }),
              'must be string array, disallow empty array',
            ),
          );
        }

        yield put({
          type: reducerNameCollection.reducerRemoveKey,
          payload: flags,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'switchControl::removeMulti'),
          `switch flags "${flags.join(',')}" will remove`,
        );
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
