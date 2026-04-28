import { render, screen } from '../../react-testing-library-with-providers';
import TopStories from '.';
import { MostReadData } from '../types';

const data: MostReadData = {
  lastRecordTimeStamp: '2026-04-28T00:00:00Z',
  items: [
    {
      id: 'story-1',
      rank: 1,
      href: 'https://www.bbc.com/news/story-1',
      title: 'First story title',
      timestamp: 1704110400000,
    },
    {
      id: 'story-2',
      rank: 2,
      href: 'https://www.bbc.com/news/story-2',
      title: 'Second story title',
      timestamp: 1704196800000,
    },
    {
      id: 'story-3',
      rank: 3,
      href: 'https://www.bbc.com/news/story-3',
      title: 'Third story title',
      timestamp: 1704283200000,
    },
    {
      id: 'story-4',
      rank: 4,
      href: 'https://www.bbc.com/news/story-4',
      title: 'Fourth story title',
      timestamp: 1704369600000,
    },
  ],
};

describe('TopStories', () => {
  it('should render the top stories section with the first 3 items', () => {
    const { container } = render(<TopStories data={data} />, {
      service: 'news',
    });

    expect(container.querySelector('#topStories')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Top Stories' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'First story title' }),
    ).toHaveAttribute('href', 'https://www.bbc.com/news/story-1');
    expect(screen.getByText('1 January 2024')).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Second story title' }),
    ).toHaveAttribute('href', 'https://www.bbc.com/news/story-2');
    expect(screen.getByText('2 January 2024')).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Third story title' }),
    ).toHaveAttribute('href', 'https://www.bbc.com/news/story-3');
    expect(screen.getByText('3 January 2024')).toBeInTheDocument();

    expect(
      screen.queryByRole('link', { name: 'Fourth story title' }),
    ).not.toBeInTheDocument();
  });
});
