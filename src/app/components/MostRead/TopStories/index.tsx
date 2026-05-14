import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const formatTimestamp = (ts?: string) => {
  if (!ts) return null;
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return null;
  return { iso: d.toISOString(), readable: d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) };
};

const TopStories = ({ data }: TopStoriesProps) => {
  const items = Array.isArray(data?.items) ? data.items.slice(0, 3) : [];

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>
      <ul>
        {items.map((item, idx) => {
          const formatted = formatTimestamp(item?.timestamp);
          return (
            <li key={item?.href || idx}>
              <article>
                <h3>
                  <a href={item?.href ?? '#'}>{item?.title ?? ''}</a>
                </h3>
                {formatted && (
                  <p>
                    <time dateTime={formatted.iso}>{formatted.readable}</time>
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
