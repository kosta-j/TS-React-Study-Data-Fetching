import { type ReactNode, useEffect, useState } from 'react';
import fetchingImage from './assets/data-fetching.png';
import BlogPosts, { type BlogPost } from './components/BlogPosts';
import ErrorMessage from './components/ErrorMessage';
import { get } from './util/http';

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = (await get(
          'https://jsonplaceholder.typicode.com/todos'
        )) as RawDataBlogPost[];

        const blogPost: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text:
              rawPost.body ??
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim fugiat recusandae eaque in fugit quo soluta dignissimos nulla at tempore unde id magni temporibus quasi assumenda voluptates, ratione repellat veniam.',
          };
        });
        setFetchedPosts(blogPost);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;
  if (error) {
    content = <ErrorMessage text={error} />;
  }
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  if (isFetching) {
    content = <p className="loading-fallback">Fetching posts...</p>;
  }

  return (
    <main>
      <img
        src={fetchingImage}
        alt="An abstract image depicting a data fetching process"
      />
      {content}
    </main>
  );
}

export default App;
