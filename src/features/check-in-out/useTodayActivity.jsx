import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

//// Here it will not afftect by filters say last 7days ...etc so we do not need it in dependencies array
export function useToadayActivity() {
  const { data: activities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });
  return { activities, isLoading };
}
