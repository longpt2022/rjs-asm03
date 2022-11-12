import MainHeader from './MainHeader';
import Footer from './Footer';
import ChatApp from 'Components/UI/ChatApp/ChatApp';
import classes from './Layout.module.css';

// import react-toastify để tạo thông báo
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = props => {
  return (
    <>
      <MainHeader />
      <main className={`${classes.main} container`}>{props.children}</main>
      <Footer />
      <ChatApp />
      <ToastContainer />
    </>
  );
};

export default Layout;
