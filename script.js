const colorPickerBtn = document.querySelector('#color-picker');
const allColors = document.querySelector('.all-colors');

const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();

    navigator.clipboard.writeText(sRGBHex);

    console.log(sRGBHex);
  } catch (error) {
    console.log(error);
  }
};

colorPickerBtn.addEventListener('click', activateEyeDropper);
