export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-(--radius) border border-border p-8">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p className="text-sm text-muted-foreground">
          Join Schar and start shopping today.
        </p>
        {/* RegisterForm will live in features/auth/components */}
      </div>
    </main>
  );
}
