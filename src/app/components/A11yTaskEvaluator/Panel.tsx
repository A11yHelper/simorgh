import type { EvaluationResult } from './types';
import styles from './styles';
import scoreBadgeStyle from './ScoreBadge';
import { getPanelTitle } from './registry';

type PanelProps = {
  title: string;
  results: EvaluationResult[] | null;
  onClose: () => void;
};

export default function Panel({ title, results, onClose }: PanelProps) {
  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div style={{ fontWeight: 900 }}>{title}</div>
        <button type="button" style={styles.btn} onClick={onClose}>
          close
        </button>
      </div>

      {!results ? (
        <div style={{ opacity: 0.85, marginTop: 8 }}>Running checks…</div>
      ) : (
        <>
          {results.map((result, i) => (
            <div
              key={result.taskId}
              style={{
                marginTop: i === 0 ? 10 : 14,
                paddingTop: i === 0 ? 0 : 12,
                borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,.12)',
              }}
            >
              <div style={{ fontWeight: 900, marginBottom: 6 }}>
                {getPanelTitle(result.taskId)}
              </div>

              <div style={{ marginTop: 6 }}>
                <span style={scoreBadgeStyle(result.score)}>
                  Score: {result.score} / 2
                </span>
                <span style={{ marginLeft: 8, fontWeight: 800 }}>
                  {result.label}
                </span>
              </div>

              <div style={{ marginTop: 8, opacity: 0.9 }}>{result.summary}</div>

              <div
                style={{
                  marginTop: 10,
                  borderTop: '1px solid rgba(255,255,255,.12)',
                  paddingTop: 10,
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Evidence</div>

                {result.findings.length === 0 ? (
                  <div style={{ opacity: 0.85 }}>No findings.</div>
                ) : (
                  result.findings.map((f, idx) => (
                    <div key={idx} style={styles.finding}>
                      <div style={{ fontWeight: 800 }}>
                        {f.kind.toUpperCase()}
                      </div>
                      <div style={{ opacity: 0.92, marginTop: 2 }}>
                        {f.message}
                      </div>

                      {f.nodes && f.nodes.length > 0 && (
                        <div style={{ marginTop: 6 }}>
                          {f.nodes.slice(0, 6).map((n, j) => (
                            <div key={j} style={styles.nodeLine}>
                              <code style={styles.code}>{n.selector}</code>
                              <span style={{ marginLeft: 6, opacity: 0.9 }}>
                                “{n.text}”
                              </span>
                            </div>
                          ))}
                          {f.nodes.length > 6 && (
                            <div style={{ opacity: 0.75, marginTop: 4 }}>
                              +{f.nodes.length - 6} more…
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {Object.keys(result.meta).length > 0 && (
                <div
                  style={{
                    marginTop: 10,
                    borderTop: '1px solid rgba(255,255,255,.12)',
                    paddingTop: 10,
                  }}
                >
                  <div style={{ fontWeight: 800, marginBottom: 6 }}>Meta</div>
                  {Object.entries(result.meta).map(([k, v]) => (
                    <div key={k} style={{ opacity: 0.9 }}>
                      <code style={styles.code}>{k}</code>: {String(v)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
