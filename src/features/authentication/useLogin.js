import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

//// error below is the error thrown at apifunction
// export function useLogin() {
//   const navigate = useNavigate();
//   const { mutate: login, isLoading } = useMutation({
//     mutationFn: ({ email, password }) => loginApi({ email, password }),
//     onSuccess: (user) => {
//       console.log("user", user);
//       navigate("/dashboard", { replace: true });
//     },
//     onError: (err) => {
//       console.log("login error", err);
//       toast.error("Provided email or password are incorrect");
//     },
//   });
//   return { login, isLoading };
// }

////**************************  Autharization(removing spinner)
// Now after login yo will see the spinner but that should not be shown because this unnecessary
// you will see the spinner rotating there. Saw that? Now in this case, that's not really necessary. It is necessary if we come back later to the page like so, then here, React Query will need to refetch the user's data. But immediately after we logged in,
// that data has just been downloaded at that very moment. And so in that situation, it's not necessary to then run this again, so running this get current user again. Instead, React Query could simply get this data from the cache if we put it there immediately after logging in.
// And so then we just specify the query key. And so that is user and then the value. And so again, this basically allows us to manually set some data into the React Query cache. And so then here in this use user that will be called later

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      console.log("user", user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("login error", err);
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLoading };
}
