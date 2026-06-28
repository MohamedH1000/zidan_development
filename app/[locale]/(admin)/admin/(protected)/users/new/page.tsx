import { UserForm } from "@/components/admin/user-form";

export default function NewUserPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">New user</h1>
      <p className="mt-1 text-sm text-ink-400">Create an admin, editor or author.</p>
      <div className="mt-6">
        <UserForm />
      </div>
    </div>
  );
}
