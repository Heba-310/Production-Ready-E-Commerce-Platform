import { forwardRef } from "react";

const Cart = forwardRef(function Cart(
  { items, open, setOpen, onRemove, onCheckout },
  ref,
) {
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <button ref={ref} className="cart-fab" onClick={() => setOpen(true)}>
        🛒
        <span className="cart-count">{count}</span>
      </button>

      {open && <div className="cart-overlay" onClick={() => setOpen(false)} />}

      <aside className={`cart-sidebar ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h4>🍽️ Your Order</h4>
          <button className="cart-close" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty 😋</p>
          ) : (
            items.map((it) => (
              <div className="cart-item" key={it.id}>
                <img src={it.image} alt={it.name} />
                <div className="cart-info">
                  <strong>{it.name}</strong>
                  <span>
                    {it.price} × {it.qty}
                  </span>
                </div>
                <button
                  className="cart-del"
                  onClick={() => onRemove(it.id)}
                  aria-label="remove"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <strong>{total}</strong>
            </div>
            <button className="cart-checkout" onClick={onCheckout}>
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
});

export default Cart;