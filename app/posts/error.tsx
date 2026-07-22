"use client";

// TypeScript: กําหนด type ให้ props
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
export default function ErrorPage(
  { error, reset }: ErrorProps
) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-red-500 text-xl font-bold">
        เกิดข้อผิดพลาด!
      </h2>
      <p className="text-gray-600 mb-4">
        {error.message}
      </p>
      <button
        onClick={(): void => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded">
        ลองอีกครัง
      </button>
    </div>
  );
}