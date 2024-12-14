import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

//// Include this in Header.jsx and create func in apiAuth.jsx then use that function using Reactquery useLogout.jsx
// function Logout() {
//   return (
//     <ButtonIcon>
//       <HiArrowRightOnRectangle />
//     </ButtonIcon>
//   );
// }

// export default Logout;

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logout}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
