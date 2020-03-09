const canvas = document.getElementById("jsCanvas");
//캔버스 선긋기
const ctx = canvas.getContext("2d");
//색상 변경
const colors = document.getElementsByClassName("jsColor");
//사이즈 조절
const range = document.getElementById("jsRange");

//Fill
const mode = document.getElementById("jsMode");

//실제 픽셀 사이즈
canvas.width = 500;
canvas.height = 500;

//선의 기본 색상과 선의 기본 굵기 설정
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

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
}
//선 굵기 변경
function handleRangeChange(event) {
  console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "File";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
