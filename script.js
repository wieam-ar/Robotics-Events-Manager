let events = JSON.parse(localStorage.getItem("events")) || [];

const form = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");

function getStatus(date) {
    const today = new Date().toISOString().split("T")[0];
    return date < today ? "past" : "upcoming";
}

function renderEvents() {
    eventList.innerHTML = "";
    events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";
        card.innerHTML = `
          <h3>${event.title}</h3>
          <p><strong>Type:</strong> ${event.type}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Status:</strong> ${event.status}</p>
          <p><strong>Description:</strong> ${event.description}</p>
          ${event.image ? `<img src="${event.image}" alt="Event Image">` : ""}
        `;
        eventList.appendChild(card);
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const event = {
        id: title,
        title: title,
        type: document.getElementById("type").value,
        date: document.getElementById("date").value,
        location: document.getElementById("location").value,
        description: document.getElementById("description").value,
        status: getStatus(document.getElementById("date").value),
        image: document.getElementById("image").value
    };
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    renderEvents();
    form.reset();
});

document.getElementById("download").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "events.json";
    a.click();
    URL.revokeObjectURL(url);
});

// Initial render
renderEvents();