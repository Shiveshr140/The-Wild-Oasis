import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

//// in useQuery I have added filter as depedency array to re-fetch the data when click other filters
// export function useBookings() {
//   const [searchParams] = useSearchParams();
//   const filterValue = searchParams.get("status");

//   // 1.) FILTER
//   const filter =
//     !filterValue || filterValue === "all"
//       ? null
//       : { field: "status", value: filterValue };
//   // { field: "totalPrice", value: 5000, method: "gte" };

//   // 2.) SORT
//   const sortByValue = searchParams.get("sortBy") || "startDate-desc";
//   const [field, direction] = sortByValue.split("-");
//   const sortBy = { field, direction };

//   const {
//     isLoading,
//     data: bookings,
//     error,
//   } = useQuery({
//     queryKey: ["bookings", filter, sortBy],
//     queryFn: () => getBookings({ filter, sortBy }),
//   });
//   return { isLoading, error, bookings };
// }

////****************************************** API-Side Pagination: Paginating Booking & Prefetching
// after page go apiBookings.jsx again
//// So here we have the Query itself and then before we return this stuff, let's have or prefetching. And the way this works is that we first need to QueryClient and then on there we call the Prefetch Query method
//// handle the error bcs it will still gonna fetch the next page data if you are at the last page even that will be empyty []
//// Also handle the previous page loading if you visited that page first tym as you are on say page =3 initially

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");

  // 1.) FILTER
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "totalPrice", value: 5000, method: "gte" };

  // 2.) SORT
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  // 3.) PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: data,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = data?.data || [];
  const count = data?.count || 0;

  // 4.) Prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, bookings, count };
}
