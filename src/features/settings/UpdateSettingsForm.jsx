import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

////******************************************** Fetching Application settings
// make useSeetings custom hook
// Include this form in pages/Settings.js
// initally settings is does not exist undefined, so make equal = {} otherwise it will throw an error

// function UpdateSettingsForm() {
//   const {
//     isLoading,
//     settings: {
//       minBookingLength,
//       maxBookingLength,
//       maxGuestsPerBooking,
//       breakfastPrice,
//     } = {},
//   } = useSettings();

//   if (isLoading) return <Spinner />;

//   return (
//     <Form>
//       <FormRow label="Minimum nights/booking">
//         <Input type="number" id="min-nights" defaultValue={minBookingLength} />
//       </FormRow>
//       <FormRow label="Maximum nights/booking">
//         <Input type="number" id="max-nights" defaultValue={maxBookingLength} />
//       </FormRow>
//       <FormRow label="Maximum guests/booking">
//         <Input
//           type="number"
//           id="max-guests"
//           defaultValue={maxGuestsPerBooking}
//         />
//       </FormRow>
//       <FormRow label="Breakfast price">
//         <Input
//           type="number"
//           id="breakfast-price"
//           defaultValue={breakfastPrice}
//         />
//       </FormRow>
//     </Form>
//   );
// }

// export default UpdateSettingsForm;

////*********************************************** Update Application setting
// The way that we want to do this is that whenever we click here, then we write some new value. And then as soon as we leave the field, we want the updating to happen. And so, we can do that with the onBlur event handler. So we can do onBlur. And then as always, we define our event handler function.
// this is the modern way of updating the values as we do need a button to update
// e.target.value will always be string

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, field, prevValue) {
    const { value } = e.target;
    // console.log(value);
    if (!value || value === String(prevValue)) return;
    updateSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength", minBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength", maxBookingLength)}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) =>
            handleUpdate(e, "maxGuestsPerBooking", maxGuestsPerBooking)
          }
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice", breakfastPrice)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
