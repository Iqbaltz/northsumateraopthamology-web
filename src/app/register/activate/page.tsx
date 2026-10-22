import type { Metadata } from "next";
import { MotionEffects } from "@/components/landing";
import { ActivateSection } from "@/components/registration";
import { activationStatus } from "@/lib/ojs/activation";

export const metadata: Metadata = {
  title: "Activate Your Account",
  description: "Confirm your email address to activate your JONSON account.",
  robots: { index: false, follow: true },
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ActivatePage({ searchParams }: PageProps) {
  // Put here by the jonsonSession OJS plugin, which redirects the email's link.
  const { id, key } = await searchParams;
  const link = {
    id: typeof id === "string" ? id : "",
    key: typeof key === "string" ? key : "",
  };

  // Only looks the link up; activating takes the button. If OJS can't be reached,
  // the button still shows and reports the failure when pressed.
  const status =
    link.id && link.key ? ((await activationStatus(link)) ?? "pending") : "invalid";

  return (
    <div className="overflow-hidden text-[#0c0c0c]">
      <MotionEffects />
      <ActivateSection link={link} status={status} />
    </div>
  );
}
