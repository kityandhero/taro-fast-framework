import {
  buildPromptModuleInfo,
  isFunction,
  logConfig,
  logExecute,
  setModelNameList,
} from 'easy-soft-utility';

import { modulePackageName } from '../utils/definition';

import { buildSchedulingControl } from './schedulingControl';

export const modelContainer = {
  builders: [],
  buildComplete: false,
  models: [],
};

/**
 * Module Name.
 */
const moduleName = 'models';

export function getBuilderCount() {
  return modelContainer.builders.length;
}

export function appendBuilder(builder) {
  if (!isFunction(builder)) {
    throw new Error(
      buildPromptModuleInfo(
        modulePackageName,
        `appendBuilder -> builder must be none parameter function and return an object, current is ${typeof builder}`,
        moduleName,
      ),
    );
  }

  modelContainer.builders.push(builder);
}

export function buildModelCollection() {
  logExecute('buildModelCollection');

  appendBuilder(buildSchedulingControl);

  const list = modelContainer.builders.map((o) => {
    const model = o();

    return model;
  });

  modelContainer.buildComplete = true;

  modelContainer.models = list;
}

export function getModelCollection() {
  if (!modelContainer.buildComplete) {
    buildModelCollection();

    const modelNames = modelContainer.models
      .map((item) => {
        const { namespace: ns } = item;

        return ns;
      })
      .join();

    logConfig(`all models -> ${modelNames}`);

    setModelNameList(modelNames);
  }

  return modelContainer.models;
}
