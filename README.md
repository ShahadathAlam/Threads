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
