import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveStringToLocalStorage,
  toNumber,
  whetherString,
} from 'easy-soft-utility';

const storageKeyCollection = {
  simulationMode: 'simulationMode',
};

export function getSimulationMode() {
  const key = storageKeyCollection.simulationMode;

  const d = getStringFromLocalStorage(key);

  if ((d || null) == null) {
    return false;
  }

  return d === whetherString.yes;
}

export function setSimulationMode(o) {
  const key = storageKeyCollection.simulationMode;

  return saveStringToLocalStorage(
    key,
    toNumber(o) ? whetherString.yes : whetherString.no,
  );
}

export function removeSimulationMode() {
  const key = storageKeyCollection.simulationMode;

  removeLocalStorage(key);
}
