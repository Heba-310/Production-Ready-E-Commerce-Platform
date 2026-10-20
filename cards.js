function Cards({ product }) {
  return (
    <div className="card" style={{ width: 20 + "em" }}>
      <img
        src={product.image}
        className="card-img-top"
        style={{ width: 20 + "em", height: 15 + "em" }}
        alt="..."
      />

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">
         {product.category}
        </p>
        <p>{product.price}</p>
      </div>
    </div>
  );
}

export default Cards;
