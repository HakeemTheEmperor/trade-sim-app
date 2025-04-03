import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Profile from "../../components/Profile";
import ProfileView from "../../components/ProfileView";
import ProfileEdit from "../../components/ProfileEdit";

function ProfileSettingPage() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      <Breadcrumbs />
      <Profile />
      {isEditing ? (
        <ProfileEdit setIsEditing={setIsEditing} />
      ) : (
        <ProfileView setIsEditing={setIsEditing} />
      )}
    </>
  );
}

export default ProfileSettingPage;
