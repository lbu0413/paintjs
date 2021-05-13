const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls-color");
const range = document.getElementById("range");
const mode = document.querySelector(".mode");
const save = document.querySelector(".save");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
ctx.fillStyle = "#2c2c2c";

let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	const size = event.target.value;
	ctx.lineWidth = size;
}

function handleModeClick() {
	if (filling === true) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handleSaveClick() {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "WooksCanvas";
	link.click();
}

function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	} else {
		null;
	}
}

function handleContextMenu(event) {
	event.preventDefault();
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach((color) =>
	color.addEventListener("click", handleColorClick)
);

if (range) {
	range.addEventListener("input", handleRangeChange);
}

if (mode) {
	mode.addEventListener("click", handleModeClick);
}

if (save) {
	save.addEventListener("click", handleSaveClick);
}
