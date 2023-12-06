<!-- 
    @author     Luiz Eurico da Silva Neto
    @date       02/12/2023
    @version    1.0.0
    @copyright  A22 Serviços Industriais

    Arquivo README de Generic Select
 -->

# Classe Generic Select

## Prefixos
A classe `Generic Select` contém prefixos nos nomes de seus atributos para facilitar seu entendimento e uso.

### Prefixo E
Significa que o atributo está armazenando um elemento.
Por Exemplo: `e_input` significa que o atributo está armazenando o elemento input do Select.

### Prefixo C
Significa que o atributo está armazenando um container.
Por exemplo: `c_options` significa que o atributo está armazenando o container das opções, a div contendo as opções do Select.

### Prefixo F
Significa que é uma função.
Por exemplo: `f_get_parts()` significa que é uma função para obter os elementos e containers do Select.

## Atributos
Os atributos e suas finalidades são:
- `this.container`: armazena o objeto `self.ctx.$container` para obter apenas os elementos referentes ao próprio widget;
- `this.e_input`: armazena o elemento input do Select, onde aparecerá o texto da opção e será setado o valor definido;
- `this.c_input`: armazena o container do input do Select;
- `this.c_options`: armazena o container das opções do Select;
- `this.e_options`: armazena todos os elementos das opções do Select em um array e
- `data-generic-select-index`: atributo do input (HTML) que é setado para armazenar o índice da opção selecionada

## Eventos
Os eventos disparados pelo Select são:
- `this.f_on_select_option`: disparado quando o click é feito sob uma opção do Select

## Funções
As funções e suas finalidades são:
- `f_get_parts()`: obtém os todos os elementos e containers do Select;
- `f_on_resize()`: redimensiona e reposiciona o container das opções de acordo com o tamanho e posição do input do Select;
- `f_show_options()`: mostra o container das opções do Select;
- `f_hide_options()`: escodne o container das opções do Select;
- `f_select_option()`: trata a seleção de uma das opções do Select;
- `f_register_events()`: registra os eventos que precisam ser trigados no Select;
- `f_add_option(index, text)`: insere uma opção no Select, sendo `index` a posição e `text` o texto exibido da opção e
- `f_get_option_selected()`: retorna o número do índice da opção selecionada.