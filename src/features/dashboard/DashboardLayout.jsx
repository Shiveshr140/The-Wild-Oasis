import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesCharts from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

// //// Include in dashboard.jsx in pages
// export default function DashboardLayout() {
//   return (
//     <StyledDashboardLayout>
//       <div> Statistics </div>
//       <div> Today's activity </div>
//       <div> Chart Stay duration </div>
//       <div> Chart Sales </div>
//     </StyledDashboardLayout>
//   );
// }

////************************************* Display Statistics
// after useRecentBookings.jsx, useRecentStays.jsx
// export default function DashboardLayout() {
//   const { bookings, isLoading: isLoading1 } = useRecentBookings();
//   const {
//     stays,
//     confirmedStays,
//     isLoading: isLoading2,
//     numDays,
//   } = useRecentStays();

//   const { cabins, isLoading: isLoading3 } = useCabins();

//   if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

//   return (
//     <StyledDashboardLayout>
//       <Stats
//         bookings={bookings}
//         confirmedStays={confirmedStays}
//         numDays={numDays}
//         cabinCount={cabins.length}
//       />
//       <div> Today's activity </div>
//       <div> Chart Stay duration </div>
//       <div> Chart Sales </div>
//     </StyledDashboardLayout>
//   );
// }

////************************************ Displaying a Line Chart With the Recharts Library

export default function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();

  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesCharts bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
