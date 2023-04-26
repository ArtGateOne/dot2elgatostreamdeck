# dot2elgatostreamdeck


Nodejs code to control dot2 software use elgato stream deck controller 6, 15 or 32 buttons

Download and instal NODEJS version 14.17 from https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi

Download my code.




How to use

run dot2 software

turn on webremote (password remote)

Open dot2elgatostreamdeck.js use node.exe !


Store some exec on bwing2 page 1 (left up)




- when error

run from command prompt (win+R - cmd)

node dot2elgatostreamdeck.js

...
...
EXTRA

Open .js file in notepad ad find //CONFIG to make some changes

//CONFIG

var bwing = 2;      //select B-wing 1 or 2, or set 0 - to on boot screen select

var page = 1;       //Set Page nr (start)

var wallpaper = 1;  //Wallpaper 1 = ON, 0 = OFF (AutoOff)

var mode =1;       //set display mode: 1 - ON/Off icons, 2 - ON/Off 2 colors, 3 - icon + colors (color from executor name), 4 - exec name + icon + cue name (dot2)

var brightness = 40;//Set display brightness 1-100

var pageselect = 0; //Select page button 1=ON , 0=OFF


----

----


EXTRA - in mode 3

Change Your executor name to Red, Yellow, Sea Green - icon change bacground color.

EXTRA - in mode 5

Rename executor to Center, Straight, Up Fan Out (all icons in MyIcons)


------------
Beta 1.3.35

Add custom icons mode (mode 5)

Custom icons in MyIcons folder

Format PNG (best 96x96)


U can add custom icons to MyIcons folder (best size 96x96) .png

Rename Executor to file name (without .png) ex Sequ.png <--- is default executor name (empty), or Red , Yellow, Blind :D

U can try now - rename executor to Center, Straight, Up Fan Out...

to test

Have fun!


<-

beta 1.2.88

Add display mode 4 - orginal icons + Exec Names & cue

<-

beta
1.1.73 Add Page select buttons (default is off), and brightness

//CONFIG

var brightness = 30;//Set display brightness 1-100

var pageselect = 1; //Select page button 1=ON , 0=OFF

<-

beta
1.1.38 Add color mode (mode 2) & color icons (mode 3)

//CONFIG

var mode = 3;  //set display mode: 1 - ON/Off icons, 2 - ON/Off 2 colors, 3 - icon + colors (color from executor name)

<-

1.0.36 Add select B-wing

//CONFIG

var bwing = 0;      //select B-wing 1 or 2, or set 0 - to on boot screen select

var Page = 1;       //Set Page nr (start)

var wallpaper = 1;  //Wallpaper 1 = ON, 0 = OFF

<-

1.0.2 Public
