import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

//// This data in onSuccess is exactly the same what we get from updateBooking
// this will then invalidate all the queries that are currently active on the page. So, this is a bit easier, because then we don't have to remember any Query keys.
// function useCheckin() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
//     mutationFn: (bookingId) =>
//       updateBooking(bookingId, {
//         status: "checked-in",
//         isPaid: true,
//       }),
//     onSuccess: (data) => {
//       toast.success(`Booking #${data.id} successfully checked in`);
//       queryClient.invalidateQueries({ active: true });
//       navigate("/");
//     },
//     onError: (error) => {
//       console.log(error);
//       toast.error("There is an error while checking in");
//     },
//   });
//   return { checkin, isCheckingIn };
// }

// export default useCheckin;

////**************************************** Adding Optional Breakfast

function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error("There is an error while checking in");
    },
  });
  return { checkin, isCheckingIn };
}

export default useCheckin;
