const cardContainer = document.getElementById("card-container");
let allIssues = []; 


async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues);
}

function displayIssues(issues) {
    const issueCountElement = document.getElementById("issue-count");
    issueCountElement.innerText = issues.length;

    cardContainer.innerHTML = "";

    if (issues.length === 0) {
        cardContainer.innerHTML = "<p class='text-center col-span-4 py-10'>No issues found!</p>";
        return;
    };

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
        if (status === 'all') {
            displayIssues(allIssues);
        } else {
            const filtered = allIssues.filter(issue => issue.status === status);
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

    loadIssues();