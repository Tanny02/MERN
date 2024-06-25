import { useContext } from "react";
import { UserContext } from "./UserContext";
import Chat from "./Chat";
import Register from "./Register";

const Routes = () => {
  const { username, id } = useContext(UserContext);
  if (username && id) {
    return <Chat />;
  }
  return (
    <div>
      <Register />
    </div>
  );
};

export default Routes;
