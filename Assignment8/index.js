//     File: JavaScript & JQuery file for HW7 in Graphical User Interface Progamming I
//  Created: November 12th, 2016
//   Author: George Mitwasi

// Once the HTML is finished loading, excute this funtction

$(document).ready(function()
{
    // Use of the Java Validation Plugin function, validate()
    $('#form').validate(
    {
        rules:
        {
            // Define rules for mininum row value
            rowStart:
            {
                required: true,
                digits: true,
                range: [-12, 12]
            },
            // Define rules for maximum row value
            rowEnd:
            {
                required: true,
                digits: true,
                range: [-12, 12]
            },
            // Define rules for mininum column value
            colStart:
            {
                required: true,
                digits: true,
                range: [-12, 12]
            },
            // Define rules for maximum column value
            colEnd:
            {
                required: true,
                digits: true,
                range: [-12, 12]
            }
        }
    });

    populateTable();

    // Create rules for sliders, and once passed populateTable()
    $('#firstSlider').slider(
    {
        min: -12,
        max: 12,
        value: parseInt($("#rowStart").val()),
        slide: function(e, ui)
        {
            $("#rowStart").val(ui.value);
            populateTable();
        }
    });
    $('#secondSlider').slider(
    {
        min: -12,
        max: 12,
        value: parseInt($("#rowEnd").val()),
        slide: function(e, ui)
        {
            $("#rowEnd").val(ui.value);
            populateTable();
        }
    });
    $('#thirdSlider').slider(
    {
        min: -12,
        max: 12,
        value: parseInt($("#colStart").val()),
        slide: function(e, ui)
        {
            $("#colStart").val(ui.value);
            populateTable();
        }
    });
    $('#fourthSlider').slider(
    {
        min: -12,
        max: 12,
        value: parseInt($("#colEnd").val()),
        slide: function(e, ui)
        {
            $("#colEnd").val(ui.value);
            populateTable();
        }
    });

    // When they click submit, populateTable()
    $("#inputs .btn").click(function(e)
    {
        e.preventDefault();
        createTable();
    });

    // If they type into the text boxes, update the sliders
    $("#rowStart").on("keyup", function()
    {
        populateTable();
        $("#firstSlider").slider("value", parseInt($("#rowStart").val()))
    });
    $("#rowEnd").on("keyup", function()
    {
        populateTable();
        $("#secondSlider").slider("value", parseInt($("#rowEnd").val()))
    });
    $("#colStart").on("keyup", function()
    {
        populateTable();
        $("#thirdSlider").slider("value", parseInt($("#colStart").val()))
    });
    $("#colEnd").on("keyup", function()
    {
        populateTable();
        $("#fourthSlider").slider("value", parseInt($("#colEnd").val()))
    });

    // Allow the below code to excute using
    $('#form').on('submit', function()
    {
        return false;
    })

    // Retrieve the button element from the HTML document
    var button = document.getElementsByTagName("button")[0];

    // Listen for any "clicks" and when they occur, run the populateTable function
    button.addEventListener("click", populateTable);

    function populateTable()
    {
        // Destroy the tables! (if any)
        clearTables();

        // Extract user input from forum
        var rowStart_string = document.getElementsByName("rowStart")[0].value;
        var rowEnd_string = document.getElementsByName("rowEnd")[0].value;
        var colStart_string = document.getElementsByName("colStart")[0].value;
        var colEnd_string = document.getElementsByName("colEnd")[0].value;

        // Use parseInt to convert strings to integers
        var rowStart = parseInt(rowStart_string);
        var rowEnd = parseInt(rowEnd_string);
        var colStart = parseInt(colStart_string);
        var colEnd = parseInt(colEnd_string);

        // Now we'll create our table
        var table = document.createElement("table");

        // Here, we're making it so that if anything is out of range a table will still
        // ... be produced
        if (rowStart > rowEnd)
        {
            var temp = rowStart;
            rowStart = rowEnd;
            rowEnd = temp;
        }
        if (colStart > colEnd)
        {
            var temp = colStart;
            colStart = colEnd;
            colEnd = temp;
        }

        // This outer for loop iterates through the rows
        for (var j = rowStart - 1; j <= rowEnd; j++)
        {
            // Create a new row
            var row = document.createElement("tr");

            // This inner for loop iterates through the columns, which lets us down into each cell
            for (var i = colStart - 1; i <= colEnd; i++)
            {
                // Create a new cell
                var cellNode = document.createElement("td");

                // We have 4 cases for the cells we'll encounter
                // 1) For the empty box in the top left, when j = rowStart - 1 and i = colStart - 1, make it empty
                // 2) For the top row with values, when j = rowStart - 1, just populate with j
                // 3) For the left coloum with values, when i = colStart - 1, just populate with i
                // 4) For everything else, td = i * j

                // Create the cell value to be appended to cellNode
                var cellValue;

                // Upper left cell is an empty box
                if (j == rowStart - 1 && i == colStart - 1)
                {
                    cellValue = document.createTextNode(" ");
                }
                // Top row consits of multipliers
                else if (j == rowStart - 1)
                {
                    cellValue = document.createTextNode( '' + i );
                }
                // Leftmost colum consits of multiplicands
                else if (i == colStart - 1)
                {
                    cellValue = document.createTextNode( '' + j );
                }
                // All other cells are to be treated normally
                else
                {
                    cellValue = document.createTextNode( '' + (j * i) );
                }

                // Now we can append our cellValue to the cellNode...
                cellNode.appendChild(cellValue);

                // and append our cell <td> to the row!
                row.appendChild(cellNode);
            }

            // Once this row is complete, we can append it to the table
            table.appendChild(row);

            // addTab();
        }

        // Append the table to the HTML body
        document.getElementById("container").appendChild(table);
    }

    function clearTables()
    {
        // Retrieve any tables from the HTML page
        var elements = document.getElementsByTagName("table");

        //... and delete them
        for (var i = 0; i < elements.length; i++)
        {
            elements[i].parentElement.removeChild(elements[i]);
        }
    }

    function addTab()
    {
        $('#tabs').show();
        // Save the current number of tabs
        var numTabs = $('div#tabs ul li'). length;

        // If the number of tabs is still acceptable
        if (numTabs < 10)
        {
            // Update the number of tabs
            numTabs = $('div#tabs ul li'). length;

            // Extract user input from forum
            var num1 = parseInt(document.getElementsByName("rowStart")[0].value);
            var num2 = parseInt(document.getElementsByName("rowEnd")[0].value);
            var num3 = parseInt(document.getElementsByName("colStart")[0].value);
            var num4 = parseInt(document.getElementsByName("colEnd")[0].value);

            // // Create a new tab
            // $('div#tabs ul').append(
            //     "<li id='tabHeader" + tableName +
            //     "'><a href='#tab" + tableName +
            //     "'>Table " + tableName +
            //     ": (" + n1 + " to " + n2 + ") * (" +
            //     n3 + " to " + n4 + ")</a></li>"
            // );
            // $("div#tabs").append(
            //     "<div id='tab" + tableName +
            //     "'><div id='table" + tableName +
            //     "'></div></div>"
            // );
            //
            // // Refresh tabs...
            // $('div#tabs').tabs('refresh');
            // // ... and set the recently added tab to 'active'
            // $('#tabs').tabs(
            // {
            //     active: numTabs
            // });
        }
        else
        {
            // display error message for too many tabs!
        }
    }
});
