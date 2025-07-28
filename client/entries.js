document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("entries-container");

  const entries = JSON.parse(localStorage.getItem("burnBookEntries")) || [];

  if (entries.length === 0) {
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
      <h3>${entry.emotion}</h3>
      <p>${entry.content.replace(/\n/g, "<br>")}</p>
    `;

    container.appendChild(entryDiv);
  });
});
