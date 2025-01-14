import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

//// we actually do with these seven days, or these 30, or these 90 days? Because that's not what we need to pass in here into these functions. So here we need actually a date that is already seven, or 30, or 90 days ago, right? And so we need to calculate that here. So let's call that query date. And for that we have a very handy function in the functions FNS package that we included earlier.
//// So we can just do sub days. So make sure to import that from this library. And so this function takes as the first argument, the current date, so right now basically, and then the number of days that we want to subtract. So that's gonna be the number of days. And then remember that that function needs an ISO string.
//// we already have bookings so lets add dependency so that it can refetch when ever it changes

export function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { bookings, isLoading };
}
