//     File: JavaScript & JQuery file for HW7 in Graphical User Interface Progamming I
//  Created: November 22th, 2016
//   Author: George Mitwasi

// Once the HTML is finished loading, excute this funtction

$(document).ready(function(){

    // Initialize our tabs
    $("#tabs").tabs();

    // Counter for the number of tabs/table on our page
    var tabCount = 0;

    // Use the Java Validation Plugin function, validate(), for input validation
    $("#form").validate({
        rules: {
            // Define rules for mininum row value
            rowStart:{
                required: true,
                digits: true,
                range: [-12, 12] },
            // Define rules for maximum row value
            rowEnd:{
                required: true,
                digits: true,
                range: [-12, 12] },
            // Define rules for mininum column value
            colStart:{
                required: true,
                digits: true,
                range: [-12, 12] },
            // Define rules for maximum column value
            colEnd:{
                required: true,
                digits: true,
                range: [-12, 12] }
        }
    });

    // Create rules for sliders, and once passed populateTable()
    $('#firstSlider').slider({
        min: -12,
        max: 12,
        value: parseInt($("#rowStart").val()),
        slide: function(e, ui){
            $("#rowStart").val(ui.value);
        }
    });
    $('#secondSlider').slider({
        min: -12,
        max: 12,
        value: parseInt($("#rowEnd").val()),
        slide: function(e, ui) {
            $("#rowEnd").val(ui.value);
        }
    });
    $('#thirdSlider').slider({
        min: -12,
        max: 12,
        value: parseInt($("#colStart").val()),
        slide: function(e, ui){
            $("#colStart").val(ui.value);
        }
    });
    $('#fourthSlider').slider({
        min: -12,
        max: 12,
        value: parseInt($("#colEnd").val()),
        slide: function(e, ui){
            $("#colEnd").val(ui.value);
        }
    });

    // When 'Submit' is clicked, populateTable()
    // and reinitialize the tabs
    $("#submit").click(function(e){

        e.preventDefault();
        populateTable();

        // Initialize the tabs
        $("#tabs").tabs({
            "active": -1
        });
    });

    // If they type into the text boxes, update the sliders
    $("#rowStart").on("keyup", function(){
        $("#firstSlider").slider("value", parseInt($("#rowStart").val()))
    });
    $("#rowEnd").on("keyup", function(){
        $("#secondSlider").slider("value", parseInt($("#rowEnd").val()))
    });
    $("#colStart").on("keyup", function(){
        $("#thirdSlider").slider("value", parseInt($("#colStart").val()))
    });
    $("#colEnd").on("keyup", function(){
        $("#fourthSlider").slider("value", parseInt($("#colEnd").val()))
    });

    // Delete the clicked on tabs table as well as the table itself
    $(document).on("click", ".deleteBtn", function(){

        var tab = $(this).data("tab");
        $("div#" + tab).remove();
        $("[data-checkbox=" + tab + "]").remove();
        $(this).closest("li").remove();

        // Set the current active tab to the last tab
        $("#tabs").tabs({
            "active": -1
        });

        // If there are 0 tables hide the delete button section
        if($(".checkbox").length > 0) {
            $(".deleteMultiple").show();
        } else {
            $(".deleteMultiple").hide();
            tabCount = 0;
        }
    });

    // This section deletes multiple Tables
    $("#deleteTables").on("click", function(e) {

        e.preventDefault();

        // Here I'm pulling out all the checked tabs
        var tabs = $("input:checked");

        // Store each tab ID upon initialization
        tabs.each(function() {
            var tab = $(this).attr("data-checkbox");
            $("div#" + tab).remove();
            $("[data-checkbox=" + tab + "]").remove();
            $("[data-tab=" + tab + "]").closest("li").remove();
            $("#tabs").tabs({
                "active": -1
            });
        })

        // If there are no tabs, hide the 'Delete Multiple' button
        if($(".checkbox").length > 0) {
            $(".deleteMultiple").show();
        } else {
            $(".deleteMultiple").hide();
            count = 0;
        }
    });

    // Same as above to ensure 'Delete Multiple' is hidden
    if($(".checkbox").length > 0) {
        $(".deleteMultiple").show();
    }
    else {
        $(".deleteMultiple").hide();
    }

    function populateTable(saveTab){

        tabCount++;

        // Create a tab element
        var newTab = $("<li></li>");

        // Create a delete button for our tab
        var delete_btn = $("<div>");
        delete_btn.attr("class", "deleteBtn");
        delete_btn.attr("data-tab", "tab-" + tabCount);
        delete_btn.text("X");

        // Add the delete button to our tab
        newTab.append(delete_btn);

        var href=$("<a></a>");
        href.attr("href", "#tab-" + tabCount);
        href.text("Tab " + tabCount);
        newTab.append(href);
        $("#tabs ul").append(newTab);
        $("#tabs").append($("#table-" + tabCount));

        // Extract user input from forum
        var rowStart =  parseInt( document.getElementsByName("rowStart")[0].value );
        var rowEnd   =  parseInt( document.getElementsByName("rowEnd")[0].value );
        var colStart =  parseInt( document.getElementsByName("colStart")[0].value );
        var colEnd   =  parseInt( document.getElementsByName("colEnd")[0].value );

        // Create our table and table container
        var tableContainer = $("<div>");
        tableContainer.attr("id", "tab-" + tabCount);
        tableContainer.append("<table>");
        var table = tableContainer.find("table");

        // Here, we're making it so that if anything is out of range a table will still
        // ... be produced
        if (rowStart > rowEnd){
            var temp = rowStart;
            rowStart = rowEnd;
            rowEnd = temp;
        }
        if (colStart > colEnd){
            var temp = colStart;
            colStart = colEnd;
            colEnd = temp;
        }

        // This outer for loop iterates through the rows
        for (var j = rowStart - 1; j <= rowEnd; j++) {
            // Create a new row
            var row = document.createElement("tr");

            // This inner for loop iterates through the columns, which lets us down into each cell
            for (var i = colStart - 1; i <= colEnd; i++) {
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
                if (j == rowStart - 1 && i == colStart - 1) {
                    cellValue = document.createTextNode(" ");
                }
                // Top row consits of multipliers
                else if (j == rowStart - 1){
                    cellValue = document.createTextNode( '' + i );
                }
                // Leftmost colum consits of multiplicands
                else if (i == colStart - 1){
                    cellValue = document.createTextNode( '' + j );
                }
                // All other cells are to be treated normally
                else {
                    cellValue = document.createTextNode( '' + (j * i) );
                }
                // Now we can append our cellValue to the cellNode...
                cellNode.appendChild(cellValue);
                // and append our cell <td> to the row!
                row.appendChild(cellNode);
            }
            // Once this row is complete, we can append it to the table
            table.append(row);
        }

        // Creating a checkbox element within a div
        var checkbox = $("<div>");
        checkbox.attr("class", "checkbox");

        // This is for deleting tables on multiple delete
        checkbox.attr("data-checkbox", "tab-" + tabCount);

        // Create a label for the tab
        var label = $("<label>");
        label.text("Tab " + tabCount);
        checkbox.append(label);

        // Set the type for the tab
        var input = $("<input type='checkbox'>");
        input.attr("data-checkbox", "tab-" + tabCount);
        checkbox.append(input);

        // Append the checkbox
        var checkboxes = $(".checkboxes");
        checkboxes.append(checkbox);

        // If there are no tables, then don't show Delete Multiple
        if($(".checkbox").length > 0) {
            $(".deleteMultiple").show();
        } else {
            $(".deleteMultiple").hide();
        }

        // Apend the table to the tab
        $("#tabs").append(tableContainer);

        // Refresh our tabs so they're up to date!
        $("#tabs").tabs("refresh");
    }
});
