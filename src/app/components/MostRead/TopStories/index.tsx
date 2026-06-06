import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const formatDate = (iso?: string | number | null) => {
  if (!iso) return '';
  const d = new Date(iso as string | number);
  if (Number.isNaN(d.getTime())) return '';
  const day = d.getUTCDate();
  const month = d.getUTCMonth();
  const year = d.getUTCFullYear();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${day} ${monthNames[month]} ${year}`;
};

const TopStories = ({ data }: TopStoriesProps) => {
  const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];

  if (items.length === 0) return null;

  const sectionStyle: React.CSSProperties = {
    padding: '12px 0',
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const itemStyle = (isLast: boolean): React.CSSProperties => ({
    padding: '12px 0',
    borderBottom: isLast ? 'none' : '1px solid #eee',
  });

  const linkStyle: React.CSSProperties = {
    color: '#1a1a1a',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 600,
  };

  const timeStyle: React.CSSProperties = {
    color: '#6b6b6b',
    fontSize: '0.875rem',
    marginTop: '6px',
    display: 'block',
  };

  return (
    <section
      id="topStories"
      aria-labelledby="topStories-heading"
      style={sectionStyle}
    >
      <h2 id="topStories-heading" style={{ margin: '0 0 8px 0' }}>
        Top Stories
      </h2>

      <ul style={listStyle}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const ts = item?.timestamp as string | number | undefined | null;
          const readable = formatDate(ts);
          return (
            <li key={item?.href ?? idx} style={itemStyle(isLast)}>
              <article>
                <h3 style={{ margin: 0 }}>
                  <a href={item?.href ?? '#'} style={linkStyle}>
                    {item?.title ?? ''}
                  </a>
                </h3>
                {readable && (
                  <time
                    dateTime={
                      ts
                        ? new Date(ts as string | number).toISOString()
                        : undefined
                    }
                    style={timeStyle}
                  >
                    {readable}
                  </time>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopStories;
