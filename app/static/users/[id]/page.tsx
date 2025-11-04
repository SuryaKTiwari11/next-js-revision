import React from "react";

type User = any;

interface Props {
  user: User;
}

const UserPage = ({ user }: Props) => {
  return <h1>User Page (Static Site Generation)</h1>;
};

// getStaticPaths: tell Next.js all possible id values at build time
export const getStaticPaths = async () => {
  // we should get all user id array that we wanna use
  // fetch list of users (not a specific user)
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  const allUserId = data.users.map((user: any) => user.id);

  // this is only useful when u have a limited number of paths to pre-render at build time
  // we should always use this when blog posts or product pages
  // in terms of slowness: client side, server side and static generation
  return {
    paths: allUserId.map((id: number) => ({ params: { id: id.toString() } })),
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  // context is an object that contains various properties related to the request
  // one of those properties is params, which holds the dynamic route parameters
  // here we extract the id parameter from context.params
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  const data = await res.json();
  return {
    props: { user: data },
  };
};

export default UserPage;

// we are trying to render a dynamic route statically using getStaticProps
// but we must tell him all the possible values of id at build time using getStaticPaths
