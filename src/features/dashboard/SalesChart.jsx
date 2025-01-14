import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  width: 100%;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalSales: 480, extrasSales: 20 },
  { label: "Jan 10", totalSales: 580, extrasSales: 100 },
  { label: "Jan 11", totalSales: 550, extrasSales: 150 },
  { label: "Jan 12", totalSales: 600, extrasSales: 50 },
  { label: "Jan 13", totalSales: 700, extrasSales: 150 },
  { label: "Jan 14", totalSales: 800, extrasSales: 150 },
  { label: "Jan 15", totalSales: 700, extrasSales: 200 },
  { label: "Jan 16", totalSales: 650, extrasSales: 200 },
  { label: "Jan 17", totalSales: 600, extrasSales: 300 },
  { label: "Jan 18", totalSales: 550, extrasSales: 100 },
  { label: "Jan 19", totalSales: 700, extrasSales: 100 },
  { label: "Jan 20", totalSales: 800, extrasSales: 200 },
  { label: "Jan 21", totalSales: 700, extrasSales: 100 },
  { label: "Jan 22", totalSales: 810, extrasSales: 50 },
  { label: "Jan 23", totalSales: 950, extrasSales: 250 },
  { label: "Jan 24", totalSales: 970, extrasSales: 100 },
  { label: "Jan 25", totalSales: 900, extrasSales: 200 },
  { label: "Jan 26", totalSales: 950, extrasSales: 300 },
  { label: "Jan 27", totalSales: 850, extrasSales: 200 },
  { label: "Jan 28", totalSales: 900, extrasSales: 100 },
  { label: "Jan 29", totalSales: 800, extrasSales: 300 },
  { label: "Jan 30", totalSales: 950, extrasSales: 200 },
  { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
  { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
  { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
  { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
  { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
  { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
  { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
];

// const isDarkMode = true;
// const colors = isDarkMode
//   ? {
//       totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
//       extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
//       text: "#e5e7eb",
//       background: "#18212f",
//     }
//   : {
//       totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
//       extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
//       text: "#374151",
//       background: "#fff",
//     };

// const colors = {
//   totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
//   extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
//   text: "#374151",
//   background: "#fff",
// };

// export default function SalesCharts() {
//   return (
//     <StyledSalesChart>
//       <Heading as="h1">Sales Chart</Heading>
//       <AreaChart data={fakeData} width={700} height={300}>
//         <CartesianGrid />
//         <Area dataKey="totalSales" type="monotone" stroke="red" fill="orange" />
//       </AreaChart>
//     </StyledSalesChart>
//   );
// }

//// Add tooltip and make it fluid that means responsive according to screen size
// So now let's add some access here to the sites and then also that tool tip. So let's start with that. So that is just using the tool tip component. And so then as we hover here, it'll give us the value
// For responsive, so here we can wrap the entire thing into a responsive container. So responsive container which is also provided again by Recharts. So wrapping the entire thing in there. And then we remove these from the chart itself, place them here, and then the width we can set it to a percentage. So for example, 100% as a string here.
// And so then indeed it will simply occupy that entire container.

// export default function SalesCharts() {
//   return (
//     <StyledSalesChart>
//       <Heading as="h1">Sales Chart</Heading>
//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart data={fakeData}>
//           <XAxis
//             dataKey="label"
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <YAxis
//             unit="$"
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <Tooltip
//             strokeDasharray="4"
//             contentStyle={{ backgroundColor: colors.background }}
//           />
//           <CartesianGrid />
//           <Area
//             dataKey="totalSales"
//             type="monotone"
//             stroke={colors.totalSales.stroke}
//             fill={colors.totalSales.fill}
//             unit="$"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </StyledSalesChart>
//   );
// }

////** Add extras sales

// export default function SalesCharts() {
//   return (
//     <StyledSalesChart>
//       <Heading as="h1">Sales Chart</Heading>
//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart data={fakeData}>
//           <XAxis
//             dataKey="label"
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <YAxis
//             unit="$"
//             tick={{ fill: colors.text }}
//             tickLine={{ stroke: colors.text }}
//           />
//           <Tooltip
//             strokeDasharray="4"
//             contentStyle={{ backgroundColor: colors.background }}
//           />
//           <CartesianGrid />
//           <Area
//             dataKey="totalSales"
//             type="monotone"
//             stroke={colors.totalSales.stroke}
//             fill={colors.totalSales.fill}
//             unit="$"
//           />
//           <Area
//             dataKey="extrasSales"
//             type="monotone"
//             stroke={colors.extrasSales.stroke}
//             fill={colors.extrasSales.fill}
//             unit="$"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </StyledSalesChart>
//   );
// }

/////*** Get the actual data
//// eachDayOfInterval will give you array of dates, format function will give you the formate of date which you want u have pass string of that format as second arguement
//// The totalSales in the given code is calculated by aggregating the totalPrice of all bookings made on a particular day.

export default function SalesCharts({ bookings, numDays }) {
  const { isDarkMode } = useLocalStorageState();

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => {
          return acc + curr.totalPrice;
        }, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => {
          return acc + curr.extrasPrice;
        }, 0),
    };
  });

  // console.log(data);

  return (
    <StyledSalesChart>
      <Heading as="h1">
        Sales Chart from {format(allDates.at(0), "MMM dd")} to{" "}
        {format(allDates.at(-1), "MMM dd")}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip
            strokeDasharray="4"
            contentStyle={{ backgroundColor: colors.background }}
          />
          <CartesianGrid />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
