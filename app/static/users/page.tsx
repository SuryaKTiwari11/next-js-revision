const UserPage = (props) => {
  return;
  <div>
    <h1>User Page (Static Site Generation)</h1>
  </div>;
};
export const getStaticProps = async () => {
  const data = await fetch("https://dummyjson.com/users").then((res) =>
    res.json()
  );
  return {
    props: { users: data.users },
  };
};
export default UserPage;

//the fundamental difference btw staticProps and serverSideProps is when they run and how often they fetch data.
//getStaticProps runs at build time to fetch data and generate static pages
//getServerSideProps runs on the server for each request and fetches data before rendering the page