import "./ProfileHeader.css";

function ProfileHeader({ user }) {
  if (!user) return null;

  return (
    <div className="profile-header">
      <img
        src={user.profilePic || "/default-profile.png"}
        alt="profile"
        className="profile-img"
      />

      <div className="profile-info">
        <h2>{user.username}</h2>
        <p>{user.bio || "No bio yet"}</p>
      </div>
    </div>
  );
}

export default ProfileHeader;