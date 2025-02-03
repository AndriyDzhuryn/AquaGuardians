import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

const UserAvatar = ({ className }) => {
  const userData = useSelector(selectUser);
  const photo = userData?.photo || null;

  return (
    <div className={className}>
  {photo ? (
    <img src={photo} alt="User" className={`${className}`} />
  ) : (
    <svg className={`${className}_icon`} fill="none" stroke="#000" width="100%" height="100%">
      <use href="/icons/icons-sprite.svg#user" />
    </svg>
  )}
</div>

  );
};

export default UserAvatar;
