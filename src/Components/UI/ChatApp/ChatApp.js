import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import './ChatApp.css';

// Sử dụng bootstrap 5 tạo giao diện
const ChatApp = () => {
  return (
    <div>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <FontAwesomeIcon icon={faClose} className="close" />
        <FontAwesomeIcon icon={faFacebookMessenger} className="comment" />
      </label>
      <div className="chat-app-wrapper">
        <ChatHeader />
        <ChatBody />
        <ChatFooter />
      </div>
    </div>
  );
};

export default ChatApp;
