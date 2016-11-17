$(function() {

    // Task 1
    $('li:contains("pine")').text('almonds');

    // Task 2
    $('li.hot').html(function()
    {
        return '<em>' + $(this).text() + '</em>';
    });

    // Task 3
    $('li#one').remove();

    // $("li#one").each(function( i )
    // {
    //     // Task 1
    //     if ($(this).text() == "pine")
    //     {
    //         this.text() = "almonds";
    //         // change the text of the matching element to almonds using .text()
    //     }
    //     else if (this.class() == "hot")
    //     {
    //         this.html() = "em";
    //         // update each element with the <em> tag using .html()
    //     }
    //     else if (this.id() = "one")
    //     {
    //         this.remove();
    //         // remove this element from the list using .remove()
    //     }
    // }
});
