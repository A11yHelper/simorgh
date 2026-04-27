import axe from 'axe-core';

type AxeRunOptions = Parameters<typeof axe.run>[1];
type AxeResults = {
  violations: Array<{ id: string }>;
};

let pendingAxeRun = Promise.resolve();

export function runAxeSerially(
  target: Parameters<typeof axe.run>[0],
  options?: AxeRunOptions,
): Promise<AxeResults> {
  const run = pendingAxeRun.then(
    () => axe.run(target, options) as unknown as AxeResults,
  );

  pendingAxeRun = run.then(
    () => undefined,
    () => undefined,
  );

  return run;
}