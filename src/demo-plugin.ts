// Implement code logic
interface IDemoConfig {
    name?: string;
    color?: string;
}

class Demo {    
    private config: IDemoConfig;
    private element: JQuery<HTMLElement>;
    
    constructor(config: IDemoConfig, element: JQuery<HTMLElement>) {
        this.config = config;
        this.element = element;
        this.setup();
    }

    public setup(): void {
        this.element.html(this.config.name);
        this.element.css({
            color: this.config.color
        });
    }
}
// ----------------------------------------------------------------------
// Defined plugin JQuery
interface JQuery {
    demo(options: any): JQuery;
}

(function ($) {
    $.fn.demo = function (options: IDemoConfig): JQuery {

        let config: IDemoConfig = {
            name: "JQuery Plugin Template",
            color: 'blue'
        };

        if (options) {
            $.extend(config, options);
        }

        return this.each(function () {
            let demo = new Demo(config, $(this));
        });
    };
})(jQuery);    