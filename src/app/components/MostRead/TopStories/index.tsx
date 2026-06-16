import moment from 'moment';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const TopStories = ({ data }: TopStoriesProps) => {
  const items = data?.items?.slice(0, 3) ?? [];

  if (items.length === 0) return null;

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>
      <ul>
        {items.map(item => {
          // a11y-helper FIXME: Confirm desired date format and locale for display
          const iso = item.timestamp ? moment(item.timestamp).toISOString() : undefined;
          const readable = item.timestamp ? moment(item.timestamp).format('D MMMM YYYY') : '';

          const key = (item as any).id ?? item.href ?? item.title;

          return (
            <li key={key}>
              <a href={item.href}>{item.title}</a>
              {iso ? (
                <div>
                  <time dateTime={iso}>{readable}</time>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopStories;
