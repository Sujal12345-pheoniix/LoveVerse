import { getLoggedInUser, getAdminStatsAction } from "@/app/actions";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

export const metadata = {
  title: "Admin Panel | LoveVerse",
  description: "Monitor user registrations, views count, plan upgrades, and story metrics."
};

export default async function AdminPage() {
  const user = await getLoggedInUser();

  if (!user || user.email !== "admin@loveverse.app") {
    redirect("/");
  }

  const result = await getAdminStatsAction();

  if (!result.success || !result.stats) {
    return (
      <main className="min-h-screen bg-[#070114] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-serif mb-4">Error loading stats</h1>
        <p className="text-red-300 text-sm mb-6">{result.error || "Please contact developer support."}</p>
      </main>
    );
  }

  return (
    <AdminClient 
      initialStats={result.stats} 
    />
  );
}
