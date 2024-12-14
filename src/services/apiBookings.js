import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

// // So, we need to not only load the data about this booking, but also about this cabin, and this guest. So that sounds quite complicated, but fortunately for us, the Supabase API is really flexible and can easily do all of that. So right here where we select, right now we are selecting everything, right? But here we now need to actually add some more things.
// // So we need to add this comma here, and all inside the string. And then we need to use the name of the tables that we are referencing. So that's cabin and guests. So here we have this cabin foreign table. And so then here,
// // we can sepcify what we want either cabins("*") all the info or cabins("name")
// export async function getBookings() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select(
//       "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
//     );
//   if (error) {
//     console.log(error);
//     throw new Error("Bookings could not be loaded");
//   }
//   return data;
// }

////********** sorting/filter lets see what we can do hardcoded way
//// So for that, I can use now on this query, the eq method, which stands for equal. And then here I specify the field name. So let's say "status," and then the value that we want status to be equal to. And so let's say "unconfirmed." And so now, if we reload here, then indeed we only have bookings with unconfirmed. Alright. But that's not even all. So we can add even more methods here to the end. So we can also say, "greater than or equal."
// export async function getBookings() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select(
//       "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
//     )
//     .eq("status", "unconfirmed")
//     .gte("totalPrice", 2000);
//   if (error) {
//     console.log(error);
//     throw new Error("Bookings could not be loaded");
//   }
//   return data;
// }

////*** Sort/Filter above was hardcoded, but we want to get data from url i,e just like sortBy/discount = and it is just simple function we can not use search params
//// so use the useBooking.jsx there we are getiing data and notice when I clicked other than unconfirmed it will not work simply becuse we did not tell react query to re-fetch the data
//// there is a simple way of doing this go to useBookings.jsx

// export async function getBookings({ filter, sortBy }) {
//   let query = supabase
//     .from("bookings")
//     .select(
//       "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
//     );

//   // 1. FILTER
//   // if (filter !== null) query.eq(filter.field, filter.value);
//   if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

//   // 2. SORT
//   if (sortBy)
//     query = query.order(sortBy.field, {
//       ascending: sortBy.direction === "asc",
//     });
//   const { data, error } = await query;

//   if (error) {
//     console.log(error);
//     throw new Error("Bookings could not be loaded");
//   }
//   return data;
// }

// export async function getBookings() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select(
//       "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
//     )
//     .eq("status", "unconfirmed")
//     .gte("totalPrice", 2000);
//   if (error) {
//     console.log(error);
//     throw new Error("Bookings could not be loaded");
//   }
//   return data;
// }

////********** API-Side Pagination: Paginating Booking
//// So right here in this select function, we can pass in a second argument which is this object with the count property. So, here we can define count as exact. And so this can actually be helpful whenever you don't want to query the entire data but really only need the number of results. And so then you can just use this. Now what this will do is that besides the data enter error,
//// this query here will then also return a variable. So a property on the object called count. And so then here we can destructure that and then also return it here. So, instead of just returning the data, we can return an object with data and count.
//// So, if there is a page, then let's do a few things. So what we will want to do is to add something more to our query. So we do query will equal query.range. So here range is the method from Supabase that we need. And here we will have to pass in a from parameter and a to parameter.

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // 1. FILTER
  // if (filter !== null) query.eq(filter.field, filter.value);
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  // 2. SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  // 3. PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  // query
  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
