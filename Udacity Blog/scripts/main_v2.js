// Function to minimize or maximize the iframe
function showPost() {
    var iframe = document.getElementById("post-frame");
    if (iframe) {
        iframe.style.height = (iframe.style.height === '0vh'|| iframe.style.height === '') ? '100vh' : '0vh';
    }
}

function loadPost(postFile) {
    var iframe = document.getElementById('post-frame');
    if (iframe) {
        iframe.src = 'posts/' + postFile;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadPost('intro.html');
});

// Function to open the modal and load content
function openModal(src) {
    var modal = document.getElementById('modal');
    var modalFrame = document.getElementById('modal-frame');
    modalFrame.src = src;
    modal.style.display = 'block'; 
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById('modal');
    var modalFrame = document.getElementById('modal-frame');
    modal.style.display = 'none'; 
    modalFrame.src = ''; 
}

// Optional: Close modal when clicking outside of it
window.onclick = function(event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Listen for messages from iframe
window.addEventListener('message', function(event) {
    if (event.data.startsWith('openModal:')) {
        var src = event.data.split(':')[1];
        openModal(src);
    }
});
