import SignIn from "@/components/auth/SignIn";
import Nav from "@/components/layouts/Nav";

export default async function Home() {
  return (
    <>
      <Nav />
      <main>
        <div className="page">
          <SignIn />
        </div>
      </main>
    </>
  );
}
