import { useSelector } from 'react-redux';

const CartList = () => {
  // Lấy state redux
  const listCart = useSelector(state => state.cart.listCart);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  // Biến xác định có cart nào k
  const hasCart = listCart.length > 0;

  // Hàm cộng tổng tất cả quantity có trong listCart
  const numberOfCartItems = listCart.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  return (
    <section className="pb-5">
      <div className="d-flex justify-content-between bg-light p-5 mb-4">
        <h4 className="p-4">CART</h4>
        <span className="p-4 text-secondary">CART</span>
      </div>
      <div>
        <div>
          {listCart.map(cart => {
            return (
              <div key={cart._id.$oid}>
                <b>{cart.quantity}</b>
                <span>{cart.name}</span>
                <p>{cart.price}</p>
              </div>
            );
          })}
        </div>
        <p>Total products: {numberOfCartItems}</p>
        <p>{totalQuantity}</p>
        {hasCart && <button>Order</button>}
      </div>
    </section>
  );
};

export default CartList;
