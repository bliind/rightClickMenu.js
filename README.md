# rightClickMenu.js

Binds to an element's "contextmenu" (aka right click) and displays a provided element where the mouse is. The element is hidden when clicking in an area that is not the opened menu.

Example usage:

```
var fooMenuElement = document.getElementById('rightClickMenu');
var fooMenuBind = document.getElementById('foo');
var fooMenu = new rightClickMenu(fooMenuElement, fooMenuBind);
```

Where `rightClickMenu` is the ID of the element to be displayed (ie the menu) and `foo` is the element whose contextmenu to bind to.
