import './FoodLoader.css';

export default function FoodLoader() {
  return (
    <div className="d-flex vh-100 flex-column justify-content-center align-items-center gap-4">
      <div className="burger-loader">
        <div className="bun-top" />
        <div className="lettuce" />
        <div className="patty" />
        <div className="bun-bottom" />
      </div>
      <p className="food-loading-text m-0">
        بنجهّز الأكل<span>.</span><span>.</span><span>.</span>
      </p>
    </div>
  );
}