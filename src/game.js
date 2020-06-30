let canvas = {
    id    : '', 
    c     : '',
    ctx   : '',
    size  : { width : 0, height : 0 },
    backgroundColor : '#fff',
    hasInitalized : false
};

let onResize = () => {
    //document.body.style.overflow = 'hidden';
    //canvas.c.style.height = '500px';
}

window.addEventListener('resize', () => onResize(), false);

function createCanvas(_id, _node = document.body, _noneCanvasMsg = 'Your browser does not support HTML5 Canvas.') {
    let canvas = document.createElement('canvas');
    canvas.id = _id;
    canvas.innerHTML = _noneCanvasMsg;
    _node.appendChild(canvas);
}

async function getJSON(fileName) {
    let jsonContent;
    await fetch(fileName).then
        (r => r.text()).then(t => {
        jsonContent = JSON.parse(t);
        });
    return jsonContent;
}

function gameInit(_id, _width = 300, _height = 150, _mode = 'fixed') {
    canvas.id = _id;
    canvas.c = document.getElementById(_id);
    canvas.ctx = canvas.c.getContext('2d');
    canvas.hasInitalized = true;
    changeCanvasSize(_width, _height);
    changeCanvasMode(_mode);
}

function gameLoop() {
    
}

function gameFinalize(){

}

function changeCanvasSize(_width, _height) {
    if (!canvas.hasInitalized) {
        return;
    }
    canvas.size = {_width, _height};
    canvas.c.width = _width;
    canvas.c.height = _height;
}

function changeCanvasMode(_mode) {
    if (!canvas.hasInitalized) {
        return;
    }
    switch (_mode) {
        case 'fixed':
            document.body.removeAttribute('style');
            onResize = () => {
            };
            break;
        case 'fullscreen':
            document.body.style.overflow = 'hidden';
            onResize = () => {
                
            };
            break;
        default :
            break;
    }
}

function changeCanvasBGColor(_color) {
    canvas.backgroundColor = _color;
    canvas.c.style.backgroundColor = _color;
}

//**---- Keyboard ----**//
let Keyboard = (function() {
    // private
    let   instance = null;
    const KEY_NUM = 256;
    let keyStatus = Array(KEY_NUM);
    keyStatus.fill(false);
    
    init = () => {
        return {
            update: function() {
                addEventListener("keyup", e => {
                    for (i = 0; i < KEY_NUM; i++){
                        if (e.keyCode == i) keyStatus[i] = false;
                    }
                }, false);
                addEventListener("keydown",  e => {
                    for (i = 0; i < KEY_NUM; i++){
                        if (e.keyCode == i){
                            keyStatus[i] = true;
                        } 
                    }
                });
            },
            getIsPressing: function (keyCode) {
                return keyStatus[keyCode];
            },
            getIsReleasing: function (keyCode) {
                return !keyStatus[keyCode];
            },
            getPressingCount: function(keyCode) {
                
            },
            getReleasingCount: function(keyCode) {

            },
        }
    }
    return {
        // public
        getInstance: function() {
            if(instance == null) {
                instance = init();
            }
            return instance;
        }
    }
})();