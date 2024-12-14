import supabase from "./supabase";

// So, basically on our Supabase client we can use the Auth sub module. And so then on here we can call all kinds of methods. And the most basic one is exactly the sign in with password. And so this then accepts an object
// which contains exactly the email and the user's password.
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  // console.log(data);

  return data;
}

// We can check if that user exists and if they are still authenticated. And so here we will now create a function called get user or maybe get current user. So for this, first we actually need to check whether there is an active session. So for that we use get session.
// And so this will actually get that data from local storage that I showed you earlier. if there is no session.session, which is actually the name, then we just return null here. So then there is really no current user. But if there is, then we can get that user again from Supabase. And once again, you might think that
// we could just get the user here from the session. And while that is true, it is a bit more secure to just redownload everything from Supabase.
// Create useUser.js
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  // console.log(data);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
