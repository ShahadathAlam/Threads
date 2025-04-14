# Threads App

## Table of Contents

1. [What is Threads?](#what-is-threads)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Common Issues and Solutions](#common-issues-and-solutions)

   - [JWT Clock Skew Issue Resolution](#jwt-clock-skew-issue-resolution)
   - [Debugging and Fixing Image Upload Issues](#debugging-and-fixing-image-upload-issues)
   - [Only plain objects can be passed to client components from server components](#only-plain-objects-can-be-passed-to-client-components-from-server-components)
   - [Resolving Data Fetching Error in NextJs Client Components](#resolving-data-fetching-error-in-nextjs-client-components)
   - [Fixing params.id Error in Next.js Dynamic Routes](#fixing-paramsid-error-in-nextjs-dynamic-routes)
   - [Handling MongoDB ObjectId in Next.js](#handling-mongodb-objectid-in-nextjs)
   - [Fixing Full-Page Image Stretch in Next.js](#fixing-full-page-image-stretch-in-nextjs)
   - [Fixing `userId` Being `undefined` in a Clerk Sidebar Component](#fixing-userid-being-undefined-in-a-clerk-sidebar-component)
   - [Developer Note: Solving a TypeScript + MongoDB `$or` Error](#developer-note-solving-a-typescript-and-mongodb-error)

6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgments](#acknowledgments)
10. [Support](#support)

---

## What is Threads?

Threads is a text-based app allows users to share updates and join public conversations. It's designed to be a separate space for real-time updates and public conversations. The app provides a dynamic platform for creating and managing threads, communities, and engaging in discussions with users worldwide.

---

## Features

### Authentication

- Authentication using Clerk for email, password, and social logins (Google and GitHub) with a comprehensive profile management system.

### Visually Appealing Home Page

- A visually appealing home page showcasing the latest threads for an engaging user experience.

### Create Thread Page

- A dedicated page for users to create threads, fostering community engagement.

### Commenting Feature

- A commenting feature to facilitate discussions within threads.

### Nested Commenting

- Commenting system with nested threads, providing a structured conversation flow.

### User Search with Pagination

- A user search feature with pagination for easy exploration and discovery of other users.

### Activity Page

- Display notifications on the activity page when someone comments on a user's thread, enhancing user engagement.

### Profile Page

- User profile pages for showcasing information and enabling modification of profile settings.

### Create and Invite to Communities

- Allow users to create new communities and invite others using customizable template emails.

### Community Member Management

- A user-friendly interface to manage community members, allowing role changes and removals.

### Admin-Specific Community Threads

- Enable admins to create threads specifically for their community.

### Community Search with Pagination

- A community search feature with pagination for exploring different communities.

### Community Profiles

- Display community profiles showcasing threads and members for a comprehensive overview.

### Figma Design Implementation

- Transform Figma designs into a fully functional application with pixel-perfect and responsive design.

### Blazing-Fast Performance

- Optimal performance and instantaneous page switching for a seamless user experience.

### Server Side Rendering

- Utilize Next.js with Server Side Rendering for enhanced performance and SEO benefits.

### MongoDB with Complex Schemas

- Handle complex schemas and multiple data populations using MongoDB.

### File Uploads with UploadThing

- File uploads using UploadThing for a seamless media sharing experience.

### Real-Time Events Listening

- Real-time events listening with webhooks to keep users updated.

### Middleware, API Actions, and Authorization

- Utilize middleware, API actions, and authorization for robust application security.

### Next.js Layout Route Groups

- New Next.js layout route groups for efficient routing.

### Data Validation with Zod

- Data integrity with data validation using Zod.

### Form Management with React Hook Form

- Efficient management of forms with React Hook Form for a streamlined user input experience.

### Code Architecture and Reusability

- Highly modular code architecture ensuring reusability and maintainability.

---

## Tech Stack

The tech stack for Threads is as follows:

- **Frontend**:
  - React
  - Next.js
  - Tailwind CSS
  - TypeScript
- **Backend**:
  - Node.js
  - MongoDB with Mongoose (ORM)
  - Clerk (Authentication)
  - UploadThing (File Uploads)
  - Svix (Webhooks)
- **Development Tools**:
  - ESLint, Prettier (Code linting and formatting)
  - Radix UI (Components)
  - Zod (Validation)
  - React Hook Form (Form Management)

---

## Getting Started

To set up and run Threads locally, follow the steps below:

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (for local development) or a cloud-based MongoDB service
- Clerk account for authentication

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/threads.git
   cd threads
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the following environment variables:
     ```env # Clerk Configuration
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
     CLERK_SECRET_KEY=your-clerk-secret-key
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/onboarding
     NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/sign-in
     MONGODB_URL=your-mongodb-connection-string
     UPLOADTHING_TOKEN=your-uploadthing-token
     ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser to view the app.

---

## Common Issues and Solutions

### JWT Clock Skew Issue Resolution

## **Problem Overview**

When working with JSON Web Tokens (JWT), you may encounter an error caused by **clock skew**. The error occurs when the JWT's `not before` (`nbf`) claim is set to a future time, but your system clock is ahead of that time. This leads to the token being considered invalid until the specified time in the `nbf` claim is reached.

### **Common Error:**

```
JWT cannot be used prior to not before date claim (nbf). Not before date: [future date]; Current date: [current date]
Clerk: Clock skew detected. This usually means that your system clock is inaccurate.
```

## **Root Cause**

The issue arises when the JWT's `nbf` (Not Before) claim specifies a future time, but the system clock is set ahead of that time. As a result, the JWT is not considered valid until the system time matches the `nbf` value, causing errors when accessing protected resources.

## **Solution**

### **Steps to Resolve the Clock Skew Issue**

1. **Sync Your System Clock with an Internet Time Server**

   - **Windows Instructions:**
     1. Right-click on the clock in the bottom-right corner of the screen.
     2. Click on **Adjust date/time**.
     3. Ensure **Set time automatically** and **Set time zone automatically** are both enabled.
     4. Scroll down and click **Sync now** under the "Synchronize your clock" section to sync with an internet time server.

   This action will automatically correct any time discrepancies between your system clock and a trusted time source, preventing future issues with clock skew.

2. **Check Clerk Instance Keys (if applicable)**

   - Ensure you are using the correct **publishable** and **secret keys** from your Clerk dashboard. Mismatched keys can lead to authentication issues and errors, such as infinite redirect loops, which may exacerbate the clock skew problem.

3. **Verify the JWT `nbf` Claim**

   - Ensure that the JWT `nbf` claim aligns with the current system time. If the token is being created too far in the future, adjust the logic accordingly to ensure the `nbf` value reflects the current time.

4. **Test the Fix**
   - Once the system clock is synced and the correct Clerk keys are verified, test your application to ensure the issue is resolved. Generate a new JWT and check that it becomes valid once the system time aligns with the `nbf` claim.

## **Why This Solution Works**

Syncing the system clock ensures that both the JWT `nbf` claim and the system time are consistent, allowing the token to be validated correctly. By synchronizing the clock with an NTP server and verifying the Clerk keys, we eliminate any clock-related errors and avoid issues such as infinite redirect loops or invalid tokens.

## **Conclusion**

By syncing the system clock, verifying the Clerk instance keys, and ensuring that the `nbf` claim is correctly set, you can resolve the JWT clock skew error and ensure your application functions smoothly. Regularly syncing your system time will prevent similar issues in the future.

---

### Debugging and Fixing Image Upload Issues

**Threads App** is a social platform built to foster conversations. While developing the app ([GitHub Repo](https://github.com/ShahadathAlam/Threads)), I encountered a tricky issue where user profile updates behaved inconsistently:

1. Sometimes, the database would update successfully with user details, but the profile photo upload would fail.
2. Other times, the profile photo would upload successfully, but the database would not update.

---

## **The Problem**

The app uses [UploadThing](https://uploadthing.com) for handling image uploads and [Clerk](https://clerk.dev) for authentication and user management. When a user updated their profile with a new photo:

- The image upload process sometimes failed silently.
- The `startUpload` function returned an invalid response.
- As a result, the database was either updated with incomplete data or not updated at all.

---

## **Why the Problem Occurred**

The issue was rooted in the middleware configuration for route protection. Clerk provides a middleware (`clerkMiddleware`) to secure routes and ensure only authenticated users can access them. By default, any route not explicitly marked as **public** is considered **protected**, requiring authentication.

The `/api/uploadthing` route, used by UploadThing for handling file uploads, was not marked as public in the Clerk middleware configuration. This caused Clerk to block unauthenticated access to this endpoint, leading to the following behavior:

- **Blocked Requests**: Clerk denied access to the `/api/uploadthing` endpoint for file uploads since it was treated as a protected route.
- **Silent Failures**: The upload request failed, and no valid image URL was returned to update the user profile.

---

## **How the Problem Occurred**

Here’s the original middleware configuration:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip static files and internals
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

In this configuration, only `/sign-in` and `/sign-up` routes were explicitly marked as public. Since `/api/uploadthing` was missing from the `isPublicRoute` list, Clerk treated it as a protected route and blocked upload requests.

---

## **How the Problem Was Solved**

The solution was to explicitly mark the `/api/uploadthing` route as public in the `isPublicRoute` matcher. This ensured that UploadThing’s endpoint could be accessed without requiring authentication.

Here’s the updated middleware configuration:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/uploadthing(.*)", // Added this line
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

By adding `/api/uploadthing(.*)` to the list of public routes, the UploadThing endpoint was no longer blocked by Clerk, allowing the `startUpload` function to work seamlessly.

---

## **Results**

After making this change:

- **Image uploads worked flawlessly**: The `startUpload` function successfully returned the uploaded image URL.
- **Database updates were accurate**: Both the image URL and user details were correctly updated in the database.
- **No more silent failures**: The process was streamlined and reliable.

---

## **Key Takeaways**

1. **Middleware Configuration Matters**:
   Always ensure that routes required by third-party tools (like UploadThing) are properly configured in your middleware.

2. **Debug Incrementally**:
   Adding logs before and after critical functions (e.g., `startUpload`) can help identify where failures occur.

3. **Understand Your Tools**:
   Knowing how Clerk handles route protection and how UploadThing operates helped pinpoint the problem.

4. **Security is Critical**:
   While marking routes as public solves access issues, always validate the requests on the server side to prevent abuse (e.g., validating file types or user identities).

---

## **Conclusion**

This was a valuable learning experience during the development of **Threads App**. Middleware misconfigurations can introduce subtle bugs, but understanding how tools work together—and taking the time to debug systematically—can save you hours of frustration.

If you’re building an app with Clerk and UploadThing, make sure your upload routes are configured properly in your middleware. Hopefully, this solution can save you time and effort!

---

# Only plain objects can be passed to client components from server components

### Problem Description

When building a full-stack application in Next.js using Server and Client Components, you might encounter the following error:

```
Error:
Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props.
<... userId={{buffer: ...}}>
              ^^^^^^^^^^^^^^^
```

This error typically occurs when the data returned from the backend or database includes complex objects (e.g., MongoDB's `ObjectId`, Buffer objects, or other non-serializable data types). Client components in Next.js expect data to be serializable and plain.

### Example Scenario

Suppose you have the following Server Component that fetches user data:

```tsx
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={userInfo._id} />
    </>
  );
}
```

Here, `userInfo._id` is likely a MongoDB `ObjectId`, which is not serializable. Passing it directly to the `PostThread` Client Component results in the error.

---

### Solution: Serialize Data Before Passing to Client Components

To resolve this issue, you need to convert the non-serializable data (e.g., `ObjectId`) into a plain, serializable format such as a string.

#### Updated Code

```tsx
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Convert non-serializable ObjectId to a string
  const userId = userInfo._id.toString();

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={userId} />
    </>
  );
}
```

#### Key Changes

- Used `.toString()` on `userInfo._id` to ensure it is a plain, serializable string before passing it to the `PostThread` Client Component.

---

### Why This Works

Client Components in Next.js only accept data that can be serialized to JSON (e.g., plain objects, strings, numbers). Using `.toString()` converts the `ObjectId` into a plain string, making it compatible with Client Components.

---

### General Guidelines for Preventing This Issue

1. **Always Serialize Non-Plain Data:**

   - For MongoDB `ObjectId`, use `.toString()`.
   - For other complex types like `Date`, convert to ISO strings using `.toISOString()`.

2. **Sanitize Data in Server Components:**

   - Ensure any data returned from the database or backend is serialized before passing it to a Client Component.

3. **Validate Data Shape:**

   - Use tools like `zod` or `Joi` to validate the shape of the data being passed to components.

4. **Use Utility Functions for Serialization:**

   - Write a helper function to serialize data consistently across the app. For example:

   ```typescript
   export function serializeUser(user: any) {
     return {
       ...user,
       _id: user._id?.toString(),
     };
   }
   ```

   Use it in your Server Component:

   ```tsx
   const userInfo = serializeUser(await fetchUser(user.id));
   ```

---

### Comparison Table

| Component Type       | Data Type Supported             | Example                  | When to Use                                      |
| -------------------- | ------------------------------- | ------------------------ | ------------------------------------------------ |
| **Server Component** | Plain and Non-Serializable Data | `ObjectId`, `Buffer`     | When fetching data from a database or backend.   |
| **Client Component** | Serializable Data Only          | `string`, `number`, `[]` | When rendering UI and interacting with the user. |

---

By following these practices, you can ensure seamless data handling between Server and Client Components in your Next.js application, avoiding serialization-related errors like the one discussed above.

---

Sure! Here's a README structure that explains the problem you're facing, the error message, and the solution with code examples, along with a Table of Contents for easy navigation.

---

# Resolving Data Fetching Error in Next.js Client Components

This document explains a common issue faced when trying to fetch data asynchronously inside React Client Components in Next.js and how to solve it. The issue arises when you attempt to call an asynchronous function (e.g., `fetchPosts`) directly inside a Client Component, which violates the rendering flow of Client Components. The following sections provide an explanation of the problem and offer several solutions.

---

# Resolving Data Fetching Error in NextJs Client Components

## Problem Overview

In Next.js, Client Components are rendered on the client-side. Attempting to call an asynchronous function (such as `fetchPosts`) directly inside a Client Component causes an error because the asynchronous logic should be handled differently depending on where the component is executed (server vs client).

This document explains the error, the cause, and provides several ways to fix the problem.

## Error Message

You may encounter an error like:

```
Error: Cannot call an async function directly in a React Client Component
```

This occurs when you try to call an asynchronous function within a Client Component in Next.js.

---

## Why the Problem Occurs

Next.js Client Components (denoted by `"use client"`) are rendered on the client side, which means they don't have native support for asynchronous data fetching during the render process. When you try to fetch data asynchronously in these components, the rendering process is interrupted, causing the error.

In Next.js, **Server Components** are designed to handle asynchronous operations such as data fetching during rendering. Client Components, on the other hand, are for handling interactivity on the client-side after the initial render.

---

## How the Problem Occurs

The error is generated when you attempt to call an asynchronous function (like `fetchPosts`) directly within a Client Component, such as:

```javascript
// This will throw an error
export default function Home() {
  const posts = fetchPosts(1, 30); // fetchPosts is an async function
  return (
    <div>
      {posts.map((post) => (
        <p>{post.title}</p>
      ))}
    </div>
  );
}
```

In this code, `fetchPosts` is called during the initial render of the component, which is not supported in Client Components.

---

## Solutions

### Option 1: Use a Server Component

The most straightforward solution is to move the data-fetching logic to a **Server Component**, which can handle asynchronous operations during the render process.

**Code Example:**

```javascript
// app/(root)/page.tsx
import { fetchPosts } from "@/lib/actions/thread.actions";

export default async function Home() {
  const result = await fetchPosts(1, 30); // Fetch posts on the server

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <ul>
        {result.posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
```

**Explanation:** Server Components execute on the server and can handle asynchronous data fetching during render. This approach works when your page doesn’t need interactivity on the client side.

---

### Option 2: Use React Query in a Client Component

If your page needs to be interactive or handle dynamic updates, you can use **React Query** in a Client Component to handle asynchronous data fetching.

#### Step 1: Install React Query

```bash
npm install @tanstack/react-query
```

#### Step 2: Set Up React Query Provider

Wrap your application with a `QueryClientProvider` in `app/layout.tsx`:

```javascript
// app/layout.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

#### Step 3: Fetch Data in a Client Component

```javascript
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/actions/thread.actions";

export default function Home() {
  const { data, isLoading, error } = useQuery(["posts", 1, 30], () =>
    fetchPosts(1, 30)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts</p>;

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <ul>
        {data.posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
```

**Explanation:** React Query handles fetching, caching, and updating data on the client side. This approach is ideal for pages requiring dynamic updates or interactivity.

---

### Option 3: Combine Server and Client Components

If you need to combine server-side data fetching with client-side interactivity, you can split your component into a **Server Component** for data fetching and a **Client Component** for rendering the data.

#### Step 1: Fetch Data in a Server Component

```javascript
// app/(root)/page.tsx
import PostList from "@/components/PostList";
import { fetchPosts } from "@/lib/actions/thread.actions";

export default async function Home() {
  const result = await fetchPosts(1, 30);

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <PostList posts={result.posts} />
    </>
  );
}
```

#### Step 2: Pass Data to a Client Component

```javascript
// components/PostList.tsx
"use client";

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

**Explanation:** The data is fetched on the server side and passed as props to a Client Component for rendering, combining both server-side and client-side functionality.

---

## Choosing the Right Option

- **Option 1 (Server Component):** Best for static/dynamic pages where interactivity isn’t required.
- **Option 2 (React Query in Client Component):** Best for highly interactive pages or where data updates frequently and requires client-side handling.
- **Option 3 (Combine Server and Client Components):** Best for hybrid pages where server-side data fetching and client-side interactivity are both needed.

# Fixing `params.id` Error in Next.js Dynamic Routes

## ❌ Error Description

When trying to access a dynamic route `/thread/[id]` in a **Next.js App Router (app directory)**, the following error occurred:

```
Error: Route "/thread/[id]" used `params.id`. `params` should be awaited before using its properties.
```

## ⚠️ How the Error Occurred

The issue arose in a **Server Component** when trying to access `params.id` inside the page function:

### ❌ **Incorrect Code (Before Fix)**

```tsx
export default async function Page({ params }: { params: { id: string } }) {
  if (!params.id) return null;
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);
  return <ThreadCard id={thread._id} content={thread.text} />;
}
```

## 🧐 Why the Error Occurred

- In **Server Components**, `params` is **asynchronously resolved** and is treated as a `Promise`.
- Directly accessing `params.id` without awaiting `params` resulted in an **undefined or missing property error**.
- Next.js expected `params` to be awaited before using its properties.

## ✅ How the Error Was Solved

To fix this, we **explicitly awaited `params`** before extracting `id`.

### ✅ **Corrected Code (After Fix)**

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await params before using
  if (!id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(id);
  return (
    <section className="relative">
      <ThreadCard
        key={thread._id}
        id={thread._id}
        currentUserId={user?.id || ""}
        parentId={thread.parentId}
        content={thread.text}
        author={thread.author}
        community={thread.community}
        createdAt={thread.createdAt}
        comments={thread.children}
      />
    </section>
  );
}
```

## 🛠 Alternative Solutions

1. **Force Dynamic Rendering**

   - If `params.id` is only available at runtime, add:

   ```tsx
   export const dynamic = "force-dynamic";
   ```

   - This ensures the page fetches data dynamically instead of statically.

2. **Check if `params` is Undefined**
   - Add debugging logs to confirm `params` is being passed correctly:
   ```tsx
   console.log("Params received:", params);
   ```

## 🎯 Conclusion

The error was caused by treating `params` as a synchronous object in a **Server Component**, while it is actually a `Promise`. The solution was to **await `params` before accessing its properties**. This fix ensures smooth dynamic routing in **Next.js App Router**.

# Handling MongoDB ObjectId in Next.js

When working with **MongoDB ObjectId** in a **Next.js full-stack application**, you might encounter cases where ObjectId needs to be passed between the frontend and backend. This is where `JSON.stringify` and `JSON.parse` come into play.

This guide explains:

- Why `JSON.stringify` is used when passing **MongoDB ObjectId** as a prop.
- Why `JSON.parse` is used to restore the ObjectId before using it in database operations.
- A **better approach** to handle ObjectId properly in MongoDB without relying on JSON conversions.

---

## 🛠 Why Use `JSON.stringify`?

### ✅ Problem: ObjectId Cannot Be Directly Passed as a Prop

In a Next.js application, you may have a scenario where you pass `userInfo._id` (a MongoDB ObjectId) as a prop:

```tsx
<Comment
  threadId={thread.id}
  currentUserImg={user.imageUrl}
  currentUserId={JSON.stringify(userInfo._id)}
/>
```

### 🔹 Reason for `JSON.stringify(userInfo._id)`:

- **MongoDB ObjectId is a special object**, not a simple string.
- React props can only accept **strings, numbers, booleans, or serializable objects**.
- `JSON.stringify` **converts ObjectId into a JSON string**, making it **safe** to pass as a prop.

#### Example:

If `userInfo._id` is:

```js
new ObjectId("65b0c6a6e1d2a3f78a9b23c4");
```

After `JSON.stringify(userInfo._id)`, it becomes:

```json
"65b0c6a6e1d2a3f78a9b23c4"
```

This is a **plain string** that React can handle without errors.

---

## 🛠 Why Use `JSON.parse`?

### ✅ Problem: Stringified ObjectId Cannot Be Used in MongoDB Queries

In the `Comment` component, the `currentUserId` is received as a **JSON string**. Before using it in database queries, we need to **convert it back to an ObjectId**.

```tsx
await addCommentToThread(
  threadId,
  values.thread,
  JSON.parse(currentUserId),
  pathname
);
```

### 🔹 Reason for `JSON.parse(currentUserId)`:

- When `currentUserId` was **stringified**, it became a **plain string**.
- MongoDB **requires** ObjectId format for queries.
- `JSON.parse` **restores** the original structure of the ObjectId **before using it** in database operations.

#### Example:

String received in `addCommentToThread`:

```json
"65b0c6a6e1d2a3f78a9b23c4"
```

After `JSON.parse(currentUserId)`, it remains a string, **not an ObjectId**. This can cause MongoDB queries to fail.

---

## 🚀 Best Practice: Convert String to ObjectId Before Database Operations

Instead of relying on `JSON.parse`, the **best approach** is to explicitly convert `userId` to an ObjectId in the backend.

### ✅ Corrected `addCommentToThread` Function:

```ts
import mongoose from "mongoose";

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string, // Expecting a string
  path: string
) {
  connectToDB();
  try {
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // ✅ Convert userId string to ObjectId before saving
    const objectIdUser = new mongoose.Types.ObjectId(userId);

    const commentThread = new Thread({
      text: commentText,
      author: objectIdUser, // Now correctly formatted as ObjectId
      parentId: threadId,
    });

    const savedCommentThread = await commentThread.save();
    originalThread.children.push(savedCommentThread._id);
    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to add comment to thread: ${error.message}`);
  }
}
```

---

## 📌 Summary

| Step                           | Purpose                                                                                |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| `JSON.stringify(userInfo._id)` | Converts ObjectId to a **string** to pass as a prop in React.                          |
| `JSON.parse(currentUserId)`    | Converts the **stringified ObjectId** back before usage.                               |
| **Better Approach**            | Convert `userId` **directly** to `new mongoose.Types.ObjectId(userId)` in the backend. |

### ✅ Key Takeaways

- `JSON.stringify` is needed to safely pass **ObjectId as a prop**.
- `JSON.parse` is used to **restore data integrity** before processing.
- **Best practice**: Convert string **explicitly to ObjectId** in the backend.

🚀 **This approach prevents errors and ensures smooth MongoDB operations in Next.js applications!** 🎯

---

### 🔗 **Want to Learn More?**

- [MongoDB ObjectId Documentation](https://www.mongodb.com/docs/manual/reference/method/ObjectId/)
- [React Props Best Practices](https://react.dev/learn/passing-props-to-a-component)
- [Next.js Data Fetching](https://nextjs.org/docs/data-fetching)

🔹 **Now you're equipped to handle ObjectId correctly in Next.js!** 🚀

# Fixing Full-Page Image Stretch in Next.js

When using the `<Image>` component with the `fill` prop in Next.js, images may unexpectedly stretch to fill the entire page if their parent container lacks defined dimensions.

---

## ❗ Problem

```tsx
<Image
  src={imgUrl}
  alt="Profile Image"
  fill
  className="rounded-full object-cover"
/>
```

Without a properly sized parent, the image fills the full page.

---

## ✅ Solution

Wrap the image in a container with set dimensions and `relative` positioning:

```tsx
<div className="relative h-20 w-20">
  <Image
    src={imgUrl}
    alt="Profile Image"
    fill
    className="rounded-full object-cover"
  />
</div>
```

---

## 🧠 Why It Works

- `relative`: Makes the container the reference for `fill`
- `h-20 w-20`: Defines the size
- `object-cover`: Maintains aspect ratio, crops excess

---

## 💡 Summary

To prevent stretching:

1. Add a `relative` container with size
2. Use `fill` inside it
3. Apply `object-cover` for proper scaling

This ensures your image renders cleanly without distortion.

# Fixing userid being undefined in a clerk sidebar component

While building a **Left Sidebar** navigation component in a Next.js 15 app with **Clerk authentication**, I ran into an issue:  
The `userId` from Clerk’s `useAuth()` hook was coming back as `undefined`.

---

### 💡 The Problem

I wanted to dynamically update the `/profile` route for the authenticated user like this:

```tsx
if (link.route === "/profile") {
  link.route = `${link.route}/${userId}`;
}
```

But every time I rendered the component, `userId` was `undefined`, resulting in broken routes like `/profile/undefined`.

---

### 🧠 Why It Happened

Clerk loads authentication data **asynchronously**. When the component mounts, the `useAuth()` hook may **not immediately provide the `userId`**, because Clerk hasn’t finished fetching the user session yet.

So if you try to use `userId` right away, you’re accessing it **before Clerk is ready**, which causes the `undefined` issue.

---

### 🔍 Diagnosis

I logged the `userId` like this:

```tsx
console.log(userId); // undefined on first render
```

That confirmed that Clerk hadn't finished loading the session when the component tried to access it.

---

### ✅ The Solution

Clerk’s `useAuth()` hook gives you a helpful flag called `isLoaded`, which tells you when the authentication context is fully loaded.

**Steps to fix:**

1. Destructure `isLoaded` from `useAuth()`.
2. Delay rendering the component or logic that depends on `userId` until `isLoaded` is `true`.

---

### 🧩 Final Fix (Code Snippet)

```tsx
import { useAuth } from "@clerk/nextjs";

const { userId, isLoaded } = useAuth();

if (!isLoaded) {
  return <div>Loading...</div>; // or return null/spinner
}

// Safe to use userId now
if (link.route === "/profile" && userId) {
  link.route = `${link.route}/${userId}`;
}
```

---

### 🎉 Final Thoughts

This issue is easy to overlook when using Clerk in a client-side context. The fix is simple but essential —  
**always check `isLoaded` before accessing values like `userId`, `sessionId`, etc.**

By doing so, you ensure a more stable and secure app experience for users.

Perfect, Shahadath! Here's a clean and professional section you can add to your **README.md** to showcase how you debugged and solved the `$or` TypeScript issue. This not only demonstrates your **problem-solving skills** but also your ability to write clean, type-safe code in real-world scenarios.

---

# Developer Note: Solving a TypeScript and MongoDB Error

While building the `fetchUsers` function to support user search and filtering, I encountered the following TypeScript error:

```
Property '$or' does not exist on type '{ id: { $ne: string; }; }'.
```

### 🔍 What caused this?

When declaring a basic query object like:

```ts
const query = { id: { $ne: userId } };
```

TypeScript infers the type strictly based on this initial structure. So when trying to dynamically add a MongoDB operator like `$or`, TypeScript throws an error — because `$or` wasn’t part of the inferred type.

### ✅ The Solution: Use `FilterQuery<typeof User>`

To fix this and make the query type-safe and flexible, I used the `FilterQuery` utility provided by Mongoose:

```ts
import { FilterQuery } from "mongoose";

const query: FilterQuery<typeof User> = {
  id: { $ne: userId },
};

if (searchString.trim() !== "") {
  const regex = new RegExp(searchString, "i");

  query.$or = [{ username: { $regex: regex } }, { name: { $regex: regex } }];
}
```

### 💡 Why this works

- `FilterQuery<typeof User>` allows use of MongoDB query operators like `$ne`, `$or`, and `$regex` without type errors.
- It ensures full **type safety** with the `User` model while building dynamic queries.
- It’s scalable, clean, and aligns perfectly with TypeScript best practices.

---

📌 **Takeaway**:  
When working with dynamic MongoDB queries in TypeScript, always use `FilterQuery<ModelType>` to avoid shape-related errors and keep your code robust.

---

# Deployment

For deployment, you can use platforms like Vercel, Netlify, or your preferred hosting provider.

1. **Build the App**:

   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel.
   - Vercel will automatically build and deploy your app.

---

## Contributing

We welcome contributions! To contribute to the Threads app:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Clerk](https://clerk.dev) for authentication.
- [UploadThing](https://uploadthing.com) for handling file uploads.
- [Radix UI](https://radix-ui.com) for accessible UI components.
- [Tailwind CSS](https://tailwindcss.com) for styling.
- [Zod](https://zod.dev) for validation.

---

## Support

If you have any questions or need assistance, feel free to reach out!

- Email: [shahadathalam@ymail.com](mailto:shahadathalam@ymail.com)
- GitHub: [ShahadathAlam](https://github.com/ShahadathAlam)
- LinkedIn: [mdshahadathalam](https://www.linkedin.com/in/mdshahadathalam/)
