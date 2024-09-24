import { appendEmbedBuilder } from 'easy-soft-utility';

import { buildModel as buildSchedulingControlModel } from './schedulingControl';
import { buildModel as buildSwitchControlModel } from './switchControl';

export function appendEmbedModelBuilder() {
  appendEmbedBuilder(buildSchedulingControlModel);
  appendEmbedBuilder(buildSwitchControlModel);
}
