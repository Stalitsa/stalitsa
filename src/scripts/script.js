document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    const content = document.getElementById('content');
    const backToTopButton = document.getElementById("back-to-top");
    const footer = document.querySelector("footer");

    function adjustButtonPosition() {
        const footerHeight = footer.offsetHeight;
        const buttonBottom = footerHeight + 2;
        backToTopButton.style.bottom = buttonBottom + "px";
    }

    function scrollFunction() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        backToTopButton.style.display = scrollTop > 200 ? "block" : "none";
    }

    // Debounce function to limit the rate at which a function can fire
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Adjust button position on scroll and resize with debouncing
    const handleScrollResize = debounce(() => {
        scrollFunction();
        adjustButtonPosition();
    }, 100);

    window.addEventListener('scroll', handleScrollResize);
    window.addEventListener('resize', handleScrollResize);

    // Initial call to set the position and scroll function
    adjustButtonPosition();
    scrollFunction();

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
                    content.style.animation = 'slideOut 0.4s forwards';

                    // Wait for the slide out animation to complete
                    setTimeout(() => {
                        // Update the content
                        content.innerHTML = newContent;

                        // Apply slide in animation
                        content.style.animation = 'slideIn 0.4s forwards';
                    }, 400); // Ensure the timeout matches the animation duration
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
