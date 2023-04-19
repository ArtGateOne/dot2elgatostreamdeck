/*
var W3CWebSocket = require('websocket')
    .w3cwebsocket;
var client = new W3CWebSocket('ws://localhost:80/'); //U can change localhost(127.0.0.1) to Your console IP address
*/
/*const { openStreamDeck } = require('../dist/index')*/
const { openStreamDeck } = require('@elgato-stream-deck/node')
const streamDeck = openStreamDeck()


console.log("Press key to select brightness")
//console.log(streamDeck.ICON_SIZE);
//console.log(streamDeck.KEY_COLUMNS);
//console.log(streamDeck.KEY_ROWS);

// Fill it white so we can see the brightness changes
for (let i = 0; i < streamDeck.NUM_KEYS; i++) {
	streamDeck.fillKeyColor(i, 255, 255, 255).catch((e) => console.error('Fill failed:', e))
}

streamDeck.on('down', (keyIndex) => {
	const percentage = (100 / (streamDeck.NUM_KEYS - 1)) * keyIndex
	console.log(`Setting brightness to ${percentage.toFixed(2)}%`)
	streamDeck.setBrightness(percentage).catch((e) => console.error('Set brightness failed:', e))
})

streamDeck.on('error', (error) => {
	console.error(error)
})