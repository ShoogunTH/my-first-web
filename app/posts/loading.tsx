export default function Loading() {
  return (
    <div className="p-8 animate-pulse">
      {[...Array(5)].map((_: unknown, i: number) => (
        <div key={i}
             className="h-16 bg-gray-200 rounded mb-3" />
      ))}
    </div>
  );
}