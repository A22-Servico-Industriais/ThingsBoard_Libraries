/**
 * @author      Luiz Eurico da Silva Neto
 * @date        06/12/2023
 * @version     1.1.0
 * @copyright   A22 Serviços Industriais
 * 
 * Código para exportar os dados do Widget em formato csv separado por ","
 **/

// Variáveis
let data_export = "timestamp,"; // String contendo todos os dados para csv (separado por ",")
let foreach_count = 0;          // Contagem de loops dos dados
let widget_data         = [];   // Array contendo todos os dados do Widget
let biggest_array       = 0;    // Variável para armazenar o tamanho do maior array de dados do Widget
let lengths_array       = [];   // Array contendo os tamanhos dos arrays de dados do Widget
// Flag para saber se o Widget é timeseries
let widget_timeseries   = (widgetContext.widgetConfig["timewindow"]["history"] == undefined);

/**
 * Função para gerar o arquivo e executar o Download do csv
 * 
 * @param data String contendo os dados (separados por ",") que serão baixados
 **/
function download_csv(data) {
    // Abrindo link de download em nova janela
    let download_window = window.open(`data:text/csv;charset=utf-8,${encodeURI(data)}`, "_blank");
}

/**
 * Função paa adiconar o cabeçalho no csv
 * 
 * @param index Índice do objeto que está sendo percorrido
 **/
function add_csv_headers(index) {
    if(foreach_count > 0) { // Se já tiver sido inserido algum dado, coloque ","
        data_export += ",";
    }
    
    data_export += widgetContext.data[index]["dataKey"]["label"]; // Inserindo o label do dado
    foreach_count++;    // Incrementando o contador
}

/**
 * Função para obter os dados configurados no Widget
 * 
 * @param index Índice do objeto que está sendo percorrido
 **/
function get_widget_data(index) {
     Object.keys(widgetContext.data[index]["data"]).forEach((data_index) => {   // Percorrendo todos os dados daquela chave de dados do Widget
        // Inserindo o dado no array
         widget_data[index].push({
             timestamp  : widgetContext.data[index]["data"][data_index][0],
             value      : widgetContext.data[index]["data"][data_index][1]
         });
     });
}

// Preparando objeto para receber os dados do Widget
Object.keys(widgetContext.data).forEach((index) => {
    // Instanciando array
    widget_data[index] = [];
    
    // Obtendo os dados do Widget
    get_widget_data(index);
});

// Adicionando cabeçalhos
Object.keys(widget_data).forEach((index) => {
    add_csv_headers(index);
});
data_export += "\n";
foreach_count = 0;

// Calculando o maior array de dados do Widget
Object.keys(widget_data).forEach((index) => {
     lengths_array.push(widget_data[index].length);
});
lengths_array.push(widget_data.length);

biggest_array = Math.max.apply(null, lengths_array);    // Pegando o tamanho maior array

// Widget de Timeseries
if(widget_timeseries) {
    foreach_count = 0;
    for(let i = 0; i < biggest_array; i++) {
        data_export += "0,"; // Timestamp
        
        for(let l = 0; l < biggest_array; l++) {
            if(l >= widget_data.length) { // Não há mais chaves de dados
                break;
            }
            
            if(foreach_count > 0) { // Não é o primeiro loop
                data_export += ",";
            }
            
            // Não tem esse dado
            if(widget_data[i] == undefined || widget_data[i][l] == undefined) {
                data_export += "0";
            } else {
                data_export += `${widget_data[i][l]["value"]}`;   
            }
            
            foreach_count++;
        }
        
        data_export += "\n"; // Fim da linha
        foreach_count = 0; // Zerando o contador
    }   
} else {
    foreach_count = 0;
    data_export += widget_data[0][0]["timestamp"] + ","; // Adicionando timestamp
    Object.keys(widget_data).forEach((index) => { // Percorrendo dados
        if(foreach_count > 0) { // Não é o primeiro dado
            data_export += ",";
        }
        
        data_export +=  widget_data[index][0]["value"]; // Inserindo valor
        
        foreach_count++; // Incrementando o contador
    });
}

download_csv(data_export);