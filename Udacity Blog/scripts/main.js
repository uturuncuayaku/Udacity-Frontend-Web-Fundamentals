// Function to minimize or maximize the iframe
function minimizeIframe(param) {
    var iframe = document.getElementById("post-frame"+param);
    if (iframe) {
        iframe.style.height = (iframe.style.height === '0px'|| iframe.style.height === '') ? '100vh' : '0px';
    }
}

// Function to load a specific blog post into the iframe
function loadPost(postFile) {
    var iframe = document.getElementById('post-frame');
    if (iframe) {
        iframe.src = 'posts/' + postFile;
    }
}

// Optional: Add an event listener to handle the document load
document.addEventListener('DOMContentLoaded', function() {
    // Example: Load a default post when the page loads
    loadPost('intro.html');
});

function openModal(postFile) {
    const modal = document.getElementById('modal');
    const iframe = document.getElementById('modal-frame');
    iframe.src = 'posts/' + postFile;
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    const iframe = document.getElementById('modal-frame');
    iframe.src = ''; // Clear the iframe source to stop loading
    modal.style.display = 'none';
}

// Close modal if the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}
