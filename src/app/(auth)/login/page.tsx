export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-(--radius) border border-border p-8">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back — enter your credentials to continue.
        </p>
        {/* LoginForm will live in features/auth/components */}
      </div>
    </main>
  );
}
