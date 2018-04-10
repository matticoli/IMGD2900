﻿//Team DRMGames

// game.js for Perlenspiel 3.2

// The "use strict" directive in the following line is important. Don't alter or remove it!
"use strict";

// The following comment lines are for JSLint/JSHint. Don't alter or remove them!

/*jslint nomen: true, white: true */
/*global PS */

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
[system] = an object containing engine and platform information; see API documentation for details.
[options] = an object with optional parameters; see API documentation for details.
*/

var tarR, tarG, tarB, tarHex;

var paintbrush;

function fill(x, y, r, g, b) {
    if (x == 0 && y == 0) {
        PS.applyRect(2, 0, 2, 2, function (i, j) {
            PS.color(i, j, r, g, b);
            PS.border(i, j, 0);
            PS.visible(i, j, true);
        });
    }

    if (x == 1 && y == 0) {
        PS.applyRect(4, 0, 2, 2, function (i, j) {
            PS.color(i, j, r, g, b);
            PS.border(i, j, 0);
            PS.visible(i, j, true);
        });
    }

    if (x == 0 && y == 1) {
        PS.applyRect(2, 2, 2, 2, function (i, j) {
            PS.color(i, j, r, g, b);
            PS.border(i, j, 0);
            PS.visible(i, j, true);
        });
    }

    if (x == 1 && y == 1) {
        PS.applyRect(4, 2, 2, 2, function (i, j) {
            PS.color(i, j, r, g, b);
            PS.border(i, j, 0);
            PS.visible(i, j, true);
        });
    }
}

PS.init = function (system, options) {
    var x = 0, y = 0;
    var r, g, b;

    //set grid to 9 by 9
    PS.gridSize(8, 8);

    PS.gridColor(PS.COLOR_BLACK);

    PS.applyRect(0, 0, 8, 8, function(i, j) {
        PS.border(i, j, 0);
        PS.color(i, j, 0x000000);
        PS.visible(i, j, false);

    });

    paintbrush = 0x000000;

    //TODO BGM


    //randomize square colors for play area
    while (y < 2) {
        while (x < 2) {
            g = (PS.random(5)) * 51; // random green
            r = (PS.random(5)) * 51; // random red
            b = (PS.random(5)) * 51; // random blue

            //if bead is randomly set to the target hex, reset
            // while (tarR === r && tarG === g && tarB === b) {
            //     r = PS.random(256) - 1; // random red 0-255
            //     g = PS.random(256) - 1; // random green
            //     b = PS.random(256) - 1; // random blue
            // }

            fill(x, y, r, g, b); // set bead color
            // PS.fade(x, y, 60);
6
            x = x + 1; //increment
        }
        y = y + 1; //increment
        x = 0; //reset
    }

    PS.statusColor(0xFFFFFF);

    PS.color(2, 6, 0xFF0000);
    PS.color(3, 6, 0x00FF00);
    PS.color(4, 6, 0x0000FF);
    PS.color(5, 6, 0xFFFFFF);
    PS.visible(2, 6, true);
    PS.visible(3, 6, true);
    PS.visible(4, 6, true);
    PS.visible(5, 6, true);

    //Instructions button
    PS.glyph(0, 7, "i");
    PS.glyphColor(0, 7, PS.COLOR_WHITE);
    PS.radius(0, 7, 50);
    PS.border(0, 7, 3);
    PS.fade(0, 7, 30);
    PS.borderColor(0, 7, PS.COLOR_WHITE);
    PS.visible(0, 7, true);
    //Help button
    PS.glyph(7, 7, "?");
    PS.glyphColor(7, 7, PS.COLOR_WHITE);
    PS.radius(7, 7, 50);
    PS.border(7, 7, 3);
    PS.fade(7, 7, 30);
    PS.borderColor(7, 7, PS.COLOR_WHITE);
    PS.visible(7, 7, true);

};

/*
PS.touch ( x, y, data, options )
Called when the mouse button is clicked on a bead, or when a bead is touched.
It doesn't have to do anything.
[x] = zero-based x-position of the bead on the grid.
[y] = zero-based y-position of the bead on the grid.
[data] = the data value assigned to this bead by a call to PS.data(); default = 0.
[options] = an object with optional parameters; see API documentation for details.
*/

function spiral(n) {

    var k = Math.ceil((Math.sqrt(n) - 1) / 2);
    var t = 2 * k + 1;
    var m = t ^ 2;
    t = t - 1;

    if (n >= m - t) {
        return [k - (m - n), -k];
    } else {
        m = m - t;
    }

    if (n >= m - t) {
        return [-k, -k + (m - n)];
    } else {
        m = m - t
    }

    if (n >= m - t) {
        return [-k + (m - n), k];
    } else {
        return [k, k - (m - n - t)];
    }
}

//When the bead is clicked
PS.touch = function (x, y, data, options) {
    // var changeXL, changeXR, changeYL, changeYR;
    //
    // PS.audioPlay("fx_click");
    //
    // //loop through to change surrounding RGB values
    // changeXL= x-1;
    // changeYL= y-1;
    // changeXR= x+1;
    // changeYR= y+1;
    //
    // //HAS TO LOOP WHEN IT MAXES OUT
    // while(changeXL>=0){
    //
    //
    //    changeXL=changeXL-1;
    // }

    if(y == 6) {
        PS.audioPlay("fx_rip");
        switch(x) {
            case 2:
                paintbrush = 0x330000;
                break;
            case 3:
                paintbrush = 0x003300;

                break;
            case 4:
                paintbrush = 0x000033;

                break;
            case 5:
                paintbrush = 0x333333;

                break;
        }
        PS.statusText("Brush:" + PS.hex(paintbrush, 6));
        PS.fade(x, y, 20, {rgb: PS.COLOR_BLACK});
        PS.color(x, y, PS.color(x, y));
    }

    PS.applyRect(2, 0, 4, 4, function(i, j) {
        // PS.debug(i + "," + j+ "\n");
        var c = PS.unmakeRGB(PS.color(x, y), {});
        var prgb = PS.unmakeRGB(paintbrush, {});
        var col = c;
        col.r = (c.r + prgb.r) > 255 ? 0 : (c.r + prgb.r);// % 255;
        col.g = (c.g + prgb.g) > 255 ? 0 : (c.g + prgb.g);// % 255;
        col.b = (c.b + prgb.b) > 255 ? 0 : (c.b + prgb.b);// % 255;

       if(x == i && y == j) {
           if(paintbrush !==0) {
                PS.audioPlay("fx_drip2");
           } else {
               setTimeout(function() {
                   PS.statusText("Try selecting a brush first!");
               },100);
               PS.audioPlay("fx_uhoh");
               return;
           }

           if(j == 0 ||  j==1) {
               switch(i) {
                   case 2:
                   case 3:
                       fill(0, 0, col.r, col.g, col.b);
                       break;
                   case 4:
                   case 5:
                       fill(1, 0, col.r, col.g, col.b);
                       break;
                   default:
                       break;
               }
           } else if(j == 2 ||  j==3) {
               switch(i) {
                   case 2:
                   case 3:
                       fill(0, 1, col.r, col.g, col.b);
                       break;
                   case 4:
                   case 5:
                       fill(1, 1, col.r, col.g, col.b);
                       break;
                   default:
                       break;
               }
           }
       }
    });

    var color = PS.hex(PS.color(x, y), 6);//"0x" + ((1 << 24) + (components.r << 16) + (components.g << 8) + components.b).toString(16).slice(1) + "\n";

    var colorSum = (PS.color(2, 0) + PS.color(4, 0) + PS.color(2, 2) + PS.color(4, 2));

    if((colorSum / PS.color(4, 2) === 4)) {
        setTimeout(function() {
            PS.audioPlay("fx_coin7");
            PS.audioPlay("fx_coin7");
            PS.gridFade(60, {onEnd: function() {
                    setTimeout(function() {
                        PS.init();
                    }, 800);
                }});
            PS.gridColor(PS.color(2, 0));
        }, 100);
    } else if((colorSum === 0)) {
        PS.audioPlay("fx_coin7");
        PS.audioPlay("fx_coin7");
        setTimeout(function() {
            PS.init();
        }, 900);
    }

    if(x == 0 && y == 7) {
        PS.statusText("Make all 4 tiles the same — Hover to see hex");
        PS.audioPlay("fx_bucket");
        PS.color(0, 7, 0x555555);
    }else if(x == 7 && y == 7) {
        PS.statusText("Note what each brush does to the hex value!");
        PS.audioPlay("fx_bucket");
        PS.color(7, 7, 0x555555);
    }
    if(y >= 6) {
        // Don't show status text for  brushes
        return;
    }
    //print target hex and current bead's hex
    PS.statusText("Brush:" + PS.hex(paintbrush, 6) + "\t\tHover: " + color);

};


/*
PS.enter ( x, y, button, data, options )
Called when the mouse/touch enters a bead.
It doesn't have to do anything.
[x] = zero-based x-position of the bead on the grid.
[y] = zero-based y-position of the bead on the grid.
[data] = the data value assigned to this bead by a call to PS.data(); default = 0.
[options] = an object with optional parameters; see API documentation for details.
*/

//When mouse cursor hovers over a bead
PS.enter = function (x, y, data, options) {
    var color;
    var components;

    //find RGB values of current bead
    components = PS.unmakeRGB(PS.color(x, y), {});

    if(x == 0 && y == 7) {
        PS.statusText("Click for Instructions");
        PS.color(0, 7, 0x333333);
    }else if(x == 7 && y == 7) {
        PS.statusText("Click for Hint");
        PS.color(7, 7, 0x333333);
    }

    if(y == 6 && x > 1 && x < 6) {
        PS.statusText("Select brush — All brushes are additive!");
    }


    if(y >= 6) {
        // Don't show hover for  brushes
        return;
    }


    //convert RGB values to hex
    color = PS.hex(PS.color(x, y), 6);//"0x" + ((1 << 24) + (components.r << 16) + (components.g << 8) + components.b).toString(16).slice(1) + "\n";

    //print target hex and current bead's hex
    PS.statusText("Brush:" + PS.hex(paintbrush, 6) + ((x > 1 && x < 6 && y < 4) ? ("\t\tHover: " + color) : ""));
};


/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits a bead.
It doesn't have to do anything.
[x] = zero-based x-position of the bead on the grid.
[y] = zero-based y-position of the bead on the grid.
[data] = the data value associated with this bead, 0 if none has been set.
[options] = an object with optional parameters; see API documentation for details.
*/


PS.exit = function( x, y, data, options ) {
    if(x == 0 && y == 7) {
        PS.statusText("Brush:" + PS.hex(paintbrush, 6));
        PS.color(0, 7, 0x0);
        return;
    } else if(x == 7 && y == 7) {
        PS.statusText("Brush:" + PS.hex(paintbrush, 6));
        PS.color(7, 7, 0x0);
        return;
    } else if (y == 6 && x > 1 && x < 6) {
        PS.statusText("Brush:" + PS.hex(paintbrush, 6));
    }
    // Uncomment the following code line to inspect x/y parameters:
    //PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

    // Add code here for when the mouse cursor/touch exits a bead.

};



/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
It doesn't have to do anything.
[options] = an object with optional parameters; see API documentation for details.
*/


/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-17 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.
*/