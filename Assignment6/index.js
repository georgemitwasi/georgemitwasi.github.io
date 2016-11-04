// Retrieve the button element from the HTML document
var button = document.getElementsByTagName("button")[0];

// Listen for any "clicks" and when they occur, run the populateTable function
button.addEventListener("click", populateTable);

function populateTable() {

    // Destroy the tables! (if any)
    clearTables();

    // Extract user input from forum
    var rowStart_string = document.getElementsByName("rowStart")[0].value;
    var rowEnd_string = document.getElementsByName("rowEnd")[0].value;
    var colStart_string = document.getElementsByName("colStart")[0].value;
    var colEnd_string = document.getElementsByName("colEnd")[0].value;

    // Error check for any letters or strange characters
    if ( !/^\d+$/.test(rowStart_string) ||
         !/^\d+$/.test(rowEnd_string)   ||
         !/^\d+$/.test(colStart_string) ||
         !/^\d+$/.test(colEnd_string) )
    {
        displayError("Invalid input. Only positive numbers are accepted.");
        return;
    }

    // Use parseInt to convert strings to integers
    var rowStart = parseInt(rowStart_string);
    var rowEnd = parseInt(rowEnd_string);
    var colStart = parseInt(colStart_string);
    var colEnd = parseInt(colEnd_string);

    // Error check for invalid ranges
    if (rowEnd <= rowStart && colEnd <= colStart)
    {
        displayError("All your inputs are invalid ranges!");
        return;
    }
    else if (rowEnd <= rowStart)
    {
        displayError("Your row input is an invalid range!");
        return;
    }
    else if (colEnd <= colStart)
    {
        displayError("Your column input is an invalid range!");
        return;
    }

    // Now we'll create our table
    var table = document.createElement("table");

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

function displayError(message)
{
    // This function displays error messages...
    // The reason I used a table here is so that it
    //     automatically clears when the user hits
    //     submit again.

    // Create a table
    var table = document.createElement("table");

    // Create a row
    var row = document.createElement("tr");

    // Create a cell
    var cellNode = document.createElement("td");

    // Transform the message into a text node
    var message = document.createTextNode(message);

    // Attach all the elements together...
    cellNode.appendChild(message);
    row.appendChild(cellNode);
    table.appendChild(row);
    document.body.appendChild(table);
}
