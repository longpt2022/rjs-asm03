import classes from './ChatHeader.module.css';

const ChatHeader = props => {
  return (
    <div className={`${classes.chatHeader} card-header p-3 no-copy-text`}>
      <h6 className="mb-0">Customer Support</h6>
      <button type="button" className="btn btn-sm active-animation">
        Let's Chat App
      </button>
    </div>
  );
};

export default ChatHeader;
