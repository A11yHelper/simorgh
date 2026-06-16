export function getReasonableSelector(el: Element): string {
  // Prefer id if available; otherwise build a short path
  const id = (el as HTMLElement)?.id;
  if (id) return `#${CSS.escape(id)}`;

  // Use nearest ancestor with id as anchor
  let cur: Element | null = el;
  const parts: string[] = [];
  let steps = 0;

  while (cur && steps < 4) {
    const tag = cur.tagName.toLowerCase();
    const parent = cur.parentElement;
    if (!parent) break;

    const siblings: Element[] = Array.from(
      parent.children as HTMLCollectionOf<Element>,
    ).filter((c: Element) => c.tagName === cur!.tagName);
    const idx = siblings.indexOf(cur);
    const part = siblings.length > 1 ? `${tag}:nth-of-type(${idx + 1})` : tag;
    parts.unshift(part);

    const pid = (parent as HTMLElement).id;
    if (pid) {
      parts.unshift(`#${CSS.escape(pid)}`);
      break;
    }
    cur = parent;
    steps++;
  }

  return parts.join(' > ') || el.tagName.toLowerCase();
}

export function querySelectorAllSafe(
  root: Element,
  selector: string,
): Element[] {
  try {
    return Array.from(root.querySelectorAll(selector));
  } catch {
    return [];
  }
}
