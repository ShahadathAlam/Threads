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

export async function fetchThreadById(id: string) {
  connectToDB();
  try {
    // TODO: Populate Community

    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",

        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },

          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(`Failed to fetch thread by ID: ${error.message}`);
  }
}

// export async function fetchThreadById(id: string) {
//   connectToDB();
//   try {
//     // TODO: Populate Community

//     const thread = await Thread.findById(id)
//       .populate([
//         {
//           path: "author",
//           model: User,
//           select: "_id id name image",
//         },
//         {
//           path: "children",

//           populate: [
//             {
//               path: "author",
//               model: User,
//               select: "_id id name parentId image",
//             },

//             {
//               path: "children",
//               model: Thread,
//               populate: {
//                 path: "author",
//                 model: User,
//                 select: "_id id name parentId image",
//               },
//             },
//           ],
//         },
//       ])

//       .exec();

//     return thread;
//   } catch (error: any) {
//     throw new Error(`Failed to fetch thread by ID: ${error.message}`);
//   }
// }

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();
  try {
    // adding a comment to the thread

    // Find the original thread by its ID

    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create a new thread with the comment text

    // const newCommentThread = await Thread.create({
    //   text: commentText,
    //   author: userId,
    //   parentId: threadId,
    // });

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // Save the comment thread

    const savedCommentThread = await commentThread.save();

    // Update the original thread with the new comment thread's ID

    originalThread.children.push(savedCommentThread._id);

    // Save the original thread

    await originalThread.save();
    // Invalidate the cache for the thread page
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add comment to thread: ${error.message}`);
  }
}
