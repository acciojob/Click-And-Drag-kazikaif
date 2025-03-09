let selectedCube = null;
let offsetX, offsetY;

document.querySelectorAll(".item").forEach((cube) => {
    cube.addEventListener("mousedown", (event) => {
        selectedCube = event.target;
        offsetX = event.clientX - selectedCube.getBoundingClientRect().left;
        offsetY = event.clientY - selectedCube.getBoundingClientRect().top;
        selectedCube.style.position = "absolute";
        selectedCube.style.zIndex = "1000";
        document.addEventListener("mousemove", moveCube);
        document.addEventListener("mouseup", dropCube);
    });
});

function moveCube(event) {
    if (!selectedCube) return;
    
    let container = document.querySelector(".items");
    let containerRect = container.getBoundingClientRect();

    let newX = event.clientX - offsetX;
    let newY = event.clientY - offsetY;

    // Ensuring cube stays within the container
    newX = Math.max(containerRect.left, Math.min(newX, containerRect.right - selectedCube.offsetWidth));
    newY = Math.max(containerRect.top, Math.min(newY, containerRect.bottom - selectedCube.offsetHeight));

    selectedCube.style.left = `${newX}px`;
    selectedCube.style.top = `${newY}px`;
}

function dropCube() {
    document.removeEventListener("mousemove", moveCube);
    document.removeEventListener("mouseup", dropCube);
    selectedCube = null;
}
