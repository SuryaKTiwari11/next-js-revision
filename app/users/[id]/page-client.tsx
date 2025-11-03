"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
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

const UserInfoPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params.id;
  console.log("Fetched ID from params:", id);

  useEffect(() => {
    async function fetchDataById() {
      if (!id) {
        setError("ID not found");
        return;
      }

      const response = await fetch(`/api/users/${id}`);
      const data = await response.json();

      setUser(data);
    }
    if (id) fetchDataById();
  }, [id]);

  if (!user) return <div className="text-white">Loading...</div>;

  return (
      <div className="p-6 max-w-xl mx-auto text-white">
        {error && <div className="mb-4 text-red-500">{error}</div>}
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
      <p className="mb-1">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mb-1">
        <strong>Age:</strong> {user.age}
      </p>
      <p className="mb-1">
        <strong>Gender:</strong> {user.gender}
      </p>
      <p className="mb-1">
        <strong>Address:</strong> {user.address?.address}, {user.address?.city},{" "}
        {user.address?.country}
      </p>
      <p className="mb-1">
        <strong>Phone:</strong> {user.phone}
      </p>
      <p className="mb-1">
        <strong>Username:</strong> {user.username}
      </p>
      <p className="mb-1">
        <strong>University:</strong> {user.university}
      </p>
      <p className="mb-1">
        <strong>Company:</strong> {user.company?.name} ({user.company?.title})
      </p>
      <p className="mb-1">
        <strong>Crypto:</strong> {user.crypto?.coin} ({user.crypto?.network})
      </p>
      <p className="mb-1">
        <strong>Wallet:</strong> {user.crypto?.wallet}
      </p>
      <p className="mb-1">
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
};

export default UserInfoPage;
