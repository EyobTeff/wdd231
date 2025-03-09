// course.js
const courses = [
    { code: "CSE 110", category: "CSE", completed: false },
    { code: "WDD 130", category: "WDD", completed: true },
    { code: "CSE 111", category: "CSE", completed: false },
    { code: "CSE 210", category: "CSE", completed: true },
    { code: "WDD 131", category: "WDD", completed: false },
    { code: "WDD 231", category: "WDD", completed: true }
];

document.addEventListener("DOMContentLoaded", () => {
    const courseContainer = document.querySelector("#course-container");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function displayCourses(filter) {
        courseContainer.innerHTML = "";
        const filteredCourses = filter === "All" ? courses : courses.filter(course => course.category === filter);
        
        filteredCourses.forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("course-card");
            if (course.completed) courseDiv.classList.add("completed");
            courseDiv.textContent = course.code;
            courseContainer.appendChild(courseDiv);
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            displayCourses(button.dataset.filter);
        });
    });

    // Show all courses by default
    displayCourses("All");
});
