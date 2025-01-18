"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;

  path: string;
}

export async function createThread({
  text,
  author,
  communityId,

  path,
}: Params): Promise<void> {
  await connectToDB();

  try {
  } catch (error: any) {}
}
