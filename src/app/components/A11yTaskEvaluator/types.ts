// types.ts
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

export type EvaluatorContext = {
  t3ContainerSelector: string;
  t4ContainerSelector: string; // NEW
};

export type TaskEvaluator = (ctx: EvaluatorContext) => Promise<EvaluationResult>;

// 兼容旧用法：taskId 单个；新增 taskIds 多个
export type Props =
  | {
      enabled?: boolean;
      taskId: TaskId;
      taskIds?: never;
      t3ContainerSelector?: string;
      t4ContainerSelector?: string;
    }
  | {
      enabled?: boolean;
      taskIds: TaskId[];
      taskId?: never;
      t3ContainerSelector?: string;
      t4ContainerSelector?: string;
    };
