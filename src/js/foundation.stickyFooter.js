
!function ($) {
    "use strict";

    class StickyFooter {

        constructor(element, options) {
            this.$element = element;

            if (!this.$element.is('footer')) {
                console.warn('Sticky footer must be initialized on a footer element.')
            }
            if (!this.$element.parent().is('body')) {
                console.warn('The sticky footer must be placed directly in the body tag.')
            }

            this.options = $.extend({}, StickyFooter.defaults, this.$element.data(), options);
            this._init();

            Foundation.registerPlugin(this, 'StickyFooter');

        }

        /**
         * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
         * @function
         * @private
         */
        _init() {
            var _this = this;
            this.$wrapper = $('<div class="page-wrap">');
            this.$spacer = $('<div class="sticky-footer-space">');
            $('body').prepend(this.$wrapper);
            $('body').find(' > *:not(footer):not(.page-wrap):not(script)').each(function (index, element) {
                $(element).detach().appendTo(_this.$wrapper);
            });
            this.$wrapper.append(this.$spacer);

            this.footerMarginTop = this.$element.css('margin-top');
            this.$element.css({'margin-top': 0});

            $(window)
                .on('load', this.setStickyFooter.bind(this))
                .on('resize', this.setStickyFooter.bind(this));
        }

        setStickyFooter() {
            var footerDims = Foundation.Box.GetDimensions(this.$element);
            this.$wrapper.css({'margin-bottom': (-footerDims.height) + 'px'});
            this.$spacer.css({'height': footerDims.height + 'px', 'margin-top': this.footerMarginTop});
        }

        destroy() {
            this.$spacer.remove();
            this.$wrapper.find(' > *').moveTo($('body'));
            this.$wrapper.remove();
            Foundation.unregisterPlugin(this);
        }
    }

    StickyFooter.defaults = {
    };

    // Window exports
    Foundation.plugin(StickyFooter, 'StickyFooter');

} (jQuery);
