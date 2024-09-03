import { isArray } from 'easy-soft-utility';

const PREFIX = 'tfc-';

const REGEXP = new RegExp('{|}|"', 'g');

function keys(object) {
  return JSON.stringify(object)
    .replaceAll(REGEXP, '')
    .split(',')
    .map(function (item) {
      return item.split(':')[0];
    });
}

function join(name, mods) {
  name = PREFIX + name;

  mods = mods.map(function (o) {
    return name + '--' + o;
  });

  mods.unshift(name);

  return mods.join(' ');
}

function traversing(mods, o) {
  if (!o) {
    return;
  }

  // 加前缀
  if (typeof o === 'string' || typeof o === 'number') {
    mods.push(o);
  } else if (isArray(o)) {
    // 加前缀
    for (const item of o) {
      traversing(mods, item);
    }
  } else if (typeof o === 'object') {
    // 加属性
    for (const key of keys(o)) {
      o[key] && mods.push(key);
    }
  }
}

export function bem(name, o) {
  const mods = [];

  traversing(mods, o);

  return join(name, mods);
}
