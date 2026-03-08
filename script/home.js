const cardContainer = document.getElementById("card-container");
let allIssues = [];

async function loadIssues() {
    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        allIssues = data.data;
        displayIssues(allIssues);
    } catch (error) {
        console.error("Error loading issues:", error);
    }
}

function displayIssues(issues) {
    const issueCountElement = document.getElementById("issue-count");
    issueCountElement.innerText = issues.length;

    cardContainer.innerHTML = "";

    if (issues.length === 0) {
        cardContainer.innerHTML = "<p class='text-center col-span-4 py-10'>No issues found!</p>";
        return;
    }

    issues.forEach((issue) => {
        const card = document.createElement("div");
        card.className = "bg-base-100 rounded-lg shadow-xl border-none cursor-pointer";
        card.onclick = () => showModal(issue._id || issue.id);

        const statusIcon = issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png';

        card.innerHTML = `
            <div class="p-4 border-b space-y-3">
                <div class="flex justify-between items-center mb-3">
                    <div class="w-8 h-8 rounded-full ${issue.status === 'open' ? 'bg-green-700' : 'bg-blue-700'} flex items-center justify-center">
                        <img src="${statusIcon}" alt="">
                    </div>
                    <span class="text-red-500 bg-red-100 px-4 py-1 rounded-full text-sm font-semibold">${issue.priority}</span>
                </div>
                <h2 class="text-lg font-semibold text-gray-800 leading-snug">${issue.title}</h2>
                <p class="text-gray-500 text-sm mt-2">${issue.description}</p>
                <div class="flex gap-2 mt-3">
                    ${issue.labels.map(label => `<span class="text-red-500 border border-red-300 bg-red-50 px-3 py-1 rounded-full text-xs font-medium">${label}</span>`).join('')}
                </div>
            </div>
            <div class="p-4 text-sm text-gray-500">
                <p>#1 by ${issue.author}</p>
                <p class="mt-1">${issue.createdAt}</p>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}


const filterIssues = (status, clickedButton) => {
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach(btn => {
        btn.classList.add('btn-soft');
        btn.classList.remove('btn-active');
    });

    clickedButton.classList.remove('btn-soft');
    clickedButton.classList.add('btn-active');

    if (status === 'all') {
        displayIssues(allIssues);
    } else {
        const filtered = allIssues.filter(issue => issue.status.toLowerCase() === status.toLowerCase());
        displayIssues(filtered);
    }
};


const showModal = (id) => {
    const issue = allIssues.find(item => (item._id || item.id) === id);

    if (issue) {
        document.getElementById("modal-title").innerText = issue.title;
        document.getElementById("modal-description").innerText = issue.description;
        document.getElementById("modal-author").innerText = `• Opened by ${issue.author}`;
        document.getElementById("modal-date").innerText = `• ${issue.createdAt}`;
        document.getElementById("modal-priority").innerText = issue.priority;
        document.getElementById("modal-assignee").innerText = issue.author;

        const modalStatus = document.getElementById("modal-status");
        modalStatus.innerText = issue.status === 'open' ? 'Opened' : 'Closed';
        modalStatus.className = issue.status === 'open' ?
            "bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold" :
            "bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold";

        const modalTags = document.getElementById("modal-tags");
        modalTags.innerHTML = issue.labels.map(label => `
            <span class="text-red-500 border border-red-300 bg-red-50 px-3 py-1 rounded-full text-xs font-medium uppercase">
                ${label}
            </span>
        `).join('');

        const modal = document.getElementById("issue_modal");
        modal.showModal();
    }
};

document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    if (!searchValue) {
        displayIssues(allIssues); return;
    }

    const filteredIssues = allIssues.filter(issue =>
        issue.title.toLowerCase().includes(searchValue) ||
        issue.description.toLowerCase().includes(searchValue)
    );

    displayIssues(filteredIssues);
});

loadIssues();