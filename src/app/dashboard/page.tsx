import { getLoggedInUser, getUserStories } from "@/app/actions";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Dashboard | LoveVerse",
  description: "Manage your customized cinematic relationship websites."
};

export default async function DashboardPage() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/login");
  }

  const stories = await getUserStories();

  return (
    <DashboardClient 
      user={user} 
      initialStories={stories} 
    />
  );
}
