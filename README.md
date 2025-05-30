# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## Project Development - Completed Steps

Here's a summary of the development steps completed so far:

1.  **Project Setup and Navigation:**
    *   Initialized the Expo project.
    *   Configured basic navigation using Expo Router (`app/_layout.tsx`).
    *   Set up a Tab Navigator (`app/mainView/_layout.tsx`) for the main sections: Home, Search, Events (hidden tab), Tickets, Profile.

2.  **Authentication Integration:**
    *   Integrated Firebase Authentication (Email/Password).
    *   Created Sign-Up (`app/auth/signUp.tsx`) and Sign-In (`app/auth/signIn.tsx`) pages.
    *   Implemented basic authentication logic (creating users, signing in).
    *   Added navigation logic to redirect users based on authentication state (`app/_layout.tsx`).

3.  **Firestore Database Setup and User Roles:**
    *   Connected the application to Firebase Firestore.
    *   Implemented logic to create a user document in the `users` collection upon sign-up, storing `uid`, `email`, `name`, and an initial `role` of `'user'`.
    *   Discussed the structure of user documents in Firestore.

4.  **Creator Account Request Process:**
    *   Modified the Profile page (`app/mainView/profil.tsx`) to include a button related to event creation/creator status.
    *   Implemented conditional logic on the Profile page to check the user's role from Firestore.
    *   Created a dedicated form page (`app/mainView/events/request-creator-form.tsx`) for users requesting creator status, including fields for "Who are you?", "Past events?", "Social media links", and "Phone number".
    *   Configured the "Create Event" button on the Profile page to navigate users to either the Creator Request Form (if role is 'user') or the Create Event page (if role is 'creator').
    *   Implemented the logic to save creator requests to a new `creatorRequests` collection in Firestore.
    *   Discussed the manual process of reviewing and approving creator requests via the Firebase console (by updating the user's role in the `users` collection).
    *   Improved the Profile page's appearance by displaying the user's name and email, and adding a placeholder for a round profile picture (using a local default image if no URL is found in Firestore). Addressed related TypeScript errors and the requirement for a local default image file.