import { formatDate, shorten } from "../utils.js";

// One search result: thumbnail, title, date and a short description.
// Clicking it tells the parent (Search page) which item was picked.
export default function ResultCard({ item, onSelect }) {
  return (
    <article className="card" onClick={() => onSelect(item)}>
      {item.thumbnail ? (
        <img src={item.thumbnail} alt={item.title} loading="lazy" />
      ) : (
        <div className="no-image">No image</div>
      )}
      <div className="card-body">
        <h3>{item.title}</h3>
        <p className="date">{formatDate(item.date)}</p>
        <p>{shorten(item.description, 100)}</p>
        <button className="link-button" type="button">View details</button>
      </div>
    </article>
  );
}
