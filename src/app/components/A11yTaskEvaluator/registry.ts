import type { TaskId, TaskEvaluator } from './types';
import evaluateT3 from './evaluateT3';
import evaluateT4 from './evaluateT4';

const evaluators: Record<TaskId, TaskEvaluator> = {
  T3: async ctx => evaluateT3(ctx.t3ContainerSelector),
  T4: async ctx => evaluateT4(ctx.t4ContainerSelector),
};

export function getEvaluator(taskId: TaskId): TaskEvaluator {
  return evaluators[taskId];
}

export function getPanelTitle(taskId: TaskId): string {
  if (taskId === 'T3') return 'Replication Eval — T3 (Link Labeling)';
  if (taskId === 'T4') return 'Replication Eval — T4 (Alt-text)';
  return 'Replication Eval';
}

export function getMultiPanelTitle(taskIds: TaskId[]): string {
  return `Replication Eval — ${taskIds.join(' + ')}`;
}
