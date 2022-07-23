/**
 * @category  html5 widgets
 * @package   Kelly
 * @author    Rubchuk Vladimir <torrenttvi@gmail.com>
 * @copyright 2015-2020 Rubchuk Vladimir
 * @license   GPLv3
 * @version   1.21
 *
 * Usage example :
 *   
 *   new KellyColorPicker({place : 'color-picker'});
 *   see also : https://github.com/NC22/KellyC-Color-Picker
 * ToDo :
 * 
 * Add switch color in colorsavers button (analog of X button in Photoshop)
 * updateConfig method
 *
 **/

/**
 * Create color picker
 * @param {Array} cfg
 * @returns {KellyColorPicker}
 */

function KellyColorPicker(cfg) {
    var PI = Math.PI; 

    var svFig; // current method SV figure object

    var changeCursor = true;

    var svCursor = new Object;
    svCursor.radius = 4;

    var canvas = false;
    var ctx = false;

    var method = 'quad';
    var alpha = false;          // is alpha slider enabled
    var drag = false;
    var cursorAnimReady = true; // sets by requestAnimationFrame to limit FPS on events like mousemove etc. when draging 

    var events = new Array();
    var userEvents = new Array();

    var canvasHelper = document.createElement("canvas");
    var canvasHelperCtx = false; // used if needed to copy image data throw ctx.drawImage for save alpha channel
    var rendered = false;        // is colorpicker rendered (without side alpha bar and cursors, rendered image stores in canvasHelperData
    var canvasHelperData = null; // rendered interface without cursors and without alpha slider [wheelBlockSize x wheelBlockSize]

    var input = false;

    // used by updateInput() function if not overloaded by user event
    var inputColor = true;     // update input color according to picker
    var inputFormat = 'mixed'; // text format of colorpicker color displayed in input element | values : mixed | hex | rgba

    var popup = new Object;    // popup block for input
    popup.tag = false;         // Dom element if popup is enabled
    popup.margin = 6;          // margin from input in pixels

    // container, or canvas element
    var place = false;
    var handler = this;

    var basePadding = 2;

    var padding;
    var wheelBlockSize = 200;
    var center;

    // current color
    var hsv;
    var rgb;
    var hex = '#000000';
    var a = 1;

    var resizeWith = false;
    var resizeSide = false;

    var colorSavers = new Array();

    var styleSwitch = false; // change method from square to triangle
    var svFigsPool = new Array(); // if we have button for switch method, better store already created figure object to buffer

    // style switch from triange to quad and backwards
    function initStyleSwitch() {

        styleSwitch = new Object;
        styleSwitch.size;
        styleSwitch.sizePercentage = 10;
        styleSwitch.position;
        styleSwitch.paddingY = 4;
        styleSwitch.paddingX = 4;
        styleSwitch.imageData = new Array();
        styleSwitch.lineWidth = 2;
        styleSwitch.color = '#c1ebf5';

        styleSwitch.updateSize = function () {
            this.size = parseInt(wheelBlockSize - (wheelBlockSize / 100) * (100 - this.sizePercentage));

            if (this.size < 16)
                this.size = 16;

            this.position = {x: this.paddingX, y: this.paddingY};
        }

        styleSwitch.draw = function () {

            if (this.imageData[method]) {
                ctx.putImageData(this.imageData[method], this.position.x, this.position.y);
                return;
            }

            var rgb = hexToRgb(this.color);

            canvasHelper.width = this.size;
            canvasHelper.height = this.size;

            canvasHelperCtx.clearRect(0, 0, this.size, this.size);
            canvasHelperCtx.beginPath();

            var switchFig = 'triangle';
            if (method == 'triangle')
                switchFig = 'quad';

            canvasHelperCtx.beginPath();

            if (this.size < 35) {
                var circleRadiusMain = canvasHelper.width / 2;
                var circleRadius = circleRadiusMain;
            } else {

                var circleRadiusMain = (canvasHelper.width / 2) - this.lineWidth;

                canvasHelperCtx.arc(this.size / 2, this.size / 2, circleRadiusMain, 0, PI * 2);
                canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
                canvasHelperCtx.lineWidth = this.lineWidth;
                canvasHelperCtx.stroke();

                var circleRadius = circleRadiusMain - 6;
                canvasHelperCtx.closePath();
                canvasHelperCtx.beginPath();
                canvasHelperCtx.arc(this.size / 2, this.size / 2, circleRadius, 0, PI * 2);
                canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
                canvasHelperCtx.lineWidth = this.lineWidth;
                canvasHelperCtx.stroke();
                canvasHelperCtx.closePath();
            }

            canvasHelperCtx.beginPath();
            var svmSize;

            if (switchFig == 'quad') {
                var workDiametr = (circleRadius * 2) - 4; // may be some paddings here
                svmSize = Math.floor(workDiametr / Math.sqrt(2));
                var padding = (this.size - svmSize) / 2;
                var svmPos = {x: padding + svmSize, y: padding + svmSize / 2}; // start middle point
                svmPos.y = svmPos.y - (svmSize / 2);
                canvasHelperCtx.moveTo(svmPos.x, svmPos.y); // right top
                canvasHelperCtx.lineTo(svmPos.x - svmSize, svmPos.y);  // left tp
                canvasHelperCtx.lineTo(svmPos.x - svmSize, svmPos.y + svmSize); // left bottom
                canvasHelperCtx.lineTo(svmPos.x, svmPos.y + svmSize); // right bottom

            } else {
                svmSize = Math.floor((2 * circleRadius - 4) * Math.sin(toRadians(60))); // side size
                var svmPos = {x: circleRadius * 2 + (circleRadiusMain - circleRadius), y: this.size / 2}; // start middle point
                var h = ((Math.sqrt(3) / 2) * svmSize);
                canvasHelperCtx.moveTo(svmPos.x, svmPos.y);
                canvasHelperCtx.lineTo(svmPos.x - h, svmPos.y - (svmSize / 2)); // top 
                canvasHelperCtx.lineTo(svmPos.x - h, svmPos.y + (svmSize / 2)); // bottom
                canvasHelperCtx.lineTo(svmPos.x, svmPos.y);
            }

            canvasHelperCtx.lineTo(svmPos.x, svmPos.y);


            canvasHelperCtx.fillStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 1)';
            canvasHelperCtx.fill();
            canvasHelperCtx.lineWidth = this.lineWidth;
            canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
            canvasHelperCtx.stroke();
            canvasHelperCtx.closePath();


            this.imageData[method] = canvasHelperCtx.getImageData(0, 0, canvasHelper.width, canvasHelper.width);
            ctx.drawImage(canvasHelper, this.position.x, this.position.y);

        }

        styleSwitch.isDotIn = function (dot) {
            if (
                    dot.x >= this.position.x && dot.x <= this.position.x + this.size &&
                    dot.y >= this.position.y && dot.y <= this.position.y + this.size
                    ) {
                return true;
            }

            //if (Math.pow(this.position.x - dot.x, 2) + Math.pow(this.position.y - dot.y, 2) < Math.pow(this.outerRadius, 2)) {
            //	return true;
            //}			

            return false;
        }
    }

    // triangle colorsavers for left and right side
    function initColorSaver(align, selected, color) {

        if (!selected)
            selected = false;
        else
            selected = true;

        var colorSaver = new Object;
        colorSaver.width; // size of side of triangle
        colorSaver.widthPercentage = 22;

        colorSaver.imageData = null; // last rendered colorsaver image
        colorSaver.align = align;
        colorSaver.selected = selected; // current color
        colorSaver.color = '#ffffff'; // hex color
        colorSaver.position; // top point of triangle
        colorSaver.paddingY = -4;
        colorSaver.paddingX = 4;
        colorSaver.lineWidth = 1;
        colorSaver.selectSize = 4;

        if (align == 'right') {
            colorSaver.paddingX = colorSaver.paddingX * -1;
        }

        if (colorSaver.selected) {
            colorSaver.color = hex;
        }

        if (color) {
            colorSaver.color = color;
        }

        colorSaver.updateSize = function () {
            this.width = parseInt(wheelBlockSize - (wheelBlockSize / 100) * (100 - this.widthPercentage));

            // start render point in global canvas coords
            if (this.align == 'left') {
                this.position = {x: 0, y: wheelBlockSize - this.width};
            } else if (this.align == 'right') {
                this.position = {x: wheelBlockSize - this.width, y: wheelBlockSize - this.width};
            }
        }

        // calc triangle area (same method as for triangle sv figure)
        colorSaver.calcS = function (p) {
            return Math.abs((p[1].x - p[0].x) * (p[2].y - p[0].y) - (p[2].x - p[0].x) * (p[1].y - p[0].y)) / 2;
        }

        colorSaver.isDotIn = function (dot) {

            var path = new Array();

            if (this.align == 'left') {
                path[0] = {x: this.position.x, y: this.position.y}; // top 
                path[1] = {x: this.position.x, y: this.position.y + this.width}; // bottom left
                path[2] = {x: this.position.x + this.width, y: this.position.y + this.width}; // bottom right
            } else {
                path[0] = {x: this.position.x + this.width, y: this.position.y}; // top 
                path[1] = {x: path[0].x, y: path[0].y + this.width}; // bottom right
                path[2] = {x: path[0].x - this.width, y: this.position.y + this.width}; // bottom left				
            }

            for (var i = 0; i <= path.length - 1; ++i)
            {
                path[i].x += this.paddingX;
                path[i].y += this.paddingY;
            }

            var selfS = this.calcS(path);

            var t = [
                {x: path[0].x, y: path[0].y},
                {x: path[1].x, y: path[1].y},
                {x: dot.x, y: dot.y}
            ];

            var s = this.calcS(t);
            t[1] = {x: path[2].x, y: path[2].y};
            s += this.calcS(t);
            t[0] = {x: path[1].x, y: path[1].y};
            s += this.calcS(t);

            if (Math.ceil(s) == Math.ceil(selfS))
                return true;
            else
                return false;
        }

        colorSaver.draw = function () {

            canvasHelper.width = this.width;
            canvasHelper.height = this.width;

            canvasHelperCtx.clearRect(0, 0, this.width, this.width);
            canvasHelperCtx.beginPath();

            if (this.align == 'left') {
                canvasHelperCtx.moveTo(this.lineWidth / 2, this.width - this.lineWidth);
                canvasHelperCtx.lineTo(this.width, this.width - this.lineWidth);
                canvasHelperCtx.lineTo(this.lineWidth, this.lineWidth);
                canvasHelperCtx.lineTo(this.lineWidth, this.width - this.lineWidth);
            }

            if (this.align == 'right') {
                canvasHelperCtx.moveTo(this.lineWidth / 2, this.width - this.lineWidth);
                canvasHelperCtx.lineTo(this.width - this.lineWidth, this.width - this.lineWidth);
                canvasHelperCtx.lineTo(this.width - this.lineWidth, this.lineWidth);
                canvasHelperCtx.lineTo(this.lineWidth, this.width - this.lineWidth);
            }

            if (this.selected) {

                // start draw addition inner figure

                canvasHelperCtx.fillStyle = 'rgba(255,255,255, 1)';
                canvasHelperCtx.fill();

                canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 1)';
                canvasHelperCtx.stroke();
                canvasHelperCtx.closePath();
                canvasHelperCtx.beginPath();

                canvasHelperCtx.lineWidth = this.lineWidth;

                if (this.align == 'left') {
                    canvasHelperCtx.moveTo(this.selectSize, this.width - this.selectSize);
                    canvasHelperCtx.lineTo(this.width - this.selectSize * 2, this.width - this.selectSize);
                    canvasHelperCtx.lineTo(this.selectSize, this.selectSize * 2);
                    canvasHelperCtx.lineTo(this.selectSize, this.width - this.selectSize);
                }

                if (this.align == 'right') {

                    canvasHelperCtx.moveTo(this.selectSize * 2, this.width - this.selectSize);
                    canvasHelperCtx.lineTo(this.width - this.selectSize, this.width - this.selectSize);
                    canvasHelperCtx.lineTo(this.width - this.selectSize, this.selectSize * 2);
                    canvasHelperCtx.lineTo(this.selectSize * 2, this.width - this.selectSize);
                }
            }

            var rgb = hexToRgb(this.color);
            canvasHelperCtx.fillStyle = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 1)';
            canvasHelperCtx.fill();
            canvasHelperCtx.strokeStyle = 'rgba(0, 0, 0, 1)';
            canvasHelperCtx.stroke();

            this.imageData = canvasHelperCtx.getImageData(0, 0, this.width, this.width);
            ctx.drawImage(canvasHelper, this.position.x + this.paddingX, this.position.y + this.paddingY);

        }

        var colorSaverKey = colorSavers.length;
        colorSavers[colorSaverKey] = colorSaver;
    }

    var wheel = new Object;
    wheel.width = 18;
    wheel.imageData = null; // rendered wheel image data
    wheel.innerRadius;
    wheel.startAngle = 0; // 150
    wheel.outerRadius;
    wheel.outerStrokeStyle = 'rgba(0,0,0,0.2)';
    wheel.innerStrokeStyle = 'rgba(0,0,0,0.2)';
    wheel.pos; // updates in updateSize() | center point; wheel cursor \ hsv quad \ hsv triangle positioned relative that point
    wheel.draw = function () {

        // put rendered data

        if (this.imageData) {
            ctx.putImageData(this.imageData, 0, 0);
        } else {
            var hAngle = this.startAngle;
            for (var angle = 0; angle <= 360; angle++) {

                var startAngle = toRadians(angle - 2);
                var endAngle = toRadians(angle);

                ctx.beginPath();
                ctx.moveTo(center, center);
                ctx.arc(center, center, this.outerRadius, startAngle, endAngle, false);
                ctx.closePath();

                var targetRgb = hsvToRgb(hAngle / 360, 1, 1);
                ctx.fillStyle = 'rgb(' + targetRgb.r + ', ' + targetRgb.g + ', ' + targetRgb.b + ')';
                //ctx.fillStyle = 'hsl('+hAngle+', 100%, 50%)';
                ctx.fill();

                hAngle++;
                if (hAngle >= 360)
                    hAngle = 0;
            }

            ctx.globalCompositeOperation = "destination-out"; // cut out color wheel inside by circle next
            ctx.beginPath();
            ctx.arc(center, center, this.innerRadius, 0, PI * 2);

            ctx.fill();

            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = this.innerStrokeStyle; // 'rgba(0,0,0,0.2)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

            // wheel border
            ctx.beginPath();
            ctx.arc(center, center, this.outerRadius, 0, PI * 2);
            ctx.strokeStyle = this.outerStrokeStyle;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

            this.imageData = ctx.getImageData(0, 0, wheelBlockSize, wheelBlockSize);
        }

    };

    wheel.isDotIn = function (dot) {
        // is dot in circle
        if (Math.pow(this.pos.x - dot.x, 2) + Math.pow(this.pos.y - dot.y, 2) < Math.pow(this.outerRadius, 2)) {
            if (Math.pow(this.pos.x - dot.x, 2) + Math.pow(this.pos.y - dot.y, 2) > Math.pow(this.innerRadius, 2)) {
                return true;
            }
        }
        return false;
    };

    var wheelCursor = new Object;
    wheelCursor.lineWeight = 2;
    wheelCursor.height = 4;
    wheelCursor.paddingX = 2; // padding from sides of wheel
    wheelCursor.path; // rotatePath2 --- поворот по старой функции, в фигуре не приплюсован центр

    var alphaSlider = new Object;
    alphaSlider.width = 18;
    alphaSlider.padding = 4;
    alphaSlider.outerStrokeStyle = 'rgba(0,0,0,0.2)';
    alphaSlider.innerStrokeStyle = 'rgba(0,0,0,0.2)';
    alphaSlider.height;
    alphaSlider.pos; // left top corner position
    alphaSlider.updateSize = function () {
        this.pos = {x: wheelBlockSize + alphaSlider.padding, y: alphaSlider.padding};
        this.height = wheelBlockSize - alphaSlider.padding * 2;
    };

    alphaSlider.draw = function () {
        var alphaGrd = ctx.createLinearGradient(0, 0, 0, this.height);
                
        var aRgb = hsvToRgb(hsv.h, 1, 1);
        
        alphaGrd.addColorStop(0, 'rgba(' + aRgb.r + ',' + aRgb.g + ',' + aRgb.b + ',1)');
        alphaGrd.addColorStop(1, 'rgba(' + aRgb.r + ',' + aRgb.g + ',' + aRgb.b + ',0)');

        ctx.beginPath();
        ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.fillStyle = alphaGrd;
        ctx.fill();

        ctx.strokeStyle = 'rgba(0,0,0, 0.2)';
        ctx.lineWidth = 2;

        ctx.stroke();
        ctx.closePath();
    };

    alphaSlider.dotToAlpha = function (dot) {
        return 1 - Math.abs(this.pos.y - dot.y) / this.height;
    };

    alphaSlider.alphaToDot = function (alpha) {
        return {
            x: 0,
            y: this.height - (this.height * alpha)
        };
    };

    alphaSlider.limitDotPosition = function (dot) {
        var y = dot.y;

        if (y < this.pos.y) {
            y = this.pos.y;
        }

        if (y > this.pos.y + this.height) {
            y = this.pos.y + this.height;
        }

        return {x: this.pos.x, y: y};
    };

    alphaSlider.isDotIn = function (dot) {
        if (dot.x < this.pos.x ||
                dot.x > this.pos.x + alphaSlider.width ||
                dot.y < this.pos.y ||
                dot.y > this.pos.y + this.height) {
            return false;
        }
        return true;
    };

    // svCursorMouse - для устройств с мышкой, генератор указателя в зависимости от активной области
    // todo on very very small sv when set by hex, cursor may be go out of bounds
    var svCursorMouse = new Object;

    svCursorMouse.svCursorData = null;
    svCursorMouse.stCursor = null; // cursor before replace
    svCursorMouse.curType = 0; // if > 0 cursor switched by KellyColorPicker to custom
    svCursorMouse.size = 16;
    svCursorMouse.cEl = document.body;

    svCursorMouse.initSvCursor = function () {
        if (!canvas)
            return false;

        this.curType = 1;

        if (!this.stCursor) {
            
            this.stCursor = window.getComputedStyle(this.cEl).cursor;            
                
            if (!this.stCursor) {
                this.stCursor = 'auto';
            }
        }        

        if (this.svCursorData) {
            this.cEl.style.cursor = this.svCursorData;
            return true;
        }

        if (!canvasHelper)
            return false;

        // create canvas on 2 pixels bigger for Opera that cut image 
        var canvasSize = this.size + 2;

        canvasHelper.width = canvasSize;
        canvasHelper.height = canvasSize;

        canvasHelperCtx.clearRect(0, 0, this.size, this.size);
        canvasHelperCtx.strokeStyle = 'rgba(255, 255, 255, 1)';

        canvasHelperCtx.beginPath();
        canvasHelperCtx.lineWidth = 2;
        canvasHelperCtx.arc(canvasSize / 2, canvasSize / 2, this.size / 2, 0, PI * 2);

        canvasHelperCtx.stroke();
        canvasHelperCtx.closePath();

        var offset = canvasSize; //if (input.value.indexOf(curImageData) !== -1)
        var curImageData = canvasHelper.toDataURL();

        this.svCursorData = 'url(' + curImageData + ') ' + offset / 2 + ' ' + offset / 2 + ', auto';

        if (!this.svCursorData)
            return false;

        this.cEl.style.cursor = this.svCursorData;
        if (this.cEl.style.cursor.indexOf(curImageData) === -1) { // for autist IE (Edge also), that not support data-uri for cursor -_-
            this.svCursorData = 'crosshair';
            this.cEl.style.cursor = 'crosshair';
        }
        return true;
    };

    svCursorMouse.initStandartCursor = function () {
        if (!this.stCursor)
            return;
        
        svCursorMouse.curType = 0;
        this.cEl.style.cursor = this.stCursor;
    };

    svCursorMouse.updateCursor = function (newDot) {
        if (!changeCursor)
            return;

        if (KellyColorPicker.cursorLock)
            return;

        if (svFig.isDotIn(newDot)) {
            svCursorMouse.initSvCursor();
        } else {
            svCursorMouse.initStandartCursor();
        }
    };

    // updateinput

    function constructor(cfg) {
        var criticalError = '', placeName = '';

        // save non-camelased old style options compatibility

        if (cfg.alpha_slider !== undefined) {
            cfg.alphaSlider = cfg.alpha_slider;
        }

        if (cfg.input_color !== undefined) {
            cfg.inputColor = cfg.input_color;
        }

        if (cfg.input_format !== undefined) {
            cfg.inputFormat = cfg.input_format;
        }

        // config apply

        if (cfg.input && typeof cfg.input !== 'object') {
            cfg.input = document.getElementById(cfg.input);
            input = cfg.input;
            // if (!cfg.input) log += '| "input" (' + inputName + ') not not found';
        } else if (typeof cfg.input === 'object') {
            input = cfg.input;
        }

        if (cfg.changeCursor !== undefined) {
            changeCursor = cfg.changeCursor;
        }

        if (cfg.alpha !== undefined) {
            a = cfg.alpha;
        }

        if (cfg.alphaSlider !== undefined) {
            alpha = cfg.alphaSlider;
        }

        if (cfg.inputColor !== undefined) {
            inputColor = cfg.inputColor;
        }

        if (cfg.inputFormat !== undefined) {
            inputFormat = cfg.inputFormat;
        }

        if (cfg.userEvents)
            userEvents = cfg.userEvents;

        if (cfg.place && typeof cfg.place !== 'object') {
            placeName = cfg.place;
            cfg.place = document.getElementById(cfg.place);
        }

        if (cfg.place) {
            place = cfg.place;
        } else if (input) {

            popup.tag = document.createElement('div');
            popup.tag.className = "popup-kelly-color";

            if (!cfg.popupClass) {

                popup.tag.className = "popup-kelly-color";

                popup.tag.style.position = 'absolute';
                popup.tag.style.bottom = '0px';
                popup.tag.style.left = '0px';
                popup.tag.style.display = 'none';
                popup.tag.style.backgroundColor = '#e1e1e1';
                popup.tag.style.border = "1px solid #bfbfbf";
                popup.tag.style.boxShadow = "7px 7px 14px -3px rgba(0,0,0,0.24)";
                popup.tag.style.borderTopLeftRadius = '4px';
                popup.tag.style.borderTopRightRadius = '4px';
                popup.tag.style.borderBottomLeftRadius = '4px';
                popup.tag.style.borderBottomRightRadius = '4px';
                popup.tag.style.padding = "12px";
                popup.tag.style.boxSizing = "content-box";

            } else {
                popup.tag.className = cfg.popupClass;
            }

            place = popup.tag;

            var body = document.getElementsByTagName('body')[0];
            body.appendChild(popup.tag);

            addEventListner(input, "click", function (e) {
                return handler.popUpShow(e);
            }, 'popup_');

        } // attach directly to input by popup
        else
            criticalError += '| "place" (' + placeName + ') not not found';

        // hex default #000000
        var colorData = false;

        if (cfg.color) {
            colorData = readColorData(cfg.color);
        } else if (input && input.value) {
            colorData = readColorData(input.value);
        }

        if (colorData) {
            hex = colorData.h;
            if (alpha)
                a = colorData.a;
        }

        //if (hex.charAt(0) == '#') hex = hex.slice(1);
        //if (hex.length == 3) hex = hex + hex;
        //if (hex.length !== 6) hex = '#000000';

        if (cfg.method && (cfg.method == 'triangle' || cfg.method == 'quad'))
            method = cfg.method;

        if (!initCanvas()) {
            criticalError += ' | cant init canvas context';
        }
        
        // size of elments init 
        
        if (cfg.resizeWith) {

            if (typeof cfg.resizeWith !== 'object' && typeof cfg.resizeWith !== 'boolean')
                cfg.resizeWith = document.getElementById(cfg.resizeWith);
            
            if (cfg.resizeWith === true) {
                resizeWith = canvas;
            } else {
                resizeWith = cfg.resizeWith;
            }
            
            if (cfg.resizeSide)
                resizeSide = cfg.resizeSide;                
                
            if (resizeWith) {
                var newSize = getSizeByElement(resizeWith);
                if (newSize)
                    cfg.size = getSizeByElement(resizeWith);
                
                addEventListner(window, "resize", function (e) {
                    return handler.syncSize(e);
                }, 'canvas_');
            }
        }
                
        if (cfg.size && cfg.size > 0) {
            wheelBlockSize = cfg.size;
        }
        
        // size init end
        
        if (criticalError) {
            if (typeof console !== 'undefined')
                console.log('KellyColorPicker : ' + criticalError);
            return;
        }

        if (method == 'quad')
            svFig = getSvFigureQuad();
        if (method == 'triangle')
            svFig = getSvFigureTriangle();

        if (input) {
            var inputEdit = function (e) {
                var e = e || window.event;
                if (!e.target) {
                    e.target = e.srcElement;
                }
                handler.setColorByHex(e.target.value, true);
            };

            addEventListner(input, "click", inputEdit, 'input_edit_');
            addEventListner(input, "change", inputEdit, 'input_edit_');
            addEventListner(input, "keyup", inputEdit, 'input_edit_');
            addEventListner(input, "keypress", inputEdit, 'input_edit_');
        }

        if (cfg.colorSaver) {
            initColorSaver('left', true);
            initColorSaver('right');
        }

        if (cfg.methodSwitch) {
            initStyleSwitch();
        }

        enableEvents();

        updateSize();
        handler.setColorByHex(false); // update color info and first draw
    }

    // may be zero in some cases / check before applay

    function getSizeByElement(el) {

        var sizeInfo = el.getBoundingClientRect();
        var size = 0;
        var sizeReduse = 0;
        if (alpha) {
            sizeReduse = alphaSlider.width + alphaSlider.padding * 2;
        }
        
        if (el === canvas) {
                 if (sizeInfo.width <= sizeInfo.height)
                size = sizeInfo.height;
            else if (sizeInfo.height < sizeInfo.width)
                size = sizeInfo.width; 
        } else {
        
            if (resizeSide) {
                    if (resizeSide == 'height')
                    size = sizeInfo.height;
                else if (resizeSide == 'width')
                    size = sizeInfo.width;
            } else {
                     if (sizeInfo.width > sizeInfo.height)
                    size = sizeInfo.height;
                else if (sizeInfo.height >= sizeInfo.width)
                    size = sizeInfo.width;
            }
        }
        
        size = parseInt(size);
        
        if (alpha) {

            size -= sizeReduse;
        }

        if (size <= 0) {
            return false;
        }

        return size;
    }

    // Read color value from string cString in rgb \ rgba \ hex \ hsl \ hsla format or from object ex. rgb {r : 255, g : 255, b : 255, a : 1}, hsv {h : 1, s: 1, l : 1, a : 1}
    // return array {h : color in rgb hex format (string #000000), a : alpha (float value from 0 to 1) }
    // falseOnFail = false - return default array on fail {h : '#000000', a : 1} or return false on fail if true

    function readColorData(cString, falseOnFail) {
        
        var alpha = 1;
        var h = false;

        if (typeof cString == 'string') {
            
            cString = cString.trim(cString);
            
            if (cString.indexOf("(") == -1) { // hex color
            
                if (cString.charAt(0) == '#')
                    cString = cString.slice(1);
                
                cString = cString.substr(0, 8);
                
                if (cString.length >= 3) {
                    
                    if (cString.length > 6 && cString.length < 8) {
                        cString = cString.substr(0, 6); // bad alpha data
                    }
                    
                    if (cString.length > 3 && cString.length < 6) {
                        cString = cString.substr(0, 3); // bad full format 
                    }
                    
                    h = cString;
                    
                    // complite full format, by replicating the R, G, and B values 
                    
                    if (cString.length >= 3 && cString.length <= 4) {
                        
                        h = "";
                        
                        for (let i = 0; i < cString.length; i++) {
                            h += cString[i] + cString[i];
                        }
                    }
                    
                    if (h.length == 8)
                        alpha = (parseInt(h, 16) & 255) / 255;
                    
                }
                
            } else {
                
                vals = cString.split(",");
                
                if (vals.length >= 3) {
                    
                    switch (cString.substring(0, 3)) {
                        
                        case 'rgb':
                        
                            vals[0] = vals[0].replace("rgba(", "");
                            vals[0] = vals[0].replace("rgb(", "");

                            var rgb = {r: parseInt(vals[0]), g: parseInt(vals[1]), b: parseInt(vals[2])};

                            if (rgb.r <= 255 && rgb.g <= 255 && rgb.b <= 255) {
                                h = rgbToHex(rgb);
                            }
                            
                            break;
                            
                        case 'hsl':
                        
                            vals[0] = vals[0].replace("hsl(", "");
                            vals[0] = vals[0].replace("hsla(", "");
                            
                            var hue = parseFloat(vals[0]) / 360.0;
                            var s = parseFloat(vals[1]) / 100.0; //js will ignore % in the end
                            var l = parseFloat(vals[2]) / 100.0;
                       
                            if (hue >= 0 && s <= 1 && l <= 1) {
                                h = rgbToHex(hsvToRgb(hue, s, l));
                            }
                            
                            break;
                    }
                    
                    if (vals.length == 4) {
                        
                        alpha = parseFloat(vals[3]);
                        
                        if (!alpha || alpha < 0)
                            alpha = 0;
                        
                        if (alpha > 1) 
                            alpha = 1;                    
                    }
                }
            }
            
        } else if (typeof cString == 'object') {
            
             if (typeof cString.r != 'undefined' && 
                 typeof cString.g != 'undefined' &&
                 typeof cString.b != 'undefined') { // rgb input
                 
                h = rgbToHex(cString);
                
             } else if (
                 typeof cString.h != 'undefined' && 
                 typeof cString.s != 'undefined' &&
                 typeof cString.l != 'undefined')  {
                    
                cString.h = parseFloat(cString.h) / 360.0;
                cString.s = parseFloat(cString.s) / 100.0; 
                cString.l = parseFloat(cString.l) / 100.0;
           
                if (cString.h >= 0 && cString.s <= 1 && cString.l <= 1) {
                    h = rgbToHex(hsvToRgb(cString.h, cString.s, cString.l));
                }
             }
             
             if (typeof cString.a != 'undefined')  {
                 
                 alpha = cString.a;  
             }             
        }

        if (h === false && falseOnFail) {
            
            return false;
        }
        
        if (h === false) {
            
            h = '000000';
        }
        
        if (h.charAt(0) != '#') {
            
            h = h.substr(0, 6);
            h = '#' + h;
            
        } else {
            
            h = h.substr(0, 7); // for private purposes must contain only rgb part
        }
        
        return {h: h, a: alpha};
    }

    function getSvFigureQuad() {

        if (svFigsPool['quad'])
            return svFigsPool['quad'];

        var quad = new Object;
        quad.size;
        quad.padding = 2;
        quad.path; // крайние точки фигуры на координатной плоскости
        quad.imageData = null; // rendered quad image data
        // перезаписывается существующий, чтобы не вызывать утечек памяти, обнуляя прошлый
        // тк UInt8ClampedArray генерируемый createImageData стандартными способами не
        // во всех браузерах выгружается сразу

        quad.dotToSv = function (dot) {
            return {
                s: Math.abs(this.path[3].x - dot.x) / this.size,
                v: Math.abs(this.path[3].y - dot.y) / this.size
            };
        };

        quad.svToDot = function (sv) {
            var quadX = this.path[0].x;
            var quadY = this.path[0].y;

            var svError = 0.02;
            if (wheelBlockSize < 150) {
                svError = 0.07;
            } else if (wheelBlockSize < 100) {
                svError = 0.16;
            }

            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    var dot = {x: x + quadX, y: y + quadY};
                    var targetSv = this.dotToSv(dot);
                    var es = Math.abs(targetSv.s - sv.s), ev = Math.abs(targetSv.v - sv.v);

                    if (es < svError && ev < svError) {
                        return dot;
                    }
                }
            }

            return {x: 0, y: 0};
        };

        quad.limitDotPosition = function (dot) {
            var x = dot.x;
            var y = dot.y;

            if (x < this.path[0].x) {
                x = this.path[0].x;
            }

            if (x > this.path[0].x + this.size) {
                x = this.path[0].x + this.size;
            }

            if (y < this.path[0].y) {
                y = this.path[0].y;
            }

            if (y > this.path[0].y + this.size) {
                y = this.path[0].y + this.size;
            }

            return {x: x, y: y};
        };

        quad.draw = function () {
            if (!this.imageData)
                this.imageData = ctx.createImageData(this.size, this.size);
            var i = 0;

            var quadX = this.path[0].x;
            var quadY = this.path[0].y;

            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    var dot = {x: x + quadX, y: y + quadY};

                    var sv = this.dotToSv(dot);
                    var targetRgb = hsvToRgb(hsv.h, sv.s, sv.v);
                    this.imageData.data[i + 0] = targetRgb.r;
                    this.imageData.data[i + 1] = targetRgb.g;
                    this.imageData.data[i + 2] = targetRgb.b;
                    this.imageData.data[i + 3] = 255;
                    i += 4;
                }
            }

            ctx.putImageData(this.imageData, quadX, quadY);

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,0,0, 0.2)';
            ctx.lineWidth = 2;
            for (var i = 0; i <= this.path.length - 1; ++i)
            {
                if (i == 0)
                    ctx.moveTo(this.path[i].x, this.path[i].y);
                else
                    ctx.lineTo(this.path[i].x, this.path[i].y);
            }

            ctx.stroke();

            ctx.closePath();
        };

        quad.updateSize = function () {
            var workD = (wheel.innerRadius * 2) - wheelCursor.paddingX * 2 - this.padding * 2;

            // исходя из формулы диагонали квадрата, узнаем длинну стороны на основании доступного диаметра
            this.size = Math.floor(workD / Math.sqrt(2));

            this.path = new Array();

            // находим верхнюю левую точку и от нее задаем остальные координаты
            this.path[0] = {x: -1 * (this.size / 2), y: -1 * (this.size / 2)};
            this.path[1] = {x: this.path[0].x + this.size, y: this.path[0].y};
            this.path[2] = {x: this.path[1].x, y: this.path[1].y + this.size};
            this.path[3] = {x: this.path[2].x - this.size, y: this.path[2].y};
            this.path[4] = {x: this.path[0].x, y: this.path[0].y};

            for (var i = 0; i <= this.path.length - 1; ++i) {
                this.path[i].x += wheel.pos.x;
                this.path[i].y += wheel.pos.y;
            }
        }

        quad.isDotIn = function (dot) {
            if (dot.x < this.path[0].x ||
                    dot.x > this.path[0].x + this.size ||
                    dot.y < this.path[0].y ||
                    dot.y > this.path[0].y + this.size) {
                return false;
            }
            return true;
        };

        svFigsPool['quad'] = quad;
        return quad;
    }

    function getSvFigureTriangle() {

        if (svFigsPool['triangle'])
            return svFigsPool['triangle'];

        var triangle = new Object;
        triangle.size; // сторона равностороннего треугольника
        triangle.padding = 2;
        triangle.path;
        triangle.imageData = null; // rendered triangle image data
        triangle.followWheel = true;
        triangle.s;
        triangle.sOnTop = false;
        triangle.outerRadius;

        triangle.limitDotPosition = function (dot) {
            var x = dot.x;
            var y = dot.y;

            var slopeToCtr;
            var maxX = this.path[0].x;
            var minX = this.path[2].x;
            var finalX = x;
            var finalY = y;

            finalX = Math.min(Math.max(minX, finalX), maxX);
            var slope = ((this.path[0].y - this.path[1].y) / (this.path[0].x - this.path[1].x));
            var minY = Math.ceil((this.path[1].y + (slope * (finalX - this.path[1].x))));
            slope = ((this.path[0].y - this.path[2].y) / (this.path[0].x - this.path[2].x));
            var maxY = Math.floor((this.path[2].y + (slope * (finalX - this.path[2].x))));

            if (x < minX) {
                slopeToCtr = ((wheel.pos.y - y) / (wheel.pos.x - x));
                finalY = y;
            }

            finalY = Math.min(Math.max(minY, finalY), maxY);
            return {x: finalX, y: finalY};
        };

        triangle.svToDot = function (sv) {
            var svError = 0.02;
            if (wheelBlockSize < 150) {
                svError = 0.07;
            } else if (wheelBlockSize < 100) {
                svError = 0.16;
            }

            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    var dot = {x: this.path[1].x + x, y: this.path[1].y + y};
                    if (svFig.isDotIn(dot)) {
                        var targetSv = this.dotToSv(dot);
                        var es = Math.abs(targetSv.s - sv.s), ev = Math.abs(targetSv.v - sv.v);

                        if (es < svError && ev < svError) {
                            return dot;
                        }
                    }
                }
            }

            return {
                x: 0,
                y: 0
            };
        };

        triangle.draw = function () {
            // no buffer

            if (!this.imageData)
                this.imageData = canvasHelperCtx.createImageData(this.size, this.size);

            canvasHelper.width = this.size;
            canvasHelper.height = this.size;

            var trX = this.path[1].x;
            var trY = this.path[1].y;
            var i = 0;
            for (var y = 0; y < this.size; y++) {
                for (var x = 0; x < this.size; x++) {
                    var dot = {x: this.path[1].x + x, y: this.path[1].y + y};
                    if (!svFig.isDotIn(dot)) {
                        this.imageData.data[i + 0] = 0;
                        this.imageData.data[i + 1] = 0;
                        this.imageData.data[i + 2] = 0;
                        this.imageData.data[i + 3] = 0;
                    } else {
                        var sv = this.dotToSv(dot);
                        var targetRgb = hsvToRgb(hsv.h, sv.s, sv.v);

                        this.imageData.data[i + 0] = targetRgb.r;
                        this.imageData.data[i + 1] = targetRgb.g;
                        this.imageData.data[i + 2] = targetRgb.b;
                        this.imageData.data[i + 3] = 255;
                    }

                    i += 4;
                }
            }

            canvasHelperCtx.putImageData(this.imageData, 0, 0);
            ctx.drawImage(canvasHelper, trX, trY); // draw with save overlaps transparent things , not direct putImageData that rewrite all pixels

            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 2;
            var trianglePath = this.path; //rotatePath(triangle.path, hsv.h * 360);
            for (var i = 0; i <= trianglePath.length - 1; ++i)
            {
                if (i == 0)
                    ctx.moveTo(trianglePath[i].x, trianglePath[i].y);
                else
                    ctx.lineTo(trianglePath[i].x, trianglePath[i].y);
            }

            ctx.stroke();
            ctx.closePath();
        };

        triangle.calcS = function (p) {
            return Math.abs((p[1].x - p[0].x) * (p[2].y - p[0].y) - (p[2].x - p[0].x) * (p[1].y - p[0].y)) / 2;
        };

        triangle.dotToSv = function (dot) {
            var p = getP({x: dot.x, y: dot.y}, this.vol);
            var len = getLen(p, this.vol[0]);

            // dirty tricks? replace output to interpolation and lerp in future
            if (len < 1)
                len = Math.floor(len);
            if (len > this.h - 1)
                len = this.h;

            var vol = len / (this.h);

            var angle = Math.abs(getAngle(dot, this.sSide));
            if (angle < 30)
                angle = 30;
            angle -= 30;
            angle = 60 - angle;
            angle = angle / 60; // - saturation from one angle

            return {s: angle, v: vol};
        };

        triangle.isDotIn = function (dot) {
            var t = [
                {x: this.path[0].x, y: this.path[0].y},
                {x: this.path[1].x, y: this.path[1].y},
                {x: dot.x, y: dot.y}
            ];

            var s = this.calcS(t);
            t[1] = {x: this.path[2].x, y: this.path[2].y};
            s += this.calcS(t);
            t[0] = {x: this.path[1].x, y: this.path[1].y};
            s += this.calcS(t);

            if (Math.ceil(s) == Math.ceil(this.s))
                return true;
            else
                return false;
        };

        triangle.updateSize = function () {
            // из формулы высоты равностороннего треугольника
            this.outerRadius = wheel.innerRadius - wheelCursor.paddingX - this.padding;
            // из теоремы синусов треугольника
            this.size = Math.floor((2 * this.outerRadius) * Math.sin(toRadians(60)));

            var h = ((Math.sqrt(3) / 2) * this.size);
            this.h = ((Math.sqrt(3) / 2) * this.size);

            this.path = new Array();
            this.path[0] = {x: this.outerRadius, y: 0}; // middle point - h
            this.path[1] = {x: this.path[0].x - h, y: -1 * (this.size / 2)}; // upper - s
            this.path[2] = {x: this.path[1].x, y: this.size / 2}; // bottom - v
            this.path[3] = {x: this.path[0].x, y: this.path[0].y}; // to begin

            for (var i = 0; i <= this.path.length - 1; ++i) {
                this.path[i].x += wheel.pos.x;
                this.path[i].y += wheel.pos.y;
            }

            this.vol = new Array();


            this.s = this.calcS(this.path);
            if (this.sOnTop) {
                var middle = getMiddlePoint(this.path[0], this.path[2]);

                this.vol[0] = {x: this.path[1].x, y: this.path[1].y};
                this.vol[1] = {x: middle.x, y: middle.y};

                this.sSide = this.path[1];
            } else {
                var middle = getMiddlePoint(this.path[0], this.path[1]);

                this.vol[0] = {x: this.path[2].x, y: this.path[2].y};
                this.vol[1] = {x: middle.x, y: middle.y};

                this.sSide = this.path[2];
            }
        };

        svFigsPool['triangle'] = triangle;
        return triangle;
    }

    // prefix - for multiple event functions for one object
    function addEventListner(object, event, callback, prefix) {
        if (typeof object !== 'object') {
            object = document.getElementById(object);
        }

        if (!object)
            return false;
        if (!prefix)
            prefix = '';

        events[prefix + event] = callback;

        if (!object.addEventListener) {
            object.attachEvent('on' + event, events[prefix + event]);
        } else {
            object.addEventListener(event, events[prefix + event] , 'kelly');
        }

        return true;
    }

    function removeEventListener(object, event, prefix) {
        if (typeof object !== 'object') {
            object = document.getElementById(object);
        }

        // console.log('remove :  : ' + Object.keys(events).length);
        if (!object)
            return false;
        if (!prefix)
            prefix = '';

        if (!events[prefix + event])
            return false;

        if (!object.removeEventListener) {
            object.detachEvent('on' + event, events[prefix + event]);
        } else {
            object.removeEventListener(event, events[prefix + event]);
        }

        events[prefix + event] = null;
        return true;
    }

    // [converters]
    // Read more about HSV color model :
    // https://ru.wikipedia.org/wiki/HSV_%28%F6%E2%E5%F2%EE%E2%E0%FF_%EC%EE%E4%E5%EB%FC%29
    // source of converter hsv functions
    // http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c

    function hsvToRgb(h, s, v) {
        var r, g, b, i, f, p, q, t;

        if (h && s === undefined && v === undefined) {
            s = h.s, v = h.v, h = h.h;
        }

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }

        return {
            r: Math.floor(r * 255),
            g: Math.floor(g * 255),
            b: Math.floor(b * 255)
        };
    }

    function rgbToHsv(r, g, b) {
        if (r && g === undefined && b === undefined) {
            g = r.g, b = r.b, r = r.r;
        }

        r = r / 255, g = g / 255, b = b / 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return {h: h, s: s, v: v};
    }

    function hexToRgb(hex) {
        var dec = parseInt(hex.charAt(0) == '#' ? hex.slice(1) : hex, 16);
        return {r: dec >> 16, g: dec >> 8 & 255, b: dec & 255};
    }

    function rgbToHex(color) {
        var componentToHex = function (c) {
            var hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };

        return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
    }

    function toRadians(i) {
        return i * (PI / 180);
    }

    // [converters - end]

    function getLen(point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    }

    function getMiddlePoint(point1, point2) {
        return {x: (point1.x + point2.x) / 2, y: (point1.y + point2.y) / 2};
    }

    // перпендикуляр от точки

    function getP(point1, line1) {
        var l = (line1[0].x - line1[1].x) * (line1[0].x - line1[1].x) + (line1[0].y - line1[1].y) * (line1[0].y - line1[1].y);
        var pr = (point1.x - line1[0].x) * (line1[1].x - line1[0].x) + (point1.y - line1[0].y) * (line1[1].y - line1[0].y);
        var pt = true;
        var cf = pr / l;

        if (cf < 0) {
            cf = 0;
            pt = false;
        }
        if (cf > 1) {
            cf = 1;
            pt = false;
        }

        return {
            x: line1[0].x + cf * (line1[1].x - line1[0].x),
            y: line1[0].y + cf * (line1[1].y - line1[0].y),
            pt: pt
        };
    }

    // translate360 = true  270
    //            180 --- from.x.y --- 0
    //                      90

    function getAngle(point, from, translate360) {
        if (!from)
            from = {x: 0, y: 0};

        var distX = point.x - from.x;
        var distY = point.y - from.y;

        var a = Math.atan2(distY, distX) * 180 / (PI);
        if (translate360 && a < 0)
            a = 360 + a;

        return a;
    }

    // поворот фигуры относительно точки
    function rotatePath2(points, angle) {
        angle = toRadians(angle);
        var newPoints = new Array();

        for (var i = 0; i <= points.length - 1; ++i)
        {
            newPoints[i] = {
                x: points[i].x * Math.cos(angle) - points[i].y * Math.sin(angle),
                y: points[i].x * Math.sin(angle) + points[i].y * Math.cos(angle)
            };
        }

        return newPoints;
    }

    function updateSize() {
        padding = basePadding + wheelCursor.paddingX;

        rendered = false;
        wheel.imageData = null;

        center = wheelBlockSize / 2;
        wheel.pos = {x: center, y: center};

        wheel.outerRadius = center - padding;
        wheel.innerRadius = wheel.outerRadius - wheel.width;

        // объект относительно начала координат
        wheelCursor.path = [
            {x: wheel.innerRadius - wheelCursor.paddingX, y: wheelCursor.height * -1},
            {x: wheel.outerRadius + wheelCursor.paddingX, y: wheelCursor.height * -1},
            {x: wheel.outerRadius + wheelCursor.paddingX, y: wheelCursor.height},
            {x: wheel.innerRadius - wheelCursor.paddingX, y: wheelCursor.height},
            {x: wheel.innerRadius - wheelCursor.paddingX, y: (wheelCursor.height + (wheelCursor.lineWeight / 2)) * -1}
        ];

        var width = wheelBlockSize;
        if (alpha)
            width += alphaSlider.width + alphaSlider.padding * 2;

        if (place.tagName.toLowerCase() != 'canvas') {
            place.style.width = width + 'px';
            place.style.height = wheelBlockSize + 'px';
        }

        canvas.width = width;
        canvas.height = wheelBlockSize;
        
        if (resizeWith != canvas) {
            canvas.style.width = width + 'px';
            canvas.style.height = wheelBlockSize + 'px';
        }

        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            colorSavers[i].updateSize();
        }

        if (styleSwitch) {

            styleSwitch.imageData['triangle'] = null;
            styleSwitch.imageData['quad'] = null;

            styleSwitch.updateSize();
        }

        svFig.updateSize();
        if (alpha)
            alphaSlider.updateSize();
    }

    // updates input after color changes (manualEnter = true if value entered from input, not from widget)
    // if manualEnter = true - save original text in input, else set input value in configurated format
    // if user event 'updateinput' is setted and return false - prevent default updateInput behavior

    function updateInput(manualEnter) {
        if (!input)
            return;

        if (userEvents["updateinput"]) {
            var callback = userEvents["updateinput"];
            if (!callback(handler, input, manualEnter))
                return;
        }
        
        let aStr = a.toFixed(2);
        let rgba = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + aStr + ')';

        if (!manualEnter) {
            switch (inputFormat) {
                case 'mixed':
                    if (a < 1)
                        input.value = rgba;
                    else
                        input.value = hex;
                    break;
                case 'hex':
                    input.value = hex;
                    break;
                case 'hsla':
                    input.value = 'hsla(' + (hsv.h * 360).toFixed(2) + ', ' + (hsv.s * 100).toFixed(2) + '%, ' + (hsv.v * 100).toFixed(2) + '%, ' + aStr + ')';
                    break;
                default:
                    input.value = rgba;
                    break;
            }
        }

        if (inputColor) {
            if (hsv.v < 0.5) {
                input.style.color = "#FFF";
            } else {
                input.style.color = "#000";
            }

            input.style.background = rgba;
        }
    }

    function initCanvas() {
        if (!place)
            return false;
        if (place.tagName != 'CANVAS') {
            canvas = document.createElement('CANVAS');
            place.appendChild(canvas);
        } else {
            canvas = place;
        }

        // code for IE browsers
        if (typeof window.G_vmlCanvasManager != 'undefined') {
            canvas = window.G_vmlCanvasManager.initElement(canvas);
            canvasHelper = window.G_vmlCanvasManager.initElement(canvasHelper);
        }

        if (!!(canvas.getContext && canvas.getContext('2d'))) {
            ctx = canvas.getContext("2d");
            canvasHelperCtx = canvasHelper.getContext("2d");
            return true;
        } else
            return false;
    }

    // temp events until wait mouse click or touch
    function enableEvents() {
        addEventListner(canvas, "mousedown", function (e) {
            handler.mouseDownEvent(e);
        }, 'wait_action_');
        addEventListner(canvas, "touchstart", function (e) {
            handler.mouseDownEvent(e);
        }, 'wait_action_');
        addEventListner(canvas, "mouseout", function (e) {
            handler.mouseOutEvent(e);
        }, 'wait_action_');
        addEventListner(window, "touchmove", function (e) {
            handler.touchMoveEvent(e);
        }, 'wait_action_');
        addEventListner(canvas, "mousemove", function (e) {
            handler.mouseMoveRest(e);
        }, 'wait_action_');
    }

    // mouse detect canvas events

    function disableEvents() {
        removeEventListener(canvas, "mousedown", 'wait_action_');
        removeEventListener(canvas, "touchstart", 'wait_action_');
        removeEventListener(canvas, "mouseout", 'wait_action_');
        removeEventListener(window, "touchmove", 'wait_action_');
        removeEventListener(canvas, "mousemove", 'wait_action_');
    }

    function getEventDot(e) {
            
        e = e || window.event;
        var x, y;
        var scrollX = document.body.scrollLeft + document.documentElement.scrollLeft;
        var scrollY = document.body.scrollTop + document.documentElement.scrollTop;

        if (e.type == 'touchend') {
        
            x = e.changedTouches[0].clientX + scrollX;
            y = e.changedTouches[0].clientY + scrollY;
            
        } else if (e.type == 'touchmove' || e.touches) {
        
            x = e.touches[0].clientX + scrollX;
            y = e.touches[0].clientY + scrollY;
            
        } else {
            // e.pageX e.pageY e.x e.y bad for cross-browser
            x = e.clientX + scrollX;
            y = e.clientY + scrollY;
        }

        // set point to local coordinates
        
        var rect = canvas.getBoundingClientRect();
        x -= rect.left + scrollX;
        y -= rect.top + scrollY;

        return {x: x, y: y};
    }

    function selectColorSaver(key) {

        // disable current selection
        var previouseSelect = false;
        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if (colorSavers[i].selected)
                previouseSelect = i;
            colorSavers[i].selected = false;
        }

        // select new 
        var select = false;
        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if (i == key) {
                colorSavers[i].selected = true;
                handler.setColorByHex(colorSavers[i].color);
                select = true;
                break;
            }
        }

        if (select && userEvents["selectcolorsaver"]) {
            var callback = userEvents["selectcolorsaver"];
            callback(handler, colorSavers[key]);
        }

        if (!select && previouseSelect !== false) {
            colorSavers[previouseSelect].selected = true;
        }

        return select;
    }

    function updateColorSavers() {

        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if (colorSavers[i].selected)
                colorSavers[i].color = hex;
        }

    }

    function drawColorSavers() {
        if (colorSavers.length) {
            for (var i = 0; i <= colorSavers.length - 1; ++i)
            {
                colorSavers[i].draw();
            }
        }
    }

    // вывод интерфейса без курсоров
    // поддерживается буферизация todo добавить буферизацию color saver элементов
    // вынести буфер альфа слайдера отдельно от колеса и sv блока

    function drawColorPicker() {
        if (!ctx)
            return false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // put buffered data
        if (rendered) {
            ctx.putImageData(canvasHelperData, 0, 0);
            drawColorSavers();
            return true;
        }

        // форма кольца может измениться только при изменении размеров виджета
        wheel.draw();
        svFig.draw();

        if (alpha)
            alphaSlider.draw();

        drawColorSavers();
        if (styleSwitch)
            styleSwitch.draw();

        // поместить текущее отрисованное изображение кольца + sv селектора в буфер
        // notice :
        // при перемещении курсора кольца сохранять буфер все изображение бессмысленно - sv блок постоянно обновляется, поэтому
        // сохраняем уже на событии выхода из процесса перемещения

        if (!drag) {
            //wheelBlockSize
            canvasHelperData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            rendered = true;
        }
        return true;
    }

    function draw() {
        if (!drawColorPicker()) {
            return false;
        }

        var curAngle = hsv.h * 360 - wheel.startAngle;

        // cursors

        if (alpha) {
            ctx.beginPath();
            var cursorHeight = 2;
            var cursorPaddingX = 2;
            var pointY = alphaSlider.height * (1 - a);
            ctx.rect(alphaSlider.pos.x - cursorPaddingX, alphaSlider.padding + pointY - cursorHeight / 2, alphaSlider.width + cursorPaddingX * 2, cursorHeight);
            ctx.strokeStyle = 'rgba(0,0,0, 0.8)';
            ctx.lineWidth = 2;

            ctx.stroke();
            ctx.closePath();
        }

        ctx.beginPath();
        
        var wheelCursorPath = rotatePath2(wheelCursor.path, curAngle, {x: wheel.pos.x, y: wheel.pos.y});
        for (var i = 0; i <= wheelCursorPath.length - 1; ++i)
        {
            wheelCursorPath[i].x += wheel.pos.x;
            wheelCursorPath[i].y += wheel.pos.y;
            if (i == 0)
                ctx.moveTo(wheelCursorPath[i].x, wheelCursorPath[i].y);
            else
                ctx.lineTo(wheelCursorPath[i].x, wheelCursorPath[i].y);
        }

        ctx.strokeStyle = 'rgba(0,0,0,0.8)';
        ctx.lineWidth = wheelCursor.lineWeight;
        ctx.stroke();
        ctx.closePath();

        // sv cursor
        if (hsv.v > 0.5 && hsv.s < 0.5)
            ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        else
            ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        //ctx.strokeStyle='rgba(255,255, 255, 1)';

        //document.getElementById('test3').value = 'h' + hsv.h.toFixed(2) + ' s'  + hsv.s.toFixed(2) + ' v'  + hsv.v.toFixed(2)

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(hsv.x, hsv.y, svCursor.radius, 0, PI * 2);


        ctx.stroke();
        ctx.closePath();

        return false;
    }

    this.popUpClose = function (e) {
        
        if (popup.tag === false)
            return;
       
        if (e) {
            // todo check when select color and then unpress button out of bounds
            if (e.target == input || e.target == canvas)
                return false;
            if (e.target == popup.tag)
                return false;
        }
 
        if (userEvents["popupclose"] && !userEvents["popupclose"](handler, e)) {
            return;
        }

        popup.tag.style.display = 'none';
        
        if (KellyColorPicker.activePopUp == handler)
            KellyColorPicker.activePopUp = false;
    }

    // if 'popupshow' user event is setted and return false - prevent show popup default behavior

    this.popUpShow = function (e) {
        if (popup.tag === false)
            return;

        if (userEvents["popupshow"] && !userEvents["popupshow"](handler, e)) {
            return;
        }

        // include once 
        if (!KellyColorPicker.popupEventsInclude) {
            addEventListner(document, "click", function (e) {
                if (KellyColorPicker.activePopUp)
                    return KellyColorPicker.activePopUp.popUpClose(e);
                else
                    return false;
            }, 'popup_close_');
            addEventListner(window, "resize", function (e) {
                if (KellyColorPicker.activePopUp)
                    return KellyColorPicker.activePopUp.popUpShow(e);
            }, 'popup_resize_');
            KellyColorPicker.popupEventsInclude = true;
        }

        if (KellyColorPicker.activePopUp) {
            KellyColorPicker.activePopUp.popUpClose(false);
        }

        var topMargin = handler.getCanvas().width;

        var alpha = handler.getAlphaFig();
        if (alpha) {
            topMargin -= alpha.width + alpha.padding;
        }
        
        var popupStyle = window.getComputedStyle(popup.tag);
        
        var paddingPopup = parseInt(popupStyle.paddingBottom) + parseInt(popupStyle.paddingTop);
        if (paddingPopup <= 0) {
            paddingPopup = 0;
        }

        var viewportOffset = input.getBoundingClientRect();
        var top = viewportOffset.top + (window.scrollY || window.pageYOffset || document.body.scrollTop) - paddingPopup;
        var left = viewportOffset.left + (window.scrollX || window.pageXOffset || document.body.scrollLeft);
        var padding = 6;

        popup.tag.style.top = (top - topMargin - popup.margin) + 'px';
        popup.tag.style.left = left + 'px';
        popup.tag.style.display = 'block';

        KellyColorPicker.activePopUp = handler;
        return false;
    }

    this.setHueByDot = function (dot) {
        var angle = getAngle(dot, wheel.pos) + wheel.startAngle;
        if (angle < 0)
            angle = 360 + angle;

        hsv.h = angle / 360;

        rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
        hex = rgbToHex(rgb);

        updateColorSavers();

        if (userEvents["change"]) {
            var callback = userEvents["change"];
            callback(handler);
        }

        updateInput();

        rendered = false;
        draw();
    };

    this.setColorForColorSaver = function (cString, align) {
        
        var colorData = readColorData(cString, true);
        if (!colorData)
            return;

        var colorSaver = handler.getColorSaver(align);
        if (colorSaver.selected) {
            this.setColorByHex(cString, false);
        } else {
            colorSaver.color = colorData.h;
            draw();
        }

        return true;
    };
    
    this.setColor = function(inputColor, manualEnter) {
        
        // synonym, since setColorByHex already accept color in different formats, not only in hex
        
        handler.setColorByHex(inputColor, manualEnter);
        
    } 

    // update color with redraw canvas and update input hex value
    // now support rgba \ rgb string format input
    // and also hsla \ hsl

    this.setColorByHex = function (inputHex, manualEnter) {

        if (!manualEnter)
            manualEnter = false;
        var inputAlpha = a;

        if (inputHex !== false) {

            if (!inputHex || !inputHex.length)
                return;

            var colorData = readColorData(inputHex, true);
            if (!colorData)
                return;

            inputHex = colorData.h;
            if (alpha)
                inputAlpha = colorData.a;

        } else
            inputHex = hex;

        if (alpha && inputHex == hex && rendered && inputAlpha != a) {
            a = inputAlpha;

            draw(); // slider always redraws in current even if part of canvas buffered
            return;
        }

        if (hex && inputHex == hex && rendered)
            return;

        // set and redraw all

        a = inputAlpha;
        rgb = hexToRgb(inputHex);
        hex = inputHex;
        hsv = rgbToHsv(rgb);

        var dot = svFig.svToDot(hsv);
        hsv.x = dot.x;
        hsv.y = dot.y;

        rendered = false;
        updateColorSavers();
        draw();

        if (userEvents["change"]) {
            var callback = userEvents["change"];
            callback(handler);
        }

        updateInput(manualEnter);
    };

    this.setAlphaByDot = function (dot) {
        a = alphaSlider.dotToAlpha(dot);

        if (userEvents["change"]) {
            var callback = userEvents["change"];
            callback(handler);
        }

        updateInput();
        draw();
    };

    this.setAlpha = function (alpha) {
        a = alpha;
        updateInput();
        draw();
    };

    this.setColorByDot = function (dot) {
        var sv = svFig.dotToSv(dot);

        hsv.s = sv.s;
        hsv.v = sv.v;
        hsv.x = dot.x;
        hsv.y = dot.y;

        if (hsv.s > 1)
            hsv.s = 1;
        if (hsv.s < 0)
            hsv.s = 0;
        if (hsv.v > 1)
            hsv.v = 1;
        if (hsv.v < 0)
            hsv.v = 0;

        rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
        hex = rgbToHex(rgb);

        updateColorSavers();

        if (userEvents["change"]) {
            var callback = userEvents["change"];
            callback(handler);
        }

        updateInput();
        draw();
    };

    this.mouseOutEvent = function (e) {
        if (svCursorMouse.curType > 0 && !KellyColorPicker.cursorLock) {
            svCursorMouse.initStandartCursor();
        }
    };

    // перемещение указателя по canvas в режиме покоя
    this.mouseMoveRest = function (e) {
        if (drag)
            return;

        if (!cursorAnimReady) {
            return;
        }

        cursorAnimReady = false;
        var newDot = getEventDot(e);
        svCursorMouse.updateCursor(newDot);
        requestAnimationFrame(function () {
            cursorAnimReady = true;
        });

        if (userEvents["mousemoverest"]) {
            var callback = userEvents["mousemoverest"];
            callback(e, handler, newDot);
        }
    };

    // to prevent scroll by touches while change color
    // в FireFox под андройд есть "фича" которая скрывает или раскрывает тулбар адресной строки при движении пальцем
    // отключить её можно только через опцию about:config browser.chrome.dynamictoolbar

    this.touchMoveEvent = function (e) {
        if (drag) { // todo check number of touches to ignore zoom action
            event.preventDefault();
        }
    };

    // маршрутизатор событий нажатий на элементы
    this.mouseDownEvent = function (event) {
        event.preventDefault();

        var move, up = false;
        var newDot = getEventDot(event);
        // console.log('mouseDownEvent : cur : ' + newDot.x + ' | ' + newDot.y);

        if (wheel.isDotIn(newDot)) {
            drag = 'wheel';
            handler.setHueByDot(newDot);

            move = function (e) {
                handler.wheelMouseMove(e, newDot);
            };
            up = function (e) {
                KellyColorPicker.cursorLock = false;
                handler.wheelMouseUp(e, newDot);
            };

        } else if (svFig.isDotIn(newDot)) {
            drag = 'sv';
            handler.setColorByDot(newDot);

            move = function (e) {
                handler.svMouseMove(e, newDot);
            };
            up = function (e) {
                KellyColorPicker.cursorLock = false;
                handler.svMouseUp(e, newDot);
            };
        } else if (alpha && alphaSlider.isDotIn(newDot)) {
            drag = 'alpha';
            handler.setAlphaByDot(newDot);

            move = function (e) {
                handler.alphaMouseMove(e, newDot);
            };
            up = function (e) {
                KellyColorPicker.cursorLock = false;
                handler.alphaMouseUp(e, newDot);
            };
        } else if (styleSwitch && styleSwitch.isDotIn(newDot)) {
            handler.setMethod();
        } else if (colorSavers.length) { // here all items with post check of dot in

            for (var i = 0; i <= colorSavers.length - 1; ++i)
            {
                if (colorSavers[i].isDotIn(newDot)) {
                    selectColorSaver(i);
                    break;
                }
            }
        }

        if (move && up) {
            disableEvents();
            KellyColorPicker.cursorLock = handler;
            addEventListner(document, "mouseup", up, 'action_process_');
            addEventListner(document, "mousemove", move, 'action_process_');
            addEventListner(document, "touchend", up, 'action_process_');
            addEventListner(document, "touchmove", move, 'action_process_');
        }
    };

    this.wheelMouseMove = function (event, dot) {
        event.preventDefault();

        if (!drag)
            return;

        if (!cursorAnimReady) {
            return;
        }
        cursorAnimReady = false;
        var newDot = getEventDot(event);

        // console.log('wheelMouseMove : start : ' + dot.x + ' | ' + dot.y + ' cur : ' + newDot.x + ' | ' + newDot.y);
        requestAnimationFrame(function () {
            cursorAnimReady = true;
        });
        //setTimeout(function() {cursorAnimReady = true;}, 1000/30);

        handler.setHueByDot(newDot);

        if (userEvents["mousemoveh"]) {
            var callback = userEvents["mousemoveh"];
            callback(event, handler, newDot);
        }
    };

    this.wheelMouseUp = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;
        //console.log('wheelMouseUp : start : ' + dot.x + ' | ' + dot.y);

        removeEventListener(document, "mouseup", 'action_process_');
        removeEventListener(document, "mousemove", 'action_process_');
        removeEventListener(document, "touchend", 'action_process_');
        removeEventListener(document, "touchmove", 'action_process_');

        enableEvents();
        drag = false;

        rendered = false;
        draw();

        var newDot = getEventDot(event);
        svCursorMouse.updateCursor(newDot);

        if (userEvents["mouseuph"]) {
            var callback = userEvents["mouseuph"];
            callback(event, handler, newDot);
        }
    };

    this.alphaMouseMove = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;

        if (!cursorAnimReady) {
            return;
        }

        cursorAnimReady = false;
        var newDot = getEventDot(event);

        // console.log('svMouseMove : start : ' + dot.x + ' | ' + dot.y + ' cur : ' + newDot.x + ' | ' + newDot.y);

        newDot = alphaSlider.limitDotPosition(newDot);

        requestAnimationFrame(function () {
            cursorAnimReady = true;
        });
        //setTimeout(function() {cursorAnimReady = true;}, 1000/30);

        handler.setAlphaByDot(newDot);

        if (userEvents["mousemovealpha"]) {
            var callback = userEvents["mousemovealpha"];
            callback(event, handler, newDot);
        }
    };

    this.alphaMouseUp = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;

        removeEventListener(document, "mouseup", 'action_process_');
        removeEventListener(document, "mousemove", 'action_process_');
        removeEventListener(document, "touchend", 'action_process_');
        removeEventListener(document, "touchmove", 'action_process_');

        enableEvents();
        drag = false;

        var newDot = getEventDot(event);
        svCursorMouse.updateCursor(newDot);

        if (userEvents["mouseupalpha"]) {
            var callback = userEvents["mouseupalpha"];
            callback(event, handler, newDot);
        }
    };

    this.svMouseMove = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;

        if (!cursorAnimReady) {
            return;
        }

        cursorAnimReady = false;
        var newDot = getEventDot(event);

        // console.log('svMouseMove : start : ' + dot.x + ' | ' + dot.y + ' cur : ' + newDot.x + ' | ' + newDot.y);

        newDot = svFig.limitDotPosition(newDot);

        requestAnimationFrame(function () {
            cursorAnimReady = true;
        });
        //setTimeout(function() {cursorAnimReady = true;}, 1000/30);

        handler.setColorByDot(newDot);

        if (userEvents["mousemovesv"]) {
            var callback = userEvents["mousemovesv"];
            callback(event, handler, newDot);
        }
    };

    this.svMouseUp = function (event, dot) {
        event.preventDefault();
        if (!drag)
            return;

        // console.log('svMouseUp : start : ' + dot.x + ' | ' + dot.y);

        removeEventListener(document, "mouseup", 'action_process_');
        removeEventListener(document, "mousemove", 'action_process_');
        removeEventListener(document, "touchend", 'action_process_');
        removeEventListener(document, "touchmove", 'action_process_');

        enableEvents();
        drag = false;

        var newDot = getEventDot(event);
        svCursorMouse.updateCursor(newDot);
        
        // todo 
        // split cached data for sv + h wheel and slider, so we can redraw alpha slider without performanse lost in svMouseMove
        
        if (alpha) {
            rendered = false;
            draw();
        }
        
        if (userEvents["mouseupsv"]) {
            var callback = userEvents["mouseupsv"];
            callback(event, handler, newDot);
        }
    };

    this.addUserEvent = function (event, callback) {
        userEvents[event] = callback;
        return true;
    };

    this.removeUserEvent = function (event) {
        if (!userEvents[event])
            return false;
        userEvents[event] = null;
        return true;
    };

    // для кастомизации отображения элементов виджета

    this.getCanvas = function () {
        if (!ctx)
            return false;
        return canvas;
    };

    this.getCtx = function () {
        if (!ctx)
            return false;
        return ctx;
    };

    this.getInput = function () {
        return input;
    };
    
    this.getSvFig = function () {
        return svFig;
    };
    
    this.getSvFigCursor = function () {
        return svCursor;
    };

    this.getWheel = function () {
        return wheel;
    };
    
    this.getWheelCursor = function () {
        return wheelCursor;
    };

    this.getCurColorHsv = function () {
        return hsv;
    };
    
    this.getCurColorRgb = function () {
        return rgb;
    };
    
    this.getCurColorHex = function () {
        return hex;
    };
    
    this.getCurColorRgba = function () {
        return {r: rgb.r, g: rgb.g, b: rgb.b, a: a};
    };
    
    this.getCurAlpha = function () {
        return a;
    };
    
    this.getAlphaFig = function () {
        if (alpha)
            return alphaSlider;
        else
            return false;
    }

    this.getPopup = function () {
        return popup;
    };
    
    this.getSize = function () {
        return wheelBlockSize;
    };

    // if align not setted get selected
    this.getColorSaver = function (align) {
        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if ((!align && colorSavers[i].selected) || colorSavers[i].align == align) {
                colorSavers[i].rgb = hexToRgb(colorSavers[i].color);
                colorSavers[i].hsv = rgbToHsv(colorSavers[i].rgb.r, colorSavers[i].rgb.g, colorSavers[i].rgb.b);
                return colorSavers[i];
            }
        }
    };

    this.setColorSaver = function (align) {

        if (!align)
            return false;

        for (var i = 0; i <= colorSavers.length - 1; ++i)
        {
            if (colorSavers[i].align == align) {
                selectColorSaver(i);
                return colorSavers[i];
            }
        }
    }

    this.updateView = function (dropBuffer) {
        if (!ctx)
            return false;

        if (dropBuffer) {
            wheel.imageData = null;
            svFig.imageData = null;
            canvasHelperData = null;
        }

        rendered = false;
        updateSize();
        draw();
        return true;
    };

    // resize canvas, with all data \ full refresh view
    // if size same as current and refresh variable setted to true - refresh current view anyway
    // othervise exit with return true

    this.resize = function (size, refresh) {
        if (!ctx)
            return false;
        if (size == wheelBlockSize && !refresh)
            return true;

        rendered = false;
        wheel.imageData = null;
        svFig.imageData = null;
        canvasHelperData = null;
        wheelBlockSize = size;
        updateSize();

        handler.setColorByHex(false);
        return false;
    };

    this.syncSize = function (e) {

        if (!resizeWith)
            return false;

        var newSize = getSizeByElement(resizeWith);
        if (newSize)
            handler.resize(newSize);
        return false;
    }

    this.setMethod = function (newMethod) {
        if (!newMethod) {
            newMethod = 'triangle';
            if (method == 'triangle')
                newMethod = 'quad';
        }

        if (newMethod == method)
            return false;
        if (method != 'quad' && method != 'triangle')
            return false;

        method = newMethod;

        if (method == 'quad')
            svFig = getSvFigureQuad();
        if (method == 'triangle')
            svFig = getSvFigureTriangle();

        handler.resize(wheelBlockSize, true);

        if (userEvents["setmethod"]) {
            var callback = userEvents["setmethod"];
            callback(handler, method);
        }

        return true;
    }

    // restore color of input ? 

    this.destroy = function () {
        if (!handler) {
            return false;
        }

        if (svCursorMouse.curType > 0) {
            KellyColorPicker.cursorLock = false;
            svCursorMouse.initStandartCursor();
        }

        if (drag) {
            removeEventListener(document, "mouseup", 'action_process_');
            removeEventListener(document, "mousemove", 'action_process_');
            removeEventListener(document, "touchend", 'action_process_');
            removeEventListener(document, "touchmove", 'action_process_');

            drag = false;
        }

        if (popup.tag) {
            removeEventListener(input, "click", "popup_");
        }

        if (input) {
            removeEventListener(input, "click", 'input_edit_');
            removeEventListener(input, "change", 'input_edit_');
            removeEventListener(input, "keyup", 'input_edit_');
            removeEventListener(input, "keypress", 'input_edit_');
        }

        // remove popup close and resize events if this picker include them erlier
        if (KellyColorPicker.popupEventsInclude && events['popup_close_click']) {
            if (KellyColorPicker.activePopUp)
                KellyColorPicker.activePopUp.popUpClose(false);

            removeEventListener(document, "click", 'popup_close_');
            removeEventListener(window, "resize", 'popup_resize_');

            KellyColorPicker.popupEventsInclude = false;
        }

        wheel.imageData = null;
        svFig.imageData = null;
        canvasHelperData = null;
        canvasHelper = null;

        if (place && place.parentNode) {
            place.parentNode.removeChild(place);
        }

        if (resizeWith) {
            removeEventListener(window, "resize", 'canvas_');
        }

        disableEvents(); // remove canvas events		

        // debug test for check is all events removed 
        // for (var key in events) {
        // 	console.log('key : ' +  key + ' data ' + events[key]);
        // }

        handler = null;
    };

    constructor(cfg);
}

/* static methods */

/**
 * Тригер для объектов KellyColorPicker, чтобы не сбрасывали стиль курсора при наведении если уже идет выбор цвета
 * Notice : при выходе курсора за границы текущего canvas, событие неизвестного объекта всегда может сбросить изображение курсора
 */

KellyColorPicker.cursorLock = false; // можно указывать handler объекта
KellyColorPicker.activePopUp = false;
KellyColorPicker.popupEventsInclude = false; // include events for document and window once for all elements

KellyColorPicker.attachToInputByClass = function (className, cfg) {

    var colorPickers = new Array();
    var inputs = document.getElementsByClassName(className);


    for (var i = 0; i < inputs.length; i++) {

        if (cfg)
            cfg.input = inputs[i];
        else
            cfg = {input: inputs[i], size: 150};

        colorPickers.push(new KellyColorPicker(cfg));
    }

    return colorPickers;
};

// KellyColorPicker.dragTrigger = false;

var tabWebCol0=[
 ['F0F8FFAliceBlue'      , ['0' , ''            ,  'black']],
 ['FAEBD7AntiqueWhite'   , ['0' , ''            ,  'black']],
 ['00FFFFAqua'           , ['1' , 'Aqua = cyan' ,  'black']],
 ['7FFFD4Aquamarine'     , ['0' , ''            ,  'black']],
 ['F0FFFFAzure'          , ['0' , ''            ,  'black']],
 ['F5F5DCBeige'          , ['0' , ''            ,  'black']],
 ['FFE4C4Bisque'         , ['0' , '' ,  'black']],
 ['000000Black'          , ['1' , '' ,  'white']],
 ['FFEBCDBlanchedAlmond' , ['0' , '' ,  'black']],
 ['0000FFBlue'           , ['1' , '' ,  'white']],
 ['8A2BE2BlueViolet'     , ['0' , '' ,  'black']],
 ['A52A2ABrown'          , ['0' , '' ,  'black']],
 ['DEB887BurlyWood'      , ['0' , '' ,  'black']],
 ['5F9EA0CadetBlue',['0' , '' ,  'black']],
 ['7FFF00Chartreuse',['0' , '' ,  'black']],
 ['D2691EChocolate',['0' , '' ,  'black']],
 ['FF7F50Coral',['0' , '' ,  'white']],
 ['6495EDCornflowerBlue',['0' , '' ,  'black']],
 ['FFF8DCCornsilk',['0' , '' ,  'black']],
 ['DC143CCrimson',['0' , '' ,  'black']],
 ['00FFFFCyan',['1' , 'Aqua = cyan' ,  'black']],
 ['00008BDarkBlue',['0' , '' ,  'white']],
 ['008B8BDarkCyan',['0' , '' ,  'white']],
 ['B8860BDarkGoldenRod',['0' , '' ,  'black']],
 ['A9A9A9DarkGray',['0' , '' ,  'black']],
 ['006400DarkGreen',['0' , '' ,  'white']],
 ['BDB76BDarkKhaki',['0' , '' ,  'black']],
 ['8B008BDarkMagenta',['0' , '' ,  'white']],
 ['556B2FDarkOliveGreen',['0' , '' ,  'black']],
 ['FF8C00Darkorange',['0' , '' ,  'white']],
 ['9932CCDarkOrchid',['0' , '' ,  'white']],
 ['8B0000DarkRed',['0' , '' ,  'white']],
 ['E9967ADarkSalmon',['0' , '' ,  'black']],
 ['8FBC8FDarkSeaGreen',['0' , '' ,  'black']],
 ['483D8BDarkSlateBlue',['0' , '' ,  'white']],
 ['2F4F4FDarkSlateGray',['0' , '' ,  'white']],
 ['00CED1DarkTurquoise',['0' , '' ,  'white']],
 ['9400D3DarkViolet',['0' , '' ,  'black']],
 ['FF1493DeepPink',['0' , '' ,  'white']],
 ['00BFFFDeepSkyBlue',['0' , '' ,  'black']],
 ['696969DimGray',['0' , '' ,  'black']],
 ['1E90FFDodgerBlue',['0' , '' ,  'black']],
 ['B22222FireBrick',['0' , '' ,  'black']],
 ['FFFAF0FloralWhite',['0' , '' ,  'black']],
 ['228B22ForestGreen',['0' , '' ,  'black']],
 ['FF00FFFuchsia',['1' , 'Fuchsia = Magenta' ,  'white']],
 ['DCDCDCGainsboro',['0' , '' ,  'black']],
 ['F8F8FFGhostWhite',['0' , '' ,  'black']],
 ['FFD700Gold',['0' , '' ,  'black']],
 ['DAA520GoldenRod',['0' , '' ,  'black']],
 ['808080Gray',['0' , '' ,  'black']],
 ['008000Green',['0' , '' ,  'white']],
 ['ADFF2FGreenYellow',['0' , '' ,  'black']],
 ['F0FFF0HoneyDew',['0' , '' ,  'black']],
 ['FF69B4HotPink',['0' , '' ,  'white']],
 ['CD5C5CIndianRed ',['0' , '' ,  'black']],
 ['4B0082Indigo ',['0' , '' ,  'white']],
 ['FFFFF0Ivory',['0' , '' ,  'black']],
 ['F0E68CKhaki',['0' , '' ,  'black']],
 ['E6E6FALavender',['0' , '' ,  'black']],
 ['FFF0F5LavenderBlush',['0' , '' ,  'black']],
 ['7CFC00LawnGreen',['0' , '' ,  'black']],
 ['FFFACDLemonChiffon',['0' , '' ,  'black']],
 ['ADD8E6LightBlue',['0' , '' ,  'black']],
 ['F08080LightCoral',['0' , '' ,  'black']],
 ['E0FFFFLightCyan',['0' , '' ,  'black']],
 ['FAFAD2LightGoldenRodYellow',['0' , '' ,  'black']],
 ['D3D3D3LightGrey',['0' , '' ,  'black']],
 ['90EE90LightGreen',['0' , '' ,  'black']],
 ['FFB6C1LightPink',['0' , '' ,  'black']],
 ['FFA07ALightSalmon',['0' , '' ,  'black']],
 ['20B2AALightSeaGreen',['0' , '' ,  'black']],
 ['87CEFALightSkyBlue',['0' , '' ,  'black']],
 ['778899LightSlateGray',['0' , '' ,  'black']],
 ['B0C4DELightSteelBlue',['0' , '' ,  'black']],
 ['FFFFE0LightYellow',['0' , '' ,  'black']],
 ['00FF00Lime',['1' , '' ,  'black']],
 ['32CD32LimeGreen',['0' , '' ,  'black']],
 ['FAF0E6Linen',['0' , '' ,  'black']],
 ['FF00FFMagenta',['1' , 'Fuchsia = Magenta' ,  'white']],
 ['800000Maroon',['0' , '' ,  'white']],
 ['66CDAAMediumAquaMarine',['0' , '' ,  'black']],
 ['0000CDMediumBlue',['0' , '' ,  'white']],
 ['BA55D3MediumOrchid',['0' , '' ,  'black']],
 ['9370D8MediumPurple',['0' , '' ,  'black']],
 ['3CB371MediumSeaGreen',['0' , '' ,  'black']],
 ['7B68EEMediumSlateBlue',['0' , '' ,  'black']],
 ['00FA9AMediumSpringGreen',['0' , '' ,  'black']],
 ['48D1CCMediumTurquoise',['0' , '' ,  'black']],
 ['C71585MediumVioletRed',['0' , '' ,  'black']],
 ['191970MidnightBlue',['0' , '' ,  'white']],
 ['F5FFFAMintCream',['0' , '' ,  'black']],
 ['FFE4E1MistyRose',['0' , '' ,  'black']],
 ['FFE4B5Moccasin',['0' , '' ,  'black']],
 ['FFDEADNavajoWhite',['0' , '' ,  'black']],
 ['000080Navy',['0' , '' ,  'white']],
 ['FDF5E6OldLace',['0' , '' ,  'black']],
 ['808000Olive',['0' , '' ,  'black']],
 ['6B8E23OliveDrab',['0' , '' ,  'black']],
 ['FFA500Orange',['0' , '' ,  'black']],
 ['FF4500OrangeRed',['0' , '' ,  'white']],
 ['DA70D6Orchid',['0' , '' ,  'black']],
 ['EEE8AAPaleGoldenRod',['0' , '' ,  'black']],
 ['98FB98PaleGreen',['0' , '' ,  'black']],
 ['AFEEEEPaleTurquoise',['0' , '' ,  'black']],
 ['D87093PaleVioletRed',['0' , '' ,  'black']],
 ['FFEFD5PapayaWhip',['0' , '' ,  'black']],
 ['FFDAB9PeachPuff',['0' , '' ,  'black']],
 ['CD853FPeru',['0' , '' ,  'black']],
 ['FFC0CBPink',['0' , '' ,  'black']],
 ['DDA0DDPlum',['0' , '' ,  'black']],
 ['B0E0E6PowderBlue',['0' , '' ,  'black']],
 ['800080Purple',['0' , '' ,  'white']],
 ['FF0000Red',['1' , '' ,  'white']],
 ['BC8F8FRosyBrown',['0' , '' ,  'black']],
 ['4169E1RoyalBlue',['0' , '' ,  'black']],
 ['8B4513SaddleBrown',['0' , '' ,  'black']],
 ['FA8072Salmon',['0' , '' ,  'black']],
 ['F4A460SandyBrown',['0' , '' ,  'black']],
 ['2E8B57SeaGreen',['0' , '' ,  'black']],
 ['FFF5EESeaShell',['0' , '' ,  'black']],
 ['A0522DSienna',['0' , '' ,  'black']],
 ['C0C0C0Silver',['0' , '' ,  'black']],
 ['87CEEBSkyBlue',['0' , '' ,  'black']],
 ['6A5ACDSlateBlue',['0' , '' ,  'black']],
 ['708090SlateGray',['0' , '' ,  'black']],
 ['FFFAFASnow',['0' , '' ,  'black']],
 ['00FF7FSpringGreen',['0' , '' ,  'black']],
 ['4682B4SteelBlue',['0' , '' ,  'black']],
 ['D2B48CTan',['0' , '' ,  'black']],
 ['008080Teal',['0' , '' ,  'white']],
 ['D8BFD8Thistle',['0' , '' ,  'black']],
 ['FF6347Tomato',['0' , '' ,  'white']],
 ['40E0D0Turquoise',['0' , '' ,  'black']],
 ['EE82EEViolet',['0' , '' ,  'black']],
 ['F5DEB3Wheat',['0' , '' ,  'black']],
 ['FFFFFFWhite',['1' , '' ,  'black']],
 ['F5F5F5WhiteSmoke',['0' , '' ,  'black']],
 ['FFFF00Yellow',['1' , '' ,  'black']],
 ['9ACD32YellowGreen',['0' , '' ,  'black']],
 ['000000',['1' , '' ,  'white']],
 ['003300',['0' , '' ,  'white']],
 ['006600',['0' , '' ,  'white']],
 ['009900',['0' , '' ,  'black']],
 ['00CC00',['0' , '' ,  'black']],
 ['00FF00',['1' , '' ,  'black']],
 ['330000',['0' , '' ,  'white']],
 ['333300',['0' , '' ,  'white']],
 ['336600',['0' , '' ,  'white']],
 ['339900',['0' , '' ,  'black']],
 ['33CC00',['0' , '' ,  'black']],
 ['33FF00',['0' , '' ,  'black']],
 ['660000',['0' , '' ,  'white']],
 ['663300',['0' , '' ,  'white']],
 ['666600',['0' , '' ,  'white']],
 ['669900',['0' , '' ,  'black']],
 ['66CC00',['0' , '' ,  'black']],
 ['66FF00',['0' , '' ,  'black']],
 ['990000',['0' , '' ,  'white']],
 ['993300',['0' , '' ,  'white']],
 ['996600',['0' , '' ,  'white']],
 ['999900',['0' , '' ,  'black']],
 ['99CC00',['0' , '' ,  'black']],
 ['99FF00',['0' , '' ,  'black']],
 ['CC0000',['0' , '' ,  'white']],
 ['CC3300',['0' , '' ,  'white']],
 ['CC6600',['0' , '' ,  'white']],
 ['CC9900',['0' , '' ,  'black']],
 ['CCCC00',['0' , '' ,  'black']],
 ['CCFF00',['0' , '' ,  'black']],
 ['FF0000',['1' , '' ,  'white']],
 ['FF3300',['0' , '' ,  'white']],
 ['FF6600',['0' , '' ,  'white']],
 ['FF9900',['0' , '' ,  'black']],
 ['FFCC00',['0' , '' ,  'black']],
 ['FFFF00',['1' , '' ,  'black']],
 ['000033',['0' , '' ,  'white']],
 ['003333',['0' , '' ,  'white']],
 ['006633',['0' , '' ,  'white']],
 ['009933',['0' , '' ,  'black']],
 ['00CC33',['0' , '' ,  'black']],
 ['00FF33',['0' , '' ,  'black']],
 ['330033',['0' , '' ,  'white']],
 ['333333',['0' , '' ,  'white']],
 ['336633',['0' , '' ,  'white']],
 ['339933',['0' , '' ,  'black']],
 ['33CC33',['0' , '' ,  'black']],
 ['33FF33',['0' , '' ,  'black']],
 ['660033',['0' , '' ,  'white']],
 ['663333',['0' , '' ,  'white']],
 ['666633',['0' , '' ,  'white']],
 ['669933',['0' , '' ,  'black']],
 ['66CC33',['0' , '' ,  'black']],
 ['66FF33',['0' , '' ,  'black']],
 ['990033',['0' , '' ,  'white']],
 ['993333',['0' , '' ,  'white']],
 ['996633',['0' , '' ,  'white']],
 ['999933',['0' , '' ,  'black']],
 ['99CC33',['0' , '' ,  'black']],
 ['99FF33',['0' , '' ,  'black']],
 ['CC0033',['0' , '' ,  'white']],
 ['CC3333',['0' , '' ,  'white']],
 ['CC6633',['0' , '' ,  'white']],
 ['CC9933',['0' , '' ,  'black']],
 ['CCCC33',['0' , '' ,  'black']],
 ['CCFF33',['0' , '' ,  'black']],
 ['FF0033',['0' , '' ,  'white']],
 ['FF3333',['0' , '' ,  'white']],
 ['FF6633',['0' , '' ,  'white']],
 ['FF9933',['0' , '' ,  'black']],
 ['FFCC33',['0' , '' ,  'black']],
 ['FFFF33',['0' , '' ,  'black']],
 ['000066',['0' , '' ,  'white']],
 ['003366',['0' , '' ,  'white']],
 ['006666',['0' , '' ,  'white']],
 ['009966',['0' , '' ,  'black']],
 ['00CC66',['0' , '' ,  'black']],
 ['00FF66',['0' , '' ,  'black']],
 ['330066',['0' , '' ,  'white']],
 ['333366',['0' , '' ,  'white']],
 ['336666',['0' , '' ,  'white']],
 ['339966',['0' , '' ,  'black']],
 ['33CC66',['0' , '' ,  'black']],
 ['33FF66',['0' , '' ,  'black']],
 ['660066',['0' , '' ,  'white']],
 ['663366',['0' , '' ,  'white']],
 ['666666',['0' , '' ,  'white']],
 ['669966',['0' , '' ,  'black']],
 ['66CC66',['0' , '' ,  'black']],
 ['66FF66',['0' , '' ,  'black']],
 ['990066',['0' , '' ,  'white']],
 ['993366',['0' , '' ,  'white']],
 ['996666',['0' , '' ,  'white']],
 ['999966',['0' , '' ,  'black']],
 ['99CC66',['0' , '' ,  'black']],
 ['99FF66',['0' , '' ,  'black']],
 ['CC0066',['0' , '' ,  'white']],
 ['CC3366',['0' , '' ,  'white']],
 ['CC6666',['0' , '' ,  'white']],
 ['CC9966',['0' , '' ,  'black']],
 ['CCCC66',['0' , '' ,  'black']],
 ['CCFF66',['0' , '' ,  'black']],
 ['FF0066',['0' , '' ,  'white']],
 ['FF3366',['0' , '' ,  'white']],
 ['FF6666',['0' , '' ,  'white']],
 ['FF9966',['0' , '' ,  'black']],
 ['FFCC66',['0' , '' ,  'black']],
 ['FFFF66',['0' , '' ,  'black']],
 ['000099',['0' , '' ,  'white']],
 ['003399',['0' , '' ,  'white']],
 ['006699',['0' , '' ,  'white']],
 ['009999',['0' , '' ,  'black']],
 ['00CC99',['0' , '' ,  'black']],
 ['00FF99',['0' , '' ,  'black']],
 ['330099',['0' , '' ,  'white']],
 ['333399',['0' , '' ,  'white']],
 ['336699',['0' , '' ,  'white']],
 ['339999',['0' , '' ,  'black']],
 ['33CC99',['0' , '' ,  'black']],
 ['33FF99',['0' , '' ,  'black']],
 ['660099',['0' , '' ,  'white']],
 ['663399',['0' , '' ,  'white']],
 ['666699',['0' , '' ,  'white']],
 ['669999',['0' , '' ,  'black']],
 ['66CC99',['0' , '' ,  'black']],
 ['66FF99',['0' , '' ,  'black']],
 ['990099',['0' , '' ,  'white']],
 ['993399',['0' , '' ,  'white']],
 ['996699',['0' , '' ,  'white']],
 ['999999',['0' , '' ,  'black']],
 ['99CC99',['0' , '' ,  'black']],
 ['99FF99',['0' , '' ,  'black']],
 ['CC0099',['0' , '' ,  'white']],
 ['CC3399',['0' , '' ,  'white']],
 ['CC6699',['0' , '' ,  'white']],
 ['CC9999',['0' , '' ,  'black']],
 ['CCCC99',['0' , '' ,  'black']],
 ['CCFF99',['0' , '' ,  'black']],
 ['FF0099',['0' , '' ,  'white']],
 ['FF3399',['0' , '' ,  'white']],
 ['FF6699',['0' , '' ,  'white']],
 ['FF9999',['0' , '' ,  'black']],
 ['FFCC99',['0' , '' ,  'black']],
 ['FFFF99',['0' , '' ,  'black']],
 ['0000CC',['0' , '' ,  'white']],
 ['0033CC',['0' , '' ,  'white']],
 ['0066CC',['0' , '' ,  'white']],
 ['0099CC',['0' , '' ,  'black']],
 ['00CCCC',['0' , '' ,  'black']],
 ['00FFCC',['0' , '' ,  'black']],
 ['3300CC',['0' , '' ,  'white']],
 ['3333CC',['0' , '' ,  'white']],
 ['3366CC',['0' , '' ,  'white']],
 ['3399CC',['0' , '' ,  'black']],
 ['33CCCC',['0' , '' ,  'black']],
 ['33FFCC',['0' , '' ,  'black']],
 ['6600CC',['0' , '' ,  'white']],
 ['6633CC',['0' , '' ,  'white']],
 ['6666CC',['0' , '' ,  'white']],
 ['6699CC',['0' , '' ,  'black']],
 ['66CCCC',['0' , '' ,  'black']],
 ['66FFCC',['0' , '' ,  'black']],
 ['9900CC',['0' , '' ,  'white']],
 ['9933CC',['0' , '' ,  'white']],
 ['9966CC',['0' , '' ,  'white']],
 ['9999CC',['0' , '' ,  'black']],
 ['99CCCC',['0' , '' ,  'black']],
 ['99FFCC',['0' , '' ,  'black']],
 ['CC00CC',['0' , '' ,  'white']],
 ['CC33CC',['0' , '' ,  'white']],
 ['CC66CC',['0' , '' ,  'white']],
 ['CC99CC',['0' , '' ,  'black']],
 ['CCCCCC',['0' , '' ,  'black']],
 ['CCFFCC',['0' , '' ,  'black']],
 ['FF00CC',['0' , '' ,  'white']],
 ['FF33CC',['0' , '' ,  'white']],
 ['FF66CC',['0' , '' ,  'white']],
 ['FF99CC',['0' , '' ,  'black']],
 ['FFCCCC',['0' , '' ,  'black']],
 ['FFFFCC',['0' , '' ,  'black']],
 ['0000FF',['1' , '' ,  'white']],
 ['0033FF',['0' , '' ,  'white']],
 ['0066FF',['0' , '' ,  'white']],
 ['0099FF',['0' , '' ,  'black']],
 ['00CCFF',['0' , '' ,  'black']],
 ['00FFFF',['1' , '' ,  'black']],
 ['3300FF',['0' , '' ,  'white']],
 ['3333FF',['0' , '' ,  'white']],
 ['3366FF',['0' , '' ,  'white']],
 ['3399FF',['0' , '' ,  'black']],
 ['33CCFF',['0' , '' ,  'black']],
 ['33FFFF',['0' , '' ,  'black']],
 ['6600FF',['0' , '' ,  'white']],
 ['6633FF',['0' , '' ,  'white']],
 ['6666FF',['0' , '' ,  'white']],
 ['6699FF',['0' , '' ,  'black']],
 ['66CCFF',['0' , '' ,  'black']],
 ['66FFFF',['0' , '' ,  'black']],
 ['9900FF',['0' , '' ,  'white']],
 ['9933FF',['0' , '' ,  'white']],
 ['9966FF',['0' , '' ,  'white']],
 ['9999FF',['0' , '' ,  'black']],
 ['99CCFF',['0' , '' ,  'black']],
 ['99FFFF',['0' , '' ,  'black']],
 ['CC00FF',['0' , '' ,  'white']],
 ['CC33FF',['0' , '' ,  'white']],
 ['CC66FF',['0' , '' ,  'white']],
 ['CC99FF',['0' , '' ,  'black']],
 ['CCCCFF',['0' , '' ,  'black']],
 ['CCFFFF',['0' , '' ,  'black']],
 ['FF00FF',['1' , '' ,  'white']],
 ['FF33FF',['0' , '' ,  'white']],
 ['FF66FF',['0' , '' ,  'white']],
 ['FF99FF',['0' , '' ,  'black']],
 ['FFCCFF',['0' , '' ,  'black']],
 ['FFFFFF',['1' , '' ,  'black']]
];

var tabMaterial=[
 ['Red','50','#FFEBEE','black'],
 ['Red','100','#FFCDD2','black'],
 ['Red','200','#EF9A9A','black'],
 ['Red','300','#E57373','black'],
 ['Red','400','#EF5350','black'],
 ['Red','500','#F44336','black'],
 ['Red','600','#E53935','black'],
 ['Red','700','#D32F2F','black'],
 ['Red','800','#C62828','black'],
 ['Red','900','#B71C1C','black'],
 ['Red','A100','#FF8A80','black'],
 ['Red','A200','#FF5252','black'],
 ['Red','A400','#FF1744','black'],
 ['Red','A700','#D50000','black'],
 ['Pink','50','#FCE4EC','black'],
 ['Pink','100','#F8BBD0','black'],
 ['Pink','200','#F48FB1','black'],
 ['Pink','300','#F06292','black'],
 ['Pink','400','#EC407A','black'],
 ['Pink','500','#E91E63','black'],
 ['Pink','600','#D81B60','black'],
 ['Pink','700','#C2185B','black'],
 ['Pink','800','#AD1457','black'],
 ['Pink','900','#880E4F','white'],
 ['Pink','A100','#FF80AB','black'],
 ['Pink','A200','#FF4081','black'],
 ['Pink','A400','#F50057','black'],
 ['Pink','A700','#C51162','white'],
 ['Purple','50','#F3E5F5','black'],
 ['Purple','100','#E1BEE7','black'],
 ['Purple','200','#CE93D8','black'],
 ['Purple','300','#BA68C8','black'],
 ['Purple','400','#AB47BC','black'],
 ['Purple','500','#9C27B0','black'],
 ['Purple','600','#8E24AA','black'],
 ['Purple','700','#7B1FA2','white'],
 ['Purple','800','#6A1B9A','white'],
 ['Purple','900','#4A148C','white'],
 ['Purple','A100','#EA80FC','black'],
 ['Purple','A200','#E040FB','black'],
 ['Purple','A400','#D500F9','black'],
 ['Purple','A700','#AA00FF','black'],
 ['Deep purple','50','#EDE7F6','black'],
 ['Deep purple','100','#D1C4E9','black'],
 ['Deep purple','200','#B39DDB','black'],
 ['Deep purple','300','#9575CD','black'],
 ['Deep purple','400','#7E57C2','white'],
 ['Deep purple','500','#673AB7','white'],
 ['Deep purple','600','#5E35B1','white'],
 ['Deep purple','700','#512DA8','white'],
 ['Deep purple','800','#4527A0','white'],
 ['Deep purple','900','#311B92','white'],
 ['Deep purple','A100','#B388FF','black'],
 ['Deep purple','A200','#7C4DFF','black'],
 ['Deep purple','A400','#651FFF','white'],
 ['Deep purple','A700','#6200EA','white'],
 ['Indigo','50','#E8EAF6','black'],
 ['Indigo','100','#C5CAE9','black'],
 ['Indigo','200','#9FA8DA','black'],
 ['Indigo','300','#7986CB','black'],
 ['Indigo','400','#5C6BC0','white'],
 ['Indigo','500','#3F51B5','white'],
 ['Indigo','600','#3949AB','white'],
 ['Indigo','700','#303F9F','white'],
 ['Indigo','800','#283593','white'],
 ['Indigo','900','#1A237E','white'],
 ['Indigo','A100','#8C9EFF','black'],
 ['Indigo','A200','#536DFE','black'],
 ['Indigo','A400','#3D5AFE','white'],
 ['Indigo','A700','#304FFE','white'],
 ['Blue','50','#E3F2FD','black'],
 ['Blue','100','#BBDEFB','black'],
 ['Blue','200','#90CAF9','black'],
 ['Blue','300','#64B5F6','black'],
 ['Blue','400','#42A5F5','black'],
 ['Blue','500','#2196F3','black'],
 ['Blue','600','#1E88E5','black'],
 ['Blue','700','#1976D2','black'],
 ['Blue','800','#1565C0','black'],
 ['Blue','900','#0D47A1','white'],
 ['Blue','A100','#82B1FF','black'],
 ['Blue','A200','#448AFF','black'],
 ['Blue','A400','#2979FF','black'],
 ['Blue','A700','#2962FF','white'],
 ['Light blue','50','#E1F5FE','black'],
 ['Light blue','100','#B3E5FC','black'],
 ['Light blue','200','#81D4FA','black'],
 ['Light blue','300','#4FC3F7','black'],
 ['Light blue','400','#29B6F6','black'],
 ['Light blue','500','#03A9F4','black'],
 ['Light blue','600','#039BE5','black'],
 ['Light blue','700','#0288D1','black'],
 ['Light blue','800','#0277BD','black'],
 ['Light blue','900','#01579B','white'],
 ['Light blue','A100','#80D8FF','black'],
 ['Light blue','A200','#40C4FF','black'],
 ['Light blue','A400','#00B0FF','black'],
 ['Light blue','A700','#0091EA','black'],
 ['Cyan','50','#E0F7FA','black'],
 ['Cyan','100','#B2EBF2','black'],
 ['Cyan','200','#80DEEA','black'],
 ['Cyan','300','#4DD0E1','black'],
 ['Cyan','400','#26C6DA','black'],
 ['Cyan','500','#00BCD4','black'],
 ['Cyan','600','#00ACC1','black'],
 ['Cyan','700','#0097A7','black'],
 ['Cyan','800','#00838F','black'],
 ['Cyan','900','#006064','white'],
 ['Cyan','A100','#84FFFF','black'],
 ['Cyan','A200','#18FFFF','black'],
 ['Cyan','A400','#00E5FF','black'],
 ['Cyan','A700','#00B8D4','black'],
 ['Teal','50','#E0F2F1','black'],
 ['Teal','100','#B2DFDB','black'],
 ['Teal','200','#80CBC4','black'],
 ['Teal','300','#4DB6AC','black'],
 ['Teal','400','#26A69A','black'],
 ['Teal','500','#009688','white'],
 ['Teal','600','#00897B','white'],
 ['Teal','700','#00796B','white'],
 ['Teal','800','#00695C','white'],
 ['Teal','900','#004D40','white'],
 ['Teal','A100','#A7FFEB','black'],
 ['Teal','A200','#64FFDA','black'],
 ['Teal','A400','#1DE9B6','black'],
 ['Teal','A700','#00BFA5','black'],
 ['Green','50','#E8F5E9','black'],
 ['Green','100','#C8E6C9','black'],
 ['Green','200','#A5D6A7','black'],
 ['Green','300','#81C784','black'],
 ['Green','400','#66BB6A','black'],
 ['Green','500','#4CAF50','black'],
 ['Green','600','#43A047','black'],
 ['Green','700','#388E3C','black'],
 ['Green','800','#2E7D32','white'],
 ['Green','900','#1B5E20','white'],
 ['Green','A100','#B9F6CA','black'],
 ['Green','A200','#69F0AE','black'],
 ['Green','A400','#00E676','black'],
 ['Green','A700','#00C853','black'],
 ['Light green','50','#F1F8E9','black'],
 ['Light green','100','#DCEDC8','black'],
 ['Light green','200','#C5E1A5','black'],
 ['Light green','300','#AED581','black'],
 ['Light green','400','#9CCC65','black'],
 ['Light green','500','#8BC34A','black'],
 ['Light green','600','#7CB342','black'],
 ['Light green','700','#689F38','black'],
 ['Light green','800','#558B2F','black'],
 ['Light green','900','#33691E','white'],
 ['Light green','A100','#CCFF90','black'],
 ['Light green','A200','#B2FF59','black'],
 ['Light green','A400','#76FF03','black'],
 ['Light green','A700','#64DD17','black'],
 ['Lime','50','#F9FBE7','black'],
 ['Lime','100','#F0F4C3','black'],
 ['Lime','200','#E6EE9C','black'],
 ['Lime','300','#DCE775','black'],
 ['Lime','400','#D4E157','black'],
 ['Lime','500','#CDDC39','black'],
 ['Lime','600','#C0CA33','black'],
 ['Lime','700','#AFB42B','black'],
 ['Lime','800','#9E9D24','black'],
 ['Lime','900','#827717','black'],
 ['Lime','A100','#F4FF81','black'],
 ['Lime','A200','#EEFF41','black'],
 ['Lime','A400','#C6FF00','black'],
 ['Lime','A700','#AEEA00','black'],
 ['Yellow','50','#FFFDE7','black'],
 ['Yellow','100','#FFF9C4','black'],
 ['Yellow','200','#FFF59D','black'],
 ['Yellow','300','#FFF176','black'],
 ['Yellow','400','#FFEE58','black'],
 ['Yellow','500','#FFEB3B','black'],
 ['Yellow','600','#FDD835','black'],
 ['Yellow','700','#FBC02D','black'],
 ['Yellow','800','#F9A825','black'],
 ['Yellow','900','#F57F17','black'],
 ['Yellow','A100','#FFFF8D','black'],
 ['Yellow','A200','#FFFF00','black'],
 ['Yellow','A400','#FFEA00','black'],
 ['Yellow','A700','#FFD600','black'],
 ['Amber','50','#FFF8E1','black'],
 ['Amber','100','#FFECB3','black'],
 ['Amber','200','#FFE082','black'],
 ['Amber','300','#FFD54F','black'],
 ['Amber','400','#FFCA28','black'],
 ['Amber','500','#FFC107','black'],
 ['Amber','600','#FFB300','black'],
 ['Amber','700','#FFA000','black'],
 ['Amber','800','#FF8F00','black'],
 ['Amber','900','#FF6F00','black'],
 ['Amber','A100','#FFE57F','black'],
 ['Amber','A200','#FFD740','black'],
 ['Amber','A400','#FFC400','black'],
 ['Amber','A700','#FFAB00','black'],
 ['Orange','50','#FFF3E0','black'],
 ['Orange','100','#FFE0B2','black'],
 ['Orange','200','#FFCC80','black'],
 ['Orange','300','#FFB74D','black'],
 ['Orange','400','#FFA726','black'],
 ['Orange','500','#FF9800','black'],
 ['Orange','600','#FB8C00','black'],
 ['Orange','700','#F57C00','black'],
 ['Orange','800','#EF6C00','black'],
 ['Orange','900','#E65100','black'],
 ['Orange','A100','#FFD180','black'],
 ['Orange','A200','#FFAB40','black'],
 ['Orange','A400','#FF9100','black'],
 ['Orange','A700','#FF6D00','black'],
 ['Deep Orange','50','#FBE9E7','black'],
 ['Deep Orange','100','#FFCCBC','black'],
 ['Deep Orange','200','#FFAB91','black'],
 ['Deep Orange','300','#FF8A65','black'],
 ['Deep Orange','400','#FF7043','black'],
 ['Deep Orange','500','#FF5722','black'],
 ['Deep Orange','600','#F4511E','black'],
 ['Deep Orange','700','#E64A19','black'],
 ['Deep Orange','800','#D84315','black'],
 ['Deep Orange','900','#BF360C','black'],
 ['Deep Orange','A100','#FF9E80','black'],
 ['Deep Orange','A200','#FF6E40','black'],
 ['Deep Orange','A400','#FF3D00','black'],
 ['Deep Orange','A700','#DD2C00','black'],
 ['Brown','50','#EFEBE9','black'],
 ['Brown','100','#D7CCC8','black'],
 ['Brown','200','#BCAAA4','black'],
 ['Brown','300','#A1887F','black'],
 ['Brown','400','#8D6E63','black'],
 ['Brown','500','#795548','white'],
 ['Brown','600','#6D4C41','white'],
 ['Brown','700','#5D4037','white'],
 ['Brown','800','#4E342E','white'],
 ['Brown','900','#3E2723','white'],
 ['Grey','50','#FAFAFA','black'],
 ['Grey','100','#F5F5F5','black'],
 ['Grey','200','#EEEEEE','black'],
 ['Grey','300','#E0E0E0','black'],
 ['Grey','400','#BDBDBD','black'],
 ['Grey','500','#9E9E9E','black'],
 ['Grey','600','#757575','white'],
 ['Grey','700','#616161','white'],
 ['Grey','800','#424242','white'],
 ['Grey','900','#212121','white'],
 ['Blue grey','50','#ECEFF1','black'],
 ['Blue grey','100','#CFD8DC','black'],
 ['Blue grey','200','#B0BEC5','black'],
 ['Blue grey','300','#90A4AE','black'],
 ['Blue grey','400','#78909C','black'],
 ['Blue grey','500','#607D8B','black'],
 ['Blue grey','600','#546E7A','white'],
 ['Blue grey','700','#455A64','white'],
 ['Blue grey','800','#37474F','white'],
 ['Blue grey','900','#263238','white']
];
var tabPantone=[
['100C','F3ED86'],
['101C','F5EC62'],
['102C','FAE600'],
['103C','CAAD00'],
['104C','AC9600'],
['105C','817214'],
['106C','F6E761'],
['107C','FAE22F'],
['108C','FEDB00'],
['109C','FFD100'],
['110C','DBAE00'],
['111C','AF8F00'],
['112C','998000'],
['113C','FAE15A'],
['114C','FAE051'],
['115C','FBDE4A'],
['116C','FFCE00'],
['117C','CE9D00'],
['118C','B38A00'],
['119C','8A761A'],
['120C','F9DF79'],
['1205C','F3E2A7'],
['121C','FBDB6E'],
['1215C','F5DD92'],
['122C','FDD44F'],
['1225C','FDC745'],
['123C','FFC726'],
['1235C','FFB300'],
['124C','EBAB00'],
['1245C','C69200'],
['125C','BB8900'],
['1255C','AA800E'],
['126C','A17C00'],
['1265C','836514'],
['127C','EFDF85'],
['128C','F2D65E'],
['129C','F1CD44'],
['130C','F1AB00'],
['131C','D49100'],
['132C','A67A00'],
['133C','715913'],
['134C','F8D583'],
['1345C','FBCF8D'],
['135C','FEC85A'],
['1355C','FDC87D'],
['136C','FFBC3A'],
['1365C','FFB754'],
['137C','FF9F00'],
['1375C','FF9A00'],
['138C','E47F00'],
['1385C','D67500'],
['139C','B67100'],
['1395C','9E6209'],
['140C','7A560F'],
['1405C','6C4713'],
['141C','EFC868'],
['142C','F1BB46'],
['143C','EFAA23'],
['144C','ED8000'],
['145C','CF7600'],
['146C','9F6000'],
['147C','715821'],
['148C','FBD09D'],
['1485C','FFB57B'],
['149C','FEC688'],
['1495C','FF963B'],
['150C','FFA94F'],
['1505C','FF7200'],
['151C','FF7300'],
['152C','E76F00'],
['1525C','CA4E00'],
['153C','C06600'],
['1535C','933F00'],
['154C','995409'],
['1545C','51260B'],
['155C','ECD6AF'],
['1555C','FFBFA0'],
['156C','EFC18A'],
['1565C','FFA97D'],
['157C','ED9B4F'],
['1575C','FF8642'],
['158C','E96B10'],
['1585C','FF6900'],
['159C','CD5806'],
['1595C','DA5C05'],
['160C','A24E12'],
['1605C','A24A13'],
['161C','613517'],
['1615C','853C10'],
['162C','FDC3AA'],
['1625C','FFA28B'],
['163C','FF9C71'],
['1635C','FF8E70'],
['164C','FF7E43'],
['1645C','FF6C3B'],
['165C','FF5F00'],
['1655C','FF5200'],
['166C','E55300'],
['1665C','E54800'],
['167C','C2510F'],
['1675C','A83C0F'],
['168C','6F3014'],
['1685C','863514'],
['169C','FFB6B1'],
['170C','FF897B'],
['171C','FF6141'],
['172C','FD4703'],
['173C','D84519'],
['174C','9A3416'],
['175C','703222'],
['176C','FFACB9'],
['1765C','FE9DB0'],
['1767C','FAAFC2'],
['177C','FF818C'],
['1775C','FF859A'],
['1777C','FB6581'],
['178C','FF5B60'],
['1785C','F9455B'],
['1787C','F9425F'],
['1788C','F02233'],
['179C','E23828'],
['1795C','D81F2A'],
['1797C','D02433'],
['180C','C0362C'],
['1805C','B0232A'],
['1807C','A12830'],
['181C','792720'],
['1815C','7C211E'],
['1817C','5E2728'],
['182C','F8B8CB'],
['183C','FC8DA9'],
['184C','F85D7E'],
['185C','EA0437'],
['186C','D21034'],
['187C','B31B34'],
['188C','7C2230'],
['189C','F8A1BE'],
['1895C','F3BCD4'],
['190C','F8779E'],
['1905C','F59BBD'],
['191C','F23F72'],
['1915C','F2558A'],
['192C','E90649'],
['1925C','E40050'],
['193C','C30C3E'],
['1935C','CB0447'],
['194C','9C1E3D'],
['1945C','AA113F'],
['1955C','93173B'],
['196C','EBC6D3'],
['197C','EB9BB2'],
['198C','E44D6F'],
['199C','DB0C41'],
['200C','C10435'],
['201C','9E1B34'],
['202C','892034'],
['203C','EBADCD'],
['204C','E87BAC'],
['205C','E34585'],
['206C','D7004D'],
['207C','B10042'],
['208C','902147'],
['209C','752641'],
['210C','FA9FCC'],
['211C','F97DB8'],
['212C','F34E9A'],
['213C','E61577'],
['214C','D00063'],
['215C','AA1054'],
['216C','7A1D42'],
['217C','ECBBDD'],
['218C','E86FB8'],
['219C','E0218A'],
['220C','AE0055'],
['221C','96004B'],
['222C','6C193F'],
['223C','F293D1'],
['224C','EF6ABF'],
['225C','E5239D'],
['226C','D60077'],
['227C','AE005F'],
['228C','8A0753'],
['229C','6A1D44'],
['230C','F7A7DB'],
['231C','F575C9'],
['232C','EF40B0'],
['233C','C90081'],
['234C','A6006B'],
['235C','890857'],
['236C','F2B0DF'],
['2365C','EFC3E4'],
['237C','EE86D3'],
['2375C','E270CD'],
['238C','E653BC'],
['2385C','D733B4'],
['239C','E032AF'],
['2395C','C40098'],
['240C','C41E99'],
['2405C','A70084'],
['241C','AC0481'],
['2415C','970076'],
['242C','7A1A57'],
['2425C','820063'],
['243C','E8B7E5'],
['244C','E6A2E0'],
['245C','DF81D6'],
['246C','C70BAC'],
['247C','B3009D'],
['248C','9E0389'],
['249C','7B2266'],
['250C','E3C0E6'],
['251C','D99CE1'],
['252C','CA65D1'],
['253C','A91BB0'],
['254C','962399'],
['255C','70266C'],
['256C','D9BFE0'],
['2562C','CFA5E4'],
['2563C','C79DD8'],
['2567C','BB99DA'],
['257C','CBA4D4'],
['2572C','C084DC'],
['2573C','B279C8'],
['2577C','A276CC'],
['258C','92499E'],
['2582C','A24CC8'],
['2583C','9950B2'],
['2587C','8348B5'],
['259C','6C1B72'],
['2592C','9016B2'],
['2593C','7E2B97'],
['2597C','59058D'],
['260C','5F1D5F'],
['2602C','7D0996'],
['2603C','68177F'],
['2607C','4F027C'],
['261C','591E55'],
['2612C','6A1A7A'],
['2613C','611774'],
['2617C','4B0B71'],
['262C','4F2248'],
['2622C','572458'],
['2623C','581963'],
['2627C','43125F'],
['263C','D8CBEB'],
['2635C','BFAFE4'],
['264C','BCA8E6'],
['2645C','AA94DE'],
['265C','8D65D2'],
['2655C','9173D3'],
['266C','6732BA'],
['2665C','7A52C7'],
['267C','4F1F91'],
['268C','4A217E'],
['2685C','3B0084'],
['269C','452663'],
['2695C','381D59'],
['270C','ADACDC'],
['2705C','A29FE0'],
['2706C','C4CBEA'],
['2707C','BDD0EE'],
['2708C','B1C5EA'],
['271C','9490D2'],
['2715C','8580D8'],
['2716C','94A1E2'],
['2717C','A1BDEA'],
['2718C','547ED9'],
['272C','7973C2'],
['2725C','5E53C7'],
['2726C','4555C7'],
['2727C','3878DB'],
['2728C','0047BE'],
['273C','25177A'],
['2735C','280092'],
['2736C','1E22AE'],
['2738C','00129D'],
['274C','211265'],
['2745C','22007A'],
['2746C','1A1C96'],
['2747C','00237E'],
['2748C','001A7B'],
['275C','1D1157'],
['2755C','1B0069'],
['2756C','151D71'],
['2757C','002065'],
['2758C','001D68'],
['276C','241A44'],
['2765C','1B0C55'],
['2766C','151C55'],
['2767C','0B2345'],
['2768C','160B42'],
['277C','A9C7EC'],
['278C','8CB4E8'],
['279C','4189DD'],
['280C','00267F'],
['281C','002569'],
['282C','00204E'],
['283C','93BFEB'],
['284C','6CABE7'],
['285C','0077D4'],
['286C','0035AD'],
['287C','003798'],
['288C','003082'],
['289C','00234C'],
['290C','BED9ED'],
['2905C','92C9EB'],
['291C','A4CEEC'],
['2915C','62B4E8'],
['292C','6AB2E7'],
['2925C','0092DD'],
['293C','0047B6'],
['2935C','005BC3'],
['294C','003580'],
['2945C','0053A5'],
['295C','002D62'],
['2955C','003B6F'],
['296C','002740'],
['2965C','003151'],
['297C','78C7EB'],
['2975C','A5D9EC'],
['298C','42B4E6'],
['2985C','40BDE8'],
['299C','00A0E2'],
['2995C','00A2E1'],
['300C','0067C6'],
['3005C','0076CC'],
['301C','00529B'],
['3015C','0060A1'],
['302C','00436E'],
['3025C','00496E'],
['303C','00344D'],
['3035C','003A4F'],
['304C','A2DBEB'],
['305C','53CAEB'],
['306C','00B5E6'],
['307C','0070B2'],
['308C','005883'],
['309C','003947'],
['310C','66CFE6'],
['3105C','6FD2E4'],
['311C','00C2E3'],
['3115C','00C4DC'],
['312C','00A7D4'],
['3125C','00AECE'],
['313C','0092C7'],
['3135C','0092BA'],
['314C','007FAC'],
['3145C','007A97'],
['315C','006685'],
['3155C','00667C'],
['316C','004650'],
['3165C','004F5D'],
['317C','BFE5EA'],
['318C','8EDBE5'],
['319C','36CCDA'],
['320C','0097AC'],
['321C','008193'],
['322C','006F7A'],
['323C','006068'],
['324C','98D9DB'],
['3242C','75D9D8'],
['3245C','7BDDD8'],
['3248C','7BD2C8'],
['325C','47C7C7'],
['3252C','41D2D2'],
['3255C','32D4CB'],
['3258C','43C4B7'],
['326C','00AFAD'],
['3262C','00BAB9'],
['3265C','00C2B6'],
['3268C','00A994'],
['327C','008579'],
['3272C','00A19C'],
['3275C','00B09D'],
['3278C','00997A'],
['328C','007168'],
['3282C','008480'],
['3285C','009384'],
['3288C','007E64'],
['329C','00625A'],
['3292C','005A53'],
['3295C','007C6F'],
['3298C','006752'],
['330C','00524D'],
['3302C','00423C'],
['3305C','004A41'],
['3308C','004236'],
['331C','B2E7DF'],
['332C','9FE4DB'],
['333C','43D9C7'],
['334C','009878'],
['335C','007B63'],
['336C','006651'],
['337C','94D8C8'],
['3375C','81E0C7'],
['338C','76D1BD'],
['3385C','3BD6B2'],
['339C','00B08B'],
['3395C','00C590'],
['340C','009460'],
['3405C','00AE68'],
['341C','007856'],
['3415C','00774B'],
['342C','006A4E'],
['3425C','006644'],
['343C','00533E'],
['3435C','004731'],
['344C','A6DEC1'],
['345C','89D5AF'],
['346C','5EC998'],
['347C','009543'],
['348C','007E3A'],
['349C','006233'],
['350C','18472C'],
['351C','A7E6C4'],
['352C','87E0B0'],
['353C','6ADCA2'],
['354C','00AB39'],
['355C','009530'],
['356C','007229'],
['357C','0F4D2A'],
['358C','A5DB92'],
['359C','9FD98B'],
['360C','55BE47'],
['361C','12AD2B'],
['362C','289728'],
['363C','2F8927'],
['364C','317023'],
['365C','CCE5A2'],
['366C','BCE18D'],
['367C','A4D867'],
['368C','62BD19'],
['369C','4FA600'],
['370C','4F8A10'],
['371C','4A601C'],
['372C','D7E9A1'],
['373C','CDE985'],
['374C','BAE55F'],
['375C','87D300'],
['376C','76B900'],
['377C','679000'],
['378C','4D5A12'],
['379C','DDE56C'],
['380C','D3E13C'],
['381C','C8DB00'],
['382C','B9D300'],
['383C','9FAA00'],
['384C','8B9000'],
['385C','6E6A12'],
['386C','E5E96E'],
['387C','DEE63A'],
['388C','D7E300'],
['389C','C6DB00'],
['390C','B2BC00'],
['391C','959200'],
['392C','7F7800'],
['393C','EDEB8F'],
['3935C','F0EB7A'],
['394C','E9E73F'],
['3945C','EFE600'],
['395C','E4E400'],
['3955C','ECE100'],
['396C','DDDF00'],
['3965C','E9DC00'],
['397C','BEB800'],
['3975C','BBA800'],
['398C','ABA200'],
['3985C','9B8900'],
['399C','998D00'],
['3995C','6A5B07'],
['400C','CDC9C4'],
['401C','BDB8B1'],
['402C','ADA59D'],
['403C','988F86'],
['404C','7C7369'],
['405C','645A50'],
['406C','CAC4C2'],
['408C','A59997'],
['409C','948683'],
['410C','7B6E6A'],
['411C','62524E'],
['412C','372B27'],
['413C','C8C9C3'],
['414C','B5B6B0'],
['415C','9D9D96'],
['416C','87887F'],
['417C','6E6F64'],
['418C','5A5B51'],
['419C','1F211C'],
['420C','CCCCCC'],
['421C','BABBBC'],
['422C','A9AAAB'],
['423C','939495'],
['424C','767A7D'],
['425C','56595C'],
['426C','212424'],
['427C','D2D6D9'],
['428C','C3C8CD'],
['429C','A8ADB4'],
['430C','868F98'],
['431C','616A74'],
['432C','414B56'],
['433C','212930'],
['434C','D3C9CE'],
['435C','C8BAC0'],
['436C','B7A6AD'],
['437C','846E74'],
['438C','513E3E'],
['439C','443535'],
['440C','392E2C'],
['441C','CBD1D4'],
['442C','B3BCC0'],
['443C','99A3A6'],
['444C','7B858A'],
['445C','4F5559'],
['446C','3D4242'],
['447C','323532'],
['448C','473E26'],
['4485C','5D4718'],
['449C','4D4325'],
['4495C','836E2C'],
['450C','514826'],
['4505C','9B8948'],
['451C','9F9B74'],
['4515C','B5A570'],
['452C','B5B292'],
['4525C','C5BA8E'],
['453C','C8C5AC'],
['4535C','D4CCAA'],
['454C','D5D3BF'],
['4545C','DED9C2'],
['455C','655415'],
['456C','977F09'],
['457C','B29200'],
['458C','DBCA67'],
['459C','DFD27C'],
['460C','E5DB97'],
['461C','E7E3B5'],
['462C','563F23'],
['4625C','4E2614'],
['463C','6D4921'],
['4635C','905A33'],
['464C','855723'],
['4645C','B17F5C'],
['465C','B99C6B'],
['4655C','C09477'],
['466C','CAB388'],
['4665C','D1AE97'],
['467C','D5C4A1'],
['4675C','DDC2B0'],
['468C','E0D4BB'],
['4685C','E4D2C5'],
['469C','613418'],
['4695C','532821'],
['470C','9B4D1B'],
['4705C','7F4C3E'],
['471C','B75312'],
['4715C','9B6E5F'],
['472C','E49969'],
['4725C','B28D7F'],
['473C','EDB996'],
['4735C','C5AAA0'],
['474C','EEC5A9'],
['4745C','D4BEB6'],
['475C','F0D0BB'],
['4755C','DDCDC7'],
['476C','513127'],
['477C','5E2F24'],
['478C','723629'],
['479C','AD806C'],
['480C','C8A99A'],
['481C','D5BDB0'],
['482C','DDCEC4'],
['483C','6A2E22'],
['484C','9F2D20'],
['485C','DC241F'],
['486C','EC9384'],
['487C','ECAB9D'],
['488C','ECBBAF'],
['489C','EBCDC3'],
['490C','5A272A'],
['491C','772B2F'],
['492C','91353B'],
['494C','E7A7B6'],
['495C','EDB8C5'],
['496C','EFC4CE'],
['497C','4E2A28'],
['4975C','441E1F'],
['498C','68322E'],
['4985C','854A50'],
['499C','763931'],
['4995C','A16971'],
['500C','C88691'],
['5005C','B7848C'],
['501C','DEACB7'],
['5015C','D1A9B0'],
['502C','E5BFC7'],
['5025C','DBBCC1'],
['503C','E9CCD2'],
['5035C','E3CBD0'],
['504C','4E2029'],
['505C','6E2639'],
['506C','7E2B42'],
['507C','D38DA6'],
['508C','E2ABBF'],
['509C','E7B9CA'],
['510C','E9C2D1'],
['511C','60244E'],
['5115C','4B253E'],
['512C','7E2271'],
['5125C','704165'],
['513C','95288F'],
['5135C','885E80'],
['514C','D385C8'],
['5145C','A17E9A'],
['515C','DFA5D6'],
['5155C','C0A6BD'],
['516C','E7BADF'],
['5165C','D6C5D3'],
['517C','EBCAE3'],
['5175C','E0D5DE'],
['518C','4B2A46'],
['5185C','45293B'],
['519C','5A2D5F'],
['5195C','5E3A51'],
['520C','682F73'],
['5205C','8B687D'],
['521C','AD85BA'],
['5215C','B195A6'],
['522C','BD9ECA'],
['5225C','C6B0BE'],
['523C','CBB2D5'],
['5235C','D4C4CE'],
['524C','DACCE1'],
['5245C','DFD4DB'],
['525C','51265A'],
['5255C','2A254B'],
['526C','61207F'],
['5265C','433B67'],
['527C','6E20A0'],
['5275C','57527E'],
['528C','A774CD'],
['5285C','8581A4'],
['529C','C6A4E1'],
['5295C','AAA7C1'],
['530C','CFB1E3'],
['5305C','C1BED1'],
['531C','D7C4E7'],
['5315C','D4D4E0'],
['532C','262A39'],
['533C','253355'],
['534C','293F6F'],
['535C','95A1C3'],
['536C','A4B1CD'],
['537C','BDC6DA'],
['538C','D2D7E4'],
['539C','002A46'],
['5395C','02253A'],
['540C','002F5D'],
['5405C','3E647E'],
['541C','003C79'],
['5415C','587993'],
['542C','5998C9'],
['5425C','7C98AE'],
['543C','93B9DC'],
['5435C','A5B8C9'],
['544C','B1CBE5'],
['5445C','BCCAD6'],
['545C','BFD3E6'],
['5455C','CCD6E0'],
['546C','003440'],
['5463C','002830'],
['5467C','183533'],
['547C','003E51'],
['5473C','00626E'],
['5477C','3C5B59'],
['548C','004159'],
['5483C','4F8D97'],
['5487C','627D7C'],
['549C','5B97B1'],
['5493C','81ADB5'],
['5497C','8DA09F'],
['550C','85B0C6'],
['5503C','A1C3C9'],
['5507C','AAB8B9'],
['551C','9FC1D3'],
['5513C','BED5D9'],
['5517C','BFCBCC'],
['552C','B9D0DC'],
['5523C','CFDEE1'],
['5527C','CCD4D4'],
['553C','214232'],
['5535C','1B3930'],
['554C','24604A'],
['5545C','4A6D62'],
['555C','13694E'],
['5555C','6E8D82'],
['556C','74A18E'],
['5565C','8FA8A0'],
['557C','98BAAC'],
['5575C','A9BDB6'],
['558C','ACC7BD'],
['5585C','C0CFCB'],
['559C','C0D4CD'],
['5595C','D3DEDB'],
['560C','22483F'],
['5605C','193025'],
['561C','0F6259'],
['5615C','5A7060'],
['562C','007770'],
['5625C','6C8072'],
['563C','72B8B4'],
['5635C','97A69B'],
['564C','98CCC9'],
['5645C','B1BCB5'],
['565C','B9DCDA'],
['5655C','BDC5BF'],
['566C','CDE3E2'],
['5665C','CDD3CD'],
['567C','18453B'],
['569C','008478'],
['570C','76C6BE'],
['571C','9DD6CF'],
['572C','B4DEDB'],
['573C','C1E2DE'],
['574C','404F24'],
['5743C','3E4723'],
['5747C','404616'],
['575C','56732E'],
['5753C','5E6639'],
['5757C','6F732D'],
['576C','668E3C'],
['5763C','6E7649'],
['5767C','8D9150'],
['577C','B2C891'],
['5773C','939871'],
['5777C','A7AB74'],
['578C','BDD0A0'],
['5783C','ADB291'],
['5787C','C1C49A'],
['579C','C5D5A9'],
['5793C','BDC2A9'],
['5797C','CED1B3'],
['580C','CFDDBB'],
['5803C','CED2BF'],
['5807C','D9DCC5'],
['581C','605A12'],
['5815C','4B4516'],
['582C','888600'],
['5825C','7D762F'],
['583C','ABB400'],
['5835C','9D9754'],
['584C','CBD34C'],
['5845C','ADA86B'],
['585C','D8DB6F'],
['5855C','C7C397'],
['586C','DDE18A'],
['5865C','D3CFAC'],
['587C','E2E59F'],
['5875C','D9D7B9'],
['600C','EEEBB6'],
['601C','EEEAA5'],
['602C','EEE88D'],
['603C','EDE25E'],
['604C','EADB1B'],
['605C','E0CA00'],
['606C','D8BD00'],
['607C','EBE9C3'],
['608C','E9E6B4'],
['609C','E7E29A'],
['610C','E2D973'],
['611C','D8CC46'],
['612C','C4B300'],
['613C','B39D00'],
['614C','E3E1C1'],
['615C','DDDBB1'],
['616C','D7D29D'],
['617C','C9C37F'],
['618C','B4A851'],
['619C','9C8E2A'],
['620C','887811'],
['621C','D2DFDC'],
['622C','BDD2CC'],
['623C','9EBCB3'],
['624C','78A095'],
['625C','518274'],
['626C','1F5647'],
['627C','032D23'],
['628C','C8E2E8'],
['629C','AADAE5'],
['630C','82CBDD'],
['631C','48B8D2'],
['632C','009EC0'],
['633C','007CA4'],
['634C','00628C'],
['635C','ADDDEB'],
['636C','8DD4E9'],
['637C','5BC8E7'],
['638C','00B2DE'],
['639C','009ACF'],
['640C','0085C2'],
['641C','0070B2'],
['642C','CED9E7'],
['643C','C5D2E3'],
['644C','97B1D0'],
['645C','7498C0'],
['646C','5781AE'],
['647C','11568C'],
['648C','002B5F'],
['649C','D4DCE8'],
['650C','C2CDE0'],
['651C','99AECE'],
['652C','6F8DB9'],
['653C','2A568F'],
['654C','003066'],
['655C','002252'],
['656C','D4DDED'],
['657C','BFD0EA'],
['658C','A1BBE4'],
['659C','6E96D5'],
['660C','296DC1'],
['661C','003596'],
['662C','002280'],
['663C','DED8E6'],
['664C','D7D0E0'],
['665C','C5BBD3'],
['666C','A392B7'],
['667C','7C6495'],
['668C','624A7E'],
['669C','432C5F'],
['670C','EAD4E4'],
['671C','E6C1DB'],
['672C','E1A7CF'],
['673C','DA89BE'],
['674C','CE62A4'],
['675C','B62A79'],
['676C','A30059'],
['677C','E5D1DF'],
['678C','E2C9DA'],
['679C','DEBDD4'],
['680C','CB97B7'],
['681C','B8749E'],
['682C','9C4878'],
['683C','7C2250'],
['684C','E5CAD9'],
['685C','E1BCD0'],
['686C','DBAEC6'],
['687C','C686A9'],
['688C','B46B93'],
['689C','95416F'],
['690C','6D2348'],
['691C','E7CDD2'],
['692C','E2C1C8'],
['693C','D9A7B1'],
['694C','CA909C'],
['695C','B06876'],
['696C','944554'],
['697C','81333D'],
['698C','EDCFD7'],
['699C','F0C2CD'],
['700C','ECA9B9'],
['701C','E58DA2'],
['702C','D5647C'],
['703C','BA394E'],
['704C','A22630'],
['705C','F2D6DE'],
['706C','F5C7D4'],
['707C','F5B0C1'],
['708C','F590A6'],
['709C','EF6782'],
['710C','E54661'],
['711C','D32939'],
['712C','FACDAE'],
['713C','FBC399'],
['714C','FDB179'],
['715C','F9964A'],
['716C','F17C0E'],
['717C','DE6100'],
['718C','CF5200'],
['719C','EFCFB8'],
['720C','ECC3A5'],
['721C','E5AE86'],
['722C','D58F59'],
['723C','C0722F'],
['724C','9A4B00'],
['725C','843B00'],
['726C','E8CEBB'],
['727C','E1BEA4'],
['728C','D5AA88'],
['729C','C38E63'],
['730C','AC703D'],
['731C','793F0D'],
['732C','64300A'],
['801C','00A7D8'],
['802C','5BDD45'],
['803C','FFE805'],
['804C','FFA243'],
['805C','FF585E'],
['806C','FF1CAC'],
['807C','D708B2'],
['808C','00AE97'],
['809C','E1E400'],
['810C','FFCE09'],
['811C','FF7750'],
['812C','FF3485'],
['813C','EA12AF'],
['814C','7E60CE'],
];
