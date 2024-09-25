import React from "react";
import OnboardingForm from "@/components/authentication/onboarding-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const OnbordingPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="h-screen w-full flex justify-center items-center p-6">
      <OnboardingForm session={session} />
    </div>
  );
};

export default OnbordingPage;
