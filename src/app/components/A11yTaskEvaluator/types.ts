export type TaskId = 'T3' | 'T4';
export type Score = 0 | 1 | 2;

export type Finding = {
  kind: 'missing' | 'uninformative' | 'ok' | 'axe';
  message: string;
  nodes?: Array<{ selector: string; text: string }>;
};

export type EvaluationResult = {
  taskId: TaskId;
  score: Score;
  label: string;
  summary: string;
  findings: Finding[];
  meta: Record<string, string | number | boolean>;
};

export type Props = {
  taskId: TaskId;
  /** optional override; defaults match your TopStories sample */
  t3ContainerSelector?: string; // default "#topStories"
  /** show/hide panel */
  enabled?: boolean;
};

export type EvaluatorContext = {
  t3ContainerSelector: string;
};

export type TaskEvaluator = (
  ctx: EvaluatorContext,
) => Promise<EvaluationResult>;
