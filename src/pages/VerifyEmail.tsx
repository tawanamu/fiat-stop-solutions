import { useState } from "react";
import { auth } from "@/lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const [sent, setSent] = useState(false);

  const resend = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      setSent(true);
    }
  };

  return (
    <div className="container mx-auto max-w-md py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Verify your email</h1>
      <p className="mb-6">
        We sent a verification link to your email address. Please check your inbox and click the link before signing in.
      </p>
      {sent ? (
        <p className="text-green-600 mb-4">Verification email resent!</p>
      ) : (
        <Button onClick={resend}>Resend Verification Email</Button>
      )}
    </div>
  );
};

export default VerifyEmail;