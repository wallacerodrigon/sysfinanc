/*
 * Verifica qual o browser do visitante e armazena na vari�vel p�blica clientNavigator, Caso 
 * Internet Explorer(IE) outros (Other)
 */
if (navigator.appName.indexOf('Microsoft') != -1){ 
 	clientNavigator = "IE";
} else{
 	clientNavigator = "Other";
}




/**
 * Limita o texto em uma textarea
 * @param textAreaField
 * @param limit
 */
function textoLimite(textAreaField, limit) {
	
		var ta = document.getElementById(textAreaField);
		
		if (ta.value.length >= limit) {
			ta.value = ta.value.substring(0, limit-1);
		}
}

/**
 * Coloca m�scara em um campo.
 * 
 * @param evento
 * @param mascara
 * @return
 */
function mascaraTexto(evento, mascara) {
	var campo, valor, i, tam, caracter;  

	if (document.all) {// Internet Explorer
		campo = evento.srcElement;
	} else {// Nestcape, Mozzila
		campo= evento.target;
	}

	valor = campo.value;  
	tam = valor.length;  

	for (i=0;i<mascara.length;i++) {  
		caracter = mascara.charAt(i);
		if (caracter!="9") {
			if(i<tam & caracter!=valor.charAt(i)) {  
				campo.value = valor.substring(0,i) + caracter + valor.substring(i,tam);
			}
		}
	}  
}

/*
 * Funcao que permite somente a digitacao apenas de caracteres num�ricos e
 * aplica��o da m�scara aos valores.
 * 
 * author Laurislandio da Silva Diniz
 * 
 * param evnt para o evento do teclado.
 */
function formatarValores(evnt, src) {
	var mascara = '###.###.##0,00';
	return formatar(evnt, src, mascara);
}

function moeda(z){
	v = z.value;
	
	if(z.value.length <= 4){
		
		v=v.replace(/\D/g,"");
		v=v.replace(/(\d{1})(\d{17})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{14})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{11})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{8})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{5})$/,"$1.$2");
		v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2");
		z.value = v;
		return z.value;
	}

	t = '';
	verificador = false;
	for (var i = 0; i < z.value.length; i++) { 
	    if(z.value[i] !='0' && z.value[i] !=',' && z.value[i] !='.'){
	    	t += z.value[i];
	    	verificador = true;
	    	continue;
	    }
	    if(verificador){
	    	t += z.value[i];
		}
	}
	v = t;

	v=v.replace(/\D/g,"");
	v=v.replace(/(\d{1})(\d{17})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{14})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{11})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{8})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{5})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{1,2})$/,"$1,$2");
	z.value = v;
	
	return z.value;

	
} 

function colocarMascaraCEP(z){
	v = z.value;
	v=v.replace(/\D/g,"");
	v=v.replace(/(\d{1})(\d{6})$/,"$1.$2");
	v=v.replace(/(\d{1})(\d{1,3})$/,"$1-$2");
	z.value = v;
} 

/*
 * Funcao que permite somente a digitacao apenas de caracteres num�ricos e
 * aplica��o da m�scara ao n�mero do cpf.
 * 
 * author Laurislandio da Silva Diniz
 * 
 * param evnt para o evento do teclado.
 */
function formatarCPF(evnt, src) {
	var mascara = '###.###.###-##';
	return formatar(evnt, src, mascara);
}

/*
 * Funcao que permite somente a digitacao apenas de caracteres num�ricos e
 * aplica��o da m�scara.
 * 
 * author Laurislandio da Silva Diniz
 * 
 * param evnt para o evento do teclado.
 */
function formatar(evnt, src, mascara){
	var backspace = evnt.keyCode;
	if (clientNavigator == "IE"){

 		if (evnt.keyCode < 48 || evnt.keyCode > 57){
 			return false;
 		}

 	}else{

		backspace = evnt.which;
		if(backspace!=118 && backspace!=120){
			if ( (evnt.charCode < 48 || evnt.charCode > 57) && evnt.keyCode == 0){
				return false;
			}
		}

 	}

	if (backspace != 8) {
		var i = src.value.length;
		var saida = mascara.substring(0,1);
		var texto = mascara.substring(i);
	
		if (texto.substring(0,1) != saida) {
	
			src.value += texto.substring(0,1);
	
	  	}

  	}
}

function mascaraCep(evnt, objeto){

	var backspace = evnt.keyCode;
	if (clientNavigator == "IE"){

 		if (evnt.keyCode < 48 || evnt.keyCode > 57){
 			return false;
 		}

 	}else{

		backspace = evnt.which;
 		if ((evnt.charCode < 48 || evnt.charCode > 57) && evnt.keyCode == 0){
 			return false;
 		}

 	}

	if (backspace != 8) {
		if (objeto.value.indexOf("-") == -1 && objeto.value.length > 6){ 
			objeto.value = ""; 
		}
		if (objeto.value.length == 2){
			objeto.value += ".";
		}
		if (objeto.value.length == 6){
			objeto.value += "-";
		}
	}
}

function mascaraTelefone(evnt, objeto){

	var backspace = evnt.keyCode;

	if (clientNavigator == "IE"){

 		if (evnt.keyCode < 48 || evnt.keyCode > 57){
 			return false;
 		}

 	}else{

		backspace = evnt.which;
 		if ((evnt.charCode < 48 || evnt.charCode > 57) && evnt.keyCode == 0){
 			return false;
 		}

 	}
 	if (backspace != 8) {
		if (objeto.value.indexOf("-") == -1 && objeto.value.length > 4){ 
			objeto.value = ""; 
		}
		if (objeto.value.length == 4){
			objeto.value +="-";
		}
	}
}

function Ajusta_Data(input, evnt){
	//backspace, delete ou tab
	if (evnt.keyCode == 8 || evnt.keyCode == 46 || evnt.keyCode == 9) {
		return Bloqueia_Caracteres(evnt);	
	} else if (input.value.length == 2 || input.value.length == 5){
		input.value += "/";
 	}
 	return false;
}

function Ajusta_Data_Base(input, evnt){
	// delete ou o tab
	if (evnt.keyCode == 8 || evnt.keyCode == 46 || evnt.keyCode == 9) {
		return Bloqueia_Caracteres(evnt);	
	} else 	if (input.value.length == 2 ){
		input.value += "/";
	}
	return false;
}

function Ajusta_Hora(input, evnt){
	if (input.value.length == 2 || input.value.length == 5){
 		if(clientNavigator == "IE"){
 			input.value += ":";
 		} else {
 			if(evnt.keyCode == 0){
 				input.value += ":";
 			}
 		}
 	}
	// s� valida quando for menor do que 10 ou n�o for digitado o backspace ou o
	// delete ou o tab
	if (input.value.length < 8 || evnt.keyCode == 8 || evnt.keyCode == 46 || evnt.keyCode == 9) {
		return Bloqueia_Caracteres(evnt);	
	}
 	return false;
}

function Bloqueia_Caracteres(evnt){
 	if (clientNavigator == "IE"){
 		if (evnt.keyCode < 48 || evnt.keyCode > 57){
 			return false;
 		}
 	}else{
 		if ((evnt.charCode < 48 || evnt.charCode > 57) && evnt.keyCode == 0){
 			return false;
 		}
 	}
 	return true;
 }

function FormataCpf(valor){
	 v = valor.value;
	   //Remove tudo o que n�o � d�gito
	   v=v.replace(/\D/g,"");


	       //Coloca um ponto entre o terceiro e o quarto d�gitos
	       v=v.replace(/(\d{3})(\d)/,"$1.$2");

	       //Coloca um ponto entre o terceiro e o quarto d�gitos
	       //de novo (para o segundo bloco de n�meros)
	       v=v.replace(/(\d{3})(\d)/,"$1.$2");

	       //Coloca um h�fen entre o terceiro e o quarto d�gitos
	       v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");


	   valor.value = v;
}

function FormataCpfChangeFocus(valor,focus){
	  	
		v = valor.value;
	   //Remove tudo o que n�o � d�gito
	   v=v.replace(/\D/g,"");

	       //Coloca um ponto entre o terceiro e o quarto d�gitos
	       v=v.replace(/(\d{3})(\d)/,"$1.$2");

	       //Coloca um ponto entre o terceiro e o quarto d�gitos
	       //de novo (para o segundo bloco de n�meros)
	       v=v.replace(/(\d{3})(\d)/,"$1.$2");

	       //Coloca um h�fen entre o terceiro e o quarto d�gitos
	       v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
	       if(valor.value.length >=14){
	    	   document.getElementById(focus).focus();
	       }
	   valor.value = v;
}

function changeFocusPassword(valor,focus){

	 if(valor.value.length >=15){
  	   document.getElementById(focus).focus();
     }
}



/*
 * function submitOnEnter(evt){ if( evt.keyCode == 13 ){ var inputs =
 * document.getElementsByTagName('input'); var submit; for(var i=0;i<inputs.length;i++){
 * if( inputs[i].id.indexOf('submit') > -1 ){ submit = inputs[i];
 * submit.click(); break; } } } else return true; }
 */
// function chamarPopUP(_url){
// chamarPopUP(_url,"popUp","width=600, height=400" );
// }
//
// function chamarPopUP(_url, _name, _padrao) {
// window.open(_url,_name,_padrao);
// }


function limpar() {
	var inputs = document.getElementsByTagName('input');
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].type != null && inputs[i].type == 'text') {
			inputs[i].value = '';
		}
	}
}

function imprimir(){
	window.print();
}

/**
 * 
 * @param event
 * @return 
 */
function somenteNumero(evnt,src){
	var backspace = evnt.keyCode;
	if (clientNavigator == "IE"){
 		if (evnt.keyCode < 48 || evnt.keyCode > 57){
 			return false;
 		}
 	}else{
		backspace = evnt.which;
 		if ((evnt.charCode < 48 || evnt.charCode > 57) && evnt.keyCode == 0){
 			return false;
 		}
 	}
	var v = src.value;
	v=v.replace(/\D/g,"");
	src.value = v;
}






if(document.all){ //ie has to block in the key down
    document.onkeydown = rejeitaTecla;
}else if (document.layers || document.getElementById){ //NS and mozilla have to block in the key press
	document.onkeypress = rejeitaTecla;
}





function rejeitaTecla(evt){   



	
	
    var oEvent = (window.event) ? window.event : evt;
  
    //no mozilla captura tecla pressionada
    var nKeyCode =  oEvent.keyCode ? oEvent.keyCode : oEvent.which ? oEvent.which : void 0;
   
    var bIsFunctionKey = false;

    //para verificar se uma tacla � verdadeiramente uma tecla de fun��o
    if(oEvent.charCode == null || oEvent.charCode == 0){
        bIsFunctionKey = (nKeyCode == 116);
    }
  
    //converter a chave para um char
    var sChar = String.fromCharCode(nKeyCode).toUpperCase();

    //obter o tag ativa que tem o foco na p�gina
    var oTarget = (oEvent.target) ? oEvent.target : oEvent.srcElement;
    var sTag = oTarget.tagName.toLowerCase();
    var sTagType = oTarget.getAttribute("type");
  
    var bShiftPressed = (oEvent.shiftKey) ? oEvent.shiftKey : oEvent.modifiers & 4 > 0;
    var bCtrlPressed = (oEvent.ctrlKey) ? oEvent.ctrlKey : oEvent.modifiers & 2 > 0;

    var bRet = true;

    if(sTagType != null){sTagType = sTagType.toLowerCase();}

    //permitir que essas chaves dentro de uma caixa de texto
    if (!(bCtrlPressed && (sChar == 'R')) && !bIsFunctionKey && (sTag == "textarea" || sTag == "select" || sTag == "option" ||(sTag == "input" && (sTagType == "text" || sTagType == "password")))){
    	return true;
    } else if(bCtrlPressed && (sChar == 'A' || sChar == 'C' || sChar == 'V' || sChar == 'X')){ // ALLOW cut, copy and paste, and SELECT ALL
        bRet = true;
    }else if(nKeyCode==9){
        bRet = true;
    }else if(bIsFunctionKey){
        bRet = false;
    }else if (bCtrlPressed && (sChar == 'R')){
    	bRet = false;
    }
    if(!bRet){
        try{
            oEvent.returnValue = false;
            oEvent.cancelBubble = true;

            if(document.all){ //IE
                oEvent.keyCode = 0;
            }else{ //NS
                oEvent.preventDefault();
                oEvent.stopPropagation();
            }

        }catch(ex){
        }
        //alert(bRet);
    }
   
    return bRet;

} 


/**/
function selectOne(form, button)
{
    turnOffRadioForForm(form);
    button.checked = true;

}
function turnOffRadioForForm(form){
    for(i=0; i<form.elements.length; i++){
        if(form.elements[i].type=='radio')
        {
            form.elements[i].checked = false;
        }
    }

} 


function focusField(){
	var namePopErro;
	var namePopSucess;
	
	namePopErro = 'frmCabecalho:modalPnlPop';
	namePopSucess = 'frmCabecalho:modalPnlPopSucesso';
	
	if(document.getElementById(namePopErro) != null){
		document.getElementById('frmCabecalho:btnClosePopError').focus();
	}
}

function apenasNumeros(campo){  
    campo.value = campo.value.replace(/\D/g,""); 
}  

function limiteTexto(campo, limiteCaracteres) {
	if (campo.value.length > limiteCaracteres) {
		campo.value = campo.value.substring(0, limiteCaracteres);
	} 
}



/**
 * Marca os checkBox da pagina
 * @param idCheckBox
 */
function marcarTodasDaPagina(nomeelemento){
	var resultados = document.getElementById(nomeelemento); 
	var chk = resultados.getElementsByTagName('input');
	var len = chk.length;
	for (var i=0;i<len;i++) {
		if(chk[i].type == "checkbox" && chk[i].disabled == false) {
	      chk[i].checked=true;
	      marcarEstiloLinhaProcesso();
	    }
	}
}

/**
 * DesMarca os checkBox da pagina
 * @param idCheckBox
 */
function desmarcarTodasDaPagina(nomeelemento){
	var resultados = document.getElementById(nomeelemento); 
	var chk = resultados.getElementsByTagName('input');
	var len = chk.length;
	for (var i=0;i<len;i++) {
		if(chk[i].type == "checkbox" && chk[i].disabled == false) {
	      chk[i].checked=false;
	      marcarEstiloLinhaProcesso();
	    }
	}
}  


/**
 * Marca os checkBox da pagina
 * @param idCheckBox
 */
function marcarTodasJS(nomeelemento){
	var resultados = document.getElementById(nomeelemento); 
	var chk = resultados.getElementsByTagName('input');
	var len = chk.length;
	for (var i=0;i<len;i++) {
		if(chk[i].type == "checkbox" && chk[i].disabled == false) {
	      chk[i].checked=true;
	    }
	}
}

/**
 * DesMarca os checkBox da pagina
 * @param idCheckBox
 */
function desmarcarTodasJS(nomeelemento){
	var resultados = document.getElementById(nomeelemento); 
	var chk = resultados.getElementsByTagName('input');
	var len = chk.length;
	for (var i=0;i<len;i++) {
		if(chk[i].type == "checkbox" && chk[i].disabled == false) {
	      chk[i].checked=false;
	    }
	}
}  


/**
 * Altera o estilo da linha a partir do clique de qualquer lugar da linha
 * @param idCheckBox
 */
function marcarEstiloLinhaProcesso(){
	var form = document.forms['formGerenciarProcessoDigital'];
	var elementos = form.elements;
	for (var x=0;x<elementos.length;x++) {
        if (elementos[x].type.toLowerCase()=='checkbox') {
        	if(elementos[x].checked){
        		//inclui cor da linha amarela
        		document.getElementById(elementos[x].id).parentNode.parentNode.parentNode.style.backgroundColor = '#EDF0A2'; //C9E1DE
        	}else{
        		//retira a classe (row-clicked) em caso de retorno da tela anterior.
        		var elementosLinha = document.getElementById(elementos[x].id).parentNode.parentNode.parentNode.childNodes;
        		for (var xx=0;xx<elementosLinha.length;xx++) { 
        	        if (elementosLinha.item(xx).nodeName.toLowerCase()=='td') {
        	        	var atributosColuna = elementosLinha.item(xx).attributes;
        	        	for ( var zz = 0; zz < atributosColuna.length; zz++) {
							if(atributosColuna.item(zz).nodeName.toLowerCase()=='class'){
								atributosColuna.item(zz).nodeValue = atributosColuna.item(zz).nodeValue.replace('row-clicked', '');
							}
						}
        	        }
        		}
        		//retira a cor da linha amarela
        		document.getElementById(elementos[x].id).parentNode.parentNode.parentNode.style.backgroundColor = ''; //EDF0A2
        	}
        }
	}
	
}

function formatarCpfCnpj(valor){

	
	 v = valor.value;
   //Remove tudo o que n�o � d�gito
   v=v.replace(/\D/g,"");

   if(14 > v.length){ //CPF

       //Coloca um ponto entre o terceiro e o quarto d�gitos
       v=v.replace(/(\d{3})(\d)/,"$1.$2");

       //Coloca um ponto entre o terceiro e o quarto d�gitos
       //de novo (para o segundo bloco de n�meros)
       v=v.replace(/(\d{3})(\d)/,"$1.$2");

       //Coloca um h�fen entre o terceiro e o quarto d�gitos
       v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");

   } else { //CNPJ

       //Coloca ponto entre o segundo e o terceiro d�gitos
       v=v.replace(/^(\d{2})(\d)/,"$1.$2");

       //Coloca ponto entre o quinto e o sexto d�gitos
       v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");

       //Coloca uma barra entre o oitavo e o nono d�gitos
       v=v.replace(/\.(\d{3})(\d)/,".$1/$2");

       //Coloca um h�fen depois do bloco de quatro d�gitos
       v=v.replace(/(\d{4})(\d)/,"$1-$2");

   }

   valor.value = v;

}

function numero(valor){
	
	 v = valor.value;
	 //Remove tudo o que n�o � d�gito
	 v=v.replace(/\D/g,"");
	 valor.value = v;
}


function redirecionarFocoEmElemento(idDestino){
	if (idDestino != null){
		document.getElementById(idDestino).focus();
	}
}

function descerBarraRolagem(){
	window.scroll(0,document.body.offsetHeight);
}

function mascararTelefone(valor, mask){
	v = valor.value;
	v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1)$2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    valor.value = v;
}

function mascararCelularComNove(valor, mask){
	v = valor.value;
	v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1)$2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    valor.value = v;
}


        /*Menu-toggle*/
        function toggleMenu(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("active");
            /*if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
    
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
            }*/
    
        }
    
        /*Scroll Spy*/
        $('body').scrollspy({ target: '#spy', offset:80});
    
        /*Smooth link animation*/
       /* $('#menu-toggle').click(function() {
        });*/
