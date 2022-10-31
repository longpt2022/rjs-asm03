import userIcon from 'img/chat-user.png';
import { useSelector } from 'react-redux';
import classes from './ChatBody.module.css';

const ChatBody = () => {
  const fakeDataMess = useSelector(state => state.chatApp.dataMess);
  // console.log(fakeDataMess);

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

      <div className="d-flex flex-row justify-content-end mb-2">
        <div className={classes.customerMess}>
          <p className="small p-2 me-3 mb-2 text-white rounded-1">Xin chào</p>
          <p className="small p-2 me-3 mb-2 text-white rounded-1">
            Làm thế nào để xem các sản phẩm
          </p>
          {/* <span class="small ms-3 mb-3 pe-3 rounded-3 text-muted">23:58</span> */}
        </div>
      </div>

      <div className="d-flex flex-row justify-content-start mb-2">
        <img src={userIcon} alt="avatar 1" className="avatarImg" />
        <div className={classes.adminMess}>
          <p
            className="small p-2 ms-3 mb-2 rounded-1 text-muted"
            style={{ backgroundColor: '#f5f6f7' }}
          >
            ADMIN: Chào bạn
          </p>
          <p
            className="small p-2 ms-3 mb-2 rounded-1 text-muted"
            style={{ backgroundColor: '#f5f6f7' }}
          >
            ADMIN: Bạn có thể vào mục Shop để xem các sản phẩm
          </p>
        </div>
      </div>

      {fakeDataMess.map(messData => {
        return (
          <div key={Math.random()}>
            {messData.user === 'customer' && (
              <div className="d-flex flex-row justify-content-end mb-2">
                <div className={classes.customerMess}>
                  <p className="small p-2 me-3 mb-2 text-white rounded-1">
                    {messData.mess}
                  </p>
                </div>
              </div>
            )}
            {messData.user === 'admin' && (
              <div className="d-flex flex-row justify-content-start mb-2">
                <img src={userIcon} alt="avatar 1" className="avatarImg" />
                <div className={classes.adminMess}>
                  <p
                    className="small p-2 ms-3 mb-2 rounded-1 text-muted"
                    style={{ backgroundColor: '#f5f6f7' }}
                  >
                    {messData.mess}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatBody;
