document.addEventListener("DOMContentLoaded", () => {
  function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
  const container = document.getElementById("entries-container");

  fetch("https://the-journaling-project.onrender.com/api/entries")
    .then(res => res.json())
    .then(entries => {
      if (!entries || entries.length === 0) {
        container.innerHTML = "<p>No entries found.</p>";
        return;
      }

      entries.forEach(entry => {
        const entryDiv = document.createElement("div");
        entryDiv.className = "entry";

        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString('en-US', {
          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
        });

        entryDiv.innerHTML = `
          <p class="entry-date">${formattedDate}</p>
          <h3>${escapeHTML(entry.emotion)}</h3>
          <p>${escapeHTML(entry.text).replace(/\n/g, "<br>")}</p>
        `;

        container.appendChild(entryDiv);
      });
    })
    .catch(error => {
      console.error("Failed to fetch entries:", error);
      container.innerHTML = "<p>Error loading entries. Please try again later.</p>";
    });
});

