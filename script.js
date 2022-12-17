// defaults
let currentSize = 10;
let currentColor = "#DAEAEF";
let borders = false;

// user input
const gridSizeInput = document.getElementById("slider");
const gridSizeDisplay = document.getElementById("gridSize");
const clearGridButton = document.getElementById("clearGrid");
const toggleLinesButton = document.getElementById("toggleLines");
const colorPicker = document.getElementById("colorPicker");

// dom objects
const cellContainer = document.getElementById("add-cells");

// creates a grid based on given size
function createGrid(dimensions) {
    // set the grid so that each row and column is an equal size
    cellContainer.style.gridTemplateColumns = "repeat(" + dimensions + ", 1fr)";
    cellContainer.style.gridTemplateRows = "repeat(" + dimensions + ", 1fr)";

    let area = dimensions * dimensions;

    for (let i = 0; i < area; i++) {
        let cell = document.createElement("div");
        if (borders) cell.classList.add("ba");
        cell.classList.add("cell", "fl", "transition", "ma0", "pa0", "dib");
        cell.addEventListener("mouseover", color);

        cellContainer.appendChild(cell);
    }
}

// fills in the current cell with the default/selected color
function color() {
    this.style.backgroundColor = currentColor;
}

// removes the grid and creates a new one of the same size
function clearGrid() {
    cellContainer.innerHTML = "";
    createGrid(currentSize);
}

// show or hide the grid lines within the canvas
function toggleLines() {
    let allCells = cellContainer.querySelectorAll(".cell");
    allCells.forEach(each => each.classList.toggle("ba"));
    borders = !borders;
}

// user input listeners
toggleLinesButton.addEventListener("click", toggleLines);

clearGridButton.addEventListener("click", () => {
    cellContainer.innerHTML = "";
    clearGrid();
});

colorPicker.addEventListener("change", () => {
    currentColor = colorPicker.value;
});

gridSizeInput.oninput = () => {
    cellContainer.innerHTML = "";
    currentSize = gridSizeInput.value;
    gridSizeDisplay.textContent = currentSize + " x " + currentSize;
    createGrid(currentSize);
}

// create the initial grid
createGrid(currentSize);