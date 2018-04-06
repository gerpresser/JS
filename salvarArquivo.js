function salvarArquivo(arquivoConvertido){

  $("#containerProgress").fadeIn();
  $(".progress-bar").css("width", "0%");

  var file = $("#fileUpload").val();
  
  var extensao = file.substr( (file.lastIndexOf('.') +1) );

  var nomeArquivo = file.replace(/\\/g, '/');
  nomeArquivo = nomeArquivo.substring(nomeArquivo.lastIndexOf('/')+1, nomeArquivo.lastIndexOf('.'));

  var d = new Date();
  var dataFormatada;
    
  dataFormatada =
         ("00" + d.getDate()).slice(-2) + 
         ("00" + (d.getMonth() + 1)).slice(-2) + 
         d.getFullYear() + 
         ("00" + d.getHours()).slice(-2) + 
         ("00" + d.getMinutes()).slice(-2) + 
         ("00" + d.getSeconds()).slice(-2)

  nomeArquivo = nomeArquivo + dataFormatada;

  $.ajax({
    xhr: function() {

       var xhr = new window.XMLHttpRequest();
       xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                var percentComplete = evt.loaded / evt.total;
                $(".progress-bar").css("width", percentComplete*100+"%")
            }
       }, false);

       return xhr;
    },
    type: 'POST',
    url: "pedido.asp",
    data: {acao: 'salvarArquivo', nomeArquivo: nomeArquivo, arquivo: arquivoConvertido, extensao:extensao},
    success: function(data){
        imagemAceita = true;
        setTimeout(function(){ 
          $(".progress-bar").removeClass("progress-bar-info");
          $(".progress-bar").addClass("progress-bar-success");

          $("#btnEnviar").removeClass("btn-primary");
          $("#btnEnviar").addClass("btn-success");
          $("#btnEnviar").html('<i class="fas fa-check" style="height:20px;line-height:20px;"></i>');

          $("#layoutselecionado").val(nomeArquivo+"."+extensao);
          
          $("#tooltipLayout").tooltip({ 
            content: '<img src="/licitacao/Arquivos/ecommerce/'+$("#layoutselecionado").val()+'" width="300" height="300"/>',
            track: true
          });

          $(".recebido").fadeIn();
        }, 500);
    },
    error: function(data){
        imagemAceita = false;
        avisoNoty("<b>Ocorreu um erro durante o processo</b>", "error");
    }

  });

}
