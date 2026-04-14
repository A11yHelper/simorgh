'use client';

import React, { useEffect, useMemo, useState } from 'react';
import type { EvaluationResult, Props, TaskId } from './types';
import Panel from './Panel';
import { getEvaluator, getMultiPanelTitle, getPanelTitle } from './registry';

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default function A11yTaskEvaluator(props: Props) {
  const {
    enabled = true,
    t3ContainerSelector = '#topStories',
    t4ContainerSelector = '#t4SeoImageGrid',
  } = props;

  // 1) ensure SSR output is stable: render nothing until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 2) derive task ids safely (no undefined)
  const taskIds: TaskId[] = useMemo(() => {
    const raw = 'taskIds' in props ? props?.taskIds : [props?.taskId];
    return uniq(raw!.filter(Boolean)) as TaskId[];
  }, [props]);

  const [results, setResults] = useState<EvaluationResult[] | null>(null);
  const [open, setOpen] = useState(true);
  const showAxePanel =
    mounted && new URLSearchParams(window.location.search).get('axe') === '1';

  const panelTitle = useMemo(() => {
    if (taskIds.length === 1) return getPanelTitle(taskIds[0]);
    return getMultiPanelTitle(taskIds);
  }, [taskIds]);

  useEffect(() => {
    if (!enabled) return;
    if (!mounted) return;
    if (!showAxePanel) return;
    if (!open) return;
    if (taskIds.length === 0) return;

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
  }, [
    enabled,
    mounted,
    showAxePanel,
    open,
    taskIds,
    t3ContainerSelector,
    t4ContainerSelector,
  ]);

  // SSR & before mount: render nothing -> prevents hydration mismatch
  if (!mounted) return null;

  if (!enabled || !showAxePanel || !open || taskIds.length === 0) return null;

  return (
    <Panel
      title={panelTitle}
      results={results}
      onClose={() => setOpen(false)}
    />
  );
}
