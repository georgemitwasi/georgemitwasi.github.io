window.onload = function()
{
    var groceryList = document.getElementsByTagName("ul")[0];

    // ------------------------------------------------------
    // ADD NEW ITEM TO END OF LIST
    var firstListNode = document.createElement("li");

    //create new text node
    var firstListValue = document.createTextNode("cream");

    //add text node to li element
    firstListNode.appendChild(firstListValue);

    // push it to the end of the list!
    groceryList.appendChild(firstListNode);

    // ------------------------------------------------------
    // ADD NEW ITEM START OF LIST
    var secondListNode = document.createElement("li");

    //create new text node
    var secondListValue = document.createTextNode("kale");

    //add text node to li element
    secondListNode.appendChild(secondListValue);

    // push it to the end of the list!
    groceryList.insertBefore(secondListNode, groceryList.childNodes[0]);

    // ------------------------------------------------------
    // ADD A CLASS OF COOL TO ALL LIST ITEMS
    // Loop the NodeList through 0
    for (var i = 0; i < groceryList.children.length; i++)
    {
        document.getElementsByTagName("li")[i].className = "cool";
    }

    // ------------------------------------------------------
    // ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
    // var count = groceryList.length;
    var node = document.createElement("span");              // Create a <span> node
    var textnode = document.createTextNode(String(groceryList.children.length));            // Create a text node
    node.appendChild(textnode);                             // Append the text to <span>

    var header = document.getElementsByTagName("h2")[0];       // Grab <h2>
    header.appendChild(node);                               // Append <span> to h2
}
