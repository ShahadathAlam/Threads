"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  console.log("Starting user update...");
  await connectToDB();

  try {
    console.log("Database connected. Updating user...");
    console.log("Update Params:", { userId, username, name, bio, image });

    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, bio, image, onboarded: true },
      { upsert: true, new: true }
    );

    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    if (path === "/profile/edit") {
      console.log("Revalidating path:", path);
      revalidatePath(path);
    }
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

// export async function updateUser({
//   userId,
//   username,
//   name,
//   bio,
//   image,
//   path,
// }: Params): Promise<void> {
//   connectToDB();

//   try {
//     // Update user data in MongoDB

//     await User.findOneAndUpdate(
//       { id: userId },
//       { username: username.toLowerCase(), name, bio, image, onboarded: true },
//       { upsert: true }
//     );

//     if (path === "/profile/edit") {
//       revalidatePath(path);
//     }
//   } catch (error: any) {
//     throw new Error(`Failed to create/update user: ${error.message}`);
//   }
// }
