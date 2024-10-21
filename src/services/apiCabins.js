import supabase, { supabaseUrl } from "./supabase";

// So from the supabase client we can now create queries with the from method. And so then we specify the name of the table and then the fields that we want. And so here we want basically all of them.
// And so this returns a promise which we then await. And the result of that gives us the data and a possible error.
export async function getCabins() {
  // read/get all rows
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

// you can tell what to delete, And so here we then basically select the row that we want to delete. And so that row is where the ID column is equal to the ID that we paste in here. And now let's just actually Delete this.
// Now, if we were to attempt to call this function now then actually nothing would happen. And the reason for that is that we activated row level security on this table. So let's go to our row level security policies right here.
// Right now users are able to select. So basically to read data from the table, but nothing else. So if we want to also enable users to Delete, we need to create a new policy for that. Selete the same policy with delete option now they can delete
// CabinsRow.jsx where we delete button
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

// // create cabin
// // first create new policy for instert and update and here use true as expression
// // createCabinForm.jsx
// export async function createCabin(newCabin) {
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([newCabin])
//     .select();
//   if (error) {
//     console.log(error);
//     throw new Error("Cabins could not be created");
//   }
//   return data;
// }

//// create cabin + image
// Now, what we still need to do is to actually specify the image path here in this new cabin that we create. So, remember that in our data right here, for example, in this first row, we already have the image but the only way in which we specify the image in the cabin
// is by using the file name. So, with this file name, we basically connect this cabin row with the corresponding cabin image. And actually let's grab this URL here. So, we will need this in a minute. So, the format of that URL. But as I was saying, we need not only to upload the image itself,
// but to also specify the image name and actually the path to the image in the bucket right here in the new cabin that we insert. So, first of all, we need to create a URL like this. So, basically containing the path to the bucket itself and then a unique cabin name. So, let's do that. So, image name. And so, here, we need to really make sure
// that this name is unique. So, let's create a template literal and then doing math.random. And so, then, we just prefixed that to the cabin name itself. So, that is gonna be stored inside the new cabin.image.name as we saw earlier. Now, if this cabin name contains any slashes, then super base will create folders based on that. And so, we of course don't want that.
// And so, let's replace all the slashes with nothing.
// https://fgaiufdkufonrcaudzlm.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg?t=2024-10-13T14%3A34%3A41.112Z

// So, that's the first part that is finished now. And next up, we want to actually upload the image itself. So, let's come here to our API to learn how we can do that. Now, actually right here in this documentation, they don't explain how to do it. And so, let's come here to the introduction where they should be a link to the documentation. So, this one right here, let's click that.
// https://supabase.com/docs/reference/javascript/introduction, read upload a file in storage section in js
// enablw RLS in cabin images select everything in full customization

// export async function createCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

//   // create cabin
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newCabin, image: imagePath }])
//     .select()
//     .single();
//   if (error) {
//     console.log(error);
//     throw new Error("Cabin could not be created");
//   }

//   // upload image
//   const { error: storageError } = await supabase.storage
//     .from("cabins-images")
//     .upload(imageName, newCabin.image);

//   // Delete the cabin if there was an error in uploading a image i.e we do not want to create a cabin w/o image
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.log(StorageError);
//     throw new Error("Image could not be uploaded hence cabin was not created");
//   }

//   return data;
// }

//// Edit cabin/create cabin, so lots of code are common for both create cabin and edit cabin so refactor this
// handle image now if edit w/o changing image hen see data we get url if we edit image then we get fileList

export async function createEditCabin(newCabin, id) {
  // sometimes it is not a string then use optional chaining
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  // create/edit
  let query = supabase.from("cabins");

  // create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // edit cabin, code is from update it also need update rls policy which we did it before
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // upload image
  if (hasImagePath) return;
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  // Delete the cabin if there was an error in uploading a image i.e we do not want to create a cabin w/o image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Image could not be uploaded hence cabin was not created");
  }

  return data;
}
