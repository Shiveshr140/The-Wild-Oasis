import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings.jsx";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

// function BookingTable() {
//   const bookings = [];
//   return (
//     <Menus>
//       <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
//         <Table.Header>
//           <div>Cabin</div>
//           <div>Guest</div>
//           <div>Dates</div>
//           <div>Status</div>
//           <div>Amount</div>
//           <div></div>
//         </Table.Header>

//         <Table.Body
//           data={bookings}
//           render={(booking) => (
//             <BookingRow key={booking.id} booking={booking} />
//           )}
//         />
//       </Table>
//     </Menus>
//   );
// }

// export default BookingTable;

////********************************************** Builiding booking table and Pagination
// include <Empty />
// get the data from apiCabins just like useCabins.js
// just remember you need to return something for isLoading otherwise error

// function BookingTable() {
//   const { isLoading, bookings } = useBookings();

//   if (isLoading) return <Spinner />;

//   if (!bookings.length) return <Empty resourceName="bookings" />;
//   return (
//     <Menus>
//       <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
//         <Table.Header>
//           <div>Cabin</div>
//           <div>Guest</div>
//           <div>Dates</div>
//           <div>Status</div>
//           <div>Amount</div>
//           <div></div>
//         </Table.Header>

//         <Table.Body
//           data={bookings}
//           render={(booking) => (
//             <BookingRow key={booking.id} booking={booking} />
//           )}
//         />
//         <Table.Footer>
//           <Pagination count={5} />
//         </Table.Footer>
//       </Table>
//     </Menus>
//   );
// }

// export default BookingTable;

////**********************************  API-Side Pagination: Paginating Booking
// We can calculate the length of bookings and pass it to the count but lets learn the new feature of Supabse API

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
