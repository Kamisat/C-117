$(document).ready(function(){

    console.log('Ready')

    //  Busque a data atual e atualize-a no DOM

     var data = new Date()
     let date = "Data: " + data.toLocaleDateString("pt-BR", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })

     $(document).ready(function (){
        $("#date").html(date)
     })

     var predicted_emotion

    // Escreva um evento, quando o botão Enviar for clicado
    $('#button').click(function(){

        //  Obtenha o valor do texto da área de texto usando o método 'val()'
        let text_value = $('#text').val()

        //  Converta-o em um objeto JS.
        //  Forneça uma "chave" aqui e escreva o mesmo no arquivo app.py também para extrair dados
        let input_text = {text : text_value}
        console.log(input_text)

        //  requisição ajax
        $.ajax({

            //  tipo da requisição web
            type : 'POST',
            url: "/e",

            //  dados a serem enviados no formato JSON
            data : JSON.stringify(input_text),

            //  o tipo de resposta esperado é json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  se tudo funcionar, execute esta função
            success : function(result){

                // extraia previsão e a URL do emoticon do resultado
                predicted_emotion = result.data.predicted_emotion;
                emo_url = result.data.predicted_emotion_img_url;
                console.log(predicted_emotion)


                //  atualize os elementos DOM
                
                //  exiba-os
                $("#sentiment").html(predicted_emotion);
                $("#sentiment").css("display", "block");
        
                $("#emoji").attr("src", emo_url);
                $("#emoji").css("display", "block");

            },

            //  se houver algum erro, execute esta função
            error : function(result){

                console.log(result)
            }
        })


        //  limpando a caixa de texto após cada pressionamento de botão
        $('#text').val("")
    })
        
})