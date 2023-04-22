//dot2elgatestreamdeck beta v.1.1.38

var W3CWebSocket = require('websocket')
    .w3cwebsocket;
var client = new W3CWebSocket('ws://localhost:80/'); //U can change localhost(127.0.0.1) to Your console IP address
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const jpegJS = require('jpeg-js');
const { openStreamDeck } = require('@elgato-stream-deck/node');

//CONFIG
var bwing = 0;      //select B-wing 1 or 2, or set 0 - to on boot screen select
var page = 1;       //Set Page nr (start)
var wallpaper = 1;  //Wallpaper 1 = ON, 0 = OFF
var mode = 3;  //set display mode: 1 - ON/Off icons, 2 - ON/Off 2 colors, 3 - icon + colors (color from executor name)

//Colors - 0 off, 1 on
var R0 = 255;
var G0 = 127;
var B0 = 0;
var R1 = 0;
var G1 = 0;
var B1 = 127;
//END-------------------------------

var request = -2;
var session = 0;
var wing = 0;
var button = 0;
var buttons = [0, 1, 2];
var ledmatrix = [-1, -1, -1];
var ledmatrixc = [-2, -2, -2];
var array_off = [];
var array_on = [];
pageIndex = (page - 1);


const streamDeck = openStreamDeck();
streamDeck.clearPanel();


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


if (bwing == 0) {
    var rawButtonBWS = fs.readFileSync(path.resolve(__dirname, `fixtures/selectbwing_${streamDeck.ICON_SIZE}.jpg`));
    var imgButtonBWS = jpegJS.decode(rawButtonBWS).data;
    var rawButtonBW1 = fs.readFileSync(path.resolve(__dirname, `fixtures/bwing1_${streamDeck.ICON_SIZE}.jpg`));
    var imgButtonBW1 = jpegJS.decode(rawButtonBW1).data;
    var rawButtonBW2 = fs.readFileSync(path.resolve(__dirname, `fixtures/bwing2_${streamDeck.ICON_SIZE}.jpg`));
    var imgButtonBW2 = jpegJS.decode(rawButtonBW2).data;

    streamDeck.fillKeyBuffer(0, imgButtonBWS, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    streamDeck.fillKeyBuffer(1, imgButtonBW1, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
    streamDeck.fillKeyBuffer(2, imgButtonBW2, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
}

//console.log(streamDeck.ICON_SIZE);
//console.log(streamDeck.KEY_COLUMNS);
//console.log(streamDeck.KEY_ROWS);

//stream deck no buttons
wing = (streamDeck.KEY_COLUMNS * streamDeck.KEY_ROWS);

//load and draw select B-wing buttons 0 1 2


//set matrix to exec empty (-1), and matrixc -2 black/none
for (i = 0; i < wing; i++) {
    ledmatrix[i] = -1;
    ledmatrixc[i] = -2;
}

//auto off wallpaper
if (bwing == 0) {
    wallpaper = 0;    //<------------- set to 1 - auto off wallpaper (select bwing boot)
    var buttons = [0, 0, 0];
}

//wallpaper
if (wallpaper == 1) {
    ; (async () => {
        //const streamDeck = openStreamDeck()
        //await streamDeck.clearPanel()

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
            } else if (wing == 15) {
                client.send('{"requestType":"playbacks","startIndex":[311,411,511],"itemsCount":[5,5,5],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            } else if (wing == 32) {
                client.send('{"requestType":"playbacks","startIndex":[308,408,508,608],"itemsCount":[8,8,8,8],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            } else {
                client.send('{"requestType":"playbacks","startIndex":[315],"itemsCount":[1],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }
        } else if (bwing == 1) {
            if (wing == 6) {
                client.send('{"requestType":"playbacks","startIndex":[305,405],"itemsCount":[3,3],"pageIndex":' + pageIndex + ',"itemsType":[3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            } else if (wing == 15) {
                client.send('{"requestType":"playbacks","startIndex":[303,403,503],"itemsCount":[5,5,5],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            } else if (wing == 32) {
                client.send('{"requestType":"playbacks","startIndex":[300,400,500,600],"itemsCount":[8,8,8,8],"pageIndex":' + pageIndex + ',"itemsType":[3,3,3,3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            } else {
                client.send('{"requestType":"playbacks","startIndex":[315],"itemsCount":[1],"pageIndex":' + pageIndex + ',"itemsType":[3],"view":3,"execButtonViewMode":2,"buttonsViewMode":0,"session":' + session + ',"maxRequests":1}');
            }
        } else {
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
            buttons = [307, 306, 305, 304, 303, 302, 301, 300, 407, 406, 405, 404, 403, 402, 401, 400, 507, 506, 505, 504, 503, 502, 501, 501, 607, 606, 605, 604, 603, 602, 601, 600];
        }
    }

    return;
}

setBwingButtons();


streamDeck.on('down', (keyIndex) => {
    if (bwing == 0) {
        //nothing
    } else {
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
        }
    } else {
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
    streamDeck.clearPanel();
    //process.exit();
};

client.onmessage = function (e) {

    request = request + 1;

    //console.log(request);

    if (request >= 10) {
        client.send('{"session":' + session + '}');
        client.send('{"requestType":"getdata","data":"set","session":' + session + ',"maxRequests":1}');
        request = 0;
        if (bwing == 0) {
            streamDeck.fillKeyBuffer(0, imgButtonBWS, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));

            streamDeck.fillKeyBuffer(1, imgButtonBW1, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));

            streamDeck.fillKeyBuffer(2, imgButtonBW2, { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
        }
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
            } else {
                session = (obj.session);
            }
        }

        if (obj.text) {
            console.log(obj.text);
            text = obj.text;
        }


        if (obj.responseType == "login" && obj.result == true) {
            setInterval(interval, 120);//80
            console.log("...LOGGED");
            console.log("SESSION " + session);
        }

        else if (obj.responseType == "playbacks") {

            if (obj.responseSubType == 3) {

                if (mode == 3) {
                    button = 0;
                    for (k = 0; k <= (streamDeck.KEY_ROWS - 1); k++) {

                        for (i = (streamDeck.KEY_COLUMNS - 1); i >= 0; i--) {

                            if ((obj.itemGroups[k].items[i][0].i.c) == "#000000") {

                                if (ledmatrix[button] != -1) {
                                    ledmatrix[button] = -1;
                                    streamDeck.clearKey(button).catch((e) => console.error('Clear failed:', e))
                                }
                            }

                            else if (obj.itemGroups[k].items[i][0].isRun == 1) {

                                if (ledmatrix[button] != 1 || ledmatrixc[button] != (findColorIndex(obj.itemGroups[k].items[i][0].tt.t))) {
                                    ledmatrix[button] = 1;
                                    var c = findColorIndex(obj.itemGroups[k].items[i][0].tt.t);
                                    ledmatrixc[button] = c;
                                    if (c == -1){
                                        c = 0;
                                    }
                                    streamDeck.fillKeyBuffer(button, array_on[c], { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
                                }
                            }

                            else {

                                if (ledmatrix[button] != 0 || ledmatrixc[button] != (findColorIndex(obj.itemGroups[k].items[i][0].tt.t))) {
                                    ledmatrix[button] = 0;
                                    var c = findColorIndex(obj.itemGroups[k].items[i][0].tt.t);
                                    ledmatrixc[button] = c;
                                    if (c == -1){
                                        c = 0;
                                    }
                                    streamDeck.fillKeyBuffer(button, array_off[c], { format: 'rgba' }).catch((e) => console.error('Fill failed:', e));
                                }
                            }
                            button++;
                        }
                    }

                } else if (mode == 2) {
                    button = 0;
                    for (k = 0; k <= (streamDeck.KEY_ROWS - 1); k++) {

                        for (i = (streamDeck.KEY_COLUMNS - 1); i >= 0; i--) {

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
                            button++;
                        }
                    }

                } else {
                    button = 0;
                    for (k = 0; k <= (streamDeck.KEY_ROWS - 1); k++) {

                        for (i = (streamDeck.KEY_COLUMNS - 1); i >= 0; i--) {

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
                            button++;
                        }
                    }

                }
            }

            if (obj.responseSubType == 2) {

            }
        }
    }
};
