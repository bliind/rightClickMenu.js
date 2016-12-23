var rightClickMenu = function(menu, bindElement) {
    var elements = [];
    if (bindElement instanceof HTMLCollection) {
        for (var index in bindElement) {
            if (parseInt(index) == index) {
                elements.push(bindElement[index]);
            }
        }
    } else {
        elements.push(bindElement);
    }
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

            return {x: placeX, y: placeY};
        },
        handleMouseClick: function (event) {
            var offset = menuHelper.getOffset(menu);
            offset.bottom = offset.top + menu.offsetHeight;
            offset.right = offset.left + menu.offsetWidth;

            var mouse = { x: event.clientX, y: event.clientY };

            if (mouse.x < offset.left || mouse.x > offset.right || mouse.y < offset.top || mouse.y > offset.bottom) {
                menuHelper.hideMenu(event);
            }
        },
        hideMenu: function() {
            menu.style.visibility = 'hidden';
            document.removeEventListener('mousedown', menuHelper.handleMouseClick);
            document.onkeydown = null;
        }
    };

    for (var i=0;i<elements.length;i++) {
        elements[i].addEventListener('contextmenu', function(event) {
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
            document.onkeydown = function() {
                if (event.keyCode == 27) {
                    menuHelper.hideMenu();
                }
            };
        });
    }
}
