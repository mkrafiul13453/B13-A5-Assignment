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