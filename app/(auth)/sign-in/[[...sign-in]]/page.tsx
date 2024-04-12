import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main
      className="flex items-center h-screen w-full justify-end pr-20 pb-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/img/kzt_site.jpg')" }}
    >
      <div className="">
        <SignIn afterSignInUrl={"/"} />
      </div>
    </main>
  );
}
