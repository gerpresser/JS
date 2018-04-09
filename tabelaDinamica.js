/* -----------------------------------------------------------------
   Monta uma tabela dinamica com o result set, separado por região
----------------------------------------------------------------- */

function montarTabela(){

  var statusPesquisa = "";

  if ($("#selectPesquisa").val() == 0) {
    $("#divPesquisa").hide();
    $("#divPesquisaGeral").hide();
    $("#txtPesquisa").html('Selecione uma pesquisa para continuar.');
  } 
  else {

    $.post("retorno.asp", { acao: 'retornarResultado', chpesquisa: $("#selectPesquisa").val()}, function (result) {

        var linha = "", sigla = "", totalVotos = 0;

        $.each(result, function (i, valor) {

          //Monta a primeira tabela e atribui valor em uma variavel de trabalho -- Inicializacao
          if (!sigla) {
            sigla = valor.sigla;
            linha += '<h4 class="text-center"><b>Votos Por Região</b></h4>';
            linha += '<table class="table table-condensed table-responsive" style="border: 2px solid #DDD;" id="'+valor.sigla+'">';
            linha += '  <thead style="background:#F4F6F7">';
            linha += '   <tr>';
            linha += '    <th width="33%" class="text-center">Regi&atilde;o</th>';
            linha += '    <th width="34%" class="text-center">Candidato</th>';
            linha += '    <th width="33%" class="text-center">Votos</th>';
            linha += '   </tr>';
            linha += '  </thead>';
            linha += '  <tbody>';
          }

          //Se a variavel de trabalho for igual ao retorno do banco insere linha na tabela -- Insercao de dados na tabela
          if (sigla == valor.sigla) {
            totalVotos += valor.totalvotos;
            linha += "<tr>";
            linha += " <td class='text-center'>"+valor.sigla+"</td>";
            linha += " <td class='text-center'>"+valor.candidato+"</td>";
            linha += " <td class='text-center'>"+valor.totalvotos+"</td>";
            linha += "</tr>";
          } 
          //Se a variavel de trabalho for diferente ao retorno do banco insere rodapé, fecha, abre e insere o resultado na tabela -- Fechamento
          else {
            sigla = '"' + sigla + '"';
            linha += "  <tr style='background:#F4F6F7; font-weight:bold;'>";
            linha += "   <td class='text-center'><button type='button' class='btn btn-link' onclick='fnExcelReport("+sigla+")'><b>Exportar Excel</b></button></td>";
            linha += "   <td class='text-center'>&nbsp;</td>";
            linha += "   <td class='text-center' style='margin-top:5px;line-height:34px;'>Total de votos: "+totalVotos+"</td>";
            linha += "  </tr>";
            linha += ' </tbody>';
            linha += '</table>';
            linha += '<table class="table table-condensed table-responsive" style="border: 2px solid #DDD;" id="'+valor.sigla+'">';
            linha += ' <thead style="background:#F4F6F7">';
            linha += '  <tr>';
            linha += '   <th width="33%" class="text-center">Regi&atilde;o</th>';
            linha += '   <th width="34%" class="text-center">Candidato</th>';
            linha += '   <th width="33%" class="text-center">Votos</th>';
            linha += '  </tr>';
            linha += ' </thead>';
            linha += ' <tbody>';
            linha += " <td class='text-center'>"+valor.sigla+"</td>";
            linha += " <td class='text-center'>"+valor.candidato+"</td>";
            linha += " <td class='text-center'>"+valor.totalvotos+"</td>";
            totalVotos = 0;
          }

          sigla = valor.sigla;

        });

        //Ao final do processo insere rodape na ultima tabela
        sigla = '"' + sigla + '"';
        linha += "<tr style='background:#F4F6F7; font-weight:bold;'>";
        linha += "   <td class='text-center'><button type='button' class='btn btn-link' onclick='fnExcelReport("+sigla+")'><b>Exportar Excel</b></button></td>";
        linha += "   <td class='text-center'>&nbsp;</td>";
        linha += "   <td class='text-center' style='margin-top:5px;line-height:34px;'>Total de votos: "+totalVotos+"</td>";
        linha += "</tr>";

        $("#divPesquisa").html(linha);
        $("#divPesquisa").show();

        if ($("#selectPesquisa :selected").attr('class') == 'ativo') {
           statusPesquisa = "Relatório Parcial";
        } 
        else {
           statusPesquisa = "Resultado Final";
        }

        $("#txtPesquisa").html($("#selectPesquisa :selected").text() + " ("+statusPesquisa+")");

    }, "JSON");


    $.post("retorno.asp", { acao: 'retornarResultadoGeral', chpesquisa: $("#selectPesquisa").val()}, function (result) {

         var linha = "", totalVotos = 0;

         $.each(result, function (i, valor) {
            totalVotos += valor.totalVotos;

            linha += "<tr "+estilo+">";
            linha += " <td class='text-center'>"+valor.candidato+"</td>";
            linha += " <td class='text-center'>"+valor.totalVotos+"</td>";
            linha += "</tr>";
         });

         var tratarID = '"'+'tabelaTotalCandidato'+'"';

         linha += "<tr style='background:#F4F6F7; font-weight:bold;'>";
         linha += " <td class='text-center'><button type='button' class='btn btn-link' onclick='fnExcelReport("+tratarID+")'><b>Exportar Excel</b></button></td>";
         linha += " <td class='text-center' style='margin-top:5px;line-height:34px;'>Total de votos: "+totalVotos+"</td>";   
         linha += "</tr>";

         $("#tbodyPesquisaGeral").html(linha);
         $("#divPesquisaGeral").show();

    }, "JSON");

  }

}
