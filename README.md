# rightClickMenu.js

Binds to an element's "contextmenu" (aka right click) and displays a provided element where the mouse is. The element is hidden when clicking in an area that is not the opened menu, or when the escape key is pressed.

Example usage:

```javascript
var fooMenuElement = document.getElementById('rightClickMenu');
var fooMenuBinds = document.getElementsByClassName('foo');
var fooMenu = new rightClickMenu({
    menu: fooMenuElement,
    bindElement: fooMenuBinds,
    onOpen: function(menuElement, clickedElement) {
        return true;
    }
});
```

Where `rightClickMenu` is the ID of the element to be displayed (ie the menu) and `foo` is the element, or a list (NodeList, Array, HTMLCollection) of elements, to bind to for right click.
`onOpen` is an optional function to bind to to act on the menu and/or clicked element when the menu is opened.

[Click here for a Codepen example](http://codepen.io/bliind/pen/bBypgZ)
