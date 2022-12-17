const mainContainer = document.getElementById("main-container");
const addRows = document.getElementById("add-rows");
const clearGridButton = document.getElementById("clearGrid");
const gridSizeInput = document.getElementById("slider");
const gridSizeDisplay = document.getElementById("gridSize");
const colorPicker = document.getElementById("colorPicker");
const toggleLinesButton = document.getElementById("toggleLines");

let currentSize = 10;
let currentColor = "#DAEAEF";
let borders = false;

function createGrid(dimensions) {

    addRows.style.gridTemplateColumns = "repeat(" + dimensions +", 1fr)";
    addRows.style.gridTemplateRows = "repeat(" + dimensions +", 1fr)";

    for (let i = 0; i < (dimensions * dimensions); i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell", "fl", "transition", "ma0", "pa0", "dib");
        if (borders) {
            cell.classList.add("ba");
        }
        cell.addEventListener("mouseover", color);

        addRows.appendChild(cell);
    }
}

function color() {
    this.style.backgroundColor = currentColor;
}

createGrid(currentSize);

function clearGrid() {
    addRows.innerHTML = "";
    createGrid(currentSize);
}

function toggleLines() {
    let allCells = addRows.querySelectorAll(".cell");
    allCells.forEach(each => each.classList.toggle("ba"));
    borders = !borders;
}

toggleLinesButton.addEventListener("click", toggleLines);


clearGridButton.addEventListener("click", () => {
    addRows.innerHTML = "";
    clearGrid();
})

colorPicker.addEventListener("change", () => {
    currentColor = colorPicker.value;
});

gridSizeInput.oninput = () => {
    addRows.innerHTML = "";
    currentSize = gridSizeInput.value;
    gridSizeDisplay.textContent = currentSize + " x " + currentSize;
    createGrid(currentSize);
}