
const btn = document.getElementById("backToTop");

window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

btn.addEventListener("click", function() {
    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });
});

