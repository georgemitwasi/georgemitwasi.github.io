//     File: JavaScript & JQuery file for HW9 in Graphical User Interface Progamming I
//  Created: December 6th, 2016
//   Author: George Mitwasi

// Once the HTML is finished loading, excute this funtction
$(document).ready(function()
{
    // Store the values for each tile
    var value = tileValues();
    // Variable to store user's score
    var userScore = 0;
    // If the user lands the orange tile
    var multiplier = 1;
    // Make our tiles!
    var tiles = populateTiles();

    // Draw some tiles for the rack
    var currentSelection = selectTiles(tiles);

    // Create an On Click Lister for the 'moreTiles' button
    $("#moreTiles").on("click", function() {
        removeTiles();
        currentSelection = selectTiles(tiles);
        drawTiles(currentSelection);
    });

    // Create an On-Click Lister for the 'newGame' button
    $("#resetGame").on("click", function() {
        removeTiles();
        resetBoard();
    });

    // Make the board droppable
    $(".board-tile").droppable({
        accept: ".ui-draggable",
        greedy: true,
        revert: true,
        drop: function(e, ui) {
            var val = parseInt($(ui.draggable).find(".value").text());
            if($(this).hasClass("double-word")) {
                multiplier = multiplier * 2;
            }
            userScore += val;
            updateScore();
        }
    });

    /* Function to store all of our tile values */
    function tileValues() {
        var value = {
            // Tile has a VALUE 1
            "A": 1,

            // Tile 'B' has a VALUE 3
            "B": 3,

            // Tile 'C' hsa a VALUE 3
            "C": 3,

            // Tile 'D' has a VALUE 2
            "D": 2,

            // Tile 'E' has a VALUE 1
            "E": 1,

            // Tile 'F' has a VALUE 4
            "F": 4,

            // Tile 'G' has a VALUE 2
            "G": 2,

            // Tile 'H' has a VALUE 4
            "H": 4,

            // Tile 'I' has a VALUE 1
            "I": 1,

            // Tile 'J' has a VALUE 8
            "J": 8,

            // Tile 'K' has a VALUE 5
            "K": 5,

            // Tile 'L' has a VALUE 1
            "L": 1,

            // Tile 'M' has a VALUE 3
            "M": 3,

            // Tile 'N' has a VALUE 1
            "N": 1,

            // Tile 'O' has a VALUE 1
            "O": 1,

            // Tile 'P' has a VALUE 3
            "P": 3,

            // Tile 'Q' has a VALUE 10
            "Q": 10,

            // Tile 'R' has a VALUE 1
            "R": 1,

            // Tile 'S' has a VALUE 1
            "S": 1,

            // Tile 'T' has a VALUE 1
            "T": 1,

            // Tile 'U' has a VALUE 1
            "U": 1,

            // Tile 'V' has a VALUE 4
            "V": 4,

            // Tile 'W' has a VALUE 4
            "W": 4,

            // Tile 'X' has a VALUE 8
            "X": 8,

            // Tile 'Y' has a VALUE 4
            "Y": 4,

            // Tile 'Z' has a VALUE 10
            "Z": 10,

            // Blank Tile has VALUE 0
            " ": 0
        };

        return value;
    }

    function populateTiles( arr ) {
        var tiles = [];
        var i;

        for (i = 1; i <= 9; i++) {
            tiles.push("A");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push("B");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push("C");
        }
        for (i = 1; i <= 4; i++) {
            tiles.push("D");
        }
        for (i = 1; i <= 12; i++) {
            tiles.push("E");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push("F");
        }
        for (i = 1; i <= 3; i++) {
            tiles.push("G");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push("H");
        }
        for (i = 1; i <= 9; i++) {
            tiles.push("I");
        }
        for (i = 1; i <= 1; i++) {
            tiles.push("J");
        }
        for (i = 1; i <= 1; i++) {
            tiles.push("K");
        }
        for (i = 1; i <= 4; i++) {
            tiles.push("L");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push("M");
        }
        for (i = 1; i <= 6; i++) {
            tiles.push("N");
        }
        for (i = 1; i <= 8; i++) {
            tiles.push("O");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push("P");
        }
        for (i = 1; i <= 1; i++) {
            tiles.push("Q");
        }
        for (i = 1; i <= 6; i++) {
            tiles.push("R");
        }
        for (i = 1; i <= 4; i++) {
            tiles.push("S");
        }
        for (i = 1; i <= 6; i++) {
            tiles.push("T");
        }
        for (i = 1; i <= 4; i++) {
            tiles.push("U");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push("V");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push("W");
        }
        for (i = 1; i <= 1; i++) {
            tiles.push("X");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push("Y");
        }
        for (i = 1; i <= 1; i++) {
            tiles.push("Z");
        }
        for (i = 1; i <= 2; i++) {
            tiles.push(" ");
        }

        return tiles;
    }

    /*  Function to shuffle our tiles in place
        Source: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript */
    function shuffleTiles( arr ) {
        var j, x, i;
        for ( i = arr.length; i; i-- )
        {
            j = Math.floor( Math.random() * i );
            x = arr[i - 1];
            arr[ i - 1 ] = arr[ j ];
            arr[ j ] = x;
        }
    }

    /* Function to select seven tiles for the user */
    function selectTiles( arr ) {
        // Array to be returned with drawn tiles
        var tilesDrawn = [];

        // Shuffle the array of tiles
        shuffleTiles( arr );

        // Remove 10 and put them in the new bin
        tilesDrawn = arr.splice(0, 7);

        // Return the selcted tiles
        return tilesDrawn;
    }

    function removeTiles() {
        $(".rack-tile").remove();
    }

    function drawTiles( arr ) {
        var i;
        for (i = 0; i < 7; i++) {
            if( arr.length < 2 || arr == undefined ) {
                // you're out of tiles!
                throw "You're out of tiles :("
            }
            else {
                // Store the letter
                var letter = arr[ i ];

                // Create a new tile
                var tile = document.createElement("div");
                tile.className = "rack-tile";

                // Add it's letter
                var tileLetter = document.createElement("p");
                var letterNode = document.createTextNode( letter );
                tileLetter.appendChild( letterNode );
                tileLetter.className = "letter";

                // Add it's value
                var tileValue = document.createElement("p");
                var valueNode = document.createTextNode(value[letter]);
                tileValue.appendChild( valueNode );
                tileValue.className = "value";

                // Append the letter and value to the tile
                tile.appendChild( tileLetter );
                tile.appendChild( tileValue );

                // Append it to the rack
                document.getElementById("rack").appendChild( tile );
            }

            updateTilesLeft(tiles);
        }

        // make the tiles draggable
        $(".rack-tile").draggable({
            snap: ".tile",
            cursor: "move",
            appendTo: ".tile",
            snapMode: "inner",
            revert: "invalid",
            grid: [7,1],
            start: function() {
            }
        });
    }

    /* Function to reset the board! */
    function resetBoard() {
        // Reset the user's score
        userScore = 0;
        updateScore();

        // Repopulate the tiles
        tiles = populateTiles();
        updateTilesLeft( tiles );
    }

    /* Function to update the user's Scrabble score */
    function updateScore() {
        var newScore = userScore * multiplier;
        $("#scoreValue").text(newScore);
    }

    /* Function that returns the tiles left */
    function updateTilesLeft( arr ) {
        $("#tilesLeft").text( "Tiles left: " + arr.length );
    }
});
