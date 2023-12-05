/**
 * @author      Luiz Eurico da Silva Neto
 * @date        02/12/2023
 * @version     1.1.0
 * @copyright   A22 - Serviços Industriais
 * 
 * Objeto para manipular o Select Genérico
 * 
 * e => Element
 * c => Container
 * f => Function
 * 
 * data-generic-select-index => Index da opção no select
 * 
 * Atual: Obter os elementos
*/

class Generic_Select {
    // Construtor
    constructor(container) {
        this.container          = container;
        this.e_input            = null;
        this.c_input            = null;
        this.c_options          = null;
        this.e_option           = null;
        this.f_on_select_option = null;
    }

    // Obtém os elementos do Select
    f_get_parts() {
        this.c_options  = $(".a22_widget_generic_select_options", this.container);
        this.e_option   = $(".a22_widget_generic_select_option", this.container);
        this.c_input    = $(".a22_widget_generic_select_input_container", this.container);
        this.e_input    = $(".a22_widget_generic_select_input", this.container);
    }

    // Recalcula o tamanho e posição do container das opções
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

    // Mostra o container das opções
    f_show_options() {
        this.f_on_resize();
        this.c_options.css({"display" : "flex"});
    }

    // Esconde o container das opções
    f_hide_options() {
        this.f_on_resize();
        this.c_options.css({"display" : "none"});
    }

    // Trata quando uma opção é selecionada
    f_select_option(element) {
        // Atribuindo texto da opção ao input
        this.e_input.val(element[0].innerText);
        // Atribuindo valor da opção ao input
        this.e_input.attr("data-generic-select-index", element.attr("data-generic-select-index"));
        this.f_on_select_option();
    }

    // Registra os eventos do Select
    f_register_events() {
        // Quando clicar (sem soltar) no container das opções
        this.c_options.on("mousedown", (e) => {
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
        
        // Impedindo que escrevam no input
        this.e_input.on("change", () => {
            this.e_input.val(`${this.e_input.attr("data-generic-select-index")} - ${configs_path[this.e_input.attr("data-generic-select-index")]["label"]}`);
        });
    }
    
    // Adiciona uma opção no Select
    f_add_option(index, text) {
        this.c_options.append($(`<div data-generic-select-index="${index}" class="a22_widget_generic_select_option"> ${text} </div>`));
    }
    
    // Retorna o data-generic-select-index
    f_get_option_selected() {
        return Number(this.e_input.attr("data-generic-select-index"));
    }
}