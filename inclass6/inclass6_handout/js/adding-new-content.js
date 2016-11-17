$(function() {
    // Task 1
    $('ul').before("<p>Just Updated</p>");

    // Task 2
    $('li.hot').prepend("+ ");

    // Task 3
    var list_item = $("<li><em>gluten free soy milk</em></li>");
    $('li:last-child').after(list_item);
});
