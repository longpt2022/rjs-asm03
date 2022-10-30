import MainHeader from './MainHeader';
import Footer from './Footer';
import ChatApp from 'Components/UI/ChatApp/ChatApp';
import classes from './Layout.module.css';

const Layout = props => {
  return (
    <>
      <MainHeader />
      <main className={`${classes.main} container`}>{props.children}</main>
      <Footer />
      <ChatApp />
    </>
  );
};

export default Layout;
