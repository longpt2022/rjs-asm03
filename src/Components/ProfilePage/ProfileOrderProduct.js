// import classes from './ProfileOrderProduct.module.css';

const ProfileOrderProduct = props => {
  return (
    <>
      {props.products.map(product => {
        return (
          <div key={Math.random()} className="row gx-0">
            <p className="col-6 mb-0">- {product.name}</p>
            <p className="col-4 mb-1 text-secondary">
              {props.transformPrice(product.price)} VND
            </p>
            <p className="col-2">{product.quantity}</p>
          </div>
        );
      })}
    </>
  );
};

export default ProfileOrderProduct;
