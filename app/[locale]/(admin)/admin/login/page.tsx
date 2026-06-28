import { Suspense } from "react";
import { LoginForm } from "@/components/admin/login-form";

// Login is always rendered on demand (uses search params + auth).
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
