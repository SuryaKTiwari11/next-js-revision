import Image from "next/image";
import { notFound } from "next/navigation";
type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  image: string;
  address?: {
    address: string;
    city: string;
    country: string;
  };
  phone: string;
  username: string;
  university: string;
  company?: {
    name: string;
    title: string;
  };
  crypto?: {
    coin: string;
    network: string;
    wallet: string;
  };
  role?: string;
};
/*
Important note:

- Use full web URLs in Server Components:
    The server can fetch external addresses directly, so
    "https://dummyjson.com/users/${id}" works reliably.

- Avoid relative API shortcuts in Server Components:
    "/api/users/${id}" may fail during build or when the server
    can't reach its own API endpoint.

Rule of thumb:
- Server Components: use full web addresses (https://...).
- Client Components (browser code): it's fine to use shortcuts (/api/...).
*/
//this is ofc server side rendering
async function getUser(id: string): Promise<User> {
  if (isNaN(Number(id))) {
    notFound();
  }
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch user: ${res.status}`);
    }

    const data = await res.json();

    if (!data || !data.id) {
      notFound();
    }

    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to load user");
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-2">
        {user.firstName} {user.lastName}
      </h1>
      {user.image && user.firstName && (
        <Image
          src={user.image}
          alt={user.firstName}
          width={96}
          height={96}
          className="rounded-full mb-4"
        />
      )}
      <div className="space-y-2">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Age:</strong> {user.age}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        {user.address && (
          <p>
            <strong>Address:</strong> {user.address.address},{" "}
            {user.address.city}, {user.address.country}
          </p>
        )}
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>University:</strong> {user.university}
        </p>
        {user.company && (
          <p>
            <strong>Company:</strong> {user.company.name} ({user.company.title})
          </p>
        )}
        {user.crypto && (
          <>
            <p>
              <strong>Crypto:</strong> {user.crypto.coin} ({user.crypto.network}
              )
            </p>
            <p>
              <strong>Wallet:</strong> {user.crypto.wallet}
            </p>
          </>
        )}
        {user.role && (
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        )}
      </div>
    </div>
  );
}
