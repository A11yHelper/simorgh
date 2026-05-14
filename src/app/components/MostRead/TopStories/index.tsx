import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const formatTimestamp = (ts?: string | number | null) => {
  if (ts == null) return null;
  const d = new Date(ts as string | number);
  if (Number.isNaN(d.getTime())) return null;
  return {
    iso: d.toISOString(),
    readable: d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
};

const TopStories = ({ data }: TopStoriesProps) => {
  const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];

  if (items.length === 0) return null;

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>

      <ul>
        {items.map((item, idx) => {
          const ts = formatTimestamp(item?.timestamp);
          return (
            <li key={item?.href ?? idx}>
              <article>
                <h3>
                  <a href={item?.href ?? '#'}>{item?.title ?? ''}</a>
                </h3>
                {ts && (
                  <p>
                    <time dateTime={ts.iso}>{ts.readable}</time>
                  </p>
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
