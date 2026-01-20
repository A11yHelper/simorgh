import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

/**
 * TODO: TASK T3: Implement the "Top Stories" section.
 *
 * Layout requirements:
 * - A standalone container with the title "Top Stories".
 * - The container MUST use: id="topStories".
 * - Display the first 3 items from data.items in a vertical list.
 * - Each item should include:
 *   - A clickable link showing the story title.
 *   - A date shown below the title.
 *
 * Data usage:
 * - Use item.href for the link.
 * - Use item.title as the link text.
 * - Format item.timestamp as a readable date.
 *
 * Do not hardcode content; render everything from props.data.
 */

const TopStories = ({ data }: TopStoriesProps) => {
  return <h1>TopStories</h1>;
};

export default TopStories;
