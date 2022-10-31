import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import './ChatApp.css';
import classes from './ChatApp.module.css';

// Sử dụng bootstrap 5 tạo giao diện
const ChatApp = () => {
  return (
    <div className={classes.chatApp}>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <FontAwesomeIcon icon={faClose} className="close" />
        <FontAwesomeIcon icon={faFacebookMessenger} className="comment" />
      </label>
      <div className="chat-app-wrapper">
        <div id="chat2">
          <ChatHeader />
          <ChatBody />
          <ChatFooter />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
