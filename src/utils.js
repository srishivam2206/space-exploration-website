// Small helper functions used by several components.

// "2023-05-01T00:00:00Z" -> "1 May 2023". Returns "" if there is no date.
export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Cut long text to a maximum length and add "..." at the end.
export function shorten(text, max) {
  if (!text) return "No description available.";
  return text.length > max ? text.slice(0, max).trim() + "..." : text;
}
