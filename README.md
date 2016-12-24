# rightClickMenu.js

Binds to an element's "contextmenu" (aka right click) and displays a provided element where the mouse is. The element is hidden when clicking in an area that is not the opened menu.

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

Where `rightClickMenu` is the ID of the element to be displayed (ie the menu) and `foo` is the element whose contextmenu to bind to.
