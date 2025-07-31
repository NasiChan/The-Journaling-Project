const centralCircle = document.getElementById("central-circle");
const emotionContainer = document.getElementById("emotion-container");
const entryFormContainer = document.getElementById("entry-form-container");
const entryEmotionHeading = document.getElementById("entry-emotion-heading");
const entryTextarea = document.getElementById("entry-textarea");
const saveEntryBtn = document.getElementById("save-entry-btn");
const goBackBtn = document.getElementById("go-back-btn");
const emotions = ["Anger", "Fear", "Sadness", "Anxiety", "Loneliness", "Jealousy", "Shame", "Guilt"];
let isExpanded = false;

centralCircle.addEventListener("click", () => {
  if (!isExpanded) {
    centralCircle.classList.add("clicked");  
    const radius = 150;
    const angleStep = (2 * Math.PI) / emotions.length;
    emotions.forEach((emotion, i) => {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const circle = document.createElement("div");
      circle.classList.add("emotion-circle");
      circle.textContent = emotion;
      circle.addEventListener("click", (e) => {
        e.stopPropagation();
        showEntryForm(emotion);
      });
      circle.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        circle.classList.add("clicked");
      });
      circle.addEventListener("mouseup", (e) => {
        e.stopPropagation();
        circle.classList.remove("clicked");
        showEntryForm(emotion);
      });
      circle.addEventListener("mouseleave", (e) => {
        circle.classList.remove("clicked");
      });
      circle.style.left = `calc(50% + ${x}px)`;
      circle.style.top = `calc(50% + ${y}px)`;
      circle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
      circle.style.animationDelay = `${i * 0.1}s`;
      setTimeout(() => {
        circle.style.transform = `translate(${x}px, ${y}px) scale(1)`;
      }, i * 150);
      emotionContainer.appendChild(circle);
    });
    centralCircle.textContent = "×";
    isExpanded = true;
  } else {
    centralCircle.classList.remove("clicked"); 
    document.querySelectorAll(".emotion-circle").forEach(circle => circle.remove());
    centralCircle.textContent = "+";
    isExpanded = false;
  }
});

function showEntryForm(emotion) {
  document.getElementById("main-page").style.display = "none";
  entryFormContainer.style.display = "block";
  entryEmotionHeading.textContent = `Let's talk about ${emotion}`;
  entryTextarea.value = "";
  saveEntryBtn.onclick = () => saveEntry(emotion);
}

goBackBtn.addEventListener("click", () => {
  document.getElementById("main-page").style.display = "flex";
  entryFormContainer.style.display = "none";
});

function saveEntry(emotion) {
  const text = entryTextarea.value.trim();
  if (!text) {
    alert("Please write something before saving.");
    return;
  }
  fetch('/api/entries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, emotion })
  })
  .then(res => {
    if (!res.ok) throw new Error("Failed to save entry");
    return res.json();
  })
  .then(() => {
    alert("Entry saved!");
    entryTextarea.value = "";
    goBackBtn.click();
  })
  .catch(() => {
    alert("Error saving entry. Please try again.");
  });
}
