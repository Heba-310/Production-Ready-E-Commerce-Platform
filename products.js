import { useEffect, useRef, useState } from "react";
import Cards from './cards'
import Cart from "./Cart";
//hoisting https://hebagen-z.netlify.app/
function Products() {
  const [prod, setpro] = useState([]);
  const [filter, setfilter] = useState(null);
  const [filterc, setfilterc] = useState(null);
  const [search, setsearch] = useState(null);
  const [searcha, setsearcha] = useState(null);
  const [searchi, setsearchi] = useState(null);
  const [sorty, setsort] = useState(null);

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3002/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setpro(data);
      });
  }, []);

  const addToCart = (product, wrap) => {
    const src = wrap.querySelector("img") || wrap;
    const from = src.getBoundingClientRect();
    const to = cartRef.current.getBoundingClientRect();

    const fly = src.cloneNode(true);
    Object.assign(fly.style, {
      position: "fixed",
      left: from.left + "px",
      top: from.top + "px",
      width: from.width + "px",
      height: from.height + "px",
      margin: 0,
      zIndex: 3000,
      pointerEvents: "none",
      borderRadius: "16px",
      objectFit: "cover",
    });
    document.body.appendChild(fly);

    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    const anim = fly.animate(
      [
        { transform: "translate(0,0) scale(1) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 120}px) scale(.5) rotate(180deg)`,
          opacity: 0.9,
          offset: 0.5,
        },
        {
          transform: `translate(${dx}px, ${dy}px) scale(.05) rotate(360deg)`,
          opacity: 0.3,
        },
      ],
      { duration: 800, easing: "ease-in-out" },
    );

    anim.onfinish = () => {
      fly.remove();
      setCart((c) => {
        const found = c.find((i) => i.id === product.id);
        return found
          ? c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
          : [...c, { ...product, qty: 1 }];
      });
      cartRef.current.animate(
        [
          { transform: "scale(1)" },
          { transform: "scale(1.35) rotate(-10deg)" },
          { transform: "scale(1)" },
        ],
        { duration: 350 },
      );
    };
  };

  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));

  const checkout = () => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    alert(`Order placed! Total: ${total}`);
    setCart([]);
    setCartOpen(false);
  };

  const funFilter = (price) => {
    setfilter(prod.filter((pr) => pr.price < price));
  };
  const cat = (cat) => {
    setfilterc(prod.filter((pr) => pr.category == cat));
    setfilter(null);
  };
  const se = (tar) => {
    setsearch(
      prod.filter((pr) => pr.name.toLowerCase().includes(tar.toLowerCase())),
    );
    setfilter(null);
    setfilterc(null);
  };
  const sa = (tar) => {
    setsearcha(
      prod.filter((pr) =>
        pr.category.toLowerCase().includes(tar.toLowerCase()),
      ),
    );
    setfilter(null);
    setfilterc(null);
    setsearch(null);
  };
  const si = (tar) => {
    setsearchi(prod.filter((pr) => pr.id == tar));
    setfilter(null);
    setfilterc(null);
    setsearch(null);
    setsearcha(null);
  };
  const so = () => {
    setsort([...prod].sort((a, b) => a.price - b.price));

    setfilter(null);
    setfilterc(null);
    setsearch(null);
    setsearcha(null);
    setsearchi(null);
  };
  return (
    <div className="container my-5  wow animate__animated animate__fadeIn">
      <Cart
        ref={cartRef}
        items={cart}
        open={cartOpen}
        setOpen={setCartOpen}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />
      <div className="row mb-3">
        <div className="col-lg-3">
          <button
            className="buttons"
            onClick={() => {
              setfilter(null);
              setfilterc(null);
              setsearch(null);
              setsearcha(null);
              setsearchi(null);
              setsort(null);
              console.log(prod.length);
            }}
          >
            ALL Products
          </button>
        </div>
        <div className="col-lg-3">
          <button
            className="buttons"
            data-price="100"
            onClick={(e) => funFilter(Number(e.target.dataset.price))}
          >
            Products less than 100
          </button>
        </div>
        <div className="col-lg-3">
          <button
            className="buttons"
            data-price="200"
            onClick={(e) => funFilter(Number(e.target.dataset.price))}
          >
            Products less than 200
          </button>
        </div>

        <div className="col-lg-3">
          <button
            className="buttons"
            data-price="50"
            onClick={(e) => funFilter(Number(e.target.dataset.price))}
          >
            Products less than 50
          </button>
        </div>
      </div>
      <div className="row  mb-3 ">
        <div className="col-lg-3">
          <button
            className="buttons"
            data-cat="Desserts"
            onClick={(e) => cat(e.target.dataset.cat)}
          >
            Desserts
          </button>
        </div>
        <div className="col-lg-3">
          <button
            className="buttons"
            data-cat="Sandwiches"
            onClick={(e) => cat(e.target.dataset.cat)}
          >
            Sandwiches
          </button>
        </div>
        <div className="col-lg-3">
          <button
            className="buttons"
            data-cat="Pizza"
            onClick={(e) => cat(e.target.dataset.cat)}
          >
            Pizza
          </button>
        </div>
        <div className="col-lg-3">
          <button
            className="buttons"
            data-cat="Burgers"
            onClick={(e) => cat(e.target.dataset.cat)}
          >
            Burgers
          </button>
        </div>
      </div>
      <div className="row ">
        <div className="col-lg-3">
          <form>
            <input
              type="text"
              placeholder="serch by name"
              onChange={(e) => se(e.target.value)}
            />
          </form>
        </div>
        <div className="col-lg-3">
          <form>
            <input
              type="text"
              placeholder="serch by category"
              onChange={(e) => sa(e.target.value)}
            />
          </form>
        </div>
        <div className="col-lg-3">
          <form>
            <input
              type="text"
              placeholder="serch by Id"
              onChange={(e) => si(e.target.value)}
            />
          </form>
        </div>
        <div className="col-lg-3">
          <button className="buttons" onClick={() => so()}>
            Sort By price
          </button>
        </div>
      </div>
      {(search !== null ||
        searcha !== null ||
        searchi !== null) /*= seach!==null*/ &&
      (search == "" || searchi == "" || searcha == "") &&
      filter == null &&
      filterc == null ? (
        <div className="row my-3">
          {" "}
          <div className="col-12 d-flex justify-content-center align-items-center">
            <h1>not found</h1>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="row">
        {(
          filter ||
          filterc ||
          search ||
          searcha ||
          searchi ||
          sorty ||
          prod
        ).map((p) => (
          <div className="col-lg-4 my-5 product-wrap" key={p.id}>
            <Cards product={p} />
            <button
              className="add-to-cart"
              onClick={(e) =>
                addToCart(p, e.currentTarget.closest(".product-wrap"))
              }
            >
              🛒 Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;