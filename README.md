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

`menu` is the element that will be displayed on right click. `bindElement` is an element, array of elements, NodeList, or HTMLCollection to bind to the right click action of.

`onOpen` is an optional function to bind to to act on the menu and/or clicked element when the menu is opened.

[Click here for a Codepen example](http://codepen.io/bliind/pen/bBypgZ)
