
/*
Copyright © 2013 Adobe Systems Incorporated.

Licensed under the Apache License, Version 2.0 (the “License”);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an “AS IS” BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * See <a href="http://jquery.com">http://jquery.com</a>.
 * @name jquery
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 */

/**
 * See <a href="http://jquery.com">http://jquery.com</a>
 * @name fn
 * @class
 * See the jQuery Library  (<a href="http://jquery.com">http://jquery.com</a>) for full details.  This just
 * documents the function and classes that are added to jQuery by this plug-in.
 * @memberOf jquery
 */

/**
 * @fileOverview accessibleMegaMenu plugin
 *
 *<p>Licensed under the Apache License, Version 2.0 (the “License”)
 *<br />Copyright © 2013 Adobe Systems Incorporated.
 *<br />Project page <a href="https://github.com/adobe-accessibility/Accessible-Mega-Menu">https://github.com/adobe-accessibility/Accessible-Mega-Menu</a>
 * @version 0.1
 * @author Michael Jordan
 * @requires jquery
 */

/*jslint browser: true, devel: true, plusplus: true, nomen: true */
/*global jQuery */
(function ($, window, document) {
    "use strict";
    var pluginName = "accessibleMegaMenu",
        defaults = {
            uuidPrefix: "accessible-megamenu", // unique ID's are required to indicate aria-owns, aria-controls and aria-labelledby
            menuClass: "accessible-megamenu", // default css class used to define the megamenu styling
            topNavItemClass: "accessible-megamenu-top-nav-item", // default css class for a top-level navigation item in the megamenu
            panelClass: "accessible-megamenu-panel", // default css class for a megamenu panel
            panelGroupClass: "accessible-megamenu-panel-group", // default css class for a group of items within a megamenu panel
            hoverClass: "hover", // default css class for the hover state
            focusClass: "focus", // default css class for the focus state
            openClass: "open", // default css class for the open state
            openDelay: 0 // default open delay when opening menu via mouseover
        },
        Keyboard = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            keyMap: {
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "a",
                66: "b",
                67: "c",
                68: "d",
                69: "e",
                70: "f",
                71: "g",
                72: "h",
                73: "i",
                74: "j",
                75: "k",
                76: "l",
                77: "m",
                78: "n",
                79: "o",
                80: "p",
                81: "q",
                82: "r",
                83: "s",
                84: "t",
                85: "u",
                86: "v",
                87: "w",
                88: "x",
                89: "y",
                90: "z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                190: "."
            }
        };
    /**
     * @desc Creates a new accessible mega menu instance.
     * @param {jquery} element
     * @param {object} [options] Mega Menu options
     * @param {string} [options.uuidPrefix=accessible-megamenu] - Prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby
     * @param {string} [options.menuClass=accessible-megamenu] - CSS class used to define the megamenu styling
     * @param {string} [options.topNavItemClass=accessible-megamenu-top-nav-item] - CSS class for a top-level navigation item in the megamenu
     * @param {string} [options.panelClass=accessible-megamenu-panel] - CSS class for a megamenu panel
     * @param {string} [options.panelGroupClass=accessible-megamenu-panel-group] - CSS class for a group of items within a megamenu panel
     * @param {string} [options.hoverClass=hover] - CSS class for the hover state
     * @param {string} [options.focusClass=focus] - CSS class for the focus state
     * @param {string} [options.openClass=open] - CSS class for the open state
     * @constructor
     */
    function AccessibleMegaMenu(element, options) {
        this.element = element;

        // merge optional settings and defaults into settings
        this.settings = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.mouseTimeoutID = null;
        this.focusTimeoutID = null;
        this.mouseFocused = false;
        this.justFocused = false;

        this.init();
    }

    AccessibleMegaMenu.prototype = (function () {

        /* private attributes and methods ------------------------ */
        var uuid = 0,
            keydownTimeoutDuration = 1000,
            keydownSearchString = "",
            isTouch = typeof window.hasOwnProperty === "function" && !!window.hasOwnProperty("ontouchstart"),
            _getPlugin,
            _addUniqueId,
            _togglePanel,
            _clickHandler,
            _clickOutsideHandler,
            _DOMAttrModifiedHandler,
            _focusInHandler,
            _focusOutHandler,
            _keyDownHandler,
            _mouseDownHandler,
            _mouseOverHandler,
            _mouseOutHandler,
            _toggleExpandedEventHandlers;

        /**
         * @name jQuery.fn.accessibleMegaMenu~_getPlugin
         * @desc Returns the parent accessibleMegaMenu instance for a given element
         * @param {jQuery} element
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _getPlugin = function (element) {
            return $(element).closest(':data(plugin_' + pluginName + ')').data("plugin_" + pluginName);
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_addUniqueId
         * @desc Adds a unique id and element.
         * The id string starts with the
         * string defined in settings.uuidPrefix.
         * @param {jQuery} element
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _addUniqueId = function (element) {
            element = $(element);
            var settings = this.settings;
            if (!element.attr("id")) {
                element.attr("id", settings.uuidPrefix + "-" + new Date().getTime() + "-" + (++uuid));
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_togglePanel
         * @desc Toggle the display of mega menu panels in response to an event.
         * The optional boolean value 'hide' forces all panels to hide.
         * @param {event} event
         * @param {Boolean} [hide] Hide all mega menu panels when true
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _togglePanel = function (event, hide) {
            var target = $(event.target),
                that = this,
                settings = this.settings,
                menu = this.menu,
                topli = target.closest('.' + settings.topNavItemClass),
                panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
                newfocus;

            _toggleExpandedEventHandlers.call(this, true);

            if (hide) {
                topli = menu.find('.' + settings.topNavItemClass + ' .' + settings.openClass + ':first').closest('.' + settings.topNavItemClass);
                if (!(topli.is(event.relatedTarget) || topli.has(event.relatedTarget).length > 0)) {
                    if ((event.type === 'mouseout' || event.type === 'focusout') && topli.has(document.activeElement).length > 0) {
                        return;
                    }
                    topli.find('[aria-expanded]')
                        .attr('aria-expanded', 'false')
                        .removeClass(settings.openClass)
                        .filter('.' + settings.panelClass)
                        .attr('aria-hidden', 'true');
                    if ((event.type === 'keydown' && event.keyCode === Keyboard.ESCAPE) || event.type === 'DOMAttrModified') {
                        newfocus = topli.find(':tabbable:first');
                        setTimeout(function () {
                            menu.find('[aria-expanded].' + that.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
                            newfocus.focus();
                            that.justFocused = false;
                        }, 99);
                    }
                } else if (topli.length === 0) {
                    menu.find('[aria-expanded=true]')
                        .attr('aria-expanded', 'false')
                        .removeClass(settings.openClass)
                        .filter('.' + settings.panelClass)
                        .attr('aria-hidden', 'true');
                }
            } else {
                clearTimeout(that.focusTimeoutID);
                topli.siblings()
                    .find('[aria-expanded]')
                    .attr('aria-expanded', 'false')
                    .removeClass(settings.openClass)
                    .filter('.' + settings.panelClass)
                    .attr('aria-hidden', 'true');
                topli.find('[aria-expanded]')
                    .attr('aria-expanded', 'true')
                    .addClass(settings.openClass)
                    .filter('.' + settings.panelClass)
                    .attr('aria-hidden', 'false');
                if (event.type === 'mouseover' && target.is(':tabbable') && topli.length === 1 && panel.length === 0 && menu.has(document.activeElement).length > 0) {
                    target.focus();
                    that.justFocused = false;
                }

                _toggleExpandedEventHandlers.call(that);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_clickHandler
         * @desc Handle click event on mega menu item
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _clickHandler = function (event) {
            var target = $(event.target).closest(':tabbable'),
                topli = target.closest('.' + this.settings.topNavItemClass),
                panel = target.closest('.' + this.settings.panelClass);
            if (topli.length === 1
                    && panel.length === 0
                    && topli.find('.' + this.settings.panelClass).length === 1) {
                if (!target.hasClass(this.settings.openClass)) {
                    event.preventDefault();
                    event.stopPropagation();
                    _togglePanel.call(this, event);
                    this.justFocused = false;
                } else {
                    if (this.justFocused) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.justFocused = false;
                    } else if (isTouch) {
                        event.preventDefault();
                        event.stopPropagation();
                        _togglePanel.call(this, event, target.hasClass(this.settings.openClass));
                    }
                }
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_clickOutsideHandler
         * @desc Handle click event outside of a the megamenu
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _clickOutsideHandler = function (event) {
            if ($(event.target).closest(this.menu).length === 0) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_DOMAttrModifiedHandler
         * @desc Handle DOMAttrModified event on panel to respond to Windows 8 Narrator ExpandCollapse pattern
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _DOMAttrModifiedHandler = function (event) {
            if (event.originalEvent.attrName === 'aria-expanded'
                    && event.originalEvent.newValue === 'false'
                    && $(event.target).hasClass(this.settings.openClass)) {
                event.preventDefault();
                event.stopPropagation();
                _togglePanel.call(this, event, true);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_focusInHandler
         * @desc Handle focusin event on mega menu item.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _focusInHandler = function (event) {
            clearTimeout(this.focusTimeoutID);
            var target = $(event.target),
                panel = target.closest('.' + this.settings.panelClass);
            target
                .addClass(this.settings.focusClass)
                .on('click.accessible-megamenu', $.proxy(_clickHandler, this));
            this.justFocused = !this.mouseFocused;
            this.mouseFocused = false;
            if (this.panels.not(panel).filter('.' + this.settings.openClass).length) {
                _togglePanel.call(this, event);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_focusOutHandler
         * @desc Handle focusout event on mega menu item.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _focusOutHandler = function (event) {
            this.justFocused = false;
            var that = this,
                target = $(event.target),
                topli = target.closest('.' + this.settings.topNavItemClass),
                keepOpen = false;
            target
                .removeClass(this.settings.focusClass)
                .off('click.accessible-megamenu');

            if (window.cvox) {
                // If ChromeVox is running...
                that.focusTimeoutID = setTimeout(function () {
                    window.cvox.Api.getCurrentNode(function (node) {
                        if (topli.has(node).length) {
                            // and the current node being voiced is in
                            // the mega menu, clearTimeout,
                            // so the panel stays open.
                            clearTimeout(that.focusTimeoutID);
                        } else {
                            that.focusTimeoutID = setTimeout(function (scope, event, hide) {
                                _togglePanel.call(scope, event, hide);
                            }, 275, that, event, true);
                        }
                    });
                }, 25);
            } else {
                that.focusTimeoutID = setTimeout(function () {
                    _togglePanel.call(that, event, true);
                }, 300);
            }
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_keyDownHandler
         * @desc Handle keydown event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _keyDownHandler = function (event) {
            var that = (this.constructor === AccessibleMegaMenu) ? this : _getPlugin(this), // determine the AccessibleMegaMenu plugin instance
                settings = that.settings,
                target = $($(this).is('.' + settings.hoverClass + ':tabbable') ? this : event.target), // if the element is hovered the target is this, otherwise, its the focused element
                menu = that.menu,
                topnavitems = that.topnavitems,
                topli = target.closest('.' + settings.topNavItemClass),
                tabbables = menu.find(':tabbable'),
                panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
                panelGroups = panel.find('.' + settings.panelGroupClass),
                currentPanelGroup = target.closest('.' + settings.panelGroupClass),
                next,
                keycode = event.keyCode || event.which,
                start,
                i,
                o,
                label,
                found = false,
                newString = Keyboard.keyMap[event.keyCode] || '',
                regex,
                isTopNavItem = (topli.length === 1 && panel.length === 0);

            if (target.is("input:focus, select:focus, textarea:focus, button:focus")) {
                // if the event target is a form element we should handle keydown normally
                return;
            }

            if (target.is('.' + settings.hoverClass + ':tabbable')) {
                $('html').off('keydown.accessible-megamenu');
            }

            switch (keycode) {
            case Keyboard.ESCAPE:
                _togglePanel.call(that, event, true);
                break;
            case Keyboard.DOWN:
                event.preventDefault();
                if (isTopNavItem) {
                    _togglePanel.call(that, event);
                    found = (topli.find('.' + settings.panelClass + ' :tabbable:first').focus().length === 1);
                } else {
                    found = (tabbables.filter(':gt(' + tabbables.index(target) + '):first').focus().length === 1);
                }

                if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                }
                break;
            case Keyboard.UP:
                event.preventDefault();
                if (isTopNavItem && target.hasClass(settings.openClass)) {
                    _togglePanel.call(that, event, true);
                    next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                    if (next.children('.' + settings.panelClass).length) {
                        found = (next.children()
                            .attr('aria-expanded', 'true')
                            .addClass(settings.openClass)
                            .filter('.' + settings.panelClass)
                            .attr('aria-hidden', 'false')
                            .find(':tabbable:last')
                            .focus() === 1);
                    }
                } else if (!isTopNavItem) {
                    found = (tabbables.filter(':lt(' + tabbables.index(target) + '):last').focus().length === 1);
                }

                if (!found && window.opera && opera.toString() === "[object Opera]" && (event.ctrlKey || event.metaKey)) {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                }
                break;
            case Keyboard.RIGHT:
                event.preventDefault();
                if (isTopNavItem) {
                    found = (topnavitems.filter(':gt(' + topnavitems.index(topli) + '):first').find(':tabbable:first').focus().length === 1);
                } else {
                    if (panelGroups.length && currentPanelGroup.length) {
                        // if the current panel contains panel groups, and we are able to focus the first tabbable element of the next panel group
                        found = (panelGroups.filter(':gt(' + panelGroups.index(currentPanelGroup) + '):first').find(':tabbable:first').focus().length === 1);
                    }

                    if (!found) {
                        found = (topli.find(':tabbable:first').focus().length === 1);
                    }
                }
                break;
            case Keyboard.LEFT:
                event.preventDefault();
                if (isTopNavItem) {
                    found = (topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last').find(':tabbable:first').focus().length === 1);
                } else {
                    if (panelGroups.length && currentPanelGroup.length) {
                        // if the current panel contains panel groups, and we are able to focus the first tabbable element of the previous panel group
                        found = (panelGroups.filter(':lt(' + panelGroups.index(currentPanelGroup) + '):last').find(':tabbable:first').focus().length === 1);
                    }

                    if (!found) {
                        found = (topli.find(':tabbable:first').focus().length === 1);
                    }
                }
                break;
            case Keyboard.TAB:
                i = tabbables.index(target);
                if (event.shiftKey && isTopNavItem && target.hasClass(settings.openClass)) {
                    _togglePanel.call(that, event, true);
                    next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
                    if (next.children('.' + settings.panelClass).length) {
                        found = next.children()
                            .attr('aria-expanded', 'true')
                            .addClass(settings.openClass)
                            .filter('.' + settings.panelClass)
                            .attr('aria-hidden', 'false')
                            .find(':tabbable:last')
                            .focus();
                    }
                } else if (event.shiftKey && i > 0) {
                    found = (tabbables.filter(':lt(' + i + '):last').focus().length === 1);
                } else if (!event.shiftKey && i < tabbables.length - 1) {
                    found = (tabbables.filter(':gt(' + i + '):first').focus().length === 1);
                } else if (window.opera && opera.toString() === "[object Opera]") {
                    tabbables = $(':tabbable');
                    i = tabbables.index(target);
                    if (event.shiftKey) {
                        found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):last').focus().length === 1);
                    } else {
                        found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
                    }
                }

                if (found) {
                    event.preventDefault();
                }
                break;
            case Keyboard.SPACE:
                if (isTopNavItem) {
                    event.preventDefault();
                    _clickHandler.call(that, event);
                } else {
                    return true;
                }
                break;
            case Keyboard.ENTER:
                return true;
                break;
            default:
                // alphanumeric filter
                clearTimeout(this.keydownTimeoutID);

                keydownSearchString += newString !== keydownSearchString ? newString : '';

                if (keydownSearchString.length === 0) {
                    return;
                }

                this.keydownTimeoutID = setTimeout(function () {
                    keydownSearchString = '';
                }, keydownTimeoutDuration);

                if (isTopNavItem && !target.hasClass(settings.openClass)) {
                    tabbables = tabbables.filter(':not(.' + settings.panelClass + ' :tabbable)');
                } else {
                    tabbables = topli.find(':tabbable');
                }

                if (event.shiftKey) {
                    tabbables = $(tabbables.get()
                        .reverse());
                }

                for (i = 0; i < tabbables.length; i++) {
                    o = tabbables.eq(i);
                    if (o.is(target)) {
                        start = (keydownSearchString.length === 1) ? i + 1 : i;
                        break;
                    }
                }

                regex = new RegExp('^' + keydownSearchString.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'), 'i');

                for (i = start; i < tabbables.length; i++) {
                    o = tabbables.eq(i);
                    label = $.trim(o.text());
                    if (regex.test(label)) {
                        found = true;
                        o.focus();
                        break;
                    }
                }
                if (!found) {
                    for (i = 0; i < start; i++) {
                        o = tabbables.eq(i);
                        label = $.trim(o.text());
                        if (regex.test(label)) {
                            o.focus();
                            break;
                        }
                    }
                }
                break;
            }
            that.justFocused = false;
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseDownHandler
         * @desc Handle mousedown event on mega menu.
         * @param {event} Event object
         * @memberof accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseDownHandler = function (event) {
            if ($(event.target).is(this.settings.panelClass) || $(event.target).closest(":focusable").length) {
                this.mouseFocused = true;
            }
            clearTimeout(this.mouseTimeoutID);
            this.mouseTimeoutID = setTimeout(function () {
                clearTimeout(this.focusTimeoutID);
            }, 1);
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseOverHandler
         * @desc Handle mouseover event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseOverHandler = function (event) {
            clearTimeout(this.mouseTimeoutID);
            var that = this;
            this.mouseTimeoutID = setTimeout(function () {
                $(event.target).addClass(that.settings.hoverClass);
                _togglePanel.call(that, event);
                if ($(event.target).is(':tabbable')) {
                    $('html').on('keydown.accessible-megamenu', $.proxy(_keyDownHandler, event.target));
                }
            }, this.settings.openDelay);
        };

        /**
         * @name jQuery.fn.accessibleMegaMenu~_mouseOutHandler
         * @desc Handle mouseout event on mega menu.
         * @param {event} Event object
         * @memberof jQuery.fn.accessibleMegaMenu
         * @inner
         * @private
         */
        _mouseOutHandler = function (event) {
            clearTimeout(this.mouseTimeoutID);
            var that = this;
            $(event.target)
                .removeClass(that.settings.hoverClass);

            that.mouseTimeoutID = setTimeout(function () {
                _togglePanel.call(that, event, true);
            }, 250);
            if ($(event.target).is(':tabbable')) {
                $('html').off('keydown.accessible-megamenu');
            }
        };

        _toggleExpandedEventHandlers = function (hide) {
            var menu = this.menu;
            if (hide) {
                $('html').off('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu');

                menu.find('[aria-expanded].' + this.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
            } else {
                $('html').on('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu', $.proxy(_clickOutsideHandler, this));

                /* Narrator in Windows 8 automatically toggles the aria-expanded property on double tap or click.
                   To respond to the change to collapse the panel, we must add a listener for a DOMAttrModified event. */
                menu.find('[aria-expanded=true].' + this.settings.panelClass).on('DOMAttrModified.accessible-megamenu', $.proxy(_DOMAttrModifiedHandler, this));
            }
        };

        /* public attributes and methods ------------------------- */
        return {
            constructor: AccessibleMegaMenu,

            /**
             * @lends jQuery.fn.accessibleMegaMenu
             * @desc Initializes an instance of the accessibleMegaMenu plugins
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            init: function () {
                var settings = this.settings,
                    nav = $(this.element),
                    menu = nav.children().first(),
                    topnavitems = menu.children();
                this.start(settings, nav, menu, topnavitems);
            },

            start: function(settings, nav, menu, topnavitems) {
                var that = this;
                this.settings = settings;
                this.menu = menu;
                this.topnavitems = topnavitems;

                nav.attr("role", "navigation");
                menu.addClass(settings.menuClass);
                topnavitems.each(function (i, topnavitem) {
                    var topnavitemlink, topnavitempanel;
                    topnavitem = $(topnavitem);
                    topnavitem.addClass(settings.topNavItemClass);
                    topnavitemlink = topnavitem.find(":tabbable:first");
                    topnavitempanel = topnavitem.children(":not(:tabbable):last");
                    _addUniqueId.call(that, topnavitemlink);
                    if (topnavitempanel.length) {
                        _addUniqueId.call(that, topnavitempanel);
                        topnavitemlink.attr({
                            // "aria-haspopup": true,
                            "aria-controls": topnavitempanel.attr("id"),
                            "aria-expanded": false
                        });

                        topnavitempanel.attr({
                            "role": "region",
                            "aria-expanded": false,
                            "aria-hidden": true
                        })
                            .addClass(settings.panelClass)
                            .not("[aria-labelledby]")
                            .attr("aria-labelledby", topnavitemlink.attr("id"));
                    }
                });

                this.panels = menu.find("." + settings.panelClass);

                menu.on("focusin.accessible-megamenu", ":focusable, ." + settings.panelClass, $.proxy(_focusInHandler, this))
                    .on("focusout.accessible-megamenu", ":focusable, ." + settings.panelClass, $.proxy(_focusOutHandler, this))
                    .on("keydown.accessible-megamenu", $.proxy(_keyDownHandler, this))
                    .on("mouseover.accessible-megamenu", $.proxy(_mouseOverHandler, this))
                    .on("mouseout.accessible-megamenu", $.proxy(_mouseOutHandler, this))
                    .on("mousedown.accessible-megamenu", $.proxy(_mouseDownHandler, this));

                if (isTouch) {
                    menu.on("touchstart.accessible-megamenu",  $.proxy(_clickHandler, this));
                }

                menu.find("hr").attr("role", "separator");

                if ($(document.activeElement).closest(menu).length) {
                  $(document.activeElement).trigger("focusin.accessible-megamenu");
                }
            },

            /**
             * @desc Get default values
             * @example $(selector).accessibleMegaMenu("getDefaults");
             * @return {object}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getDefaults: function () {
                return this._defaults;
            },

            /**
             * @desc Get any option set to plugin using its name (as string)
             * @example $(selector).accessibleMegaMenu("getOption", some_option);
             * @param {string} opt
             * @return {string}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getOption: function (opt) {
                return this.settings[opt];
            },

            /**
             * @desc Get all options
             * @example $(selector).accessibleMegaMenu("getAllOptions");
             * @return {object}
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            getAllOptions: function () {
                return this.settings;
            },

            /**
             * @desc Set option
             * @example $(selector).accessibleMegaMenu("setOption", "option_name",  "option_value",  reinitialize);
             * @param {string} opt - Option name
             * @param {string} val - Option value
             * @param {boolean} [reinitialize] - boolean to re-initialize the menu.
             * @memberof jQuery.fn.accessibleMegaMenu
             * @instance
             */
            setOption: function (opt, value, reinitialize) {
                this.settings[opt] = value;
                if (reinitialize) {
                    this.init();
                }
            }
        };
    }());

    /* lightweight plugin wrapper around the constructor,
       to prevent against multiple instantiations */

    /**
     * @class accessibleMegaMenu
     * @memberOf jQuery.fn
     * @classdesc Implements an accessible mega menu as a jQuery plugin.
     * <p>The mega-menu It is modeled after the mega menu on {@link http://adobe.com|adobe.com} but has been simplified for use by others. A brief description of the interaction design choices can be found in a blog post at {@link http://blogs.adobe.com/accessibility/2013/05/adobe-com.html|Mega menu accessibility on adobe.com}.</p>
     * <h3>Keyboard Accessibility</h3>
     * <p>The accessible mega menu supports keyboard interaction modeled after the behavior described in the {@link http://www.w3.org/TR/wai-aria-practices/#menu|WAI-ARIA Menu or Menu bar (widget) design pattern}, however we also try to respect users' general expectations for the behavior of links in a global navigation. To this end, the accessible mega menu implementation permits tab focus on each of the six top-level menu items. When one of the menu items has focus, pressing the Enter key, Spacebar or Down arrow will open the submenu panel, and pressing the Left or Right arrow key will shift focus to the adjacent menu item. Links within the submenu panels are included in the tab order when the panel is open. They can also be navigated with the arrow keys or by typing the first character in the link name, which speeds up keyboard navigation considerably. Pressing the Escape key closes the submenu and restores focus to the parent menu item.</p>
     * <h3>Screen Reader Accessibility</h3>
     * <p>The accessible mega menu models its use of WAI-ARIA Roles, States, and Properties after those described in the {@link http://www.w3.org/TR/wai-aria-practices/#menu|WAI-ARIA Menu or Menu bar (widget) design pattern} with some notable exceptions, so that it behaves better with screen reader user expectations for global navigation. We don't use <code class="prettyprint prettyprinted" style=""><span class="pln">role</span><span class="pun">=</span><span class="str">"menu"</span></code> for the menu container and <code class="prettyprint prettyprinted" style=""><span class="pln">role</span><span class="pun">=</span><span class="str">"menuitem"</span></code> for each of the links therein, because if we do, assistive technology will no longer interpret the links as links, but instead, as menu items, and the links in our global navigation will no longer show up when a screen reader user executes a shortcut command to bring up a list of links in the page.</p>
     * @example <h4>HTML</h4><hr/>
&lt;nav&gt;
    &lt;ul class=&quot;nav-menu&quot;&gt;
        &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a href=&quot;?movie&quot;&gt;Movies&lt;/a&gt;
            &lt;div class=&quot;sub-nav&quot;&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=0&quot;&gt;Action &amp;amp; Adventure&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=2&quot;&gt;Children &amp;amp; Family&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=7&quot;&gt;Dramas&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=9&quot;&gt;Foreign&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=14&quot;&gt;Musicals&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?movie&amp;genre=15&quot;&gt;Romance&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/li&gt;
        &lt;li class=&quot;nav-item&quot;&gt;
            &lt;a href=&quot;?tv&quot;&gt;TV Shows&lt;/a&gt;
            &lt;div class=&quot;sub-nav&quot;&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=20&quot;&gt;Classic TV&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=21&quot;&gt;Crime TV&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=27&quot;&gt;Reality TV&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=30&quot;&gt;TV Action&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
                &lt;ul class=&quot;sub-nav-group&quot;&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=33&quot;&gt;TV Dramas&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href=&quot;?tv&amp;genre=34&quot;&gt;TV Horror&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&amp;#8230;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;
     * @example <h4>CSS</h4><hr/>
&#47;* Rudimentary mega menu CSS for demonstration *&#47;

&#47;* mega menu list *&#47;
.nav-menu {
    display: block;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 15;
}

&#47;* a top level navigation item in the mega menu *&#47;
.nav-item {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 0;
}

&#47;* first descendant link within a top level navigation item *&#47;
.nav-item &gt; a {
    position: relative;
    display: inline-block;
    padding: 0.5em 1em;
    margin: 0 0 -1px 0;
    border: 1px solid transparent;
}

&#47;* focus/open states of first descendant link within a top level
   navigation item *&#47;
.nav-item &gt; a:focus,
.nav-item &gt; a.open {
    border: 1px solid #dedede;
}

&#47;* open state of first descendant link within a top level
   navigation item *&#47;
.nav-item &gt; a.open {
    background-color: #fff;
    border-bottom: none;
    z-index: 1;
}

&#47;* sub-navigation panel *&#47;
.sub-nav {
    position: absolute;
    display: none;
    top: 2.2em;
    margin-top: -1px;
    padding: 0.5em 1em;
    border: 1px solid #dedede;
    background-color: #fff;
}

&#47;* sub-navigation panel open state *&#47;
.sub-nav.open {
    display: block;
}

&#47;* list of items within sub-navigation panel *&#47;
.sub-nav ul {
    display: inline-block;
    vertical-align: top;
    margin: 0 1em 0 0;
    padding: 0;
}

&#47;* list item within sub-navigation panel *&#47;
.sub-nav li {
    display: block;
    list-style-type: none;
    margin: 0;
    padding: 0;
}
     * @example <h4>JavaScript</h4><hr/>
&lt;!-- include jquery --&gt;
&lt;script src=&quot;http://code.jquery.com/jquery-1.10.1.min.js&quot;&gt;&lt;/script&gt;

&lt;!-- include the jquery-accessibleMegaMenu plugin script --&gt;
&lt;script src=&quot;js/jquery-accessibleMegaMenu.js&quot;&gt;&lt;/script&gt;

&lt;!-- initialize a selector as an accessibleMegaMenu --&gt;
&lt;script&gt;
    $(&quot;nav:first&quot;).accessibleMegaMenu({
        &#47;* prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby *&#47;
        uuidPrefix: &quot;accessible-megamenu&quot;,

        &#47;* css class used to define the megamenu styling *&#47;
        menuClass: &quot;nav-menu&quot;,

        &#47;* css class for a top-level navigation item in the megamenu *&#47;
        topNavItemClass: &quot;nav-item&quot;,

        &#47;* css class for a megamenu panel *&#47;
        panelClass: &quot;sub-nav&quot;,

        &#47;* css class for a group of items within a megamenu panel *&#47;
        panelGroupClass: &quot;sub-nav-group&quot;,

        &#47;* css class for the hover state *&#47;
        hoverClass: &quot;hover&quot;,

        &#47;* css class for the focus state *&#47;
        focusClass: &quot;focus&quot;,

        &#47;* css class for the open state *&#47;
        openClass: &quot;open&quot;
    });
&lt;/script&gt;
     * @param {object} [options] Mega Menu options
     * @param {string} [options.uuidPrefix=accessible-megamenu] - Prefix for generated unique id attributes, which are required to indicate aria-owns, aria-controls and aria-labelledby
     * @param {string} [options.menuClass=accessible-megamenu] - CSS class used to define the megamenu styling
     * @param {string} [options.topNavItemClass=accessible-megamenu-top-nav-item] - CSS class for a top-level navigation item in the megamenu
     * @param {string} [options.panelClass=accessible-megamenu-panel] - CSS class for a megamenu panel
     * @param {string} [options.panelGroupClass=accessible-megamenu-panel-group] - CSS class for a group of items within a megamenu panel
     * @param {string} [options.hoverClass=hover] - CSS class for the hover state
     * @param {string} [options.focusClass=focus] - CSS class for the focus state
     * @param {string} [options.openClass=open] - CSS class for the open state
     * @param {string} [options.openDelay=0] - Open delay when opening menu via mouseover
     */
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new $.fn[pluginName].AccessibleMegaMenu(this, options));
            }
        });
    };

    $.fn[pluginName].AccessibleMegaMenu = AccessibleMegaMenu;

    /* :focusable and :tabbable selectors from
       https://raw.github.com/jquery/jquery-ui/master/ui/jquery.ui.core.js */

    /**
     * @private
     */
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
            return $.css(this, "visibility") === "hidden";
        }).length;
    }

    /**
     * @private
     */
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img,
            nodeName = element.nodeName.toLowerCase();
        if ("area" === nodeName) {
            map = element.parentNode;
            mapName = map.name;
            if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
                return false;
            }
            img = $("img[usemap=#" + mapName + "]")[0];
            return !!img && visible(img);
        }
        return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled :
                "a" === nodeName ?
                        element.href || isTabIndexNotNaN :
                        isTabIndexNotNaN) &&
                            // the element and all of its ancestors must be visible
                            visible(element);
    }

    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
            return function (elem) {
                return !!$.data(elem, dataName);
            };
        }) : // support: jQuery <1.8
                function (elem, i, match) {
                    return !!$.data(elem, match[3]);
                },

        focusable: function (element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },

        tabbable: function (element) {
            var tabIndex = $.attr(element, "tabindex"),
                isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    });
}(jQuery, window, document));



$(function() {
  'use strict';

  pmGeneral.init();
  pmSlideNavs.init();
  pmCarousels.init();
  pmMobileHelpers.init();
  pmTileFilter.init();
  if ($('body.refresh').length) {
    pmModules.init();
  }
  if ($('.js-typing-animation').length) {
    typingAnimation.init();
  }
  if ($('.cyber-tools').length) {
    pmCyber.init();
  }
  if ($('.sticky-nav').length && !$('.module.toolkit').length) {
    // Don't init on Toolkit
    stickyNavInit();
  }
  if ($('.tab-panel').length) {
    tabPanelInit();
    accordionInit();
  }
  if ($('.faq-module').length) {
    faqTilesInit();
  }
  if ($('.content-carousel').length) {
    contentCarouselInit();
  }

  var player;

  function onYouTubePlayerAPIReady() {
    player = new YT.Player('blog_video');
  }
});

var pmGeneral = (function() {
  var _wwidth,
    _bootstrapSize,
    _self = {};

  function init() {
    if ($('html').hasClass('no-touch')) $('.navigation').accessibleMegaMenu();
    bindEvents();
    miscHelpers();
    checkIE();
    addBootstrapSize();
    smoothScroll();
    $('.inline-video').fitVids();
    youTubeHelpers();
    if ($('.selectric').length) $('.selectric').selectric();
    if ($('.icheck').length) $('.icheck').iCheck();
    if ($('.validate').length) validation();
  }

  function miscHelpers() {
    $('.search-btn-wrap').hover(function() {
      $(this)
        .parent('.search-wrapper')
        .find('.search-box')
        .toggleClass('btn-hover');
    });

    // $('input.search-box').on('focus', function(){

    // 	});

    $('.empty-search').on('click', function() {
      var search = $(this)
        .closest('.search-wrapper')
        .find('.search-box');
      search.val('');
      search.removeClass('show-options').removeClass('show-close');
    });

    $('input.search-box').on('keyup', function() {
      $(this).addClass('show-options');
      $(this).addClass('show-close');
      // if($(this).val() == 'none') {
      // 	$(this).addClass('show-no-options');
      // } else {
      // 	$(this).removeClass('show-no-options');
      // }
    });

    $('input.search-box').on('blur', function() {
      $(this).removeClass('show-options');
      if (!$(this).val()) {
        $(this).removeClass('show-close');
      }
    });

    $('.dismiss-alert').on('click', function(e) {
      $(this)
        .parents('.alert-panel')
        .fadeOut();
    });
  }

  function bindEvents() {
    // PREVENT DEFAULT ON ALL href="#" LINKS
    $('a[href=#]').on('click', function(e) {
      e.preventDefault();
      return true;
    });

    // WINDOW RESIZE EVENTS
    $(window).on('resize', function() {
      checkBreakpointChange();
      addBootstrapSize();
    });
  }

  function checkIE() {
    if (Function('/*@cc_on return document.documentMode===10@*/')()) {
      document.documentElement.className += ' ie10';
    }
  }

  function scrollTo(selector) {
    var offset = $(selector).offset();
    $('html,body').animate(
      {
        scrollTop: offset.top
      },
      300
    );
  }

  function addBootstrapSize() {
    var bootstrapSize = getCurrentBootstrapSize();
    $('html').attr('data-bs-size', bootstrapSize);
  }

  function getCurrentBootstrapSize() {
    _wwidth = $(window).width();
    if (_wwidth >= 1200) {
      return 'lg';
    } else if (_wwidth >= 992) {
      return 'md';
    } else if (_wwidth >= 768) {
      return 'sm';
    } else {
      return 'xs';
    }
  }

  function checkBreakpointChange() {
    var previousSize = $('html').attr('data-bs-size');
    var newSize = getCurrentBootstrapSize();
    var triggerName = '';
    if (previousSize != newSize) {
      var triggerName = 'bsResizeTo' + newSize;
      $('body')
        .trigger('bsResize')
        .trigger(triggerName);
    }
  }

  function smoothScroll() {
    // Smooth Scroll
    $('a[href*="#"]:not([href="#"]):not([data-toggle])').click(function() {
      // target id
      var target = $(this.hash);
      // target distance from top of document
      // :Bug: this is returning different value after scroll?
      var target_offset = target.offset();
      // set padding for top of window/viewport
      var offset = 50;
      if (getCurrentBootstrapSize() == 'xs') {
        offset = 80;
      }
      // Set constant speed
      // get difference bewtween offsets
      var this_offset = $(this).offset();
      var offset_diff = Math.abs(target_offset.top - this_offset.top);
      var base_speed = 800; // Time in ms per 1,000 pixels
      // update speed based on distance to scroll, i.e. if further, slow down...
      if ($('.cyber-tools').length) {
        base_speed = 400;
      }
      var speed = (offset_diff * base_speed) / 1000;
      // ... and if very short, set minimum
      if (speed <= base_speed) {
        speed = base_speed;
      }
      if ($('.module.toolkit').length) {
        speed = 0;
      }
      if ($('.module.toolkit').length) {
        speed = 0;
      }

      if (target.length) {
        var scrollhere = target_offset.top - offset;
        $('html,body').animate(
          {
            scrollTop: scrollhere
          },
          speed,
          'swing',
          function() {
            // after animation finished -> focus on target content
            $(target)
              .attr('tabindex', -1)
              .on('blur focusout', function() {
                $(this).removeAttr('tabindex');
              })
              .focus();
          }
        );
        return false;
      }
    });
  }

  function youTubeHelpers() {
    // Inject YouTube API script
    var tag = document.createElement('script');
    tag.src = '//www.youtube.com/player_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    $('.playbutton').on('click touch', function(ev) {
      var container = $(this).closest('.video-container');
      container.removeClass('vid-init');
      // container.siblings('.caption').fadeOut('fast');
      $('#blog_video')[0].src += '&autoplay=1';
      ev.preventDefault();
    });
  }

  function validation() {
    $.listen('parsley:field:error', function(ParsleyField) {
      ParsleyField.$element.prev('label').addClass('error');
    });
    $.listen('parsley:field:success', function(ParsleyField) {
      ParsleyField.$element.prev('label').removeClass('error');
    });
  }

  function isPartOnScreen(e) {
    var offset = $(e).offset();
    var yTop = offset.top;
    var yBottom = offset.top + $(e).outerHeight();
    var sTop = $(document).scrollTop();
    var sBottom = sTop + $(window).outerHeight();

    var onScreen = true;

    if (yBottom < sTop) onScreen = false;
    if (yTop > sBottom) onScreen = false;

    return onScreen;
  }

  _self = {
    init: init,
    getCurrentBootstrapSize: getCurrentBootstrapSize,
    isPartOnScreen: isPartOnScreen
  };

  return _self;
})();

var pmSlideNavs = (function() {
  var _mobileMenuInit = false,
    _chatliveInit = false,
    _$chatlive = $('.chatlive-tray-container'),
    _$chatlivetab = _$chatlive.find('.chatlive-tray-tab'),
    _self = {};

  function init() {
    bindEvents();
    mobileMenu();
    chatLiveInit();
  }

  function bindEvents() {
    $(window).on('resize', function() {
      mobileMenu();
      chatLiveInit();
    });
    $(window).on('bsResizeTomd', function() {
      blackoutOut();
      $('body').removeClass('menu-is-open');
      _$chatlive.removeClass('in').css('top', 0);
      $('body, html').removeClass('chatlive-in');
    });
  }

  // START mobileMenu()
  function mobileMenu() {
    if (_mobileMenuInit) return false;
    if (
      pmGeneral.getCurrentBootstrapSize() != 'xs' &&
      pmGeneral.getCurrentBootstrapSize() != 'sm'
    )
      return false;
    _mobileMenuInit = true;
    $('body').on('click', 'a.menu-open', function() {
      // if menu is open
      if ($('body').hasClass('menu-is-open')) {
        // close menu
        $('body').removeClass('menu-is-open');
        blackoutOut();
      } else {
        // open Menu
        $('body').addClass('menu-is-open');
        blackoutIn();
      }
    });
    $('body').on('click', 'a.menu-close, div.menu-blackout', function() {
      $('body').removeClass('menu-is-open');
      blackoutOut();
      _$chatlive.removeClass('in').css('top', 0);
      $('body, html').removeClass('chatlive-in');
      $('body').attr('style', '');
      $('.megamenu')
        .find('.has-subnav')
        .removeClass('subnav-in');
      $('.megamenu').removeClass('level-2-in');
    });

    $('body').on('click', '.has-subnav > a', function() {
      // if subnav is open
      if (
        $(this)
          .parent()
          .hasClass('subnav-in')
      ) {
        // close subnav
        $(this)
          .parent()
          .removeClass('subnav-in');
        $(this)
          .parents('.megamenu')
          .removeClass('level-2-in');
      } else {
        // open subnav
        $(this)
          .parents('.megamenu')
          .addClass('level-2-in');
        $(this)
          .parent()
          .addClass('subnav-in');
        $(this)
          .parent()
          .siblings()
          .removeClass('subnav-in');
        $('#menu').scrollTop(0);
      }
    });
    $('body').on('click', '.back', function() {
      // if subnav is open
      if (
        $(this)
          .parents('.has-subnav')
          .hasClass('subnav-in')
      ) {
        // close subnav
        $(this)
          .parents('.has-subnav')
          .removeClass('subnav-in');
        $(this)
          .parents('.megamenu')
          .removeClass('level-2-in');
      }
    });
  }
  // END: mobileMenu()

  // START: chatLiveInit()
  function chatLiveInit() {
    if (_chatliveInit) return false;
    if (
      pmGeneral.getCurrentBootstrapSize() != 'xs' &&
      pmGeneral.getCurrentBootstrapSize() != 'sm'
    )
      return false;
    _chatliveInit = true;
    $('.contact-xs').on('click', function() {
      var topHeight = $(window).scrollTop();
      if (_$chatlive.hasClass('in')) {
        _$chatlive.removeClass('in').css('top', 0);
        $('body, html').removeClass('chatlive-in');
        var top = $('body').position().top;
        $('body')
          .attr('style', '')
          .scrollTop(-top);
      } else {
        _$chatlive.addClass('in');
        $('body, html').addClass('chatlive-in');
        var top = $('body').scrollTop();
        $('body')
          .css('position', 'fixed')
          .css('overflow', 'hidden')
          .css('top', -top)
          .css('width', '100%')
          .css('height', top + 5000);
        blackoutIn();
        updateBtnColor();
      }
    });
    $('html.touch .menu-blackout').on('click', function(e) {
      _$chatlive.removeClass('in').css('top', 0);
      $('body, html').removeClass('chatlive-in');
      $('body').removeClass('menu-is-open');
      blackoutOut();
    });
    $('.menu-blackout').on('touchmove', function(e) {
      if ($('.chatlive-in').has($(e.target)).length) e.preventDefault();
    });
    $('html.chatlive-in, body.chatlive-in').on(
      'touchmove',
      function(e) {
        e.preventDefault();
      },
      false
    );
    _$chatlivetab.on('click', function() {
      var topHeight = $(window).scrollTop();
      if (_$chatlive.hasClass('in')) {
        _$chatlive.removeClass('in').css('top', 0);
        $('body, html').removeClass('chatlive-in');
        var top = $('body').position().top;
        $('body')
          .attr('style', '')
          .scrollTop(-top);
        blackoutOut();
      } else {
        _$chatlive.addClass('in');
        $('body, html').addClass('chatlive-in');
        var top = $('body').scrollTop();
        $('body')
          .css('position', 'fixed')
          .css('overflow', 'hidden')
          .css('top', -top)
          .css('width', '100%')
          .css('height', top + 5000);
        updateBtnColor();
      }
    });
  }
  // END: chatLiveInit()

  function updateBtnColor() {
    // Style chatlive inserted
    if (!$('#lpButtonDiv').find('h4').length) {
      $('#lpButtonDiv').css('padding', '0');
      $('.tray-block.call').addClass('no-chatlive');
    } else {
      $('#lpButtonDiv').attr('style', '');
      $('.tray-block.call').removeClass('no-chatlive');
    }
  }

  function blackoutIn() {
    $('body').addClass('blackout');
    $('html').addClass('menu-opened');
  }

  function blackoutOut() {
    $('body').removeClass('blackout');
    $('html').removeClass('menu-opened');
  }

  _self = {
    init: init
  };

  return _self;
})();

var pmCarousels = (function() {
  var _carouselInit = false,
    _carouselInitXS = false,
    _carouselInitXSSM = false,
    _wwidth,
    _bootstrapSize,
    _self = {};

  function init() {
    bindEvents();
    addCarousels();
    addXsCarousels();
    addXsSmCarousels();
  }

  function bindEvents() {
    $(window).on('resize', function() {
      addCarousels();
      killCarousels();
      addXsCarousels();
      killXsCarousels();
      addXsSmCarousels();
      killXsSmCarousels();
    });
  }

  function addCarousels() {
    if (_carouselInit) return false;
    if (
      pmGeneral.getCurrentBootstrapSize() != 'xs' &&
      pmGeneral.getCurrentBootstrapSize() != 'sm'
    )
      return false;
    _carouselInit = true;
    $('.values-carousel').slick({
      dots: true,
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      infinite: false
    });
    $('.owners-carousel').slick({
      dots: true,
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      infinite: false
    });
    $('.proof-points-carousel').slick({
      dots: true,
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      infinite: false
    });
    $('.features-carousel').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      prevArrow:
        '<button type="button" class="slick-prev slick-arrow" role="button" label="Previous"></button>',
      nextArrow:
        '<button type="button" class="slick-next slick-arrow" role="button" label="Next"></button>'
    });
    $('.stats-carousel').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"></button>'
    });
    $('.three-offers').slick({
      infinite: true,
      dots: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"><i class="icon-arrow-2-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"><i class="icon-arrow-2-right"></i></button>',
      appendArrows: $('.three-offers').siblings('.slider-arrow-wrapper'),
      appendDots: $('.three-offers').siblings('.slider-navigation'),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    $('.three-product-tiles').slick({
      infinite: true,
      dots: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"><i class="icon-arrow-2-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"><i class="icon-arrow-2-right"></i></button>',
      appendArrows: $('.three-product-tiles').siblings('.slider-arrow-wrapper'),
      appendDots: $('.three-product-tiles').siblings('.slider-navigation'),
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  function addXsSmCarousels() {
    if (_carouselInitXSSM) return false;
    if (
      pmGeneral.getCurrentBootstrapSize() == 'md' ||
      pmGeneral.getCurrentBootstrapSize() == 'lg'
    )
      return false;
    _carouselInitXSSM = true;
    $('ul.compare-list').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: false,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: '40px'
          }
        }
      ]
    });

    $('.policies-container, .cover-level-container .policies').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: false,
      prevArrow:
        '<button type="button" class="slick-arrow slick-prev"></button>',
      nextArrow:
        '<button type="button" class="slick-arrow slick-next"></button>',
      centerPadding: '40px',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }

  function killXsSmCarousels() {
    if (!_carouselInitXSSM) return false;
    if (
      pmGeneral.getCurrentBootstrapSize() == 'xs' ||
      pmGeneral.getCurrentBootstrapSize() == 'sm'
    )
      return false;
    $(
      'ul.compare-list.slick-initialized, .policies-container, .cover-level-container .policies'
    ).slick('unslick');
    _carouselInitXSSM = false;
  }

  function addXsCarousels() {
    if (_carouselInitXS) return false;
    if (pmGeneral.getCurrentBootstrapSize() != 'xs') return false;
    _carouselInitXS = true;
    $('ul.slider-on-xs').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      prevArrow:
        '<button type="button" class="slick-prev slick-arrow" role="button" label="Previous"></button>',
      nextArrow:
        '<button type="button" class="slick-next slick-arrow" role="button" label="Next"></button>',
      slickFilter: 'li'
    });
    $('.features__grid').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      prevArrow:
        '<button type="button" class="slick-prev slick-arrow" role="button" label="Previous"></button>',
      nextArrow:
        '<button type="button" class="slick-next slick-arrow" role="button" label="Next"></button>'
    });
    $('.intro-feature__features--xs-carousel').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      prevArrow:
        '<button type="button" class="slick-prev slick-arrow" role="button" label="Previous"></button>',
      nextArrow:
        '<button type="button" class="slick-next slick-arrow" role="button" label="Next"></button>',
      centerMode: true,
      centerPadding: '30px'
    });
    $('.slick-xs').slick({
      dots: true,
      arrows: false,
      centerMode: true,
      centerPadding: '0',
      // infinite: false,
      focusOnSelect: false
    });
  }

  function killCarousels() {
    if (!_carouselInit) return false;
    if (
      pmGeneral.getCurrentBootstrapSize() == 'xs' ||
      pmGeneral.getCurrentBootstrapSize() == 'sm'
    )
      return false;
    $('.three-offers.slick-initialized').slick('unslick');
    $('.values-carousel.slick-initialized').slick('unslick');
    $('.owners-carousel.slick-initialized').slick('unslick');
    $('.proof-points-carousel.slick-initialized').slick('unslick');
    $('.stats-carousel.slick-initialized').slick('unslick');
    $('.three-product-tiles.slick-initialized').slick('unslick');
    _carouselInit = false;
  }

  function killXsCarousels() {
    if (!_carouselInitXS) return false;
    if (pmGeneral.getCurrentBootstrapSize() == 'xs') return false;
    $(
      'ul.slider-on-xs.slick-initialized, .features__grid.slick-initialized, .intro-feature__features--xs-carousel.slick-initialized, .slick-xs.slick-initialized'
    ).slick('unslick');
    _carouselInitXS = false;
  }

  // Factors slider
  $('.factors-slider').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true
  });

  // Factors slider
  $('.testimonials--list').slick({
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"></button>'
  });

  $('.articles-carousel').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    //variableWidth: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  _self = {
    init: init
  };

  return _self;
})();

var pmTileFilter = (function() {
  var _tileFilterInit = false,
    _wwidth,
    _self = {};

  function init() {
    bindEvents();
    addTileFilter();
    showMoreTile();
  }

  function bindEvents() {
    $(window).on('resize', function() {
      // addCarousels();
      // killCarousels();
    });
  }

  function addTileFilter() {
    _tileFilterInit = true;
    var filter = $('.filters li').find('a');
    $.each(filter, function() {
      $(this).on('click', function() {
        $('.filters li').removeClass('current');
        $(this)
          .parent()
          .addClass('current');
        $('.guides-grid .grid-item').show();
        $('p.description').hide();
        var filterBy = $(this).data('show');
        if (filterBy != 'all') {
          $(".guides-grid li:not([data-filter='" + filterBy + "'])").hide();

          $("p.description[data-filter='" + filterBy + "']").show();
        }
      });
    });
  }

  function showMoreTile() {
    _tileFilterInit = true;
    $('.load-more').on('click', function() {
      $('.grid-item.hide-on-load').fadeIn(500, function() {
        $('.grid-item').removeClass('.hide-on-load');
        $('.load-more').fadeOut();
      });
    });
  }

  _self = {
    init: init
  };

  return _self;
})();

var pmMobileHelpers = (function() {
  var _initStatus = false,
    _weatherInit = false,
    _self = {};

  function init() {
    bindEvents();
    productsAccordion();
    contentTileAccordion();
    footerAccordion();
    weatherAlert();
  }

  function bindEvents() {
    $(window).on('bsResizeTosm', function() {
      resetAccordions();
    });
  }

  function productsAccordion() {
    var accItem = $('.tiles .product-tile');
    accItem.on('click', '.open-tile', function(e) {
      if ($('html').attr('data-bs-size') != 'xs') return;
      e.preventDefault();
      if (
        $(this)
          .closest('.product-tile')
          .hasClass('open')
      ) {
        $(this)
          .closest('.product-tile')
          .removeClass('open')
          .find('.show-content')
          .slideUp('fast');
      } else {
        $(this)
          .closest('.product-tile')
          .addClass('open')
          .find('.show-content')
          .slideDown('fast');
        $(this)
          .closest('.product-tile')
          .siblings()
          .removeClass('open')
          .find('.show-content')
          .slideUp('fast');
      }
    });
  }

  function contentTileAccordion() {
    var $accItem = $('.tiles .tiles__item');
    if ($('html').attr('data-bs-size') != 'xs') return;
    $.each($accItem, function() {
      $(this)
        .find('.tiles__item-content')
        .hide();
    });
    $accItem.on('click', '.open-tile', function(e) {
      if ($('html').attr('data-bs-size') != 'xs') return;
      e.preventDefault();
      if (
        $(this)
          .closest('.tiles__item')
          .hasClass('open')
      ) {
        $(this)
          .closest('.tiles__item')
          .removeClass('open')
          .find('.tiles__item-content')
          .slideUp('fast');
      } else {
        $(this)
          .closest('.tiles__item')
          .addClass('open')
          .find('.tiles__item-content')
          .slideDown('fast');
        $(this)
          .closest('.tiles__item')
          .siblings()
          .removeClass('open')
          .find('.tiles__item-content')
          .slideUp('fast');
      }
    });
  }

  function footerAccordion() {
    var accItem = $('.footer-lists .list-item');
    accItem.on('click', 'header', function(e) {
      if (pmGeneral.getCurrentBootstrapSize() != 'xs') return false;
      e.preventDefault();
      if (
        $(this)
          .closest('.list-item')
          .hasClass('open')
      ) {
        $(this)
          .closest('.list-item')
          .removeClass('open')
          .find('ul.list')
          .slideUp('fast');
      } else {
        $(this)
          .closest('.footer-lists')
          .find('.list-item')
          .removeClass('open')
          .find('ul.list')
          .slideUp('fast');
        $(this)
          .closest('.list-item')
          .addClass('open')
          .find('ul.list')
          .slideDown('fast');
      }
    });
  }

  function resetAccordions() {
    $('.footer-lists .list-item')
      .removeClass('.open')
      .find('ul.list')
      .show();
    $('.tiles .product-tile, .tiles .tile__item-inner')
      .removeClass('.open')
      .find('.show-content')
      .show();
  }

  function weatherAlert() {
    if (pmGeneral.getCurrentBootstrapSize() != 'xs' && _weatherInit)
      return false;
    setTimeout(function() {
      $('#weather-alert').slideDown();
    }, 2500);
  }

  _self = {
    init: init
  };

  return _self;
})();

var pmModules = (function() {
  var _self = {};

  function init() {
    if ($('.parallax-scroll').length) {
      parallaxScroll();
    }
    if ($('.horizontal-parallax').length) {
      horizontalParallax();
    }
    showMore();
    accordian();
    tabs();
  }

  function accordian() {
    /* GENERIC ACCORDIAN BEHAVIOUR */
    $('.accordian').on('click', 'ul li h4, ul li .open-accordian', function(e) {
      var isAlreadyActive = $(this)
        .parents('li')
        .hasClass('active');
      $('.accordian ul li.active .inside').slideUp();
      $('.accordian ul li').removeClass('active');
      if (!isAlreadyActive) {
        $(this)
          .parents('li')
          .addClass('active');
        $(this)
          .parents('li')
          .find('.inside')
          .slideDown();
      }
    });
    // hide first if mobile
    if (pmGeneral.getCurrentBootstrapSize() === 'xs') {
      $('.accordian ul li:first-child')
        .removeClass('active')
        .find('.inside')
        .hide();
    }
  }

  function horizontalParallax() {
    $('.horizontal-parallax').on('beforeChange', function(
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      var toMove = slick.slideWidth * 0.25 * (nextSlide / slick.slideCount);
      //var toMove = 30;
      if (
        $(this)
          .closest('.pi-product')
          .find('.bg-image-xs').length
      ) {
        $(this)
          .closest('.pi-product')
          .find('.bg-image-xs')
          .css('transform', 'translateX(-' + toMove + 'px)');
      }
      if (
        $(this)
          .closest('.horizontal-slider')
          .find('.bg-image').length
      ) {
        $(this)
          .closest('.horizontal-slider')
          .find('.bg-image')
          .css('transform', 'translateX(-' + toMove + 'px)');
      }
    });
  }

  function parallaxScroll() {
    $(window).on('scroll', function() {
      $('.parallax-scroll').each(function(i, e) {
        if (
          pmGeneral.getCurrentBootstrapSize() !== 'xs' &&
          pmGeneral.isPartOnScreen(this)
        ) {
          // Amount scrolled past top
          var offset = $(this).offset();
          var sTop = $(document).scrollTop();
          var sBottom = sTop + $(window).outerHeight();
          var yTop = offset.top;
          var yBottom = offset.top + $(this).outerHeight();

          // Working on 30% additional height
          var scrollPastTop = sBottom - yTop;
          var spanningHeight = $(window).outerHeight() + $(this).outerHeight();
          // If the item is above the fold, remove the amount of scrolling it can't do
          if (yTop <= $(window).outerHeight()) {
            spanningHeight = spanningHeight - yTop;
            if ($('.site-header-standalone').length) {
              scrollPastTop = scrollPastTop - (yBottom + 450);
            } else {
              scrollPastTop = scrollPastTop - (yBottom + 150);
            }
          }
          var percentageOfVisibleScroll = scrollPastTop / spanningHeight;
          var shift = percentageOfVisibleScroll * $(this).outerHeight() * 0.3;

          var backgroundPositionX = $(this)
            .find('.bg-image')
            .data('background-position-x');
          if (
            typeof backgroundPositionX == 'undefined' ||
            backgroundPositionX == ''
          ) {
            backgroundPositionX = '50%';
          }

          $(this)
            .find('.bg-image')
            .css(
              'backgroundPosition',
              backgroundPositionX + ' -' + shift + 'px'
            );
        }
      });
    });
  }

  function showMore() {
    // Show more policy details fade in reveal
    $('a.show-more').on('click', function(e) {
      $('a.show-more').hide();
      if ($(this).hasClass('more-tick-list')) {
        $('ul.tick-list.more li:not(.show-on-xs)').each(function(i) {
          $(this)
            .delay(i++ * 200)
            .fadeTo(300, 1);
        });
      } else {
        $('ul.more').each(function() {
          $(this)
            .find('li')
            .each(function(i) {
              $(this)
                .delay(i++ * 200)
                .fadeTo(300, 1);
            });
        });
      }
    });
    // Show more policy details fade in reveal
    $('a.show-extra').on('click', function(e) {
      $('a.show-extra').hide();
      $('a.show-less').show();
      $('ul.checklist.reveal')
        .show()
        .each(function() {
          $(this)
            .find('li')
            .each(function(i) {
              $(this)
                .delay(i++ * 200)
                .fadeTo(300, 1);
            });
        });
    });
    // Show less policy details fade out reveal
    $('a.show-less').on('click', function(e) {
      $('a.show-less').hide();
      $('a.show-extra').show();
      $('ul.checklist.reveal')
        .slideUp(1000)
        .find('li')
        .fadeTo(1000, 0);
    });
  }

  function showNextMoreItem() {
    $('ul.more li:not(.in)')
      .first()
      .show();
    setTimeout(function() {
      $('ul.more li:not(.in)')
        .first()
        .addClass('in');
    }, 20);

    if ($('ul.more li:not(.in)').length) {
      setTimeout(function() {
        showNextMoreItem();
      }, 100);
    }
  }

  function tabs() {
    /* BIG TABS */
    $bigTabs = $('.big-tabs');
    $('a', $bigTabs).click(function() {
      $thisLi = $(this).parents('li');
      $('li', $bigTabs)
        .removeClass('active')
        .find('a')
        .attr('aria-selected', 'false');
      $('section[data-big-tabs-id]')
        .hide()
        .attr('aria-hidden', 'true');
      $('section[data-big-tabs-id=' + $thisLi.data('big-tabs-show') + ']')
        .show()
        .attr('aria-hidden', 'false');
      $('section[data-big-tabs-id=' + $thisLi.data('big-tabs-show') + ']')
        .find('.slick-initialized')
        .slick('resize')
        .slick('setPosition', 0);
      $thisLi
        .addClass('active')
        .find('a')
        .attr('aria-selected', 'true');
      if ($thisLi.hasClass('mini-tab')) return false;
    });
    // Load the correct Big Tab on launch
    $('a', $bigTabs).each(function() {
      if (pmGeneral.getCurrentBootstrapSize() == 'xs') return;
      if (window.location.hash == $(this).attr('href')) {
        $(this).trigger('click');
      }
    });
    // Mini Tabs
    if ($('.mini-tabs').length) {
      $('.mobile-tab').on('click', function() {
        if ($(this).hasClass('open')) return false;
        $('.mobile-tab.open')
          .removeClass('open')
          .next()
          .hide();
        $(this)
          .addClass('open')
          .next()
          .show();
        smoothScrollTo('.mobile-tab.open', -65);
      });
      $(window).on('bsResizeTosm bsResizeTomd bsResizeTolg', function() {
        $('.mini-tab-content .inner').show();
      });
      $(window).on('bsResizeToxs', function() {
        $('.mini-tab-content .inner').hide();
      });
    }
  }

  _self = {
    init: init
  };

  return _self;
})();

var typingAnimation = (function() {
  var _self = {},
    header = document.querySelector('.js-typing-animation');

  function init() {
    if (header) {
      var type = header.querySelector('.type'),
        typeHolder = type.firstChild,
        typeStrings = type.getAttribute('data-strings').split(',');
      animate(typeStrings, typeHolder);
    }
  }

  // Forked from: https://codepen.io/danielgroen/pen/VeRPOq

  function animate(typeStrings, typeHolder) {
    // For length of string set, type in a string of characters at random speed
    // then pause and fade out & drop text animation
    // when finished type in next string
    function startAnimation(i) {
      if (typeof typeStrings[i] != 'undefined') {
        // check if typeStrings[i] exists
        // text exists! start writing animation
        writer(typeStrings[i], 0, function() {
          // If not at the end of the string
          if (i != typeStrings.length) {
            // Drop finished text
            typeHolder.classList.remove('in');
            setTimeout(function() {
              // Remove text, stop caret blinking
              typeHolder.innerHTML = '';
              typeHolder.classList.remove('caret-blink');
              // Start animation with next string
              startAnimation(i + 1);
            }, 1200);
          } else {
            // If at the end of the string, start the caret blinking
            typeHolder.classList.add('caret-blink');
          }
        });
      } else {
        // begin loop again
        startAnimation(0);
      }
    }

    // type one string into the element
    // keeps calling itself until the string is finished
    function writer(string, i, fnCallback) {
      // check if text isn't finished yet
      typeHolder.classList.add('in');
      typeHolder.classList.add('caret-blink');
      if (i < string.length) {
        typeHolder.classList.remove('caret-blink');
        var characters = string.split('');
        var current = typeHolder.innerHTML;
        // add next character to h1
        typeHolder.innerHTML = current + characters[i];
        current = typeHolder.innerHTML;
        // wait for a while and call this function again for next character
        setTimeout(function() {
          writer(string, i + 1, fnCallback);
        }, Math.random() * (+100 - +20) + +20);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 1200);
      }
    }
    startAnimation(0);
  }

  _self = {
    init: init
  };

  return _self;
})();

var pmCyber = (function() {
  var _self = {};

  function init() {
    recordsChange();
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }

  function updateCost(records) {
    var cost = records * 144;
    cost = numberWithCommas(cost);
    $('.results__cost').html(cost);
  }

  function recordsChange() {
    var $increase = $('a.increase-btn'),
      $decrease = $('a.decrease-btn'),
      $recordsExposed = $('#recordsExposed');
    $increase.on('click', function() {
      var records = $recordsExposed.val();
      records = parseFloat(records.replace(/,/g, ''));
      records = records + 1000;
      updateCost(records);
      $recordsExposed.val(numberWithCommas(records));
    });
    $decrease.on('click', function() {
      var records = $recordsExposed.val();
      records = parseFloat(records.replace(/,/g, ''));
      records = records - 1000;
      updateCost(records);
      $recordsExposed.val(numberWithCommas(records));
    });

    $recordsExposed.keyup(function(event) {
      // skip for arrow keys
      if (event.which >= 37 && event.which <= 40) return;

      // format number
      var records = $(this).val();
      records = parseFloat(records.replace(/,/g, ''));
      updateCost(records);
      $(this).val(function(index, value) {
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      });
    });
  }

  _self = {
    init: init
  };

  return _self;
})();

var stickyNavInit = function() {

  var navSelector = '.sticky-nav';
  var navItemSelector = '.sticky-nav__link-item';
  var activeClass = 'is-active';
  var offsetPercentage = 30;

  var nav = document.querySelector(navSelector);
  var navItems = nav.querySelectorAll(navItemSelector);
  var targets = [];

  var current = 'default';

  forEach(navItems, function(index, el) {
    var target = el.getAttribute('href').replace('#', '');
    targets.push(target);
  });

  var updateUrl = function() {
    if (current !== 'default') {
      try {
        history.pushState(null, null, '#' + current);
      } catch (e) {
        if (
          e.name === 'SecurityError' &&
          e.message.includes('Attempt to use history.pushState()')
        ) {
          return;
        }
        throw e;
      }
    } else {
      try {
        history.pushState('', document.title, window.location.pathname);
      } catch (e) {
        if (
          e.name === 'SecurityError' &&
          e.message.includes('Attempt to use history.pushState()')
        ) {
          return;
        }
        throw e;
      }
    }
  };

  var scrollHandler = function() {
    current = 'default';
    forEach(targets, function(index, el) {
      var target = document.querySelector('#' + el);
      if (
        window.scrollY >
        target.offsetTop - (target.offsetHeight / 100) * offsetPercentage
      ) {
        current = el;
      }
    });

    if (current !== 'default') {
      forEach(navItems, function(index, el) {
        if (el.getAttribute('href') != '#' + current) {
          el.classList.remove(activeClass);
          el.parentNode.classList.remove(activeClass);
        } else {
          el.classList.add(activeClass);
          el.parentNode.classList.add(activeClass);
        }
      });
    } else {
      forEach(navItems, function(index, el) {
        el.classList.remove(activeClass);
        el.parentNode.classList.remove(activeClass);
      });
    }
  };

  // Throttled function
  var throttleScrollHandler = _.throttle(scrollHandler, 100);

  // Debounced function
  var debounceUrl = _.debounce(updateUrl, 30);

  window.addEventListener('scroll', function() {
    throttleScrollHandler();
    debounceUrl();
  });

  // Unbind JQuery event listeners added by refresh.min.js
  // Reinstate without .focus() on callback
  $(window).load(function() {
    $('.sticky-nav__link-item')
      .unbind()
      .click(function() {
        var target = $(this.hash);
        var target_offset = target.offset();
        var offset = 80;
        var this_offset = $(this).offset();
        var offset_diff = Math.abs(target_offset.top - this_offset.top);
        var base_speed = 800;
        var speed = (offset_diff * base_speed) / 1000;
        if (speed <= base_speed) {
          speed = base_speed;
        }
        if (target.length) {
          var scrollhere = target_offset.top - offset;
          $('html,body').animate(
            {
              scrollTop: scrollhere
            },
            speed,
            'swing'
          );
          return false;
        }
      });
  });
};

var tabPanelInit = function() {
  var tabPanelNav = document.querySelectorAll('.tab-nav-item');
  var tabPanelItems = document.querySelectorAll('.tab-content-item');
  function hideItems(tabPanelItems) {
    forEach(tabPanelItems, function(i, el) {
      if (!el.classList.contains('active')) {
        el.style.display = 'none';
      }
    });
  }
  function togglePanels(tabPanelItems, activeIndex) {
    var activeTabPanel = document.querySelector('.tab-content-item.active');
    activeTabPanel.classList.remove('active');
    activeTabPanel.style.display = 'none';
    forEach(tabPanelItems, function(i, el) {
      var tabContentIndex = el.getAttribute('data-tab');
      if (tabContentIndex == activeIndex) {
        el.style.display = '';
        // Prevent race condition
        setTimeout(function() {
          el.classList.add('active');
        }, 10);
      }
    });
  }
  // hide tab panels without active class on load
  hideItems(tabPanelItems);
  // click on a tab panel nav item
  forEach(tabPanelNav, function(i, el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      var tabIndex = el.getAttribute('data-tab');
      var activeNavItem = document.querySelector('.tab-nav-item.active');
      activeNavItem.classList.remove('active');
      el.classList.add('active');
      togglePanels(tabPanelItems, tabIndex);
    });
  });
};

var accordionInit = function() {
  var accordionItems = document.querySelectorAll('.accordion');
  var closeOthers = false;
  function openAccordion(target, height, parent, closeOthers) {
    if (closeOthers) {
      var children = parent.querySelectorAll('.accordion');
      forEach(children, function(i, el) {
        var child = el.querySelector('.js-accordion-target');
        var activeTrigger = el.querySelector('.js-accordion-trigger');
        closeAccordion(child);
        removeActiveClass(activeTrigger);
      });
    }
    target.style.height = height + 'px';
    target.dataset.isOpen = 'true';
  }
  function closeAccordion(target) {
    target.style.height = '0px';
    target.dataset.isOpen = 'false';
  }
  function removeActiveClass(trigger) {
    trigger.classList.remove('active');
  }
  forEach(accordionItems, function(i, el) {
    var trigger = el.querySelector('.js-accordion-trigger');
    var target = el.querySelector('.js-accordion-target');
    var content = el.querySelector('.accordion-content');
    var parent = el.closest('.accordion-list');
    if (parent.dataset.closeOthers == 'true') {
      closeOthers = true;
    }
    trigger.addEventListener('click', function() {
      var isOpen = target.dataset.isOpen;
      var contentHeight = content.offsetHeight;
      if (isOpen == 'true') {
        closeAccordion(target);
        removeActiveClass(trigger);
      } else {
        openAccordion(target, contentHeight, parent, closeOthers);
        trigger.classList.add('active');
      }
    });
  });
};

var faqTilesInit = function() {
  var faqTiles = document.querySelectorAll('.faq-tile');
  forEach(faqTiles, function(index, elem) {
    var copy = elem.querySelector('.faq-tile__copy');
    var tileHeight = elem.offsetHeight;
    elem.addEventListener('click', function() {
      var intViewportWidth = window.innerWidth;
      var contentHeight = copy.offsetHeight;
      if (!elem.classList.contains('is-active')) {
        elem.classList.add('is-active');
        if (intViewportWidth < 768) {
          if (tileHeight <= contentHeight) {
            elem.style.height = tileHeight + 'px';
            setTimeout(function() {
              elem.style.height = contentHeight + 'px';
            }, 10);
          } else {
            copy.style.height = '100%';
          }
        }
      } else {
        elem.classList.remove('is-active');
        if (intViewportWidth < 768) {
          elem.style.height = tileHeight + 'px';
        }
      }
    });
  });
};

var contentCarouselInit = function() {
  var carousel = document.querySelector('.content-carousel');
  var carouselItems = carousel.querySelectorAll('.carousel-inner');
  var paginationWrapper = carousel.querySelector('.pagination-wrapper');
  var navWrapper = carousel.querySelector('.content-carousel__controls');
  var carouselSelectors = [
    '.carousel-image',
    '.carousel-caption',
    '.carousel-inner'
  ];

  var goToSlide = function(slideIndex) {
    var activeItems = carousel.querySelectorAll('.is-active');
    forEach(activeItems, function(index, elem) {
      elem.classList.remove('is-active');
    });

    forEach(carouselSelectors, function(index, selector) {
      var targetItem = carousel.querySelector(selector + '-' + slideIndex);
      targetItem.classList.add('is-active');
    });

    forEach(carousel.querySelectorAll('.pagination-link'), function(
      index,
      elem
    ) {
      elem.classList.remove('is-active');
      if (index + 1 == slideIndex) {
        elem.classList.add('is-active');
      }
    });

    if (slideIndex >= carouselItems.length) {
      navWrapper.querySelector('.control-prev').classList.add('is-active');
      navWrapper.querySelector('.control-next').classList.remove('is-active');
    } else if (slideIndex <= 1) {
      navWrapper.querySelector('.control-next').classList.add('is-active');
      navWrapper.querySelector('.control-prev').classList.remove('is-active');
    } else {
      navWrapper.querySelector('.control-next').classList.add('is-active');
      navWrapper.querySelector('.control-prev').classList.add('is-active');
    }

    carousel
      .querySelector('.content-carousel-wrapper')
      .setAttribute('data-active-slide', slideIndex);
  };

  function buildCarouselPagination() {
    for (index = 0; index < carouselItems.length; index++) {
      var btn = document.createElement('a');
      btn.classList.add('pagination-link', 'slide' + index);
      if (index == 0) {
        btn.classList.add('is-active');
      }
      btn.textContent = index;
      btn.addEventListener('click', function() {
        goToSlide(parseInt(this.innerText) + 1);
      });
      paginationWrapper.appendChild(btn);
    }
  }

  navWrapper
    .querySelector('.control-next')
    .addEventListener('click', function(e) {
      e.preventDefault();
      var currentSlide = carousel
        .querySelector('.content-carousel-wrapper')
        .getAttribute('data-active-slide');
      goToSlide(parseInt(currentSlide) + 1);
    });

  navWrapper
    .querySelector('.control-prev')
    .addEventListener('click', function(e) {
      e.preventDefault();
      var currentSlide = carousel
        .querySelector('.content-carousel-wrapper')
        .getAttribute('data-active-slide');
      goToSlide(parseInt(currentSlide) - 1);
    });

  buildCarouselPagination();
};

// ======= POLYFILLS ======= //

// IE11 support for forEach
var forEach = function(array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
}
// IE11 support for .matches
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}
// IE11 support for .closet
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}