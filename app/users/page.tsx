"use client";
import useSWR from "swr";
import Link from "next/link";
// import note on swr in simpler terms
// {
//   swr is a React hook library for data fetching.
//  It stands for "stale-while-revalidate,"
//   which is a strategy to first return cached data (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.
//   It helps in keeping the UI fast and responsive by using cached data while ensuring that the data is always fresh.
// }

const fetcher = (url) => fetch(url).then((res) => res.json());

const UserPage = () => {
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const users = Array.isArray(data?.users) ? data.users : [];

  return (
    <div>
      User Page
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.firstName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
