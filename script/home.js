const cardContainer = document.getElementById("card-container");
let allIssues = []; 


async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    displayIssues(allIssues);
}