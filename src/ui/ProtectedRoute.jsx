import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

//// starting with loading the authenticated user. And so for that, we once again will create a new function here in API auth. Now you might wonder why we actually need a function to load the user from Supabase again if we just saw the user here in the console right after logging in. Now the thing is that the user might want to access this page a bit later,
//// so not only after they have logged in. So in a web application, even if you logged in like a day ago and if you then reload the page, you will still want to be logged in, not only immediately after you do that login process. And so then each time that you reload the page, for example, a day later, then that user will need to be refetched from the Supabase API.
//// create function apiAuth
//// do not use navigate at top level of component instead use useEffect
function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 2. If No authenticated user redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there is user, render the app

  return children;
}

export default ProtectedRoute;
