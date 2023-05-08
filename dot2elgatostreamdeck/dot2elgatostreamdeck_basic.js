//dot2elgatestreamdeck beta v.1.0.48

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
var Page = 1;       //Set Page nr (start)
//END-------------------------------


var request = -2;
var session = 0;
var wing = 0;
var pageIndex = (Page - 1);
var button = 0;
var buttons = [0, 1, 2];
var ledmatrix = [-1, -1, -1];

const streamDeck = openStreamDeck();
streamDeck.clearPanel();

const rawExecEmpty = fs.readFileSync(path.resolve(__dirname, `fixtures/ExecEmpty_${streamDeck.ICON_SIZE}.jpg`));    //Exec Empty icon
const imgExecEmpty = jpegJS.decode(rawExecEmpty).data;
const rawExecOn = fs.readFileSync(path.resolve(__dirname, `fixtures/ExecOn_${streamDeck.ICON_SIZE}.jpg`));          //Exec ON icon
const imgExecOn = jpegJS.decode(rawExecOn).data;
const rawExecOff = fs.readFileSync(path.resolve(__dirname, `fixtures/ExecOff_${streamDeck.ICON_SIZE}.jpg`));        //Exec OFF icon
const imgExecOff = jpegJS.decode(rawExecOff).data;

//load and draw select B-wing buttons 0 1 2
if (bwing == 0) {
    var rawButtonBWS = fs.readFileSync(path.resolve(__dirname, `fixtures/ask_${streamDeck.ICON_SIZE}.jpg`));
    var imgButtonBWS = jpegJS.decode(rawButtonBWS).data;
    var rawButtonBW1 = fs.readFileSync(path.resolve(__dirname, `fixtures/1_${streamDeck.ICON_SIZE}.jpg`));
    var imgButtonBW1 = jpegJS.decode(rawButtonBW1).data;
    var rawButtonBW2 = fs.readFileSync(path.resolve(__dirname, `fixtures/2_${streamDeck.ICON_SIZE}.jpg`));
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

//set matrix to exec empty (-1)
for (i = 0; i < wing; i++) {
    ledmatrix[i] = -1;
}


//sleep function
sleep(1000, function () {
    // executes after one second, and blocks the thread
});

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

            if (obj.responseSubType == 2) {

            }
        }
    }
};
