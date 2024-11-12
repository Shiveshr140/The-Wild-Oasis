import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";

// We want to make this modal a bit more reusable. And so we will allow this modal window to receive some custom content. And so that content is, as you can imagine, going to be the CreateCabinForm.
// lets add this functionality in cancle button in CreateCabinForm
// later we will convert this into compound component

// function AddCabin() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsModalOpen((prev) => !prev)}>
//         Add new cabin
//       </Button>
//       {isModalOpen && (
//         <Modal onClose={() => setIsModalOpen(false)}>
//           <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default AddCabin;

//************************************************ Converting the Modal to a Compound Component
// So let's convert the first version of the modal component that we just built to a compound component. And the reason why that is necessary is that this modal that we have built is really not ideal when it comes to the state management and to the way in which we actually render this modal. So remember how we render the modal right here
// based on this isOpenModal state. Now the problem with this is that we really do not want the component who uses the modal to be responsible for creating this piece of state and to keep track of whether the modal is open or not. So again, it shouldn't be the task of the AddCabin component here to track whether right now the modal should be displayed or not.
// So instead, the modal component itself should actually know whether it is currently open or not, and so it should keep this state internally. So it should track this basically encapsulated inside the component. And then the component should give us simply a way to open the modal and also a way to pass in the content
// that we actually want to display inside the modal. So basically we want some button to open the modal, and we want the window itself. So these two components together should form the modal component.

// And if this sounds a lot like the compound component pattern, that is because, in fact, a compound component is perfect for a situation like this. And so we will now, as I just mentioned, implement this whole modal using a compound component.
// So this is already looking like a real nice API. And if you ask me, a lot nicer than what we actually have here. So now we have no more state needed here inside this AddCabin component. And instead we will keep that state whether the window is open or not right inside the modal.
// We can have multiple window in the same modal component, these props open/name to keep track which one to show

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens="table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

export default AddCabin;
