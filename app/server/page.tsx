// /d:/revision-next-js/app/server/page.tsx
// Server (app directory) route: fetch users from dummyjson and render on the server

import { get } from "http";

type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username?: string;
    image?: string;
};

async function fetchUsers(): Promise<User[]> {
    const res = await fetch("https://dummyjson.com/users");
    if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
    }
    const data = await res.json();
    return (data?.users ?? []) as User[];
}

export default async function UserPage(): Promise<JSX.Element> {
    const users = await fetchUsers();

    return (
        <main>
            <h1>Users</h1>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>
                        {u.firstName} {u.lastName} — {u.email}
                    </li>
                ))}
            </ul>
        </main>
    )
}
/*
Notes — app vs pages (Next.js)

- app directory
    - Server Components by default.
    - You can use async components and fetch data directly (no need for getServerSideProps/getStaticProps).
    - Ideal for colocating data fetching and UI.

- pages directory (Pages Router)
    - Use getServerSideProps or getStaticProps when you need SSR/SSG and must pass data as props.
    - To make a component run on the client, add the "use client" directive at the top of the file.

Summary:
- Use the app router for server-first components and direct async data fetching.
- Use the pages router when you rely on the legacy data-fetching methods (getServerSideProps/getStaticProps).
in simpler terms getServerSideProps : runs on the server for each request and fetches data before rendering the page
in simpler terms getStaticProps : runs at build time to fetch data and generate static pages
the main difference btw getServerSideProps and getStaticProps is when they run and how often they fetch data.
*/

/* 
explame of getServerSideProps and getStaticProps in pages directory:
export const getServerSideProps = async () => {
const data = await fetch('https://dummyjson.com/users').then(res => res.json());
return {
props: { users: data.users }
};
}
const UserPage = (props) => {
return (
<div>
<h1>SSR</h1>
<ul>
{props.users.map((user) => (
<li key={user.id}>{user.firstName}</li>
))}
</ul>
</div>
);
};
export default UserPage;
this shows us that getServerSideProps fetches data on each request and passes it as props to the component.
*/

//1->SERVER SIDE RENDERING IS BETTER BECAUSE THE USERS WONT BE ABLE TO SEE WHAT API WE ARE FETCHING FROM
//2->SERVER SIDE RENDERING IMPROVES SEO BECAUSE THE CONTENT IS RENDERED ON THE SERVER AND SENT TO THE BROWSER AS A COMPLETE HTML PAGE
//3->SERVER SIDE RENDERING CAN HANDLE DYNAMIC DATA BETTER BECAUSE IT FETCHES DATA ON EACH REQUEST
//4->SERVER SIDE RENDERING CAN BE SLOWER THAN CLIENT SIDE RENDERING BECAUSE IT REQUIRES A ROUND TRIP TO THE SERVER FOR EACH REQUEST
//5->CLIENT SIDE RENDERING CAN PROVIDE A MORE INTERACTIVE USER EXPERIENCE BECAUSE IT ALLOWS FOR DYNAMIC UPDATES WITHOUT RELOADING THE PAGE