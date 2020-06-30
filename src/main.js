let keyboard = Keyboard.getInstance();
window.addEventListener("DOMContentLoaded", function() {
    createCanvas('canvas');
    gameInit('canvas', 500, 500, 'fixed');
    changeCanvasBGColor('#000');
});