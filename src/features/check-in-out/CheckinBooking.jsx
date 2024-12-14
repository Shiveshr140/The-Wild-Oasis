import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

// function CheckinBooking() {
//   const { booking, isLoading } = useBooking();
//   const moveBack = useMoveBack();
//   if (isLoading) return <Spinner />;
//   const {
//     id: bookingId,
//     guests,
//     totalPrice,
//     numGuests,
//     hasBreakfast,
//     numNights,
//   } = booking;

//   function handleCheckin() {}

//   return (
//     <>
//       <Row type="horizontal">
//         <Heading as="h1">Check in booking #{bookingId}</Heading>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>

//       <BookingDataBox booking={booking} />

//       <ButtonGroup>
//         <Button onClick={handleCheckin}>Check in booking #{bookingId}</Button>
//         <Button variation="secondary" onClick={moveBack}>
//           Back
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default CheckinBooking;

////************************ Check in booking
// now it's time to implement that small feature where the hotel employee needs to confirm whether this booking has already been paid. And so for that, we will want to add a checkbox down here and then the user has to click that checkbox and only then they can confirm right here. All right, at least in case the booking hasn't been paid yet. So, if we want the checkbox here
// and this button here to respond to that checkbox, that means that we need a piece of state.
// So, this is actually a bug that we need to fix right now. So, let's come here to our use booking. And then here we need to include the booking ID. And so this is very important, because otherwise, as we switch between these different booking pages, the data that each of them gets will be the same.
// Go useBooking.jsx and add bookingId in key
// create a new hook useChecking.js

// function CheckinBooking() {
//   const [confirmPaid, setConfirmPaid] = useState(false);
//   const { booking, isLoading } = useBooking();
//   const moveBack = useMoveBack();
//   const { checkin, isCheckingIn } = useChecking();

//   useEffect(
//     function () {
//       setConfirmPaid(booking?.isPaid || false);
//     },
//     [booking]
//   );

//   if (isLoading) return <Spinner />;
//   const {
//     id: bookingId,
//     guests,
//     totalPrice,
//     numGuests,
//     hasBreakfast,
//     numNights,
//   } = booking;

//   function handleCheckin() {
//     if (!confirmPaid) return;
//     checkin(bookingId);
//   }

//   return (
//     <>
//       <Row type="horizontal">
//         <Heading as="h1">Check in booking #{bookingId}</Heading>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>

//       <BookingDataBox booking={booking} />
//       <Box>
//         <Checkbox
//           checked={confirmPaid}
//           onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
//           id="confirm"
//           disabled={confirmPaid || isCheckingIn}
//         >
//           I confirmed that {guests.fullName} has paid the total ammount of
//           {formatCurrency(totalPrice)}
//         </Checkbox>
//       </Box>
//       <ButtonGroup>
//         <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
//           Check in booking #{bookingId}
//         </Button>
//         <Button variation="secondary" onClick={moveBack}>
//           Back
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default CheckinBooking;

////**************************************** Adding Optional Breakfast
// we want to add breakfast we also need to set the paid state back to false. So set, confirm, paid to false because if the guest adds some more things that they need to pay then even if they had already paid they will need to pay something more.
// And so it makes sense to then put it back to false.
// why did we add id bcs to match with label even if we click the label check box wil activate
// So remember how in our API we have this settings and there one of the values is exactly, and let's wait for it here. So one of the values is the price of the breakfast. And so now we can use that setting to calculate the price.

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid || false);
    },
    [booking]
  );

  if (isLoading || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirmed that {guests.fullName} has paid the total ammount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} +
                ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
