//dot2elgatestreamdeck beta v.1.4.5

var W3CWebSocket = require('websocket')
    .w3cwebsocket;
var client = new W3CWebSocket('ws://localhost:80/'); //U can change localhost(127.0.0.1) to Your console IP address
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const jpegJS = require('jpeg-js');
const { openStreamDeck } = require('@elgato-stream-deck/node');

//CONFIG
var bwing = 2;      //select B-wing 1 or 2, or set 0 - to on boot screen select
var page = 1;       //Set Page nr (start 1 - 5)
var wallpaper = 1;  //Wallpaper 1 = ON, 0 = OFF (AutoOff)
var mode = 1;       //set display mode: 1 - ON/Off icons, 2 - ON/Off 2 colors, 3 - icon + colors (color from executor name), 4 - exec name + icon + cue name (dot2), 5 - custom icons
var brightness = 40;//Set display brightness 2-100
var pageselect = 0; //Select page button 1=ON , 0=OFF

//Colors - 0 off, 1 on (mode 2)
var R0 = 255;
var G0 = 127;
var B0 = 0;
var R1 = 0;
var G1 = 0;
var B1 = 127;
//END-------------------------------

var set_brightness = 0;
var request = -2;
var interval_on = 0;
var session = 0;
var wing = 0;
var button = 0;
var buttons = [0, 1, 2];
var ledmatrix = [-1, -1, -1];   //IS RUN / ON OFF
var ledmatrix_en = [-2, -2, -2];  //exec name
var ledmatrix_cn = [];            //cue name
var ledmatrix_t = [];            //type
var array_off = [];
var array_on = [];
pageIndex = (page - 1);

const streamDeck = openStreamDeck();
streamDeck.clearPanel();

//console.log(streamDeck.ICON_SIZE);
//console.log(streamDeck.KEY_COLUMNS);
//console.log(streamDeck.KEY_ROWS);

//stream deck no buttons
wing = (streamDeck.KEY_COLUMNS * streamDeck.KEY_ROWS);

//default icons
const rawExecEmpty = fs.readFileSync(path.resolve(__dirname, `fixtures/ExecEmpty_${streamDeck.ICON_SIZE}.jpg`));    //Exec Empty icon
const imgExecEmpty = jpegJS.decode(rawExecEmpty).data;
const rawExecOn = fs.readFileSync(path.resolve(__dirname, `fixtures/ExecOn_${streamDeck.ICON_SIZE}.jpg`));          //Exec ON icon
const imgExecOn = jpegJS.decode(rawExecOn).data;
const rawExecOff = fs.readFileSync(path.resolve(__dirname, `fixtures/ExecOff_${streamDeck.ICON_SIZE}.jpg`));        //Exec OFF icon
const imgExecOff = jpegJS.decode(rawExecOff).data;

//color icons
const raw_off_0 = fs.readFileSync(path.resolve(__dirname, `pallete/off/0_${streamDeck.ICON_SIZE}.jpg`));
array_off[0] = jpegJS.decode(raw_off_0).data;
const raw_off_1 = fs.readFileSync(path.resolve(__dirname, `pallete/off/1_${streamDeck.ICON_SIZE}.jpg`));
array_off[1] = jpegJS.decode(raw_off_1).data;
const raw_off_2 = fs.readFileSync(path.resolve(__dirname, `pallete/off/2_${streamDeck.ICON_SIZE}.jpg`));
array_off[2] = jpegJS.decode(raw_off_2).data;
const raw_off_3 = fs.readFileSync(path.resolve(__dirname, `pallete/off/3_${streamDeck.ICON_SIZE}.jpg`));
array_off[3] = jpegJS.decode(raw_off_3).data;
const raw_off_4 = fs.readFileSync(path.resolve(__dirname, `pallete/off/4_${streamDeck.ICON_SIZE}.jpg`));
array_off[4] = jpegJS.decode(raw_off_4).data;
const raw_off_5 = fs.readFileSync(path.resolve(__dirname, `pallete/off/5_${streamDeck.ICON_SIZE}.jpg`));
array_off[5] = jpegJS.decode(raw_off_5).data;
const raw_off_6 = fs.readFileSync(path.resolve(__dirname, `pallete/off/6_${streamDeck.ICON_SIZE}.jpg`));
array_off[6] = jpegJS.decode(raw_off_6).data;
const raw_off_7 = fs.readFileSync(path.resolve(__dirname, `pallete/off/7_${streamDeck.ICON_SIZE}.jpg`));
array_off[7] = jpegJS.decode(raw_off_7).data;
const raw_off_8 = fs.readFileSync(path.resolve(__dirname, `pallete/off/8_${streamDeck.ICON_SIZE}.jpg`));
array_off[8] = jpegJS.decode(raw_off_8).data;
const raw_off_9 = fs.readFileSync(path.resolve(__dirname, `pallete/off/9_${streamDeck.ICON_SIZE}.jpg`));
array_off[9] = jpegJS.decode(raw_off_9).data;
const raw_off_10 = fs.readFileSync(path.resolve(__dirname, `pallete/off/10_${streamDeck.ICON_SIZE}.jpg`));
array_off[10] = jpegJS.decode(raw_off_10).data;
const raw_off_11 = fs.readFileSync(path.resolve(__dirname, `pallete/off/11_${streamDeck.ICON_SIZE}.jpg`));
array_off[11] = jpegJS.decode(raw_off_11).data;
const raw_off_12 = fs.readFileSync(path.resolve(__dirname, `pallete/off/12_${streamDeck.ICON_SIZE}.jpg`));
array_off[12] = jpegJS.decode(raw_off_12).data;
const raw_off_13 = fs.readFileSync(path.resolve(__dirname, `pallete/off/13_${streamDeck.ICON_SIZE}.jpg`));
array_off[13] = jpegJS.decode(raw_off_13).data;
const raw_off_14 = fs.readFileSync(path.resolve(__dirname, `pallete/off/14_${streamDeck.ICON_SIZE}.jpg`));
array_off[14] = jpegJS.decode(raw_off_14).data;
const raw_off_15 = fs.readFileSync(path.resolve(__dirname, `pallete/off/15_${streamDeck.ICON_SIZE}.jpg`));
array_off[15] = jpegJS.decode(raw_off_15).data;

const raw_on_0 = fs.readFileSync(path.resolve(__dirname, `pallete/on/0_${streamDeck.ICON_SIZE}.jpg`));
array_on[0] = jpegJS.decode(raw_on_0).data;
const raw_on_1 = fs.readFileSync(path.resolve(__dirname, `pallete/on/1_${streamDeck.ICON_SIZE}.jpg`));
array_on[1] = jpegJS.decode(raw_on_1).data;
const raw_on_2 = fs.readFileSync(path.resolve(__dirname, `pallete/on/2_${streamDeck.ICON_SIZE}.jpg`));
array_on[2] = jpegJS.decode(raw_on_2).data;
const raw_on_3 = fs.readFileSync(path.resolve(__dirname, `pallete/on/3_${streamDeck.ICON_SIZE}.jpg`));
array_on[3] = jpegJS.decode(raw_on_3).data;
const raw_on_4 = fs.readFileSync(path.resolve(__dirname, `pallete/on/4_${streamDeck.ICON_SIZE}.jpg`));
array_on[4] = jpegJS.decode(raw_on_4).data;
const raw_on_5 = fs.readFileSync(path.resolve(__dirname, `pallete/on/5_${streamDeck.ICON_SIZE}.jpg`));
array_on[5] = jpegJS.decode(raw_on_5).data;
const raw_on_6 = fs.readFileSync(path.resolve(__dirname, `pallete/on/6_${streamDeck.ICON_SIZE}.jpg`));
array_on[6] = jpegJS.decode(raw_on_6).data;
const raw_on_7 = fs.readFileSync(path.resolve(__dirname, `pallete/on/7_${streamDeck.ICON_SIZE}.jpg`));
array_on[7] = jpegJS.decode(raw_on_7).data;
const raw_on_8 = fs.readFileSync(path.resolve(__dirname, `pallete/on/8_${streamDeck.ICON_SIZE}.jpg`));
array_on[8] = jpegJS.decode(raw_on_8).data;
const raw_on_9 = fs.readFileSync(path.resolve(__dirname, `pallete/on/9_${streamDeck.ICON_SIZE}.jpg`));
array_on[9] = jpegJS.decode(raw_on_9).data;
const raw_on_10 = fs.readFileSync(path.resolve(__dirname, `pallete/on/10_${streamDeck.ICON_SIZE}.jpg`));
array_on[10] = jpegJS.decode(raw_on_10).data;
const raw_on_11 = fs.readFileSync(path.resolve(__dirname, `pallete/on/11_${streamDeck.ICON_SIZE}.jpg`));
array_on[11] = jpegJS.decode(raw_on_11).data;
const raw_on_12 = fs.readFileSync(path.resolve(__dirname, `pallete/on/12_${streamDeck.ICON_SIZE}.jpg`));
array_on[12] = jpegJS.decode(raw_on_12).data;
const raw_on_13 = fs.readFileSync(path.resolve(__dirname, `pallete/on/13_${streamDeck.ICON_SIZE}.jpg`));
array_on[13] = jpegJS.decode(raw_on_13).data;
const raw_on_14 = fs.readFileSync(path.resolve(__dirname, `pallete/on/14_${streamDeck.ICON_SIZE}.jpg`));
array_on[14] = jpegJS.decode(raw_on_14).data;
const raw_on_15 = fs.readFileSync(path.resolve(__dirname, `pallete/on/15_${streamDeck.ICON_SIZE}.jpg`));
array_on[15] = jpegJS.decode(raw_on_15).data;

//nr icons
var rawButton1 = fs.readFileSync(path.resolve(__dirname, `fixtures/1_${streamDeck.ICON_SIZE}.jpg`));
var imgButton1 = jpegJS.decode(rawButton1).data;
var rawButton2 = fs.readFileSync(path.resolve(__dirname, `fixtures/2_${streamDeck.ICON_SIZE}.jpg`));
var imgButton2 = jpegJS.decode(rawButton2).data;
var rawButton3 = fs.readFileSync(path.resolve(__dirname, `fixtures/3_${streamDeck.ICON_SIZE}.jpg`));
var imgButton3 = jpegJS.decode(rawButton3).data;
var rawButton4 = fs.readFileSync(path.resolve(__dirname, `fixtures/4_${streamDeck.ICON_SIZE}.jpg`));
var imgButton4 = jpegJS.decode(rawButton4).data;
var rawButton5 = fs.readFileSync(path.resolve(__dirname, `fixtures/5_${streamDeck.ICON_SIZE}.jpg`));
var imgButton5 = jpegJS.decode(rawButton5).data;
var rawButtonBrightness = fs.readFileSync(path.resolve(__dirname, `fixtures/brightness_${streamDeck.ICON_SIZE}.jpg`));
var imgButtonBrightness = jpegJS.decode(rawButtonBrightness).data;

if (brightness > 0) {
    if (brightness > 100) {
        brightness = 100;
    }
    streamDeck.setBrightness(brightness).catch((e) => console.error('Set brightness failed:', e));
}

//bwing select icons
if (bwing == 0) {
    var rawButtonAsk = fs.readFileSync(path.resolve(__dirname, `fixtures/ask_${streamDeck.ICON_SIZE}.jpg`));
    var imgButtonAsk = jpegJS.decode(rawButtonAsk).data;

    streamDeck.fillKeyBuffer(0, imgButtonAsk, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    streamDeck.fillKeyBuffer(1, imgButton1, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    streamDeck.fillKeyBuffer(2, imgButton2, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
}

//pageselect icons
if (pageselect == 1) {
    var wallpaper = 0;
    var raw_Page_plus = fs.readFileSync(path.resolve(__dirname, `fixtures/up_${streamDeck.ICON_SIZE}.jpg`));
    var img_page_plus = jpegJS.decode(raw_Page_plus).data;
    var raw_Page_minus = fs.readFileSync(path.resolve(__dirname, `fixtures/down_${streamDeck.ICON_SIZE}.jpg`));
    var img_page_minus = jpegJS.decode(raw_Page_minus).data;

    streamDeck.fillKeyBuffer(0, img_page_plus, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    if (wing == 32) {

        streamDeck.fillKeyBuffer(16, img_page_minus, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
        PageIcon();
        BWingIcon();
    }

    else if (wing == 15) {

        streamDeck.fillKeyBuffer(10, img_page_minus, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
        PageIcon();
    }

    else if (wing == 6) {

        streamDeck.fillKeyBuffer(3, img_page_minus, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    }
}

//load and draw select B-wing buttons 0 1 2


//set matrix to exec empty (-1), and matrixc -2 black/none
for (i = 0; i < wing; i++) {
    ledmatrix[i] = -1;
    ledmatrix_en[i] = -2;
}

//auto off wallpaper
if (bwing == 0) {
    wallpaper = 0;
    var buttons = [0, 0, 0];
}

//wallpaper
if (wallpaper == 1) {
    ; (async () => {

        const image = await sharp(path.resolve(__dirname, 'fixtures/dot2.png'))
            .flatten()
            .resize(streamDeck.ICON_SIZE * streamDeck.KEY_COLUMNS, streamDeck.ICON_SIZE * streamDeck.KEY_ROWS)
            .raw()
            .toBuffer()

        streamDeck.fillPanelBuffer(image).catch((e) => console.error('Fill failed:', e))

        streamDeck.on('error', (error) => {
            console.error(error)
        })
    })()
}

//MyIcon(button,ledmatrix,ledmatrix_En)
async function MyIcon(button, is_run, exec_name) {

    if (is_run == 1) {

        if (fs.existsSync(path.resolve(__dirname, `MyIcons/${(exec_name)}.png`))) {

            try {

                var finalBuffer = await sharp(path.resolve(__dirname, `MyIcons/${exec_name}.png`))
                    .flatten()
                    .resize(streamDeck.ICON_SIZE, streamDeck.ICON_SIZE)
                    .raw()
                    .toBuffer()

                streamDeck.fillKeyBuffer(button, finalBuffer).catch((e) => console.error('Fill failed:', e))
            }

            catch (error) {
                console.error(error)
            }
        }

        else {

            try {

                var finalBuffer = await sharp(path.resolve(__dirname, `images/ma_logo.png`))
                    .flatten()
                    .resize(streamDeck.ICON_SIZE, streamDeck.ICON_SIZE)
                    .raw()
                    .toBuffer()

                streamDeck.fillKeyBuffer(button, finalBuffer).catch((e) => console.error('Fill failed:', e))
            }
            catch (error) {
                console.error(error)
            }
        }
    }

    else {

        if (fs.existsSync(path.resolve(__dirname, `MyIcons/${(exec_name)}.png`))) {

            if (fs.existsSync(path.resolve(__dirname, `MyIcons/${(exec_name)}_Off.png`))) {
                try {

                    var finalBuffer = await sharp(path.resolve(__dirname, `MyIcons/${exec_name}_Off.png`))
                        .flatten()
                        .resize(streamDeck.ICON_SIZE, streamDeck.ICON_SIZE)
                        .raw()
                        .toBuffer()

                    streamDeck.fillKeyBuffer(button, finalBuffer).catch((e) => console.error('Fill failed:', e))
                }

                catch (error) {
                    console.error(error)
                }

            }

            else {

                try {

                    var finalBuffer = await sharp(path.resolve(__dirname, `MyIcons/${exec_name}.png`))
                        .modulate({
                            brightness: 0.3,

                        })
                        .flatten()
                        .resize(streamDeck.ICON_SIZE, streamDeck.ICON_SIZE)
                        .raw()
                        .toBuffer()

                    streamDeck.fillKeyBuffer(button, finalBuffer).catch((e) => console.error('Fill failed:', e))
                }

                catch (error) {
                    console.error(error)
                }
            }
        }

        else {
            /*
                    else {
 
            try {
 
                var finalBuffer = await sharp(path.resolve(__dirname, `images/ma_logo_checked.png`))
                    .flatten()
                    .resize(streamDeck.ICON_SIZE, streamDeck.ICON_SIZE)
                    .raw()
                    .toBuffer()
            
                    streamDeck.fillKeyBuffer(button, finalBuffer).catch((e) => console.error('Fill failed:', e))
            }
            
            catch (error) {
                console.error(error)
            }
        }
            */

            try {

                var finalBuffer = await sharp(path.resolve(__dirname, `images/ma_logo_checked.png`))
                    .flatten()
                    .resize(streamDeck.ICON_SIZE, streamDeck.ICON_SIZE)
                    .raw()
                    .toBuffer()

                streamDeck.fillKeyBuffer(button, finalBuffer).catch((e) => console.error('Fill failed:', e))
            }

            catch (error) {
                console.error(error)
            }
        }
    }

}




//generate_icon(exec_color, is_run, exec_name, exec_type, cue_name, button)
async function generate_icon(exec_color, is_run, exec_name, exec_type, cue_name, button) {

    //console.log(exec_color, is_run, exec_name, exec_type, cue_name, button);

    try {
        const finalBuffer2 = await sharp(path.resolve(__dirname, `images/${exec_type}.png`))
            //.resize(streamDeck.ICON_SIZE / 3)
            //.flatten({ background: exec_color })
            //.flatten()
            .toBuffer()

        //overlayWith(image, { top: Number, left: Number })

        const finalBuffer = await sharp({
            create: {
                width: streamDeck.ICON_SIZE,
                height: streamDeck.ICON_SIZE,
                channels: 4,
                background: exec_color,
            }
        })
            .composite([
                {
                    input: Buffer.from(
                        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${streamDeck.ICON_SIZE} ${streamDeck.ICON_SIZE
                        }" version="1.1">
                    <text
                    font-family="'Arial'"
                        font-size="10px"
                        x="${streamDeck.ICON_SIZE / 2}"
                        y="${20}"
                        fill="#fff"
                        text-anchor="middle"
                        >${exec_name}</text>
                </svg>`
                    ),
                    top: 0,
                    left: 0,
                },
                {
                    input: Buffer.from(finalBuffer2),

                },
                {
                    input: Buffer.from(
                        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${streamDeck.ICON_SIZE} ${streamDeck.ICON_SIZE
                        }" version="1.1">
                    <text
                        font-family="'Arial'"
                        font-size="10px"
                        font-weight="bold"
                        x="${streamDeck.ICON_SIZE / 2}"
                        y="${streamDeck.ICON_SIZE - 12}"
                        fill="#fff"
                        text-anchor="middle"
                        >${cue_name}</text>
                </svg>`
                    ),
                    top: 0,
                    left: 0,
                },
            ])

            .flatten({ background: exec_color })
            .raw()
            .toBuffer()
        await streamDeck.fillKeyBuffer(button, finalBuffer, { format: 'rgba' })

    }

    catch (error) {

        console.error(error)
    }
}

function PageIcon() {
    if (pageIndex == 0) {
        streamDeck.fillKeyBuffer(streamDeck.KEY_COLUMNS, imgButton1, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    }

    else if (pageIndex == 1) {
        streamDeck.fillKeyBuffer(streamDeck.KEY_COLUMNS, imgButton2, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    }

    else if (pageIndex == 2) {
        streamDeck.fillKeyBuffer(streamDeck.KEY_COLUMNS, imgButton3, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    }

    else if (pageIndex == 3) {
        streamDeck.fillKeyBuffer(streamDeck.KEY_COLUMNS, imgButton4, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    }

    else if (pageIndex == 4) {
        streamDeck.fillKeyBuffer(streamDeck.KEY_COLUMNS, imgButton5, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    }

    else {
        streamDeck.fillKeyBuffer(streamDeck.KEY_COLUMNS, imgButtonAsk, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    }

    return;
}

function BWingIcon() {
    if (bwing == 1 && wing == 32) {
        streamDeck.fillKeyBuffer(24, imgButton1, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    }

    else if (bwing == 2 && wing == 32) {
        streamDeck.fillKeyBuffer(24, imgButton2, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    }

    return;
}

//sleep function
sleep(1000, function () {
    // executes after one second, and blocks the thread
});

function findColorIndex(colorName) {
    const names = ['Black', 'White', 'Red', 'Orange', 'Yellow', 'Fern Green', 'Green', 'Sea Green', 'Cyan', 'Lavender', 'Blue', 'Violet', 'Magenta', 'Pink', 'CTO', 'CTB'];
    const index = names.indexOf(colorName);

    return index;
}

//interval send data to server function
function interval() {
    if (session > 0) {

        if (bwing == 2) {

            if (wing == 6) {
                client.send('{"requestType":"playbacks","startIndex":[313,413],"itemsCount":[3,3],"pageIndex":' + pageIndex + ',"itemsType":[3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }

            else if (wing == 15) {
                client.send('{"requestType":"playbacks","startIndex":[311,411,511],"itemsCount":[5,5,5],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }

            else if (wing == 32) {
                client.send('{"requestType":"playbacks","startIndex":[308,408,508,608],"itemsCount":[8,8,8,8],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }

            else {
                client.send('{"requestType":"playbacks","startIndex":[315],"itemsCount":[1],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }
        }

        else if (bwing == 1) {
            if (wing == 6) {
                client.send('{"requestType":"playbacks","startIndex":[305,405],"itemsCount":[3,3],"pageIndex":' + pageIndex + ',"itemsType":[3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }

            else if (wing == 15) {
                client.send('{"requestType":"playbacks","startIndex":[303,403,503],"itemsCount":[5,5,5],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }

            else if (wing == 32) {
                client.send('{"requestType":"playbacks","startIndex":[300,400,500,600],"itemsCount":[8,8,8,8],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }

            else {
                client.send('{"requestType":"playbacks","startIndex":[315],"itemsCount":[1],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }
        }

        else {
            client.send('{"requestType":"getdata","data":"set","session":' + session + ',"maxRequests":1}');
        }
    }
}

//sleep function
function sleep(time, callback) {

    var stop = new Date()
        .getTime();
    while (new Date()
        .getTime() < stop + time) {
        ;
    }
    callback();
}

//hexToRgb function
function hexToRgb(hex) {

    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    return [r, g, b];
}

//rgbtohex
function rgbToHex(r, g, b) {

    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

//set B-wing Buttons key numbers functions
function setBwingButtons() {
    if (bwing == 2) {
        if (wing == 6) {
            buttons = [315, 314, 313, 415, 414, 413];
        } else if (wing == 15) {
            buttons = [315, 314, 313, 312, 311, 415, 414, 413, 412, 411, 515, 514, 513, 512, 511];
        } else if (wing == 32) {
            buttons = [315, 314, 313, 312, 311, 310, 309, 308, 415, 414, 413, 412, 411, 410, 409, 408, 515, 514, 513, 512, 511, 510, 509, 508, 615, 614, 613, 612, 611, 610, 609, 608];
        }
    } else if (bwing == 1) {
        if (wing == 6) {
            buttons = [307, 306, 305, 407, 406, 405];
        } else if (wing == 15) {
            buttons = [307, 306, 305, 304, 303, 407, 406, 405, 404, 403, 507, 506, 505, 504, 503];
        } else if (wing == 32) {
            buttons = [307, 306, 305, 304, 303, 302, 301, 300, 407, 406, 405, 404, 403, 402, 401, 400, 507, 506, 505, 504, 503, 502, 501, 500, 607, 606, 605, 604, 603, 602, 601, 600];
        }
    }

    return;
}

setBwingButtons();


streamDeck.on('down', (keyIndex) => {
    if (bwing == 0) {
        //nothing
    }

    else if (pageselect == 1 && keyIndex == streamDeck.KEY_COLUMNS && wing >= 16) {
        if (set_brightness == 0) {
            set_brightness = 1;
            streamDeck.fillKeyBuffer(streamDeck.KEY_COLUMNS, imgButtonBrightness, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
        } else {
            set_brightness = 0;
            PageIcon();
        }
    }

    else if (pageselect == 1 && keyIndex == 0 || pageselect == 1 && wing == 6 & keyIndex == 3 || pageselect == 1 && wing == 15 && keyIndex == 5 || pageselect == 1 && wing == 15 && keyIndex == 10 || pageselect == 1 && wing == 32 && keyIndex == 8 || pageselect == 1 && wing == 32 && keyIndex == 16 || pageselect == 1 && wing == 32 && keyIndex == 24) {

        if (keyIndex == 0) {//Page Plus Button
            if (set_brightness == 1) {
                brightness = (brightness + 10 > 100) ? 100 : brightness + 10;
                console.log("Brightness " + brightness + "%");
                streamDeck.setBrightness(brightness).catch((e) => console.error('Set brightness failed:', e));
            } else {
                pageIndex++;
                if (pageIndex >= 5) {
                    pageIndex = 4;
                } else {
                    console.log("Page " + (pageIndex + 1));
                    PageIcon();
                }
            }

        }

        else if (wing == 6 && keyIndex == 3 || wing == 15 && keyIndex == 10 || wing == 32 && keyIndex == 16) {//Page Minus Button
            if (set_brightness == 1) {
                brightness = (brightness - 10 < 1) ? 2 : brightness - 10;
                console.log("Brightness " + brightness + "%");
                streamDeck.setBrightness(brightness).catch((e) => console.error('Set brightness failed:', e));
            } else {
                pageIndex--;
                if (pageIndex < 0) {
                    pageIndex = 0;
                } else {
                    console.log("Page " + (pageIndex + 1));
                    PageIcon();
                }
            }

        }

        else if (wing == 32 && keyIndex == 24) {

            if (bwing == 1) {
                bwing = 2;
            } else if (bwing == 2) {
                bwing = 1;
            }
            console.log("B-wing " + bwing);
            setBwingButtons();
            BWingIcon();
        }
    }

    else {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons[keyIndex] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":true,"released":false,"type":0,"session":' + session + ',"maxRequests":0}');
    }
});

streamDeck.on('up', (keyIndex) => {

    if (bwing == 0) {
        if (keyIndex == 1 || keyIndex == 2) {
            ledmatrix = [-2, -2, -2];
            console.log("B-wing " + keyIndex);
            bwing = keyIndex;
            setBwingButtons();
            if (pageselect == 1) {
                BWingIcon();
            }

        }
    }

    else if (pageselect == 1 & keyIndex == 0 || pageselect == 1 & wing == 6 & keyIndex == 3 || pageselect == 1 & wing == 15 & keyIndex == 5 || pageselect == 1 & wing == 15 & keyIndex == 10 || pageselect == 1 & wing == 32 & keyIndex == 8 || pageselect == 1 & wing == 32 & keyIndex == 16 || pageselect == 1 & wing == 32 & button == 24) {
        //do nothing
    }

    else {
        client.send('{"requestType":"playbacks_userInput","cmdline":"","execIndex":' + buttons[keyIndex] + ',"pageIndex":' + pageIndex + ',"buttonId":0,"pressed":false,"released":true,"type":0,"session":' + session + ',"maxRequests":0}');
    }

});

streamDeck.on('error', (error) => {
    console.error(error)
});




console.log("Connecting to dot2 ...");
//WEBSOCKET-------------------
client.onerror = function () {
    console.log('Connection Error');
};

client.onopen = function () {

    console.log('WebSocket Client Connected');

    function sendNumber() {

        if (client.readyState === client.OPEN) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            client.send(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    //sendNumber();
};

client.onclose = function () {
    console.log('Client Closed');
    streamDeck.resetToLogo();
    //process.exit();
};

client.onmessage = function (e) {

    request = request + 1;

    //console.log(request);

    if (request >= 10) {

        client.send('{"session":' + session + '}');
        client.send('{"requestType":"getdata","data":"set","session":' + session + ',"maxRequests":1}');
        request = 0;
        /*if (bwing == 0) {
            streamDeck.fillKeyBuffer(0, imgButtonAsk, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));

            streamDeck.fillKeyBuffer(1, imgButton1, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));

            streamDeck.fillKeyBuffer(2, imgButton2, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
        }*/
    }


    if (typeof e.data == 'string') {
        //console.log("Received: '" + e.data + "'");
        //console.log(e.data);

        obj = JSON.parse(e.data);
        //console.log(obj);

        if (obj.status == "server ready") {
            console.log("SERVER READY");
            client.send('{"session":0}')
        }

        if (obj.forceLogin == true) {
            console.log("LOGIN ...");
            session = (obj.session);
            client.send('{"requestType":"login","username":"remote","password":"2c18e486683a3db1e645ad8523223b72","session":' + obj.session + ',"maxRequests":10}');
        }

        if (obj.session == 0) {
            console.log("CONNECTION ERROR");
            client.send('{"session":' + session + '}');
        }

        if (obj.session) {

            if (obj.session == -1) {
                console.log("Please turn on Web Remote, and set Web Remote password to \"remote\"");
                streamDeck.clearPanel();
                process.exit();
            }

            else {
                session = (obj.session);
            }
        }

        if (obj.text) {
            console.log(obj.text);
            text = obj.text;
        }

        if (obj.responseType == "login" && obj.result == true) {
            if (interval_on == 0) {
                interval_on = 1;
                setInterval(interval, 100);//80
            }
            console.log("...LOGGED");
            console.log("SESSION " + session);
            console.log("Page " + (pageIndex + 1));
        }

        else if (obj.responseType == "playbacks") {

            if (obj.responseSubType == 3) {//Executors

                if (mode == 5) {
                    button = 0;
                    for (k = 0; k <= (streamDeck.KEY_ROWS - 1); k++) {

                        for (i = (streamDeck.KEY_COLUMNS - 1); i >= 0; i--) {

                            if (pageselect == 1 & button == 0 || pageselect == 1 & wing == 6 & button == 3 || pageselect == 1 & wing == 15 & button == 5 || pageselect == 1 & wing == 15 & button == 10 || pageselect == 1 & wing == 32 & button == 8 || pageselect == 1 & wing == 32 & button == 16 || pageselect == 1 & wing == 32 & button == 24) { } else {


                                if ((obj.itemGroups[k].items[i][0].i.c) == "#000000") {

                                    if (ledmatrix[button] != -1) {
                                        ledmatrix[button] = -1;
                                        streamDeck.clearKey(button).catch((e) => console.error('Clear failed:', e));
                                    }
                                }

                                else if (obj.itemGroups[k].items[i][0].isRun == 1) {
                                    //ledmatrix_en[button] = obj.itemGroups[k].items[i][0].tt.t

                                    if (ledmatrix[button] != 1 || ledmatrix_en[button] !== obj.itemGroups[k].items[i][0].tt.t) {
                                        ledmatrix[button] = 1;
                                        ledmatrix_en[button] = (obj.itemGroups[k].items[i][0].tt.t);
                                        MyIcon(button, 1, (obj.itemGroups[k].items[i][0].tt.t));//MyIcon(button,ledmatrix,ledmatrix_En)
                                    }
                                }

                                else {

                                    if (ledmatrix[button] != 0 || ledmatrix_en[button] !== obj.itemGroups[k].items[i][0].tt.t) {
                                        ledmatrix[button] = 0;
                                        ledmatrix_en[button] = (obj.itemGroups[k].items[i][0].tt.t);
                                        MyIcon(button, 0, (obj.itemGroups[k].items[i][0].tt.t));//MyIcon(button,ledmatrix,ledmatrix_En)
                                    }
                                }
                            }
                            button++;
                        }
                    }
                }
                else if (mode == 4) {

                    button = 0;
                    for (k = 0; k <= (streamDeck.KEY_ROWS - 1); k++) {

                        for (i = (streamDeck.KEY_COLUMNS - 1); i >= 0; i--) {

                            //console.log("Button " + button);

                            if (pageselect == 1 & button == 0 || pageselect == 1 & wing == 6 & button == 3 || pageselect == 1 & wing == 15 & button == 5 || pageselect == 1 & wing == 15 & button == 10 || pageselect == 1 & wing == 32 & button == 8 || pageselect == 1 & wing == 32 & button == 16 || pageselect == 1 & wing == 32 & button == 24) { } else {

                                if ((obj.itemGroups[k].items[i][0].i.c) == "#000000") {

                                    if (ledmatrix[button] != -1) {
                                        ledmatrix[button] = -1;
                                        streamDeck.clearKey(button).catch((e) => console.error('Clear failed:', e))
                                    }
                                }

                                else if (obj.itemGroups[k].items[i][0].isRun == 1) {

                                    //generate_icon(exec_color, is_run, exec_name, exec_type, cue_name, button)
                                    //is run    ledmatrix[button] = obj.itemGroups[k].items[i][0].isRun
                                    //exec_name ledmatrix_en[button] = obj.itemGroups[k].items[i][0].tt.t
                                    //exec_type ledmatrix_t[button] = obj.itemGroups[k].items[i][0].bottomButtons.items[0].n.t
                                    //cue_name  ledmatrix_cn[button] = obj.itemGroups[k].items[i][0].cues.items[0].t
                                    //button


                                    if (ledmatrix[button] != 1 || ledmatrix_en[button] != (obj.itemGroups[k].items[i][0].tt.t) || ledmatrix_t[button] != (obj.itemGroups[k].items[i][0].bottomButtons.items[0].n.t) || ledmatrix_cn[button] != (obj.itemGroups[k].items[i][0].cues.items[0].t)) {

                                        ledmatrix[button] = 1;
                                        ledmatrix_en[button] = (obj.itemGroups[k].items[i][0].tt.t);
                                        ledmatrix_t[button] = (obj.itemGroups[k].items[i][0].bottomButtons.items[0].n.t);
                                        ledmatrix_cn[button] = (obj.itemGroups[k].items[i][0].cues.items[0].t);

                                        if (typeof (obj.itemGroups[k].items[i][0].cues.items[1]) != "undefined") {
                                            var cue_name = (obj.itemGroups[k].items[i][0].cues.items[1].t);
                                        } else {
                                            var cue_name = (obj.itemGroups[k].items[i][0].cues.items[0].t);
                                        }
                                        if ((obj.itemGroups[k].items[i][0].cues.bC) == "#203F3F") {//If chaser - display BPM
                                            cue_name = (obj.itemGroups[k].items[i][0].cues.items[0].t);
                                        }

                                        generate_icon(obj.itemGroups[k].items[i][0].cues.bC, obj.itemGroups[k].items[i][0].isRun, obj.itemGroups[k].items[i][0].tt.t, obj.itemGroups[k].items[i][0].bottomButtons.items[0].n.t, cue_name, button);

                                    }
                                }

                                else {

                                    if (ledmatrix[button] != 0 || ledmatrix_en[button] != (obj.itemGroups[k].items[i][0].tt.t) || ledmatrix_t[button] != (obj.itemGroups[k].items[i][0].bottomButtons.items[0].n.t) || ledmatrix_cn[button] != (obj.itemGroups[k].items[i][0].cues.items[0].t)) {

                                        ledmatrix[button] = 0;
                                        ledmatrix_en[button] = (obj.itemGroups[k].items[i][0].tt.t);
                                        ledmatrix_t[button] = (obj.itemGroups[k].items[i][0].bottomButtons.items[0].n.t);
                                        ledmatrix_cn[button] = (obj.itemGroups[k].items[i][0].cues.items[0].t);

                                        cue_name = "";

                                        generate_icon('#000000', obj.itemGroups[k].items[i][0].isRun, obj.itemGroups[k].items[i][0].tt.t, obj.itemGroups[k].items[i][0].bottomButtons.items[0].n.t, cue_name, button);

                                    }
                                }
                            }
                            button++;
                        }
                    }
                }

                else if (mode == 3) {
                    button = 0;
                    for (k = 0; k <= (streamDeck.KEY_ROWS - 1); k++) {

                        for (i = (streamDeck.KEY_COLUMNS - 1); i >= 0; i--) {

                            if (pageselect == 1 & button == 0 || pageselect == 1 & wing == 6 & button == 3 || pageselect == 1 & wing == 15 & button == 5 || pageselect == 1 & wing == 15 & button == 10 || pageselect == 1 & wing == 32 & button == 8 || pageselect == 1 & wing == 32 & button == 16 || pageselect == 1 & wing == 32 & button == 24) { } else {

                                if ((obj.itemGroups[k].items[i][0].i.c) == "#000000") {

                                    if (ledmatrix[button] != -1) {
                                        ledmatrix[button] = -1;
                                        streamDeck.clearKey(button).catch((e) => console.error('Clear failed:', e))
                                    }
                                }

                                else if (obj.itemGroups[k].items[i][0].isRun == 1) {

                                    if (ledmatrix[button] != 1 || ledmatrix_en[button] != (findColorIndex(obj.itemGroups[k].items[i][0].tt.t))) {
                                        ledmatrix[button] = 1;
                                        var c = findColorIndex(obj.itemGroups[k].items[i][0].tt.t);
                                        ledmatrix_en[button] = c;

                                        if (c == -1) {
                                            c = 0;
                                        }

                                        streamDeck.fillKeyBuffer(button, array_on[c], { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
                                    }
                                }

                                else {

                                    if (ledmatrix[button] != 0 || ledmatrix_en[button] != (findColorIndex(obj.itemGroups[k].items[i][0].tt.t))) {
                                        ledmatrix[button] = 0;
                                        var c = findColorIndex(obj.itemGroups[k].items[i][0].tt.t);
                                        ledmatrix_en[button] = c;

                                        if (c == -1) {
                                            c = 0;
                                        }

                                        streamDeck.fillKeyBuffer(button, array_off[c], { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
                                    }
                                }
                            }
                            button++;
                        }
                    }
                }

                else if (mode == 2) {

                    button = 0;
                    for (k = 0; k <= (streamDeck.KEY_ROWS - 1); k++) {

                        for (i = (streamDeck.KEY_COLUMNS - 1); i >= 0; i--) {

                            if (pageselect == 1 & button == 0 || pageselect == 1 & wing == 6 & button == 3 || pageselect == 1 & wing == 15 & button == 5 || pageselect == 1 & wing == 15 & button == 10 || pageselect == 1 & wing == 32 & button == 8 || pageselect == 1 & wing == 32 & button == 16 || pageselect == 1 & wing == 32 & button == 24) { } else {

                                if ((obj.itemGroups[k].items[i][0].i.c) == "#000000") {

                                    if (ledmatrix[button] != -1) {
                                        ledmatrix[button] = -1;
                                        streamDeck.clearKey(button).catch((e) => console.error('Clear failed:', e))
                                    }
                                }

                                else if (obj.itemGroups[k].items[i][0].isRun == 1) {

                                    if (ledmatrix[button] != 1) {
                                        ledmatrix[button] = 1;
                                        streamDeck.fillKeyColor(button, R0, G0, B0).catch((e) => console.error('Fill failed:', e))
                                    }
                                }

                                else {

                                    if (ledmatrix[button] != 0) {
                                        ledmatrix[button] = 0;
                                        streamDeck.fillKeyColor(button, R1, G1, B1).catch((e) => console.error('Fill failed:', e))
                                    }
                                }
                            }
                            button++;
                        }
                    }

                }

                else {
                    button = 0;
                    for (k = 0; k <= (streamDeck.KEY_ROWS - 1); k++) {

                        for (i = (streamDeck.KEY_COLUMNS - 1); i >= 0; i--) {

                            if (pageselect == 1 & button == 0 || pageselect == 1 & wing == 6 & button == 3 || pageselect == 1 & wing == 15 & button == 5 || pageselect == 1 & wing == 15 & button == 10 || pageselect == 1 & wing == 32 & button == 8 || pageselect == 1 & wing == 32 & button == 16 || pageselect == 1 & wing == 32 & button == 24) { } else {

                                if ((obj.itemGroups[k].items[i][0].i.c) == "#000000") {

                                    if (ledmatrix[button] != -1) {
                                        ledmatrix[button] = -1;
                                        streamDeck.fillKeyBuffer(button, imgExecEmpty, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
                                    }
                                }

                                else if (obj.itemGroups[k].items[i][0].isRun == 1) {

                                    if (ledmatrix[button] != 1) {
                                        ledmatrix[button] = 1;
                                        streamDeck.fillKeyBuffer(button, imgExecOn, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
                                    }
                                }

                                else {

                                    if (ledmatrix[button] != 0) {
                                        ledmatrix[button] = 0;
                                        streamDeck.fillKeyBuffer(button, imgExecOff, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
                                    }
                                }
                            }
                            button++;
                        }
                    }
                }
            }

            if (obj.responseSubType == 2) {//Faders
                //none
            }
        }
    }
};
