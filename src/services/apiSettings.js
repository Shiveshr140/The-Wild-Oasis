import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
// notice how here, we don't need to pass in the id. And so the reason for that is, again, that we will only update row number one. And so that's exactly what we have right here. And then the object that we need to pass in here is simply an object with the column that needs to be updated.
// So with the field that needs to be updated. So it doesn't have to be the complete new settings object. Only the fields, or the columns, that we want to update
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
