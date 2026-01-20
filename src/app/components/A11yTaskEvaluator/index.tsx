import React, { useEffect, useMemo, useState } from 'react';
import type { EvaluationResult, Props, TaskId } from './types';
import Panel from './Panel';
import { getEvaluator, getMultiPanelTitle, getPanelTitle } from './registry';

export default function A11yTaskEvaluator(props: Props) {
  const {
    enabled = true,
    t3ContainerSelector = '#topStories',
    t4ContainerSelector = '#t4SeoImageGrid',
  } = props;

  const taskIds: TaskId[] = useMemo(() => {
    return 'taskIds' in props ? props?.taskIds || [] : [props?.taskId];
  }, [props]);

  const [results, setResults] = useState<EvaluationResult[] | null>(null);
  const [open, setOpen] = useState(true);

  const panelTitle = useMemo(() => {
    if (taskIds.length === 1) return getPanelTitle(taskIds[0]);
    return getMultiPanelTitle(taskIds);
  }, [taskIds]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    let cancelled = false;

    const run = async () => {
      const ctx = { t3ContainerSelector, t4ContainerSelector };

      const settled = await Promise.allSettled(
        taskIds.map(async taskId => {
          const evaluator = getEvaluator(taskId);
          return evaluator(ctx);
        }),
      );

      const next: EvaluationResult[] = settled.map((s, idx) => {
        const taskId = taskIds[idx];
        if (s.status === 'fulfilled') return s.value;

        const e: any = s.reason;
        return {
          taskId,
          score: 0,
          label: 'Error',
          summary: e?.message || 'Evaluation failed.',
          findings: [{ kind: 'axe', message: 'Evaluation threw an error.' }],
          meta: {},
        };
      });

      if (!cancelled) setResults(next);
    };

    const t = window.setTimeout(run, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [enabled, taskIds, t3ContainerSelector, t4ContainerSelector]);

  if (!enabled || !open) return null;

  return (
    <Panel
      title={panelTitle}
      results={results}
      onClose={() => setOpen(false)}
    />
  );
}
