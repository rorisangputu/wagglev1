import ProfileActions from "@/components/user/profile/ProfileActions";
import ProfileHeader from "@/components/user/profile/ProfileHeader";
import { getCurrentUser } from "@/lib/actions";

import { getUserInfo } from "@/lib/user/profile/actions";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(`/user/login?redirectTo=/user/profile`);
  }

  const user = await getUserInfo(currentUser.id);

  if (!user) {
    redirect(`/user/login?redirectTo=/user/profile`);
  }

  return (
    <>
      <ProfileHeader user={user} />
      <ProfileActions />
    </>
  );
}
