import { getDispatch } from 'easy-soft-dva';
import {
  checkObjectIsNullOrEmpty,
  isArray,
  isEmptyArray,
  isString,
  mergeTextMessage,
  promptTextBuilder,
} from 'easy-soft-utility';

/**
 * switch control assist
 */
export const switchControlAssist = {
  /**
   * check switch
   * @param {Object} switchControl switch model
   * @param {string} flag switch flag
   */
  check(switchControl, flag) {
    if (isArray(flag)) {
      let result = false;

      for (const o of flag) {
        if (!isString(o)) {
          continue;
        }

        result = !!switchControl[o];

        if (result) {
          break;
        }
      }

      return result;
    } else {
      if (!isString(flag)) {
        return false;
      }

      return !!switchControl[flag];
    }
  },
  /**
   * open switch
   * @param {string} flag switch flag
   */
  open(flag, ...message) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::open',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/open',
      payload: { flag, message },
    });
  },
  /**
   * close switch
   * @param {string} flag switch flag
   */
  close(flag, ...message) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::close',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/close',
      payload: { flag, message },
    });
  },
  /**
   * remove switch
   * @param {string} flag switch flag
   */
  remove(flag, ...message) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::remove',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/remove',
      payload: { flag, message },
    });
  },
  /**
   * open multi switch
   * @param {Array} flags switch flag
   */
  openMulti(flags, ...message) {
    if (!isArray(flags) || isEmptyArray(flags)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::openMulti',
          promptTextBuilder.buildMustArray({}),
          'must be string array, disallow empty array',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/openMulti',
      payload: { flags, message },
    });
  },
  /**
   * close multi switch
   * @param {Array} flags switch flag
   */
  closeMulti(flags, ...message) {
    if (!isArray(flags) || isEmptyArray(flags)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::closeMulti',
          promptTextBuilder.buildMustArray({}),
          'must be string array, disallow empty array',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/closeMulti',
      payload: { flags, message },
    });
  },
  /**
   * remove multi switch
   * @param {Array} flags switch flag
   */
  removeMulti(flags, ...message) {
    if (!isArray(flags) || isEmptyArray(flags)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::removeMulti',
          promptTextBuilder.buildMustArray({}),
          'must be string array, disallow empty array',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/removeMulti',
      payload: { flags, message },
    });
  },
};
