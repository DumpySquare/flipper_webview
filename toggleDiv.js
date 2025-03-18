function toggleDiv(b) {
    var divs = document.querySelectorAll('body > div');
    divs.forEach(div => {
        if (div.id === b) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    });
}

// Initially display the JSON div
document.addEventListener('DOMContentLoaded', (event) => {
    toggleDiv('JSON');
});