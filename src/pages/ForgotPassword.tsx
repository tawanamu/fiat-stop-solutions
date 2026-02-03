// src/pages/ForgotPassword.tsx
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError("Failed to send reset email.");
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-md py-16">
      <h2 className="text-2xl font-bold mb-4">Reset password</h2>
      {sent ? (
        <div className="text-green-600">Check your inbox for a reset link.</div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          {error && <div className="text-red-600">{error}</div>}
          <div>
            <Label>Email</Label>
            <Input value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <Button type="submit">Send reset email</Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
