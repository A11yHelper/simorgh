// src/app/components/A11yTaskEvaluator/index.tsx

import React, { useEffect, useMemo, useState } from 'react';
import type { EvaluationResult, Props } from './types';
import Panel from './Panel';
import { getEvaluator, getPanelTitle } from './registry';

/**
 * A11yTaskEvaluator
 * - T3 implemented: Link Labeling scoring (0/1/2)
 * - T4 placeholder: not implemented yet
 */
export default function A11yTaskEvaluator({
  taskId,
  t3ContainerSelector = '#topStories',
  enabled = true,
}: Props) {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [open, setOpen] = useState(true);

  const panelTitle = useMemo(() => getPanelTitle(taskId), [taskId]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    let cancelled = false;

    const run = async () => {
      try {
        const evaluator = getEvaluator(taskId);
        const r = await evaluator({ t3ContainerSelector });
        if (!cancelled) setResult(r);
      } catch (e: any) {
        const r: EvaluationResult = {
          taskId,
          score: 0,
          label: 'Error',
          summary: e?.message || 'Evaluation failed.',
          findings: [{ kind: 'axe', message: 'Evaluation threw an error.' }],
          meta: {},
        };
        if (!cancelled) setResult(r);
      }
    };

    // Run after layout settles a bit (avoid racing with client hydration)
    const t = window.setTimeout(run, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [enabled, taskId, t3ContainerSelector]);

  if (!enabled || !open) return null;

  return (
    <Panel title={panelTitle} result={result} onClose={() => setOpen(false)} />
  );
}
