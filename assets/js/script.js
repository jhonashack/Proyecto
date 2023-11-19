document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 1;

    function showSlide(n) {
        const slides = document.getElementsByClassName("slide");

        if (n > slides.length) {
            currentSlide = 1;
        }

        if (n < 1) {
            currentSlide = slides.length;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[currentSlide - 1].style.display = "block";
    }

    function nextSlide() {
        showSlide(currentSlide += 1);
    }

    function prevSlide() {
        showSlide(currentSlide -= 1);
    }

    // Event listeners for next and previous buttons
    document.getElementById('nextButton').addEventListener('click', nextSlide);
    document.getElementById('prevButton').addEventListener('click', prevSlide);

    // Show the first slide on page load
    showSlide(currentSlide);
});
