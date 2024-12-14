import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

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

// function CabinTable() {
//   const { isLoading, cabins } = useCabins();

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

////******************************************************* Building Reusable Table
// So basically, right now, this table is really not reusable, like we have, for example, like, these grid columns hardcoded right in the header, and I guess also in the row.So here we have the exact same columns again, so in both places and they are really this hardcoded. So this is going to make it really hard to reuse this table
// for something else. For example, for the bookings. So instead of having this table here, instead it would be really nice to simply pass the column definition like this one into the table, and then all of the rows in there, and also the header would automatically get access to the size of the columns.
// So how could we do something like this? Well, we can actually once again use a compound component. So as I have mentioned earlier, once you know about this pattern, you will start seeing use cases for it everywhere.
// First see Table.jsx export it, comment above table style

// So what we were saying in the beginning is that what we want is to pass in the column definition right into this table so that then we can use that on all the child components. So let's do that. Let's call that prop columns, and then let's just make it a string, and exactly this one right here. So basically we're gonna take advantage of the way that CSS grid represents columns and use that here.
// CabinsRow.jsx add Table.Row
// Accept these in Table.jsx

// function CabinTable() {
//   const { isLoading, cabins } = useCabins();

//   if (isLoading) return <Spinner />;

//   return (
//     <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
//       <Table.Header role="row">
//         <div></div>
//         <div>Cabin</div>
//         <div>Capacity</div>
//         <div>Price</div>
//         <div>Discount</div>
//         <div></div>
//       </Table.Header>
//       {cabins.map((cabin) => (
//         <CabinRow cabin={cabin} key={cabin.id} />
//       ))}
//     </Table>
//   );
// }

// export default CabinTable;

////***************************************** Render Prop pattern
{
  /* <Table.Body>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
</Table.Body> */
}
// Now, we could use this table body just like this, so we can do table.body and then place all the content in there. So, that would definitely be an option, and then in here, simply render the children prop. However, this is kind of ugly, I would say, and we can do it any much better way. So instead, what we want to do is, not this, but actually have this as a self-closing element. And then we simply want to pass in the cabins data. So here, let's say that the data is cabins
// and then we also need to pass in basically the instructions on how this table.body should actually render the data. And so that's where the render prop pattern comes into play. So again, right now we are passing the data into this table.body but it doesn't really know what to do with this data, right? I mean, it might know or it will know that this is an array,
// and so it'll probably loop over that array, but then it doesn't know what to do with it. And so again, here we can now specify the render prop. And so this is where we then tell the component what to do with each cabin. And so that's essentially this part right here. So, let's grab that and then we can get rid of this, and then I think that this looks a lot nicer, and a lot cleaner as well. So a lot more reusable even.

// function CabinTable() {
//   const { isLoading, cabins } = useCabins();

//   if (isLoading) return <Spinner />;

//   return (
//     <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
//       <Table.Header role="row">
//         <div></div>
//         <div>Cabin</div>
//         <div>Capacity</div>
//         <div>Price</div>
//         <div>Discount</div>
//         <div></div>
//       </Table.Header>
//       <Table.Body
//         data={cabins}
//         render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
//       />
//     </Table>
//   );
// }

// export default CabinTable;

////***************************************** Building reusable context menu
// now inside the table body inside of each cabin row, we will have a Menus.Menu
// CabinRow.jsx

// function CabinTable() {
//   const { isLoading, cabins } = useCabins();

//   if (isLoading) return <Spinner />;

//   return (
//     <Menus>
//       <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
//         <Table.Header role="row">
//           <div></div>
//           <div>Cabin</div>
//           <div>Capacity</div>
//           <div>Price</div>
//           <div>Discount</div>
//           <div></div>
//         </Table.Header>
//         <Table.Body
//           data={cabins}
//           render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
//         />
//       </Table>
//     </Menus>
//   );
// }

// export default CabinTable;

////***********************************  Client-Side Filtering: Filtering Cabins
// let fetch the filter value from url, when we come to the page first tym filterValue is null Even though probably what we will want in this situation is to show all the cabins. So with no filter applied.
// make filter re-usable => Filter.jsx

// function CabinTable() {
//   const { isLoading, cabins } = useCabins();
//   const [searchParams] = useSearchParams();
//   const filterValue = searchParams.get("discount") || "all";

//   if (isLoading) return <Spinner />;

//   let filteredCabins;
//   if (filterValue === "all") filteredCabins = cabins;
//   if (filterValue === "no-discount")
//     filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
//   if (filterValue === "with-discount")
//     filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

//   return (
//     <Menus>
//       <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
//         <Table.Header role="row">
//           <div></div>
//           <div>Cabin</div>
//           <div>Capacity</div>
//           <div>Price</div>
//           <div>Discount</div>
//           <div></div>
//         </Table.Header>
//         <Table.Body
//           data={filteredCabins}
//           render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
//         />
//       </Table>
//     </Menus>
//   );
// }

// export default CabinTable;

////************************************* Client-Side Sorting: Sorting Cabins

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1.) Filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2.) Sorting
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
