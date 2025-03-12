const courses = [
    { code: "CSE 110", type: "CSE", completed: true },
    { code: "WDD 130", type: "WDD", completed: true },
    { code: "CSE 111", type: "CSE", completed: true },
    { code: "CSE 210", type: "CSE", completed: false },
    { code: "WDD 131", type: "WDD", completed: true },
    { code: "WDD 231", type: "WDD", completed: false }
];

// ✅ Function to display courses based on filter
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
        div.classList.add("course"); // Always add base "course" class and 
        div.classList.add(course.completed ? "completed" : "pending"); // Add completed or pending class
        courseList.appendChild(div);
    });

    calculateCredits(); // Ensure credits update when filtering
}

// ✅ Function to calculate and display credits separately
function calculateCredits() {
    const creditPerCourse = 2; // Assuming each course is worth 3 credits

    // Calculate credits separately for CSE, WDD, and total
    let totalCredits = courses.filter(course => course.completed).length * creditPerCourse;
    let cseCredits = courses.filter(course => course.completed && course.type === "CSE").length * creditPerCourse;
    let wddCredits = courses.filter(course => course.completed && course.type === "WDD").length * creditPerCourse;

    // Update the respective elements in the HTML
    document.getElementById("creditTotal").textContent = `Total Credits: ${totalCredits}`;
    document.getElementById("cseCreditTotal").textContent = `CSE Credits: ${cseCredits}`;
    document.getElementById("wddCreditTotal").textContent = `WDD Credits: ${wddCredits}`;
}

// ✅ Ensure the courses & total credits are displayed on page load
document.addEventListener("DOMContentLoaded", function () {
    displayCourses("all");
    calculateCredits(); // Calculate total credits on load
});
