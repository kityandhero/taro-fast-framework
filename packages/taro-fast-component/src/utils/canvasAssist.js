import Taro from '@tarojs/taro';

import {
  environmentCollection,
  isNull,
  isUndefined,
  logException,
} from 'easy-soft-utility';

import { getEnvironment, getFields } from 'taro-fast-common';

export function getCanvasContext({
  id,
  canvasId = '',
  target,
  context: queryContext = null,
  reference: queryReference = null,
  callback = () => {},
}) {
  getFields(`#${id}`, queryContext, queryReference)
    .then((n) => {
      let context = null;
      let canvas = null;

      if (!n) {
        logException(n, `getFields id[${id}] fail`);

        return { context, canvas };
      }

      const environment = getEnvironment();

      switch (environment) {
        case environmentCollection.WEAPP: {
          canvas = n.node;

          if (isUndefined(canvas) || isNull(canvas)) {
            logException({}, `get canvas fail in env [${environment}]`);
          } else {
            context = canvas.getContext('2d');

            if (isUndefined(context) || isNull(context)) {
              logException(
                {},
                `get canvas context fail in env [${environment}]`,
              );
            }
          }

          break;
        }

        case environmentCollection.ALIPAY: {
          logException(
            {},
            `framework with env [${environment}] has no adaptation`,
          );

          break;
        }

        case environmentCollection.SWAN: {
          logException(
            {},
            `framework with env [${environment}] has no adaptation`,
          );

          break;
        }

        case environmentCollection.WEB: {
          context = Taro.createCanvasContext(canvasId, target);

          if (isUndefined(context) || isNull(context)) {
            logException({}, `get canvas context fail in env [${environment}]`);
          } else {
            canvas = context.canvas;
          }

          break;
        }

        default: {
          logException(
            {},
            `framework with env [${environment}] has no adaptation`,
          );

          break;
        }
      }

      return { context, canvas };
    })
    .then((o) => {
      if (isUndefined(o) || isNull(o)) {
        logException(o, `get canvas context fail in callback`);

        // eslint-disable-next-line promise/no-callback-in-promise
        callback(null, null);
      } else {
        const { context, canvas } = o;

        // eslint-disable-next-line promise/no-callback-in-promise
        callback(context ?? null, canvas ?? null);
      }

      return null;
    })
    .catch((error) => {
      logException(error, `error when getCanvasContext`);
    });
}
