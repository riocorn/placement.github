function toggleMenu(){
    document.getElementById("sidebar")
    .classList.toggle("active");
}

function navigate(id){

    // Hide all sections
    document.querySelectorAll(".section")
    .forEach(sec => sec.classList.remove("active"));

    // Show selected section
    document.getElementById(id)
    .classList.add("active");

    // Close sidebar
    document.getElementById("sidebar")
    .classList.remove("active");
}
