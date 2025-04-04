const containerDiv = document.querySelector("#container");

const maxGridSize = 600;

function handleChangeRGB() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  const opacity = this.style.opacity ? parseFloat(this.style.opacity) : 0.1;
  this.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  this.style.opacity = opacity < 1 ? opacity + 0.1 : opacity;
}

function createGrid(gridSize) {
  const height = maxGridSize / gridSize + "px";
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("div");
    row.setAttribute("id", `row${i}`);
    row.classList.toggle("row");
    row.style.height = height;
    containerDiv.appendChild(row);
    for (let j = 0; j < gridSize; j++) {
      const column = document.createElement("div");
      column.setAttribute("id", `row${i}-column${j}`);
      column.classList.toggle("column");
      column.style.height = height;
      column.style.width = height;
      column.addEventListener("mouseenter", handleChangeRGB);
      row.appendChild(column);
    }
  }
}

function removeGrid() {
  while (containerDiv.hasChildNodes())
    containerDiv.removeChild(containerDiv.firstChild);
}

function handleInputBtnClick() {
  const input = parseInt(
    prompt("Please enter desired size of the grid (100 is maximum):")
  );
  if (input > 0 && input <= 100) {
    removeGrid();
    createGrid(input);
  }
}

const inputBtn = document.querySelector("#inputBtn");
inputBtn.addEventListener("click", handleInputBtnClick);

createGrid(16);
