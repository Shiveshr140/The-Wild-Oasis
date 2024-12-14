import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

// function BookingDetail() {
//   const booking = {};
//   const status = "checked-in";

//   const moveBack = useMoveBack();

//   const statusToTagName = {
//     unconfirmed: "blue",
//     "checked-in": "green",
//     "checked-out": "silver",
//   };

//   return (
//     <>
//       <Row type="horizontal">
//         <HeadingGroup>
//           <Heading as="h1">Booking #X</Heading>
//           <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
//         </HeadingGroup>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>

//       {/* <BookingDataBox booking={booking} /> */}

//       <ButtonGroup>
//         <Button variation="secondary" onClick={moveBack}>
//           Back
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default BookingDetail;

////**************************************** Building the Single Booking Page
// Now get the data from api, create useBooking.jsx

// function BookingDetail() {
//   const { booking, isLoading } = useBooking();
//   if (isLoading) return <Spinner />;
//   const { status, id: bookingId } = booking;
//   const moveBack = useMoveBack();

//   const statusToTagName = {
//     unconfirmed: "blue",
//     "checked-in": "green",
//     "checked-out": "silver",
//   };

//   return (
//     <>
//       <Row type="horizontal">
//         <HeadingGroup>
//           <Heading as="h1">Booking {bookingId}</Heading>
//           <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
//         </HeadingGroup>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>

//       <BookingDataBox booking={booking} />

//       <ButtonGroup>
//         <Button variation="secondary" onClick={moveBack}>
//           Back
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default BookingDetail;

/////*********************************************** Checking In a Booking

// function BookingDetail() {
//   const navigate = useNavigate();
//   const { booking, isLoading } = useBooking();
//   const moveBack = useMoveBack();

//   if (isLoading) return <Spinner />;

//   const { status, id: bookingId } = booking;

//   const statusToTagName = {
//     unconfirmed: "blue",
//     "checked-in": "green",
//     "checked-out": "silver",
//   };

//   return (
//     <>
//       <Row type="horizontal">
//         <HeadingGroup>
//           <Heading as="h1">Booking {bookingId}</Heading>
//           <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
//         </HeadingGroup>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>

//       <BookingDataBox booking={booking} />

//       <ButtonGroup>
//         {status === "unconfirmed" && (
//           <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
//             Check in
//           </Button>
//         )}

//         <Button variation="secondary" onClick={moveBack}>
//           Back
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default BookingDetail;

////************************************** Check Out Booking

// function BookingDetail() {
//   const navigate = useNavigate();
//   const { booking, isLoading } = useBooking();
//   const moveBack = useMoveBack();
//   const { checkout, isCheckingOut } = useCheckout();
//   if (isLoading) return <Spinner />;

//   const { status, id: bookingId } = booking;

//   const statusToTagName = {
//     unconfirmed: "blue",
//     "checked-in": "green",
//     "checked-out": "silver",
//   };

//   return (
//     <>
//       <Row type="horizontal">
//         <HeadingGroup>
//           <Heading as="h1">Booking {bookingId}</Heading>
//           <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
//         </HeadingGroup>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>

//       <BookingDataBox booking={booking} />

//       <ButtonGroup>
//         {status === "unconfirmed" && (
//           <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
//             Check in
//           </Button>
//         )}
//         {status === "checked-in" && (
//           <Button
//             icon={<HiArrowUpOnSquare />}
//             onClick={() => checkout(bookingId)}
//             disabled={isCheckingOut}
//           >
//             Check out
//           </Button>
//         )}
//         <Button variation="secondary" onClick={moveBack}>
//           Back
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default BookingDetail;

////************************************** Delete Booking
// Here when we delete we did not go anywhere it will show that page which does not exist so remember we can use onSucess, onError..etc in mutation function also
// we can use onSettled which will run whether it is onSucess/onError

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger" disabled={isDeleting}>
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBooking(bookingId, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
