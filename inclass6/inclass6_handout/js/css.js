$(function() {
    var $backgroundColor = $("li:first-child").css("background-color");
    var list_item = $("<p></p>");
    list_item.text($backgroundColor);
    $("ul").append(list_item);

    $("li").each(function() {
        $(this).css({
            "background-color": "#c5a996",
            "border": "1px solid white",
            "color": "black",
            "text-shadow": "none",
            "font-family": "Georgia"
        })
    })

});
