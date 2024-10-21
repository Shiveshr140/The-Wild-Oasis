import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

////******************************* Fetching cabins data
// useQuery custom hook. So useQuery, and now here we need to pass in an object with two things. First, the queryKey. And so this will uniquely identify this data that we're going to query here. So this can be a complex array,
// or it can just be an array with a string, but it needs to be an array like this. So this cabin is what we will later also see insight or React Query dev tools. And again, this is what identifies each data.
// And so if later we would useQuery again on another page with this exact key, then the data would be read from the cache as we learned at the beginning.

// Now, right, and second is the actual query function. And so this is the function which, as the name says, is responsible for actually querying. So basically for fetching the data from the API.
// Now what's important is that the function that we specify here needs to return a promise. So in the most simple form, we could, for example, use the fetch API here,
// and then do some request to some URL here. However, this is not what we're going to do. Instead, we will again use the function that we already created. So this getCabins function here is an async function, and therefore it returns a promise. And that promise, when resolved, will return this data here, right? So that's how promises and async/await work.

// you logged it in console to see what it look like, nd we also automatically get that isLoading state that I mentioned earlier. And actually in addition to that, we get a bunch of other states, so similar to that.
// So like isSuccess, or isPaused, or isFetching, or isError, or all of these other ones. Now instead of using these, we could also use the status. So for example, this one is right now at success, but in the beginning it will be at loading, probably. So maybe here we can see that.
// Well, actually not. This is from earlier. So maybe this one here is the initial one. Yeah, it seems like it is. And so here the status, as I was saying, was initially loading. So we can use this one or we can just use isLoading, which, again, was true at the beginning.
// lets give role to make it accessible

// CabinsRow.jsx

// function CabinTable() {
//   const {
//     isLoading,
//     data: cabins,
//     error,
//   } = useQuery({
//     queryKey: ["cabins"],
//     queryFn: getCabins,
//   });

//   if (isLoading) return <Spinner />;

//   return (
//     <Table role="table">
//       <TableHeader role="row">
//         <div></div>
//         <div>Cabin</div>
//         <div>Capacity</div>
//         <div>Price</div>
//         <div>Discount</div>
//         <div></div>
//       </TableHeader>
//       {cabins.map((cabin) => (
//         <CabinRow cabin={cabin} key={cabin.id} />
//       ))}
//     </Table>
//   );
// }

// export default CabinTable;

////****************************************************************** Abstracting React Query Into Custom Hooks
// useCabins.js

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
