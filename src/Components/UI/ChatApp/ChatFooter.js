import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { chatAppActions } from 'store/chatApp';
import {
  faPaperclip,
  faPaperPlane,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';

import userIcon from 'img/chat-user.png';
import classes from './ChatFooter.module.css';

const ChatFooter = () => {
  const dispatch = useDispatch();

  // lấy value của input
  const messInputRef = useRef();
  const [enteredMess, setEnteredMess] = useState('');

  // Xử lý submit
  const submitHandler = event => {
    event.preventDefault();

    const enteredMess = messInputRef.current.value;

    if (enteredMess === '') return;

    // Xóa trường cũ
    setEnteredMess('');

    // Thêm mess customer input vào state redux
    dispatch(
      chatAppActions.ADD_CUSTOMER_MESS({ mess: enteredMess, user: 'customer' })
    );

    // tin nhắn admin tự động trả lời sau 1.5s
    setTimeout(() => {
      dispatch(
        chatAppActions.ADD_ADMIN_MESS({
          mess: 'ADMIN: Cảm ơn bạn đã nhắn tin. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!',
          user: 'admin',
        })
      );
    }, 1500);
  };

  const messChangeHandler = event => {
    setEnteredMess(event.target.value);
  };

  return (
    <form className={`${classes.chatFooter} p-3`} onSubmit={submitHandler}>
      <img src={userIcon} alt="avatar 3" className="avatarImg mx-2" />
      <input
        type="text"
        className={`${classes['form-control']} form-control`}
        id="exampleFormControlInput1"
        placeholder="Enter Message!"
        ref={messInputRef}
        value={enteredMess}
        onChange={messChangeHandler}
      />
      <a className="ms-3" href="#!">
        <FontAwesomeIcon icon={faPaperclip} />
      </a>
      <a className="ms-3" href="#!">
        <FontAwesomeIcon icon={faSmile} />
      </a>
      <button className="ms-3">
        <FontAwesomeIcon icon={faPaperPlane} className={classes.iconSend} />
      </button>
    </form>
  );
};

export default ChatFooter;
