import ErrorDisplay from "@/components/ErrorDisplay";
import ProfileHeader from "@/components/user/profile/ProfileHeader";
import { getUserById } from "@/lib/user/actions";

type ProfilePageProps = {
  params: Promise<{ userId: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;
  const user = await getUserById(userId);

  if (!user) {
    return (
      <ErrorDisplay
        title="User not found"
        message="This user does not exist. Please log in."
      />
    );
  }

  return (
    <>
      <ProfileHeader user={user} />
    </>
  );
}
