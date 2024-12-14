import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
// import { useEffect } from "react";
// import { getCabins } from "../services/apiCabins";

// // just to check, so we have successfully created a backend and connected it to out frontend
// // after storage buckets get the url of image use it to check
// function Cabins() {
//   useEffect(function () {
//     getCabins().then((data) => console.log(data));
//   }, []);
//   return (
//     <Row type="horizontal">
//       <Heading as="h1">All cabins</Heading>
//       <p>TEST</p>
//       <img
//         src="https://fgaiufdkufonrcaudzlm.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg?t=2024-10-13T14%3A34%3A41.112Z"
//         alt=""
//       />
//     </Row>
//   );
// }

// export default Cabins;

////******************************************************** Fetching cabins data
// first create component in cabinsTable.jsx
// Rememeber all the components should be right inside the main component so use react fragment instaed of div

// Beauty of reactQuery, watch what happens if I go now to another page, so if I move away from this component which has therefore unmounted. So now we can see that our state here so that this cabin data is inactive. But watch what happens if I go back here. So here is the same data again, and we didn't have to do any new fetch request.
// So there wasn't a loading spinner this time, because we already had the data from before. Now of course, if we loaded the page here first, then we don't have the cabin's data yet. And as we move here, it first needs to be fetched. And so then we get that loading spinner,
// and the data gets stored in our cache. Then again, as we move away the component amounts but the data stays in our cache. So traditionally, if we were doing it using a use effect hook, then as soon as we moved back to the page, the use effect hook would then fetch the data again. But here again, the data is already there.
// It's still in our cache. Now after some time, notice how the color here changed from green and fresh to stale. So this stale basically means inside React Query that the data is now old so that it's basically invalid. And so therefore when we do certain things, it will now automatically re-fetch the data.
// So just as we learned in the first lecture of the section. And one of the things that we can do, which will then trigger a re-fetch, is to move away from this browser tab and then come back to it later. So that will trigger a re-fetch as soon as the data is stale.

// function Cabins() {
//   return (
//     <>
//       <Row type="horizontal">
//         <Heading as="h1">All cabins</Heading>
//         <p>Filter/Sort</p>
//       </Row>
//       <Row>
//         <CabinTable />
//       </Row>
//     </>
//   );
// }

// export default Cabins;

////************************************************ React Hook Form
// add temprory state
// go and set up that React hook library createCabinForm.jsx

// function Cabins() {
//   const [showForm, setShowForm] = useState(false);
//   return (
//     <>
//       <Row type="horizontal">
//         <Heading as="h1">All cabins</Heading>
//         <p>Filter/Sort</p>
//       </Row>
//       <Row>
//         <CabinTable />
//         <Button onClick={() => setShowForm((prev) => !prev)}>
//           Add new cabin
//         </Button>
//         {showForm && <CreateCabinForm />}
//       </Row>
//     </>
//   );
// }

// export default Cabins;

////********************************************************* Advanced React Pattern
// What I want that instead of showing form blow, it should be shown at the top
// lets make simple by moving logic to AddCabin.jsx

// function Cabins() {
//   return (
//     <>
//       <Row type="horizontal">
//         <Heading as="h1">All cabins</Heading>
//         <p>Filter/Sort</p>
//       </Row>
//       <Row>
//         <CabinTable />
//         <AddCabin />
//       </Row>
//     </>
//   );
// }

// export default Cabins;

////***********************************  Client-Side Filtering: Filtering Cabins
// first create CabinTableOperations.jsx

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
