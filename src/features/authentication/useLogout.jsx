import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";

// Well actually there's something else that we should do here which is indeed really important. And that is to remove the current user from the React Query cache. So just logging out, we'll of course remove the user here from local storage and also from the server but they will stay inside the cache. So because we stored it right here. And so if, for some reason, some malicious actor gets access
// to that, that would be very bad. And so we can actually remove all queries. So actually not just the user, but really all queries that have been accumulated in that cache.
// And for that, once agains, we need the Query client. And so then on there we just call removeQueries. And here, we can specify which one, but here we simply remove all of them

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });
  return { logout, isLoading };
}

export default useLogout;
