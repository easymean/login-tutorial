import { getProfileBySession } from "@/api/auth";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";

export default function Profile() {
  const { user, set } = useUserStore();

  const getUserProfileBySession = async () => {
    const user = await getProfileBySession();
    set(user);
  };

  useEffect(() => {
    if (!user) getUserProfileBySession();
  });
  return <div>{user?.username}</div>;
}
