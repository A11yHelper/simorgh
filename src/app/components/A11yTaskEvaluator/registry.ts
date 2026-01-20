import type { TaskId, TaskEvaluator } from './types';
import evaluateT3 from './evaluateT3';
import evaluateT4 from './evaluateT4';

export function getEvaluator(taskId: TaskId): TaskEvaluator {
  if (taskId === 'T3') {
    return async ctx => evaluateT3(ctx.t3ContainerSelector);
  }
  // T4 reserved
  return async () => evaluateT4();
}

export function getPanelTitle(taskId: TaskId): string {
  if (taskId === 'T3') return 'Replication Eval — T3 (Link Labeling)';
  if (taskId === 'T4') return 'Replication Eval — T4 (Alt-text)';
  return 'Replication Eval';
}
