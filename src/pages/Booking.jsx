import BookingDetail from "../features/bookings/BookingDetail";

////******************************** Building the Single Booking Page
// add route in app.jsx
// So now it's time to actually display the details of the booking here on this page. Now for that we actually already have the booking detail component right in the bookings feature folder. So let's open that one up. And so basically all we want to do is to now render exactly this component here on the page. So here on the booking, we will not even have a heading because that heading will actually need the booking ID that it receives from the URL. Now, remember the rule that we set for ourselves in the beginning, which is that a page should not fetch data and also not have any other side effects.
// Now, this is not a hard rule in React or in front end development, but it's a rule that I've seen many people use, and I also use it myself because this makes the pages folder a lot cleaner and then leaves much of the development work in the features folder.
// Lets bring BookingDetail.jsx here
function Booking() {
  return <BookingDetail />;
}

export default Booking;
