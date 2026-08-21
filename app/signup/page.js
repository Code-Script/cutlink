import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 px-5 py-10"><AuthForm mode="signup" /></main>;
}
