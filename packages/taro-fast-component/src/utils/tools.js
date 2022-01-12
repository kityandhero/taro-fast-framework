import { isArray } from 'taro-fast-common/es/utils/typeCheck';

const PREFIX = 'tfc-';

const REGEXP = new RegExp('{|}|"', 'g');

function keys(obj) {
  return JSON.stringify(obj)
    .replace(REGEXP, '')
    .split(',')
    .map(function (item) {
      return item.split(':')[0];
    });
}

function join(name, mods) {
  name = PREFIX + name;
  mods = mods.map(function (mod) {
    return name + '--' + mod;
  });
  mods.unshift(name);
  return mods.join(' ');
}

function traversing(mods, conf) {
  if (!conf) {
    return;
  }

  // 加前缀
  if (typeof conf === 'string' || typeof conf === 'number') {
    mods.push(conf);
  } else if (isArray(conf)) {
    // 加前缀
    conf.forEach(function (item) {
      traversing(mods, item);
    });
  } else if (typeof conf === 'object') {
    // 加属性
    keys(conf).forEach(function (key) {
      conf[key] && mods.push(key);
    });
  }
}

export function bem(name, conf) {
  const mods = [];
  traversing(mods, conf);
  return join(name, mods);
}
