import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";

/**
 * CometChat Constants - Replace with your actual credentials
 */
const COMETCHAT_CONSTANTS = {
  APP_ID: "167210374427c7e7e", // Replace with your actual App ID from CometChat
  REGION: "in", // Replace with your App's Region
  AUTH_KEY: "98f0a4419d7d210e879251395a1142adcef79e6c", // Replace with your Auth Key (leave blank if using Auth Token)
};

/**
 * Configure the CometChat UI Kit using the UIKitSettingsBuilder.
 * This setup determines how the chat UI behaves.
 */
const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(COMETCHAT_CONSTANTS.APP_ID) // Assign the App ID
  .setRegion(COMETCHAT_CONSTANTS.REGION) // Assign the App's Region
  .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY) // Assign the Authentication Key (if applicable)
  .subscribePresenceForAllUsers() // Enable real-time presence updates for all users
  .build(); // Build the final configuration

/**
 * Initialize the CometChat UI Kit with the configured settings.
 * Once initialized successfully, you can proceed with user authentication and chat features.
 */
CometChatUIKit.init(UIKitSettings)!
  .then(() => {
    console.log("CometChat UI Kit initialized successfully.");
    // You can now call login function to authenticate users

    const UID = "cometchat-uid-4"; // Replace with your actual UID

    CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
      if (!user) {
        // If no user is logged in, proceed with login
        CometChatUIKit.login(UID)
          .then((user: CometChat.User) => {
            console.log("Login Successful:", { user });
            // Mount your app

            createRoot(document.getElementById("root")!).render(
              <StrictMode>
                <App />
              </StrictMode>
            );
          })
          .catch(console.log);
      } else {
        // If user is already logged in, mount your app

        createRoot(document.getElementById("root")!).render(
          <StrictMode>
            <App />
          </StrictMode>
        );
      }
    });
  })
  .catch((error) => {
    console.error("CometChat UI Kit initialization failed:", error); // Log errors if initialization fails
  });
