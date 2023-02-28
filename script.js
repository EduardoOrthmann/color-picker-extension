const colorPickerBtn = document.querySelector('#color-picker');
const colorList = document.querySelector('#all-colors');
const clearAll = document.querySelector('#clear-all');
const pickedColors = JSON.parse(localStorage.getItem('pickedColors') || '[]');

showColors();

function showColors() {
  if (!pickedColors.length) return;

  colorList.innerHTML = pickedColors
    .map(
      (color) => `
    <li class="all-colors__color">
      <span class="color__picked-color" style="background: ${color}; border: 1px solid ${
        color === '#ffffff' ? '#ccc' : color
      }"></span>
      <span class="color__color-name" data-color="${color}">${color}</span>
    </li>
    `
    )
    .join('');

  document.querySelector('#picked-colors').classList.remove('hidden');

  document.querySelectorAll('.all-colors__color').forEach((li) => {
    li.addEventListener('click', (e) =>
      copyColor(e.currentTarget.lastElementChild)
    );
  });
}

function copyColor(elem) {
  navigator.clipboard.writeText(elem.dataset.color);
  elem.innerText = 'Copied';

  setTimeout(() => (elem.innerText = elem.dataset.color), 1000);
}

// HANDLE PICK COLOR BUTTON CLICK
colorPickerBtn.addEventListener('click', async () => {
  try {
    const eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();

    navigator.clipboard.writeText(sRGBHex);

    if (!pickedColors.includes(sRGBHex)) {
      pickedColors.push(sRGBHex);
      localStorage.setItem('pickedColors', JSON.stringify(pickedColors));

      showColors();
    }
  } catch (error) {
    console.log(error);
  }
});

// HANDLE CLEAR ALL BUTTON CLICK
clearAll.addEventListener('click', () => {
  pickedColors.length = 0;
  localStorage.setItem('pickedColors', JSON.stringify(pickedColors));
  document.querySelector('#picked-colors').classList.add('hidden');
});
