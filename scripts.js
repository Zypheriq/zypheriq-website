const boxes = document.querySelectorAll('.project-box');
let activeBox = null;

boxes.forEach(box => {
  box.addEventListener('click', e => {
    e.stopPropagation();
    if (activeBox && activeBox !== box) {
      activeBox.classList.remove('expanded');
    }
    box.classList.toggle('expanded');
    activeBox = box.classList.contains('expanded') ? box : null;
  });
});

document.addEventListener('click', () => {
  if (activeBox) {
    activeBox.classList.remove('expanded');
    activeBox = null;
  }
});