/* ----------------------------------------------------------------- 
   Função de validação onde também adiciona estilo a classe inválida
----------------------------------------------------------------- */

function validacao(classe){

    var obrigatorio = 0, preenchido = 0;

    $(classe).each(function() {

          obrigatorio++;

          if (($.trim($(this).val()) == '') || $(this).val() == "") {
               $(this).css({
                   "border": "1px solid red",
                   "background": "#FFCECE"
               });   
          }

          else {
              $(this).css({
                  "border": "",
                  "background": ""
              });
              preenchido++;
          }
        
    });

    if (obrigatorio == preenchido) {
      return true;
    } else {
      return false;
    }

}
