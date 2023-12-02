/**
 * @author      Luiz Eurico da Silva Neto
 * @date        02/12/2023
 * @version     1.0.0
 * @copyright   A22 - Serviços Industriais
 * 
 * Objeto para manipular o Select Genérico
 * 
 * e => Element
 * c => Container
 * f => Function
 * 
 * data-generic-select-index => Index da opção no select
*/

class Generic_Select {
    constructor() {
        this.e_input    = null;
        this.c_input    = null;
        this.c_options  = null;
        this.e_option   = null;
    }

    f_get_parts() {
        console.log("f_get_parts()");
        this.c_options  = $(".a22_widget_generic_select_options", self.ctx.$container);
        this.e_option   = $(".a22_widget_generic_select_option", self.ctx.$container);
        this.c_input    = $(".a22_widget_generic_select_input_container", self.ctx.$container);
        this.e_input    = $(".a22_widget_generic_select_input", self.ctx.$container);
        console.clear()
        console.log(this.c_options);
        console.log(this.e_input);
    }

    f_on_resize() {
            // Obtendo as novas dimensões do Select
            let select_pos  = {
                x       : this.c_input.position().left,
                y       : this.c_input.position().top,
                width   : this.c_input.width()
            };

            // Dimensionando o container das opções
            this.c_options.css({
                "left"  : `${select_pos["x"]}px`,
                "top"   : `${select_pos["y"] + 40}px`,
                "width" : `${select_pos["width"]}`
            });
    }

    f_show_options() {
        console.log("f_show_options()");
        this.f_on_resize();
        this.c_options.css({"display" : "flex"});
    }

    f_hide_options() {
        this.f_on_resize();
        this.c_options.css({"display" : "none"});
    }

    f_select_option(element) {
        // Atribuindo texto da opção ao input
        this.e_input.val(element[0].innerText);
        // Atribuindo valor da opção ao input
        this.e_input.attr("data-generic-select-index", element.attr("data-generic-select-index"));
    }

    f_register_events() {
        console.log("f_register_events()");
        // Quando clicar (sem soltar) em um opção
        // $(document).on("mousedown", ".a22_widget_generic_select_option", (event) => {
        //     this.f_select_option($(event.currentTarget));
        // });
        
        this.c_options.on("mousedown", (e) => {
            console.log(e.target);
            this.f_select_option($(e.target));
        });

        // Quando clicar no input
        this.e_input.on("click", () => {
            this.f_show_options();
        });

        // Quando clicar fora do input
        this.e_input.on("blur", () => {
            this.f_hide_options();
        });
    }
    
    f_add_option(index, text) {
        this.c_options.append($(`<div data-generic-select-index="${index}" class="a22_widget_generic_select_option"> ${text} </div>`));
    }
}