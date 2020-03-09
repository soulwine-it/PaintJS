const canvas = document.getElementById("jsCanvas");
//캔버스 선긋기
const ctx = canvas.getContext("2d");
//색상 변경
const colors = document.getElementsByClassName("jsColor");
//사이즈 조절
const range = document.getElementById("jsRange");
//Fill
const mode = document.getElementById("jsMode");
//
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;
//저장버튼
const saveBtn = document.getElementById("jsSave");
//실제 픽셀 사이즈
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
//선의 기본 색상과 선의 기본 굵기 설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
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
  ctx.fillStyle = color;
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
    ctx.fillStyle = ctx.strokeStyle;
  }
}

//filling이 false일 경우 배경색채움이 되고 filing이 true일 경우 선을 그을 수 있음.
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
//마우스 우클릭 방지.
function handleClickMenu(event) {
  event.preventDefault();
}
function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleClickMenu);
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
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
