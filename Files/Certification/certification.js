document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const certCards = document.querySelectorAll(".cert-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            certCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});
