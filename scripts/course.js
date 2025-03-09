const courses = [
    { code: "CSE 110", type: "CSE", completed: true },
    { code: "WDD 130", type: "WDD", completed: true },
    { code: "CSE 111", type: "CSE", completed: false },
    { code: "CSE 210", type: "CSE", completed: true },
    { code: "WDD 131", type: "WDD", completed: false },
    { code: "WDD 231", type: "WDD", completed: false }
];

function displayCourses(filter) {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";

    let filteredCourses = courses;
    if (filter !== "all") {
        filteredCourses = courses.filter(course => course.type === filter);
    }

    filteredCourses.forEach(course => {
        const div = document.createElement("div");
        div.textContent = course.code;
        div.classList.add(course.completed ? "completed" : "pending");
        courseList.appendChild(div);
    });
}

// Event Listeners for filter buttons
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("button[onclick='filterCourses(\"all\")']").addEventListener("click", () => displayCourses("all"));
    document.querySelector("button[onclick='filterCourses(\"CSE\")']").addEventListener("click", () => displayCourses("CSE"));
    document.querySelector("button[onclick='filterCourses(\"WDD\")']").addEventListener("click", () => displayCourses("WDD"));

    // Display all courses by default
    displayCourses("all");
});
