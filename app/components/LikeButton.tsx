import { useState } from 'react';
// TypeScript: กําหนด type ให้ props
interface LikeButtonProps {
  postId: number;
}
export default function LikeButton({ postId }: LikeButtonProps) {
  // useState<T> — TypeScript รู ้ type ของ state
  const [liked, setLiked] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const handleLike = (): void => {
    setLiked((prev: boolean) => !prev);
    setCount((prev: number) => prev + (liked ? -1 : 1));
  };
  return (
    <button
      onClick={handleLike}
      className={`px-4 py-2 rounded-full ${
        liked ? 'bg-red-500 text-white'
               : 'bg-gray-100 text-gray-700'
      }`}
    >
      {liked ? '❤️' : '🤍'}  {count}
    </button>
  );
}
// ใช้: <LikeButton postId={post.id} />