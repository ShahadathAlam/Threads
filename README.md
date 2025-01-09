This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# **JWT Clock Skew Issue Resolution**

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
