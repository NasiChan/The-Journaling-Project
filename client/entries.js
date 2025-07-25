document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("entries-container");

  const entries = Object.keys(localStorage)
    .filter(key => key.startsWith("entry-"))
    .map(key => ({
      emotion: key.replace("entry-", ""),
      text: localStorage.getItem(key)
    }));

  if (entries.length === 0) {
    container.innerHTML = "<p>No entries found.</p>";
    return;
  }

  entries.forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <h3>${entry.emotion}</h3>
      <p>${entry.text.replace(/\n/g, "<br>")}</p>
    `;
    container.appendChild(div);
  });
});
