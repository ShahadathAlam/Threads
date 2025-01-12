import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      redirectUrl="/dashboard" // Redirect to /dashboard after sign-in
    />
  );
}
