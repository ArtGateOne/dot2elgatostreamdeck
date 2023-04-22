# dot2elgatostreamdeck


nodejs code to control dot2 software use elgato stream deck controller

Download and instal NODEJS version 14.17 from https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi

Download my code.




How to use

run dot2 software

turn on webremote (password remote)

Open dot2elgatostreamdeck.js use node.exe !


Store some exec on bwing2 page 1 (left up)




--------- when error

run from command prompt (win+R - cmd)

node dot2elgatostreamdeck.js


------------

work in progress (page select buttons ...)


beta
1.1.38 Add color mode (mode 2) & color icons (mode 3)

//CONFIG

var mode = 3;  //set display mode: 1 - ON/Off icons, 2 - ON/Off 2 colors, 3 - icon + colors (color from executor name)


--------------------------------------------------------------------------------

1.0.36 Add select B-wing


//CONFIG

var bwing = 0;      //select B-wing 1 or 2, or set 0 - to on boot screen select

var Page = 1;       //Set Page nr (start)

var wallpaper = 1;  //Wallpaper 1 = ON, 0 = OFF

//END----------------------------------------------------------------------------

1.0.2 Public
