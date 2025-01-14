import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

/// include this in DashboardLayout
export default function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}) {
  // 1. number of bookings
  const numBookings = bookings.length;

  // 2. total sales
  const sales = bookings.reduce((sum, curr) => {
    sum += curr.totalPrice;
    return sum;
  }, 0);

  // 3. total check ins
  const checkins = confirmedStays.length;

  // 4. occupancy rate: checked in nights/ all available nights
  const occupation =
    confirmedStays.reduce((acc, curr) => {
      return acc + curr.numNights;
    }, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        tiitle="Booking"
        color="blue"
        value={numBookings}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        tiitle="Sales"
        color="green"
        value={formatCurrency(sales)}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        tiitle="Check ins"
        color="indigo"
        value={checkins}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        tiitle="Occupancy rate"
        color="yellow"
        value={Math.round(occupation * 100) + "%"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}
