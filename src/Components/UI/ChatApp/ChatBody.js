import userIcon from 'img/chat-user.png';
import classes from './ChatBody.module.css';

const ChatBody = props => {
  return (
    <div
      className={`${classes.chatBody} card-body overflow-auto`}
      data-mdb-perfect-scrollbar="true"
    >
      {/* <div
        className={`${classes.divider} divider d-flex align-items-center mb-4`}
      >
        <p className="text-center mx-3 mb-0" style={{ color: '#a2aab7' }}>
          Today
        </p>
      </div> */}

      <div className="d-flex flex-row justify-content-end mb-4 pt-1">
        <div className={classes.customerMess}>
          <p className="small p-2 me-3 mb-1 text-white text-end rounded-1">
            Xin chào
          </p>
          <p className="small p-2 me-3 mb-1 text-white rounded-1">
            Làm thế nào để xem các sản phẩm
          </p>
        </div>
      </div>

      <div className="d-flex flex-row justify-content-start mb-4">
        <img src={userIcon} alt="avatar 1" className="avatarImg" />
        <div className={classes.adminMess}>
          <p
            className="small p-2 ms-3 mb-1 rounded-1 text-muted"
            style={{ backgroundColor: '#f5f6f7' }}
          >
            ADMIN: Chào bạn
          </p>
          <p
            className="small p-2 ms-3 mb-1 rounded-1 text-muted"
            style={{ backgroundColor: '#f5f6f7' }}
          >
            ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
