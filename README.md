# rightClickMenu.js

Binds to an element's "contextmenu" (aka right click) and displays a provided element where the mouse is. The element is hidden when clicking in an area that is not the opened menu, or when the escape key is pressed. This can be bypassed by shift+right clicking.

Example usage:

```javascript
    var fooMenuElement = document.getElementById('rightClickMenu');
    var fooMenuBinds = document.getElementsByClassName('foo');
    var fooMenu = new rightClickMenu({
        menu: fooMenuElement,
        bindElement: fooMenuBinds,
        onOpen: function(object) {
            var menu = object.menu;
            var clickedElement = object.clickedElement;
        }
    });
```

Also works with jQuery:

```javascript
    var rcm = new rightClickMenu({
        menu: $('#menu'),
        bindElement: $('.foo'),
        onOpen: function(obj) {
            console.log(obj);
        }
    });
```

`menu` is the element that will be displayed on right click. `bindElement` is an element, array of elements, NodeList, or HTMLCollection to bind to the right click action of.

`onOpen` is an optional function to bind to to act on the menu and/or clicked element when the menu is opened. It is passed an object that contains the HTML element of the menu, `menu`, and the HTML element of the right-clicked element, `clickedElement`.

[Click here for a Codepen example](http://codepen.io/bliind/pen/bBypgZ)
