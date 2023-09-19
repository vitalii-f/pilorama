import { useDispatch, useSelector } from "react-redux";
import { setRole } from "src/store/user/roleSlice";

const Profile = () => {
  const user = useSelector((state) => state.user.value)
  const role = useSelector((state) => state.role.value)

  const dispatch = useDispatch()

  dispatch(setRole('Moder'))
  // console.log(role)
  return (
    user && (
      <div>
        {/* <img src={user.picture} alt={user.displayName} /> */}
        <h2>{user.displayName}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;