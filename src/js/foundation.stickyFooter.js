
!function ($) {
    "use strict";

    class StickyFooter {

        constructor(footer, options) {
            this.$footer = footer;

            if (!this.$footer.is('footer')) {
                console.warn('Sticky footer must be initialized on a footer element.')
            }
            if (!this.$footer.parent().is('body')) {
                console.warn('The sticky footer must be directly in the body tag')
            }

            this.options = $.extend({}, StickyFooter.defaults, this.$footer.data(), options);
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
            $('body').find(' > *:not(footer):not(.page-wrap)').each(function (index, element) {
                $(element).detach().appendTo(_this.$wrapper);
            });
            this.$wrapper.append(this.$spacer);

            this.footerMarginTop = this.$footer.css('margin-top');
            this.$footer.css({'margin-top': 0});

            $(window)
                .on('load', this.setStickyFooter.bind(this))
                .on('resize', this.setStickyFooter.bind(this));
        }

        setStickyFooter() {
            var footerDims = Foundation.Box.GetDimensions(this.$footer);
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
