import "./userInfo.css";
import {useUserStore} from "../../../lib/userStore"
import { auth } from "../../../lib/firebase";

function UserInfo() {
  const { currentUser} = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png" }alt="" />
        <h2>{currentUser.username}</h2>
      </div>
       <button className="logout" onClick={() => auth.signOut()}>
                Logout
              </button>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  );
}

export default UserInfo;
