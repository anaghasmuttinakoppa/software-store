import Link from "next/link";

export default function LoginPlaceholderPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mt-2 text-slate-600">
        Authentication is not implemented yet. This page is a placeholder for
        the platform login flow.
      </p>
      <Link href="/" className="mt-6 text-sm font-medium text-slate-900 underline">
        Back to home
      </Link>
    </main>
  );
}
