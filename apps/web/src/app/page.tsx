import Link from "next/link";

const navItems = [
  { href: "#products", label: "Products" },
  { href: "#solutions", label: "Solutions" },
  { href: "/login", label: "Login" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <p className="text-lg font-semibold tracking-tight">Software Store</p>
          <nav className="flex items-center gap-4 text-sm text-slate-600">
            {navItems.map((item) =>
              item.href.startsWith("#") ? (
                <a key={item.href} href={item.href} className="hover:text-slate-900">
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className="hover:text-slate-900">
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/register"
              className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-slate-800"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-16">
        <section className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Business software platform
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            One store for your company applications.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Register your organization, install business apps, and manage users
            from a single secure platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Create organization
            </Link>
            <a
              href="#products"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              Browse applications
            </a>
          </div>
        </section>

        <section id="products" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["CRM", "HR", "Finance"].map((name) => (
            <article
              key={name}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="mt-2 text-sm text-slate-600">
                Catalog entry will be driven by the application registry. This
                placeholder is not a hardcoded product catalog.
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
