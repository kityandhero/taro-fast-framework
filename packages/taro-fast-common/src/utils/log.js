import { inCollection, stringIsNullOrWhiteSpace } from './base';
import { logLevel, logShowMode } from './constants';
import { getAppInitConfigData } from './core';
import { isString } from './typeCheck';

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordLog(record, showMode, level = logLevel.debug) {
  let showModeModified =
    (showMode || null) == null || stringIsNullOrWhiteSpace(showMode)
      ? logShowMode.unknown
      : showMode;

  if (
    !inCollection(
      [logShowMode.unknown, logShowMode.text, logShowMode.object],
      showModeModified,
    )
  ) {
    throw new Error(`无效的日志显示模式:${showModeModified}`);
  }

  if (showModeModified === logShowMode.unknown) {
    if (isString(record)) {
      showModeModified = logShowMode.text;
    } else {
      showModeModified = logShowMode.object;
    }
  }

  if (logShowInConsole() && level === logLevel.trace) {
    if (showModeModified === logShowMode.text) {
      const data = { trace: record };

      console.log('%c%s', 'color:#596032;', JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log('%c%s', 'color:#596032;', { trace: record });
    }
  }

  if (logShowInConsole() && level === logLevel.debug) {
    if (showModeModified === logShowMode.text) {
      const data = { debug: record };

      console.log('%c%s', 'color:#00768f;', JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ debug: record });
    }
  }

  if (logShowInConsole() && level === logLevel.warn) {
    if (showModeModified === logShowMode.text) {
      const data = { warn: record };

      console.log('%c%s', 'color:#ff4f49;', JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ warn: record });
    }
  }

  if (logShowInConsole() && level === logLevel.info) {
    if (showModeModified === logShowMode.text) {
      const data = { info: record };

      console.log('%c%s', 'color:#89ca78;', JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ info: record });
    }
  }

  if (logShowInConsole() && level === logLevel.execute) {
    if (showModeModified === logShowMode.text) {
      const data = { execute: record };

      console.log('%c%s', 'color:#C39BD3;', JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ execute: record });
    }
  }

  if (logShowInConsole() && level === logLevel.config) {
    if (showModeModified === logShowMode.text) {
      const data = { config: record };

      console.log('%c%s', 'color:#F8C471;', JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ config: record });
    }
  }

  if (level === logLevel.error) {
    if (showModeModified === logShowMode.text) {
      const data = { error: record };

      console.error(JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.error({ error: record });
    }
  }
}

export function recordWarn(record) {
  if (isString(record)) {
    recordText(record, logLevel.warn);
  } else {
    recordObject(record, logLevel.warn);
  }
}

export function recordInfo(record) {
  if (isString(record)) {
    recordText(record, logLevel.info);
  } else {
    recordObject(record, logLevel.info);
  }
}

export function recordConfig(record) {
  if (isString(record)) {
    recordText(record, logLevel.config);
  } else {
    recordObject(record, logLevel.config);
  }
}

export function recordTrace(record) {
  if (isString(record)) {
    recordText(record, logLevel.trace);
  } else {
    recordObject(record, logLevel.trace);
  }
}

export function recordDebug(record) {
  if (isString(record)) {
    recordText(record, logLevel.debug);
  } else {
    recordObject(record, logLevel.debug);
  }
}

export function recordExecute(record) {
  if (isString(record)) {
    recordText(record, logLevel.execute);
  } else {
    recordObject(record, logLevel.execute);
  }
}

/**
 * 记录错误信息
 */
export function recordError(record) {
  if (isString(record)) {
    recordText(record, logLevel.error);
  } else {
    recordObject(record, logLevel.error);
  }
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordText(record, level = logLevel.trace) {
  recordLog(record, logShowMode.text, level);
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordObject(record, level = logLevel.trace) {
  recordLog(record, logShowMode.object, level);
}

function logShowInConsole() {
  const appInit = getAppInitConfigData();
  const result = !!(appInit.showLogInConsole || false);

  return result;
}
