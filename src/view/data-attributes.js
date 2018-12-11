// @flow
import prefix from './prefix';

export const prefixDataAttribute = (value: string) => prefix(`data-${value}`);
export const dragHandle: string = prefixDataAttribute('drag-handle');
export const draggable: string = prefixDataAttribute('draggable');
export const droppable: string = prefixDataAttribute('droppable');
export const placeholder: string = prefixDataAttribute('placeholder');
