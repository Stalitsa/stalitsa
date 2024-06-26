
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    const content = document.getElementById('content');
    var backToTopButton = document.getElementById("back-to-top");
    var footer = document.querySelector("footer");

    function adjustButtonPosition() {
        var footerHeight = footer.offsetHeight;
        var windowHeight = window.innerHeight;
        var buttonBottom = footerHeight + 2; // Adjust 2px above the footer
        backToTopButton.style.bottom = buttonBottom + "px";
    }

    // Adjust button position on scroll and resize
    window.onscroll = function() {
        scrollFunction();
        adjustButtonPosition();
    };

    window.onresize = function() {
        adjustButtonPosition();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    // Initial call to set the position
    adjustButtonPosition();

    // When the user clicks on the button, scroll to the top of the document
    backToTopButton.onclick = function() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
    };


    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            // Remove active class from all links
            links.forEach(link => link.classList.remove('active'));

            // Add active class to the clicked link
            link.classList.add('active');

            // Fetch the new page content
            fetch(href)
                .then(response => response.text())
                .then(data => {
                    // Create a temporary element to extract the new content
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data;
                    const newContent = tempDiv.querySelector('#content').innerHTML;

                    // Apply slide out animation
                    content.style.animation = 'slideOut 0.5s forwards';

                    // Wait for the slide out animation to complete
                    setTimeout(() => {
                        // Update the content
                        content.innerHTML = newContent;

                        // Apply slide in animation
                        content.style.animation = 'slideIn 0.5s forwards';
                    }, 50);
                });
        });
    });

    // Automatically highlight the current page based on the URL
    const currentPath = window.location.pathname.split('/').pop();
    const currentLink = document.querySelector(`nav a[href="${currentPath}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
});
