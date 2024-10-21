import React from "react";
import styled from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

////******************************************* Setting Up Pages and Routes
// "npm i react-router@6"
// We want to see dashboard as soon as we reach the app, use declarative way i.e Navigate, repace keyword to change the url

// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <BrowserRouter>
//         <Routes>
//           <Route index element={<Navigate replace to="dashboard" />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="account" element={<Account />} />
//           <Route path="cabins" element={<Cabins />} />
//           <Route path="bookings" element={<Bookings />} />
//           <Route path="login" element={<Login />} />
//           <Route path="settings" element={<Settings />} />
//           <Route path="users" element={<Users />} />
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

////***************************************

////************************************** Building App Layout
// AppLayout.jsx
// To render the child component in app layout we gonna use <Outlet /> in app layout
// Header.jsx, Sidebar.jsx

////*************************************** Building the Sidebar and Main Navigation
// Sidebar.jsx

// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <BrowserRouter>
//         <Routes>
//           <Route element={<AppLayout />}>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="account" element={<Account />} />
//             <Route path="cabins" element={<Cabins />} />
//             <Route path="bookings" element={<Bookings />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="users" element={<Users />} />
//           </Route>
//           <Route index element={<Navigate replace to="dashboard" />} />
//           <Route path="login" element={<Login />} />
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

////*********************************************************

//////************************************************* Supabase: Building Back-End

////*****  creating new database

////****** create table
// do not forget to turn off cors
// create cabins -> guests -> settings table

////********************************** Relationships Between Tables
// create bookings -> connect this table with cabins and guests i.e establish reltionship

////**********************************
// So now let's attempt to access our data from Supabase on our local computer, and then we're gonna learn about row-level security. So back here in Supabase, let's now come to this API docs.
// So basically, Supabase automatically creates an entire API documentation for all of our tables, So essentially, we can access our data using the JavaScript library, so by using this,
// and then all we have to do is to copy this code, or we can use it as an actual RESTful API. So, that's what this here is. So we can basically just send a request to this URL right here, where this first part here
// is the URL of our project, and then we have here our table and then all the columns that we want. Then we need to send our API key, and then here again, that key has an authorization header.
// So let's actually try to do that here. And so for each of the table columns, we have a different example here that we can copy, but let's come to the one where we read all the rows. So then let's come here, where it says that the project
// API key is hidden, and so then here we need to select that we actually want to show our public, so this anon key right here. And so then basically this here is the key that we can use on the front end to access our data,
// but more about that later. For now, let's just copy this code and paste it into some terminal, because this is going to be a curl request. So curl is basically to make some HTTP requests right in the terminal.
// So let's paste that in.
// instead of curl use this Invoke-WebRequest -Uri  in powershell, e don't get an error, which is already a success. Now, we also don't get any data, so instead, we only get this empty array here, and so the reason
// for that is the row-level security that we enabled at the very beginning when we first created this table. So what these row-level security tables do is to prevent anyone who owns this key here
// from basically doing whatever they want with our database. So if it wasn't for the role level security or RLS policies then whoever had this key here could really, for example, delete our database
// or edit whatever they wanted. So of course, we don't want that to happen. We only want certain operations to be allowed, and so that's why we can cert, and so that's what we can set these RLS policies for.

// So in order to now allow us to actually receive the data, let's create a new policy. And so then let's select get started quickly, 'cause we just want to create a policy from a template,
// and so actually this first one is exactly what we want for now. So first we want to enable everyone to have read access to this table, while later, we will probably then enable this one here, so only for authenticated users.
// But now let's do this one, use this template, and then we really just have to click here on review and save. Okay. And so what this one will do, as the name says, is to enable read access for everyone.
// Now we run that again in our terminal then this tym we get data of the cabins table

// lets create this policy for all tables, What matters is that now we will be able to access all this data right in our React application,

////********************************************************************* Connecting Supabase With Our React App
// So now the time has finally come where we can connect our supabase data with our React application. And actually this is all gonna be really, really easy because if we come back here to the API documentation page
// then right here in this introduction they give us all the instructions that we need in order to do this connection. So remember how I said earlier that we can either use this api, so this restful url so basically this URL to connect to the restful api
// or we can use the client JavaScript library. So that's what we're going to do now. So here they give us all the instructions for doing so. And so let's start by copying here, this NPM install string.
// And so with this we just install the supabase JavaScript library on our project that then that's also immediately in our services create a new file. So this is basically a supabase client
// where we will initialize the supabase API and create a client so that we can then start querying our database. And so all the code that we need there is actually right here.
// So let's copy that and paste it right here. So here we have our supabase url.
// "npm install @supabase/supabase-js" -> create new file in services supabase.js -> apiCabins.js -> cabins.js(use the service)

////************************************************** Setting up storage buckets
// And now to wrap up this Supabase crash course, let's quickly set up two storage buckets where we can upload large files to. So back in Supabase, let's select the storage from the menu.
// And then here we can very easily create a new storage bucket. et's select the storage from the menu. And then here we can very easily
// create a new storage bucket. So let's create one for avatars, so basically for the avatar of our application users. And then let's make this a public bucket, so that anyone can actually read the URL
// of all the files that are in the bucket. So that's actually not really a problem, because role level security policies are still gonna be required for operations
// such as uploading or deleting files.
// avatars -> cabins-images

// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <BrowserRouter>
//         <Routes>
//           <Route element={<AppLayout />}>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="account" element={<Account />} />
//             <Route path="cabins" element={<Cabins />} />
//             <Route path="bookings" element={<Bookings />} />
//             <Route path="settings" element={<Settings />} />
//             <Route path="users" element={<Users />} />
//           </Route>
//           <Route index element={<Navigate replace to="dashboard" />} />
//           <Route path="login" element={<Login />} />
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;

////**********************************************************

////************************************************************** React Query: Managing Remote State
//// React library of all time in order to manage the remote state that we now have stored on Superbase. And that library is called React Query. So as we really start developing this project, we will essentially allow React Query to take over
// all fetching and storing of remote data, which will simplify our life so much.

////*********************************** What is React Query
// So, one of the big focal points of this project is gonna be the integration of React Query for all data fetching and remote state management. And so in this lecture, let's start by understanding
// what React Query is all about. So, as I've mentioned multiple times in the course already, React Query is essentially a very powerful library for managing remote state.
// So, state that is basically stored on a server and that we need to load into our application. And many developers even describe React Query
// as being the data fetching library that React itself is missing. Because it's so easy to use and contains so many useful features that are gonna allow us to write a lot less code
// in order to fetch data from an API and to manage all that data, all while at the same time, even making the user experience of our apps a lot better too.

// And so, let's now talk about some of the most useful features and understand how React Query works. So, the most fundamental thing about React Query
// is that all remote state is cached, which means that the fetched data will be stored in order to be reused in different points of the application.
// So, for example, if we fetch data about cabins in Component A, React Query will fetch the data from the API. It will then store the received data in the cache,
// so that Component A can use it. And then if at a later point, Component B also wants to fetch the cabin data, then no additional API request will be necessary. Instead, React Query will simply provide
// this same data to Component B from the cache. And this has two huge advantages. First, it wastes a bit less data to be downloaded but more importantly, once the data is in the cache
// all other components like Component B here, can receive it instantly. So without having to show the user another loading spinner. And this creates a super responsive
// and fast experience for our users,

// As you're gonna see throughout this section. And while doing all this, React Query also automatically gives us all loading and error states, so that we can actually focus on what matters.
// But that's not even all, React Query also automatically refetches the data in certain situations. For example, after a certain timeout or after we leave the browser window
// and then come back to it. And this is super important in order to make sure that a remote state always stays in sync with the application. For example, if some other user of the app changes the remote state at some point, for example, by updating a cabin, then the application running on all other computers
// will have this cabin state out of sync with the newly updated state. And so, React Query can help with this as well. So, keeping everything in sync by automatically refetching data.

// Now, besides refetching, we can also prefetch data, which basically means to fetch data that we know will become necessary later, but before it is actually displayed on the screen. And a classic example of this is pagination,
// where with prefetching, we can fetch data not only for the current page, but also for the next page. This way, when the user then moves to the next page, the data will always already be there in the cache. So, without needing to display an annoying loading spinner.
// It's also very easy to mutate. So, to update remote state using the many tools that are built into React Query.

// Now, besides all this, there are many other features that we could talk about here, but one that I find really useful is support for when the user becomes offline. So, in this situation, since the data is already cached
// as the user moves around in the app while being offline, Components A and B can still be displayed using this cached cabin data. Now, remember that as we learned earlier, we need a library with all these features
// because remote state is fundamentally different from UI state. It's asynchronous and usually shared by many users of the app, which makes it so that applications running in different browsers can very easily get out of sync with the remote data that is stored on a server.
// So, remote state has many special needs, and so that's the reason why we use something like React Query. Now, there are actually other libraries that do many
// of the things that React Query does. For example, SWR or Redux Toolkit Query, which as the name says is the remote state solution integrated into Redux Toolkit. However, from what I've seen, none of them works as well
// and is as popular as React Query.

////******************************************** Setting up react query
// "npm i @tanstack/react-query@4"
// so the library itself is actually called "tan stack query" because it also works in other frameworks such as Svelte or View. So the official name is not React Query anymore.
// So the idea behind integrating React Query into our application is very similar to what we did earlier with the Context API or with Redux. So first we create a place where the data basically lives and then second, we provide that to the application.
// And in the case of React Query, we set up the cache and the Query client using "new QueryClient."

// And then in here we can pass a couple of options. So let's just do that here, even though we are not going to need many options. But I just want to show you how it works.
// So we can specify here the default options. And then usually what we want is to specify options for our queries. And so here, one that we can experiment with is called "staleTime".
// And "staleTime" is basically the amount of time that the data in the cache will stay fresh so that it will stay valid until it is refetched again.

// With this we have created our "QueryClient," which basically sets up the cache behind the scenes. And so now it's time to provide this to the application. And we want to provide our Query data to the entire application tree.
// then install react query dev tools => " npm install @tanstack/react-query-devtools" and in order to use it you provide child route of parent route QueryClientProvider

////********************************************* Fetching Cabin Data
// cabinTable.jsx  => cabins.jsx => cabinRow.jsx

// Beauty of reactQuery, watch what happens if I go now to another page, so if I move away from this component which has therefore unmounted. So now we can see that our state here so that this cabin data is inactive. But watch what happens if I go back here. So here is the same data again, and we didn't have to do any new fetch request.
// So there wasn't a loading spinner this time, because we already had the data from before. Now of course, if we loaded the page here first, then we don't have the cabin's data yet. And as we move here, it first needs to be fetched. And so then we get that loading spinner,
// and the data gets stored in our cache. Then again, as we move away the component amounts but the data stays in our cache. So traditionally, if we were doing it using a use effect hook, then as soon as we moved back to the page, the use effect hook would then fetch the data again. But here again, the data is already there.
// It's still in our cache. Now after some time, notice how the color here changed from green and fresh to stale. So this stale basically means inside React Query that the data is now old so that it's basically invalid. And so therefore when we do certain things, it will now automatically re-fetch the data.
// So just as we learned in the first lecture of the section. And one of the things that we can do, which will then trigger a re-fetch, is to move away from this browser tab and then come back to it later. So that will trigger a re-fetch as soon as the data is stale.
// So let's try to go to Supabase here. So go to another tab, and then let's change something. So let's change the price here to 500, or maybe let's change the discount to something else. And so that will then simulate that scenario where some other user of the application changes something.
// And so then all the applications running on other browsers will come out of sync. And so React Query prevents that from automatically re fetching the data.

////************************************************** Mutations: Deleting a Cabin
// So we learned how to fetch and store data in the cache using the "useQuery" hook. But now it's time to learn how to also mutate our remote server state. And so in this lecture, let's learn how we can use the power of
// React Query to Delete a cabin and automatically re-render the user interface.
// create deleteCabin function in apiCabins.jsx, CabinRow.jsx

////************************************************** Displaying Toasts (Notifications)
// So let's now display some nicely formatted notifications which in the world of web design and development are also called toasts for some reason. So for that, let's bring in yet another third party library. And this is a really small one but it's still better than built all of this stuff by hand. So React Hot Toast is the name of this library.
// "npm i react-hot-toast", so just like react dev tools we need to use self clossing tag so lets place it the end no matter where to place it,
// And with this, we are now ready to use this toaster. So right here, let's now replace these alerts with toast. So this is the function that we can import from React Hot Toast. And then on there we can create a bunch of different toasts so styles of toasts. So here we want an arrow toast. And here we want a toast dot success. And so this will then get different icons. And also as we defined earlier, this one will be displayed
// cabinRow.jsx
// AppLayout.jsx fix the layout AppLayout add containert to center the content

////*******************************************  Introducing Another Library: React Hook Form
// Now it's time to set up another one of the libraries that I introduced in the lecture where we plant this application. And that library is the React Hook Form Library that we can use to greatly simplify handling forms in real world, React, single page applications. But first of all, let's actually first set up the form in our JSX and in the UI.
// So the library that we're going to use is really only about handling the form submission and form errors and things like that. So it doesn't give us any prebuilt components. So instead what we have already is the create cabin form.
// createCabinForm.jsx

////******************************************  Creating a New Cabin
// apiCabin.jsx, createCabinForm.jsx

////*****************************************  Handling Form Errors
// First go AppLayout fix the issue only main part should scroll => AppLayout.jsx
// createCabinForm.jsx, FromRow.jsx

////**************************************** Uploading Images to Supabase
// createCabinForm.jsx => apiCabin.jsx

////***************************************** Edit a cabin
// first of all, let's add an edit button here to each of these rows. => cabinRows.jsx
// apiCabin.jsx => creatcabinForm.jsx

////******************************************* Abstracting React Query Into Custom Hooks
// CabinRow.jsx, createCabinForm.jsx, cabinTable.jsx

////******************************************* Duplicating Cabins
// CabinRow.jsx

////***********************************************  Fetching Applications Settings
// Create some new RLS security policies. So right down here in the settings let's create a new policy. Well actually we already have the one for selecting but since we are here, let's create a one for editing that will be necessary
// services/apiSettings.js
// updateSettings.js

////*********************************************** Updating Application Settings
// Lets update each of the settings value individually by using a very nice, clever trick.
// look at apiSettings.js update function
// create custom hook useEditSettings.js same as useEditCabin.js

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
          </Route>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "12px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
