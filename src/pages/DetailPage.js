import { useEffect } from 'react';

import DetailProduct from 'Components/DetailPage/DetailProduct';

const DetailPage = () => {
  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, []);

  return <DetailProduct />;
};

export default DetailPage;
