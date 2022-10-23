import classes from './Service.module.css';

const Service = () => {
  return (
    <div className={`${classes.service} row bg-light p-5`}>
      <div className="col-lg-4 col-6 mb-4 mb-lg-0">
        <h4>FREE SHIPPING</h4>
        <span className="text-secondary">Free shipping worldwide</span>
      </div>

      <div className="col-lg-4 col-6">
        <h4>24 X 7 SERVICE</h4>
        <span className="text-secondary">Free shipping worldwide</span>
      </div>

      <div className="col-lg-4 col-6 col-sm-12">
        <h4>FESTIVAL OFFER</h4>
        <span className="text-secondary">Free shipping worldwide</span>
      </div>
    </div>
  );
};

export default Service;
