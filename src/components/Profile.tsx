function ProfileIntro() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user);
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div>
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="avatar"
          className="rounded-full w-35 h-35"
        />
      </div>
      <div className="text-white flex items-center flex-col gap-0">
        <h2 className="text-2xl font-bold">{user.username}</h2>
        <p className="text-md text-gray-500">{`${user.first_name} ${user.last_name}`}</p>
        <p className="text-md text-gray-500">{user.email}</p>
      </div>
    </div>
  );
}

function Profile() {
  return <ProfileIntro />;
}

export default Profile;
