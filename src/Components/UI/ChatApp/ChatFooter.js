import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperclip,
  faPaperPlane,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';

import userIcon from 'img/chat-user.png';
import classes from './ChatFooter.module.css';

const ChatFooter = props => {
  return (
    <div className={`${classes.chatFooter} p-3`}>
      <img src={userIcon} alt="avatar 3" className="avatarImg mx-2" />
      <input
        type="text"
        className={`${classes['form-control']} form-control`}
        id="exampleFormControlInput1"
        placeholder="Enter Message!"
      />
      <a className="ms-3" href="#!">
        <FontAwesomeIcon icon={faPaperclip} />
      </a>
      <a className="ms-3" href="#!">
        <FontAwesomeIcon icon={faSmile} />
      </a>
      <a className="ms-3" href="#!">
        <FontAwesomeIcon icon={faPaperPlane} className={classes.iconSend} />
      </a>
    </div>
  );
};

export default ChatFooter;
