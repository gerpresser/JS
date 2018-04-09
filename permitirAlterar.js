/* -------------------------------------------------------------------------
  Função para alterar valores, calcular desconto e atribuir uma funcao se a 
  condicao for verdadeira
------------------------------------------------------------------------- */

function permitirAlterar(){

  var linha = "";
  var botoes = "";
  var temProdM2 = false;

  var urlParametro = window.location.href;
  urlParametro = urlParametro.split('?chpedido=');
  chpedido = urlParametro[1];

  $.post("retornoBanco.asp", { acao: 'retornarPedidos', chpedido:chpedido}, function (result) {
         if (result == "") {
            history.go(-1); 
            return false;
         }
         $.each(result, function (i, valor) {

            botoes =  '<a class="btn btn-danger" onclick="history.go(-1); return false;">Voltar</a>' +
                      '&nbsp;&nbsp;&nbsp;' +
                      '<a href="/raiz/mostrar.asp?a='+valor.chPedido+'&c='+valor.chcliente+'" class="btn btn-primary" target="_blank">Imprimir Pedido</a>'

            if (valor.chstatus != 2) {
                botoes += '&nbsp;&nbsp;&nbsp;' +
                          '<button class="btn btn-success" style="color:#fff;width:150px;" onclick="statusCampanha(2);">Aprovar Campanha</button>' 
            }

            if (valor.chstatus !=4) {
                botoes += '&nbsp;&nbsp;&nbsp;' +
                          '<button class="btn btn-danger" onclick="statusCampanha(4);">Reprovar Campanha</button>' 
            }

            $("#lblValorTotal").html("R$"+valor.valortotal.toLocaleString(undefined, { minimumFractionDigits: 2 }));
            $("#lblInicio").html(valor.datainicio);
            $("#lblFim").html(valor.datafim);
            $("#nomeCampanha").val(valor.tituloCampanha);

            if (valor.quantimes == 1) {
             $("#lblPrazo").html(valor.quantimes + " mês");
            } else {
             $("#lblPrazo").html(valor.quantimes + " meses");
            }

            $("#numPed").html(valor.chPedido);
            $("#dataPed").html(valor.datahora);
            $("#statusPed").html(valor.descStatus);

            linha += "<tr>"
            linha += '  <td>'+valor.chItem+'</td> '
            linha += "  <td>" + valor.codigo + "</td>"
            linha += "  <td>" + valor.nometerminal + "</td>"
            linha += "  <td>" + valor.Descricao + "</td>"
            
            desconto = valor.desconto/100
            valorDoDesconto = valor.valor*desconto;

            linha += "  <td>R$" + (valorDoDesconto.toLocaleString(undefined, { minimumFractionDigits: 2 })) + "</td>"
            linha += "  <td>R$" + valor.valor.toLocaleString(undefined, { minimumFractionDigits: 2 }) + "</td>"
            
            if (valor.qtdeM2 != null) {
                var tdOnClick = "";

                if (valor.chstatus != 2) {
                  tdOnClick = "onclick='alterarM2("+valor.chItem+")'"
                } 
                else {
                  tdOnClick = "";
                }

                temProdM2 = true;
                linha += "  <td "+tdOnClick+" style='cursor:pointer;'>" + valor.qtdeM2 + " <span class='glyphicon glyphicon-edit' style='font-size:10px; color:#58D68D'></span></td>"
            } 

            linha += "</tr>"
         });

         if (temProdM2) {
            $("#thm2").show();
         }

         $("#botoesEspecificos").html(botoes);
         $("#tbody").html(linha);

  }, "JSON");

}
