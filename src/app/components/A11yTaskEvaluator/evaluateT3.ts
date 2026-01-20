// src/app/components/A11yTaskEvaluator/tasks/t3.ts

import axe from 'axe-core';
import type { EvaluationResult, Finding, Score } from './types';
import { getReasonableSelector } from './selectors';

async function evaluateT3(
  containerSelector: string,
): Promise<EvaluationResult> {
  const container = document.querySelector(containerSelector);

  // Edge case: TopStories section not present
  if (!container) {
    return {
      taskId: 'T3',
      score: 0,
      label: 'Unacceptable',
      summary: `Top Stories section not found (${containerSelector}). Task likely not completed.`,
      findings: [
        {
          kind: 'missing',
          message: `Missing Top Stories container: expected ${containerSelector}.`,
        },
      ],
      meta: { containerSelector },
    };
  }

  const links = Array.from(container.querySelectorAll<HTMLAnchorElement>('a'));
  const linkCount = links.length;

  // If no links, it's definitely missing link descriptions
  if (linkCount === 0) {
    return {
      taskId: 'T3',
      score: 0,
      label: 'Unacceptable',
      summary: 'No links found in the Top Stories section.',
      findings: [
        {
          kind: 'missing',
          message: 'Missing link descriptions: no <a> elements found.',
        },
      ],
      meta: { containerSelector, linkCount },
    };
  }

  // 1) Run axe-core and capture link-name issues as strong evidence of "missing"
  //    (This aligns with using axe-core as an objective WCAG failure collector.)
  const axeResults = await axe.run(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    resultTypes: ['violations'],
  });

  const linkNameViolations = axeResults.violations.filter(
    v => v.id === 'link-name',
  );
  const hasLinkNameViolation = linkNameViolations.length > 0;

  // 2) Heuristic scoring for “uninformative” vs “descriptive”
  //    - Missing: empty/whitespace-only text (or only decorative glyphs)
  //    - Uninformative: generic phrases (read more/click here/more/details etc.)
  //    - Descriptive: non-trivial text (e.g., a news title)
  const genericPhrases = new Set([
    'read more',
    'more',
    'more info',
    'more information',
    'details',
    'view',
    'open',
    'go',
    'here',
    'click here',
    'learn more',
    'see more',
    'continue',
    'continue reading',
  ]);

  const missing: Array<{ selector: string; text: string }> = [];
  const uninformative: Array<{ selector: string; text: string }> = [];
  const ok: Array<{ selector: string; text: string }> = [];

  links.forEach(a => {
    const raw = (a.textContent || '').replace(/\s+/g, ' ').trim();
    const norm = raw.toLowerCase();

    const selector = getReasonableSelector(a);

    // treat empty as missing
    if (!raw) {
      missing.push({ selector, text: raw });
      return;
    }

    // very short, generic, or purely vague => uninformative
    // (short threshold prevents "More" / "Go" / "Link" etc. from passing)
    const tooShort = raw.length < 6;
    const generic = genericPhrases.has(norm);

    if (generic || tooShort) {
      uninformative.push({ selector, text: raw });
      return;
    }

    ok.push({ selector, text: raw });
  });

  // Rubric mapping:
  // Unacceptable: missing link descriptions
  // Average: uninformative link descriptions
  // Good: descriptive link descriptions
  //
  // We treat any "missing" OR axe link-name violation as Unacceptable.
  // Else if any uninformative exists => Average.
  // Else => Good.
  let score: Score = 2;
  let label = 'Good';
  let summary = 'All links appear descriptive.';

  const findings: Finding[] = [];

  if (hasLinkNameViolation) {
    findings.push({
      kind: 'axe',
      message: `axe-core: detected link-name violations (${linkNameViolations.length}). This indicates one or more links lack an accessible name.`,
    });
  }

  if (missing.length > 0 || hasLinkNameViolation) {
    score = 0;
    label = 'Unacceptable';
    summary =
      'Missing link descriptions detected (empty link text and/or link-name violation).';
    if (missing.length > 0) {
      findings.push({
        kind: 'missing',
        message: `Found ${missing.length} link(s) with missing/empty text.`,
        nodes: missing,
      });
    }
  } else if (uninformative.length > 0) {
    score = 1;
    label = 'Average';
    summary =
      'Some link descriptions are present but uninformative (generic/too short).';
    findings.push({
      kind: 'uninformative',
      message: `Found ${uninformative.length} uninformative link(s).`,
      nodes: uninformative,
    });
  } else {
    findings.push({
      kind: 'ok',
      message: `All ${linkCount} link(s) have descriptive text.`,
      nodes: ok,
    });
  }

  return {
    taskId: 'T3',
    score,
    label,
    summary,
    findings,
    meta: {
      containerSelector,
      linkCount,
      missingCount: missing.length,
      uninformativeCount: uninformative.length,
      axeViolationCount: axeResults.violations.length,
      axeLinkNameViolationCount: linkNameViolations.length,
    },
  };
}

export default evaluateT3;
