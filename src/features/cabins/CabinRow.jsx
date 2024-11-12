import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

////****************************** Cabins data fetching
// Do not remember the data go and check the react query tools very usefull at developemnt
// "npm i date-fns"

// function CabinRow({ cabin }) {
//   const { name, maxCapacity, regularPrice, discount, image } = cabin;
//   return (
//     <TableRow>
//       <Img src={image} />
//       <Cabin>{name} </Cabin>
//       <div>Fits up to {maxCapacity} guests</div>
//       <Price>{formatCurrency(regularPrice)}</Price>
//       <Discount>{formatCurrency(discount)}</Discount>
//       <button>Delete</button>
//     </TableRow>
//   );
// }

// export default CabinRow;

////******************************************* Mutation: Delete a Cabin && Use the Toaster for notification
// Now we will use React Query to actually make this Delete button here work. So that Delete button is inside each cabin row. And so let's now use React Query in here to actually make that button work. So the way we do mutations is not by doing "useQuery," but "useMutation."
// So just like this. And then here again, we need to paste in an object and the first element should be the "mutationFn." So this is the function that React Query will call, and so let's make this an arrow function, that will receive the ID and will then call the "deleteCabin" function
// that we just created with exactly that ID.

// But this is not really that ground breaking yet. Because actually the UI didn't even update. So to make sure that cabin number two has actually been deleted, let's manually reload here. And so indeed cabin number two is gone.
// So our deletion worked, but again, up until this point, this is nothing so special, But we can make it special, or at least a bit more helpful, by also invalidating the cache as soon as this mutation is done. And so for that
// we can specify the "onSuccess" callback. So "onSuccess" and this then also accepts a function. And so here we can basically tell React Query what to do as soon as the mutation was successful. So, what do we want to do? Well, we basically want to re-fetch the data here
// in this situation. And the way this works in React Query, is by invalidating the cache. And here we can actually do that manually. So if I click here, it will then fetch again, and then... And after that, the data becomes stale right away again.
// But what matters is that as soon as we invalidate this cache, so this data with this key right here, then that will immediately fetch again. Because as the name says, this data is then invalid. Or the Query is invalid.
// So that's the same thing. So the way that we do this in our code, so of course we don't want our users to click there, is to get the Query client and then call "invalidateQueries" on there.

// So again, that "invalidateQueries" function actually needs to be called on the "queryClient." So right here. So how do we get access to our "queryClient" instance? Well, for that we have a special hook. So it's a hook which will give us the "queryClient" and it is simply called "useQueryClient."
// And so now in here we can say "queryClient.invalidateQueries." And then here is where we tell it which exact Query, so which exact data, should be invalidated. So we specify exactly the same "queryKey" that we have there in our dev tools. Or in other words, this one that we defined for this Query. And so this is one of the reasons why it is so important
// that each Query is uniquely identified. Because then we can now invalidate this Query so that it will fetch again. So that's called "cabins," and this should now work. So let's see. Let's Delete another one. Now we do not have reload it autometically disappear.

// so here is that besides the "onSuccess" handler, we also have the "onError" handler. And so this one receives the error that was actually thrown inside this function(mutateFn). So it receives it as an argument, and then here we can do anything we want with this. So let's "alert," in this case, the "err.message."
// lets get the error by changing url of supabase client, you might notice in console there are multiple same error one of the intersting thing is that react query try to fetch the multiple times in case error goes away quicking that help us in debugging

// function CabinRow({ cabin }) {
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//   } = cabin;

//   const queryClient = useQueryClient();

// // const { isLoading: isDeleting, mutate } = useMutation({
// //   // mutationFn: (id) => deleteCabin(id),
// //   mutationFn: deleteCabin,
// //   onSuccess: () => {
// //     alert("Cabin successfully deleted");
// //     queryClient.invalidateQueries({
// //       queryKey: ["cabins"],
// //     });
// //   },
// //   onError: (err) => alert(err.message),
// // });

// // Toaster
// const { isLoading: isDeleting, mutate } = useMutation({
//   mutationFn: deleteCabin,
//   onSuccess: () => {
//     toast.success("Cabin successfully deleted");
//     queryClient.invalidateQueries({
//       queryKey: ["cabins"],
//     });
//   },
//   onError: (err) => toast.error(err.message),
// });

//   return (
//     <TableRow>
//       <Img src={image} />
//       <Cabin>{name} </Cabin>
//       <div>Fits up to {maxCapacity} guests</div>
//       <Price>{formatCurrency(regularPrice)}</Price>
//       <Discount>{formatCurrency(discount)}</Discount>
//       <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
//         Delete
//       </button>
//     </TableRow>
//   );
// }

// export default CabinRow;

////********************************************************** Edit Cabin
// Add edit button and temprory state
// first make duplicate of create CreateCabinForm.jsx

// function CabinRow({ cabin }) {
//   const [showForm, setShowForm] = useState(false);
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//   } = cabin;

//   const queryClient = useQueryClient();

//   // const { isLoading: isDeleting, mutate } = useMutation({
//   //   // mutationFn: (id) => deleteCabin(id),
//   //   mutationFn: deleteCabin,
//   //   onSuccess: () => {
//   //     alert("Cabin successfully deleted");
//   //     queryClient.invalidateQueries({
//   //       queryKey: ["cabins"],
//   //     });
//   //   },
//   //   onError: (err) => alert(err.message),
//   // });

//   // Toaster
//   const { isLoading: isDeleting, mutate } = useMutation({
//     mutationFn: deleteCabin,
//     onSuccess: () => {
//       toast.success("Cabin successfully deleted");
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return (
//     <>
//       <TableRow>
//         <Img src={image} />
//         <Cabin>{name} </Cabin>
//         <div>Fits up to {maxCapacity} guests</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         {discount ? (
//           <Discount>{formatCurrency(discount)}</Discount>
//         ) : (
//           <span>&mdash;</span>
//         )}
//         <div>
//           <button onClick={() => setShowForm((prev) => !prev)}>Edit</button>
//           <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
//             Delete
//           </button>
//         </div>
//       </TableRow>
//       {showForm && <CreateCabinForm cabinToEdit={cabin} />}
//     </>
//   );
// }

// export default CabinRow;

////******************************************************************** Abstracting React Query Into Custom Hooks
// abstract the deleting a cabin and so let's copy all of this and refactor it into a use delete cabin hook and let's actually create it right here in this cabin's feature folder.
// So usedeletecabin.js
// createCabinForm.jsx

// function CabinRow({ cabin }) {
//   const [showForm, setShowForm] = useState(false);
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//   } = cabin;

//   const { isDeleting, deleteCabin } = useDeleteCabin();

//   return (
//     <>
//       <TableRow>
//         <Img src={image} />
//         <Cabin>{name} </Cabin>
//         <div>Fits up to {maxCapacity} guests</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         {discount ? (
//           <Discount>{formatCurrency(discount)}</Discount>
//         ) : (
//           <span>&mdash;</span>
//         )}
//         <div>
//           <button onClick={() => setShowForm((prev) => !prev)}>Edit</button>
//           <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
//             Delete
//           </button>
//         </div>
//       </TableRow>
//       {showForm && <CreateCabinForm cabinToEdit={cabin} />}
//     </>
//   );
// }

// export default CabinRow;

////******************************************************* Duplicating the cabin
// What I want when I click this button <HiSquare2Stack /> it should dupicate the cabin

// function CabinRow({ cabin }) {
//   const [showForm, setShowForm] = useState(false);
//   const { isCreating, createCabin } = useCreateCabin();
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin;

//   const { isDeleting, deleteCabin } = useDeleteCabin();

//   function handleDuplicate() {
//     createCabin({
//       name: `copy of ${name}`,
//       regularPrice,
//       maxCapacity,
//       discount,
//       image,
//       description,
//     });
//   }

//   return (
//     <>
//       <TableRow>
//         <Img src={image} />
//         <Cabin>{name} </Cabin>
//         <div>Fits up to {maxCapacity} guests</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         {discount ? (
//           <Discount>{formatCurrency(discount)}</Discount>
//         ) : (
//           <span>&mdash;</span>
//         )}
//         <div>
//           <button disabled={isCreating} onClick={handleDuplicate}>
//             <HiSquare2Stack />
//           </button>
//           <button onClick={() => setShowForm((prev) => !prev)}>
//             <HiPencil />
//           </button>
//           <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>
//             <HiTrash />
//           </button>
//         </div>
//       </TableRow>
//       {showForm && <CreateCabinForm cabinToEdit={cabin} />}
//     </>
//   );
// }

// export default CabinRow;

////*********************************************  Confirming Cabin Deletions
// let's actually reuse this modal window both for the deleting and for editing.
// handle edit
// And now the second part is that whenever we click here on this button, we actually don't want the cabin to be deleted immediately. But instead, as is usual in normal web applications, first we should get asked whether we are sure if that cabin should be deleted. So for that we actually already have a component here
// called ConfirmDelete. So this one also should be rendered inside a modal. So, like you have seen many, many times before. So let's create ourselves a new Modal.Open, which is where we will place this button, and then our Modal.Window.
// And so here we now want that ConfirmDelete component. But for now, nothing is going to happen. So we cannot cancel and we cannot delete. But we can, of course, close it. Now, okay, and so now we need to pass in the function that should actually be called when we confirm. And so that function is actually this one.
// So before we just called this function directly on the click, but now it should only be called after we confirm.  So onConfirm and, of course, needs to be here. So here we want that function,

// function CabinRow({ cabin }) {
//   const { isCreating, createCabin } = useCreateCabin();
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin;

//   const { isDeleting, deleteCabin } = useDeleteCabin();

//   function handleDuplicate() {
//     createCabin({
//       name: `copy of ${name}`,
//       regularPrice,
//       maxCapacity,
//       discount,
//       image,
//       description,
//     });
//   }

//   return (
//     <>
//       <TableRow>
//         <Img src={image} />
//         <Cabin>{name} </Cabin>
//         <div>Fits up to {maxCapacity} guests</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         {discount ? (
//           <Discount>{formatCurrency(discount)}</Discount>
//         ) : (
//           <span>&mdash;</span>
//         )}
//         <div>
//           <button disabled={isCreating} onClick={handleDuplicate}>
//             <HiSquare2Stack />
//           </button>
//           <Modal>
//             <Modal.Open opens="edit">
//               <button>
//                 <HiPencil />
//               </button>
//             </Modal.Open>

//             <Modal.Window name="edit">
//               <CreateCabinForm cabinToEdit={cabin} />
//             </Modal.Window>

//             <Modal.Open opens="delete">
//               <button disabled={isDeleting}>
//                 <HiTrash />
//               </button>
//             </Modal.Open>

//             <Modal.Window name="delete">
//               <ConfirmDelete
//                 resourceName="cabin"
//                 disabled={isDeleting}
//                 onConfirm={() => deleteCabin(cabinId)}
//               />
//             </Modal.Window>
//           </Modal>
//         </div>
//       </TableRow>
//     </>
//   );
// }

// export default CabinRow;

////********************************************** Build Reusable table
// Comment above TableRow
// Accept these in Table.jsx

// function CabinRow({ cabin }) {
//   const { isCreating, createCabin } = useCreateCabin();
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin;

//   const { isDeleting, deleteCabin } = useDeleteCabin();

//   function handleDuplicate() {
//     createCabin({
//       name: `copy of ${name}`,
//       regularPrice,
//       maxCapacity,
//       discount,
//       image,
//       description,
//     });
//   }

//   return (
//     <>
//       <Table.Row>
//         <Img src={image} />
//         <Cabin>{name} </Cabin>
//         <div>Fits up to {maxCapacity} guests</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         {discount ? (
//           <Discount>{formatCurrency(discount)}</Discount>
//         ) : (
//           <span>&mdash;</span>
//         )}
//         <div>
//           <button disabled={isCreating} onClick={handleDuplicate}>
//             <HiSquare2Stack />
//           </button>
//           <Modal>
//             <Modal.Open opens="edit">
//               <button>
//                 <HiPencil />
//               </button>
//             </Modal.Open>

//             <Modal.Window name="edit">
//               <CreateCabinForm cabinToEdit={cabin} />
//             </Modal.Window>

//             <Modal.Open opens="delete">
//               <button disabled={isDeleting}>
//                 <HiTrash />
//               </button>
//             </Modal.Open>

//             <Modal.Window name="delete">
//               <ConfirmDelete
//                 resourceName="cabin"
//                 disabled={isDeleting}
//                 onConfirm={() => deleteCabin(cabinId)}
//               />
//             </Modal.Window>
//           </Modal>
//         </div>
//       </Table.Row>
//     </>
//   );
// }

// export default CabinRow;

////*************************************************** Building Reusable context menu
// Now, just like before with the modal, We will have many of these menus on the page and therefore many toggles and many lists. And so therefore, we will have to connect this toggle with this list again so that we know that this exact toggle should then open up this list.
// So previously we used the name and the opens prop, but here let's make it a bit more simple and simply use an ID.
// Go to menus.jsx implement all these

// function CabinRow({ cabin }) {
//   const { isCreating, createCabin } = useCreateCabin();
//   const {
//     id: cabinId,
//     name,
//     maxCapacity,
//     regularPrice,
//     discount,
//     image,
//     description,
//   } = cabin;

//   const { isDeleting, deleteCabin } = useDeleteCabin();

//   function handleDuplicate() {
//     createCabin({
//       name: `copy of ${name}`,
//       regularPrice,
//       maxCapacity,
//       discount,
//       image,
//       description,
//     });
//   }

//   return (
//     <>
//       <Table.Row>
//         <Img src={image} />
//         <Cabin>{name} </Cabin>
//         <div>Fits up to {maxCapacity} guests</div>
//         <Price>{formatCurrency(regularPrice)}</Price>
//         {discount ? (
//           <Discount>{formatCurrency(discount)}</Discount>
//         ) : (
//           <span>&mdash;</span>
//         )}
//         <div>
//           <button disabled={isCreating} onClick={handleDuplicate}>
//             <HiSquare2Stack />
//           </button>
//           <Modal>
//             <Modal.Open opens="edit">
//               <button>
//                 <HiPencil />
//               </button>
//             </Modal.Open>

//             <Modal.Window name="edit">
//               <CreateCabinForm cabinToEdit={cabin} />
//             </Modal.Window>

//             <Modal.Open opens="delete">
//               <button disabled={isDeleting}>
//                 <HiTrash />
//               </button>
//             </Modal.Open>

//             <Modal.Window name="delete">
//               <ConfirmDelete
//                 resourceName="cabin"
//                 disabled={isDeleting}
//                 onConfirm={() => deleteCabin(cabinId)}
//               />
//             </Modal.Window>
//           </Modal>
//           <Menus.Menu>
//             <Menus.Toggle id={cabinId} />
//             <Menus.List id={cabinId}>
//               <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
//                 Duplicate
//               </Menus.Button>
//               <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
//               <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
//             </Menus.List>
//           </Menus.Menu>
//         </div>
//       </Table.Row>
//     </>
//   );
// }

// export default CabinRow;

////************************************************** handle delete and edit
// So the first button here, we actually no longer need, so that one is already working. But now as for these other two, this is where it gets complicated. So we already have some buttons right here, but these buttons are not that pretty.
// So they are just these buttons. And so we'll actually want these buttons to be these ones right here. So these menu buttons should be inside this Modal.Open. So here we will now basically mix the two together.

function CabinRow({ cabin }) {
  const { isCreating, createCabin } = useCreateCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  function handleDuplicate() {
    createCabin({
      name: `copy of ${name}`,
      regularPrice,
      maxCapacity,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name} </Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm cabinToEdit={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  resourceName="cabin"
                  disabled={isDeleting}
                  onConfirm={() => deleteCabin(cabinId)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
