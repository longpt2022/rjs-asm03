import { useEffect, useState } from 'react';

import classes from './DetailProductImages.module.css';

const DetailProductImages = props => {
  const [urlMainImg, setUrlMainImg] = useState('');

  useEffect(() => {
    setUrlMainImg(props.img1);
  }, [props.img1]);

  // Khi click set lại url cho main img từ subImg
  const clickSubImgHandler = event => {
    event.preventDefault();
    // console.log(event.target.src);

    setUrlMainImg(event.target.src);
  };

  // hàm tạo subImg
  const subImgJsx = src => {
    if (src) {
      return (
        <img
          src={src}
          alt={props.category}
          className="col-12 main-animation"
          onClick={clickSubImgHandler}
        />
      );
    }
  };
  return (
    <div className={classes.detailProductImages}>
      <div className={`${classes.subImg} row g-2 me-1`}>
        {subImgJsx(props.img1)}
        {subImgJsx(props.img2)}
        {subImgJsx(props.img3)}
        {subImgJsx(props.img4)}
      </div>
      <img src={urlMainImg} alt={props.category} className={classes.mainImg} />
    </div>
  );
};

export default DetailProductImages;
