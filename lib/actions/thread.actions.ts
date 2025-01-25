"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";

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
}: Params) {
  await connectToDB();

  try {
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // Update the User Model

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    // Invalidate the cache for the thread page
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`);
    // Log the error for debugging purposes
    console.error("Error creating thread:", error);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();
  // calculate the number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  // Fetch the posts that have no parents (top-level threads..)

  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });
  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;
  return { posts, isNext };
}
