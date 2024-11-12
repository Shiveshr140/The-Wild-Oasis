import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

// function CreateCabinForm() {
//   return (
//     <Form>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input type="text" id="name" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input type="number" id="maxCapacity" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input type="number" id="regularPrice" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input type="number" id="discount" defaultValue={0} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea type="number" id="description" defaultValue="" />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button>Edit cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////****************************************************** React Hook Form
// create button in cabins.jsx
// "npm i react-hook-form@7"
// So we will call the use, form hook. And so this will give us a few functions that we can use. And the most fundamental one is the register function and then also very fundamental as well, is the handle submit function. And later we will use a few more things. But really one of the most fundamental things about React Hook Form, is to essentially register inputs into this hook. So into the form that we are setting up using, use form.
// And the way that this works is by coming here, entering JavaScript mode and then spread the result of calling register. So this looks very strange, but just roll with it for now. And then here we give it the name of the field. So let's just call it "name" which is exactly the same SDID here. Let's do the same thing here, dot register. And so we are really registering all the inputs
// into our form.

// Inspect this form in component tree So let's check this input right here. So notice how this gut, these new props here that we actually didn't place there ourselves. So there is no on blur and no on change to be seen on this input field. But now they are here and they have these functions. And so all of this was placed there by React Hook Form simply by us doing this. So basically the results of calling this register will be these props associated with these functions.
// so this will then be called with the actual data, so the data from all the fields that we register it. And so let's start by logging this data to the console.
// You can see easily we gat the data

// Now here we also have this cancel button and this simply works because of HTML. So all we have to do is to specify this type of reset. And so then this button will simply work as a reset button and not a submit button.

// function CreateCabinForm() {
//   const { register, handleSubmit } = useForm();
//   function onSubmit(data) {
//     console.log(data);
//   }
//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input type="text" id="name" {...register("name")} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input type="number" id="regularPrice" {...register("regularPrice")} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount")}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description")}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button>Edit cabin</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////********************************************************* Create new cabin
// so now we are ready, to use again a mutation. So a React Query mutation. So let's do that. Maybe here at the very top. And so, we will call again use mutation because here, we are going to change of course, the cabin data. And so whenever we change something,
// just like the loading in the previous lecture. Or creating a new role like we are going to do now. So this will then return us an object, with the mutate function and also the loading state. And then here, remember,
// we need to pass in the mutate function.

// And then we need to again, also invalidate all queries. And the reason for that, again is that so right after submitting the form. And so right when the new cabin has been created. So that it appears then in the UI. So basically whenever this mutation here happens. We will then want to invalidate the cabin's Query again. So that this component here, will then basically re-fetch the cabin's data. So, then when this state here changes.
// It will again re-render this table. So just looking at that again, this cabin state here, is nothing magical. I mean it is behind the scenes going to be just React state in the end. And so whenever some new data is fetched by React Query, whenever that state updates.
// Then as always, like we have been learning throughout the entire course. The component will re-render.

// Manually reset the form. So right after the form has been submitted. Now, you might be wondering why we are not simply doing all that right here in the on submit handler. Well, the reason for that is that first of all, here we are really only doing this if the mutation was successful. So only if really a new cabin has been added.
// And really only after the fact. Not immediately. Which is what would happen here. Also, it's really nice to keep all this codes here, outside of the event handler. So just encapsulated right here where the mutation is already happening anyway. Because this stuff is in a way really related to that mutation.

// Let's also reset it. So to empty all the fields. And we can do that, by getting here the reset function also from use form. So again, also after the success, we want to then just call the reset function. Now, you might be wondering why we are not simply doing all that right here in the on submit handler. Well, the reason for that is that first of all, here we are really only doing this if the mutation was successful. So only if really a new cabin has been added. And really only after the fact. Not immediately. Which is what would happen here.
// Also, it's really nice to keep all this codes here, outside of the event handler. So just encapsulated right here where the mutation is already happening anyway. Because this stuff is in a way really related to that mutation.

// And now let's use that is loading state maybe just to disable this button.

// function CreateCabinForm() {
//   const queryclient = useQueryClient();
//   const { register, handleSubmit, reset } = useForm();

//   const { isLoading: isCreating, mutate } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       alert("hi");
//       toast.success("New cabin successfully created");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   function onSubmit(data) {
//     console.log(data);
//     mutate(data);
//   }
//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input type="text" id="name" {...register("name")} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input type="number" id="regularPrice" {...register("regularPrice")} />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount")}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description")}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating} type="submit">
//           Add cabin
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////**********************************************  Handling Form Errors
// So probably where React hook form shines the most is in form error validation.
// So this handlesubmit function here is actually called each time that we attempt to submit the form and at that point all our validations will be executed. So all of this here will then be checked. And in case that there is one error in one of the validations, then handlesubmit will not call
// this onSubmit function here, but instead it'll call the second function that we pass in here. So let's call it onError. So then onError here again and this one instead of the data receives the actual errors.

// So we cannot have a price of 100, but a discount of 200, that's just not possible, right? And so for that, so for that kind of situation, we can write our own custom validation functions. So for that we specify validate and then here we write a callback function.
// And this callback gets as an argument the current value that is currently being input in the field. And then here we can write any kind of logic that we want and as soon as that logic returns true, then the field will be correctly validated.
// now to compare the value with regular price we get the function getValues.

// but now how do we actually get these kind of error message from our console.log right here into our application? So basically we will want to display something here or here on the site telling the user that something is wrong. Well, we can get these errors once again
// from the use form hook by using formState and then from that object we can read the errors property. So errors, taking that from formState.

// function CreateCabinForm() {
//   const queryclient = useQueryClient();
//   const { register, handleSubmit, reset, getValues, formState } = useForm();
//   const { errors } = formState;
//   // console.log(errors);

//   const { isLoading: isCreating, mutate } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   function onSubmit(data) {
//     console.log(data);
//     mutate(data);
//   }

//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow>
//         <Label htmlFor="name">Cabin name</Label>
//         <Input
//           type="text"
//           id="name"
//           {...register("name", {
//             required: "This Field is required",
//           })}
//         />
//         {errors?.name?.message && <Error>{errors.name.message}</Error>}
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="maxCapacity">Maximum capacity</Label>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="regularPrice">Regular price</Label>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="discount">Discount</Label>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This Field is required",
//             validate: (value) => {
//               return (
//                 value <= getValues().regularPrice ||
//                 "Discount should be less than regular price"
//               );
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="description">Description for website</Label>
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         <Label htmlFor="image">Cabin photo</Label>
//         <FileInput id="image" accept="image/*" />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating} type="submit">
//           Add cabin
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////************************************************ Refactoring && Upload images to supabase

// Since we doing many repeated thing lets create FromRow, so lets refactor this
// Now for image input this FileInput will automatical get the type='file' as attr go an add that
// So first log that data then we will know that image is at 0th
// Go and modify the createCabin in apiCabins.jsx

// function CreateCabinForm() {
//   const queryclient = useQueryClient();
//   const { register, handleSubmit, reset, getValues, formState } = useForm();
//   const { errors } = formState;
//   console.log(errors);

//   const { isLoading: isCreating, mutate } = useMutation({
//     mutationFn: createCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   function onSubmit(data) {
//     console.log("data", data);
//     mutate({ ...data, image: data.image[0] });
//   }

//   // This is just to know
//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled={isCreating}
//           {...register("name", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           disabled={isCreating}
//           {...register("maxCapacity", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isCreating}
//           {...register("regularPrice", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           disabled={isCreating}
//           defaultValue={0}
//           {...register("discount", {
//             required: "This Field is required",
//             validate: (value) => {
//               return (
//                 value <= getValues().regularPrice ||
//                 "Discount should be less than regular price"
//               );
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow
//         label="Description for website"
//         error={errors?.description?.message}
//       >
//         <Textarea
//           type="number"
//           id="description"
//           disabled={isCreating}
//           defaultValue=""
//           {...register("description", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isCreating} type="submit">
//           Add cabin
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////************************************************************* Edit Cabin
// sometimes these value does not exist by default make it empty object, now how do we get these values into the input? Well, thankfully for us,
// there is once again a very easy way to do it with React Hook Form. So here we can actually pass in some options. And so one of those options is the defaultValues. However, if we are just using this form
// to create a new cabin, then we will not want any default values. And therefore, first of all, let's actually figure out if we are using this form to edit or to add a new cabin. So let's create a variable here which will contain that information.
// So let's call it isEditSession. And then, let's simply convert the editId to a Boolean.

// function CreateCabinForm({ cabinToEdit = {} }) {
//   const { id: editId, ...editValues } = cabinToEdit;
//   const isEditSession = Boolean(editId);

//   const queryclient = useQueryClient();
//   const { register, handleSubmit, reset, getValues, formState } = useForm({
//     defaultValues: isEditSession ? editValues : {},
//   });
//   const { errors } = formState;
//   console.log(errors);

//   const { isLoading: isCreating, mutate: createCabin } = useMutation({
//     mutationFn: createEditCabin,
//     onSuccess: () => {
//       toast.success("New cabin successfully created");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   //  So here in React Query, we can actually only pass one element to this function. So I'm not sure why that is, but so let's actually create an arrow function here. And so this will then, as we said,
//   //  only accept exactly one argument which will be this object with the newCabinData,
//   const { isLoading: isEditing, mutate: editCabin } = useMutation({
//     mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
//     onSuccess: () => {
//       toast.success("Cabin successfully edited");
//       queryclient.invalidateQueries({ queryKey: ["cabins"] });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   const isWorking = isCreating || isEditing;

//   // Now it's time to again account for the fact that the image can either be this string right here or it can be this object that we saw earlier. So let's check for that so that we can actually determine what image we need to pass into editCabin. So here we can use the type of operator to check whether data.image is a string. And so if it is a string, then the image will just become data.image. And otherwise, so if it is that file list, then we will again need the data to be data.image at position zero. So exactly what we have here.
//   // And so then we can replace this, and then we will also be able to pass that in here. So remember that here we needed this object with newCabinData and id.
//   function onSubmit(data) {
//     const image = typeof data.image === "string" ? data.image : data.image[0];
//     if (isEditSession) {
//       editCabin({ newCabinData: { ...data, image }, id: editId });
//     } else {
//       createCabin({ ...data, image: image });
//     }
//   }

//   // This is just to know
//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           disabled={isWorking}
//           {...register("name", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           disabled={isWorking}
//           {...register("maxCapacity", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           disabled={isWorking}
//           {...register("regularPrice", {
//             required: "This Field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be atleast 1",
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           disabled={isWorking}
//           defaultValue={0}
//           {...register("discount", {
//             required: "This Field is required",
//             validate: (value) => {
//               return (
//                 value <= getValues().regularPrice ||
//                 "Discount should be less than regular price"
//               );
//             },
//           })}
//         />
//       </FormRow>

//       <FormRow
//         label="Description for website"
//         error={errors?.description?.message}
//       >
//         <Textarea
//           type="number"
//           id="description"
//           disabled={isWorking}
//           defaultValue=""
//           {...register("description", {
//             required: "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput
//           id="image"
//           accept="image/*"
//           {...register("image", {
//             required: isEditSession ? false : "This Field is required",
//           })}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isWorking} type="submit">
//           {isEditSession ? "Edit cabin" : "Create new cabin"}
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

////********************************************************************** Abstracting React Query Into Custom Hooks & Add Modal
// useCreateCabin.jsx, only problem is with reset but react quesry has its sollution we can place this on success handler function not only right there but also right in the function where the mutation actually happens so all we need to do is to pass in an object of options and so then there we can do on success and then here we can very simply call the reset function
// and also this call back right here actually gets access to the data that the mutation function returns or in other words we can here get access to this new cabin data that we return right here

// if this form is ever used in some place where it isn't contained in a modal then it's not going to receive this onCloseModal prop, right? And so that means
// that we need to call this function here conditionally because again, it might not even exist. And so in that case, if it doesn't exist, then this will create a bug.
// So onSuccess, so after the cabin has been created or after it has been edited, then let's also close the modal.

// Lets fix styling type prop in Form below then Form.jsx set default prop
// Modal.jsx => add react portal

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  console.log(errors);

  const isWorking = isCreating || isEditing;

  // we can use reset here
  function onSubmit(data) {
    console.log("data", data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  // This is just to know
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required",
            validate: (value) => {
              return (
                value <= getValues().regularPrice ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This Field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
