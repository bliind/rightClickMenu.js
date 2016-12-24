/**
 * rightClickMenu.js
 * https://github.com/bliind/rightClickMenu.js
 */
var rightClickMenu = function(object) {
    var menu = object.menu || null;
    var bindElement = object.bindElement || null;
    var onOpen = object.onOpen || null;

    if (typeof onOpen !== 'function') {
        onOpen = null;
    }

    // check for jquery objects and convert.
    if (menu instanceof jQuery) {
        menu = menu.get(0);
    }

    if (bindElement instanceof jQuery) {
        bindElement = $.makeArray(bindElement);
    }

    // make sure bindElement is a node, nodelist, array, htmlcollection
    // if it's more than one node, break out the elements into an array
    var elements = [];
    if (
        bindElement instanceof HTMLCollection ||
        bindElement instanceof NodeList ||
        bindElement instanceof Array
    ) {
        for (var index in bindElement) {
            if (parseInt(index) == index) {
                if (bindElement[index].tagName) {
                    elements.push(bindElement[index]);
                }
            }
        }
    } else if (object.bindElement.tagName) {
        elements.push(object.bindElement);
    }

    // die out if we can't find the menu or bind right click to elements
    if (!menu.tagName) {
        if (object.menu instanceof jQuery) {
            console.error('rightClickMenu error: Error converting jQuery object for menu')
        } else {
            console.error('rightClickMenu error: "' + object.menu + '" is not a valid HTML element and cannot be used as a menu');
        }

        return false;
    }

    if (elements.length == 0) {
        if (bindElement instanceof jQuery) {
            console.error('rightClickMenu error: Error converting jQuery object for bindElement.');
        } else {
            console.error('rightClickMenu error: "' + object.bindElement + '" is not a valid HTML element (or NodeList, HTMLCollection, or Array of HTML elements) and cannot be used as an element to bind to.');
        }

        return false;
    }

    /**
     * set up the CSS styling for the menu element.
     * using visibility: hidden rather than display: none
     * because the latter prevents us from getting the size
     * of the element while it's not displayed
     */
    menu.style.display = 'block';
    menu.style.visibility = 'hidden';
    menu.style.position = 'absolute';

    var menuHelper = {
        getOffset: function(node) {
            var x = y = 0;
            var nodeHeight = node.offsetHeight;
            var nodeWidth = node.offsetWidth;
            while(node && !isNaN(node.offsetLeft) && !isNaN(node.offsetTop)) {
                x += node.offsetLeft - node.scrollLeft;
                y += node.offsetTop - node.scrollTop;
                node = node.offsetParent;
            }

            return {top: y, left: x, bottom: (y + nodeHeight), right: (x + nodeWidth)};
        },
        getPlacement: function(node, event) {
            var scrollTop = document.body.scrollTop;
            var scrollLeft = document.body.scrollLeft;
            var menuH = node.offsetHeight;
            var menuW = node.offsetWidth;
            var windowH = window.innerHeight;
            var windowW = window.innerWidth;
            var placeY = event.clientY;
            var placeX = event.clientX;

            if ((placeY + menuH) > windowH) {
                placeY = (placeY - menuH);
            }

            if ((placeX + menuW) > windowW) {
                placeX = (placeX - menuW);
            }

            return {x: placeX + scrollLeft, y: placeY + scrollTop};
        },
        hideMenu: function() {
            menu.style.visibility = 'hidden';
            document.removeEventListener('mousedown', menuHelper.handleMouseClick);
            document.removeEventListener('keyup', menuHelper.handleEscKey);
        },
        handleMouseClick: function(event) {
            var offset = menuHelper.getOffset(menu);

            var mouse = { x: event.clientX, y: event.clientY };

            if (mouse.x < offset.left || mouse.x > offset.right || mouse.y < offset.top || mouse.y > offset.bottom) {
                menuHelper.hideMenu(event);
            }
        },
        handleKeyUp: function(event) {
            if (event.keyCode == 27) {
                menuHelper.hideMenu();
            }
        },
        handleContextMenu: function(event) {
            // if shift is held, let normal right click happen
            if (event.shiftKey) {
                return true;
            }

            event.preventDefault();

            var place = menuHelper.getPlacement(menu, event);
            menu.style.top = place.y + 'px';
            menu.style.left = place.x + 'px';
            menu.style.visibility = 'visible';

            // nesting these here means we're only listening for mousedown/keydown when the menu is opened
            document.addEventListener('mousedown', menuHelper.handleMouseClick);
            document.addEventListener('keyup', menuHelper.handleKeyUp);

            if (null !== onOpen) {
                onOpen({
                    menu: menu,
                    clickedElement: this
                });
            }
        }
    };

    for (var i=0;i<elements.length;i++) {
        elements[i].addEventListener('contextmenu', menuHelper.handleContextMenu);
    }
}
