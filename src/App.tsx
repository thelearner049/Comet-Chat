import { useState } from "react";
import { useEffect } from "react";
import {
  CometChatMessageComposer,
  CometChatMessageHeader,
  CometChatMessageList,
} from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatSelector } from "./CometChatSelector/CometChatSelector";
import "./App.css";
import "@cometchat/chat-uikit-react/css-variables.css";

function App() {
  const [selectedUser, setSelectedUser] = useState<CometChat.User | undefined>(
    undefined
  );
  const [selectedGroup, setSelectedGroup] = useState<
    CometChat.Group | undefined
  >(undefined);
  const [selectedCall, setSelectedCall] = useState<CometChat.Call | undefined>(
    undefined
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--cometchat-font-family",
      "'Times New Roman'"
    );
  }, []);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");

    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  return (
    <div className="cometchat-root" data-theme={theme}>
      <div className="conversations-with-messages ">
        <div className="conversations-wrapper">
          <CometChatSelector
            onSelectorItemClicked={(activeItem) => {
              let item = activeItem;
              if (activeItem instanceof CometChat.Conversation) {
                item = activeItem.getConversationWith();
              }
              if (item instanceof CometChat.User) {
                setSelectedUser(item as CometChat.User);
                setSelectedCall(undefined);
                setSelectedGroup(undefined);
              } else if (item instanceof CometChat.Group) {
                setSelectedUser(undefined);
                setSelectedGroup(item as CometChat.Group);
                setSelectedCall(undefined);
              } else if (item instanceof CometChat.Call) {
                //custom logic to open call details
                setSelectedUser(undefined);
                setSelectedGroup(undefined);
                setSelectedCall(item as CometChat.Call);
              }
            }}
          />
        </div>
        {selectedUser || selectedGroup || selectedCall ? (
          <div className="messages-wrapper">
            <CometChatMessageHeader user={selectedUser} group={selectedGroup} />
            <CometChatMessageList user={selectedUser} group={selectedGroup} />
            <CometChatMessageComposer
              user={selectedUser}
              group={selectedGroup}
            />
          </div>
        ) : (
          <div className="empty-conversation">Select Conversation to start</div>
        )}
      </div>
    </div>
  );
}

export default App;
