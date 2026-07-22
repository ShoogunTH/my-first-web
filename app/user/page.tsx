interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}
async function getUsers(): Promise<User[]> {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  return res.json();
}
export default async function UsersPage() {
  const users: User[] = await getUsers();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
      </h1>
      <ul className="space-y-2">
        {users.map((user: User) => (
          <li key={user.id} className="p-3 bg-white rounded shadow">
            <strong>{user.name}</strong>
            <span className="text-gray-500 ml-2">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}