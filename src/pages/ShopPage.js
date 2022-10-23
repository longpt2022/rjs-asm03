import { useEffect } from 'react';

const ShopPage = () => {
  useEffect(() => {
    // tự đọng scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);

  return <h1>ShopPage</h1>;
};

export default ShopPage;
