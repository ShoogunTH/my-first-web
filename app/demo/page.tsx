import Counter from '../components/Counter';
interface Post {
  id: number;
  title: string;
}
export default async function Demo(){
  const r = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=3');
  const posts: Post[] = await r.json();
  return (
    <div>
      <Counter />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}