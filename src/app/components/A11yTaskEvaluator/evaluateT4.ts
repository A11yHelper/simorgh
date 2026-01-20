// src/app/components/A11yTaskEvaluator/tasks/t4.ts

import type { EvaluationResult } from './types';

async function evaluateT4(): Promise<EvaluationResult> {
  return {
    taskId: 'T4',
    score: 0,
    label: 'Not implemented',
    summary: 'Evaluator for this task is not implemented yet.',
    findings: [],
    meta: {},
  };
}

export default evaluateT4;
