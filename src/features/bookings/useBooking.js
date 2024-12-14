import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

// Now here, let's just for the fun of it, define something else, which is retry to false. So remember that by default, React Query will try to fetch data three times in case that it fails in the beginning, but sometimes that might not make so much sense. And so here in this case, basically not finding the data probably means
// that it doesn't exist in the first place. And so then there's no point in retrying.

// export function useBooking() {
//   const { bookingId } = useParams();
//   // console.log("bookingId", bookingId);

//   const {
//     isLoading,
//     data: booking,
//     error,
//   } = useQuery({
//     queryKey: ["booking"],
//     queryFn: () => getBooking(bookingId),
//   });
//   // console.log("error", error);
//   // console.log("booking", booking);

//   return { isLoading, error, booking };
// }

////********** Remove the bug by adding the bookingId in the key

export function useBooking() {
  const { bookingId } = useParams();
  // console.log("bookingId", bookingId);

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });
  // console.log("error", error);
  // console.log("booking", booking);

  return { isLoading, error, booking };
}
