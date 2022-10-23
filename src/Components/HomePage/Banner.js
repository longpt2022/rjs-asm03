import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../UI/Button/Button';
import banner from '../../img/banner1.jpg';
import classes from './Banner.module.css';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className={classes.banner}>
      <img src={banner} alt="img" />
      <div className={classes.content}>
        <span>NEW INSPIRATION 2022</span>
        <h2>20% OFF ON NEW SEASON</h2>
        <Button onClick={() => navigate('/shop')}>Browse collections</Button>
      </div>
    </section>
  );
};

export default Banner;
