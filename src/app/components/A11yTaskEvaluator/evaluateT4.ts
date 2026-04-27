import type { EvaluationResult, Finding, Score } from './types';
import { getReasonableSelector } from './selectors';
import { runAxeSerially } from './axeRunner';

/**
 * T4: Adding alt-text (Enhance Image for SEO)
 *
 * Rubric mapping:
 * - Unacceptable: Missing or uninformative alt-text
 * - Average: Added alt-text with < 3 required descriptors
 * - Good: Added alt-text with >= 3 out of 4 required descriptors
 *
 * What we check (container-scoped):
 * 1) Presence of container and <img> elements (edge cases).
 * 2) Missing alt: no alt attribute OR empty string.
 * 3) Uninformative alt: too short / generic / filename-like.
 * 4) Descriptor count: heuristic count of 4 descriptor categories.
 * 5) axe-core as supporting evidence: image-alt / image-redundant-alt
 */

function normalize(s: string) {
  return (s || '').replace(/\s+/g, ' ').trim();
}

function isFilenameLike(alt: string) {
  const t = alt.toLowerCase();
  // crude but effective for "image123.jpg" / "c4059be0.webp"
  return /\.(png|jpg|jpeg|webp|gif|svg)\b/.test(t) || /[a-f0-9]{8,}/.test(t);
}

const GENERIC_ALTS = new Set([
  'image',
  'photo',
  'picture',
  'thumbnail',
  'sport',
  'sports',
  'news',
  'bbc',
  'article image',
  'news image',
  'bbc news',
  'bbc sport',
]);

function isUninformativeAlt(altRaw: string) {
  const alt = normalize(altRaw);
  if (!alt) return true;
  const lower = alt.toLowerCase();
  if (lower.length < 8) return true;
  if (GENERIC_ALTS.has(lower)) return true;
  if (isFilenameLike(lower)) return true;
  return false;
}

/**
 * Heuristic descriptor counter (4 categories).
 * You can tune keyword sets later without changing rubric wiring.
 *
 * Categories:
 * 1) subject (who/what)      -> non-trivial text length, not generic
 * 2) action/event            -> verb-ish or event keywords
 * 3) context/place           -> location/context keywords
 * 4) time/occasion           -> date/time/occasion keywords
 */
function countDescriptors(altRaw: string) {
  const alt = normalize(altRaw);
  const t = alt.toLowerCase();

  const hits: string[] = [];

  // (1) subject: at least 3 tokens and not generic
  const tokens = t.split(/\s+/).filter(Boolean);
  if (tokens.length >= 3 && alt.length >= 12 && !GENERIC_ALTS.has(t)) {
    hits.push('subject');
  }

  // (2) action/event
  const actionWords = [
    'scores',
    'scoring',
    'celebrates',
    'celebrating',
    'speaks',
    'speaking',
    'performs',
    'performing',
    'plays',
    'playing',
    'holds',
    'holding',
    'wins',
    'winning',
    'loses',
    'losing',
    'match',
    'game',
    'super bowl',
    'champions league',
  ];
  if (actionWords.some(w => t.includes(w))) hits.push('action/event');

  // (3) context/place
  const contextWords = [
    'stadium',
    'pitch',
    'crowd',
    'stage',
    'arena',
    'new orleans',
    'london',
    'glasgow',
    'celtic park',
    'press conference',
    'ceremony',
    'outside',
    'inside',
    'during',
  ];
  if (contextWords.some(w => t.includes(w))) hits.push('context/place');

  // (4) time/occasion
  const timeWords = [
    '2025',
    '2024',
    '2023',
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
    'after',
    'before',
    'during',
    'final',
    'semi-final',
  ];
  const hasYear = /\b(19|20)\d{2}\b/.test(t);
  if (hasYear || timeWords.some(w => t.includes(w))) hits.push('time/occasion');

  const uniq = Array.from(new Set(hits));
  return { count: uniq.length, hits: uniq };
}

async function evaluateT4(
  containerSelector: string,
): Promise<EvaluationResult> {
  const container = document.querySelector(containerSelector);

  // Edge case: T4 container not present
  if (!container) {
    return {
      taskId: 'T4',
      score: 0,
      label: 'Unacceptable',
      summary: `T4 section not found (${containerSelector}). Task likely not completed.`,
      findings: [
        {
          kind: 'missing',
          message: `Missing T4 container: expected ${containerSelector}.`,
        },
      ],
      meta: { containerSelector },
    };
  }

  const images = Array.from(
    container.querySelectorAll<HTMLImageElement>('img'),
  );
  const imageCount = images.length;

  if (imageCount === 0) {
    return {
      taskId: 'T4',
      score: 0,
      label: 'Unacceptable',
      summary: 'No images found in the T4 section.',
      findings: [
        {
          kind: 'missing',
          message: 'Missing images: no <img> elements found in the section.',
        },
      ],
      meta: { containerSelector, imageCount },
    };
  }

  // Run axe-core and capture image-alt issues as strong evidence
  const axeResults = await runAxeSerially(container, {
    runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    resultTypes: ['violations'],
  });

  const imageAltViolations = axeResults.violations.filter(
    v => v.id === 'image-alt' || v.id === 'image-redundant-alt',
  );
  const hasImageAltViolation = imageAltViolations.length > 0;

  // Analyze each image
  const missing: Array<{ selector: string; text: string }> = [];
  const uninformative: Array<{ selector: string; text: string }> = [];
  const under3: Array<{
    selector: string;
    text: string;
    descriptors: string[];
  }> = [];
  const ok: Array<{ selector: string; text: string; descriptors: string[] }> =
    [];

  images.forEach(img => {
    const selector = getReasonableSelector(img);
    const altRaw = img.getAttribute('alt');

    // Missing alt (attribute missing OR empty)
    if (altRaw === null || normalize(altRaw) === '') {
      missing.push({ selector, text: altRaw ?? '' });
      return;
    }

    // Uninformative alt
    if (isUninformativeAlt(altRaw)) {
      uninformative.push({ selector, text: normalize(altRaw) });
      return;
    }

    // Descriptor scoring
    const { count, hits } = countDescriptors(altRaw);
    if (count < 3) {
      under3.push({ selector, text: normalize(altRaw), descriptors: hits });
    } else {
      ok.push({ selector, text: normalize(altRaw), descriptors: hits });
    }
  });

  // Rubric mapping:
  // Unacceptable: Missing or uninformative alt-text
  // Average: Added alt-text with < 3 required descriptors
  // Good: Added alt-text with >= 3 out of 4 required descriptors
  //
  // Treat any missing/uninformative OR axe image-alt violation as Unacceptable.
  // Else if any under3 => Average.
  // Else => Good.
  let score: Score = 2;
  let label = 'Good';
  let summary = 'All images have descriptive alt-text (>= 3 descriptors).';

  const findings: Finding[] = [];

  if (hasImageAltViolation) {
    findings.push({
      kind: 'axe',
      message: `axe-core: detected image alt violations (${imageAltViolations.length}). This indicates one or more images are missing or have problematic alt-text.`,
    });
  }

  if (missing.length > 0 || uninformative.length > 0 || hasImageAltViolation) {
    score = 0;
    label = 'Unacceptable';
    summary = 'Missing or uninformative alt-text detected.';

    if (missing.length > 0) {
      findings.push({
        kind: 'missing',
        message: `Found ${missing.length} image(s) with missing/empty alt.`,
        nodes: missing,
      });
    }
    if (uninformative.length > 0) {
      findings.push({
        kind: 'uninformative',
        message: `Found ${uninformative.length} image(s) with uninformative alt-text.`,
        nodes: uninformative,
      });
    }
  } else if (under3.length > 0) {
    score = 1;
    label = 'Average';
    summary = 'Alt-text exists, but some images have < 3 required descriptors.';
    findings.push({
      kind: 'uninformative',
      message: `Found ${under3.length} image(s) with < 3 descriptors.`,
      nodes: under3.map(u => ({
        selector: u.selector,
        text: `${u.text} (descriptors: ${u.descriptors.join(', ') || 'none'})`,
      })),
    });
  } else {
    findings.push({
      kind: 'ok',
      message: `All ${imageCount} image(s) have >= 3 descriptors in alt-text.`,
      nodes: ok.map(o => ({
        selector: o.selector,
        text: `${o.text} (descriptors: ${o.descriptors.join(', ')})`,
      })),
    });
  }

  return {
    taskId: 'T4',
    score,
    label,
    summary,
    findings,
    meta: {
      containerSelector,
      imageCount,
      missingCount: missing.length,
      uninformativeCount: uninformative.length,
      under3Count: under3.length,
      goodCount: ok.length,
      axeViolationCount: axeResults.violations.length,
      axeImageAltViolationCount: imageAltViolations.length,
    },
  };
}

export default evaluateT4;
