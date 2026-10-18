import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MotionEffects } from "@/components/landing";
import { CheckEmailSection } from "@/components/registration";
import { REGISTERED_EMAIL_COOKIE } from "@/lib/auth/registration";

export const metadata: Metadata = {
  title: "Check Your Email",
  description: "Activate your new JONSON account from the confirmation email we sent you.",
  robots: { index: false, follow: true },
};

export default async function CheckEmailPage() {
  // Set by the register action; absent when the page is opened directly.
  const email = (await cookies()).get(REGISTERED_EMAIL_COOKIE)?.value;

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <CheckEmailSection email={email} />
    </div>
  );
}
