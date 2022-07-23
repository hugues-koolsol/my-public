"use strict";
var trad={};
//========================================================================================================
function dogid(n){return document.getElementById(n);}
//========================================================================================================
var _listeners = [];
//========================================================================================================
EventTarget.prototype.addEventListenerBase = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, listener, typeElement){
  if(typeElement===false || typeElement=== undefined){
   console.warn('%cbug dans addEventListener ','background:yellow;color:red;', 'listener=' , listener , 'typeElement=',typeElement)
  }
  _listeners.push({target: this , parentElt1:this.parent, type: type, listener: listener , typeElement:typeElement});
  this.addEventListenerBase(type, listener , false);
};
//========================================================================================================
function removeListeners(){
 for(var index = _listeners.length-1; index>=0;index--){
  var item = _listeners[index];
  item.target.removeEventListener(item.type, item.listener);
  _listeners.splice(index,1);
 }  
}
//========================================================================================================
var colorPickerData={
 value:null,
 id:null,
 context:null,
 opac:1,
 numArbre:null,
}
//========================================================================================================
function myObj1(initObj1){
 "use strict";
 var global_variable_name=initObj1.varname;
 
 var body = document.getElementsByTagName('body')[0];
 var xscreen=0;
 var yscreen=0;
 var globalScrollWidth1=0;// à priori 0 mais sur firefox, on a un min à 5
 var _dssvg={ // draw status svg
  arbre0               : [],
  historique1          : [],
  mode_en_cours        : 'setModeSaisieDeplace1',
  zoom1                : 1,
  viewBoxInit          : null,
  aimanterPixel1       : 1,
  idArbreCourant       : null,
  idArbrPreceden       : null,
  parametres           : {
   scroll_size          : 0,
   rayonReference       : 16,
   hauteurMinBtnMenuGau : 24,
   largeurMinBtnMenuHau : 24,
   optimisationChemin   : 2,
   largeurMenuGauche    : 30,
   hauteurMenuHaut      : 30,
   taillePolice         : 16,
   intervalleEntreBtns  : 5,
   deplacerLesPoignees  : 0,
   diviseurDeplacement  : 1,
   facteurAimnt         : 1,
   lang                 : 'fr',
  },
  strokeColor1          : 'rgb(0, 0, 0)',  
  strokeWidth1          : 1 ,  
  strokCols             : ['black','red','blue','green'],//['rgba(0,0,0,1)','rgba(255,0,0,1)','rgba(0,0,255,1)','rgba(0,255,0,1)'], // black red blue green yellow magenta
    filCols             : ['rgba(0,0,0,1)','rgba(255,0,0,1)','rgba(0,0,255,1)','rgba(0,255,0,1)'],
  
 };
 var lang='fr';
 
 var refZnDessin=null;
 var globalDernierePositionSouris={sx:null,sy:null};

 var divtpe=null;
 var divlft=null;
 var wi_of_the_brds1=1;
 var he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
 var wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
 var margns={t:0,l:0,b:30,r:10};
 var divc1=null;
 var decal={t:20,l:10};
 var wi_of_the_brds2=1;
 var xmlns='http://www.w3.org/2000/svg';
 var wi_of_the_brds3=1;
 var decalageX=0;
 var decalageY=0;
 var ecran_appuye=false;
 var divlag1=null;
 var divlag2=null;
 var pointsTraces=[];
 var tempchild=null;
 var initPosxy=null;
 
 var popupBackground1=null;
 var popupContent1=null;
 var popUpIsDisplayed1='';
 var etatPoigneesVoisines1=false; // poigneesVoisines1

 var oMyTree1=null;
 
 var rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
 
 var globalIndiceArbre=null;
 var globalIndicePoint=null;
 var globalGeneralReferencePointControleClique=null;
 var initMouseDownObj=null;
 var initClick=null;
 var globalGeneralSvgReferenceElement=null;
 
 var strkWiTexteSousPoignees=rayonPoint/20; // _dssvg.parametres.rayonReference/_dssvg.zoom1;
 var fontSiTexteSousPoignees=rayonPoint;


 
 var bckVert1='linear-gradient(rgb(121, 247, 131) 0%, rgb(190, 255, 219) 100%)';
 var bckVert2='linear-gradient(rgb(190, 255, 219) 0%, rgb(121, 247, 131) 100%)';
 var bckBleu ='linear-gradient(to bottom,#beedff 0%, #7eddff 100%);';
 var bckRouge='linear-gradient(red 0%, #db0000 100%)';
 var bckJaune='linear-gradient(gold 0%, #e3bf00 100%)';
 var bckRose='linear-gradient(rgb(233 192 215) 0%, rgb(255 213 236) 100%)';
 var marginPopup=20;
 var kellyColor1=null;
 var svgEtoile='<svg class="svgBoutonGauche1" viewBox="2 0  57 56"><polygon points="  30 9   35 23 50 23 40 33 45 48 30 38 15 48 20 33 10 23 25 23" fill="transparent" stroke-width="5" style="stroke:blue;fill:transparent;stroke-width:5;stroke-opacity:1;fill-opacity:1;"></polygon></svg>';
 
 
 //========================================================================================================
 var strokeData={
  value:null,
  context:null,
  numArbre:null,
 }
 
 var groupeActif={
  refGroupe:null,
  idDansArbre:null,
  matrice:null,
  transform:null,
 };
 
 //========================================================================================================
 //========================================================================================================
 function popupSpecial1(e){
  var contentOfPopup='<h3>'+trad['Opérations_spéciales']+'</h3>';
  contentOfPopup+='<div id="choisirUnGroupeActif">';
  contentOfPopup+='<br /><button id="simplifierTousLesChemins1" class="butEnabled butMenuHaut" value="0">'+trad['arrondir_tous_les_chemins']+'</button>'
  contentOfPopup+='<br /><button id="tousCheminsEnAbsolu1" class="butEnabled butMenuHaut" value="0">'+trad['tous_les_chemins_en_absolu']+'</button>'
  contentOfPopup+='<br /><button id="decomposerLesMdesChemins1" class="butEnabled butMenuHaut" value="0">'+trad['decomposer_les_M_des_chemins']+'</button>'
  popupValue.innerHTML=contentOfPopup;
  document.getElementById('simplifierTousLesChemins1').addEventListener('click',simplifierTousLesChemins1,'button');
  document.getElementById('tousCheminsEnAbsolu1').addEventListener('click',tousCheminsEnAbsolu1,'button');
  document.getElementById('decomposerLesMdesChemins1').addEventListener('click',decomposerLesMdesChemins1,'button');
  showPopUp('popupSpecial1');  
 }
 //========================================================================================================
 function selectionneGroupeActif(e){
//  console.log('e=',e, e.target.value );
  groupeActif.matrice     = null;
  groupeActif.transform   = null;
  if(e.target.value==='0'){
   groupeActif.idDansArbre = 0;
   groupeActif.refGroupe   = refZnDessin;
  }else{
   groupeActif.idDansArbre=parseInt(e.target.value,10);
   groupeActif.refGroupe=document.querySelectorAll('[data-idarbre1="'+groupeActif.idDansArbre+'"]')[0];
  }
  closePopup();
  majBout();
 }
 //========================================================================================================
 function popGroupeActif1(e){
  var contentOfPopup='<h3>'+trad['selectionner_le_groupe_en_cours']+'</h3>';

  contentOfPopup+='<style>'
  contentOfPopup+='#choisirUnGroupeActif button{margin:3px;min-width:50px;}'
  contentOfPopup+='</style>'


  contentOfPopup+='<div id="choisirUnGroupeActif">';
  contentOfPopup+='<br /><button class="butEnabled butMenuHaut" value="0">racine</button>'
  
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].data.nodeName=='g'){
    contentOfPopup+='<br /><button class="butEnabled butMenuHaut" value="'+_dssvg.arbre0[i].id+'">'+_dssvg.arbre0[i].id+'</button>'
   }
  }
  contentOfPopup+='</div>';
  

  popupValue.innerHTML=contentOfPopup;
  var lst=document.getElementById('choisirUnGroupeActif').getElementsByTagName('button');
  for(var i=0;i<lst.length;i++){
   lst[i].addEventListener('click',selectionneGroupeActif,'button');
  }

  

  showPopUp('popGroupeActif1');  
  
  
  
 }
 
 
 
 
 //========================================================================================================
 function touchDownParPourcentageArrondi(e){
  e.stopPropagation();
  actionDownParPourcentageArrondi(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParPourcentageArrondi(e){
  e.stopPropagation();
  actionDownParPourcentageArrondi();
 }
 //========================================================================================================
 function actionDownParPourcentageArrondi(e){
  dogid('parPourcentageArrondi').addEventListener('touchmove' , changePourcentageArrondi , 'range');
  dogid('parPourcentageArrondi').addEventListener('mousemove' , changePourcentageArrondi , 'range');
  dogid('parPourcentageArrondi').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parPourcentageArrondi').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changePourcentageArrondi(e){
  e.stopPropagation();
  dogid('parPourcentageArrondiValeur').innerHTML=dogid('parPourcentageArrondi').value;
 }
 
 
 
 //========================================================================================================
 function touchDownParNombreDeBranches(e){
  e.stopPropagation();
  actionDownParNombreDeBranches(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParNombreDeBranches(e){
  e.stopPropagation();
  actionDownParNombreDeBranches();
 }
 //========================================================================================================
 function actionDownParNombreDeBranches(e){
  dogid('parNombreDeBranches').addEventListener('touchmove' , changeNombreDeBranches , 'range');
  dogid('parNombreDeBranches').addEventListener('mousemove' , changeNombreDeBranches , 'range');
  dogid('parNombreDeBranches').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parNombreDeBranches').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeNombreDeBranches(e){
  e.stopPropagation();
  dogid('parNombreDeBranchesValeur').innerHTML=dogid('parNombreDeBranches').value;
 }
 

 //========================================================================================================
 function touchDownParAngleInitial(e){
  e.stopPropagation();
  actionDownParAngleInitial(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParAngleInitial(e){
  e.stopPropagation();
  actionDownParAngleInitial();
 }
 //========================================================================================================
 function actionDownParAngleInitial(e){
  dogid('parAngleInitial').addEventListener('touchmove' , changeAngleInitial , 'range');
  dogid('parAngleInitial').addEventListener('mousemove' , changeAngleInitial , 'range');
  dogid('parAngleInitial').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parAngleInitial').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeAngleInitial(e){
  e.stopPropagation();
  dogid('parAngleInitialValeur').innerHTML=dogid('parAngleInitial').value;
 }
 

 //========================================================================================================
 function calculerEtAjouterEtoile(){
  var nbbr=parseInt(document.getElementById('parNombreDeBranchesValeur').innerHTML,10);
  var perc=parseInt(document.getElementById('parPourcentageArrondiValeur').innerHTML,10);
  var angInit=-parseInt(document.getElementById('parAngleInitialValeur').innerHTML,10);
  var tailleOriginale=100;
  var taille=tailleOriginale;
  
  var delta=360/nbbr/2;
  var tt='';
  for(var i=angInit,j=0;i<360+angInit;i+=delta,j++){
   if(j%2!==0){
    taille=tailleOriginale*perc/100;
   }else{
    taille=tailleOriginale;
   }
   var x=taille*Math.cos(i*Math.PI/180);
   var y=taille*Math.sin(i*Math.PI/180);
   tt+=' '+arrdi10000(x)+' '+arrdi10000(y)+' ';
  }
  var x=tailleOriginale*Math.cos(angInit*Math.PI/180);
  var y=tailleOriginale*Math.sin(angInit*Math.PI/180);
  tt+=' '+arrdi10000(x)+' '+arrdi10000(y)+' ';
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polygon');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'points'             , tt );
  globalClickDessin.tempchild.setAttribute( 'style' , 'stroke-width:1;stroke:'+(_dssvg.strokeColor1)+';fill:transparent;');
  refZnDessin.appendChild(globalClickDessin.tempchild);
  ajouteEntreeArbre('polygon',null);
  afficheArbre0({prendreTout:false});
  closePopup();
  
  
 }
 
 
 //========================================================================================================
 function insererUneEtoile(){
  closePopup();
  
  var contentOfPopup='<h3>'+trad['insérer_une_étoile']+'</h3>';
  
  contentOfPopup+='<div >';
  contentOfPopup+='<label for="parNombreDeBranches">'+trad['nombre_de_branches']+' : </label>';
  contentOfPopup+='<div id="parNombreDeBranchesValeur" style="display:inline-block;min-width:2rem;">8</div>';
  contentOfPopup+='<input id="parNombreDeBranches" type="range" min="3" max="30" step="1" value="8" />';
  contentOfPopup+='</div>';
  

  contentOfPopup+='<div >';
  contentOfPopup+='<label for="parPourcentageArrondi">'+trad['pourcentage_arrondi']+' : </label>';
  contentOfPopup+='<div id="parPourcentageArrondiValeur" style="display:inline-block;min-width:2rem;">30</div>';
  contentOfPopup+='<input id="parPourcentageArrondi" type="range" min="0" max="100" step="1" value="30" />';
  contentOfPopup+='</div>';
  

  contentOfPopup+='<div >';
  contentOfPopup+='<label for="parAngleInitial">'+trad['angle_initial']+' : </label>';
  contentOfPopup+='<div id="parAngleInitialValeur" style="display:inline-block;min-width:2rem;">0</div>';
  contentOfPopup+='<input id="parAngleInitial" type="range" min="0" max="90" step="1" value="0" />';
  contentOfPopup+='</div>';
  

  contentOfPopup+='<div >';
  contentOfPopup+='<button id="calculerEtAjouterEtoile" class="butEnabled butMenuHaut">'+trad['insérer']+'</button>';
  contentOfPopup+='</div>';
  

  popupValue.innerHTML=contentOfPopup;

  
  ajouteListenersEtoile();
  showPopUp('insererUneEtoile');  
  
  
//  dogid('parNombreDeBranches').addEventListener('change'         , setParNombreDeBranches          , 'range' );
  
  
  
/*  
  // <text data-idarbre1="4" x="2.6556" y="2.1126" stroke="black" stroke-width="0.02" fill="transparent" font-family="Verdana" font-size="0.5">?</text> 
*/  
 }
 //========================================================================================================
 function ajouteListenersEtoile(){
  dogid('parNombreDeBranches').addEventListener('mousedown'      , mouseDownParNombreDeBranches    , 'range' );
  dogid('parNombreDeBranches').addEventListener('touchstart'     , touchDownParNombreDeBranches    , 'range' );

  dogid('parPourcentageArrondi').addEventListener('mousedown'      , mouseDownParPourcentageArrondi    , 'range' );
  dogid('parPourcentageArrondi').addEventListener('touchstart'     , touchDownParPourcentageArrondi    , 'range' );

  dogid('parAngleInitial').addEventListener('mousedown'      , mouseDownParAngleInitial    , 'range' );
  dogid('parAngleInitial').addEventListener('touchstart'     , touchDownParAngleInitial    , 'range' );

  dogid('calculerEtAjouterEtoile').addEventListener('click'      , calculerEtAjouterEtoile    , 'range' );
 }
 //========================================================================================================
 function insererUnFiltre(){
  //
  var NouveauContenu='';
  NouveauContenu+='<defs>';
  NouveauContenu+=' <filter id="__filtered-3" height="220%">';
  NouveauContenu+='  <feFlood flood-color="#551C0B" result="COLOR-outline" />';
  NouveauContenu+='  <feMorphology operator="dilate" radius="0.3" in="SourceAlpha" result="OUTLINE_10" />';
  NouveauContenu+='  <feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20" />';
  NouveauContenu+='  <feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10" />';
  NouveauContenu+='  <feSpecularLighting surfaceScale="5" specularConstant="0.5" specularExponent="7.5" lighting-color="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20">';
  NouveauContenu+='   <fePointLight x="750" y="-50" z="300" />';
  NouveauContenu+='  </feSpecularLighting>';
  NouveauContenu+='  <feComposite in2="SourceAlpha" operator="in" in="LIGHTING-EFFECTS_20" result="LIGHTING-EFFECTS_30" />';
  NouveauContenu+='  <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="LIGHTING-EFFECTS_30" result="LIGHTING-EFFECTS_40" />';
  NouveauContenu+='  <feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10">';
  NouveauContenu+='   <feFuncR type="gamma" offset="-1.3" amplitude="10" exponent="4.84" />';
  NouveauContenu+='   <feFuncB type="gamma" offset="-1.3" amplitude="10.1" exponent="40.84" />';
  NouveauContenu+='  </feComponentTransfer>';
  NouveauContenu+='  <feMerge>';
  NouveauContenu+='   <feMergeNode in="OUTLINE_20" />';
  NouveauContenu+='   <feMergeNode in="COLOR-EFFECTS_10" />';
  NouveauContenu+='  </feMergeNode>';
  NouveauContenu+='  </feMerge>';
  NouveauContenu+=' </filter>';
  NouveauContenu+='</defs>';
  var ancienContenu=refZnDessin.innerHTML;
  NouveauContenu=ancienContenu+NouveauContenu;
  refZnDessin.innerHTML=NouveauContenu;
  finirImport();
 } 
 //========================================================================================================
 function insererUnPatern(){
  // <text data-idarbre1="4" x="2.6556" y="2.1126" stroke="black" stroke-width="0.02" fill="transparent" font-family="Verdana" font-size="0.5">?</text> 
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'defs');
  refZnDessin.appendChild(globalClickDessin.tempchild);
  var parentId=ajouteEntreeArbre('defs',null);
  
  var defs=globalClickDessin.tempchild;
  
  
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'pattern');
  globalClickDessin.tempchild.setAttribute('id',(parentId+1));
  globalClickDessin.tempchild.setAttribute('viewBox','0 0 10 10');
  globalClickDessin.tempchild.setAttribute('width','10%');
  globalClickDessin.tempchild.setAttribute('height','10%');
  defs.appendChild(globalClickDessin.tempchild);
  var parentId=ajouteEntreeArbre('pattern',parentId);

  var pattern=globalClickDessin.tempchild;

  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polygon');
  globalClickDessin.tempchild.setAttribute('points','0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2');
  pattern.appendChild(globalClickDessin.tempchild);
  var parentId=ajouteEntreeArbre('polygon',parentId);
  
  afficheArbre0({prendreTout:false});
  closePopup();
 }
 //========================================================================================================
 function insererUneFleche(){
  // <text data-idarbre1="4" x="2.6556" y="2.1126" stroke="black" stroke-width="0.02" fill="transparent" font-family="Verdana" font-size="0.5">?</text> 
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polygon');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'points'             , '14 1 20 8  14 15   14 11 0 11 0 5 14 5' );
  globalClickDessin.tempchild.setAttribute( 'style' , 'stroke-width:1;stroke:blue;fill:transparent;');
  refZnDessin.appendChild(globalClickDessin.tempchild);
  ajouteEntreeArbre('polygon',null);
  afficheArbre0({prendreTout:false});
  closePopup();
  
 }
 //========================================================================================================
 var BtnsForme=[
  {id:'setModeSaisieRectangle1'   , position:'menuGauche' , contenu:'+Re'  , libelle:'rectangle'                                  , action:setModeSaisieRectangle1     , svg:'<svg class="svgBoutonGauche1" viewBox="-4.5 -4.5  63 63"><rect x="-0.5" y="-0.5" width="50" height="50" stroke="blue" stroke-width="5" fill="transparent"></rect></svg>'},
  {id:'setModeSaisieCercle1'      , position:'menuGauche' , contenu:'+Ce'  , libelle:'cercle'                                     , action:setModeSaisieCercle1        , svg:'<svg class="svgBoutonGauche1" viewBox="-4 -4  62 62"><circle cx="25" cy="25" r="25" stroke="blue" stroke-width="5" fill="transparent"></circle></svg>'},
  {id:'setModeSaisieEllipse1'     , position:'menuGauche' , contenu:'+El'  , libelle:'ellipse'                                    , action:setModeSaisieEllipse1       , svg:'<svg class="svgBoutonGauche1" viewBox="-29 -19  61 43"><ellipse cx="0" cy="0" rx="25" ry="16" stroke="blue" stroke-width="5" fill="transparent"></ellipse></svg>'},  
  
  {id:'setModeSaisieLigne1'       , position:'menuGauche' , contenu:'+Li'  , libelle:'ligne en chemin'                            , action:setModeSaisieLigne1         , svg:'<svg class="svgBoutonGauche1" viewBox="-31 -20.125  51 45.25"><path stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent" d="M -29,-18 L 18,20"></path><text x="-29" y="15" stroke="rgba(255, 0,0,0.8)" fill="yellow" font-family="Verdana" fill-opacity="0.5" style="font-size:34px;stroke-width:2;stroke:rgba(255, 0,0,0.8);fill:yellow;stroke-opacity:1;fill-opacity:0.5;">Ch</text></svg>'},
  {id:'setModeSaisieLigne2'       , position:'menuGauche' , contenu:'+Ll'  , libelle:'ligne en ligne'                             , action:setModeSaisieLigne2         , svg:'<svg class="svgBoutonGauche1" viewBox="-31 -29.25  52 62.125"><path stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent" d="M -29,-18 L 18,20"></path><text x="-26" y="18" stroke="rgba(255, 0,0,0.8)" fill="yellow" font-family="Verdana" style="font-size:47px;stroke-width:3;stroke:rgba(255, 0,0,0.8);fill:yellow;stroke-opacity:1;fill-opacity:0.5;" fill-opacity="0.5">Li</text></svg>'},
  
  {id:'setModeSaisiePolyline1'    , position:'menuGauche' , contenu:'+Pl'  , libelle:'polyligne'                                  , action:setModeSaisiePolyline1      , svg:'<svg class="svgBoutonGauche1" viewBox="-27 -18  53 46"><polyline points=" -13 -15 -23 5 1 22 21 9  15 -10  " stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent"></polyline></svg>'},
  {id:'setModeSaisiePolygon1'     , position:'menuGauche' , contenu:'+Pg'  , libelle:'polygone'                                   , action:setModeSaisiePolygon1       , svg:'<svg class="svgBoutonGauche1" viewBox="-27 -19  51 43"><polygon points="  -13,-15  -23 4 0 20 20 8 15 -10 15 -10 " stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent"></polygon></svg>'},
  
  {id:'ajouteText1'               , position:'menuGauche' , contenu:'+Te'  , libelle:'texte'                                      , action:ajouteText1                 , svg:'<svg class="svgBoutonGauche1" viewBox="0 1  24.7734375 21"><text x="1" y="17" stroke-width="0.64" fill="transparent" font-family="Verdana" font-size="16" style="stroke:blue;fill:transparent;stroke-width:0.64;stroke-opacity:1;fill-opacity:1;font-size:16;">txt</text></svg>'},
//  {id:'ajouteImage1'              , position:'menuGauche' , contenu:'+im'  , libelle:'image'                                      , action:ajouteImage1                , svg:'<svg class="svgBoutonGauche1" viewBox="67 71  213 213"><image x="73.9" y="73.9" xlink:href="./kermit.jpg"></image></svg>'},
  {id:'ajouteImage1'              , position:'menuGauche' , contenu:'+im'  , libelle:'image'                                      , action:ajouteImage1                , svg:'<svg class="svgBoutonGauche1" viewBox="4 15.4719  68 74.5281"><g transform=""><path d=" M 38 19 C 42 19 62 25 62 43 C 62 54 51 67 38 67 C 27 67 14 56 14 44 C 14 25 34 19 38 19 " stroke="rgb(0, 0, 0)" stroke-width="1" style="stroke:rgb(0, 0, 0);fill:greenyellow;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;" transform="   "></path><g><path stroke="rgb(0, 0, 0)" stroke-width="1" d=" M 23 30 C 24 30 29 28 31 26 C 33 24 34 22 34 21 C 34 20 33 19 31 18 C 29 17 27 17 25 18 C 23 19 21 22 21 24 C 21 26 22 29 23 30  z" style="stroke:rgb(0, 0, 0);fill:white;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linecap="round" d=" M 31 21 C 29 21 27 23 26 24  C 26 24 25 26 25 26"></path><circle cx="27" cy="23" r="1.75" stroke="rgb(0, 0, 0)" style="stroke:rgb(0, 0, 0);fill:black;stroke-width:0.5;stroke-opacity:1;fill-opacity:1;font-size:18;"></circle></g><g transform="translate(62 -10 ) rotate(71 0 0 ) "><path stroke="rgb(0, 0, 0)" stroke-width="1" d=" M 23 30 C 24 30 29 28 31 26 C 33 24 34 22 34 21 C 34 20 33 19 31 18 C 29 17 27 17 25 18 C 23 19 21 22 21 24 C 21 26 22 29 23 30  z" style="stroke:rgb(0, 0, 0);fill:white;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linecap="round" d=" M 31 21 C 29 21 27 23 26 24  C 26 24 25 26 25 26"></path><circle cx="27" cy="23" r="1.75" stroke="rgb(0, 0, 0)" style="stroke:rgb(0, 0, 0);fill:black;stroke-width:0.5;stroke-opacity:1;fill-opacity:1;font-size:18;"></circle></g><path stroke="rgb(0, 0, 0)" stroke-width="1" stroke-linejoin="round" d=" M 19 41 C 25 48 32 50 38 50 C 44 50 51 46 58 42 C 58 41 58 40 57 39 C 58 40 58 42 59 45 C 58 43 58 42 58 42 C 56 43 54 44 53 45 c -1 3 0 2 -2 8 C 49 59 43 63 39 63 C 35 63 32 62 29 58  C 26 54 26 51 24 46 C 26 50 22 44 19 41 c 0 -1 0 -1 1 -3 c -1 1 -2 5 -1 6" style="stroke:rgb(0, 0, 0);fill:red;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path><path d=" M 30 49 C 31 54 35 56 39 56 C 43 56 46 53 47 48 c -6 3 -10 3 -17 1 " stroke="rgb(0, 0, 0)" stroke-width="1" style="stroke:rgb(0, 0, 0);fill:pink;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path><path stroke="rgb(0, 0, 0)" stroke-width="1" stroke-linejoin="round" d=" M 20 58 C 15.120000000000001 62.88 11 61 6 62 C 8 62 13 67 20 60 C 20 66 6 72 4 82 C 6 78 15 72 23 64 C 22 70 15 76 13 83 C 19 78 24 74 30 69 C 30 74 31 81 32 86 C 34 82 39 76 42 71 C 44 76 47 81 51 88 C 52 83 52 78 51 70 C 55 73 60 76 65 82 C 63 77 60 70 56 64 C 59 66 65 68 69 65 C 63 65 58 62 55 59 C 46 69 32 71 20 58 " style="stroke:rgb(0, 0, 0);fill:greenyellow;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path></g></svg>'},
 ];
 
 //========================================================================================================
 function changeEchelle(e){
//  console.log(e.target);
  var numArbre=parseInt(e.target.getAttribute('data-groupe'),10);
  var ech=parseFloat(e.target.getAttribute('data-echelle'));
  var jso=JSON.parse(e.target.getAttribute('data-jso'));
//  console.log('jso=',jso); // {action: 'redimElt1', numArbre: 3}   return;
  
  
  function recupElements(id,tab){
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].parentId===id){
     var nouvelId=_dssvg.arbre0[i].id;
     tab.push([nouvelId,i]);
     recupElements(nouvelId,tab);
    }
   }
  }
  var tabElts=[];
  if('redimElt1'===jso.action){
   tabElts=[[jso.numArbre,recupereIndiceArbre(jso.numArbre)]];
  }else{
   recupElements(numArbre,tabElts);
  }
//    console.log('tabElts=',tabElts);
  for(var i=0;i<tabElts.length;i++){
//     console.log('_dssvg.arbre0[i]=', _dssvg.arbre0[tabElts[i][1]]);
   if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='rect'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.width =arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.width*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.height=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.height*ech);
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='circle'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cx=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cx*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cy=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cy*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.r=arrdi10000(Math.abs(_dssvg.arbre0[tabElts[i][1]].data.attributes.r*ech));
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='ellipse'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cx=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cx*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cy=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cy*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.rx=arrdi10000(Math.abs(_dssvg.arbre0[tabElts[i][1]].data.attributes.rx*ech));
    _dssvg.arbre0[tabElts[i][1]].data.attributes.ry=arrdi10000(Math.abs(_dssvg.arbre0[tabElts[i][1]].data.attributes.ry*ech));
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='polyline' || _dssvg.arbre0[tabElts[i][1]].data.nodeName==='polygon' ){
    var tab=_dssvg.arbre0[tabElts[i][1]].data.attributes.points.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    var tt='';
    for(var j=0;j<tab.length;j++){
     tt+=' '+arrdi10000(tab[j]*ech);
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.points=tt;
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='line'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x1*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y1*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x2*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y2*ech);
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='path'){
    var tt=_dssvg.arbre0[tabElts[i][1]].data.attributes.d;
    var obj=getPointsFromSvgPath(tt);
//      console.log('obj.tabOri=',obj.tabOri);
    var tutu='';
    for(var j=0;j<obj.tabOri.length;j++){
     if(obj.tabOri[j][0].toUpperCase()==='A'){
      obj.tabOri[j]=[ 
       arrdi10000(obj.tabOri[j][0]) , 
       arrdi10000(obj.tabOri[j][1]*Math.abs(ech)) , 
       arrdi10000(obj.tabOri[j][2]*Math.abs(ech)) , 
       arrdi10000(obj.tabOri[j][3]) , 
       obj.tabOri[j][4] , 
       obj.tabOri[j][5] , 
       arrdi10000(obj.tabOri[j][6]*ech) , arrdi10000(obj.tabOri[j][7]*ech) ];
      tutu+=' '+obj.tabOri[j].join(' ');
     }else{
      tutu+=' '+obj.tabOri[j][0];
      for(var k=1;k<obj.tabOri[j].length;k++){
       tutu+=' ' + arrdi10000(obj.tabOri[j][k]*ech);
      }
     }
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.d=tutu;
   }
  }
  closePopup();
  afficheArbre0({init:false});
  
  
 }
 //========================================================================================================
 function popupRedimEltsGrp1(jso){
  var contentOfPopup='<h3>'+trad['Redimentionner_tous_les_éléments_du_groupe']+'</h3>';
  contentOfPopup+='<div id="echelle1"  style="display:flex;flex-direction: column;margin-top:3px;">';

  for(var j=0.1;(Math.round(j*10)/10)<=2;j+=0.1){
   if((Math.round(j*10)/10)!==1){
    if((Math.round(j*10)/10)===0.1 || (Math.round(j*10)/10)===1.1 || (Math.round(j*10)/10)===2 ){
     contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
    }
    contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'" data-echelle="'+(Math.round(j*10)/10)+'" style="min-width:4em;">'+(Math.round(j*10)/10)+'</button>';
    if((Math.round(j*10)/10)===0.9 || (Math.round(j*10)/10)===1.9 || (Math.round(j*10)/10)===2 ){
     contentOfPopup+='</div>';
    }
   }
  }
   
  for(var j=-2;(Math.round(j*10)/10)<0;j+=0.1){
   if( (Math.round(j*10)/10)===-2 || (Math.round(j*10)/10)===-1.9 || (Math.round(j*10)/10)===-0.9 || (Math.round(j*10)/10)===-1 ){
    contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
   }
   contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'"  data-echelle="'+(Math.round(j*10)/10)+'" style="min-width:4em;">'+(Math.round(j*10)/10)+'</button>';
   if( (Math.round(j*10)/10)===-2 || (Math.round(j*10)/10)===-1.1 || (Math.round(j*10)/10)===-0.1 || (Math.round(j*10)/10)===-1 ){
    contentOfPopup+='</div>';
   }
  }
   
  contentOfPopup+='</div>';
  popupValue.innerHTML=contentOfPopup;
  
  var lst=dogid('echelle1').getElementsByTagName('button');
  for( var i=0;i<lst.length;i++){
   lst[i].addEventListener('click' , changeEchelle , 'button' )
  }
  
  showPopUp('popupRedimEltsGrp1');  
  
 }
 
 //========================================================================================================
 function majPropsGroupeEtElements(e){
  var lstAttribs=['id','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform','line-cap','enable-background','filter','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-dasharray'];
  var propsGroupe={};
  var propsElements={};
  var elts=document.getElementsByTagName('input');
  for(var i=0;i<elts.length;i++){
   if(elts[i].value!==''){
    if(elts[i].getAttribute('data-type')==='proprietesDuG'){
     propsGroupe[elts[i].name]=String(elts[i].value);
    }else if(elts[i].getAttribute('data-type')==='proprietesDesElements'){
     propsElements[elts[i].name]=String(elts[i].value);
    }
   }
  }
//  console.log('propsGroupe=',propsGroupe,'propsElements=',propsElements);
  var idArbre1=parseInt(document.getElementById('idArbre1').value,10);
  var indC=recupereIndiceArbre(idArbre1);
  var nouvellesProprietesGroupe={};
  
  // A) pour le groupe
  // 1°) Mettre dans les nouvelles proprités celles qui ne sont pas dans la liste
  for(var i in _dssvg.arbre0[indC].data.attributes){
   if(!lstAttribs.includes(i)){
    nouvellesProprietesGroupe[i]=_dssvg.arbre0[indC].data.attributes[i];
   }
  }
  // 2°) Mettre dans les nouvelles proprités celles qui sont dans la liste
  for(var i in propsGroupe){
   nouvellesProprietesGroupe[i]=propsGroupe[i];
  }
//  console.log('nouvellesProprietesGroupe=',nouvellesProprietesGroupe);
  _dssvg.arbre0[indC].data.attributes=JSON.parse(JSON.stringify(nouvellesProprietesGroupe));

  

  // B) pour les éléments inclus dans le groupe
  
  
  function boucleElementsEnfants(idParent,tableauIndicesElementsEnfants){
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].parentId===idParent){
     tableauIndicesElementsEnfants.push(i);
     boucleElementsEnfants(_dssvg.arbre0[i].id,tableauIndicesElementsEnfants);
    }
   }
   return;
  }
  
  var gooon=true;
  var idParent=idArbre1;
  var tableauIndicesElementsEnfants=[];
  boucleElementsEnfants(idParent,tableauIndicesElementsEnfants);
//  console.log('tableauIndicesElementsEnfants=',tableauIndicesElementsEnfants);
  for(var j=0;j<tableauIndicesElementsEnfants.length;j++){
   var nouvellesProprietesElementsDuGroupe={};

   indC=tableauIndicesElementsEnfants[j];
   // 1°) Mettre dans les nouvelles proprités celles qui ne sont pas dans la liste
   for(var i in _dssvg.arbre0[indC].data.attributes){
    // l'id est un cas spécial, il faut le conserver
    if(_dssvg.arbre0[indC].data.attributes.hasOwnProperty('id') && _dssvg.arbre0[indC].data.attributes['id']!==''){
     nouvellesProprietesElementsDuGroupe[i]=_dssvg.arbre0[indC].data.attributes['id'];
    }
    if(!lstAttribs.includes(i)){
     nouvellesProprietesElementsDuGroupe[i]=_dssvg.arbre0[indC].data.attributes[i];
    }
   }
   for(var i in propsElements){
    nouvellesProprietesElementsDuGroupe[i]=propsElements[i];
   }
//   console.log('nouvellesProprietesElementsDuGroupe=',nouvellesProprietesElementsDuGroupe);
   _dssvg.arbre0[indC].data.attributes=JSON.parse(JSON.stringify(nouvellesProprietesElementsDuGroupe));
  }
  closePopup();
  afficheArbre0({init:false});  
  
 }
 //========================================================================================================
 function popupPropEltsGrp1(jso){
  var lstAttribs=['id','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform','line-cap','enable-background','filter','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-dasharray'];
//  console.log('jso=',jso);
  var contentOfPopup='<h3>'+trad['modif_prop_grp_et_elts']+'</h3>';
  contentOfPopup+='<style>'
  contentOfPopup+='.table1{border:1px blue outset;margin:10px 3px 0px 3px;width:80%;}';
  contentOfPopup+='.table1 td{border:1px red outset;margin:0px;}';
  contentOfPopup+='.table1 input{border: 2px #ddd inset;width: 100%;}';
  contentOfPopup+='</style>'
  
  contentOfPopup+='<div id="proprietesGroupeElements1">';
  contentOfPopup+='<input type="hidden" id="idArbre1" value="'+jso.numArbre+'" />';
  contentOfPopup+='<table class="table1">'
  
  contentOfPopup+='<tr>';
  contentOfPopup+='<td colspan="2"  style="background:lightgrey;">'+trad['Propriétés_du_groupe']+'</td>';
  contentOfPopup+='</tr>';

  var indC=recupereIndiceArbre(jso.numArbre);
  
  for(var i=0;i<lstAttribs.length;i++){
   contentOfPopup+='<tr>';
   contentOfPopup+='<td style="width:20%;">';
   contentOfPopup+=''+lstAttribs[i];
   contentOfPopup+='</td>';
   contentOfPopup+='<td>';
   var value=_dssvg.arbre0[indC].data.attributes[lstAttribs[i]]?_dssvg.arbre0[indC].data.attributes[lstAttribs[i]]:'';
   contentOfPopup+='<input name="'+lstAttribs[i]+'" data-type="proprietesDuG" value="'+htm1(value)+'" />';
   contentOfPopup+='</td>';
   contentOfPopup+='</tr>';
  }

  contentOfPopup+='<tr>';
  contentOfPopup+='<td colspan="2" style="background:lightgrey;">'+trad['Propriétés_des_éléments_du_groupe']+'</td>';
  contentOfPopup+='</tr>';
  
  for(var i=0;i<lstAttribs.length;i++){
   if(lstAttribs[i]=='id'){
    continue;
   }
   contentOfPopup+='<tr>';
   contentOfPopup+='<td style="width:20%;">';
   contentOfPopup+=''+lstAttribs[i];
   contentOfPopup+='</td>';
   contentOfPopup+='<td>';
   contentOfPopup+='<input name="'+lstAttribs[i]+'" data-type="proprietesDesElements" value="" />';
   contentOfPopup+='</td>';
   contentOfPopup+='</tr>';
  }

  contentOfPopup+='</table>'
  
  contentOfPopup+='<button class="butEnabled butMenuHaut" style="margin:3px;" id="majPropsGroupeEtElements">'+trad['Appliquer']+'</button>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  document.getElementById('majPropsGroupeEtElements').addEventListener('click',majPropsGroupeEtElements,'button');
  
  showPopUp('popupPropEltsGrp1');  
    
 }
 
 //========================================================================================================
 function popupForme1(){

 // setModeSaisieRectangle1 setModeSaisieCercle1 setModeSaisieEllipse1 setModeSaisieLigne1 setModeSaisieLigne2 setModeSaisiePolyline1 setModeSaisiePolygon1
  var contentOfPopup='<h3>'+trad['Sélectionnez_un_mode_de_tracé_ou_une_forme_prédéfinie']+'</h3>';
  
  contentOfPopup+='<style>'
  contentOfPopup+='fieldset{border:1px blue outset;margin:10px 3px 0px 3px;}'
  contentOfPopup+='fieldset>div{border:1px red outset;margin:0px;}'
  contentOfPopup+='fieldset>legend{border:1px red outset;font-size:1.1em;margin:10px auto 10px auto;padding:3px;}'
  contentOfPopup+='</style>'
  
  contentOfPopup+='<fieldset>';
  contentOfPopup+='<legend>'+trad['Modes_de_tracé']+'</legend>';
    contentOfPopup+='<div>';
    for( var i=0;i<BtnsForme.length;i++){
     contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="'+BtnsForme[i].id+'">'+BtnsForme[i].svg+'</button>';
    }
    contentOfPopup+='</div>';
  contentOfPopup+='</fieldset>';
  

  contentOfPopup+='<fieldset>';
  contentOfPopup+='<legend>'+trad['Formes_prédéfinies']+'</legend>';
    contentOfPopup+='<div>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUneEtoile">'+svgEtoile+'</button>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUneFleche"><svg class="svgBoutonGauche1" viewBox="-2 -1  23 18"><polygon points=" 14 1 20 8  14 15   14 11 0 11 0 5 14 5" style="stroke-width:1;stroke:rgb(0, 0, 255);fill:transparent;"></polygon></svg></button>';
    contentOfPopup+='</div>';
  contentOfPopup+='</fieldset>';
  

  contentOfPopup+='<fieldset>';
  contentOfPopup+='<legend>Pattern</legend>';
    contentOfPopup+='<div>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUnPatern"><svg viewBox="-2 -2  104 104"><defs><pattern id="star" viewBox="0,0,10,10" width="30%" height="30%"><polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2"></polygon></pattern></defs><circle cx="50" cy="50" r="50" fill="url(#star)"></circle></svg></button>';
    contentOfPopup+='</div>';
  contentOfPopup+='</fieldset>';
  
  contentOfPopup+='<fieldset>';
  contentOfPopup+='<legend>Filter</legend>';
    contentOfPopup+='<div>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUnFiltre"><svg viewBox="0 -34  32 32"><defs><filter id="__filtered-3" height="220%"><feFlood flood-color="#551C0B" result="COLOR-outline"></feFlood><feMorphology operator="dilate" radius="0.3" in="SourceAlpha" result="OUTLINE_10"></feMorphology><feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20"></feComposite><feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10"></feGaussianBlur><feSpecularLighting surfaceScale="5" specularConstant="0.5" specularExponent="7.5" lighting-color="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20"><fePointLight x="750" y="-50" z="300"></fePointLight></feSpecularLighting><feComposite in2="SourceAlpha" operator="in" in="LIGHTING-EFFECTS_20" result="LIGHTING-EFFECTS_30"></feComposite><feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="LIGHTING-EFFECTS_30" result="LIGHTING-EFFECTS_40"></feComposite><feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10"><feFuncR type="gamma" offset="-1.3" amplitude="10" exponent="4.84"></feFuncR><feFuncB type="gamma" offset="-1.3" amplitude="10.1" exponent="40.84"></feFuncB></feComponentTransfer><feMerge><feMergeNode in="OUTLINE_20"></feMergeNode><feMergeNode in="COLOR-EFFECTS_10"></feMergeNode></feMerge></filter></defs><path filter="url(#__filtered-3)" stroke-width="5" stroke="#EF7349" fill="transparent" stroke-linecap="round" stroke-linejoin="round" d=" M 29 -31 C 21 -25 20 -24 19 -22 C 19 -20 19 -8 19 -5 C 17 -5 13 -5 11 -5  C 11 -8 11 -20 11 -22 C 10 -24 9 -25 3 -31"></path></svg></button>';
    contentOfPopup+='</div>';
  contentOfPopup+='</fieldset>';
  
// 


  popupValue.innerHTML=contentOfPopup;

  for( var i=0;i<BtnsForme.length;i++){
   document.getElementById(BtnsForme[i].id).addEventListener('click',BtnsForme[i].action,'button');
  }
  
  document.getElementById('insererUneEtoile').addEventListener('click',insererUneEtoile,'button');
  document.getElementById('insererUneFleche').addEventListener('click',insererUneFleche,'button');
  document.getElementById('insererUnPatern').addEventListener('click',insererUnPatern,'button');
  document.getElementById('insererUnFiltre').addEventListener('click',insererUnFiltre,'button'); //<defs><filter id="__filtered-3" height="220%"><feFlood flood-color="#551C0B" result="COLOR-outline"></feFlood><feMorphology operator="dilate" radius="0.3" in="SourceAlpha" result="OUTLINE_10"></feMorphology><feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20"></feComposite><feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10"></feGaussianBlur><feSpecularLighting surfaceScale="5" specularConstant="0.5" specularExponent="7.5" lighting-color="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20"><fePointLight x="750" y="-50" z="300"></fePointLight></feSpecularLighting><feComposite in2="SourceAlpha" operator="in" in="LIGHTING-EFFECTS_20" result="LIGHTING-EFFECTS_30"></feComposite><feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="LIGHTING-EFFECTS_30" result="LIGHTING-EFFECTS_40"></feComposite><feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10"><feFuncR type="gamma" offset="-1.3" amplitude="10" exponent="4.84"></feFuncR><feFuncB type="gamma" offset="-1.3" amplitude="10.1" exponent="40.84"></feFuncB></feComponentTransfer><feMerge><feMergeNode in="OUTLINE_20"></feMergeNode><feMergeNode in="COLOR-EFFECTS_10"></feMergeNode></feMerge></filter></defs>
  

  showPopUp('popupForme1');  
  
 }
 
 //========================================================================================================
 function majBout(){
  
  document.getElementById('popupForme1').className='butEnabled butMenuGauche';
  document.getElementById('popupForme1').innerHTML=svgEtoile;
  for( var i=0;i<BtnsForme.length;i++){
   if(_dssvg.mode_en_cours===BtnsForme[i].id){
    document.getElementById('popupForme1').className='butEnabled butDisabled butMenuGauche';
    document.getElementById('popupForme1').innerHTML=BtnsForme[i].svg;
   }
  }

  document.getElementById('setModeSaisieChemin1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieDeplace1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieSelElt1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieEditionPoin1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieTranE1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieGroupe1').className='butEnabled butMenuGauche';
  
  document.getElementById('setModeSaisieDefsElt1').className='butEnabled butMenuGauche bckJaune';
  document.getElementById('setModeSaisieDefsPtE1').className='butEnabled butMenuGauche bckJaune';
  document.getElementById('setModeSaisieDefsTrE1').className='butEnabled butMenuGauche bckJaune';
  document.getElementById('setModeSaisieDefsGrp1').className='butEnabled butMenuGauche bckJaune';
  document.getElementById('popupSpecial1').style.display='none';

  
  
  document.getElementById('poigneesVoisines1').style.display='none';
  
  if(groupeActif.refGroupe===refZnDessin){
   document.getElementById('popGroupeActif1').innerHTML=trad['groupe_courant']+' : '+trad['racine'];
   document.getElementById('popGroupeActif1').className='butEnabled butMenuHaut';
  }else{
   document.getElementById('popGroupeActif1').className='butEnabled butMenuHaut bckJaune';
   document.getElementById('popGroupeActif1').innerHTML=trad['groupe_courant']+' : '+groupeActif.idDansArbre;
  }
  
  
   
  if(_dssvg.mode_en_cours=='setModeSaisieDefsGrp1'){
   document.getElementById('setModeSaisieDefsGrp1').className='butEnabled butDisabled butMenuGauche bckRose';
  }else if(_dssvg.mode_en_cours=='setModeSaisieDefsTrE1'){
   document.getElementById('setModeSaisieDefsTrE1').className='butEnabled butDisabled butMenuGauche bckRose';
  }else if(_dssvg.mode_en_cours=='setModeSaisieDefsPtE1'){
   document.getElementById('setModeSaisieDefsPtE1').className='butEnabled butDisabled butMenuGauche bckRose';
  }else if(_dssvg.mode_en_cours=='setModeSaisieDefsElt1'){
   document.getElementById('setModeSaisieDefsElt1').className='butEnabled butDisabled butMenuGauche bckRose';
  }else if(_dssvg.mode_en_cours=='setModeSaisieChemin1'){
   document.getElementById('setModeSaisieChemin1').className='butEnabled butDisabled butMenuGauche';
  }else if(_dssvg.mode_en_cours=='setModeSaisieDeplace1'){
   document.getElementById('setModeSaisieDeplace1').className='butEnabled butDisabled butMenuGauche';
   document.getElementById('popupSpecial1').style.display='';
  }else if(_dssvg.mode_en_cours=='setModeSaisieSelElt1'){
   document.getElementById('setModeSaisieSelElt1').className='butEnabled butDisabled butMenuGauche';
  }else if(_dssvg.mode_en_cours=='setModeSaisieGroupe1'){
   document.getElementById('setModeSaisieGroupe1').className='butEnabled butDisabled butMenuGauche';  
  }else if(_dssvg.mode_en_cours=='setModeSaisieTranE1'){
   document.getElementById('setModeSaisieTranE1').className='butEnabled butDisabled butMenuGauche';  
  }else if(_dssvg.mode_en_cours=='setModeSaisieEditionPoin1'){
   document.getElementById('setModeSaisieEditionPoin1').className='butEnabled butDisabled butMenuGauche';
   document.getElementById('poigneesVoisines1').style.display='';
   if(etatPoigneesVoisines1===true){
    document.getElementById('poigneesVoisines1').className='butEnabled butDisabled butMenuHaut';
   }else{
    document.getElementById('poigneesVoisines1').className='butEnabled butMenuHaut';
   }
  }
  if(_dssvg.aimanterPixel1!==0){
   document.getElementById('aimanterPixel1').className='butEnabled butDisabled butMenuGauche';
  }else{
   document.getElementById('aimanterPixel1').className='butEnabled butMenuGauche';
  }
  
  document.getElementById('supprimeElement1').style.display='none';
  if( _dssvg.mode_en_cours=='setModeSaisieSelElt1' ){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null && _dssvg.idArbreCourant!==null){
    document.getElementById('supprimeElement1').innerHTML='&times;&nbsp'+_dssvg.idArbreCourant;
    document.getElementById('supprimeElement1').style.display='';
   }
  }
  
  document.getElementById('supprimeGroupe1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('supprimeGroupe1').style.display='';
   }
  }
  
  

  document.getElementById('annuler1').style.display='none';
  if(_dssvg.historique1.length>1){
   document.getElementById('annuler1').style.display='';
  }
  
  document.getElementById('pousserVersHaut1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieSelElt1'){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('pousserVersHaut1').style.display='';
   }
  }

  document.getElementById('pousserVersBas1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieSelElt1'){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('pousserVersBas1').style.display='';
   }
  }

  document.getElementById('dupliquerElement1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' || 'setModeSaisieDefsElt1' === _dssvg.mode_en_cours ){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('dupliquerElement1').style.display='';
   }
  }
  
  document.getElementById('dupliquerGroupe1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('dupliquerGroupe1').style.display='';
   }
  }
  
  highliteStrokeStyle();
  
 }
 //========================================================================================================
 function selectionnePoigneePoisine(e){
  e.stopPropagation();
//  console.log(e.target,e);
  var brancheSelectionne=e.target.getAttribute('data-elem');
  if(brancheSelectionne){
   etatPoigneesVoisines1=false;
   _dssvg.idArbreCourant=parseInt(brancheSelectionne,10);
   globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
   globalIndicePoint=0;
   afficheArbre0({init:false});  
  }
 }
 //========================================================================================================
 function poigneesVoisines1(e){
  if(etatPoigneesVoisines1===true){
   // les poignées voisines sont déjà affichées, on les efface
   var lst=refZnDessin.querySelectorAll('[data-poigneevoisine]');
   for(var i=lst.length-1;i>=0;i--){
    lst[i].remove();
   }
   etatPoigneesVoisines1=false;
   document.getElementById('poigneesVoisines1').className='butEnabled  butMenuHaut';
   
   return;
  }
  
  document.getElementById('poigneesVoisines1').className='butEnabled butDisabled butMenuHaut';
  etatPoigneesVoisines1=true;
  var lst=refZnDessin.querySelectorAll('[data-idarbre1]');
  var lstPoignees=[];
  var pt0=refZnDessin.createSVGPoint();
  var matrixRelatifVersAbsolu=null;
  
  for(var i=0;i<lst.length ;i++){
   if(lst[i].nodeName.toLowerCase()==='g'){
    continue;
   }
   var numArbre=parseInt(lst[i].getAttribute('data-idarbre1'),10);
   if(globalIndiceArbre!==null && _dssvg.idArbreCourant!==numArbre){
    try{
     
     matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
     var indC=recupereIndiceArbre(numArbre);
     if(lst[i].tagName.toLowerCase()==='path'){
      var points=getPointsFromSvgPath(_dssvg.arbre0[indC].data.attributes.d);

      for(var j=0;j<points.tabPts.length;j++){
       pt0.x=points.tabPts[j][1];
       pt0.y=points.tabPts[j][2];
       pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
       if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
          pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
       ){
 //       console.log('pt0=',pt0.x,pt0.y);
        var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
        dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
        dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
       }
      }
     }else if(lst[i].tagName.toLowerCase()==='polyline' || lst[i].tagName.toLowerCase()==='polygon'){
      var points=_dssvg.arbre0[indC].data.attributes.points.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
      for(var j=0;j<points.length;j+=2){
       pt0.x=points[j];
       pt0.y=points[j+1];
       pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
       if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
          pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
       ){
 //       console.log('pt0=',pt0.x,pt0.y);
        var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
        dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
        dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
       }
      }
      
     }else if(lst[i].tagName.toLowerCase()==='rect'){
      var tab=[
       [ _dssvg.arbre0[indC].data.attributes.x                                             , _dssvg.arbre0[indC].data.attributes.y ] ,
       [ _dssvg.arbre0[indC].data.attributes.x + _dssvg.arbre0[indC].data.attributes.width , _dssvg.arbre0[indC].data.attributes.y ] ,
       [ _dssvg.arbre0[indC].data.attributes.x + _dssvg.arbre0[indC].data.attributes.width , _dssvg.arbre0[indC].data.attributes.y + _dssvg.arbre0[indC].data.attributes.height ] ,
       [ _dssvg.arbre0[indC].data.attributes.x                                             , _dssvg.arbre0[indC].data.attributes.y + _dssvg.arbre0[indC].data.attributes.height ] ,
      ];
      for(var j=0;j<tab.length;j++){
       pt0.x=tab[j][0]; 
       pt0.y=tab[j][1]; 
       pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
       if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
          pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
       ){
        var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
        dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
        dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
       }
      }
      
     }else if(lst[i].tagName.toLowerCase()==='circle' || lst[i].tagName.toLowerCase()==='ellipse'){
      pt0.x=_dssvg.arbre0[indC].data.attributes.cx; 
      pt0.y=_dssvg.arbre0[indC].data.attributes.cy;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
      if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
         pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
      ){
       var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
       dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
       dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
      }
      
     }else if(lst[i].tagName.toLowerCase()==='line'){
      pt0.x=_dssvg.arbre0[indC].data.attributes.x1; 
      pt0.y=_dssvg.arbre0[indC].data.attributes.y1;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
      if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
         pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
      ){
       var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
       dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
       dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
      }
     
      pt0.x=_dssvg.arbre0[indC].data.attributes.x2; 
      pt0.y=_dssvg.arbre0[indC].data.attributes.y2;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
      if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
         pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
      ){
       var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
       dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
       dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
      }
     }     
     
     
    }catch(e2){
     // par pour les linéar gradients ...
    }
    
   }
  }
 }
 //========================================================================================================
 function decomposerLesMDeCheminParIndice(i){
  var maxId=-1;
  for(var j=0;j<_dssvg.arbre0.length;j++){
   if(_dssvg.arbre0[j].id>maxId){
    maxId=_dssvg.arbre0[j].id;
   }
  }
  maxId+=1;
  
  cheminEnAbsoluParIndice(i);
  var d=_dssvg.arbre0[i].data.attributes.d;
  if(d){
   var obj=getPointsFromSvgPath(d);
   if(obj.tabAbs.length>=3){
    var tt='';
    var premierChemin=true;
    for(var j=0;j<obj.tabAbs.length;j++){
     if(obj.tabAbs[j][0]==='M'){
      if(j===0 ){
       tt+=''+obj.tabAbs[j].join(' ')+'';
      }else{
       // on crée un noubeau chemin
       if(premierChemin){
        premierChemin=false;
        _dssvg.arbre0[i].data.attributes.d=tt;
       }else{
        var obj1=JSON.parse(JSON.stringify(_dssvg.arbre0[i]));
        obj1.id=maxId++;
        obj1.data.attributes.d=tt;
        _dssvg.arbre0.push(obj1);
       }
       tt=''+obj.tabAbs[j].join(' ')+'';
      }
     }else{
      tt+=''+obj.tabAbs[j].join(' ')+'';
     }
    }
    if(premierChemin){
     _dssvg.arbre0[i].data.attributes.d=tt;
    }else{
     var obj1=JSON.parse(JSON.stringify(_dssvg.arbre0[i]));
     obj1.id=maxId++;
     obj1.data.attributes.d=tt;
     _dssvg.arbre0.push(obj1);
    }
   }
  }
 }
 //========================================================================================================
 function decomposerLesMdesChemins1(){
  if(!window.confirm(trad['Certain']+' ?')){
   return
  }
  
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].data.nodeName==='path'){
    decomposerLesMDeCheminParIndice(i);
   }
  }
  closePopup();
  afficheArbre0({init:false});
 }
 //========================================================================================================
 function cheminEnAbsoluParIndice(i){
  var d=_dssvg.arbre0[i].data.attributes.d;
  if(d){
   var obj=getPointsFromSvgPath(d);
   if(obj.tabAbs.length>=3){
    var tt='';
    for(var j=0;j<obj.tabAbs.length;j++){
     tt+=''+obj.tabAbs[j].join(' ')+'';
    }
   _dssvg.arbre0[i].data.attributes.d=tt;
   }
  }  
 }
 //========================================================================================================
 function tousCheminsEnAbsolu1(){
  if(!window.confirm(trad['Certain']+' ?')){
   return
  }
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].data.nodeName==='path'){
    cheminEnAbsoluParIndice(i);
   }
  }
  closePopup();
  afficheArbre0({init:false});
 }
 //========================================================================================================
 function simplifierTousLesChemins1(){
  var lst=refZnDessin.querySelectorAll('[data-idarbre1]');
  if(!window.confirm(trad['Il_y_a']+' '+(lst.length)+' '+trad['chemins_à_transformer_voulez_vous_continuer']+'')){
   return
  }
  for(var i=0;i<lst.length ;i++){
   if(lst[i].tagName.toLowerCase()==='path'){
    var numArbre=lst[i].getAttribute('data-idarbre1');
    var obj=recuperePropsCouleurs(numArbre);
    var indC=recupereIndiceArbre(numArbre);
    var d=_dssvg.arbre0[indC].data.attributes.d;
    var tt=simplifierUnChemin(d,parseFloat(obj['stroke-width']));
//    console.log('lst[i].tagName',lst[i].tagName , 'numArbre=',numArbre , 'obj[stroke-width]=',parseFloat(obj['stroke-width']),'indC=',indC,'tt=',tt);
    _dssvg.arbre0[indC].data.attributes.d=tt;
   }
  }
  closePopup();
  afficheArbre0({init:false});
 } 
 //========================================================================================================
 function simplifierUnChemin(tt,strw){
  var nouveauChemin=tt;
  var obj=getPointsFromSvgPath(tt);
  //obj.tabOri;
  //obj.tabAbs;
//      console.log('obj.tabAbs=' , obj.tabAbs );
//      console.log('avant obj.tabPts=' , JSON.parse(JSON.stringify(obj.tabPts)) );
  var lesSegments=[];
  var eltSeg=[];
  for(var i=0;i<obj.tabPts.length;i++){
   if(obj.tabPts[i][0]=='M'){
    if(eltSeg.length>0){
     lesSegments.push(JSON.parse(JSON.stringify(eltSeg)));
     eltSeg=[];
    }
   }
   eltSeg.push([obj.tabPts[i][1] , obj.tabPts[i][2]]);
  }
  if(eltSeg.length>0){
   lesSegments.push(JSON.parse(JSON.stringify(eltSeg)));
  }
//      console.log('lesSegments=',lesSegments);
  // m 120.16969,606.23331 -0.0509,-1.40234 m 2.03238,-1.70722 4.97914,0 3.15005,0 c 0.35583,0 0.71295,0.0358 1.06697,0 0.36884,-0.0373 0.72031,-0.1707 1.08111,-0.25587 0.36081,-0.0852 0.7329,-0.10995 1.10362,-0.10995 l 1.11776,0 c 0.0781,0 0.1563,0.003 0.23436,-2.8e-4 0.039,-0.002 0.0781,-0.005 0.11613,-0.0143 0.038,-0.009 0.075,-0.0237 0.10678,-0.0465 0.0549,-0.0394 0.0913,-0.10267 0.10142,-0.16954 0.0101,-0.0669 -0.005,-0.13669 -0.0394,-0.1951 -0.0341,-0.0584 -0.0863,-0.10549 -0.14615,-0.13693 -0.0599,-0.0314 -0.12727,-0.0476 -0.19484,-0.0505 -0.13514,-0.006 -0.26789,0.0395 -0.38819,0.1014 -0.12029,0.0619 -0.2313,0.14024 -0.34899,0.20693 -0.30919,0.1752 -0.66119,0.26715 -1.0153,0.29709 -0.35412,0.0299 -0.71116,-5.1e-4 -1.06177,-0.0585 -0.70122,-0.11606 -1.38286,-0.3419 -2.08914,-0.42159 -0.65692,-0.0741 -1.32166,-0.0203 -1.9815,-0.061 -0.76404,-0.0472 -1.5376,-0.22036 -2.28633,-0.061 -0.47736,0.1016 -0.91506,0.33315 -1.35497,0.54453 -0.4399,0.21139 -0.90111,0.40799 -1.38862,0.43103 -0.47865,0.0226 -0.94772,-0.12363 -1.40167,-0.2771 -0.45395,-0.15346 -0.91381,-0.31758 -1.39276,-0.33263 -0.15073,-0.005 -0.30482,0.006 -0.44486,0.0621 -0.07,0.028 -0.1359,0.0672 -0.19127,0.1184 -0.0554,0.0512 -0.10001,0.11455 -0.12597,0.18534 -0.034,0.0926 -0.0349,0.19558 -0.0114,0.29136 0.0236,0.0958 0.0708,0.18469 0.1298,0.2637 0.11807,0.15804 0.28053,0.2758 0.43085,0.40353 0.15033,0.12774 0.29522,0.27486 0.35784,0.46192 0.0313,0.0935 0.0404,0.19565 0.0173,0.29154 -0.0231,0.0959 -0.08,0.18482 -0.16235,0.23905 -0.0856,0.0563 -0.19419,0.0724 -0.29501,0.0542 -0.10082,-0.0181 -0.19405,-0.0685 -0.27263,-0.13419 -0.15715,-0.13144 -0.25486,-0.31826 -0.36385,-0.49173 -0.0545,-0.0867 -0.11301,-0.17161 -0.18405,-0.24542 -0.071,-0.0738 -0.15533,-0.13654 -0.25127,-0.17243 -0.0959,-0.0359 -0.20419,-0.0435 -0.30109,-0.0103 -0.0485,0.0166 -0.0936,0.0432 -0.13059,0.0787 -0.037,0.0355 -0.0656,0.0798 -0.0813,0.12854 -0.023,0.0713 -0.0178,0.14807 -0.0225,0.22283 -0.002,0.0374 -0.007,0.0749 -0.0193,0.11034 -0.012,0.0355 -0.0315,0.069 -0.0597,0.0936 -0.0298,0.0261 -0.0674,0.041 -0.1015,0.061 -0.0806,0.0472 -0.14262,0.12526 -0.17047,0.21443 -0.0279,0.0892 -0.0213,0.18862 0.0181,0.27334
  var tt='';
  for(var indSeg=0;indSeg<lesSegments.length;indSeg++){
   var leSegment=lesSegments[indSeg];
//       console.log('avant le segment =',JSON.parse(JSON.stringify(leSegment)));
   var goon=10000;
   var imin=leSegment.length-1
   while(goon-- > 0){
    var points=JSON.parse(JSON.stringify(leSegment)); // points=draw_state.elementsToDraw2[ind].ptList;
    var boucle=true;
    for( var i=imin;i>=2 && goon && boucle;i--){
     // distance entre 2 points
     var a1=Math.sqrt((points[i][0]-points[i-1][0])*(points[i][0]-points[i-1][0]) + (points[i][1]-points[i-1][1])*(points[i][1]-points[i-1][1]) );
     if(a1<strw/2){
      // on supprime le point
      leSegment.splice(i-1, 1); // draw_state.elementsToDraw2[ind].ptList.splice(i-1, 1);
      imin=leSegment.length-1; // imin=draw_state.elementsToDraw2[ind].ptList.length-1;
      boucle=false;
     }else{
      imin=i-1;
     }
    }
    if(i<2){
     goon=0;
    }
   }
   var listePoints=simplifySvgPath(leSegment , {tolerance:2.5,precision:2} ); // la tolérance = 0.5 pixels {tolerance:2.5,precision:5}
   tt+=listePoints.path+'    ';
  }
  nouveauChemin=tt;
  
  return nouveauChemin;
 }
 //========================================================================================================
 function setAttributeViewBox(){
  refZnDessin.setAttribute('viewBox',_dssvg.viewBoxInit.join(' '));
  if(_dssvg.zoom1<1){
   divc1.style.background='url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cpath d="M 0 0 l 100 100 l 0 -100 l -100 100 Z" fill="yellow" fill-opacity=".04"/%3E%3C/svg%3E\')';
   divc1.style.backgroundSize=(100*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionX=-(_dssvg.viewBoxInit[0]*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionY=-(_dssvg.viewBoxInit[1]*_dssvg.zoom1)+'px';
  }else if(_dssvg.zoom1<64){
   divc1.style.background='url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"%3E%3Cpath d="M 0 0 l 10 10 l 0 -10 l -10 10 Z" fill="black" fill-opacity=".04"/%3E%3C/svg%3E\')';
   divc1.style.backgroundSize=(10*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionX=-(_dssvg.viewBoxInit[0]*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionY=-(_dssvg.viewBoxInit[1]*_dssvg.zoom1)+'px';
  }else{
   divc1.style.background='url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Cpath d="M 0 0 l 1 1 l 0 -1 l -1 1 Z" fill="red" fill-opacity=".04"/%3E%3C/svg%3E\')';
   divc1.style.backgroundSize=(1*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionX=-(_dssvg.viewBoxInit[0]*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionY=-(_dssvg.viewBoxInit[1]*_dssvg.zoom1)+'px';
  }
 }
 //========================================================================================================
 function allera5050(){
  if(_dssvg.viewBoxInit!==null && _dssvg.viewBoxInit.length===4){
   _dssvg.viewBoxInit[0]=-50;
   _dssvg.viewBoxInit[1]=-50;
   setAttributeViewBox();
   afficheArbre0({init:false});
  }
 }
 //========================================================================================================
 function allera000(){
  if(_dssvg.viewBoxInit!==null && _dssvg.viewBoxInit.length===4){
   _dssvg.viewBoxInit[0]=0;
   _dssvg.viewBoxInit[1]=0;
//   refZnDessin.setAttribute('viewBox',_dssvg.viewBoxInit.join(' '));
   setAttributeViewBox();
   afficheArbre0({init:false});
  }
 }
 //========================================================================================================
 function dupliquerGroupe1(){
  if(_dssvg.idArbreCourant!== null ){
   var maxId=-1;
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].id>maxId){
     maxId=_dssvg.arbre0[i].id;
    }
   }
   function boucleCreation(id,tab){
    var ind=recupereIndiceArbre(id);
    tab.push(_dssvg.arbre0[ind]);
    for(var i=0;i<_dssvg.arbre0.length;i++){
     if(_dssvg.arbre0[i].parentId===id){
      var nouvelId=_dssvg.arbre0[i].id;
      boucleCreation(nouvelId,tab);
     }
    }
   }
   var id=_dssvg.idArbreCourant;
   var tab=[];
   boucleCreation(id,tab)

   var idBase=recupereIndiceArbre(_dssvg.idArbreCourant);
   var minIdTab=9999999;
   for(var i=0;i<tab.length;i++){
    if(tab[i].id<minIdTab){
     minIdTab=tab[i].id;
    }
    if(tab[i].parentId !== _dssvg.arbre0[idBase].parentId && tab[i].parentId<minIdTab){
     minIdTab=tab[i].parentId;
    }
   }
   var deltaId=maxId-minIdTab+1;
   

   for(var i=0;i<tab.length;i++){
    var nouvelElem=JSON.parse(JSON.stringify(tab[i]));
    if(nouvelElem.id!==_dssvg.idArbreCourant){
     nouvelElem.parentId=nouvelElem.parentId+deltaId;
    }
    nouvelElem.id=nouvelElem.id+deltaId;
    _dssvg.arbre0.push(nouvelElem);
   }
   afficheArbre0({init:false});
   
  }
 }
 //========================================================================================================
 function dupliquerElement1(){
  if(_dssvg.idArbreCourant!== null ){
   var indC=recupereIndiceArbre(_dssvg.idArbreCourant);
   var idDuParent=_dssvg.arbre0[indC].parentId;
   var indP=recupereIndiceArbre(_dssvg.arbre0[indC].parentId);
   var elem=JSON.parse(JSON.stringify(_dssvg.arbre0[indC]));
   var maxId=-1;
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].id>maxId){
     maxId=_dssvg.arbre0[i].id;
    }
   }
   maxId+=1;
//   console.log('maxId=',maxId);
   elem.id=maxId;
//   console.log(elem)
   _dssvg.arbre0.push(elem);
   _dssvg.idArbreCourant=maxId;
   globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
   afficheArbre0({init:false});
  }
  
 }
 //========================================================================================================
 function pousserVersBas1(e){
  if(_dssvg.idArbreCourant!== null ){
   var indC=recupereIndiceArbre(_dssvg.idArbreCourant);
   var idDuParent=_dssvg.arbre0[indC].parentId;
   var indP=recupereIndiceArbre(_dssvg.arbre0[indC].parentId);
   if(indP<indC){
    // on insère apres le parent, en supprimant aucun élément (0)
    _dssvg.arbre0.splice(indP+1, 0, JSON.parse(JSON.stringify(_dssvg.arbre0[indC])));
    _dssvg.arbre0.splice(indC+1, 1 );
   }
   afficheArbre0({init:false});
  }
 }
 //========================================================================================================
 function pousserVersHaut1(e){
  if(_dssvg.idArbreCourant!== null ){
   var indC=recupereIndiceArbre(_dssvg.idArbreCourant);
   var idDuParent=_dssvg.arbre0[indC].parentId;
   var dernierIndiceDuMemeParent=-1;
   for(var i=indC+1;i<_dssvg.arbre0.length;i++){
    if(idDuParent===_dssvg.arbre0[i].parentId){
     dernierIndiceDuMemeParent=i;
    }
   }
   if(dernierIndiceDuMemeParent>=0){
    // on insère apres le dernierIndiceDuMemeParent, en supprimant aucun élément (0)
    _dssvg.arbre0.splice(dernierIndiceDuMemeParent+1, 0, JSON.parse(JSON.stringify(_dssvg.arbre0[indC])));
    _dssvg.arbre0.splice(indC, 1 );
   }
   afficheArbre0({init:false});
  }
 }
 //========================================================================================================
 function construireSvgPourExport(ajouterRetrancher){
  var cont='';
  
  var obj=looptree(0,{afficherTout:true,sansDataIdArbre:true});
  if(ajouterRetrancher==null){
   var deb='<svg viewBox="'+Math.round(_dssvg.arbre0[0].data.sizes.minx*10000)/10000+' '+Math.round(_dssvg.arbre0[0].data.sizes.miny*10000)/10000+'  '+Math.round((_dssvg.arbre0[0].data.sizes.maxx - _dssvg.arbre0[0].data.sizes.minx )*10000)/10000+' '+Math.round((_dssvg.arbre0[0].data.sizes.maxy - _dssvg.arbre0[0].data.sizes.miny )*10000)/10000+'">';
  }else{
   var tt=document.getElementById('sourceSvg').value;
   var pos0=tt.indexOf('viewBox="');
   tt=tt.substr(pos0+9);
   var pos0=tt.indexOf('"');
   var tab=tt.substr(0,pos0).trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
//   console.log('tab=',tab);
   
   
   if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnGauche'){
    var deb='<svg viewBox="'+(tab[0]-1)+' '+(tab[1])+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnGauche'){
    var deb='<svg viewBox="'+(tab[0]+1)+' '+(tab[1])+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnHautGauche'){
    var deb='<svg viewBox="'+(tab[0]-1)+' '+(tab[1]-1)+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnHautGauche'){
    var deb='<svg viewBox="'+(tab[0]+1)+' '+(tab[1]+1)+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnHaut'){
    var deb='<svg viewBox="'+(tab[0])+' '+(tab[1]-1)+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnHaut'){
    var deb='<svg viewBox="'+(tab[0])+' '+(tab[1]+1)+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnBasDroite'){
    var deb='<svg viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2]-1)+' '+(tab[3]-1)+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnBasDroite'){
    var deb='<svg viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2]+1)+' '+(tab[3]+1)+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnMilieuDroite'){
    var deb='<svg viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2])+' '+(tab[3]-1)+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnMilieuDroite'){
    var deb='<svg viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2])+' '+(tab[3]+1)+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnMilieuBas'){
    var deb='<svg viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2]-1)+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnMilieuBas'){
    var deb='<svg viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2]+1)+' '+(tab[3])+'">';
    
   }else{
    var deb='<svg viewBox="'+_dssvg.arbre0[0].data.sizes.minx+' '+_dssvg.arbre0[0].data.sizes.miny+'  '+(_dssvg.arbre0[0].data.sizes.maxx - _dssvg.arbre0[0].data.sizes.minx )+' '+(_dssvg.arbre0[0].data.sizes.maxy - _dssvg.arbre0[0].data.sizes.miny )+'">';
   }
  }
  cont+=deb+obj.txt+'</svg>';
  return cont;  
 }
 //========================================================================================================
 function traiteBtnExportSvg(e){
  e.stopPropagation();
//  console.log(e.target.id);
  var contenu=construireSvgPourExport({'fonction':e.target.id});
  remplacerContenuBtns(contenu);
 }
 //========================================================================================================
 function remplacerContenuBtns(contenu){
  document.getElementById('sourceSvg').value=contenu;
  document.getElementById('exempleBouton1').innerHTML=contenu.replace('<svg','<svg style="width:20px;height:40px;" ');
  document.getElementById('exempleBouton2').innerHTML=contenu.replace('<svg','<svg style="width:40px;height:20px;" ');
  document.getElementById('exempleBouton3').innerHTML=contenu.replace('<svg','<svg style="width:40px;height:40px;" ');
  document.getElementById('exempleBouton4').innerHTML=contenu.replace('<svg','<svg style="width:20px;height:20px;" ');
  document.getElementById('svgComplet').innerHTML=contenu;
 }
 //========================================================================================================
 function exporterSvg1(){
  if(_dssvg.arbre0.length==0){
   alert(trad['svg_vide']);
   return;
  }
  
  
  
  var contentOfPopup='<h3>'+trad['exporter_le_svg']+'</h3>';
//  console.log(_dssvg.arbre0[0].data.sizes);
  
  contentOfPopup+='<textarea id="sourceSvg" rows="3" style="min-height:30vh;"></textarea>';

  contentOfPopup+='<style>';
  contentOfPopup+='#tableExportSvg td{border:1px blue solid;}';
  contentOfPopup+='</style>';
  
  
  contentOfPopup+='<table id="tableExportSvg" style="width:80%;">';
  contentOfPopup+='<tr>';
  
     contentOfPopup+='<td style="width:33%;">';
      contentOfPopup+='<button id="moinsUnHautGauche" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnHautGauche"class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td style="width:33%;">';
      contentOfPopup+='<button id="moinsUnHaut" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnHaut" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td style="width:33%;">';
     contentOfPopup+='</td>';
  
  contentOfPopup+='</tr>';
  contentOfPopup+='<tr>';
  
     contentOfPopup+='<td>';
      contentOfPopup+='<button id="moinsUnGauche" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnGauche"class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td>';
     contentOfPopup+='exemples';
     contentOfPopup+='<button id="exempleBouton1" class="butEnabled" style="width:22px;height:42px;"></button>';
     contentOfPopup+='<button id="exempleBouton2" class="butEnabled" style="width:42px;height:22px;"></button>';
     contentOfPopup+='<button id="exempleBouton3" class="butEnabled" style="width:42px;height:42px;"></button>';
     contentOfPopup+='<button id="exempleBouton4" class="butEnabled" style="width:22px;height:22px;"></button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td>';
      contentOfPopup+='<button id="moinsUnMilieuBas" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnMilieuBas"class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';

  contentOfPopup+='</tr>';
  contentOfPopup+='<tr>';

     contentOfPopup+='<td>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td>';
      contentOfPopup+='<button id="moinsUnMilieuDroite" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnMilieuDroite"class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td>';
      contentOfPopup+='<button id="moinsUnBasDroite" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnBasDroite"class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
  
  contentOfPopup+='</tr>';
  contentOfPopup+='</table>';

  
  contentOfPopup+='';
  contentOfPopup+='<br /><div id="svgComplet" style="border:2px red solid;width:80%;"></div>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  var contenu=construireSvgPourExport(null);
  remplacerContenuBtns(contenu);
  
  activerLesBtExporter();
  

  showPopUp('exporterSvg1');  
 }
 
 
 //========================================================================================================
 function activerLesBtExporter(){
  var lst=document.getElementById('tableExportSvg').getElementsByTagName('*');
  for(var i=0;i<lst.length;i++){
   if(lst[i].getAttribute('data-traite')==='traiteBtnsExportSvg'){
    lst[i].addEventListener('click', traiteBtnExportSvg , 'button');
   }
  }
 }
 
 //========================================================================================================
 function _chargerTest(nf){
  var dl=String(document.location);
  var pos1=dl.lastIndexOf('/');
  
  var url=dl.substr(0,pos1);
  var maindenant=new Date();
  if(navigator.onLine){
   url+='/'+nf+'?t='+maindenant.getTime();
  }else{
   url+='/'+nf;
  }
  
  var r = new XMLHttpRequest();
  r.open("GET",url,true);
  r.timeout=6000;
  r.onreadystatechange = function () {
   if (r.readyState != 4 || r.status != 200) return;
   try{
    var ret=r.responseText;
    document.getElementById('contenuSvg').value=ret;
    importerSvgEtFermer();
   }catch(e){
    console.error(e,r);
    return;
   }
  };
  r.onerror=function(e){
   console.error('e=',e);
   /* whatever(); */    
   return;
  }
  r.ontimeout=function(e){console.error('e=',e); /* whatever(); */    return;}
  r.send();
  
 }
 //========================================================================================================
 function nettoyageDonnees(){
  for(var i=0;i<_dssvg.arbre0.length;i++){
//   console.log(_dssvg.arbre0[i].data.nodeName);
   if(_dssvg.arbre0[i].data.nodeName==='path'){
    var obj=getPointsFromSvgPath(_dssvg.arbre0[i].data.attributes.d);
    var valeursExtremesTrouvees=false;
    for(var j=0;j<obj.tabPts.length;j++){
     if(obj.tabPts[j][1]>1000000 || obj.tabPts[j][1]<-1000000 || obj.tabPts[j][2]>1000000 || obj.tabPts[j][2]<-1000000 ){
      valeursExtremesTrouvees=true;
      if(obj.tabPts[j][1] > 1000000){
       obj.tabPts[j][1]=0;
      }
      if(obj.tabPts[j][1] <-1000000){
       obj.tabPts[j][1]=0;
      }
      if(obj.tabPts[j][2] > 1000000){
       obj.tabPts[j][2]=0;
      }
      if(obj.tabPts[j][2] <-1000000){
       obj.tabPts[j][2]=0;
      }
//      console.log('obj=',obj);
     }
    }
    if(valeursExtremesTrouvees===true){
     var leChemin=obj.tabPts.join(' ');
//     console.log('obj=' , obj , 'leChemin=',leChemin);
     var obj2=recuperePropsCouleurs(_dssvg.arbre0[i].id); // obj
//     console.log('obj2=',obj2);
     var tt=simplifierUnChemin(leChemin,parseFloat(obj2['stroke-width']));
//     console.log('tt=',tt,'obj=',obj);
     _dssvg.arbre0[i].data.attributes.d=tt;
     
     
     
    }
   }
  }
 }
 
 //========================================================================================================
 function finirImport(){
  _dssvg.mode_en_cours='setModeSaisieDeplace1';
  _dssvg.zoom1=1;
  _dssvg.aimanterPixel1=0;
  rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
  strkWiTexteSousPoignees=rayonPoint/20;
  fontSiTexteSousPoignees=rayonPoint;
  _dssvg.viewBoxInit=[0 , 0 , (parseFloat(divc1.style.width)-2*wi_of_the_brds2) , (parseFloat(divc1.style.height)-2*wi_of_the_brds2) ];
//  refZnDessin.setAttribute('viewBox','0 0 '+(parseFloat(divc1.style.width)-2*wi_of_the_brds2)+' '+(parseFloat(divc1.style.height)-2*wi_of_the_brds2)+'');
  setAttributeViewBox();
  getSvgTree({init:true});
  var tabTransform=['transform','gradientTransform'];
  for(var indTr=0;indTr<tabTransform.length;indTr++){
   var nomTransform=tabTransform[indTr];
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if( _dssvg.arbre0[i].data.attributes && _dssvg.arbre0[i].data.attributes[nomTransform] && _dssvg.arbre0[i].data.attributes[nomTransform].indexOf('matrix')>=0 ){
     var matText=_dssvg.arbre0[i].data.attributes[nomTransform]; //.transform;
     var obj=convertirTransformEnTableau(matText,[]);
     var mat=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
     for(var j=0;j<obj.tab.length;j++){
      if(obj.tab[j][0]=='matrix'){
       var mat0=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
       mat0.a=obj.tab[j][1][0];
       mat0.b=obj.tab[j][1][1];
       mat0.c=obj.tab[j][1][2];
       mat0.d=obj.tab[j][1][3];
       mat0.e=obj.tab[j][1][4];
       mat0.f=obj.tab[j][1][5];
       mat=mat.multiply(mat0);
      }else if(obj.tab[j][0]=='translate'){
       mat=mat.translate( obj.tab[j][1][0] , obj.tab[j][1][1] );
      }else if(obj.tab[j][0]=='rotate'){
       mat=mat.rotate( obj.tab[j][1][0] , obj.tab[j][1][1] , obj.tab[j][1][2] );
      }else if(obj.tab[j][0]=='scale'){
       mat=mat.scaleNonUniform( obj.tab[j][1][0] , obj.tab[j][1][1] );
      }else if(obj.tab[j][0]=='skewX'){
       mat=mat.skewX( obj.tab[j][1][0] );
      }
     }
     var fnt=matrixToFnt(mat);
     _dssvg.arbre0[i].data.attributes[nomTransform]=fnt.transform;
     _dssvg.arbre0[i].data.nodeRef.setAttribute(nomTransform,fnt.transform);
    }
   }
  }
  nettoyageDonnees();
  closePopup();
  majBout();
 }  
 
 //========================================================================================================
 function importerEnAjoutant(){
  var NouveauContenu=document.getElementById('contenuSvg').value;
//  console.log('NouveauContenu=',NouveauContenu.substr(0,1000))
  var pos1=NouveauContenu.toLowerCase().indexOf('<svg');
//  console.log('pos1=',pos1);
//  return;
  if(pos1>=0){
   NouveauContenu=NouveauContenu.substr(pos1);
   var pos2=NouveauContenu.indexOf('>');
//   console.log('contenu=',contenu.substr(0,1000));
   NouveauContenu=NouveauContenu.substr(pos2+1);
  }
  var ancienContenu=refZnDessin.innerHTML;
  NouveauContenu=ancienContenu+NouveauContenu;
  refZnDessin.innerHTML=NouveauContenu;
  //<defs><pattern id="star" viewBox="0,0,10,10" width="10%" height="10%"><polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2"></polygon></pattern></defs>
  finirImport();
 }
 //========================================================================================================
 function importerSvgEtFermer(){
  
  var contenu=document.getElementById('contenuSvg').value;
//  console.log('contenu=',contenu.substr(0,1000))
  var pos1=contenu.toLowerCase().indexOf('<svg');
//  console.log('pos1=',pos1);
//  return;
  if(pos1>=0){
   contenu=contenu.substr(pos1);
   var pos2=contenu.indexOf('>');
//   console.log('contenu=',contenu.substr(0,1000));
   refZnDessin.innerHTML=contenu.substr(pos2+1);
  }else{
   refZnDessin.innerHTML=contenu;
  }
  finirImport();
 }
 //========================================================================================================
 function importerUrlSvg(){
  var url=document.getElementById('urlAImporter').value;
  if(url===''){
   return;
  }
  var r = new XMLHttpRequest();
  r.open("GET",url,true);
  r.timeout=6000;
  r.onreadystatechange = function () {
   if (r.readyState != 4 || r.status != 200) return;
   try{
    var ret=r.responseText;
    document.getElementById('contenuSvg').value=ret;
    importerSvgEtFermer();
   }catch(e){
    console.error(e,r);
    return;
   }
  };
  r.onerror=function(e){
   console.error('e=',e);
   /* whatever(); */    
   return;
  }
  r.ontimeout=function(e){console.error('e=',e); /* whatever(); */    return;}
  r.send();
 }
 //========================================================================================================
 function popupImportSvg1(){
  var contentOfPopup='<h3>'+trad['importer_un_svg']+'</h3>';
  contentOfPopup+='Url : <input id="urlAImporter" style="max-width:80%;border: 3px #eee inset;" />';
  contentOfPopup+='<br /><button id="importerUrlSvg"  class="butEnabled butMenuHaut">'+trad['Importer_de_l_url']+'</button>';
  contentOfPopup+='<br />';
  contentOfPopup+='<textarea id="contenuSvg" rows="5" style="min-height: 50vh; border: 3px #eee inset; width: 80%;"></textarea>';
  contentOfPopup+='<div id="comandTree1">';
  contentOfPopup+=' <button id="importerSvgEtFermer"  class="butEnabled butMenuHaut">'+trad['importer_en_écrasant']+'</button>';
  contentOfPopup+=' <button id="importerEnAjoutant"   class="butEnabled butMenuHaut">'+trad['importer_en_ajoutant']+'</button>';
  contentOfPopup+=' <br />';
  // zzvin.svg , zzSimplificationChemin.svg zzSVG_Logo-svgomg.svg zzsagami_single-svgomg.svg zztest-car-lite.svg
  contentOfPopup+=' <br /><br /><button id="test20"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="0 0  0 0"><defs><pattern id="star" viewBox="0,0,10,10" width="10%" height="10%"><polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2"></polygon></pattern></defs><circle cx="50" cy="50" r="50" fill="url(#star)"></circle><circle cx="180" cy="50" r="40" fill="none" stroke-width="20" stroke="url(#star)"></circle></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test20 pattern</button>';
  contentOfPopup+=' <br /><br /><button id="test19"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="-28.9289 -24.9948  170.6555 150.0684"><defs><clipPath id="cp" transform="rotate(10)"><path transform="translate(3 3)" d="M 22.9695 18.0532 C 14.1526 18.0532 -3.4807 35.199 -10.093 39.4856 C -14.5013 42.3431 -5.6849 52.3449 -5.6849 53.7739 C -5.6849 55.2027 -5.6849 56.6317 -5.6849 56.6317 C 3.132 62.347 14.1526 65.2046 22.9695 102.3543 C 31.7859 69.4911 56.0316 75.2063 75.8691 102.3543 C 75.8691 62.347 91.2982 63.7758 133.1773 68.0622 C 95.7067 46.6297 58.2361 25.1973 139.7899 19.482 C 97.9108 20.9107 53.8278 19.482 108.9316 -11.9526 C 86.89 -19.0967 22.9695 10.909 20.765 -23.3831 " style="stroke:rgb(0, 0, 0);fill:blanchedalmond;stroke-width:0;stroke-opacity:1;fill-opacity:1;opacity:1;"></path></clipPath></defs><rect x="3" y="4" width="70" height="66" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" clip-path="url(#cp)" style="stroke:rgb(0, 0, 0);fill:rosybrown;stroke-width:1;stroke-opacity:1;fill-opacity:0.5;opacity:1;"></rect></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test19 clipPath</button>';
  contentOfPopup+=' <br /><br /><button id="test18"  class="butEnabled butMenuHaut" onclick="'+global_variable_name+'.chargerTest(\'zzvin.svg\')">test18 vin</button>';
  contentOfPopup+=' <br /><br /><button id="test17"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="0 -1  442.2656 377.5"><defs><filter id="filtered-3" height="220%"><feFlood flood-color="#551C0B" result="COLOR-outline"></feFlood><feMorphology operator="dilate" radius="0.3" in="SourceAlpha" result="OUTLINE_10"></feMorphology><feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20"></feComposite><feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10"></feGaussianBlur><feSpecularLighting surfaceScale="5" specularConstant="0.5" specularExponent="7.5" lighting-color="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20"><fePointLight x="750" y="-50" z="300"></fePointLight></feSpecularLighting><feComposite in2="SourceAlpha" operator="in" in="LIGHTING-EFFECTS_20" result="LIGHTING-EFFECTS_30"></feComposite><feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="LIGHTING-EFFECTS_30" result="LIGHTING-EFFECTS_40"></feComposite><feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10"><feFuncR type="gamma" offset="-1.3" amplitude="10" exponent="4.84"></feFuncR><feFuncB type="gamma" offset="-1.3" amplitude="10.1" exponent="40.84"></feFuncB></feComponentTransfer><feMerge><feMergeNode in="OUTLINE_20"></feMergeNode><feMergeNode in="COLOR-EFFECTS_10"></feMergeNode></feMerge></filter></defs><text filter="url(#filtered-3)" x="20" y="140" font-size="140" stroke="#EF7349" fill="#EF7349">BLOP!</text><g fill="transparent" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" stroke="#EF7349"><path filter="url(#filtered-3)" d="M 387 226 C 382.55 226 344.7 277.28 329 292 C 286.38 331.96 230.33 371 170 371 "></path><path filter="url(#filtered-3)" stroke-width="20" stroke="#EF7349" fill="transparent" d=" M 342.5 289.5 C 317.46 321.54 239.49 367.5 212.5 376.5 "></path></g></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test17 filtres 2</button>';
  contentOfPopup+=' <br /><br /><button id="test16"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<defs><filter id="MyFilter" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="120"><feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"></feGaussianBlur><feOffset in="blur" dx="4" dy="4" result="offsetBlur"></feOffset><feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" specularExponent="20" lighting-color="#bbbbbb" result="specOut"><fePointLight x="-5000" y="-10000" z="20000"></fePointLight></feSpecularLighting><feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"></feComposite><feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"></feComposite><feMerge><feMergeNode in="offsetBlur"></feMergeNode><feMergeNode in="litPaint"></feMergeNode></feMerge></filter></defs><g filter="url(#MyFilter)"><path fill="none" stroke="#D90000" stroke-width="10" d=" M 50 66 c -50 0 -50 -60 0 -60 h 100 c 50 0 50 60 1 60  z"></path><path fill="#D90000" d="M60,56 c-30,0 -30,-40 0,-40 h80 c30,0 30,40 0,40z"></path><g fill="#FFFFFF" stroke="black" font-size="45" font-family="Verdana"><text x="52" y="52">SVG</text></g></g></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test16 filtres</button>';
  contentOfPopup+=' <br /><br /><button id="test15"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<defs> <linearGradient id="a" x1="0" y1="0" x2="100"  y2="100" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="blue"/> <stop offset="0.3333" stop-color="white"/> <stop offset="0.6666" stop-color="white"/> <stop offset="1" stop-color="red"/></linearGradient></defs><rect fill="url(#a)" x="0" y="0" width="100" height="100"/>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test15 linear gradient</button>';
  contentOfPopup+=' <br /><br /><button id="test14"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="0 0  7.14109992980957 15.984700202941895"><defs><radialGradient id="a" cx="3.9321" cy="2.3306" r="3.0394" gradientUnits="userSpaceOnUse" ><stop offset="0" stop-color="#e7e7e7"></stop><stop offset="1" stop-color="#565656"></stop></radialGradient></defs><ellipse cx="3.8754" cy="8.3128" rx="3.2657" ry="7.6719" stroke="rgb(0, 0, 0)" fill="transparent" style="stroke:rgb(0, 0, 0);fill:url(#a);stroke-width:0.1;stroke-opacity:1;fill-opacity:1;"></ellipse></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test14 radial gradient</button>';
  contentOfPopup+=' <br /><br /><button id="test13"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<path stroke="rgb(0, 0, 0)" fill="transparent" d="M 51.393 27.646 c 0.147 2.032 0.08 4.08 -0.203 6.097 a 34.012 34.012 0 0 1 -0.762 3.78 c -0.257 0.995 -0.55 1.982 -0.762 2.988 c -0.17 0.81 -0.286 1.63 -0.457 2.439 c -0.146 0.689 -0.332 1.372 -0.407 2.073 c -0.022 0.205 -0.035 0.414 -0.101 0.61 c -0.018 0.05 -0.039 0.1 -0.045 0.155 a 0.217 0.217 0 0 0 0.005 0.08 m -37.547 -17.925 a 10.986 10.986 0 0 0 -4.827 -3.537 c -0.158 -0.06 -0.32 -0.12 -0.488 -0.133 a 0.773 0.773 0 0 0 -0.253 0.018 a 0.551 0.551 0 0 0 -0.224 0.115 a 0.555 0.555 0 0 0 -0.158 0.243 a 0.782 0.782 0 0 0 -0.036 0.289 m 12.854 -13.231 a 45.446 45.446 0 0 0 1.778 -2.134 c 0.212 -0.27 0.422 -0.545 0.66 -0.792 c 0.488 -0.506 1.087 -0.89 1.626 -1.342 c 0.26 -0.217 0.506 -0.45 0.762 -0.67 c 1.653 -1.424 3.765 -2.341 5.945 -2.44 c 0.762 -0.033 1.529 0.03 2.286 -0.06 c 0.119 -0.014 0.24 -0.032 0.356 0 c 0.075 0.02 0.143 0.062 0.199 0.116 " style="stroke:rgb(0, 0, 0);fill:transparent;stroke-width:0.1;stroke-opacity:1;fill-opacity:1;"></path><path stroke="rgb(0, 0, 0)" fill="transparent" d="M51.39,27.65c-0.19,5.85 -3.09,12.5 -2.73,18.22    M11.11,27.94c-1.8,-1.32 -5.71,-5.22 -5.99,-3    M17.98,11.71c2.69,-3.23 8.92,-10.06 13.61,-7.32    " style="stroke:rgb(0, 0, 0);fill:transparent;stroke-width:0.1;stroke-opacity:1;fill-opacity:1;"></path>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test13 simplification chemin</button>';
  contentOfPopup+=' <br /><br /><button id="test12"  class="butEnabled butMenuHaut" onclick="'+global_variable_name+'.chargerTest(\'zzSimplificationChemin.svg\')">test12 simplification chemin</button>';
  contentOfPopup+=' <br /><br /><button id="test11"  class="butEnabled butMenuHaut" onclick="'+global_variable_name+'.chargerTest(\'zzSVG_Logo-svgomg.svg\')">test11 logo SVG</button>';
  contentOfPopup+=' <br /><br /><button id="test10"  class="butEnabled butMenuHaut" onclick="'+global_variable_name+'.chargerTest(\'zzPlates_tect2_fr-svgomg.svg\')">test10 plaques tectoniques</button>';
  contentOfPopup+=' <br /><br /><button id="test09"  class="butEnabled butMenuHaut" onclick="'+global_variable_name+'.chargerTest(\'zzsagami_single-svgomg.svg\')">test09 sagami_single.svg</button>';
  contentOfPopup+=' <br /><br /><button id="test08"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<defs data-idarbre1="1"><radialGradient data-idarbre1="2" id="a" cx="22.682" cy="-15.034" r="3.243" gradientTransform="matrix(1 0 0 2.37143 0 19.952)" gradientUnits="userSpaceOnUse"><stop data-idarbre1="3" offset="0" stop-color="#e7e7e7"></stop><stop data-idarbre1="4" offset="1" stop-color="#565656"></stop></radialGradient><radialGradient data-idarbre1="5" id="c" cx="25.501" cy="30.67" r="15.188" gradientTransform="matrix(1.55222 0 0 .6192 -14.018 5.14)" gradientUnits="userSpaceOnUse"><stop data-idarbre1="6" offset="0"></stop><stop data-idarbre1="7" offset="1" stop-color="#5e5e5e"></stop></radialGradient><radialGradient data-idarbre1="8" xlink:href="#a" id="f" cx="22.682" cy="-15.034" r="3.243" gradientTransform="matrix(1 0 0 2.37143 0 19.952)" gradientUnits="userSpaceOnUse"></radialGradient><radialGradient data-idarbre1="9" xlink:href="#a" id="g" cx="22.682" cy="-15.034" r="3.243" gradientTransform="matrix(1 0 0 2.37143 0 19.952)" gradientUnits="userSpaceOnUse"></radialGradient><radialGradient data-idarbre1="10" xlink:href="#c" id="i" cx="25.501" cy="30.67" r="15.188" gradientTransform="matrix(29.1164 0 0 11.61495 -339.17 200.348)" gradientUnits="userSpaceOnUse"></radialGradient><linearGradient data-idarbre1="11" id="b" x1="11.685" x2="10.783" y1="33.647" y2="35.871" gradientTransform="matrix(1.04306 0 0 1.04306 -1.034 -1.279)" gradientUnits="userSpaceOnUse"><stop data-idarbre1="12" offset="0" stop-color="#96d2e2"></stop><stop data-idarbre1="13" offset="1" stop-color="#1d5868"></stop></linearGradient><linearGradient data-idarbre1="14" id="d"><stop data-idarbre1="15" offset="0" stop-color="#666"></stop><stop data-idarbre1="16" offset="1" stop-color="#ababab" stop-opacity="0"></stop></linearGradient><linearGradient data-idarbre1="17" xlink:href="#b" id="h" x1="11.685" x2="10.783" y1="33.647" y2="35.871" gradientTransform="matrix(19.56562 0 0 19.56562 -95.62 79.961)" gradientUnits="userSpaceOnUse"></linearGradient><linearGradient data-idarbre1="18" xlink:href="#d" id="j" x1="22.901" x2="21.304" y1="27.156" y2="16.709" gradientTransform="matrix(19.56562 0 0 19.56562 -95.62 79.961)" gradientUnits="userSpaceOnUse"></linearGradient><linearGradient data-idarbre1="19" xlink:href="#d" id="k" x1="9.65" x2="20.748" y1="29.287" y2="18.285" gradientTransform="matrix(19.56562 0 0 19.56562 -95.62 79.961)" gradientUnits="userSpaceOnUse"></linearGradient><filter data-idarbre1="20" id="e" color-interpolation-filters="sRGB"><feGaussianBlur data-idarbre1="21" stdDeviation=".573"></feGaussianBlur></filter></defs><g data-idarbre1="22" transform="translate(151.895 -274.138)"><g data-idarbre1="26" color="#000"><path data-idarbre1="27" d="M681.793 507.108c-24.166 0-43.832 46.613-43.832 103.922 0 48.01 13.85 88.19 32.52 100.035 16.26 12.253 34.928 12.54 54.082 9.544 23.367-2.147 42.064-47.629 42.064-103.569 0-57.309-19.664-103.922-43.832-103.922-18.117 10.33-23.59 3.623-41.004-6.01z" enable-background="accumulate"></path><path data-idarbre1="28" fill="url(#f)" d="M27.058-14.548a3.243 7.691 0 1 1-6.487 0 3.243 7.691 0 1 1 6.487 0z" enable-background="accumulate" transform="translate(561 716) rotate(0)  scale(7 7) skewX(0)"></path></g><g data-idarbre1="29" color="#000"><path data-idarbre1="30" d="M381.365 696.173c-28.51 0-51.712 54.995-51.712 122.608 0 56.643 16.34 104.045 38.367 118.022 19.183 14.455 41.207 14.794 63.805 11.26 27.57-2.534 49.627-56.193 49.627-122.191 0-67.614-23.2-122.608-51.712-122.608-21.376 12.187-27.833 4.275-48.377-7.09z" enable-background="accumulate"></path><path data-idarbre1="31" fill="url(#g)" d="M27.058-14.548a3.243 7.691 0 1 1-6.487 0 3.243 7.691 0 1 1 6.487 0z" enable-background="accumulate" transform="translate(239 942) rotate(0)  scale(8 8) skewX(0)"></path></g></g>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test08 pneus</button>';
  contentOfPopup+=' <br /><br /><button id="test07"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<g data-idarbre1="29" transform=""><g data-idarbre1="1" transform="translate(0 0 ) "><rect data-idarbre1="2" x="1" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform=""></rect><rect data-idarbre1="3" x="5" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-90 6 10 ) "></rect><rect data-idarbre1="4" x="5" y="5" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(90 6 6 ) "></rect><rect data-idarbre1="5" x="9" y="5" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(45 10 6 ) "></rect><rect data-idarbre1="6" x="9" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-45 10 10 ) "></rect><rect data-idarbre1="7" x="9" y="1" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-180 10 2 ) "></rect></g><g data-idarbre1="8" transform="scale(1 -1 ) translate(0 0 ) "><rect data-idarbre1="9" x="1" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform=""></rect><rect data-idarbre1="10" x="5" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-90 6 10 ) "></rect><rect data-idarbre1="11" x="5" y="5" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(90 6 6 ) "></rect><rect data-idarbre1="12" x="9" y="5" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(45 10 6 ) "></rect><rect data-idarbre1="13" x="9" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-45 10 10 ) "></rect><rect data-idarbre1="14" x="9" y="1" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-180 10 2 ) "></rect></g><g data-idarbre1="15" transform="scale(-1 -1 ) translate(0 0 ) "><rect data-idarbre1="16" x="1" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform=""></rect><rect data-idarbre1="17" x="5" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-90 6 10 ) translate(0 0 ) "></rect><rect data-idarbre1="18" x="5" y="5" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(90 6 6 ) translate(0 0 ) "></rect><rect data-idarbre1="19" x="9" y="5" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(45 10 6 ) "></rect><rect data-idarbre1="20" x="9" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-45 10 10 ) translate(0 0 ) "></rect><rect data-idarbre1="21" x="9" y="1" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-180 10 2 ) "></rect></g><g data-idarbre1="22" transform="scale(-1 1 ) translate(0 0 ) "><rect data-idarbre1="23" x="1" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform=""></rect><rect data-idarbre1="24" x="5" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-90 6 10 ) "></rect><rect data-idarbre1="25" x="5" y="5" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(90 6 6 ) "></rect><rect data-idarbre1="26" x="9" y="5" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(45 10 6 ) "></rect><rect data-idarbre1="27" x="9" y="9" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-45 10 10 ) "></rect><rect data-idarbre1="28" x="9" y="1" width="2" height="2" stroke="black" stroke-width="1" fill="transparent" transform="rotate(-180 10 2 ) "></rect></g></g>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test07 etude translate</button>';
  contentOfPopup+=' <br /><br /><button id="test06"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<g transform="rotate(90 0 0 ) "><polyline points=" 2 2  0 0  -3 4  4 5  4 -1  0 -4  0 -4 " stroke="black" stroke-width="1" fill="transparent" transform="translate(0 -1 ) rotate(0 0 1 ) "></polyline></g>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test05 scale pour rotate translate element dans un groupe</button>';
  contentOfPopup+=' <br /><br /><button id="test05"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<polyline data-idarbre1="1" points=" 2 2  0 0  -3 4  4 5  4 -1  0 -4  0 -4 " stroke="black" stroke-width="1" fill="transparent" transform="rotate(-173 0 0 ) translate(-4 -5 ) scale(1 1 ) "></polyline>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test05 scale pour rotate translate element</button>';
  contentOfPopup+=' <br /><br /><button id="test04"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="0 4  554.4265 390.0948"><g transform="   "><g transform="translate(200,0) scale(2) "><rect x="50" y="50" width="30" height="30" stroke="black" fill="transparent" stroke-width="5" transform=" rotate(45 50 50) "></rect><g transform="translate(100,0)"><rect x="50" y="50" width="30" height="30" stroke="black" fill="blue" stroke-width="5" transform=" rotate(45 50 50) "></rect></g></g><g transform=""><rect x="6" y="27" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"></rect><rect x="60" y="10" rx="5" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"></rect><circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"></circle><ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"></ellipse><line x1="10" x2="50" y1="110" y2="150" stroke="orange" stroke-width="5"></line><polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145" stroke="orange" fill="transparent" stroke-width="5"></polyline><polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180" stroke="green" fill="transparent" stroke-width="5"></polygon><path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"></path><path d="M 40,260   A 40,60  0 1 0 60,260" fill="none" stroke="blue" stroke-width="5"></path></g></g></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test04 petits éléments</button>';
  contentOfPopup+=' <br /><br /><button id="test03"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<path d=" M 21 10 L 20 64 L 21 121 M 97 16 Q 66 46 100 63 Q 133 88 105 114 T 105 166 T 103 221 T 106 275 M 180 16 M 230 13 C 176 63 183 106 228 48 C 273 74 278 122 228 86 C 179 149 180 188 228 125 C 285 159 278 183 229 161 M 327 33 L 370 78  L 341 137 L 342 208 H 395 V 251 H 338 V 302 M 526 36 A 50 40 0 1 0 529 79 V 134 A 50 25 -120 0 1 533 185 A 50 25 120 1 0 534 236 V 288 A 20 30 21.6783 1 1 537 350 A 20 47.4513 30 0 0 533 409" style="stroke:black;stroke-width:1;fill:transparent;"></path>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test03 chemin complet</button>';
  contentOfPopup+=' <br /><br /><button id="test02"  class="butEnabled butMenuHaut" onclick="'+global_variable_name+'.chargerTest(\'zztest-car-lite.svg\')">test02 car lite</button>';
  contentOfPopup+=' <br /><br /><button id="test01"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<path d="M 12 12L 22 22" style="stroke:black;stroke-width:1;fill:transparent;" />')+'\';'+global_variable_name+'.importerSvgEtFermer();">test01 ligne simple</button>';
  contentOfPopup+='</div>';

  popupValue.innerHTML=contentOfPopup;
  
  document.getElementById('importerSvgEtFermer').addEventListener('click',importerSvgEtFermer,'button');
  document.getElementById('importerEnAjoutant').addEventListener('click',importerEnAjoutant,'button');
  document.getElementById('importerUrlSvg').addEventListener('click',importerUrlSvg,'button');
  
  
//  '<path data-idarbre1="1" d="M 12 12L 22 22" stroke="black" stroke-width="1" fill="transparent"></path>'
  

  showPopUp('popupImportSvg1');  
 }
 
 //========================================================================================================
 function finTouchParam(e){
  e.stopPropagation();
  finActionParam();
 }
 //========================================================================================================
 function finMouseParam(e){
  e.stopPropagation();
  finActionParam();
 }
 //========================================================================================================
 function finActionParam(e){
  removeListeners();
  if('insererUneEtoile'===popUpIsDisplayed1){
   ajouteListenersEtoile();
  }else if('popupParametres1'){
   ajouteListenersParam();
  }
 }
 //========================================================================================================
 function recupereIndiceArbre(id){
  var indice=null;
  for(var i=_dssvg.arbre0.length-1;i>=0;i--){
   if(_dssvg.arbre0[i].id==id){
    indice=i;
    break;
   }
  }
  return indice;
 }
 //========================================================================================================
 function aimanterPixel1(e){
  if(_dssvg.aimanterPixel1!==0){
   _dssvg.aimanterPixel1=0;
  }else{
   _dssvg.aimanterPixel1=_dssvg.parametres.facteurAimnt;
  }
  majBout();
  
 }
 //========================================================================================================
 function suppTout(e){
  if(window.confirm(trad['Certain']+' ?')){
   
   _dssvg.arbre0         = [];
   _dssvg.historique1    = [];
   _dssvg.mode_en_cours  = 'setModeSaisieDeplace1';
   _dssvg.idArbreCourant = null;
   _dssvg.idArbrPreceden = null;
   _dssvg.strokeColor1   = 'rgb(0, 0, 0)' ;
   _dssvg.strokCols      =['rgba(0,0,0,1)','rgba(255,0,0,1)','rgba(0,0,255,1)','rgba(0,255,0,1)'];
   _dssvg.filCols        =['rgba(0,0,0,1)','rgba(255,0,0,1)','rgba(0,0,255,1)','rgba(0,255,0,1)'];
   saveStte();
   
   
/*   
   try{
    localStorage.removeItem('_dssvg'); 
   }catch(e){
    consloe.log('erreur suppTout e=',e);
   }
*/   
   var st1=String(document.location);
   document.location=st1;
  }
 }
 //========================================================================================================
 function suppVraimentToutToutTout(e){
  if(window.confirm(trad['Certain']+' ?')){
   try{
    localStorage.removeItem('_dssvg'); 
   }catch(e){
    consloe.log('erreur suppVraimentToutToutTout e=',e);
   }
   var st1=String(document.location);
   document.location=st1;
  }
 } 
 //========================================================================================================
 function supprimeGroupe1(e){
  if(globalGeneralSvgReferenceElement!==null && 
     ecran_appuye==false                     && 
     globalIndiceArbre!==null                &&
     ( _dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1' === _dssvg.mode_en_cours )
  ){
   if(_dssvg.idArbrPreceden===_dssvg.idArbreCourant){
    _dssvg.idArbrPreceden=null;
   }
   for(var i=_dssvg.arbre0.length-1;i>=0;i--){
    if(_dssvg.arbre0[i].parentId===_dssvg.idArbreCourant){
     _dssvg.arbre0.splice(i,1);
    }
   }
   if(_dssvg.idArbreCourant===groupeActif.idDansArbre){
    groupeActif.idDansArbre = 0;
    groupeActif.refGroupe   = refZnDessin;
   }
   _dssvg.arbre0.splice(globalIndiceArbre,1);
   globalGeneralSvgReferenceElement.remove();
   _dssvg.idArbreCourant=null;
   globalIndiceArbre=null;
   globalIndicePoint=null;
   globalGeneralSvgReferenceElement=null;
   afficheArbre0({prendreTout:false});
   majBout();
  }
 }
 //========================================================================================================
 function supprimeElement1(e){
  if(globalGeneralSvgReferenceElement!==null && 
     ecran_appuye==false                     && 
     globalIndiceArbre!==null                &&
     ( (_dssvg.mode_en_cours==='setModeSaisieSelElt1' || 'setModeSaisieDefsElt1'===_dssvg.mode_en_cours ) )
  ){
   if(_dssvg.idArbrPreceden===_dssvg.idArbreCourant){
    _dssvg.idArbrPreceden=null;
   }
   _dssvg.arbre0.splice(globalIndiceArbre,1);
   globalGeneralSvgReferenceElement.remove();
   _dssvg.idArbreCourant=null;
   globalIndiceArbre=null;
   globalIndicePoint=null;
   globalGeneralSvgReferenceElement=null;
   afficheArbre0({prendreTout:false});
  }
 }
 //========================================================================================================
 function  deplaceViewBox(pos){
  var newX=arrdi10000(_dssvg.viewBoxInit[0]+initPosxy.x-pos.x);
  var newY=arrdi10000(_dssvg.viewBoxInit[1]+initPosxy.y-pos.y);
//  refZnDessin.setAttribute('viewBox',(newX)+' '+(newY)+' '+(_dssvg.viewBoxInit[2])+' '+(_dssvg.viewBoxInit[3])+' ')
  _dssvg.viewBoxInit[0]=newX;
  _dssvg.viewBoxInit[1]=newY;
  setAttributeViewBox();  
  divlag1.innerHTML='<span>Vb0Z='+_dssvg.zoom1+'</span><span style="color:red;">vB:'+newX+ ''+newY+ ' '+arrdi10000(_dssvg.viewBoxInit[2])+' '+arrdi10000(_dssvg.viewBoxInit[3])+'';  
 }
 //========================================================================================================
 var globalClickDessin={
  mouseStart:null,
  matriceRacineInverse:null,
  pointsTraces:null,
  tempchild:null,
  mousePosPrecPolyline:{x:null,y:null},
  currentPolyline:null,
  mousePosPrecPolygon:{x:null,y:null},
  currentPolygon:null,
 };
 //========================================================================================================
 function positionSouris(e){
  
  var p=refZnDessin.createSVGPoint();
  try{
		 p.x = e.clientX; 
   p.y = e.clientY;
  }catch(e1){
   console.warn('e1=',e1,'e=',e);
  }
  p=p.matrixTransform(refZnDessin.getScreenCTM().inverse());
//  p.x=arrdi10000(p.x);
//  p.y=arrdi10000(p.y);
  p.x=Math.round(p.x*10)/10;
  p.y=Math.round(p.y*10)/10;
//  console.log('_dssvg.viewBoxInit=' , _dssvg.viewBoxInit)
  return {
   x:(e.clientX-decalageX)/_dssvg.zoom1+_dssvg.viewBoxInit[0],
   y:(e.clientY-decalageY)/_dssvg.zoom1+_dssvg.viewBoxInit[1],
//   ex:e.clientX,
//   ey:e.clientY,
   sx:p.x,
   sy:p.y,
  }
 }
 var defTimeoutPolyline=null;
 var defTimeoutPolygon=null;
 
 
 //========================================================================================================
 function timeOutPolyline(){
  divlag1.innerHTML='timeout';
  try{
   clearTimeout(defTimeoutPolyline);
  }catch(e){
   console.warn('Erreur ','color:red;background:yellow','e=',e);
  }
  if(globalClickDessin.mousePosPrecPolyline.x == globalClickDessin.currentPolyline.x  && globalClickDessin.mousePosPrecPolyline.y == globalClickDessin.currentPolyline.y ){
   divlag1.innerHTML='<span style="color:yellow;color:red;">Nouveau segment</span>';
   globalClickDessin.pointsTraces.push([globalClickDessin.currentPolyline.x , globalClickDessin.currentPolyline.y]);
   var tt='  '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + '  ';
   for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
    tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
   }
   globalClickDessin.tempchild.setAttribute('points' , tt );

  }else{
   globalClickDessin.pointsTraces[globalClickDessin.pointsTraces.length-1]=[globalClickDessin.currentPolyline.x , globalClickDessin.currentPolyline.y];
   var tt='  '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + '  ';
   for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
    tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
   }
   globalClickDessin.tempchild.setAttribute('points' , tt );
  }
 }
 //========================================================================================================
 function timeOutPolygon(){
  divlag1.innerHTML='timeout';
  try{
   clearTimeout(defTimeoutPolygon);
  }catch(e){
   console.warn('Erreur ','color:red;background:yellow','e=',e);
  }
  if(globalClickDessin.mousePosPrecPolygon.x == globalClickDessin.currentPolygon.x  && globalClickDessin.mousePosPrecPolygon.y == globalClickDessin.currentPolygon.y ){
   divlag1.innerHTML='<span style="color:yellow;color:red;">Nouveau segment</span>';
   globalClickDessin.pointsTraces.push([globalClickDessin.currentPolygon.x , globalClickDessin.currentPolygon.y]);
   var tt='  '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + '  ';
   for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
    tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
   }
   globalClickDessin.tempchild.setAttribute('points' , tt );

  }else{
   globalClickDessin.pointsTraces[globalClickDessin.pointsTraces.length-1]=[globalClickDessin.currentPolygon.x , globalClickDessin.currentPolygon.y];
   var tt='  '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + '  ';
   for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
    tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
   }
   globalClickDessin.tempchild.setAttribute('points' , tt );
  }


 }
 //========================================================================================================
 function touchDownZoneDessin(e){
//  console.log('e.touches[0]=',e.touches[0]);
  actionDownZoneDessin(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownZoneDessin(e){
  actionDownZoneDessin(e);
 }
 //========================================================================================================
 function actionDownZoneDessin(e){
//  console.log('actionDownZoneDessin ecran_appuye=',ecran_appuye);
  divlag1.innerHTML='';
  var modificationViewB=false;
  if(ecran_appuye===false){
   modificationViewB=true;
  }
  enCoursDeSelectionSansClickSurElement=false;
  initPosxy=null;
  if(_dssvg.mode_en_cours!=''){
   initPosxy=positionSouris(e);
   divlag1.innerHTML='<span>md0Z='+_dssvg.zoom1+'</span>,<span>sx='+initPosxy.sx+ '</span>,<span>sy=' + initPosxy.sy+'</span>';

   globalClickDessin.mouseStart=refZnDessin.createSVGPoint();
//   globalClickDessin.mouseStart.x = e.clientX; // position de la souris dans la fenetre du navigateur
//   globalClickDessin.mouseStart.y = e.clientY; // position de la souris dans la fenetre du navigateur

   globalClickDessin.mouseStart.x = initPosxy.sx;
   globalClickDessin.mouseStart.y = initPosxy.sy;

//    console.log('globalClickDessin.mouseStart=',globalClickDessin.mouseStart);
   if(refZnDessin!==groupeActif.refGroupe){ //groupeActif.idDansArbre!==0){
    // on se demande pourquoi il faut refaire ceci mais sans, ça ne marche plus au deuxième trait
    groupeActif.refGroupe=document.querySelectorAll('[data-idarbre1="'+groupeActif.idDansArbre+'"]')[0];
   }

    
   var tm=refZnDessin.getScreenCTM().inverse().multiply(groupeActif.refGroupe.getScreenCTM());
    
//    console.log('md corrigé globalClickDessin.mouseStart=',globalClickDessin.mouseStart);
    
   groupeActif.transform='matrix('+tm.a+','+tm.b+','+tm.c+','+tm.d+','+tm.e+','+tm.f+')' ;//  0,0)'; // '+tm.e+','+tm.f+')' ; //,0,0)';
   globalClickDessin.matriceRacineInverse=tm.inverse(); //groupeActif.refGroupe.getScreenCTM().inverse(); 
//   console.log( 'md avant transformation, globalClickDessin.mouseStart=' , globalClickDessin.mouseStart );
   globalClickDessin.mouseStart=globalClickDessin.mouseStart.matrixTransform(globalClickDessin.matriceRacineInverse);
   globalClickDessin.mouseStart.x=arrdi10000(globalClickDessin.mouseStart.x);
   globalClickDessin.mouseStart.y=arrdi10000(globalClickDessin.mouseStart.y);
//   console.log( 'md apres transformation, globalClickDessin.mouseStart=' , globalClickDessin.mouseStart );
   
   if(_dssvg.mode_en_cours==='setModeSaisieRectangle1'){

    ecran_appuye=true;
    modificationViewB=false;
    
//    console.log('globalClickDessin.mouseStart.x=',globalClickDessin.mouseStart.x);
    
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('x',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('y',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('width' ,0);
    globalClickDessin.tempchild.setAttribute('height',0);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0RectZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';

   }else if(_dssvg.mode_en_cours==='setModeSaisieLigne2'){
    
    ecran_appuye=true;
    modificationViewB=false;

    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    globalClickDessin.pointsTraces.push([globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]);
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'line');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('x1',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('y1',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('x2',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('y2',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0LZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
    
   }else if(_dssvg.mode_en_cours==='setModeSaisiePolygon1'){
    ecran_appuye=true;
    modificationViewB=false;

    globalClickDessin.mousePosPrecPolygon.x=globalClickDessin.mouseStart.x;
    globalClickDessin.mousePosPrecPolygon.y=globalClickDessin.mouseStart.y;
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polygon');
    globalClickDessin.tempchild.setAttribute('data-type'      , 'toRemove');
    globalClickDessin.tempchild.setAttribute('points'         , globalClickDessin.mouseStart.x+' '+globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke'         , _dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width'   , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill'           , 'transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    

    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0polyZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
    
   }else if(_dssvg.mode_en_cours==='setModeSaisiePolyline1'){
    
    ecran_appuye=true;
    modificationViewB=false;

    globalClickDessin.mousePosPrecPolygon.x=globalClickDessin.mouseStart.x;
    globalClickDessin.mousePosPrecPolygon.y=globalClickDessin.mouseStart.y;
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polyline');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('points',globalClickDessin.mouseStart.x+' '+globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0polyZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
     

   }else if(_dssvg.mode_en_cours==='setModeSaisieLigne1'){
    
    ecran_appuye=true;
    modificationViewB=false;

    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    globalClickDessin.pointsTraces.push([globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]);
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'path');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('d','M'+globalClickDessin.mouseStart.x+','+globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0LZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
    
    
    return;





    
   }else if(_dssvg.mode_en_cours==='setModeSaisieEllipse1'){
    ecran_appuye=true;
    modificationViewB=false;
    
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('cx',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('cy',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('rx' ,0);
    globalClickDessin.tempchild.setAttribute('ry' ,0);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0RectZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';

   }else if(_dssvg.mode_en_cours==='setModeSaisieCercle1'){
    
    ecran_appuye=true;
    modificationViewB=false;
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'circle');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('cx',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('cy',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('r' ,0);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0RectZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';

    
    
   }else if(_dssvg.mode_en_cours==='setModeSaisieChemin1'){

    ecran_appuye=true;
    modificationViewB=false;
    
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'path');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('d','M'+globalClickDessin.mouseStart.x+','+globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0PZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
    
   }else if(_dssvg.mode_en_cours=='setModeSaisieDeplace1'){
     ecran_appuye=true;
     modificationViewB=false;
     divLag1Pour({t:'viewBox',l:'vb0z'});
     
   }else if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' || _dssvg.mode_en_cours==='setModeSaisieDefsElt1' ){
    if(modificationViewB===true){
     enCoursDeSelectionSansClickSurElement=true;
    }
   }else if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || _dssvg.mode_en_cours==='setModeSaisieDefsPtE1'){
    if(modificationViewB===true){
     enCoursDeSelectionSansClickSurElement=true;
    }
   }else if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || 'setModeSaisieDefsTrE1'===_dssvg.mode_en_cours){
    if(modificationViewB===true){
     enCoursDeSelectionSansClickSurElement=true;
    }
   }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
//    console.log('modificationViewB=',modificationViewB);
    if(modificationViewB===true){
     enCoursDeSelectionSansClickSurElement=true;
    }
   }
  }
 }
 //========================================================================================================
 function divLag1Pour(opt){
  if(opt.t==='viewBox'){
   divlag1.innerHTML='<small>'+opt.l+'=</small><kbd>'+_dssvg.zoom1+'</kbd> <span style="color:red;">'+(_dssvg.viewBoxInit[0])+'</span><span style="color:red;">'+(_dssvg.viewBoxInit[1])+ '</span><span style="color:blue;">'+arrdi10000(_dssvg.viewBoxInit[2])+'</span><span style="color:blue;">'+arrdi10000(_dssvg.viewBoxInit[3])+'</span>';
  }else{
   var t='<small>'+opt.l+'=</small><kbd>'+_dssvg.zoom1+'</kbd> ';
   for(var n in opt){
    if(!( n==='t' || n==='l')){
     t+='<span style="color:red;">'+n+'='+opt[n]+'</span>';
    }
   }
   divlag1.innerHTML=t;
  }
 }
 //========================================================================================================
 function touchMoveZoneDessin(e){
//  console.log('touchMoveZoneDessin');
  e.stopPropagation();
  e.preventDefault();
  moveZoneDessin(e.touches[0]);
 }
 //========================================================================================================
 function mouseMoveZoneDessin(e){
//  console.log('mouseMoveZoneDessin');
  e.stopPropagation();
  e.preventDefault();
  moveZoneDessin(e);
 }
 var enCoursDeSelectionSansClickSurElement=false;
 //========================================================================================================
 function moveZoneDessin(e){
//  console.log('moveZoneDessin',enCoursDeSelectionSansClickSurElement , ecran_appuye , e.clientX , _dssvg.mode_en_cours);
//  var pos=positionSouris(e);
  globalDernierePositionSouris=positionSouris(e);
  
  
  if(enCoursDeSelectionSansClickSurElement===true){
   if(_dssvg.aimanterPixel1!==0){
    var newX=Math.round((_dssvg.viewBoxInit[0]+initPosxy.x-globalDernierePositionSouris.x)*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
    var newY=Math.round((_dssvg.viewBoxInit[1]+initPosxy.y-globalDernierePositionSouris.y)*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
   }else{
    var newX=Math.round((_dssvg.viewBoxInit[0]+initPosxy.x-globalDernierePositionSouris.x)*10)/(10);
    var newY=Math.round((_dssvg.viewBoxInit[1]+initPosxy.y-globalDernierePositionSouris.y)*10)/(10);
   }
//   console.log('newX=',newX , 'newy=',newY,'_dssvg.aimanterPixel1='+_dssvg.aimanterPixel1)
   _dssvg.viewBoxInit[0]=newX;
   _dssvg.viewBoxInit[1]=newY;
//   refZnDessin.setAttribute('viewBox',(newX)+' '+(newY)+' '+(_dssvg.viewBoxInit[2])+' '+(_dssvg.viewBoxInit[3])+' ')
   setAttributeViewBox();  
   
   divLag1Pour({t:'viewBox',l:'vb1z'});
   
   return;
   
  }
  
  if(ecran_appuye===false){
   if(_dssvg.aimanterPixel1!==0){
    var posmx=Math.round(globalDernierePositionSouris.sx*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
    var posmy=Math.round(globalDernierePositionSouris.sy*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
   }else{
    var posmx=Math.round(globalDernierePositionSouris.sx*10)/(10);
    var posmy=Math.round(globalDernierePositionSouris.sy*10)/(10);
   }
   divLag1Pour({t:'mmFz',l:'mmFz','sx':posmx,'sy':posmy});
  }else if(ecran_appuye!==false){
   if(_dssvg.mode_en_cours!=''){
    
    if(_dssvg.mode_en_cours==='setModeSaisieRectangle1'){

     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     
     var width=current.x - globalClickDessin.pointsTraces[0][0];
     var x=globalClickDessin.pointsTraces[0][0];
     if(width<0){
      width=-width;
      x=current.x;
     }
     var height=current.y-globalClickDessin.pointsTraces[0][1];
     var y=globalClickDessin.pointsTraces[0][1];
     if(height<0){
      height=-height;
      y=current.y;
     }
     x=arrdi10000(x);
     y=arrdi10000(y);
     width=arrdi10000(width);
     height=arrdi10000(height);
     globalClickDessin.tempchild.setAttribute('x'      , x );
     globalClickDessin.tempchild.setAttribute('width'  , width  );
     globalClickDessin.tempchild.setAttribute('y'      , y );
     globalClickDessin.tempchild.setAttribute('height' , height );

     divLag1Pour({t:'mmrec',l:'mmrec','x':x,'y':y,'w':width,'h':height});
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieLigne2'){
     
     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     current.x=arrdi10000(current.x);
     current.y=arrdi10000(current.y);

     globalClickDessin.pointsTraces[1]=[current.x , current.y];
     globalClickDessin.tempchild.setAttribute('x1' , globalClickDessin.pointsTraces[0][0]);
     globalClickDessin.tempchild.setAttribute('y1' , globalClickDessin.pointsTraces[0][1]);
     globalClickDessin.tempchild.setAttribute('x2' , globalClickDessin.pointsTraces[1][0]);
     globalClickDessin.tempchild.setAttribute('y2' , globalClickDessin.pointsTraces[1][1]);

     divLag1Pour({t:'mmpl',l:'mmpl','x':globalClickDessin.pointsTraces[1][0],'y':globalClickDessin.pointsTraces[1][1]});

    }else if(_dssvg.mode_en_cours==='setModeSaisiePolygon1'){
     
     try {clearTimeout(defTimeoutPolygon);}catch(e){}
     globalClickDessin.currentPolygon=refZnDessin.createSVGPoint();
     globalClickDessin.currentPolygon.x = globalDernierePositionSouris.sx; 
     globalClickDessin.currentPolygon.y = globalDernierePositionSouris.sy;
     
     
     globalClickDessin.currentPolygon=globalClickDessin.currentPolygon.matrixTransform(globalClickDessin.matriceRacineInverse);
     globalClickDessin.currentPolygon.x=arrdi10000(globalClickDessin.currentPolygon.x);
     globalClickDessin.currentPolygon.y=arrdi10000(globalClickDessin.currentPolygon.y);
     globalClickDessin.mousePosPrecPolygon.x=globalClickDessin.currentPolygon.x;
     globalClickDessin.mousePosPrecPolygon.y=globalClickDessin.currentPolygon.y;
 
     // si on a mis que le premier point ou le deuxième point
     if(globalClickDessin.pointsTraces.length <= 2 ){
      globalClickDessin.pointsTraces[1]=[globalClickDessin.currentPolygon.x , globalClickDessin.currentPolygon.y];
      var tt='  '+globalClickDessin.pointsTraces[0][0] + ' '+globalClickDessin.pointsTraces[0][1] + '  ';
      for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
       tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
      }
      globalClickDessin.tempchild.setAttribute('points' , tt );
      defTimeoutPolygon=setTimeout( timeOutPolygon , 500 );
     }else{
      globalClickDessin.pointsTraces[globalClickDessin.pointsTraces.length-1]=[globalClickDessin.currentPolygon.x , globalClickDessin.currentPolygon.y];
      var tt='  '+globalClickDessin.pointsTraces[0][0] + ' '+globalClickDessin.pointsTraces[0][1] + '  ';
      for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
       tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
      }
//      console.log('tt=',tt);
      globalClickDessin.tempchild.setAttribute('points' , tt );
      defTimeoutPolygon=setTimeout( timeOutPolygon , 500 );
     }
     divLag1Pour({t:'mmpg',l:'mmpg','x':globalClickDessin.currentPolygon.x,'y':globalClickDessin.currentPolygon.y});
     

    }else if(_dssvg.mode_en_cours==='setModeSaisiePolyline1'){
     
     try {clearTimeout(defTimeoutPolyline);}catch(e){}
     globalClickDessin.currentPolyline=refZnDessin.createSVGPoint();
     globalClickDessin.currentPolyline.x = globalDernierePositionSouris.sx; 
     globalClickDessin.currentPolyline.y = globalDernierePositionSouris.sy;
     
     globalClickDessin.currentPolyline=globalClickDessin.currentPolyline.matrixTransform(globalClickDessin.matriceRacineInverse);
     globalClickDessin.currentPolyline.x=arrdi10000(globalClickDessin.currentPolyline.x);
     globalClickDessin.currentPolyline.y=arrdi10000(globalClickDessin.currentPolyline.y);
     globalClickDessin.mousePosPrecPolyline.x=globalClickDessin.currentPolyline.x;
     globalClickDessin.mousePosPrecPolyline.y=globalClickDessin.currentPolyline.y;
 
     // si on a mis que le premier point ou le deuxième point
     if(globalClickDessin.pointsTraces.length <= 2 ){
      globalClickDessin.pointsTraces[1]=[globalClickDessin.currentPolyline.x , globalClickDessin.currentPolyline.y];
      var tt='  '+globalClickDessin.pointsTraces[0][0] + ' '+globalClickDessin.pointsTraces[0][1] + '  ';
      for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
       tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
      }
      globalClickDessin.tempchild.setAttribute('points' , tt );
      defTimeoutPolyline=setTimeout( timeOutPolyline , 500 );
     }else{
      globalClickDessin.pointsTraces[globalClickDessin.pointsTraces.length-1]=[globalClickDessin.currentPolyline.x , globalClickDessin.currentPolyline.y];
      var tt='  '+globalClickDessin.pointsTraces[0][0] + ' '+globalClickDessin.pointsTraces[0][1] + '  ';
      for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
       tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
      }
//      console.log('tt=',tt);
      globalClickDessin.tempchild.setAttribute('points' , tt );
      defTimeoutPolyline=setTimeout( timeOutPolyline , 500 );
     }
     divLag1Pour({t:'mmpl',l:'mmpl','x':globalClickDessin.currentPolyline.x,'y':globalClickDessin.currentPolyline.y});
     
 
      

    }else if(_dssvg.mode_en_cours==='setModeSaisieLigne1'){
     
     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     current.x=arrdi10000(current.x);
     current.y=arrdi10000(current.y);

     globalClickDessin.pointsTraces[1]=[current.x , current.y];
     globalClickDessin.tempchild.setAttribute('d' , 'M '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + ' L '+globalClickDessin.pointsTraces[1][0] + ','+globalClickDessin.pointsTraces[1][1] )

     divLag1Pour({t:'mmplc',l:'mmplc','x':current.x,'y':current.x});

     return;     
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieEllipse1'){
     
     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     var rx=(current.x - globalClickDessin.pointsTraces[0][0]);
     var ry=(current.y - globalClickDessin.pointsTraces[0][1]);
     if(rx<0){
      rx=-rx;
      var cx=current.x+rx;
     }else{
      var cx=current.x-rx;
     }
     if(ry<0){
      ry=-ry;
      var cy=current.y+ry;
     }else{
      var cy=current.y-ry;
     }
     cx=arrdi10000(cx);
     cy=arrdi10000(cy);
     rx=arrdi10000(rx);
     ry=arrdi10000(ry);
     globalClickDessin.tempchild.setAttribute('cx' , cx );
     globalClickDessin.tempchild.setAttribute('cy' , cy );
     globalClickDessin.tempchild.setAttribute('rx' , rx );
     globalClickDessin.tempchild.setAttribute('ry' , ry );

     divLag1Pour({t:'mmeli',l:'mmeli','cx':cx,'cy':cy,'rx':rx,'ry':ry});

    }else if(_dssvg.mode_en_cours==='setModeSaisieCercle1'){

     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     var r=((current.x - globalClickDessin.pointsTraces[0][0])+(current.y - globalClickDessin.pointsTraces[0][1]))/2;
     if(r<0){
      r=-r;
      var cx=current.x+r;
      var cy=current.y+r;
     }else{
      var cx=current.x-r;
      var cy=current.y-r;
     }
     cx=arrdi10000(cx);
     cy=arrdi10000(cy);
     r=arrdi10000(r);
     globalClickDessin.tempchild.setAttribute('cx'      , cx );
     globalClickDessin.tempchild.setAttribute('cy'      , cy );
     globalClickDessin.tempchild.setAttribute('r'       , r );

     divLag1Pour({t:'mmcer',l:'mmcer','cx':cx,'cy':cy,'r':r});


    }else if(_dssvg.mode_en_cours==='setModeSaisieChemin1'){

     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     
     current.x=arrdi10000(current.x);
     current.y=arrdi10000(current.y);
     
     globalClickDessin.pointsTraces.push([current.x , current.y]);
     var t='M '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + ' L '; // arrdi10000(
     for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
      t+=globalClickDessin.pointsTraces[i].join(' ')+' ';
     }
     globalClickDessin.tempchild.setAttribute('d' , t );
     
     divLag1Pour({t:'mmche',l:'mmche','x':current.x,'y':current.y});
     
     
     
    }else if(_dssvg.mode_en_cours=='setModeSaisieDeplace1'){

     if(_dssvg.aimanterPixel1!==0){
      var newX=Math.round((_dssvg.viewBoxInit[0]+initPosxy.x-globalDernierePositionSouris.x)*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
      var newY=Math.round((_dssvg.viewBoxInit[1]+initPosxy.y-globalDernierePositionSouris.y)*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
     }else{
      var newX=Math.round((_dssvg.viewBoxInit[0]+initPosxy.x-globalDernierePositionSouris.x)*10)/(10);
      var newY=Math.round((_dssvg.viewBoxInit[1]+initPosxy.y-globalDernierePositionSouris.y)*10)/(10);
     }
  //   console.log('newX=',newX , 'newy=',newY,'_dssvg.aimanterPixel1='+_dssvg.aimanterPixel1)
     _dssvg.viewBoxInit[0]=newX;
     _dssvg.viewBoxInit[1]=newY;
//     refZnDessin.setAttribute('viewBox',(newX)+' '+(newY)+' '+(_dssvg.viewBoxInit[2])+' '+(_dssvg.viewBoxInit[3])+' ')
     setAttributeViewBox();  
     divLag1Pour({t:'viewBox',l:'vb2z'});
     
     
    }else if(_dssvg.mode_en_cours=='setModeSaisieSelElt1' || _dssvg.mode_en_cours==='setModeSaisieDefsElt1' ){
     
     
     if('deplaceElement'===ecran_appuye){
      actMovElementPosition(e);
     }else if('tailleElement' ===ecran_appuye){
      actMovElementTaille(e); 
     }
      
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1' === _dssvg.mode_en_cours ){
     
     if('deplacementPoint'===ecran_appuye){
      actionMoveSelectionPtElement(e);
     }
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || _dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
     
     if('fElementTransformAngle2'===ecran_appuye){
      fElementTransformAngle2(e);
     }else if('fElementTransformCentreRotation'===ecran_appuye){
      fElementTransformCentreRotation(e);
     }else if('felementTransformEchelle3'===ecran_appuye){
      felementTransformEchelle3(e);
     }else if('fElementTransformSkewx'===ecran_appuye){
      fElementTransformSkewx(e);
     }else if('fElementTransformTranslate1'===ecran_appuye){
      fElementTransformTranslate1(e);
     }
     
    }
   }
  }
 }
 //========================================================================================================
 function recupCheminVersRelatif( indPoint , tbOriginal, tbAbsolu , nuArbr ){
  var ttemp=JSON.parse(JSON.stringify(tbOriginal[indPoint]));
  var dx=0;
  var dy=0;
  var xDetermine=false;
  var yDetermine=false;
  for(var j=indPoint-1;j>=0 && !( xDetermine===true && yDetermine===true );j--){
   if(tbAbsolu[j].length>=3){
    if(xDetermine===false){
     xDetermine=true;
     dx=tbAbsolu[j][tbAbsolu[j].length-2];
    }
    if(yDetermine===false){
     yDetermine=true;
     dy=tbAbsolu[j][tbAbsolu[j].length-1];
    }          
   }else if(tbAbsolu[j].length==2){
    if(tbAbsolu[j][0]==='H'){
     if(xDetermine===false){
      xDetermine=true;
      dx=tbAbsolu[j][tbAbsolu[j].length-1];
     }
    }else if(tbAbsolu[j][0]==='V'){
     if(yDetermine===false){
      yDetermine=true;
      dy=tbAbsolu[j][tbAbsolu[j].length-1];
     }
    }
   }
  }
//         console.log('dx=',dx,'dy=',dy);
  if(ttemp[0]==ttemp[0].toLowerCase()){
   // rien à faire
  }else if(ttemp[0]=='C'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
   ttemp[5]=arrdi10000(ttemp[5]-dx);
   ttemp[6]=arrdi10000(ttemp[6]-dy);
  }else if(ttemp[0]=='S'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
  }else if(ttemp[0]=='L'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='V'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dy);
  }else if(ttemp[0]=='H'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
  }else if(ttemp[0]=='Q'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
  }else if(ttemp[0]=='T'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='M'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='A'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[6]=arrdi10000(ttemp[6]-dx);
   ttemp[7]=arrdi10000(ttemp[7]-dy);
  }else if(ttemp[0]=='Z'){
  }else{
   console.warn('%ctraiter ttemp[0]=','color:purple;',ttemp[0])
   todo();
  }
  return ttemp.join(' ');  
 }
 
 //========================================================================================================
 function traiterAction(txt){
//  console.log('traiterAction txt=',txt);
  try{
   var jso=JSON.parse(txt);
//   console.log('jso=',jso);
   if('supptransform1'===jso.action){
    var supTr=supptransform1(jso.numArbre,jso.numTransform);
    if(supTr.statut===true){
     globalGeneralSvgReferenceElement=supTr.elem;
    }
    afficheArbre0({prendreTout:false});
    return supTr.statut;
   }else if('pointEnAbsolu'===jso.action || 'pointEnRelatif'===jso.action || 'largeArc'===jso.action || 'sweepFlag'===jso.action ){
    // console.log('jso=',jso);
    // {action: 'pointEnAbsolu', numArbre: 23, indicePoint: 1, nouvPoint: 'C -31 1127 -61 1120 -58 1089'}
    if(globalSelectionPoints.tabOriginal!==null && globalSelectionPoints.tabAbsolu!==null){
     globalSelectionPoints.tabOriginal[jso.indicePoint]=jso.nouvPoint.split(' ');
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i++){
      tt+=' '+globalSelectionPoints.tabOriginal[i].join(' ')+ '  ';
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
     }
     afficheArbre0({init:false});
    }
   }else if('cheminCompletEnAbsolu'===jso.action){
    if(globalSelectionPoints.tabOriginal!==null && globalSelectionPoints.tabAbsolu!==null){
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabAbsolu.length;i++){
      tt+=''+globalSelectionPoints.tabAbsolu[i].join(' ')+'   ';
     }
//     console.log('tt=',tt);
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
     }     
     afficheArbre0({init:false});
    }
   }else if('cheminCompletEnRelatif'===jso.action){
    if(globalSelectionPoints.tabOriginal!==null && globalSelectionPoints.tabAbsolu!==null){
     var tt='';
     // M 10,10    20 20 30 30 M 50,60 q 80,-60 100,15 T 200,75   250 75   300 75   350 75 t 50 0 50 0 
     // m 10 9                 m 40 51   q 30 -120 50 -45   t 50 0   t 50 0   t 50 0   t 50 0   t -300 -75   t -350 -75   
     // m 10 10 l 20 20 l 30 30 m 10 0 
//     console.log( 'avant on a :     m 10 10 l 20 20 l 30 30 m 10 0 ');
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i++){
//      var obj=recupRelatifVersAbsolu(i , globalSelectionPoints.tabOriginal , globalSelectionPoints.tabAbsolu , jso.numArbre );
      var nouvelleChaine=recupCheminVersRelatif(i , globalSelectionPoints.tabOriginal , globalSelectionPoints.tabAbsolu , jso.numArbre );
      tt+=nouvelleChaine+'   ';
//      console.log('nouvelleChaine=' , nouvelleChaine ); //, 'obj=',obj);
     }
//     console.log('tt=',tt);
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
     }     
     afficheArbre0({init:false});
    }
    
   }else if('ajouterPointPolyAvant'===jso.action){
    if(globalSelectionPoints.tabOriginal!==null){
     var nt=[];
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
      var xprec=globalSelectionPoints.tabOriginal[i];
      var yprec=globalSelectionPoints.tabOriginal[i+1];
      if(i==jso.indicePoint){
       tt+=' '+(xprec-3*32/_dssvg.zoom1) + ' ' + (yprec-3*32/_dssvg.zoom1) + ' ';
       nt.push(xprec-3*32/_dssvg.zoom1);
       nt.push(yprec-3*32/_dssvg.zoom1);
      }
      nt.push(xprec);
      nt.push(yprec);
      tt+=' '+xprec + ' ' + yprec + ' ';
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['points']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('points',tt);
      globalSelectionPoints.tabOriginal=nt;
     }
     afficheArbre0({init:false});
    }
   }else if('ajouterPointPolyApres'===jso.action){
//       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointPolylineApres","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">ajouter point apres</button>';
    if(globalSelectionPoints.tabOriginal!==null){
     var nt=[];
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
      var xprec=globalSelectionPoints.tabOriginal[i];
      var yprec=globalSelectionPoints.tabOriginal[i+1];
      nt.push(xprec);
      nt.push(yprec);
      tt+=' '+xprec + ' ' + yprec + ' ';
      if(i==jso.indicePoint){
       tt+=' '+(xprec+3*32/_dssvg.zoom1) + ' ' + (yprec+3*32/_dssvg.zoom1) + ' ';
       nt.push(xprec+3*32/_dssvg.zoom1);
       nt.push(yprec+3*32/_dssvg.zoom1);
      }
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['points']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('points',tt);
      globalSelectionPoints.tabOriginal=nt;
     }
     afficheArbre0({init:false});
     
    }
    
   }else if('supprimerPointPolyline'===jso.action){
//       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"supprimerPointPolyline","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')
    if(globalSelectionPoints.tabOriginal!==null){
     var nt=[];
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
      var xprec=globalSelectionPoints.tabOriginal[i];
      var yprec=globalSelectionPoints.tabOriginal[i+1];
      if(i==jso.indicePoint){
      }else{
       nt.push(xprec);
       nt.push(yprec);
       tt+=' '+xprec + ' ' + yprec + ' ';
      }
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['points']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('points',tt);
      globalSelectionPoints.tabOriginal=nt;
      globalIndicePoint=null;
     }
     afficheArbre0({init:false});
     
    }
   }else if('SupprimerPointChemin'===jso.action){
    if(globalSelectionPoints.tabOriginal!==null){
     var nto=[];
     var tt='';
//     console.log('globalSelectionPoints.tabOriginal=' , globalSelectionPoints.tabOriginal );
     var pDebPrec={x:null,y:null};
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=1){
      if(i===jso.indicePoint){
       if(globalSelectionPoints.tabOriginal[i][0]==='C'){
        pDebPrec.x=globalSelectionPoints.tabOriginal[i][1];
        pDebPrec.y=globalSelectionPoints.tabOriginal[i][2];
       }
      }else if(i!==jso.indicePoint){
       if(i===jso.indicePoint+1 && pDebPrec.x!==null && globalSelectionPoints.tabOriginal[i][0]==='C'){
        globalSelectionPoints.tabOriginal[i][1]=pDebPrec.x;
        globalSelectionPoints.tabOriginal[i][2]=pDebPrec.y;
       }
       nto.push(globalSelectionPoints.tabOriginal[i]);
       tt+='  '+ globalSelectionPoints.tabOriginal[i].join(' ')+ ' ';
      }
     }
 //     console.log('tt=',tt);
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
      
      globalIndicePoint=null;
     }
     afficheArbre0({init:false});
    }
   }else if('ajouterPointChemin'===jso.action){
    
    // {"action":"ajouterPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"typePointChemin":"'+typePointChemin[i]+'"}
    if(globalSelectionPoints.tabOriginal!==null){
     var nto=[];
     var tt='';
//     console.log('globalSelectionPoints.tabOriginal=' , globalSelectionPoints.tabOriginal );
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=1){
      tt+='  '+ globalSelectionPoints.tabOriginal[i].join(' ')+ ' ';
      if(i===jso.indicePoint){
       if(jso.typePointChemin==='M'){
        tt+='  m '+(64/_dssvg.zoom1)+' '+(64/_dssvg.zoom1)+'  ';
       }else if(jso.typePointChemin==='L'){
        tt+='  l '+(64/_dssvg.zoom1)+' '+(64/_dssvg.zoom1)+'  ';
       }else if(jso.typePointChemin==='C'){
        tt+='  c 0 '+(-64/_dssvg.zoom1)+'    '+(64/_dssvg.zoom1)+' '+(-64/_dssvg.zoom1)+'   '+(64/_dssvg.zoom1)+' 0 ';
       }else if(jso.typePointChemin==='S'){
        tt+='  s     '+(64/_dssvg.zoom1)+' '+(-64/_dssvg.zoom1)+'   '+(64/_dssvg.zoom1)+' 0   ';
       }else if(jso.typePointChemin==='Q'){
        tt+='  q     '+(64/_dssvg.zoom1)+' '+(-64/_dssvg.zoom1)+'   '+(64/_dssvg.zoom1)+' 0   ';
       }else if(jso.typePointChemin==='T'){
        tt+='  t  '+(64/_dssvg.zoom1)+' 0   ';
       }else if(jso.typePointChemin==='H'){
        tt+='  h  '+(64/_dssvg.zoom1)+'  ';
       }else if(jso.typePointChemin==='V'){
        tt+='  v  '+(64/_dssvg.zoom1)+'  ';
       }else if(jso.typePointChemin==='A'){
        tt+='  a  '+(64/_dssvg.zoom1)+' '+(64/_dssvg.zoom1)+'  0 1 1   '+(64/_dssvg.zoom1)+'   '+(64/_dssvg.zoom1)+' ';
       }else if(jso.typePointChemin==='Z'){
        tt+='  z  ';
       }
      }
     }
//     console.log('tt=',tt);
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
//      globalIndicePoint+=1;
     }
     afficheArbre0({init:false});
    }
   }else if('strokeElement'===jso.action || 'fillElement'===jso.action){
//    console.log('jso=',jso);
    colorPickerData.numArbre=jso.numArbre;
    colorPickerData.value=jso.valeur;
    colorPickerData.id=null;
    colorPickerData.context=''+jso.action+'';
    popupCouleurs(null);
    
   }else if('stroke-width' === jso.action){
    
//    console.log('jso=',jso);
    strokeData.numArbre=jso.numArbre;
    strokeData.value=jso.valeur;
    strokeData.context=''+jso.action+'';
    popupStroke(null)
    
   }else if('stroke-opacity' === jso.action || 'fill-opacity' === jso.action){
    
//    console.log('jso=',jso);
    strokeData.numArbre=jso.numArbre;
    strokeData.value=jso.valeur;
    strokeData.context=''+jso.action+'';
    popupOpacity(null)
    
   }else if('simplifierChemin1'===jso.action){
    
    if(globalGeneralSvgReferenceElement){
     var tt=globalGeneralSvgReferenceElement.getAttribute('d');
     if(tt){
      tt=simplifierUnChemin(tt,jso.strkWidth);
      
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
      globalIndicePoint=0;
     
      var indA=recupereIndiceArbre(jso.numArbre);
      globalGeneralSvgReferenceElement.setAttribute('d' , tt );
      _dssvg.arbre0[indA].data.attributes['d']=tt;
     
      
      afficheArbre0({init:false});

      
      
     }
    }
    
   }else if('wiEtHeImageVide'===jso.action){
    
    var indA=recupereIndiceArbre(jso.numArbre);
    globalGeneralSvgReferenceElement.removeAttribute('width');
    globalGeneralSvgReferenceElement.removeAttribute('height');
    var obj=_dssvg.arbre0[indA].data.attributes;
    var nobj={};
    for(var n in obj){
     if(n==='width' || n==='height'){
     }else{
      nobj[n]=obj[n];
     }
    }
    _dssvg.arbre0[indA].data.attributes=nobj;
    afficheArbre0({init:false});
    
   }else if('opacity'===jso.action){
    strokeData.numArbre=jso.numArbre;
    strokeData.value=jso.valeur;
    strokeData.context=''+jso.action+'';
    popupOpacity(null);
    
   }else if('suppAttribGra1'===jso.action){
    var indA=recupereIndiceArbre(jso.numArbre);
//    console.log( '_dssvg.arbre0[indA].data.attributes=' , _dssvg.arbre0[indA].data.attributes );
    for( n in _dssvg.arbre0[indA].data.attributes){
     if(n==='style' || n==='fill' || n==='fill-opacity' || n==='stroke' || n==='stroke-width' || n==='stroke-opacity'  || n==='stroke-linecap'  || n==='stroke-linejoin' ){
      _dssvg.arbre0[indA].data.attributes[n]='';
     }
    }
    afficheArbre0({init:false});
   }else if('suppAttribGraDuGroupe1'===jso.action){
    for( i=0;i<_dssvg.arbre0.length;i++){
     if(_dssvg.arbre0[i].parentId===jso.numArbre){
      for( n in _dssvg.arbre0[i].data.attributes){
       if(n==='style' || n==='fill' || n==='fill-opacity' || n==='stroke' || n==='stroke-width' || n==='stroke-opacity'  || n==='stroke-linecap'  || n==='stroke-linejoin' ){
        _dssvg.arbre0[i].data.attributes[n]='';
       }
      }
     }
    }
    afficheArbre0({init:false});
    
   }else if('popupPropEltsGrp1'===jso.action){
    //    lstAttribs=['id','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform','line-cap','enable-background','filter','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-dasharray'];
    popupPropEltsGrp1(jso);

    
   }else if('selectionnerGroupeDessous1'===jso.action){
//        t+='<button class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"selectionnerGroupeDessous1"  ,"idAutre":'+idAutre+',"idCourant":'+_dssvg.idArbreCourant+'}')+'">selectionner le groupe '+idAutre+' sous le '+_dssvg.idArbreCourant+' actuel</button>';
    _dssvg.idArbreCourant=parseInt(jso.idAutre,10);
    afficheArbre0({init:false});
    var lst=document.querySelectorAll('[data-elem="'+jso.idCourant+' hg"]'); // 
    try{
     for(var i=lst.length-1;i>=0;i--){
      lst[i].remove();
     }
     
    }catch(e){
    }
   
    
   }else if('hOuVenL1'===jso.action){
    
    if(globalGeneralSvgReferenceElement){
     var tt=globalGeneralSvgReferenceElement.getAttribute('d');
     if(tt){ // M 0 0 h 30 v 30 h -30 v -15 z m 5 5 h 20 v 20 h -20 z
//      console.log('avant tt=' , tt);
      var obj=getPointsFromSvgPath(tt);
//      console.log('obj=',obj);
      tt='';
      for(var i=0;i<obj.tabAbs.length;i++){
       if(obj.tabAbs[i][0]==='H' || obj.tabAbs[i][0]==='V' ){
        tt+=' '+obj.tabPts[i].join(' ');
       }else{
        tt+=' '+obj.tabAbs[i].join(' ');
       }
      }
//      console.log('final tt=' , tt);
      
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var indA=recupereIndiceArbre(jso.numArbre);
      _dssvg.arbre0[indA].data.attributes['d']=tt;
      
      afficheArbre0({init:false});
     }
    }

   }else if('redimEltsGrp'===jso.action){
    popupRedimEltsGrp1(jso);
   }else if('redimElt1'===jso.action){
    popupRedimEltsGrp1(jso);
   }else if('enC1'===jso.action){
    var tt=globalGeneralSvgReferenceElement.getAttribute('d');
    if(tt && jso.indicePoint>0){
     var obj=getPointsFromSvgPath(tt);
//     console.log('obj=',obj);
     obj.tabOri[jso.indicePoint]=['C',obj.tabPts[jso.indicePoint-1][1],obj.tabPts[jso.indicePoint-1][2],obj.tabPts[jso.indicePoint][1],obj.tabPts[jso.indicePoint][2],obj.tabPts[jso.indicePoint][1],obj.tabPts[jso.indicePoint][2] ]
     tt='';
     for(var i=0;i<obj.tabOri.length;i++){
      tt+=' '+obj.tabOri[i].join(' ');
     }
     globalGeneralSvgReferenceElement.setAttribute('d',tt);
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     
    }
    afficheArbre0({init:false});
   
   }
   
  }catch(e){
   console.warn('%cErreur à traiter','background:yellow;color:red;','txt=',txt,'e=',e);
  }
  return false;
 }
 //========================================================================================================
 function setOpacity(e){
  majPropArbre(strokeData.numArbre , strokeData.context , strokeData.value );
  closePopup();
 }
 //========================================================================================================
 function changeOpacity(e){
//  console.log('e=',e.target , parseFloat(e.target.getAttribute('data-ajouterRetrancher')) );
  if(e.target.getAttribute('data-ajouterRetrancher')){
   var nouvelleValeur=Math.round( (parseFloat( dogid('parOpacityValeur').getAttribute('data-valeur') ) + parseFloat(e.target.getAttribute('data-ajouterRetrancher')) )*1000)/1000 ;
   if(nouvelleValeur>=0 && nouvelleValeur<=1){
    strokeData.value=nouvelleValeur;
    dogid('parOpacityValeur').setAttribute('data-valeur', nouvelleValeur );
    dogid('parOpacityValeur').innerHTML=nouvelleValeur;
   }
  }else{
   strokeData.value=parseFloat(e.target.getAttribute('data-fixer'));
   majPropArbre(strokeData.numArbre , strokeData.context , strokeData.value );
   closePopup();
  }
 }
 //========================================================================================================
 function popupOpacity(e){
  var contentOfPopup='<h3>'+trad['Gérer_l_opacité']+' ('+strokeData.context+')</h3>';
  
  contentOfPopup+='<div  id="opacityButs" style="display:flex;flex-direction: column;margin-top:3px;">';
  var valeur=0;
  try{
   valeur=parseFloat(strokeData.value);
   if(isNaN(valeur)){
    valeur=1;
   }
  }catch(e){}
  strokeData.value=valeur;

  contentOfPopup+='<button id="parOpacityValeur" class="butEnabled butMenuGauche"  style="display:inline-block;min-width:7rem;margin:5px auto 5px auto;text-align:center;font-size:2em;min-height: 1.5em;" data-valeur="'+valeur+'">'+valeur+'</button>';
  var tabs=[0.1,0.01,0.001];
  for(var j=0;j<tabs.length;j++){
   contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
    contentOfPopup+='<button class="butEnabled butMenuGauche" data-ajouterRetrancher="-'+tabs[j]+'" style="min-width:4em;">-'+tabs[j]+'</button>&nbsp;';
    contentOfPopup+='<button class="butEnabled butMenuGauche" data-ajouterRetrancher="+'+tabs[j]+'" style="min-width:4em;">+'+tabs[j]+'</button>&nbsp;';
   contentOfPopup+='</div>';
  }
  contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="1"    style="min-width:4em;">1</button>';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="0.75" style="min-width:4em;">0.8</button>';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="0.5"  style="min-width:4em;">0.5</button>';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="0.25" style="min-width:4em;">0.25</button>';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="0"    style="min-width:4em;">0</button>';
  contentOfPopup+='</div>';
   
  contentOfPopup+='</div>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  var lst=dogid('opacityButs').getElementsByTagName('button');
  for( var i=0;i<lst.length;i++){
   lst[i].addEventListener('click' , changeOpacity , 'button' )
  }
  dogid('parOpacityValeur').addEventListener('click' , setOpacity , 'button' )
  
  showPopUp('popupOpacity');  
  
 }
 
 
 //========================================================================================================
 function setStrokeWidth(e){
  majPropArbre(strokeData.numArbre , strokeData.context , strokeData.value );
  _dssvg.strokeWidth1=strokeData.value;
  closePopup();
 }
 //========================================================================================================
 function changeStrokeWidth(e){
//  console.log('e=',e.target , parseFloat(e.target.getAttribute('data-ajouterRetrancher')) );
  if(e.target.getAttribute('data-ajouterRetrancher')){
   var nouvelleValeur=Math.round( (parseFloat( dogid('parStrokeValeur').getAttribute('data-valeur') ) + parseFloat(e.target.getAttribute('data-ajouterRetrancher')) )*1000)/1000 ;
   if(nouvelleValeur>=0 && nouvelleValeur<=100){
    strokeData.value=nouvelleValeur;
    dogid('parStrokeValeur').setAttribute('data-valeur', nouvelleValeur );
    dogid('parStrokeValeur').innerHTML=nouvelleValeur;
   }
  }else if(e.target.getAttribute('data-fixer')){
   strokeData.value=parseFloat(e.target.getAttribute('data-fixer'));
   majPropArbre(strokeData.numArbre , strokeData.context , strokeData.value );
   _dssvg.strokeWidth1=strokeData.value;
   closePopup();
  }
 }
 //========================================================================================================
 function popupStroke(e){
  var contentOfPopup='<h3>'+trad['Gérer_l_épaisseur_du_trait']+' ('+strokeData.context+')</h3>';
  
  contentOfPopup+='<div  id="strokeButs" style="display:flex;flex-direction: column;margin-top:3px;">';
  var valeur=0;
  try{
   valeur=parseFloat(strokeData.value);
   if(isNaN(valeur)){
    valeur=1;
   }
  }catch(e){}
  strokeData.value=valeur;

   contentOfPopup+='<button id="parStrokeValeur" class="butEnabled butMenuGauche"  style="display:inline-block;min-width:7rem;margin:5px auto 5px auto;text-align:center;font-size:2em;min-height: 1.5em;" data-valeur="'+valeur+'">'+valeur+'</button>';
   var tabs=[10,1,0.1,0.01,0.001,0.0001];
   for(var j=0;j<tabs.length;j++){
    contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
     contentOfPopup+='<button class="butEnabled butMenuGauche" data-ajouterRetrancher="-'+tabs[j]+'" style="min-width:4em;">-'+tabs[j]+'</button>&nbsp;';
     contentOfPopup+='<button class="butEnabled butMenuGauche" data-ajouterRetrancher="+'+tabs[j]+'" style="min-width:4em;">+'+tabs[j]+'</button>&nbsp;';
     contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="+'+tabs[j]+'" style="min-width:4em;">'+tabs[j]+'</button>';
    contentOfPopup+='</div>';
   }
   
  contentOfPopup+='</div>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  var lst=dogid('strokeButs').getElementsByTagName('button');
  for( var i=0;i<lst.length;i++){
   lst[i].addEventListener('click' , changeStrokeWidth , 'button' )
  }
  dogid('parStrokeValeur').addEventListener('click' , setStrokeWidth , 'button' )
  
  showPopUp('popupStroke');  
  
 }
 //========================================================================================================
 function ajouteText1(){
  // <text data-idarbre1="4" x="2.6556" y="2.1126" stroke="black" stroke-width="0.02" fill="transparent" font-family="Verdana" font-size="0.5">?</text> 
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'text');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'x'                  , _dssvg.viewBoxInit[0]+64/_dssvg.zoom1 );
  globalClickDessin.tempchild.setAttribute( 'y'                  , _dssvg.viewBoxInit[0]+64/_dssvg.zoom1 );
  globalClickDessin.tempchild.setAttribute( 'style' , 'font-size:'+(0.5*32/_dssvg.zoom1)+';stroke-width:'+(0.02*32/_dssvg.zoom1)+';stroke:black;fill:blue;font-family:Verdana;');
  refZnDessin.appendChild(globalClickDessin.tempchild);

  ajouteEntreeArbre('text',null);
  closePopup();
  afficheArbre0({prendreTout:false});
  
 }
 //========================================================================================================
 function ajouteImage1(){
  // <text data-idarbre1="4" x="2.6556" y="2.1126" stroke="black" stroke-width="0.02" fill="transparent" font-family="Verdana" font-size="0.5">?</text> 
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'text');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'x'                  , _dssvg.viewBoxInit[0]+64/_dssvg.zoom1 );
  globalClickDessin.tempchild.setAttribute( 'y'                  , _dssvg.viewBoxInit[0]+64/_dssvg.zoom1 );
  globalClickDessin.tempchild.setAttribute( 'xlink:href'         , './kermit.jpg' );
  refZnDessin.appendChild(globalClickDessin.tempchild);

  ajouteEntreeArbre('image',null);
  closePopup();
  afficheArbre0({prendreTout:false});
  
 }
 //========================================================================================================
 function simplifieChemin4(tabOri){
  var tabReduit=tabOri;
  var boucle=true;
  var goon=999;
  var a1=0;
  var a2=0;
  var a3=0;
  var i=0;
  var delta=0;
//  var points=draw_state.elementsToDraw2[ind].ptList;

  var points=[];
  var pointsOriginaux=[]
//  var points=draw_state.elementsToDraw2[ind].ptList;
  for(var i=0;i<tabOri.length;i++){
   if(i==0){
    pointsOriginaux.push(['p',null , null , tabOri[i][1] , tabOri[i][2] , tabOri[i+1][1] , tabOri[i+1][2] ]);
   }else if(i==tabOri.length-1){
    pointsOriginaux.push(['p',tabOri[i][3] , tabOri[i][4] , tabOri[i][5] , tabOri[i][6] , null , null ]);
   }else{
    pointsOriginaux.push(['p',tabOri[i][3] , tabOri[i][4] , tabOri[i][5] , tabOri[i][6] , tabOri[i+1][1] , tabOri[i+1][2] ]);
   }
  }

//  console.log('pointsOriginaux apres=',JSON.parse(JSON.stringify(pointsOriginaux)).length , JSON.parse(JSON.stringify(pointsOriginaux)) );
  var imin=pointsOriginaux.length-1
  while(goon-- > 0){
   points=JSON.parse(JSON.stringify(pointsOriginaux)); // points=draw_state.elementsToDraw2[ind].ptList;
   boucle=true;
   for( var i=imin;i>=2 && goon && boucle;i--){
    // distance entre 2 points
    a1=Math.sqrt((points[i][3]-points[i-1][3])*(points[i][3]-points[i-1][3]) + (points[i][4]-points[i-1][4])*(points[i][4]-points[i-1][4]) );
    if(a1<32/_dssvg.zoom1){ // if(a1<rayon*2+draw_state.elementsToDraw2[ind].lineWidth1/2){
     // on supprime le point
     pointsOriginaux.splice(i-1, 1); // draw_state.elementsToDraw2[ind].ptList.splice(i-1, 1);
     imin=pointsOriginaux.length-1; // imin=draw_state.elementsToDraw2[ind].ptList.length-1;
     boucle=false;
    }else{
     imin=i-1;
    }
   }
   if(i<2){
    goon=0;
   }
  }
//  console.log('pointsOriginaux apres=',JSON.parse(JSON.stringify(pointsOriginaux)).length , JSON.parse(JSON.stringify(pointsOriginaux)) );
  tabReduit=[];
  for(var i=0;i<pointsOriginaux.length;i++){
   if(i===0){
    tabReduit.push(['M',pointsOriginaux[i][3],pointsOriginaux[i][4]]);
   }else{
    tabReduit.push(['C',pointsOriginaux[i-1][5],pointsOriginaux[i-1][6]   ,  pointsOriginaux[i][1],pointsOriginaux[i][2]   ,  pointsOriginaux[i][3],pointsOriginaux[i][4]    ]);
   }
  }
//  console.log( ' tabReduit=' , tabReduit );
  return tabReduit;
  
 } 
 
 //========================================================================================================
 function simplifieChemin3(tabOri){ // supprime les point intermédiaires avec des angles < 20°
  var tabReduit=tabOri;
  var boucle=true;
  var goon=999; // nombre de passes
  var a1=0;
  var a2=0;
  var a3=0;
  var i=0;
  var delta=0;
  var points=[];
  var pointsOriginaux=[]
//  var points=draw_state.elementsToDraw2[ind].ptList;
  for(var i=0;i<tabOri.length;i++){
   if(i==0){
    pointsOriginaux.push(['p',null , null , tabOri[i][1] , tabOri[i][2] , tabOri[i+1][1] , tabOri[i+1][2] ]);
   }else if(i==tabOri.length-1){
    pointsOriginaux.push(['p',tabOri[i][3] , tabOri[i][4] , tabOri[i][5] , tabOri[i][6] , null , null ]);
   }else{
    pointsOriginaux.push(['p',tabOri[i][3] , tabOri[i][4] , tabOri[i][5] , tabOri[i][6] , tabOri[i+1][1] , tabOri[i+1][2] ]);
   }
  }
//  [["M",42,64],["C",97,64,152.12,65.22,207,69],["C",224.01,70.17,241.01,70.11,258,71],["C",268.63,71.56,282.27,74.15,293,72],["C",311.3,68.34,331.24,62,350,62]];
//  console.log('pointsOriginaux avant=',JSON.parse(JSON.stringify(pointsOriginaux)).length , JSON.parse(JSON.stringify(pointsOriginaux)) );
  points=JSON.parse(JSON.stringify(pointsOriginaux));
  var imin=pointsOriginaux.length-1
  while(goon-- > 0){
   points=JSON.parse(JSON.stringify(pointsOriginaux)); //draw_state.elementsToDraw2[ind].ptList;
   boucle=true;
   for( var i=imin;i>=2 && goon && boucle;i--){
    // angle entre le dernier et l'avant dernier
    a1=angle2Points(points[i][3],points[i][4],points[i-1][3],points[i-1][4]);
    // angle entre le dernier et l'avant avant dernier
    a2=angle2Points(points[i][3],points[i][4],points[i-2][3],points[i-2][4]);
    delta=Math.abs(a1-a2);
    if(a2>270 && a1<90){
     delta=Math.abs(a1-(360-a2));
    }else if(a2<90 && a1>270){
     delta=Math.abs((360-a1)-a2);
    }else{
    }
    if(delta<5){
     a3=angle2Points(points[i-1][5],points[i-1][6],points[i-1][1],points[i-1][2]);
     if( a1>270 && a3<90){
      a1=360-a1;
     }else if( a1<90 && a3>270){
      a3=360-a3;
     }
     if(Math.abs(a1-a3)<20){
      // on supprime le point
      pointsOriginaux.splice(i-1, 1);
      imin=pointsOriginaux.length-1;
      boucle=false;
     }else{
      imin=i-1;
     }
    }else{
     imin=i-1;
    }
   }
   if(i<2){
    goon=0;
   }
  }
//  console.log('pointsOriginaux apres=',JSON.parse(JSON.stringify(pointsOriginaux)).length , JSON.parse(JSON.stringify(pointsOriginaux)) );
  tabReduit=[];
  for(var i=0;i<pointsOriginaux.length;i++){
   if(i===0){
    tabReduit.push(['M',pointsOriginaux[i][3],pointsOriginaux[i][4]]);
   }else{
    tabReduit.push(['C',pointsOriginaux[i-1][5],pointsOriginaux[i-1][6]   ,  pointsOriginaux[i][1],pointsOriginaux[i][2]   ,  pointsOriginaux[i][3],pointsOriginaux[i][4]    ]);
   }
  }
//  console.log( ' tabReduit=' , tabReduit );
  return tabReduit;
 }
 
 
 //========================================================================================================
 function ajouteEntreeArbre(label,parentId){
  if(_dssvg.arbre0.length==0){
   getSvgTree({init:false});
  }
  var maxId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>maxId){
    maxId=_dssvg.arbre0[i].id;
   }
  }
  maxId+=1;
  // {"id":1,"parentId":0,"isOpen":1,"data":{"label":"path","level":0,"type":"node","nodeName":"path","text":"","attributes":{"data-type":"toRemove","d":"M 10.25,10.25 L 41.5,36","stroke":"black","stroke-width":"1","fill":"transparent"},"nodeRef":{}}}'
  globalClickDessin.tempchild.setAttribute('data-idarbre1',maxId);
//  console.log('avant '+_dssvg.arbre0.length+' _dssvg.arbre0=',JSON.parse(JSON.stringify(_dssvg.arbre0)));
  var attrs={
   'data-idarbre1':maxId      
  };
  if(globalClickDessin.tempchild.attributes){
   for (let attribute of globalClickDessin.tempchild.attributes){
    if(attribute.nodeName=='data-type' && attribute.nodeValue=='toRemove'){
    }else{
     attrs[attribute.nodeName]=attribute.nodeValue;
    }
   }
  }
//  console.log('attrs=',attrs);
  var obj1={
   id:maxId,parentId:(parentId===null?0:parentId),isOpen:1,
   data:{
    label:label,
    level:0,
    type:'node',
    nodeName:label,
    text:((label==='text'||label==='tspan')?'?':''),
    attributes:JSON.parse(JSON.stringify(attrs)),
   }
  };
  _dssvg.arbre0.push(JSON.parse(JSON.stringify(obj1)));
  var ind=_dssvg.arbre0.length-1;
  _dssvg.arbre0[ind].data.attributes['transform']='';
  globalClickDessin.tempchild.setAttribute('transform','');
  
  if(parentId===null && groupeActif.refGroupe!==refZnDessin){
   // il faut déplacer l'élément dans le groupe actif et supprimer le transform
   _dssvg.arbre0[ind].parentId=groupeActif.idDansArbre;
   groupeActif.refGroupe.appendChild(globalClickDessin.tempchild);

  }
  return maxId;
  
  
//  console.log('apres '+_dssvg.arbre0.length+' _dssvg.arbre0=',JSON.parse(JSON.stringify(_dssvg.arbre0)));
 }
 
 //========================================================================================================
 function touchUpFenetre(e){
  e.stopPropagation();
  actionFinMouseUpOuTouchEndFenetre(e.touches[0]);
 }
 //========================================================================================================
 function mouseUpFenetre(e){
  e.stopPropagation();
  actionFinMouseUpOuTouchEndFenetre(e)
 }
 //========================================================================================================
 function actionFinMouseUpOuTouchEndFenetre(e){
//  console.log('_dssvg.mode_en_cours=',_dssvg.mode_en_cours);
//  console.log('mouse up fenetre, ecran_appuye=',ecran_appuye,' _dssvg.mode_en_cours=',_dssvg.mode_en_cours,'globalDernierePositionSouris=',globalDernierePositionSouris ); //,'e=',e)
  try{clearTimeout(defTimeoutPolyline);}catch(e){}
  try{clearTimeout(defTimeoutPolygon);}catch(e){}
  if(e && e.target && e.target.nodeName.toLowerCase()==='button'){
   var action=e.target.getAttribute('data-action');
   if(action){
    var ret=traiterAction(action);
    if(ret===true){
      return;
    }
   }
  }
  if(enCoursDeSelectionSansClickSurElement===true){
   _dssvg.viewBoxInit=refZnDessin.getAttribute('viewBox').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
   afficheArbre0({prendreTout:false});
   enCoursDeSelectionSansClickSurElement=false;
   return;
  }
  
  
  if(ecran_appuye!==false){
   if(_dssvg.mode_en_cours!=''){
    
    if(_dssvg.mode_en_cours==='setModeSaisieRectangle1'){
     
     ajouteEntreeArbre('rect',null);
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieLigne2'){

     ajouteEntreeArbre('line',null);

    }else if(_dssvg.mode_en_cours==='setModeSaisieLigne1'){
     
     ajouteEntreeArbre('path',null);
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieEllipse1'){

     ajouteEntreeArbre('ellipse',null);
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieCercle1'){
     
     ajouteEntreeArbre('circle',null);
     
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisiePolyline1'){

     ajouteEntreeArbre('polyline',null);

    }else if(_dssvg.mode_en_cours==='setModeSaisiePolygon1'){

     ajouteEntreeArbre('polygon',null);

    }else if(_dssvg.mode_en_cours==='setModeSaisieChemin1'){
     
     var listePoints=simplifySvgPath(globalClickDessin.pointsTraces , {tolerance:2.5,precision:2} ); // la tolérance = 0.5 pixels {tolerance:2.5,precision:5}
//     console.log('listePoints=',listePoints);
     var obj=getPointsFromSvgPath(listePoints.path);
     if(_dssvg.parametres.optimisationChemin===0){
     }else if(_dssvg.parametres.optimisationChemin===1){
//      obj.tabAbs=[["M",42,64],["C", 97,64  ,  152,65  ,  207,69 ],["C",  241,70  ,  274,70  , 324,71 ]]; //,["C",268.63,71.56,282.27,74.15,293,72],["C",311.3,68.34,331.24,62,350,62]];
//      
//       [
//        ["p" , null,null ,  42,64 ,   97,64   ],
//        ["p" ,  152, 65  , 207,69 ,  224,70   ],
//        ["p" ,  241, 70   ,258,71 , null,null ]
//       ]
//       
//      console.log('avant simplifieChemin2, obj=',obj.tabAbs,JSON.stringify(obj.tabAbs));
      if(obj.tabAbs.length>2){
       obj.tabAbs=simplifieChemin3(obj.tabAbs);
      }
//      console.log('apres simplifieChemin2, obj=',obj.tabAbs,JSON.stringify(obj.tabAbs));
     }else{
      if(obj.tabAbs.length>2){
       obj.tabAbs=simplifieChemin3(obj.tabAbs);
//       console.log('obj.tabAbs=',obj.tabAbs)
       obj.tabAbs=simplifieChemin4(obj.tabAbs);
      }
     }
     

     
//     console.log('obj=', obj );
     var tt='';
     for(var i=0;i<obj.tabAbs.length;i++){
      tt+=obj.tabAbs[i][0] + ' ';
      for(var j=1;j<obj.tabAbs[i].length;j++){
       tt+=' '+arrdi10000(obj.tabAbs[i][j]);
      }
      tt+='   ';
     }

     globalClickDessin.tempchild.setAttribute('d' , tt );
     ajouteEntreeArbre('path',null);
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieDeplace1'){
     
     _dssvg.viewBoxInit=refZnDessin.getAttribute('viewBox').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
     
    }else if('setModeSaisieSelElt1'===_dssvg.mode_en_cours || 'setModeSaisieDefsElt1'===_dssvg.mode_en_cours ){
     
//     console.log('fin de move');
     removeListeners();
     
    }else if('setModeSaisieEditionPoin1'===_dssvg.mode_en_cours || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ){
     
     removeListeners();
     if(globalGeneralSvgReferenceElement){
      if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='path'){
       var tt=globalGeneralSvgReferenceElement.getAttribute('d');
       var obj=getPointsFromSvgPath(tt);
       globalSelectionPoints.tabOriginal=obj.tabOri;
       globalSelectionPoints.tabAbsolu=obj.tabAbs;
      }
     }
     
     
     
    }else if('setModeSaisieTranE1'===_dssvg.mode_en_cours || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours ){

     removeListeners();
     // todo, à virer
     if(globalGeneralSvgReferenceElement && ( ecran_appuye==='fElementTransformTranslate1' )){
      try{
       var matrice=globalGeneralSvgReferenceElement.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.parentNode.getScreenCTM()).inverse();
       var obj=matrixToFnt(matrice);
       globalGeneralSvgReferenceElement.setAttribute('transform',obj.transform2);
       _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=obj.transform2;
      }catch(e){}
     }
     
     
    }else if('setModeSaisieGroupe1'===_dssvg.mode_en_cours || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
     
     removeListeners();
     // todo, à virer
     if(globalGeneralSvgReferenceElement && ( ecran_appuye==='fElementTransformTranslate1' ) ){
      var matrice=globalGeneralSvgReferenceElement.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.parentNode.getScreenCTM()).inverse();
      var obj=matrixToFnt(matrice);
      globalGeneralSvgReferenceElement.setAttribute('transform',obj.transform2);
      _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=obj.transform2;
     }
     
    }
    afficheArbre0({prendreTout:false});
    
   }
   ecran_appuye=false;   
  }
  enCoursDeSelectionSansClickSurElement=false;
 }
 //========================================================================================================
 function touchDownParScrollSize(e){
  e.stopPropagation();
  actionDownParScrollSize(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParScrollSize(e){
  e.stopPropagation();
  actionDownParScrollSize();
 }
 //========================================================================================================
 function actionDownParScrollSize(e){
  dogid('parLargeurScrollSize').addEventListener('touchmove' , changeScrollSize , 'range');
  dogid('parLargeurScrollSize').addEventListener('mousemove' , changeScrollSize , 'range');
  dogid('parLargeurScrollSize').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parLargeurScrollSize').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeScrollSize(e){
  e.stopPropagation();
  dogid('parLargeurScrollValeur').innerHTML=dogid('parLargeurScrollSize').value;
 }
 //========================================================================================================
 function setParScrollSize(){
  _dssvg.parametres.scroll_size=parseInt(dogid('parLargeurScrollSize').value,10);
  he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
  wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
  globalScrollWidth1=_dssvg.parametres.scroll_size;
  redrawCss();
  resize1();
  getScrollWidth();
  if(globalScrollWidth1!==_dssvg.parametres.scroll_size){
//   alert(globalScrollWidth1); 8 en dur dans firefox
   _dssvg.parametres.scroll_size=parseInt(dogid('parLargeurScrollSize').value,10);
   he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
   wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
   redrawCss();
   resize1();
  }
  saveStte();
 }


 //========================================================================================================
 function touchDownParRayonReference(e){
  e.stopPropagation();
  actionDownParRayonReference(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParRayonReference(e){
  e.stopPropagation();
  actionDownParRayonReference();
 }
 //========================================================================================================
 function actionDownParRayonReference(e){
  dogid('parRayonReference').addEventListener('touchmove' , changeRayonReference , 'range');
  dogid('parRayonReference').addEventListener('mousemove' , changeRayonReference , 'range');
  dogid('parRayonReference').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parRayonReference').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeRayonReference(e){
  e.stopPropagation();
  dogid('parRayonReferenceValeur').innerHTML=dogid('parRayonReference').value;
 }
 //========================================================================================================
 function setParRayonReference(){
  _dssvg.parametres.rayonReference=parseInt(dogid('parRayonReference').value,10);
  rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
  strkWiTexteSousPoignees=rayonPoint/20;
  fontSiTexteSousPoignees=rayonPoint;
  saveStte();
  afficheArbre0({init:false});
 }
 
 
 

 //========================================================================================================
 function touchDownParHauteurMinBtnMenuGau(e){
  e.stopPropagation();
  actionDownParHauteurMinBtnMenuGau(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParHauteurMinBtnMenuGau(e){
  e.stopPropagation();
  actionDownParHauteurMinBtnMenuGau();
 }
 //========================================================================================================
 function actionDownParHauteurMinBtnMenuGau(e){
  dogid('parHauteurMinBtnMenuGau').addEventListener('touchmove' , changeHauteurMinBtnMenuGau , 'range');
  dogid('parHauteurMinBtnMenuGau').addEventListener('mousemove' , changeHauteurMinBtnMenuGau , 'range');
  dogid('parHauteurMinBtnMenuGau').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parHauteurMinBtnMenuGau').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeHauteurMinBtnMenuGau(e){
  e.stopPropagation();
  dogid('parHauteurMinBtnMenuGauValeur').innerHTML=dogid('parHauteurMinBtnMenuGau').value;
 }
 //========================================================================================================
 function setParHauteurMinBtnMenuGau(){
  _dssvg.parametres.hauteurMinBtnMenuGau=parseInt(dogid('parHauteurMinBtnMenuGau').value,10);
  redrawCss();
  saveStte();
 }
 
 //========================================================================================================
 function touchDownParLargeurMinBtnMenuHau(e){
  e.stopPropagation();
  actionDownParLargeurMinBtnMenuHau(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParLargeurMinBtnMenuHau(e){
  e.stopPropagation();
  actionDownParLargeurMinBtnMenuHau();
 }
 //========================================================================================================
 function actionDownParLargeurMinBtnMenuHau(e){
  dogid('parLargeurMinBtnMenuHau').addEventListener('touchmove' , changeLargeurMinBtnMenuHau , 'range');
  dogid('parLargeurMinBtnMenuHau').addEventListener('mousemove' , changeLargeurMinBtnMenuHau , 'range');
  dogid('parLargeurMinBtnMenuHau').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parLargeurMinBtnMenuHau').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeLargeurMinBtnMenuHau(e){
  e.stopPropagation();
  dogid('parLargeurMinBtnMenuHauValeur').innerHTML=dogid('parLargeurMinBtnMenuHau').value;
 }
 //========================================================================================================
 function setParLargeurMinBtnMenuHau(){
  _dssvg.parametres.largeurMinBtnMenuHau=parseInt(dogid('parLargeurMinBtnMenuHau').value,10);
  redrawCss();
  saveStte();
 }
 
 
 
 
 
 
 

 //========================================================================================================
 function touchDownParOptimisationChemin(e){
  e.stopPropagation();
  actionDownParOptimisationChemin(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParOptimisationChemin(e){
  e.stopPropagation();
  actionDownParOptimisationChemin();
 }
 //========================================================================================================
 function actionDownParOptimisationChemin(e){
  dogid('parOptimisationChemin').addEventListener('touchmove' , changeOptimisationChemin , 'range');
  dogid('parOptimisationChemin').addEventListener('mousemove' , changeOptimisationChemin , 'range');
  dogid('parOptimisationChemin').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parOptimisationChemin').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeOptimisationChemin(e){
  e.stopPropagation();
  dogid('parOptimisationCheminValeur').innerHTML=dogid('parOptimisationChemin').value;
 }
 //========================================================================================================
 function setParOptimisationChemin(){
  _dssvg.parametres.optimisationChemin=parseInt(dogid('parOptimisationChemin').value,10);
  saveStte();
 }
 
 
 

 //========================================================================================================
 function touchDownParLargeurMenuGauche(e){
  e.stopPropagation();
  actionDownParLargeurMenuGauche(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParLargeurMenuGauche(e){
  e.stopPropagation();
  actionDownParLargeurMenuGauche();
 }
 //========================================================================================================
 function actionDownParLargeurMenuGauche(e){
  dogid('parLargeurMenuGauche').addEventListener('touchmove' , changeLargeurMenuGauche , 'range');
  dogid('parLargeurMenuGauche').addEventListener('mousemove' , changeLargeurMenuGauche , 'range');
  dogid('parLargeurMenuGauche').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parLargeurMenuGauche').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeLargeurMenuGauche(e){
  e.stopPropagation();
  dogid('parLargeurMenuGaucheValeur').innerHTML=dogid('parLargeurMenuGauche').value;
 }
 //========================================================================================================
 function setParLargeurMenuGauche(){
  _dssvg.parametres.largeurMenuGauche=parseInt(dogid('parLargeurMenuGauche').value,10);
  redrawCss();
  resize1();
  
  saveStte();
 }
 

 
 

 //========================================================================================================
 function touchDownParHauteurMenuHaut(e){
  e.stopPropagation();
  actionDownParHauteurMenuHaut(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParHauteurMenuHaut(e){
  e.stopPropagation();
  actionDownParHauteurMenuHaut();
 }
 //========================================================================================================
 function actionDownParHauteurMenuHaut(e){
  dogid('parHauteurMenuHaut').addEventListener('touchmove' , changeHauteurMenuHaut , 'range');
  dogid('parHauteurMenuHaut').addEventListener('mousemove' , changeHauteurMenuHaut , 'range');
  dogid('parHauteurMenuHaut').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parHauteurMenuHaut').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeHauteurMenuHaut(e){
  e.stopPropagation();
  dogid('parHauteurMenuHautValeur').innerHTML=dogid('parHauteurMenuHaut').value;
 }
 //========================================================================================================
 function setParHauteurMenuHaut(){
  _dssvg.parametres.hauteurMenuHaut=parseInt(dogid('parHauteurMenuHaut').value,10);
  redrawCss();
  resize1();
  
  saveStte();
 }
 
 

 //========================================================================================================
 function touchDownParTaillePolice(e){
  e.stopPropagation();
  actionDownParTaillePolice(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParTaillePolice(e){
  e.stopPropagation();
  actionDownParTaillePolice();
 }
 //========================================================================================================
 function actionDownParTaillePolice(e){
  dogid('parTaillePolice').addEventListener('touchmove' , changeTaillePolice , 'range');
  dogid('parTaillePolice').addEventListener('mousemove' , changeTaillePolice , 'range');
  dogid('parTaillePolice').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parTaillePolice').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeTaillePolice(e){
  e.stopPropagation();
  dogid('parTaillePoliceValeur').innerHTML=dogid('parTaillePolice').value;
 }
 //========================================================================================================
 function setParTaillePolice(){
  _dssvg.parametres.taillePolice=parseInt(dogid('parTaillePolice').value,10);
  redrawCss();
  resize1();
  
  saveStte();
 }
 
 

 //========================================================================================================
 function touchDownParIntervalleEntreBtns(e){
  e.stopPropagation();
  actionDownParIntervalleEntreBtns(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParIntervalleEntreBtns(e){
  e.stopPropagation();
  actionDownParIntervalleEntreBtns();
 }
 //========================================================================================================
 function actionDownParIntervalleEntreBtns(e){
  dogid('parIntervalleEntreBtns').addEventListener('touchmove' , changeIntervalleEntreBtns , 'range');
  dogid('parIntervalleEntreBtns').addEventListener('mousemove' , changeIntervalleEntreBtns , 'range');
  dogid('parIntervalleEntreBtns').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parIntervalleEntreBtns').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeIntervalleEntreBtns(e){
  e.stopPropagation();
  dogid('parIntervalleEntreBtnsValeur').innerHTML=dogid('parIntervalleEntreBtns').value;
 }
 //========================================================================================================
 function setParIntervalleEntreBtns(){
  _dssvg.parametres.intervalleEntreBtns=parseInt(dogid('parIntervalleEntreBtns').value,10);
  redrawCss();
  resize1();
  
  saveStte();
 }
 

 //========================================================================================================
 function touchDownParDiviseurDeplacement(e){
  e.stopPropagation();
  actionDownParDiviseurDeplacement(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParDiviseurDeplacement(e){
  e.stopPropagation();
  actionDownParDiviseurDeplacement();
 }
 //========================================================================================================
 function actionDownParDiviseurDeplacement(e){
  dogid('parDiviseurDeplacement').addEventListener('touchmove' , changeDiviseurDeplacement , 'range');
  dogid('parDiviseurDeplacement').addEventListener('mousemove' , changeDiviseurDeplacement , 'range');
  dogid('parDiviseurDeplacement').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parDiviseurDeplacement').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeDiviseurDeplacement(e){
  e.stopPropagation();
  dogid('parDiviseurDeplacementValeur').innerHTML=dogid('parDiviseurDeplacement').value;
 }
 //========================================================================================================
 function setParDiviseurDeplacement(){
  _dssvg.parametres.diviseurDeplacement=parseInt(dogid('parDiviseurDeplacement').value,10);
  saveStte();
 }


 
 //========================================================================================================
 function touchDownParFacteurAimnt(e){
  e.stopPropagation();
  actionDownParFacteurAimnt(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParFacteurAimnt(e){
  e.stopPropagation();
  actionDownParFacteurAimnt();
 }
 //========================================================================================================
 function actionDownParFacteurAimnt(e){
  dogid('parFacteurAimnt').addEventListener('touchmove' , changeFacteurAimnt , 'range');
  dogid('parFacteurAimnt').addEventListener('mousemove' , changeFacteurAimnt , 'range');
  dogid('parFacteurAimnt').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parFacteurAimnt').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeFacteurAimnt(e){
  e.stopPropagation();
  dogid('parFacteurAimntValeur').innerHTML=dogid('parFacteurAimnt').value;
 }
 //========================================================================================================
 function setParFacteurAimnt(){
  _dssvg.parametres.facteurAimnt=parseInt(dogid('parFacteurAimnt').value,10);
  _dssvg.aimanterPixel1=_dssvg.parametres.facteurAimnt;

  saveStte();
 }
 
/* 
 
*/ 
 
 
 //========================================================================================================
 function popupParametres1(){
  var contentOfPopup='<h3>'+trad['gerpar']+'</h3>';
  
  
  contentOfPopup+='<style>'
  contentOfPopup+='fieldset{border:1px blue outset;margin:10px 3px 0px 3px;}'
  contentOfPopup+='fieldset>div{border:1px red outset;margin:10px 3px 3px 3px;}'
  contentOfPopup+='fieldset>legend{border:1px blue outset;font-size:1.1em;margin:10px auto 10px auto;padding:3px;border-radius:4px;}'
  contentOfPopup+='</style>'

  contentOfPopup+='<fieldset>';
  
    contentOfPopup+='<legend>interface</legend>';
  
    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parLargeurMenuGauche">'+trad['Largeur_du_menu_gauche']+' : </label>';
    contentOfPopup+='<div id="parLargeurMenuGaucheValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.largeurMenuGauche+'</div>';
    contentOfPopup+='<input id="parLargeurMenuGauche" type="range" min="30" max="44" step="2" value="'+_dssvg.parametres.largeurMenuGauche+'" />';
    contentOfPopup+='</div>';
    
    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parHauteurMinBtnMenuGau">'+trad['Hauteur_minimal_des_boutons_à_gauche']+' : </label>';
    contentOfPopup+='<div style="display:inline-block;"><div id="parHauteurMinBtnMenuGauValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.hauteurMinBtnMenuGau+'</div>';
    contentOfPopup+='<input id="parHauteurMinBtnMenuGau" type="range" min="20" max="36" step="4" value="'+_dssvg.parametres.hauteurMinBtnMenuGau+'" />';
    contentOfPopup+='</div></div>';
    
    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parHauteurMenuHaut">'+trad['Hauteur_du_menu_haut']+' : </label>';
    contentOfPopup+='<div id="parHauteurMenuHautValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.hauteurMenuHaut+'</div>';
    contentOfPopup+='<input id="parHauteurMenuHaut" type="range" min="30" max="44" step="2" value="'+_dssvg.parametres.hauteurMenuHaut+'" />';
    contentOfPopup+='</div>';

    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parLargeurMinBtnMenuHau">'+trad['Largeur_minimal_des_boutons_en_haut']+' : </label>';
    contentOfPopup+='<div id="parLargeurMinBtnMenuHauValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.largeurMinBtnMenuHau+'</div>';
    contentOfPopup+='<input id="parLargeurMinBtnMenuHau" type="range" min="20" max="36" step="4" value="'+_dssvg.parametres.largeurMinBtnMenuHau+'" />';
    contentOfPopup+='</div>';

    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parIntervalleEntreBtns">'+trad['Intervalles_entre_les_boutons']+' : </label>';
    contentOfPopup+='<div id="parIntervalleEntreBtnsValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.intervalleEntreBtns+'</div>';
    contentOfPopup+='<input id="parIntervalleEntreBtns" type="range" min="0" max="20" step="2" value="'+_dssvg.parametres.intervalleEntreBtns+'" />';
    contentOfPopup+='</div>';
    
    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parLargeurScrollSize">'+trad['Largeur_du_scroll']+' : </label>';
    contentOfPopup+='<div id="parLargeurScrollValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.scroll_size+'</div>';
    contentOfPopup+='<input id="parLargeurScrollSize" type="range" min="0" max="20" step="5" value="'+_dssvg.parametres.scroll_size+'" />';
    contentOfPopup+='</div>';
    
    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parRayonReference">'+trad['Rayon_des_poignées']+' : </label>';
    contentOfPopup+='<div id="parRayonReferenceValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.rayonReference+'</div>';
    contentOfPopup+='<input id="parRayonReference" type="range" min="10" max="22" step="2" value="'+_dssvg.parametres.rayonReference+'" />';
    contentOfPopup+='</div>';

    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parTaillePolice">'+trad['Taille_des_textes']+' : </label>';
    contentOfPopup+='<div id="parTaillePoliceValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.taillePolice+'</div>';
    contentOfPopup+='<input id="parTaillePolice" type="range" min="14" max="24" step="2" value="'+_dssvg.parametres.taillePolice+'" />';
    contentOfPopup+='</div>';
    
    
  contentOfPopup+='</fieldset>';
  
  contentOfPopup+='<fieldset>';
  
    contentOfPopup+='<legend>'+trad['Utilisation']+'</legend>';
  
    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parOptimisationChemin">'+trad['Optimisation_des_tracés_chemin']+' : </label>';
    contentOfPopup+='<div id="parOptimisationCheminValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.optimisationChemin+'</div>';
    contentOfPopup+='<input id="parOptimisationChemin" type="range" min="0" max="2" step="1" value="'+_dssvg.parametres.optimisationChemin+'" />';
    contentOfPopup+='</div>';
    
    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parDiviseurDeplacement">'+trad['Diviseur_de_déplacement']+' : </label>';
    contentOfPopup+='<div id="parDiviseurDeplacementValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.diviseurDeplacement+'</div>';
    contentOfPopup+='<input id="parDiviseurDeplacement" type="range" min="1" max="5" step="1" value="'+_dssvg.parametres.diviseurDeplacement+'" />';
    contentOfPopup+='</div>';
    
    
    contentOfPopup+='<div >';
    contentOfPopup+='<label for="parFacteurAimnt">'+trad['Diviseur_de_pixel']+' : </label>';
    contentOfPopup+='<div id="parFacteurAimntValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.facteurAimnt+'</div>';
    contentOfPopup+='<input id="parFacteurAimnt" type="range" min="1" max="10" step="1" value="'+_dssvg.parametres.facteurAimnt+'" />';
    contentOfPopup+='</div>';

  contentOfPopup+='</fieldset>';
    
  contentOfPopup+='<fieldset>';
  
    contentOfPopup+='<legend>'+trad['liens_divers']+'</legend>';
  
    contentOfPopup+='<div style="text-align:center;" >';
    contentOfPopup+='<a class="butEnabled butMenuHaut" target="_blank" href="https://jakearchibald.github.io/svgomg/">svgomg</a>';
    contentOfPopup+='</div>';

    contentOfPopup+='<div style="text-align:center;" >';
    contentOfPopup+='<a class="butEnabled butMenuHaut" target="_blank" href="https://svgco.de/">svgcode</a>';
    contentOfPopup+='</div>';

    contentOfPopup+='<div style="text-align:center;" >';
    contentOfPopup+='<a class="butEnabled butMenuHaut" target="_blank" href="https://svgsilh.com/">svgsilh.com</a>';
    contentOfPopup+='</div>';


    
    
  contentOfPopup+='<fieldset>';
    contentOfPopup+='<legend>'+trad['Réinitialiser_le_programme_et_recharger_la_page']+'</legend>';
    
    contentOfPopup+='<div style="text-align:center;padding:15px;margin-top:20px">';
    contentOfPopup+='<button  type="button" class="butEnabled butMenuHaut bckRouge" id="suppVraimentToutToutTout" >'+trad['Réinitialiser']+'</button>';
    contentOfPopup+='</div>';
  
  contentOfPopup+='</fieldset>';
  
  
  
  contentOfPopup+='<fieldset style="text-align:center;">';
    
    contentOfPopup+='<button type="button" class="butEnabled butMenuHaut" id="francais">Français</button>';
    contentOfPopup+='&nbsp;';
    contentOfPopup+='<button class="butEnabled butMenuHaut" type="button"  id="english">English</button>';
  
  contentOfPopup+='</fieldset>';
  
  
  
  popupValue.innerHTML=contentOfPopup;
  
  dogid('francais').addEventListener('click'       , setFrancais        , 'bouton' );
  dogid('english').addEventListener('click'       , setEnglish        , 'bouton' );
  
  
  
  showPopUp('popupParametres1');  
  ajouteListenersParam();
 }
 //========================================================================================================
 function setFrancais(){
  _dssvg.parametres['lang']='fr';
  saveStte();
  document.location=String(document.location);
 }
 //========================================================================================================
 function setEnglish(){
  _dssvg.parametres['lang']='en';
  saveStte();
  document.location=String(document.location);
 }
 //========================================================================================================
 function ajouteListenersParam(){
  // todo ajouter 3eme paramètre
  dogid('parLargeurScrollSize').addEventListener('change'         , setParScrollSize                 , 'range' );
  dogid('parLargeurScrollSize').addEventListener('mousedown'      , mouseDownParScrollSize           , 'range' );
  dogid('parLargeurScrollSize').addEventListener('touchstart'     , touchDownParScrollSize           , 'range' );
  
  dogid('parRayonReference').addEventListener('change'            , setParRayonReference             , 'range' );
  dogid('parRayonReference').addEventListener('mousedown'         , mouseDownParRayonReference       , 'range' );
  dogid('parRayonReference').addEventListener('touchstart'        , touchDownParRayonReference       , 'range' );
  
  dogid('parHauteurMinBtnMenuGau').addEventListener('change'      , setParHauteurMinBtnMenuGau       , 'range' );
  dogid('parHauteurMinBtnMenuGau').addEventListener('mousedown'   , mouseDownParHauteurMinBtnMenuGau , 'range' );
  dogid('parHauteurMinBtnMenuGau').addEventListener('touchstart'  , touchDownParHauteurMinBtnMenuGau , 'range' );
  
  dogid('parLargeurMinBtnMenuHau').addEventListener('change'      , setParLargeurMinBtnMenuHau       , 'range' );
  dogid('parLargeurMinBtnMenuHau').addEventListener('mousedown'   , mouseDownParLargeurMinBtnMenuHau , 'range' );
  dogid('parLargeurMinBtnMenuHau').addEventListener('touchstart'  , touchDownParLargeurMinBtnMenuHau , 'range' );
  
  dogid('parOptimisationChemin').addEventListener('change'        , setParOptimisationChemin         , 'range' );
  dogid('parOptimisationChemin').addEventListener('mousedown'     , mouseDownParOptimisationChemin   , 'range' );
  dogid('parOptimisationChemin').addEventListener('touchstart'    , touchDownParOptimisationChemin   , 'range' );
  
  dogid('parLargeurMenuGauche').addEventListener('change'         , setParLargeurMenuGauche          , 'range' );
  dogid('parLargeurMenuGauche').addEventListener('mousedown'      , mouseDownParLargeurMenuGauche    , 'range' );
  dogid('parLargeurMenuGauche').addEventListener('touchstart'     , touchDownParLargeurMenuGauche    , 'range' );
  
  dogid('parHauteurMenuHaut').addEventListener('change'           , setParHauteurMenuHaut            , 'range' );
  dogid('parHauteurMenuHaut').addEventListener('mousedown'        , mouseDownParHauteurMenuHaut      , 'range' );
  dogid('parHauteurMenuHaut').addEventListener('touchstart'       , touchDownParHauteurMenuHaut      , 'range' );
  
  dogid('parTaillePolice').addEventListener('change'              , setParTaillePolice               , 'range' );
  dogid('parTaillePolice').addEventListener('mousedown'           , mouseDownParTaillePolice         , 'range' );
  dogid('parTaillePolice').addEventListener('touchstart'          , touchDownParTaillePolice         , 'range' );
  
  dogid('parIntervalleEntreBtns').addEventListener('change'       , setParIntervalleEntreBtns        , 'range' );
  dogid('parIntervalleEntreBtns').addEventListener('mousedown'    , mouseDownParIntervalleEntreBtns  , 'range' );
  dogid('parIntervalleEntreBtns').addEventListener('touchstart'   , touchDownParIntervalleEntreBtns  , 'range' );
  
  dogid('parDiviseurDeplacement').addEventListener('change'       , setParDiviseurDeplacement        , 'range' );
  dogid('parDiviseurDeplacement').addEventListener('mousedown'    , mouseDownParDiviseurDeplacement  , 'range' );
  dogid('parDiviseurDeplacement').addEventListener('touchstart'   , touchDownParDiviseurDeplacement  , 'range' );
  
  dogid('parFacteurAimnt').addEventListener('change'       , setParFacteurAimnt        , 'range' );
  dogid('parFacteurAimnt').addEventListener('mousedown'    , mouseDownParFacteurAimnt  , 'range' );
  dogid('parFacteurAimnt').addEventListener('touchstart'   , touchDownParFacteurAimnt  , 'range' );

  
  dogid('suppVraimentToutToutTout').addEventListener('click'      , suppVraimentToutToutTout         , 'button' );
  
  
  
 }
 //========================================================================================================
 function integrerModifManuelle1(){

  var lst=refZnDessin.querySelectorAll('*');
  for(var i=0;i<lst.length ;i++){
   
   if(lst[i].getAttribute('data-type') && ( lst[i].getAttribute('data-type')==='systeme' || lst[i].getAttribute('data-type')==='toRemove' ) ){
    continue;
   }
   if(lst[i].getAttribute('data-idarbre1')){
    var idarbre1=parseInt(lst[i].getAttribute('data-idarbre1'),10);
    var indiceArbre=recupereIndiceArbre(idarbre1);
  
    var attrs={};
    if(lst[i].attributes){
     for(let attribute of lst[i].attributes){
      attrs[attribute.nodeName]=attribute.nodeValue;
     }
    }
    _dssvg.arbre0[indiceArbre].data.attributes=attrs;
    if(lst[i].nodeName.toLowerCase()==='text' || lst[i].nodeName.toLowerCase()==='tspan'){
     _dssvg.arbre0[indiceArbre].data[lst[i].nodeName]=lst[i].innerHTML;
    }
    
    
   }
  }
  
 }
 //========================================================================================================
 function setZoomMoins1(){
  zoomPlusMoins(0.5);
 }
//========================================================================================================
 function setZoomPlus1(){
  zoomPlusMoins(2);
 }
 //========================================================================================================
 function zoomPlusMoins(n){
  
  var vb=refZnDessin.getAttribute('viewBox');
  if(vb!=null){
  
   var viewboxTab=refZnDessin.getAttribute('viewBox').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
//   console.log('viewboxTab avant=',viewboxTab,' , _dssvg.zoom1 avant=',_dssvg.zoom1);
   if(_dssvg.zoom1==256 && n==2){
    // rien
   }else if(_dssvg.zoom1==0.03125 && n==0.5){ // 0.03125 // 0.0625
    // rien
   }else{
    _dssvg.zoom1=_dssvg.zoom1*n;
    if(globalDernierePositionSouris.sx===null){
     _dssvg.viewBoxInit=[viewboxTab[0]/n,viewboxTab[1]/n,viewboxTab[2]/n,viewboxTab[3]/n];
    }else{
     // le centre est en globalDernierePositionSouris.sx mais il faudra modifier pour que le dernier click reste au même endroit
     var w=viewboxTab[2]/n;
     var h=viewboxTab[3]/n;
     var x=globalDernierePositionSouris.sx-w/2;
     var y=globalDernierePositionSouris.sy-w/2;
    }
//    refZnDessin.setAttribute('viewBox',_dssvg.viewBoxInit.join(' '));
    setAttributeViewBox();  
    rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
    strkWiTexteSousPoignees=rayonPoint/20;
    fontSiTexteSousPoignees=rayonPoint;
    resize1();
    afficheArbre0({prendreTout:false});
   }
   divlag1.innerHTML='Z='+_dssvg.zoom1;
  }
 }
 //========================================================================================================
 function ajouteElemDansElem(elementConteneur,nomDuTag,proprietes,enPremier){
  var el=document.createElementNS('http://www.w3.org/2000/svg',nomDuTag);
  for(var a in proprietes){
   if(proprietes.hasOwnProperty(a)){
    if(a==='text'||a==='tspan'){
     el.innerHTML=proprietes[a];
    }else{
     try{
      el.setAttribute(a,proprietes[a]);
     }catch(e){
      console.warn('%cattention','background:yellow;');
      console.warn('e=',e,'a=',a,'proprietes[a]=',proprietes[a]);
     }
 
    }
   }else{
    console.warn('ATTENTION : propriete "'+a+'" inexistante pour l\'élément "'+nomDuTag+'"' )
   }
  }
  if(enPremier!==undefined && enPremier===true){
   return elementConteneur.insertBefore(el, elementConteneur.firstChild);
  }else{
   return elementConteneur.appendChild(el);
  }
 }
 //========================================================================================================
 function htm1(s){
  try{
   return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/>/g,'&gt;').replace(/</g,'&lt;');
  }catch(e){
   return String(''+s+'')
  }
 } 
 //========================================================================================================
 function supprimePointsControle(){
  var tt=document.querySelectorAll('[data-type="toRemove"]');
  for(var i=0;i<tt.length;i++){
   tt[i].remove();
  }
 }
 //========================================================================================================
 function affPoi(){
  supprimePointsControle();
  if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' || _dssvg.mode_en_cours==='setModeSaisieDefsElt1' ){
   ajouterPointsDeControleElements();
  }else if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1' === _dssvg.mode_en_cours){
   ajouterPointsDeControlePointsElements();
  }else if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours ){
   ajouterPointsDeControlePointsTransformElements();
  }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
   ajouterPointsDeControlePointsTransformElements();
  }
 }
 //========================================================================================================
 function matrixToFnt(x){ // hugues
  // https://stackoverflow.com/questions/5107134/find-the-rotation-and-skew-of-a-matrix-transformation
  var a = [x.a, x.b, x.c, x.d, x.e, x.f];
  var angle = Math.atan2(a[1], a[0]),
      denom = Math.pow(a[0], 2) + Math.pow(a[1], 2),
      scaleX = Math.sqrt(denom),
      scaleY = (a[0] * a[3] - a[2] * a[1]) / scaleX,
      skewX = Math.atan2(a[0] * a[2] + a[1] * a[3], denom);

  var max=40
  var min=1/max;
  
  if(scaleY>0 && scaleY<min){
   scaleY=min;
  }
  if(scaleY>0 && scaleY>max){
   scaleY=max;
  }
  
  if(scaleX>0 && scaleX<min){
   scaleX=min;
  }
  if(scaleX>0 && scaleX>max){
   scaleX=max;
  }
  
  if(scaleY<0 && scaleY>-min){
   scaleY=-min;
  }
  if(scaleY<0 && scaleY<-max){
   scaleY=-max;
  }
  if(scaleX<0 && scaleX>-min){
   scaleX=-min;
  }
  if(scaleX<0 && scaleX<-max){
   scaleX=-max;
  }
  scaleX=Math.round(scaleX*100)/100;
  scaleY=Math.round(scaleY*100)/100;
  if(_dssvg.aimanterPixel1!==0){
   scaleX=Math.round(scaleX*max)/max;
   scaleY=Math.round(scaleY*max)/max;
  }
  
  var obj={
    'angle'     : arrdi10000(angle / (Math.PI / 180)),  // this is rotate angle in degrees
    'scaleX'    : arrdi10000(scaleX),                   // scaleX factor  
    'scaleY'    : arrdi10000(scaleY),                   // scaleY factor
    'skewX'     : arrdi10000(skewX / (Math.PI / 180)),  // skewX angle degrees
    'skewY'     : 0,                                    // skewY angle degrees
    'translateX': arrdi10000(a[4]),                     // translation point  x
    'translateY': arrdi10000(a[5]),                     // translation point  y
    'transform' : ('translate('+arrdi10000(a[4])+' '+arrdi10000(a[5])+')')+' '+('rotate('+arrdi10000((angle / (Math.PI / 180)))+')')+'  '+(  'scale('+arrdi10000(scaleX)+' '+arrdi10000(scaleY)+')')  +(' skewX('+arrdi10000((skewX / (Math.PI / 180)))+')'),
    'transform2': (arrdi10000(a[4])==0 && arrdi10000(a[5])==0?'':'translate('+arrdi10000(a[4])+' '+arrdi10000(a[5])+')')+' '+(arrdi10000((angle / (Math.PI / 180)))==0?'':('rotate('+arrdi10000((angle / (Math.PI / 180)))+' 0 0)'))+'  '+( ((scaleX==1&&scaleY==1)||(scaleX==0||scaleY==0))?'': 'scale('+scaleX+','+scaleY+')')  +(arrdi10000((skewX/(Math.PI/180)))!=0?'  skewX('+arrdi10000((skewX / (Math.PI / 180)))+')':''),
  };      
  return obj;
 }
 //========================================================================================================
 function fElementTransformTranslate1(e){
  
  

  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalTransformTranslateElement.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalTransformTranslateElement.mouseStart.x;
  pt0.y = current.y - globalTransformTranslateElement.mouseStart.y;
  
  
  
    
  var newPointX=globalTransformTranslateElement.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalTransformTranslateElement.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
 
  var deltaReel=refZnDessin.createSVGPoint();  
  deltaReel=pt0.matrixTransform(globalTransformTranslateElement.matriceElementElementInverse).matrixTransform(globalTransformTranslateElement.matriceRacine);


  var tx=0;
  var ty=0;
  var laTransformation='';
  for(var i=0;i<globalTransformTranslateElement.tabTransform.tab.length;i++){
   laTransformation+=globalTransformTranslateElement.tabTransform.tab[i][0]+'(';
   for(var j=0;j<globalTransformTranslateElement.tabTransform.tab[i][1].length;j++){
    laTransformation+=globalTransformTranslateElement.tabTransform.tab[i][1][j]+' ';
   }
   laTransformation+=') ';
  }
  
  var pt1=refZnDessin.createSVGPoint();  
  pt1.x = deltaReel.x;
  pt1.y = deltaReel.y;
  laTransformation+=' translate( '+pt1.x+' , '+pt1.y+' )';
  
//  console.log('laTransformation=',laTransformation)

   globalGeneralSvgReferenceElement.setAttribute( 'transform' ,  laTransformation );
   _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=laTransformation;

  return;
  
 }
 //========================================================================================================
 function mouseDownTransformTranslate(e){
  e.stopPropagation();
  actionDownTransformTranslate(e);
 }
 //========================================================================================================
 function touchDownTransformTranslate(e){
  e.stopPropagation();
  actionDownTransformTranslate(e.touches[0]);
 }
 //========================================================================================================
 var globalTransformTranslateElement={
  mouseStart                   : null,
  elementStart                 : null,
  matriceRacineInverse         : null,
  translatePositionInitiale    : null,
  chaineTransformAvant         : null,
  chaineTransformApres         : null,
  rectangle                    : null,
  matriceTransformGroup        : null,
  tabTransform                 : null,
  matriceElementElementInverse : null,
  angle                        : null,
  angleG                       : null,
  autreReference               : null,
  cascade01                    :null,
 };
// var mouseStart=null;
 //var elementStart=null;
 //========================================================================================================
 function actionDownTransformTranslate(e){ // TransformTranslate
  enCoursDeSelectionSansClickSurElement=false;
  ecran_appuye='fElementTransformTranslate1';
  globalGeneralReferencePointControleClique=e.target;
  initPosxy=positionSouris(e);
  initClick={x:e.clientX , y:e.clientY};
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  
  globalTransformTranslateElement.mouseStart=refZnDessin.createSVGPoint();
		globalTransformTranslateElement.mouseStart.x = e.clientX; 
  globalTransformTranslateElement.mouseStart.y = e.clientY;
  globalTransformTranslateElement.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  globalTransformTranslateElement.mouseStart=globalTransformTranslateElement.mouseStart.matrixTransform(globalTransformTranslateElement.matriceRacineInverse);
  globalTransformTranslateElement.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };

  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);

  globalTransformTranslateElement.autreReference=null;
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){

   globalTransformTranslateElement.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  
  
  globalTransformTranslateElement.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalTransformTranslateElement.matriceElementElementInverse.e=0;
  globalTransformTranslateElement.matriceElementElementInverse.f=0;
  
  globalTransformTranslateElement.matriceRacine=refZnDessin.getScreenCTM();
  globalTransformTranslateElement.matriceRacine.e=0;
  globalTransformTranslateElement.matriceRacine.f=0;
  
  globalTransformTranslateElement.angle=parseFloat(globalGeneralReferencePointControleClique.getAttribute('data-angle'));
  globalTransformTranslateElement.angleG=parseFloat(globalGeneralReferencePointControleClique.getAttribute('data-angleg'));


  if(globalGeneralSvgReferenceElement!==undefined){
   globalTransformTranslateElement.rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
   var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
   globalTransformTranslateElement.tabTransform=convertirTransformEnTableau(tr,['translate']);
  }
  return;

 }
 
 //========================================================================================================
 function calculCascadeTransform(elt,tableauDesTransformations){ // ['scale','rotate','translate', 'skew']
  
  var matrixCascade=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
  var cascade={
   rotate:[],
   scale:[],
   translate:[],
   matrixa:[],
   matrixb:[],
   matrixc:null,
   matrixd:'',
   lesMatrices:[],
   lesTransformations:[],
   matricesCumulees:null,
   // skewX
  };
  var goon=true;
  while(goon){
   
   
   if(elt.nodeName.toLowerCase()==='radialgradient'){
    var transform1=elt.getAttribute('gradientTransform')?elt.getAttribute('gradientTransform'):'';
   }else{
    var transform1=elt.getAttribute('transform')?elt.getAttribute('transform'):'';
   }
   var t1=convertirTransformEnTableau(transform1,tableauDesTransformations);

   var laMatrice=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
   for(var j=0;j<t1.tab.length;j++){
    if(t1.tab[j][0]=='scale'){
     cascade.scale.push([t1.tab[j][1][0] , t1.tab[j][1][1] ]);
     matrixCascade=matrixCascade.scaleNonUniform(t1.tab[j][1][0] , t1.tab[j][1][1]);
     laMatrice=laMatrice.scaleNonUniform(t1.tab[j][1][0] , t1.tab[j][1][1]);
    }else if(t1.tab[j][0]=='rotate'){
     cascade.rotate.push([t1.tab[j][1][0]]);
     matrixCascade=matrixCascade.rotate(t1.tab[j][1][0] , 0 , 0 );
     laMatrice=laMatrice.rotate(t1.tab[j][1][0] , 0 , 0 );
    }else if(t1.tab[j][0]=='translate'){
     cascade.translate.push([t1.tab[j][1][0] , t1.tab[j][1][1] ]);
     matrixCascade=matrixCascade.translate(t1.tab[j][1][0] , 0 , 0 );
     laMatrice=laMatrice.translate(t1.tab[j][1][0] , 0 , 0 );
    }else if(t1.tab[j][0]=='skewX'){
     cascade.translate.push([t1.tab[j][1][0] ]);
     matrixCascade=matrixCascade.skewX( t1.tab[j][1][0]  );
     laMatrice=laMatrice.skewX( t1.tab[j][1][0] );
    }
   }
   var laTransformation=convertirTransformEnTableau(transform1,[]);
   cascade.lesTransformations.push(laTransformation);
   cascade.lesMatrices.push(laMatrice);
   cascade.matrixa.push([matrixCascade.a,matrixCascade.b,matrixCascade.c,matrixCascade.d,matrixCascade.e,matrixCascade.f]);
   cascade.matrixb.push(matrixCascade);
   if(elt==refZnDessin){
    goon=false;
   }else{
    elt=elt.parentNode;
/*
    if(elt.nodeName==='defs'){
     goon=false;
    }
*/    
   }
  }
  
  cascade.matricesCumulees=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
  for(var j=cascade.lesMatrices.length-1;j>=0;j--){
   cascade.matricesCumulees=cascade.matricesCumulees.multiply(cascade.lesMatrices[j]);
  }

  
  
  if(cascade.matrixb.length>0){
   cascade.matrixc=cascade.matrixb[cascade.matrixb.length-1].inverse();
   for(var j=cascade.matrixb.length-2;j>=0;j--){
    cascade.matrixc=cascade.matrixc.multiply(cascade.matrixb[j].inverse());
   }
   cascade.matrixd='matrix('+cascade.matrixc.a+','+cascade.matrixc.b+','+cascade.matrixc.c+','+cascade.matrixc.d+','+cascade.matrixc.e+','+cascade.matrixc.f+')';
  }
  
  
  
  
  return cascade;
  
 }
 
 
 //========================================================================================================
 function angle2Points(pax,pay,pbx,pby){
  var a1=0;
  if(pax==pbx){
   if(pay>pby){
    a1=90;
   }else{
    a1=270;
   }
   return a1
  }
  a1=Math.abs(Math.atan((pby-pay)/(pbx-pax))/2/Math.PI*360);
  if(pax<pbx){
   if(pay>=pby){
    a1=a1; // a1
   }else{
    a1=360-a1;
   }
  }else{
   if(pay>=pby){
    a1=180-a1;
   }else{   
    a1=180+a1;
   }  
  }
  return a1;
 } 

 //========================================================================================================
 function fElementTransformCentreRotation(e){ // ecran_appuye='fElementTransformCentreRotation';
  
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalSelectRotationPosCentreElement.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalSelectRotationPosCentreElement.mouseStart.x;
  pt0.y = current.y - globalSelectRotationPosCentreElement.mouseStart.y;
  

  var newPointX=globalSelectRotationPosCentreElement.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalSelectRotationPosCentreElement.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
  
  var deltaReel=refZnDessin.createSVGPoint();  
  deltaReel=pt0.matrixTransform(globalSelectRotationPosCentreElement.matriceElementElementInverse).matrixTransform(globalSelectRotationPosCentreElement.matriceRacine);
  deltaReel.x=deltaReel.x/_dssvg.parametres.diviseurDeplacement;;
  deltaReel.y=deltaReel.y/_dssvg.parametres.diviseurDeplacement;;
  
  divlag1.innerHTML='<span>depPLZ='+_dssvg.zoom1+'</span>,<span style="color:red;">x='+arrdi10000(newPointX)+'</span>,<span style="color:red;">y='+arrdi10000(newPointY)+'</span>';


  
  
  
//  console.log('deltaReel=',deltaReel);
  
  
  var laTransformation='';
  for(var i=0;i<globalSelectRotationPosCentreElement.tabTransform.tab.length;i++){
   if(i==globalSelectRotationPosCentreElement.tabTransform.indices.rotate){
    var cx=arrdi10000(globalSelectRotationPosCentreElement.tabTransform.tab[i][1][1]+deltaReel.x);
    var cy=arrdi10000(globalSelectRotationPosCentreElement.tabTransform.tab[i][1][2]+deltaReel.y);
    laTransformation+=globalSelectRotationPosCentreElement.tabTransform.tab[i][0]+'(';
    laTransformation+=globalSelectRotationPosCentreElement.tabTransform.tab[i][1][0]+' ';
    laTransformation+=cx+' ';
    laTransformation+=cy+' ';
    laTransformation+=') ';
    
//   divlag1.innerHTML='<span>depCRZ='+_dssvg.zoom1+'</span>,<span style="color:red;">x='+arrdi10000(globalSelectRotationPosCentreElement.tabTransform.tab[i][1][1]+deltaReel.x)+'</span>,<span style="color:red;">y='+arrdi10000(globalSelectRotationPosCentreElement.tabTransform.tab[i][1][2]+deltaReel.y)+'</span>';
    divLag1Pour({t:'traCaZ',l:'traCaZ','cx':cx,'cy':cy});

    
   }else{
    laTransformation+=globalSelectRotationPosCentreElement.tabTransform.tab[i][0]+'(';
    for(var j=0;j<globalSelectRotationPosCentreElement.tabTransform.tab[i][1].length;j++){
     laTransformation+=globalSelectRotationPosCentreElement.tabTransform.tab[i][1][j]+' ';
    }
    laTransformation+=') ';
   }
  }
  if(globalSelectRotationPosCentreElement.autreReference && ( globalSelectRotationPosCentreElement.autreReference.nodeName.toLowerCase()==='radialgradient' || globalSelectRotationPosCentreElement.autreReference.nodeName.toLowerCase()==='lineargradient' ) ){

   _dssvg.arbre0[globalIndiceArbre].data.attributes['gradientTransform']=laTransformation;
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransformation);
   // il faut aussi appliquer l'écart de la rotation à data-idarbre1="2"
   globalSelectRotationPosCentreElement.autreReference.setAttribute('gradientTransform' ,  laTransformation );
   
  }else{
  
  
 //  console.log('laTransformation=',laTransformation);
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransformation);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=laTransformation;
  }

  
  return ;
  
  
 }
 //========================================================================================================
 function mouseDownRotatePosCentreTransformElement(e){
  e.stopPropagation();
  actionDownRotatePositionCentreTransformElement(e)
 }
 //========================================================================================================
 function touchDownRotatePosCentreTransformElement(e){
  e.stopPropagation();
  actionDownRotatePositionCentreTransformElement(e.touches[0])
 }
 //========================================================================================================
 var globalSelectRotationPosCentreElement={
  matriceParentElementInverse:null,
  rectangle:null,
  mouseStart:null,
  matriceRacineInverse:null,
  matriceDeplacementPoint:null,
  elementStart:null,
  tabTransform:null, 
  positionPointCR:null,
  matriceElementElementInverse:null,
  matriceRacine:null,
  autreReference:null,
  
 };
 //========================================================================================================
 function actionDownRotatePositionCentreTransformElement(e){
//  console.log('mouseDownTranslate e=',e.target);
  initPosxy=positionSouris(e);
  ecran_appuye='fElementTransformCentreRotation';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  divlag1.innerHTML='<span>3mdREZ='+_dssvg.zoom1+'</span>,<span>sx='+initPosxy.sx + '</span>,<span>sy=' + initPosxy.sy+'</span>';
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ cr/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
//  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]')[0];
  globalSelectRotationPosCentreElement.autreReference=null;
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){
   globalSelectRotationPosCentreElement.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 

  
  
  globalSelectRotationPosCentreElement.matriceParentElementInverse=globalGeneralSvgReferenceElement.parentNode.getScreenCTM().inverse();
  globalSelectRotationPosCentreElement.matriceParentElementInverse.e=0;
  globalSelectRotationPosCentreElement.matriceParentElementInverse.f=0;
  
  globalSelectRotationPosCentreElement.rectangle=null;

  globalSelectRotationPosCentreElement.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalSelectRotationPosCentreElement.matriceElementElementInverse.e=0;
  globalSelectRotationPosCentreElement.matriceElementElementInverse.f=0;

  globalSelectRotationPosCentreElement.matriceRacine=refZnDessin.getScreenCTM();
  globalSelectRotationPosCentreElement.matriceRacine.e=0;
  globalSelectRotationPosCentreElement.matriceRacine.f=0;
  
  
  
  globalSelectRotationPosCentreElement.mouseStart=refZnDessin.createSVGPoint();
		globalSelectRotationPosCentreElement.mouseStart.x = e.clientX; 
  globalSelectRotationPosCentreElement.mouseStart.y = e.clientY;
  globalSelectRotationPosCentreElement.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  globalSelectRotationPosCentreElement.mouseStart=globalSelectRotationPosCentreElement.mouseStart.matrixTransform(globalSelectRotationPosCentreElement.matriceRacineInverse);
  globalSelectRotationPosCentreElement.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };
  globalSelectRotationPosCentreElement.matriceDeplacementPoint=globalSelectRotationPosCentreElement.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  globalSelectRotationPosCentreElement.matriceDeplacementPoint.e=0;
  globalSelectRotationPosCentreElement.matriceDeplacementPoint.f=0;
  
  var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
  globalSelectRotationPosCentreElement.tabTransform=convertirTransformEnTableau(tr,['rotate']);
//  console.log('globalSelectRotationPosCentreElement.tabTransform=',globalSelectRotationPosCentreElement.tabTransform)


  var refPointcr=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' cr"]')[0];
  if(refPointcr){
   globalSelectRotationPosCentreElement.positionPointCR={
    x:arrdi10000(refPointcr.cx.animVal.value),
    y:arrdi10000(refPointcr.cy.animVal.value),
   }
  }
//  console.log('globalSelectRotationPosCentreElement.positionPointCR=',globalSelectRotationPosCentreElement.positionPointCR);

/*
  document.body.addEventListener( 'mousemove' , mouseMoveRotationPosCentreElement , 'bodymove' );
  document.body.addEventListener( 'touchmove' , touchMoveRotationPosCentreElement , 'bodymove' );
*/  
 }
 
 //========================================================================================================
 function convertirTransformEnTableau(tr,trAajouter){
  var tab=[];
  var indices={
   matrix    : -1,
   translate : -1,
   rotate    : -1,
   scale     : -1,
   skewx     : -1,
  }
  
  var trTab=tr.toLowerCase().split(')');
//  console.log('trTab=',trTab);
  for(var i=0;i<trTab.length;i++){
   
   if(trTab[i]==''){
    continue;
   }
   trTab[i]=trTab[i].trim().toLowerCase();
   
   if(trTab[i].substr(0,6)==='matrix'){
    
    var tabTemp=trTab[i].replace('matrix','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    tab.push(['matrix',tabTemp]);
    indices.matrix=tab.length-1;
    
   }else if(trTab[i].substr(0,6)==='rotate'){
    
    var tabTemp=trTab[i].replace('rotate','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    if(tabTemp.length==1){
     tabTemp=[tabTemp[0],0,0];
    }
    tab.push(['rotate',tabTemp]);
    indices.rotate=tab.length-1;
    
   }else if(trTab[i].substr(0,5)==='scale'){
    
    var tabTemp=trTab[i].replace('scale','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    if(tabTemp.length==1){
     tabTemp=[tabTemp[0],tabTemp[0]];
    }
    tab.push(['scale',tabTemp]);
    indices.scale=tab.length-1;
    
   }else if(trTab[i].substr(0,9)==='translate'){
    
    var tabTemp=trTab[i].replace('translate','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    tab.push(['translate',tabTemp]);
    indices.translate=tab.length-1;

   }else if(trTab[i].toLowerCase().substr(0,5)==='skewx'){
    
    var tabTemp=trTab[i].replace('skewX','').replace('skewx','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    tab.push(['skewX',tabTemp]);
    indices.skewx=tab.length-1;
    
   }
   
  }
//  console.log('tab=',tab);
  for(var i=0;i<trAajouter.length;i++){
   var elem=trAajouter[i];
   if(elem==='rotate'){
    if(indices.rotate==-1){
     tab.push(['rotate',[0,0,0]]);
     indices.rotate=tab.length-1;
    }
   }else if(elem==='translate'){
    if(indices.translate==-1){
     tab.push(['translate',[0,0]]);
     indices.translate=tab.length-1;
    }
   }else if(elem.toLowerCase()==='skewx'){
    if(indices.skewx==-1){
     tab.push(['skewX',[0]]);
     indices.skewx=tab.length-1;
    }
   }else if(elem.toLowerCase()==='scale'){
    if(indices.scale==-1){
     tab.push(['scale',[1,1]]);
     indices.scale=tab.length-1;
    }
   }
  }
  return {tab:tab,indices:indices};
 }
 //========================================================================================================
 function arrdi100(x){
  x=Math.round(x*100)/100;
  if(_dssvg.aimanterPixel1!==0){
   x=Math.round((x*10))/10;
  }
  return x;
 }
 
 //========================================================================================================
 function fElementTransformSkewx(e){
  
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalElementTransformSkewx.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalElementTransformSkewx.mouseStart.x;
  pt0.y = current.y - globalElementTransformSkewx.mouseStart.y;

  var pt1=refZnDessin.createSVGPoint();  
  pt1=pt0.matrixTransform(globalElementTransformSkewx.matriceDeplacementPoint);
  var newPointX=globalElementTransformSkewx.elementStart.x+pt1.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalElementTransformSkewx.elementStart.y+pt1.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
  
  
  
  
  
  
  
  var nouvelAngle=angle2Points(
   globalElementTransformSkewx.positionPointCR.x ,
   globalElementTransformSkewx.positionPointCR.y ,
   newPointX,
   newPointY
  )-270;
//  console.log('nouvelAngle=',nouvelAngle);
  
  nouvelAngle=arrdi10000(nouvelAngle);
  if(nouvelAngle<-180){
   nouvelAngle=360+nouvelAngle;
  }
  if(nouvelAngle>85){
   nouvelAngle=85;
  }
  if(nouvelAngle<-85){
   nouvelAngle=-85;
  }
  
  var laTransformation='';
  for(var i=0;i<globalElementTransformSkewx.tabTransform.tab.length;i++){
   if(i==globalElementTransformSkewx.tabTransform.indices.skewx){
    if(nouvelAngle===0){
    }else{
     laTransformation+=globalElementTransformSkewx.tabTransform.tab[i][0]+'(';
     laTransformation+=nouvelAngle+' ';
     laTransformation+=') ';
    }
    divLag1Pour({t:'traSkZ',l:'traSkZ','a':nouvelAngle});    
    
   }else{
    laTransformation+=globalElementTransformSkewx.tabTransform.tab[i][0]+'(';
    for(var j=0;j<globalElementTransformSkewx.tabTransform.tab[i][1].length;j++){
     laTransformation+=globalElementTransformSkewx.tabTransform.tab[i][1][j]+' ';
    }
    laTransformation+=') ';
   }
  }
//  console.log('laTransformation='+laTransformation);

  if(globalElementTransformSkewx.autreReference && ( globalElementTransformSkewx.autreReference.nodeName.toLowerCase()==='radialgradient' || globalElementTransformSkewx.autreReference.nodeName.toLowerCase()==='lineargradient' ) ){


   _dssvg.arbre0[globalIndiceArbre].data.attributes['gradientTransform']=laTransformation;
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransformation);
   // il faut aussi appliquer l'écart de la rotation à data-idarbre1="2"
   globalElementTransformSkewx.autreReference.setAttribute('gradientTransform' ,  laTransformation );
   
  }else{

   globalGeneralSvgReferenceElement.setAttribute('transform',laTransformation);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=laTransformation;
   
  }
  
//  divlag1.innerHTML='<span>mskEZ='+_dssvg.zoom1+'</span>,<span style="color:red;">a='+(nouvelAngle)+'</span>,<span>sx='+initPosxy.sx + '</span>,<span>sy=' + initPosxy.sy+'</span>';
  
 }  
 //========================================================================================================
 function mouseDownSkewxTransformElement(e){
  e.stopPropagation();
  actionDownElementTransformSkewx(e)
 }
 //========================================================================================================
 function touchDownSkewxTransformElement(e){
  e.stopPropagation();
  actionDownElementTransformSkewx(e.touches[0])
 }
//========================================================================================================
 var globalElementTransformSkewx={ // voir globalElementTransformScale
  mouseStart                   : null,
  elementStart                 : null,
  matriceRacineInverse         : null,
  rectangle                    : null,
  matriceElementElementInverse : null,
  matriceRacine                : null,
  tabTransform                 : null,
  positionPointSK              : null,
  positionPointCR              : null,
  skewxInit                    : null,
  matriceDeplacementPoint      : null,
  autreReference               : null,
 }
 //========================================================================================================
 function actionDownElementTransformSkewx(e){
//  console.log(e);
  initPosxy=positionSouris(e);
  ecran_appuye='fElementTransformSkewx';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  
//  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]')[0];

  globalElementTransformSkewx.autreReference=null;
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){

   globalElementTransformSkewx.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  
  
  globalElementTransformSkewx.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalElementTransformSkewx.matriceElementElementInverse.e=0;
  globalElementTransformSkewx.matriceElementElementInverse.f=0;
  
  globalElementTransformSkewx.matriceRacine=refZnDessin.getScreenCTM();
  globalElementTransformSkewx.matriceRacine.e=0;
  globalElementTransformSkewx.matriceRacine.f=0;
  
  globalElementTransformSkewx.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();

  globalElementTransformSkewx.matriceDeplacementPoint=globalElementTransformSkewx.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  globalElementTransformSkewx.matriceDeplacementPoint.e=0;
  globalElementTransformSkewx.matriceDeplacementPoint.f=0;
  
  
  globalElementTransformSkewx.mouseStart=refZnDessin.createSVGPoint();
		globalElementTransformSkewx.mouseStart.x = e.clientX; 
  globalElementTransformSkewx.mouseStart.y = e.clientY;
  globalElementTransformSkewx.mouseStart=globalElementTransformSkewx.mouseStart.matrixTransform(globalElementTransformSkewx.matriceRacineInverse);
  globalElementTransformSkewx.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };

  var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
  globalElementTransformSkewx.tabTransform=convertirTransformEnTableau(tr,['skewx']);
//  console.log('globalElementTransformSkewx.tabTransform=',globalElementTransformSkewx.tabTransform);
  
  
  globalElementTransformSkewx.rectangle=null;
  var rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  if(rectangle){
   globalElementTransformSkewx.rectangle={
    ref:rectangle,
    x:arrdi10000(parseFloat(rectangle.getAttribute('x'))),
    y:arrdi10000(parseFloat(rectangle.getAttribute('y'))),
    width:arrdi10000(parseFloat(rectangle.getAttribute('width'))),
    height:arrdi10000(parseFloat(rectangle.getAttribute('height'))),
   }
  }
  
  var refPointcr=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' cr"]')[0];
  if(refPointcr){
   globalElementTransformSkewx.positionPointCR={
    x:arrdi10000(refPointcr.cx.animVal.value),
    y:arrdi10000(refPointcr.cy.animVal.value),
   }
  }
  
  var refPointsk=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' sk"]')[0];
  if(refPointsk){
   globalElementTransformSkewx.positionPointSK={
    x:arrdi10000(refPointsk.cx.animVal.value),
    y:arrdi10000(refPointsk.cy.animVal.value),
   }
  }
  globalElementTransformSkewx.skewxInit=angle2Points(
   globalElementTransformSkewx.positionPointCR.x ,
   globalElementTransformSkewx.positionPointCR.y ,
   globalElementTransformSkewx.positionPointSK.x ,
   globalElementTransformSkewx.positionPointSK.y ,
  )-270;
//  console.log('globalElementTransformSkewx.skewxInit=',globalElementTransformSkewx.skewxInit);
  

  var sxInit=globalElementTransformSkewx.tabTransform.tab[globalElementTransformSkewx.tabTransform.indices.skewx][1][0];
  divlag1.innerHTML='<span>skEZ='+_dssvg.zoom1+'</span>,<span>sx='+arrdi10000(initPosxy.sx)+'</span>,<span>sy='+arrdi10000(initPosxy.sy)+'</span>,<span>skx=' + globalElementTransformSkewx.skewxInit+'</span>';
  
  return;
  
 }
 //========================================================================================================
 function distanceEntreDroiteEtPoint(x1,y1,x2,y2,px,py){ // la droite est définie par x1,y1,x2,y2
  var delta=0;
//  console.log(Math.round(x1*100)/100,Math.round(y1*100)/100,Math.round(x2*100)/100,Math.round(y2*100)/100,Math.round(px*100)/100,Math.round(py*100)/100);
  if(Math.round((x2-x1)*1000)/1000!==0){ // la droite n'est pas verticale
//   console.log('cas 1')
   if(Math.round(y2*1000)/1000===Math.round(y1*1000)/1000){
//    console.log('cas 2')
    delta=Math.round((py-y2)*1000)/1000;
   }else{
//    console.log('cas 3')
    var a0=Math.round((y2-y1)/(x2-x1)*1000)/1000; // a0 = pente de la droite
//    console.log( 'pente de la droite = ' , a0 );
    var b0=y1-a0*x1; // on a a0 et b0 de l'équation de la droite y=a0*x+b0
    var m3=-1/a0; // la pente de la droite orthogonale est -1/a0
    var b3=py-m3*px;
    var yn=(b3-b0*m3/a0)/(1-m3/a0);
    var xn=(yn-b0)/a0;
    delta=Math.sqrt((px-xn)*(px-xn)+(py-yn)*(py-yn))*(py<yn?-1:1);
   }
  }else{
//   console.log('cas 4')
   delta=Math.round((px-x1)*1000)/1000;
  }
  return delta;
 }
 //========================================================================================================
 function chercherPointsGroupeVoinsin(e){
  if(e.hasOwnProperty('touches')){
   e=e.touches[0];
  }
//  console.log('e=',e);
 }
 //========================================================================================================
 function selectionnerElementAtransformer(e){
  e.stopPropagation();
  var nouvelIdArbre=parseInt(e.target.getAttribute('data-elem'),10);
  if(_dssvg.idArbreCourant===nouvelIdArbre){
  }else{
   _dssvg.idArbrPreceden=_dssvg.idArbreCourant;
   _dssvg.idArbreCourant=nouvelIdArbre;
  }
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]')[0];
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  affPoi();
  divLag2Complete();
//  chercherPointsGroupeVoinsin(e);
 }
 //========================================================================================================
 function mouseDownDeplacerTousLesElementsDeGroupe(e){
  e.stopPropagation();
//  console.log('e=',e)

 }
 //========================================================================================================
 function touchDownDeplacerTousLesElementsDeGroupe(e){
  e.stopPropagation();
//  console.log('e=',e)
 }
 
 
 //========================================================================================================
 function fElementTransformAngle2(e){ //ecran_appuye='fElementTransformAngle2';
  
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalSelectRotationAngleElement.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalSelectRotationAngleElement.mouseStart.x;
  pt0.y = current.y - globalSelectRotationAngleElement.mouseStart.y;

  var pt1=refZnDessin.createSVGPoint();  
  pt1=pt0.matrixTransform(globalSelectRotationAngleElement.matriceDeplacementPoint);
  
  var newPointX=globalSelectRotationAngleElement.elementStart.x+pt1.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalSelectRotationAngleElement.elementStart.y+pt1.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
  
  
  
  
  var nouvelAngle=-angle2Points(
   globalSelectRotationAngleElement.positionPointCR.x ,
   globalSelectRotationAngleElement.positionPointCR.y ,
   newPointX,
   newPointY
  );
  
  var ancienAngle=0;
  if(globalSelectRotationAngleElement.tabTransform.indices.rotate>=0){
   ancienAngle=globalSelectRotationAngleElement.tabTransform.tab[globalSelectRotationAngleElement.tabTransform.indices.rotate][1][0]
  }
//  console.log('ancienAngle=',ancienAngle);
  var deltaAngle=nouvelAngle-ancienAngle;
  
  var t=matrixToFnt(globalSelectRotationAngleElement.matriceParentElement);
  nouvelAngle=arrdi10000(nouvelAngle);
  var nouvelAngleBis=nouvelAngle;
  
  
  if(nouvelAngle<-180){
   nouvelAngle=360+nouvelAngle;
  }
  
  if(nouvelAngle>360){
   nouvelAngle=nouvelAngle-360;
  }
  
//  console.log('nouvelAngle=',nouvelAngle);
  
  var laTransforlation='';
  for(var i=0;i<globalSelectRotationAngleElement.tabTransform.tab.length;i++){
   if(i==globalSelectRotationAngleElement.tabTransform.indices.rotate){
    
    if(nouvelAngle===0 && globalSelectRotationAngleElement.tabTransform.tab[i][1][1]===0 && globalSelectRotationAngleElement.tabTransform.tab[i][1][2]===0){
    }else{
    
     laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][0]+'(';
     laTransforlation+=nouvelAngle+' ';
     laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][1][1]+' ';
     laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][1][2]+' ';
     laTransforlation+=')';
    }
    
    divLag1Pour({t:'traAnZ',l:'traAnZ','a':nouvelAngle,'ab':nouvelAngleBis});
    
    
   }else{
    laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][0]+'(';
    for(var j=0;j<globalSelectRotationAngleElement.tabTransform.tab[i][1].length;j++){
     laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][1][j]+' ';
    }
    laTransforlation+=') ';
   }
  }
//  console.log('laTransforlation=',laTransforlation , 'globalSelectRotationAngleElement.autreReference=',globalSelectRotationAngleElement.autreReference)
  if(globalSelectRotationAngleElement.autreReference && ( globalSelectRotationAngleElement.autreReference.nodeName.toLowerCase()==='radialgradient' || globalSelectRotationAngleElement.autreReference.nodeName.toLowerCase()==='lineargradient' )){
   _dssvg.arbre0[globalIndiceArbre].data.attributes['gradientTransform']=laTransforlation;
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransforlation);
   // il faut aussi appliquer l'écart de la rotation à data-idarbre1="2"
   globalSelectRotationAngleElement.autreReference.setAttribute('gradientTransform' ,  laTransforlation );
   
   
   
  }else{
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransforlation);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=laTransforlation;
  }
//  divlag1.innerHTML='<span>1mdREZ='+_dssvg.zoom1+'</span>,<span style="color:red;">a='+(nouvelAngle)+'</span>,<span>sx='+(Math.round(initPosxy.sx*10)/10) + '</span>,<span>sy=' + (Math.round(initPosxy.sy*10)/10)+'</span>';
  
  
  
  
  
 } 
 
 
 //========================================================================================================
 function mouseDownRotateAngleTransformElement2(e){
  e.stopPropagation();
  actionDownRotateTransformAngleElement2(e);
 }
 //========================================================================================================
 function touchDownRotateAngleTransformElement2(e){
  e.stopPropagation();
  actionDownRotateTransformAngleElement2(e.touches[0]);
 }
 //========================================================================================================
 var globalSelectRotationAngleElement={
//  matriceParentElementInverse:null,
  rectangle:null,
  mouseStart:null,
  matriceRacineInverse:null,
  matriceDeplacementPoint:null,
  elementStart:null,
  tabTransform:null, 
  positionPointCR:null,
  positionPointAN:null,
  angleInit:null,
  autreReference:null,
  init:null,
 }; 
 //========================================================================================================
 function actionDownRotateTransformAngleElement2(e){
  
//  console.log('actionDownRotateTransformAngleElement2 e=',e.target);
  initPosxy=positionSouris(e);
  ecran_appuye='fElementTransformAngle2';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ cr/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
//  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]')[0];
  
  globalSelectRotationAngleElement.autreReference=null; // pour le radialGradient
  
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){
   globalSelectRotationAngleElement.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  
  
//  globalSelectRotationAngleElement.matriceParentElementInverse=globalGeneralSvgReferenceElement.parentNode.getScreenCTM().inverse();
//  globalSelectRotationAngleElement.matriceParentElementInverse.e=0;
//  globalSelectRotationAngleElement.matriceParentElementInverse.f=0;

  globalSelectRotationAngleElement.matriceParentElement=globalGeneralSvgReferenceElement.parentNode.getScreenCTM()
  
  
  globalSelectRotationAngleElement.rectangle=null;
  
  
  globalSelectRotationAngleElement.mouseStart=refZnDessin.createSVGPoint();
		globalSelectRotationAngleElement.mouseStart.x = e.clientX; 
  globalSelectRotationAngleElement.mouseStart.y = e.clientY;
  globalSelectRotationAngleElement.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  globalSelectRotationAngleElement.mouseStart=globalSelectRotationAngleElement.mouseStart.matrixTransform(globalSelectRotationAngleElement.matriceRacineInverse);
  globalSelectRotationAngleElement.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };
  globalSelectRotationAngleElement.matriceDeplacementPoint=globalSelectRotationAngleElement.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  
  
  globalSelectRotationAngleElement.matriceDeplacementPoint.e=0;
  globalSelectRotationAngleElement.matriceDeplacementPoint.f=0;
  
  var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
  globalSelectRotationAngleElement.tabTransform=convertirTransformEnTableau(tr,['rotate']);
//  console.log('globalSelectRotationAngleElement.tabTransform=',globalSelectRotationAngleElement.tabTransform)


  var refPointcr=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' cr"]')[0];
  if(refPointcr){
   globalSelectRotationAngleElement.positionPointCR={
    x:arrdi10000(refPointcr.cx.animVal.value),
    y:arrdi10000(refPointcr.cy.animVal.value),
   }
  }
  
  var refPointan=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' an"]')[0];
  if(refPointan){
   globalSelectRotationAngleElement.positionPointAN={
    x:arrdi10000(refPointan.cx.animVal.value),
    y:arrdi10000(refPointan.cy.animVal.value),
   }
  }
  globalSelectRotationAngleElement.angleInit=angle2Points(
   globalSelectRotationAngleElement.positionPointCR.x ,
   globalSelectRotationAngleElement.positionPointCR.y ,
   globalSelectRotationAngleElement.positionPointAN.x ,
   globalSelectRotationAngleElement.positionPointAN.y ,
  );
//  console.log('globalSelectRotationAngleElement.angleInit=',globalSelectRotationAngleElement.angleInit);
  
  divlag1.innerHTML='<span>2mdREZ='+_dssvg.zoom1+'</span>,<span>sx='+initPosxy.sx + '</span>,<span>sy=' + initPosxy.sy+'</span><span>a='+(globalSelectRotationAngleElement.angleInit)+'</span>';
  
 } 
  
 //========================================================================================================
 function felementTransformEchelle3(e){ // actionDownElementTransformScale3
  
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalElementTransformScale.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalElementTransformScale.mouseStart.x;
  pt0.y = current.y - globalElementTransformScale.mouseStart.y;

  var pt1=refZnDessin.createSVGPoint();  
  pt1=pt0.matrixTransform(globalElementTransformScale.matriceDeplacementPoint);
  var newPointX=globalElementTransformScale.elementStart.x+pt1.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalElementTransformScale.elementStart.y+pt1.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );

//  console.log(globalElementTransformScale.init);

  var dy2=distanceEntreDroiteEtPoint(globalElementTransformScale.init.cx,globalElementTransformScale.init.cy,globalElementTransformScale.init.pt8[0],globalElementTransformScale.init.pt8[1],newPointX,newPointY);
  var dx2=distanceEntreDroiteEtPoint(globalElementTransformScale.init.cx,globalElementTransformScale.init.cy,globalElementTransformScale.init.pt9[0],globalElementTransformScale.init.pt9[1],newPointX,newPointY);
  
//  console.log( 'dx2 = ' , dx2 , 'globalElementTransformScale.init.dx2=' , globalElementTransformScale.init.dx2 , ' dy2 = ' , dy2 , 'globalElementTransformScale.init.dy2=' , globalElementTransformScale.init.dy2 );
  
  var nouvelleEchelleX=dx2/globEchelle.dataInit.dx2*globEchelle.dataInit.t0.tab[globEchelle.dataInit.t0.indices.scale][1][0];
  var nouvelleEchelleY=dy2/globEchelle.dataInit.dy2*globEchelle.dataInit.t0.tab[globEchelle.dataInit.t0.indices.scale][1][1];
//  console.log( ' dy2 = ' , dy2 , 'globalElementTransformScale.init.dy2=' , globalElementTransformScale.init.dy2 , 'nouvelleEchelleY=' , nouvelleEchelleY , 'globEchelle.dataInit=',globEchelle.dataInit);
  
  
  var echelleTrouvee=false;
  var tt='';
  
  
  var max=40
  var min=1/max;
  
  if(nouvelleEchelleY>0 && nouvelleEchelleY<min){
   nouvelleEchelleY=min;
  }
  if(nouvelleEchelleY>0 && nouvelleEchelleY>max){
   nouvelleEchelleY=max;
  }
  
  if(nouvelleEchelleX>0 && nouvelleEchelleX<min){
   nouvelleEchelleX=min;
  }
  if(nouvelleEchelleX>0 && nouvelleEchelleX>max){
   nouvelleEchelleX=max;
  }
  
  if(nouvelleEchelleY<0 && nouvelleEchelleY>-min){
   nouvelleEchelleY=-min;
  }
  if(nouvelleEchelleY<0 && nouvelleEchelleY<-max){
   nouvelleEchelleY=-max;
  }
  if(nouvelleEchelleX<0 && nouvelleEchelleX>-min){
   nouvelleEchelleX=-min;
  }
  if(nouvelleEchelleX<0 && nouvelleEchelleX<-max){
   nouvelleEchelleX=-max;
  }
  nouvelleEchelleX=Math.round(nouvelleEchelleX*100)/100;
  nouvelleEchelleY=Math.round(nouvelleEchelleY*100)/100;
  if(_dssvg.aimanterPixel1!==0){
   nouvelleEchelleX=Math.round(nouvelleEchelleX*max)/max;
   nouvelleEchelleY=Math.round(nouvelleEchelleY*max)/max;
  }
  
  for(var i=0;i<globalElementTransformScale.init.t0.tab.length;i++){
   if(globalElementTransformScale.init.t0.tab[i][0]==='scale'){
    echelleTrouvee=true;
    if(nouvelleEchelleX===1 && nouvelleEchelleY===1){
    }else{
     tt+='scale('+nouvelleEchelleX+','+nouvelleEchelleY+')';
    }
   }else if(globalElementTransformScale.init.t0.tab[i][0]==='rotate'){
    if(globalElementTransformScale.init.t0.tab[i][1][0] === 0 && globalElementTransformScale.init.t0.tab[i][1][1] === 0 && globalElementTransformScale.init.t0.tab[i][1][2] === 0 ){
    }else{
     tt+=globalElementTransformScale.init.t0.tab[i][0]+'('+globalElementTransformScale.init.t0.tab[i][1].join(' ')+')';
    }
   }else{
    tt+=globalElementTransformScale.init.t0.tab[i][0]+'('+globalElementTransformScale.init.t0.tab[i][1].join(' ')+')';
   }
  }
  if(echelleTrouvee===false){
   if(nouvelleEchelleX===1 && nouvelleEchelleY===1){
   }else{
    tt+='scale('+nouvelleEchelleX+' '+nouvelleEchelleY+')';
   }
  }
  
  if(globalElementTransformScale.autreReference && ( globalElementTransformScale.autreReference.nodeName.toLowerCase()==='radialgradient' || globalElementTransformScale.autreReference.nodeName.toLowerCase()==='lineargradient')){

   _dssvg.arbre0[globalIndiceArbre].data.attributes['gradientTransform']=tt;
   globalGeneralSvgReferenceElement.setAttribute('transform',tt);
   // il faut aussi appliquer l'écart de la rotation à data-idarbre1="2"
   globalElementTransformScale.autreReference.setAttribute('gradientTransform' ,  tt );
   
  }else{

   globalGeneralSvgReferenceElement.setAttribute('transform',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=tt;

  }
  
  divlag1.innerHTML='<span>sE3Z='+_dssvg.zoom1+'</span>,<span>ex=' + nouvelleEchelleX+'</span>,<span>ey=' + nouvelleEchelleY+'</span>';

 }
 //========================================================================================================
 function mouseDownElementTransformScale3(e){
  e.stopPropagation();
  actionDownElementTransformScale3(e)
 }
 //========================================================================================================
 function touchDownElementTransformScale3(e){
  e.stopPropagation();
  actionDownElementTransformScale3(e.touches[0])
 }
 
//========================================================================================================
 var globalElementTransformScale={
  mouseStart:null,
  elementStart:null,
  matriceRacineInverse:null,
  rectangle:null,
  matriceElementElementInverse:null,
  matriceRacine:null,
  matriceElement:null,
  init:null,
  tabTransform:null,
  autreReference:null,
 }
 
 var globEchelle={
  angle:null,
  ref:null,
  centreX:null,
  centreY:null,
  deltaxInit:null,
  deltayInit:null,
  dataInit:null,
 };
 //========================================================================================================
 function actionDownElementTransformScale3(e){
//  console.log(e);
  
  initPosxy=positionSouris(e);
  ecran_appuye='felementTransformEchelle3';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  
  
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  globalElementTransformScale.initClick=initClick;
  globalElementTransformScale.initMouseDownObj=initMouseDownObj;
  
  
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ se/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  globalElementTransformScale.autreReference=null;
  if(globalGeneralSvgReferenceElement.length>1){

   globalElementTransformScale.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  
  
  globalElementTransformScale.init=JSON.parse(e.target.getAttribute('data-init'));
  
  
  globalElementTransformScale.matriceElement=globalGeneralSvgReferenceElement.getScreenCTM();
  
  
  globalElementTransformScale.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalElementTransformScale.matriceElementElementInverse.e=0;
  globalElementTransformScale.matriceElementElementInverse.f=0;
  
  globalElementTransformScale.matriceRacine=refZnDessin.getScreenCTM();
  globalElementTransformScale.matriceRacine.e=0;
  globalElementTransformScale.matriceRacine.f=0;
  
  globalElementTransformScale.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  
  globalElementTransformScale.matriceDeplacementPoint=globalElementTransformScale.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  
//  console.log('globalGeneralReferencePointControleClique=',globalGeneralReferencePointControleClique)
  
  globEchelle.dataInit=JSON.parse(globalGeneralReferencePointControleClique.getAttribute('data-init'));
//  console.log('globEchelle.dataInit=',globEchelle.dataInit);
  
  // hugues
  globEchelle.angle=parseFloat(globalGeneralReferencePointControleClique.getAttribute('data-angle'));
//  globEchelle.dxdy=JSON.parse(globalGeneralReferencePointControleClique.getAttribute('data-dxdy')).map(Number);
  
  globEchelle.ref=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' ce"]')[0];
  globEchelle.centreX=arrdi10000(globEchelle.ref.cx.animVal.value);
  globEchelle.centreY=arrdi10000(globEchelle.ref.cy.animVal.value);
  
  

  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalElementTransformScale.matriceRacineInverse);
 
  globEchelle.deltaxInit=initMouseDownObj.x - globEchelle.centreX;
  globEchelle.deltayInit=initMouseDownObj.y - globEchelle.centreY;
//  console.log('globEchelle.deltaxInit=',globEchelle.deltaxInit);
//  console.log('globEchelle.deltayInit=',globEchelle.deltayInit);

  
  
  globalElementTransformScale.mouseStart=refZnDessin.createSVGPoint();
		globalElementTransformScale.mouseStart.x = e.clientX; 
  globalElementTransformScale.mouseStart.y = e.clientY;
  globalElementTransformScale.mouseStart=globalElementTransformScale.mouseStart.matrixTransform(globalElementTransformScale.matriceRacineInverse);
  globalElementTransformScale.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };

  var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
  globalElementTransformScale.tabTransform=convertirTransformEnTableau(tr,['scale']);
  
  
  
  globalElementTransformScale.rectangle=null;
  var rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  if(rectangle){
   globalElementTransformScale.rectangle={
    ref:rectangle,
    x:arrdi10000(parseFloat(rectangle.getAttribute('x'))),
    y:arrdi10000(parseFloat(rectangle.getAttribute('y'))),
    width:arrdi10000(parseFloat(rectangle.getAttribute('width'))),
    height:arrdi10000(parseFloat(rectangle.getAttribute('height'))),
   }
  }

  var sxInit=globalElementTransformScale.tabTransform.tab[globalElementTransformScale.tabTransform.indices.scale][1][0];
  var syInit=globalElementTransformScale.tabTransform.tab[globalElementTransformScale.tabTransform.indices.scale][1][1];
  divlag1.innerHTML='<span>sEZ='+_dssvg.zoom1+'</span>,<span>sx='+arrdi10000(initPosxy.sx)+'</span>,<span>sy='+arrdi10000(initPosxy.sy)+'</span>,<span>ex=' + sxInit+'</span>,<span>ey=' + syInit+'</span>';
  
  return;
  
 }  
 
 

 
 
 //========================================================================================================
 function ajouterPointsDeControlePointsTransformElements(){
  var pt0    = refZnDessin.createSVGPoint();
  var pt1    = refZnDessin.createSVGPoint();
  var pt2    = refZnDessin.createSVGPoint();
  var pt3    = refZnDessin.createSVGPoint();
  var pt4    = refZnDessin.createSVGPoint();
  var pt5    = refZnDessin.createSVGPoint();
  var pt6    = refZnDessin.createSVGPoint();
  var pt7    = refZnDessin.createSVGPoint();
  var pt8    = refZnDessin.createSVGPoint();
  var pt9    = refZnDessin.createSVGPoint();
  var pt10   = refZnDessin.createSVGPoint();
  var ptBoite= refZnDessin.createSVGPoint();
  
  var lst=refZnDessin.querySelectorAll('*');
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='stop' || nn=='filter' || nn=='fegaussianblur'  || nn=='defs' ){
    continue;
   }
   if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours ){
    if(nn==='g'){
     continue;
    }     
   }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
    if(nn!=='g'){
     continue;
    }     
   }
   
   if(lst[i].getAttribute('data-type') && lst[i].getAttribute('data-type')=='systeme'){
//    console.log('data-type =',lst[i].getAttribute('data-type'));
    continue;
   }
   
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieTranE1' && extensions.dansDefs===true){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsTrE1' && extensions.dansDefs===false){
     continue;
    }
   }catch(e){
   }
   var col='red';
   if(_dssvg.mode_en_cours==='setModeSaisieDefsTrE1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours ){
    col='yellow';
   }
   
   try{
    var idarbre1=lst[i].getAttribute('data-idarbre1');
    var bounding=lst[i].getBBox(); // matrix
    var matrix=lst[i].getScreenCTM();
    var matrix=refZnDessin.getScreenCTM().inverse().multiply(lst[i].parentNode.getScreenCTM());
    var transform=(lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'');
    var boite=ajouteElemDansElem(lst[i].parentNode,'rect',{'data-rectangle':idarbre1,transform:transform,'data-type':'toRemove',x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
   }catch(e){
    if(String(e).indexOf('.getBBox is not a function')>=0){
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }
  }
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='stop' || nn=='filter' || nn=='fegaussianblur' ||  nn=='defs' ){
    continue;
   }
   
   if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours ){
    if(nn==='g'){
     continue;
    }     
   }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours ){
    if(nn!=='g'){
     continue;
    }     
   }
   
   
   if(lst[i].getAttribute('data-type') && lst[i].getAttribute('data-type')=='systeme'){
    continue;
   }
   
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieTranE1'  && extensions.dansDefs===true){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsTrE1' && extensions.dansDefs===false){
     continue;
    }
   }catch(e){
   }
//   console.log('extensions=',extensions,'_dssvg.mode_en_cours=',_dssvg.mode_en_cours,'lst[i]=',lst[i])
   
   
   
   try{
    
    
    var idarbre1=parseInt(lst[i].getAttribute('data-idarbre1'),10);
    
    if(nn==='radialgradient'){
//     console.log('ici');

     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
//     console.log(cascade);
     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');

//     console.log('transform=',transform);
     var id=lst[i].getAttribute('id');
     // créer un cercle de visualisation
     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:'+(id!==null?'url(#'+monClone.id+')':'rgba(255,0,0,1)')+';stroke:blue;stroke-width:0;', // fill:url(#f)
       transform:transform
      },
      true // enPremier
     );
     var bounding=cercle.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(cercle.getScreenCTM());
     
    }else if(nn==='lineargradient'){
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
//     console.log(cascade);
     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');

     var id=lst[i].getAttribute('id');

     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'stroke:url(#'+monClone.id+');stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      },
      true // enPremier
     );
     var bounding=ligne.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(ligne.getScreenCTM());

     
    }else{
    
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
     var bounding=lst[i].getBBox(); // matrix
    }
    
    
    pt1.x=bounding.x;
    pt1.y=bounding.y;
    pt1=pt1.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt2.x=bounding.x+bounding.width;
    pt2.y=bounding.y;
    pt2=pt2.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt3.x=bounding.x+bounding.width;
    pt3.y=bounding.y+bounding.height;  
    pt3=pt3.matrixTransform(matrixRelatifVersAbsolu);
    
    pt4.x=bounding.x;
    pt4.y=bounding.y+bounding.height;  
    pt4=pt4.matrixTransform(matrixRelatifVersAbsolu);
    
    
    
    

    if(_dssvg.idArbreCourant!==null){
     
     if(idarbre1==_dssvg.idArbreCourant){
      
      
      var matrixCascade=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
      var cascade={
       rotate:[],
       scale:[],
       translate:[],
       matrixa:[],
       matrixb:[],
       // skewX
      };
      var elt=lst[i];
      var goon=true;
      while(goon){
       
       if(elt.nodeName.toLowerCase()==='radialgradient'){
        var transform1=elt.getAttribute('gradientTransform')?elt.getAttribute('gradientTransform'):'';
       }else if(elt.nodeName.toLowerCase()==='lineargradient'){
        var transform1=elt.getAttribute('gradientTransform')?elt.getAttribute('gradientTransform'):'';
       }else{
        var transform1=elt.getAttribute('transform')?elt.getAttribute('transform'):'';
       }
       var t1=convertirTransformEnTableau(transform1,['scale','rotate','translate']);

       for(var j=0;j<t1.tab.length;j++){
         if(t1.tab[j][0]=='scale'){
          cascade.scale.push([t1.tab[j][1][0] , t1.tab[j][1][1] ]);
          matrixCascade=matrixCascade.scaleNonUniform(t1.tab[j][1][0] , t1.tab[j][1][1]);
         }else if(t1.tab[j][0]=='rotate'){
          cascade.rotate.push([t1.tab[j][1][0]]);
          matrixCascade=matrixCascade.rotate(t1.tab[j][1][0] , 0 , 0 );
         }else if(t1.tab[j][0]=='translate'){
          cascade.translate.push([t1.tab[j][1][0] , t1.tab[j][1][1] ]);
          matrixCascade=matrixCascade.translate(t1.tab[j][1][0] , 0 , 0 );
         }
         
       }
       cascade.matrixa.push([matrixCascade.a,matrixCascade.b,matrixCascade.c,matrixCascade.d,matrixCascade.e,matrixCascade.f]);
       cascade.matrixb.push(matrixCascade);
       if(elt==refZnDessin){
        goon=false;
       }else{
        elt=elt.parentNode;
        if(elt.nodeName==='defs'){
         goon=false;
        }
       }
      }
      
      var txtCascade1=JSON.stringify(cascade);
      
      
      var matrixParent=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
      for(var j=0;j<cascade.matrixb.length-1;j++){
       matrixParent=matrixParent.multiply(cascade.matrixb[j]);
      }
      var transformationParent=matrixToFnt(matrixParent); // transformationAngle

      var matrixElement=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
      for(var j=0;j<cascade.matrixb.length;j++){
       matrixElement=matrixElement.multiply(cascade.matrixb[j]);
      }
      var transformationElement=matrixToFnt(matrixElement);           // transformationAngleG

      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'fElementTransformTranslate1','data-angle':transformationParent.angle,'data-angleg':transformationElement.angle-transformationParent.angle,'data-type':'toRemove','data-elem':''+idarbre1+' hg',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(255,255,0,0.5);stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
      dot.addEventListener('mousedown'  , mouseDownTransformTranslate , 'dot');
      dot.addEventListener('touchstart' , touchDownTransformTranslate , 'dot');
      

      var tabRotate=[0,0,0];
      var tabSkew=[0];
      
       if(nn==='radialgradient' || nn==='lineargradient'){
        var transform0=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
       }else{
        var transform0=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
       }
      var t0=convertirTransformEnTableau(transform0,['rotate','skewx']);
      
      tabRotate=t0.tab[t0.indices.rotate][1];
      pt5.x=tabRotate[1];
      pt5.y=tabRotate[2];
      for(var j=t0.indices.rotate+1;j<t0.tab.length;j++){
       if(t0.tab[j][0]=='translate'){
        pt5.x-=t0.tab[j][1][0];
        pt5.y-=t0.tab[j][1][1];
       }
      }
      
      tabSkew=t0.tab[t0.indices.skewx][1];
      
      // pour echelle xy nouveau 3
      // point central de l'échelle basé sur un rectangle 2 2 10 10  + rotate( 90 7 7 ) + translate( 7 7 )   
      pt6.x=0; //bounding.x+bounding.width/2;
      pt6.y=0; // bounding.y+bounding.height/2;
      
      if(nn==='radialgradient' || nn==='lineargradient'){
       var transform0=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
      }else{
       var transform0=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
      }
      var t0=convertirTransformEnTableau(transform0,['scale','rotate']);
//      console.log('t0=',t0);
      var matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
      for(var j=0;j<t0.tab.length;j++){
        if(t0.tab[j][0]=='scale'){
         break;
        }else if(t0.tab[j][0]=='translate'){
         matrix=matrix.translate(t0.tab[j][1][0] , t0.tab[j][1][1] );
        }else if(t0.tab[j][0]=='rotate'){
         matrix=matrix.rotate(t0.tab[j][1][0] , t0.tab[j][1][1] , t0.tab[j][1][2] );
        }
      }
      // petit cercle du centre
      // pt6 est le point dans le parent de l'élément
      pt6=pt6.matrixTransform(matrix);
      
      
//      console.log('t0=',t0);
      

      var toto=refZnDessin.getScreenCTM().inverse().multiply(lst[i].parentNode.getScreenCTM()).inverse();
      var pt7=pt6.matrixTransform(toto);
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'felementTransformEchelle3', 'data-type':'toRemove','data-elem':''+idarbre1+' ce',cx:pt7.x,cy:pt7.y,r:rayonPoint/5,style:'fill:lightgreen;opacity:1;stroke:green;stroke-width:'+(1/4/_dssvg.zoom1)+';'});

      var cx=pt7.x
      var cy=pt7.y;


//      console.log('lst[i].getScreenCTM()=',lst[i].getScreenCTM()); // hugues
      var tr=matrixToFnt(lst[i].getScreenCTM());
//      var angle0=tr.angle;
      var angle0=t0.tab[t0.indices.rotate][1][0];
      
      
      
      var facteurx=t0.indices.scale>=0?(t0.tab[t0.indices.scale][1][0]):1;
      var facteury=t0.indices.scale>=0?(t0.tab[t0.indices.scale][1][1]):1;
      
//      console.log('facteurx=',facteurx , 'facteury=',facteury , 'angle0=',angle0 );
      
      
      
      pt8.x=cx+125/_dssvg.zoom1*Math.cos((angle0)/180*Math.PI);
      pt8.y=cy+125/_dssvg.zoom1*Math.sin((angle0)/180*Math.PI);
      
      pt9.x=cx+125/_dssvg.zoom1*Math.cos((angle0+90)/180*Math.PI);
      pt9.y=cy+125/_dssvg.zoom1*Math.sin((angle0+90)/180*Math.PI);
      
      var angle1=angle0;
/*      
      if(facteury<0){
       angle1=angle0-90;
       if(facteurx<0){
        angle1=angle0-90;
       }
      }else{
       if(facteurx<0){
        angle1=angle0+90; // angle
       }
      }
*/      
      pt10.x=cx+125/_dssvg.zoom1*Math.cos((angle1+45)/180*Math.PI);
      pt10.y=cy+125/_dssvg.zoom1*Math.sin((angle1+45)/180*Math.PI);
      
      
      var dy2=distanceEntreDroiteEtPoint(cx,cy,pt8.x,pt8.y,pt10.x,pt10.y);
      var dx2=distanceEntreDroiteEtPoint(cx,cy,pt9.x,pt9.y,pt10.x,pt10.y);
//      console.log( ' dy2 = ' , dy2 , ' , dx2 = ' , dx2 );
      
      
      var line  = ajouteElemDansElem(refZnDessin,'path',{ 'data-type':'toRemove','data-elem':''+idarbre1+'',d:'M '+cx+' '+cy+' L '+pt8.x+' '+pt8.y+'',style:'fill:lightgreen;opacity:0.9;stroke:purple;stroke-width:'+(1/_dssvg.zoom1/1)+';'});

      var line  = ajouteElemDansElem(refZnDessin,'path',{ 'data-type':'toRemove','data-elem':''+idarbre1+'',d:'M '+cx+' '+cy+' L '+pt9.x+' '+pt9.y+'',style:'fill:lightgreen;opacity:0.9;stroke:green;stroke-width:'+(1/_dssvg.zoom1/1)+';'});
      
      // hugues
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'felementTransformEchelle3','data-init':'{"angle":'+angle1+',"dx2":'+dx2+',"dy2":'+dy2+',"facteurx":'+facteurx+',"facteury":'+facteury+',"cx":'+cx+',"cy":'+cy+',"t0":'+JSON.stringify(t0)+',"pt8":['+pt8.x+','+pt8.y+'],"pt9":['+pt9.x+','+pt9.y+']}','data-type':'toRemove','data-elem':''+idarbre1+' se',cx:pt10.x,cy:pt10.y,r:rayonPoint,style:'fill:lightgreen;opacity:0.9;stroke:green;stroke-width:'+(1/_dssvg.zoom1)+';'});
      dot.addEventListener('mousedown'  ,mouseDownElementTransformScale3,'dot');
      dot.addEventListener('touchstart' ,touchDownElementTransformScale3,'dot');
      

      //===============================================================================================
      //===============================================================================================
      // pour angle de la rotation
      
      var t0=convertirTransformEnTableau(transform0,['rotate']);
//      console.log('t0=',t0);
      var angleRot=t0.tab[t0.indices.rotate][1][0];
      
      
      
      pt5=pt5.matrixTransform(matrixRelatifVersAbsolu);
      
      // pour centre de la rotation
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' cr',cx:pt5.x,cy:pt5.y,r:rayonPoint,style:'fill:plum;opacity:0.5;stroke:red;stroke-width:'+(2/_dssvg.zoom1)+';','data-action':'fElementTransformCentreRotation'});
      dot.addEventListener( 'mousedown'  , mouseDownRotatePosCentreTransformElement , 'dot' );
      dot.addEventListener( 'touchstart' , touchDownRotatePosCentreTransformElement , 'dot' );
      
      
      pt8.x=pt5.x+100/_dssvg.zoom1*Math.cos((angleRot)/180*Math.PI);
      pt8.y=pt5.y+100/_dssvg.zoom1*Math.sin((angleRot)/180*Math.PI);
      
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-init':'{"angleRot":'+angleRot+',"crx":'+pt5.x+',"cry":'+pt5.y+',"px":'+pt8.x+',"py":'+pt8.y+',"action":"actionDownRotateTransformAngleElement2,fElementTransformAngle2"}','data-type':'toRemove','data-elem':''+idarbre1+' an',cx:pt8.x,cy:pt8.y,r:rayonPoint,style:'fill:plum;opacity:0.5;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
      dot.addEventListener( 'mousedown'  , mouseDownRotateAngleTransformElement2 , 'dot' );
      dot.addEventListener( 'touchstart' , touchDownRotateAngleTransformElement2 , 'dot' );
      

      // pour angle skewx
      var angleSkewx=tabSkew[0];
      var posx=pt5.x+(150/_dssvg.zoom1)*Math.cos((angleRot+90)/180*Math.PI);
      var posy=pt5.y+(150/_dssvg.zoom1)*Math.sin((angleRot+90)/180*Math.PI);
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' sk',cx:posx,cy:posy,r:rayonPoint,style:'fill:#2196f3;opacity:0.5;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';','data-action':'fElementTransformSkewx'});
      dot.addEventListener( 'mousedown'  , mouseDownSkewxTransformElement , 'dot' );
      dot.addEventListener( 'touchstart' , touchDownSkewxTransformElement , 'dot' );

      



     }else{
      
      var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt1.x-6/_dssvg.zoom1,y:pt1.y-3/_dssvg.zoom1,style:'fill:white;stroke:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' hg',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(255,0,0,0.2);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';','data-action':'selectionnerElementAtransformer'});
      dot.addEventListener('mousedown',selectionnerElementAtransformer,'dot');
      dot.addEventListener('touchstart',selectionnerElementAtransformer,'dot');

      
     }
    }else{
     var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt1.x-6/_dssvg.zoom1,y:pt1.y-3/_dssvg.zoom1,style:'fill:transparent;white:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
     var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' hg',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(255,0,0,0.2);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';','data-action':'selectionnerElementAtransformer'});
     dot.addEventListener('mousedown',selectionnerElementAtransformer,'dot');
     dot.addEventListener('touchstart',selectionnerElementAtransformer,'dot');
    }
    
   }catch(e){
    if(0===1 ){
    }else if(String(e).indexOf('getScreenCTM is not a function')>=0 ){
     var nn=lst[i].nodeName;
     if(
      nn==='cc:requires' || nn==='cc:permits' || nn==='cc:prohibits' || nn==='cc:agent' || nn==='cc:license'  || nn==='cc:work' || 
      nn==='dc:description' || nn==='dc:format' || nn==='dc:type'  || nn==='dc:title' || nn==='dc:creator'  || nn==='dc:date' ||
      nn==='metadata' || nn==='title' || nn==='desc' ||  nn==='rdf:rdf'  
     ){
     }else{
      console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
     }
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }
  }
 }
 //========================================================================================================
 //========================================================================================================
 function actionMoveSelectionPtElement(e){ // ecran_appuye='deplacementPoint';
  

  
  initPosxy=positionSouris(e); // globalElementTransformSkewx
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalEditionPoints.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalEditionPoints.mouseStart.x;
  pt0.y = current.y - globalEditionPoints.mouseStart.y;

  var newPointX=globalEditionPoints.elementStart.x+pt0.x;
  var newPointY=globalEditionPoints.elementStart.y+pt0.y;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
  
  var newPointX=globalEditionPoints.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalEditionPoints.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );

  var deltaRel=refZnDessin.createSVGPoint();  
  deltaRel=pt0.matrixTransform(globalEditionPoints.matriceElementElementInverse).matrixTransform(globalEditionPoints.matriceRacine);
  deltaRel.x=deltaRel.x/_dssvg.parametres.diviseurDeplacement;
  deltaRel.y=deltaRel.y/_dssvg.parametres.diviseurDeplacement;


  if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='lineargradient'){

   if(globalEditionPoints.tableauIndcesPoints[0]==0){
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[0]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[1]+deltaRel.y);
    globalGeneralSvgReferenceElement.setAttribute('x1',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['x1']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('y1',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['y1']=newPosy1;
    
    if(globalEditionPoints.autreReference!==null){

     globalEditionPoints.autreReference.setAttribute('x1'  ,newPosx1);
     globalEditionPoints.autreReference.setAttribute('y1'  ,newPosy1);
     globalEditionPoints.autreReferenceInverse.setAttribute('x1',newPosx1);
     globalEditionPoints.autreReferenceInverse.setAttribute('y1',newPosy1);
     
    }
    
    divLag1Pour({t:'dppLiZ',l:'dppLiZ','x1':newPosx1,'y1':newPosy1});
    
    
   }else if(globalEditionPoints.tableauIndcesPoints[0]==2){
    
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[2]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[3]+deltaRel.y);
    globalGeneralSvgReferenceElement.setAttribute('x2',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['x2']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('y2',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['y2']=newPosy1;

    if(globalEditionPoints.autreReference!==null){
     globalEditionPoints.autreReference.setAttribute('x2'  ,newPosx1);
     globalEditionPoints.autreReference.setAttribute('y2'  ,newPosy1);
     globalEditionPoints.autreReferenceInverse.setAttribute('x2',newPosx1);
     globalEditionPoints.autreReferenceInverse.setAttribute('y2',newPosy1);
     
    }
    divLag1Pour({t:'dppLiZ',l:'dppLiZ','x2':newPosx1,'y2':newPosy1});
    

    
   }
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image' ){
   
   if(globalEditionPoints.tableauIndcesPoints[0]==0){
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[0]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[1]+deltaRel.y);
    globalGeneralSvgReferenceElement.setAttribute('x',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['x']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('y',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['y']=newPosy1;

    divLag1Pour({t:'dppReZ',l:'dppReZ','x':newPosx1,'y':newPosy1});
    
    
   }else if(globalEditionPoints.tableauIndcesPoints[0]==2){
    
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[2]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[3]+deltaRel.y);
    if(newPosx1>=0){
     globalGeneralSvgReferenceElement.setAttribute('width',newPosx1);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['width']=newPosx1;
    }
    if(newPosy1>=0){
     globalGeneralSvgReferenceElement.setAttribute('height',newPosy1);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['height']=newPosy1;
    }
    divLag1Pour({t:'dppReZ',l:'dppReZ','w':newPosx1,'h':newPosy1});
   }
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='ellipse'){

   if(globalEditionPoints.tableauIndcesPoints[0]==0){
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[0]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[1]+deltaRel.y);
 //    console.log('newPosx1=',newPosx1,'newPosy1=',newPosy1);
    globalGeneralSvgReferenceElement.setAttribute('cx',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['cx']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('cy',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['cy']=newPosy1;
    
    divLag1Pour({t:'dppElZ',l:'dppElZ','cx':arrdi10000(newPosx1),'cy':arrdi10000(newPosy1)});
    
   }else if(globalEditionPoints.tableauIndcesPoints[0]==2){
   
    var newRx=arrdi10000(globalSelectionPoints.tabAbsolu[2]+deltaRel.x);
    if(newRx>=0){
     globalGeneralSvgReferenceElement.setAttribute('rx',newRx);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['rx']=newRx;
    }
    var newRy=arrdi10000(globalSelectionPoints.tabAbsolu[3]+deltaRel.y);
    if(newRy>=0){
     globalGeneralSvgReferenceElement.setAttribute('ry',newRy);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['ry']=newRy;
    }

    divLag1Pour({t:'dppElZ',l:'dppElZ','rx':arrdi10000(newRx),'ry':arrdi10000(newRy)});
   }
 
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='circle' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='radialgradient' ){
   
//   console.log(globalEditionPoints.tableauIndcesPoints);
   
   if(globalEditionPoints.tableauIndcesPoints[0]==0){
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[0]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[1]+deltaRel.y);
//    console.log('newPosx1=',newPosx1,'newPosy1=',newPosy1);
    globalGeneralSvgReferenceElement.setAttribute('cx',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['cx']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('cy',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['cy']=newPosy1;

    if(globalEditionPoints.autreReference!==null){

     globalEditionPoints.autreReference.setAttribute('cx'  ,newPosx1);
     globalEditionPoints.autreReference.setAttribute('cy'  ,newPosy1);
     globalEditionPoints.autreReferenceInverse.setAttribute('cx',newPosx1);
     globalEditionPoints.autreReferenceInverse.setAttribute('cy',newPosy1);
     
    }
    
    divLag1Pour({t:'dppCeZ',l:'dppCeZ','cx':newPosx1,'cy':newPosy1});
    
   }else if(globalEditionPoints.tableauIndcesPoints[0]==2){
    
    var newR=arrdi10000(globalSelectionPoints.tabAbsolu[2]+(deltaRel.x+deltaRel.y)/2);
    if(newR>=0){
     globalGeneralSvgReferenceElement.setAttribute('r',newR);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['r']=newR;
     if(globalEditionPoints.autreReference!==null){

      globalEditionPoints.autreReference.setAttribute('r'  ,newR);
      globalEditionPoints.autreReferenceInverse.setAttribute('r',newR);
     }
     divLag1Pour({t:'dppCeZ',l:'dppCeZ','r':newR});
    }
   }
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){
   var tt='';
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
    if(i==globalEditionPoints.tableauIndcesPoints[0]){
     var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i]+deltaRel.x);
     var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i+1]+deltaRel.y);
     tt+='  '+newPosx1+' '+(newPosy1)+'  ';
     divLag1Pour({t:'dppPlZ',l:'dppPlZ','x':newPosx1,'y':newPosy1});
    }else{
     tt+=' '+globalSelectionPoints.tabOriginal[i]+' '+globalSelectionPoints.tabOriginal[i+1];
    }
   }
 		globalGeneralSvgReferenceElement.setAttribute('points',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){
   var tt='';
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
    if(i==globalEditionPoints.tableauIndcesPoints[0]){
     
     var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i]+deltaRel.x);
     var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i+1]+deltaRel.y);
     divlag1.innerHTML='<span>plygZ='+_dssvg.zoom1+'</span>,<span style="color:red;">x='+arrdi10000(newPosx1)+ '</span>,<span style="color:red;">y=' +arrdi10000(newPosy1)+'</span>';
     tt+='  '+newPosx1+' '+(newPosy1)+'  ';
     
     divLag1Pour({t:'dppPgZ',l:'dppPgZ','x':newPosx1,'y':newPosy1});
     
    }else{
     tt+=' '+globalSelectionPoints.tabOriginal[i]+' '+globalSelectionPoints.tabOriginal[i+1];
    }
   }
 		globalGeneralSvgReferenceElement.setAttribute('points',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   
   
   divlag1.innerHTML='<span>a1Z='+_dssvg.zoom1+'</span>,<span>x='+arrdi10000(newPointX)+ '</span>,<span>y=' +arrdi10000(newPointY)+'</span>,<span>x=' + arrdi10000(globalGeneralReferencePointControleClique.cx.animVal.value)+'</span>,<span>y=' + arrdi10000(globalGeneralReferencePointControleClique.cy.animVal.value)+'</span>';
   
   var tt='';
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i++){
    if(i==globalEditionPoints.tableauIndcesPoints[0]){
     if(globalSelectionPoints.tabOriginal[i][0]=='M' || globalSelectionPoints.tabOriginal[i][0]=='L' || globalSelectionPoints.tabOriginal[i][0]=='m'  || globalSelectionPoints.tabOriginal[i][0]=='l' ){

      var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
      var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][2]+deltaRel.y);
      
      tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' '+(newPosy1)+' ';
      if(globalEditionPoints.refLignesPointsDeControle1){
       // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
       
       globalEditionPoints.tabInit1[1]=newPointX;
       globalEditionPoints.tabInit1[2]=newPointY;
       globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       
       
      }

      divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='h' || globalSelectionPoints.tabOriginal[i][0]=='H' ){

      var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
      
      tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' ';
      if(globalEditionPoints.refLignesPointsDeControle1){
       
       globalEditionPoints.tabInit1[1]=newPointX;
       globalEditionPoints.tabInit1[2]=newPointY;
       globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
      }
      divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1});
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='v' || globalSelectionPoints.tabOriginal[i][0]=='V' ){

      var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.y);
      
      tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosy1)+' ';
      if(globalEditionPoints.refLignesPointsDeControle1){
       
       globalEditionPoints.tabInit1[1]=newPointX;
       globalEditionPoints.tabInit1[2]=newPointY;
       globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
      }
      divLag1Pour({t:'dppChZ',l:'dppChZ','y':newPosy1});
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='a' || globalSelectionPoints.tabOriginal[i][0]=='A' ){

      if(globalEditionPoints.tableauIndcesPoints[1]==6){
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][6]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][7]+deltaRel.y);
       
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(globalSelectionPoints.tabOriginal[i][3])+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(globalSelectionPoints.tabOriginal[i][5])+' '+(newPosx1)+' '+(newPosy1)+' ';
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
       
      }else if(globalEditionPoints.tableauIndcesPoints[1]==3){
       
       var angleOriginal=globalEditionPoints.tableauIndcesPoints[2];
       var px1=globalEditionPoints.tableauIndcesPoints[3];
       var py1=globalEditionPoints.tableauIndcesPoints[4];
       var ancienAnglePoints=globalEditionPoints.tableauIndcesPoints[5];

       var nouvelAnglePoints=angle2Points(px1,py1,newPointX,newPointY);
       var deltaAngle=ancienAnglePoints-nouvelAnglePoints;
       var nouvelAngle=angleOriginal+deltaAngle;
       nouvelAngle=arrdi10000(nouvelAngle);
       if(nouvelAngle>=360){
        nouvelAngle-=360*parseInt(nouvelAngle/360,10);
       }
       if(nouvelAngle<=-360){
        nouvelAngle+=360*Math.abs(parseInt(nouvelAngle/360,10));
       }
//       console.log('nouvelAngle=',nouvelAngle,'angleOriginal=',angleOriginal , 'px1=',px1 , 'py1=' , py1 , 'nouvelAnglePoints=' , nouvelAnglePoints , 'deltaAngle=' , deltaAngle );
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(nouvelAngle)+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(globalSelectionPoints.tabOriginal[i][5])+' '+(globalSelectionPoints.tabOriginal[i][6])+' '+(globalSelectionPoints.tabOriginal[i][7])+' ';
//       divlag1.innerHTML='<span>1Z='+_dssvg.zoom1+'</span>,<span>x='+arrdi10000(newPointX)+ '</span>,<span>y=' +arrdi10000(newPointY)+'</span>,<span>a=' + arrdi10000(nouvelAngle)+'</span>';
       divLag1Pour({t:'dppChZ',l:'dppChZ','a':nouvelAngle});
      

      }else if(globalEditionPoints.tableauIndcesPoints[1]==1){
       // points pour gérer rx et ry
       // M 36 86 A 80 40 0 1 1 79 88 
       
       var rayonOriginal=globalEditionPoints.tableauIndcesPoints[2];
       var px1=globalEditionPoints.tableauIndcesPoints[3];
       var py1=globalEditionPoints.tableauIndcesPoints[4];
       var nouvelleDistanceAbsolue=Math.sqrt((newPointX-px1)*(newPointX-px1)+(newPointY-py1)*(newPointY-py1));
       nouvelleDistanceAbsolue=arrdi10000(nouvelleDistanceAbsolue);
//       console.log('nouvelleDistanceAbsolue=',nouvelleDistanceAbsolue);
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(nouvelleDistanceAbsolue)           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(globalSelectionPoints.tabOriginal[i][3])+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(globalSelectionPoints.tabOriginal[i][5])+' '+(globalSelectionPoints.tabOriginal[i][6])+' '+(globalSelectionPoints.tabOriginal[i][7])+' ';
       
       divLag1Pour({t:'dppChZ',l:'dppChZ','rx':nouvelleDistanceAbsolue});

      }else if(globalEditionPoints.tableauIndcesPoints[1]==2){
       // points pour gérer rx et ry
       // M 36 86 A 80 40 0 1 1 79 88 
       
       var rayonOriginal=globalEditionPoints.tableauIndcesPoints[2];
       var px1=globalEditionPoints.tableauIndcesPoints[3];
       var py1=globalEditionPoints.tableauIndcesPoints[4];
       var nouvelleDistanceAbsolue=Math.sqrt((newPointX-px1)*(newPointX-px1)+(newPointY-py1)*(newPointY-py1));
       nouvelleDistanceAbsolue=arrdi10000(nouvelleDistanceAbsolue);
//       console.log('nouvelleDistanceAbsolue=',nouvelleDistanceAbsolue);
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(nouvelleDistanceAbsolue)           +' '+(globalSelectionPoints.tabOriginal[i][3])+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(globalSelectionPoints.tabOriginal[i][5])+' '+(globalSelectionPoints.tabOriginal[i][6])+' '+(globalSelectionPoints.tabOriginal[i][7])+' ';
       
       divLag1Pour({t:'dppChZ',l:'dppChZ','ry':nouvelleDistanceAbsolue});
      }
      
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='t' || globalSelectionPoints.tabOriginal[i][0]=='T' ){
      
      
      var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
      var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][2]+deltaRel.y);
      tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' '+(newPosy1)+' ';
      
      divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='q' || globalSelectionPoints.tabOriginal[i][0]=='Q'  || globalSelectionPoints.tabOriginal[i][0]=='s'  || globalSelectionPoints.tabOriginal[i][0]=='S' ){
      
      
      if(globalEditionPoints.tableauIndcesPoints[1]==1){
       
       // point de controle 
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][2]+deltaRel.y);
       tt+=globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' '+(newPosy1)+' '+(globalSelectionPoints.tabOriginal[i][3])           +' '+(globalSelectionPoints.tabOriginal[i][4])           +' ';
       
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
       
       if(globalEditionPoints.refLignesPointsDeControle1){
        globalEditionPoints.tabInit1[4]=newPointX;
        globalEditionPoints.tabInit1[5]=newPointY;
        globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       }
       
       if(globalEditionPoints.refLignesPointsDeControle2){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit2[4]=newPointX;
        globalEditionPoints.tabInit2[5]=newPointY;
        globalEditionPoints.refLignesPointsDeControle2.setAttribute('d',globalEditionPoints.tabInit2.join(' ') );
       }
       
       
      }else if(globalEditionPoints.tableauIndcesPoints[1]==3){
       
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][3]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][4]+deltaRel.y);
       // point de fin
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(newPosx1)+' '+(newPosy1)+' '+' ';
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
      }
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='c' || globalSelectionPoints.tabOriginal[i][0]=='C' ){
      
      
      if(globalEditionPoints.tableauIndcesPoints[1]==1){
       
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][2]+deltaRel.y);
       // premier point de contrôle
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' '+(newPosy1)+' '+(globalSelectionPoints.tabOriginal[i][3])           +' '+(globalSelectionPoints.tabOriginal[i][4])           +' '+(globalSelectionPoints.tabOriginal[i][5])           +' '+(globalSelectionPoints.tabOriginal[i][6])          +' ';
       
       if(globalEditionPoints.refLignesPointsDeControle1){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit1[4]=newPointX;
        globalEditionPoints.tabInit1[5]=newPointY;
        globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       }
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
       
       
       
      }else if(globalEditionPoints.tableauIndcesPoints[1]==3){
       
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][3]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][4]+deltaRel.y);
       // deuxième point de contrôle
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(newPosx1)+' '+(newPosy1)+' '+(globalSelectionPoints.tabOriginal[i][5])           +' '+(globalSelectionPoints.tabOriginal[i][6])+' ';
       
       if(globalEditionPoints.refLignesPointsDeControle1){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit1[4]=newPointX;
        globalEditionPoints.tabInit1[5]=newPointY;
        globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       }
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});

      }else if(globalEditionPoints.tableauIndcesPoints[1]==5){

       // point final
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][5]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][6]+deltaRel.y);
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(globalSelectionPoints.tabOriginal[i][3])+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(newPosx1)+' '+(newPosy1)+' ';
       
       if(globalEditionPoints.refLignesPointsDeControle1){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit1[1]=newPointX;
        globalEditionPoints.tabInit1[2]=newPointY;
        globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       }
       
       if(globalEditionPoints.refLignesPointsDeControle2){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit2[1]=newPointX;
        globalEditionPoints.tabInit2[2]=newPointY;
        globalEditionPoints.refLignesPointsDeControle2.setAttribute('d',globalEditionPoints.tabInit2.join(' ') );
       }
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
      }
      
     }else{
      console.warn('non traité 1 : ', globalSelectionPoints.tabOriginal[i] );
      tt+=' '+globalSelectionPoints.tabOriginal[i].join(' ');
     }
    }else{
//     console.log('non traité 2 : ', globalSelectionPoints.tabOriginal[i] );
     tt+=' '+globalSelectionPoints.tabOriginal[i].join(' ');
    }
   }
//   console.log('tt='+tt);
 		globalGeneralSvgReferenceElement.setAttribute('d',tt); // _dssvg.idArbreCourant
   _dssvg.arbre0[globalIndiceArbre].data.attributes['d']=tt;

  }
  if(globalEditionPoints.referenceRectangle){
   var bounding=globalGeneralSvgReferenceElement.getBBox(); // matrix
   globalEditionPoints.referenceRectangle.setAttribute('x',bounding.x);
   globalEditionPoints.referenceRectangle.setAttribute('y',bounding.y);
   globalEditionPoints.referenceRectangle.setAttribute('width',bounding.width);
   globalEditionPoints.referenceRectangle.setAttribute('height',bounding.height);
  }
  
  
 }
 //========================================================================================================
 var globalEditionPoints={
  tableauIndcesPoints          : null,
  referenceRectangle           : null,
  matriceElementElementInverse : null,
  matriceRacine                : null,
  matriceRacineInverse         : null,
  matriceDeplacementPoint      : null,
  mouseStart                   : null,
  elementStart                 : null,
  matriceAbsolueInverse        : null,
  matriceSvgInverse            : null,
  refLignesPointsDeControle1   : null,
  refLignesPointsDeControle2   : null,
  tabInit1                     : null,
  tabInit2                     : null,
  autreReference               : null,
  autreReferenceInverse        : null,
 };
 //========================================================================================================
 function touchDownSelectionPtElement(e){
  e.stopPropagation();
  actionDownSelectionPtElement(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownSelectionPtElement(e){
  e.stopPropagation();
  actionDownSelectionPtElement(e);
 }
  ///========================================================================================================
  ///========================================================================================================
 function actionDownSelectionPtElement(e){
  
  
  initPosxy=positionSouris(e);
  ecran_appuye='deplacementPoint';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem'),10);
  
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]')[0];
  
  globalEditionPoints.autreReference=null; // pour le radialGradient
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){
   globalEditionPoints.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
//   console.log('globalEditionPoints.autreReference=',globalEditionPoints.autreReference)
   globalEditionPoints.autreReferenceInverse=document.querySelectorAll('[id="inverse_de_'+_dssvg.idArbreCourant+'"]')[0];

  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  
  
  
//  console.log('globalGeneralReferencePointControleClique=',globalGeneralReferencePointControleClique);
  globalIndicePoint=parseInt(globalGeneralReferencePointControleClique.getAttribute('data-indicepoint'),10);
//  console.log('globalIndicePoint=',globalIndicePoint)
  
  
  
  globalEditionPoints.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalEditionPoints.matriceElementElementInverse.e=0;
  globalEditionPoints.matriceElementElementInverse.f=0;
  
  globalEditionPoints.matriceRacine=refZnDessin.getScreenCTM();
  globalEditionPoints.matriceRacine.e=0;
  globalEditionPoints.matriceRacine.f=0;
  
  globalEditionPoints.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();

  globalEditionPoints.matriceDeplacementPoint=globalEditionPoints.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  globalEditionPoints.matriceDeplacementPoint.e=0;
  globalEditionPoints.matriceDeplacementPoint.f=0;
  
  
  globalEditionPoints.mouseStart=refZnDessin.createSVGPoint();
		globalEditionPoints.mouseStart.x = e.clientX; 
  globalEditionPoints.mouseStart.y = e.clientY;
  globalEditionPoints.mouseStart=globalEditionPoints.mouseStart.matrixTransform(globalEditionPoints.matriceRacineInverse);
  globalEditionPoints.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };

  
  
  divlag1.innerHTML='<span>b1Z='+_dssvg.zoom1+'</span>,<span>sx='+arrdi10000(initPosxy.sx) + '</span>,<span>sy=' + arrdi10000(initPosxy.sy)+'</span>,<span>x=' + arrdi10000(globalGeneralReferencePointControleClique.cx.animVal.value)+'</span>,<span>y=' + arrdi10000(globalGeneralReferencePointControleClique.cy.animVal.value)+'</span>';

  globalEditionPoints.tableauIndcesPoints=e.target.getAttribute('data-indice').split(',').map(Number);
  globalEditionPoints.referenceRectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  
  globalEditionPoints.matriceSvgInverse=refZnDessin.getScreenCTM().inverse();
  
  
//  globTranslateMatriceAbsolueInverse=refZnDessin.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.getScreenCTM()).inverse();
  globalEditionPoints.matriceAbsolueInverse=refZnDessin.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.getScreenCTM()).inverse();
  globalEditionPoints.matriceAbsolueInverse.e=0;
  globalEditionPoints.matriceAbsolueInverse.f=0;
  
  globalEditionPoints.refLignesPointsDeControle1=null;
  
  var recherche1=globalGeneralReferencePointControleClique.getAttribute('data-recherche1');
  if(recherche1 && recherche1!==''){
   globalEditionPoints.refLignesPointsDeControle1=document.querySelectorAll('[data-indice="'+recherche1+'"]')[0];
   if(globalEditionPoints.refLignesPointsDeControle1){
      globalEditionPoints.tabInit1=String(globalEditionPoints.refLignesPointsDeControle1.getAttribute('d')).replace(/ /g,',').replace(/,,/g,',').split(',');
   }
  }

  globalEditionPoints.refLignesPointsDeControle2=null;
  var recherche2=globalGeneralReferencePointControleClique.getAttribute('data-recherche2');
//  console.log('recherche2=',recherche2)
  if(recherche2 && recherche2!==''){
   globalEditionPoints.refLignesPointsDeControle2=document.querySelectorAll('[data-indice="'+recherche2+'"]')[0];
   if(globalEditionPoints.refLignesPointsDeControle2){
    globalEditionPoints.tabInit2=String(globalEditionPoints.refLignesPointsDeControle2.getAttribute('d')).replace(/ /g,',').replace(/,,/g,',').split(',');
   }
  }
 }
 
 //========================================================================================================
 function poigneeAffichable(x,y){
  var afficherObjet=true;
  if(x<_dssvg.viewBoxInit[0]){ // *_dssvg.zoom1
   afficherObjet=false;
  }else if(x>(_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2])){ // *_dssvg.zoom1
   afficherObjet=false;
  }else if(y<_dssvg.viewBoxInit[1]){
   afficherObjet=false;
  }else if(y>(_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3])){
   afficherObjet=false;
  }
  return afficherObjet;
 }
 
 //========================================================================================================
 function affichePtsControlDetailDeElement(type){

  var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.getScreenCTM());
  matrixRelatifVersAbsolu=matrixRelatifVersAbsolu;
  var pt0    = refZnDessin.createSVGPoint();
  var ptC2   = refZnDessin.createSVGPoint();
  var ptC1   = refZnDessin.createSVGPoint();
  var ptPrec = refZnDessin.createSVGPoint();
  var pointFixePrecedent={x:0,y:0};
  
  var filcol='rgba(0,0,255,0.5)';
  var strokWit=1;
  var strk='stroke:red';
  
  var extensionSymbole=globalGeneralSvgReferenceElement.getAttribute('data-extensions');
  if(extensionSymbole){
   extensionSymbole=JSON.parse(extensionSymbole);
   if(extensionSymbole.hasOwnProperty('dansSymbol') && extensionSymbole.dansSymbol===true){
    var monClone=globalGeneralSvgReferenceElement.cloneNode(true);
    refZnDessin.prepend(monClone);
   }
  }
  
  if(type=='ellipse'){
   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   
   filcol='rgba(0,128,0,0.5)';
   ptC1.x=globalSelectionPoints.tabAbsolu[0]+globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[1]+globalSelectionPoints.tabAbsolu[3];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-fnt':'actionMoveSelectionPtElement',cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,3',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }

  }else if(type=='circle' || 'radialgradient'===type ){
    
   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:yellow;'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   
   filcol='rgba(0,128,0,0.5)';
   ptC1.x=globalSelectionPoints.tabAbsolu[0]+globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[1]+globalSelectionPoints.tabAbsolu[2];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,2','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }

  }else if(type=='line' || 'lineargradient'===type){

   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
   }

   ptC1.x=globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[3];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,3','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
   }

//     globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('x1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('x2')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y2'))];

  }else if( type=='image' ){

   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
   }
   
   filcol='rgba(0,128,0,0.5)';
   ptC1.x=globalSelectionPoints.tabAbsolu[0]+globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[1]+globalSelectionPoints.tabAbsolu[3];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,3','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   
  }else if(type=='rect'){
   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   
   filcol='rgba(0,128,0,0.5)';
   ptC1.x=globalSelectionPoints.tabAbsolu[0]+globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[1]+globalSelectionPoints.tabAbsolu[3];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,3','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   

  }else if(type=='polyline'){
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
    filcol='rgba(0,0,255,0.5)';
    strokWit=1;
    if(i==0){
     filcol='yellow';
     strokWit=2;
    }
    strk='stroke:red';
    pt0.x=globalSelectionPoints.tabOriginal[i];
    pt0.y=globalSelectionPoints.tabOriginal[i+1];
    pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

    if(poigneeAffichable(pt0.x,pt0.y)){
     var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-fnt':'actionMoveSelectionPtElement','data-indicepoint':i,'data-indice':i,cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
     dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
     dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
    }


   }

  }else if(type=='polygon'){
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
    filcol='rgba(0,0,255,0.5)';
    strokWit=1;
    if(i==0){
     filcol='rgba(221,160,221,0.5)';
     strokWit=3;
    }
    strk='stroke:red';
    pt0.x=globalSelectionPoints.tabOriginal[i];
    pt0.y=globalSelectionPoints.tabOriginal[i+1];
    pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

    if(poigneeAffichable(pt0.x,pt0.y)){
     var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-fnt':'actionMoveSelectionPtElement','data-indicepoint':i,'data-indice':i,cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
     dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
     dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
    }


   }

  }else if(type=='path'){
//   console.log('globalSelectionPoints.tabAbsolu=',globalSelectionPoints.tabAbsolu);
   
   for(var i=0;i<globalSelectionPoints.tabAbsolu.length;i++){
//    console.log('globalSelectionPoints.tabAbsolu['+i+']=',globalSelectionPoints.tabAbsolu[i]);
    filcol='rgba(0,0,255,0.5)';
    strokWit=1;
    if(i==0){
     filcol='yellow';
     strokWit=2;
    }
    
    strk='stroke:red';
    if(globalSelectionPoints.tabOriginal[i][0]===globalSelectionPoints.tabOriginal[i][0].toLowerCase()){
     strk='stroke:yellow';
    }
    
    if(globalSelectionPoints.tabAbsolu[i][0]=='L' || globalSelectionPoints.tabAbsolu[i][0]=='M' || (globalSelectionPoints.tabAbsolu[i][0]=='m' && i==0)){
     
     pt0.x=globalSelectionPoints.tabAbsolu[i][1];
     pt0.y=globalSelectionPoints.tabAbsolu[i][2];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     var recherche1='';
     if(i<globalSelectionPoints.tabAbsolu.length-2 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche1='C1,'+(i+1);
     }
     
      
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':recherche1,'data-indice':i+',1,2','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';opacity:0.7;'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
     }
     
     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][1];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][2];
     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='A' ){

     pt0.x=globalSelectionPoints.tabAbsolu[i][6];
     pt0.y=globalSelectionPoints.tabAbsolu[i][7];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
     
     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':i+',6,7','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
     }




     // points pour gérer la rotation
     ptPrec.x=pointFixePrecedent.x;
     ptPrec.y=pointFixePrecedent.y;
     ptPrec=ptPrec.matrixTransform(matrixRelatifVersAbsolu);

     var angleEntreLesDeuxPointsDeArc=angle2Points(ptPrec.x,ptPrec.y,pt0.x,pt0.y);
     
     // point au milieu du segment     
     var px1=(pt0.x+ptPrec.x)/2;
     var py1=(pt0.y+ptPrec.y)/2;
     // todo ajouter la transformation matricielle 
     if(poigneeAffichable(px1,py1)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-fnt':'actionMoveSelectionPtElement',cx:px1,cy:py1,r:rayonPoint/3,style:'fill:rgba(128,128,128,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1/3)+';'}); // pink
     }

     // point de définition de l'angle     
     var px2=px1+100/_dssvg.zoom1*Math.cos((globalSelectionPoints.tabAbsolu[i][3]-angleEntreLesDeuxPointsDeArc+90)*Math.PI/180);
     var py2=py1+100/_dssvg.zoom1*Math.sin((globalSelectionPoints.tabAbsolu[i][3]-angleEntreLesDeuxPointsDeArc+90)*Math.PI/180);
     
     if(poigneeAffichable(px1,py1) || poigneeAffichable(px2,py2) ){
      var line1 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+px1+ ' '+py1+ ' L ' + px2 + ' ' + py2 +'',style:'fill:transparent;stroke:#444; stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

     // ligne pour angle 0     
     var px3=px1+100/_dssvg.zoom1*Math.cos((90-angleEntreLesDeuxPointsDeArc)*Math.PI/180);
     var py3=py1+100/_dssvg.zoom1*Math.sin((90-angleEntreLesDeuxPointsDeArc)*Math.PI/180);

     if(poigneeAffichable(px1,py1) || poigneeAffichable(px3,py3) ){
      var line1 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+px1+ ' '+py1+ ' L ' + px3 + ' ' + py3 +'',style:'fill:transparent;stroke:#444; stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

     var ancienAngle=angle2Points(px1,py1,px2,py2);

     if(poigneeAffichable(px2,py2)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':i+',3,'+globalSelectionPoints.tabAbsolu[i][3]+','+px1+','+py1+','+ancienAngle+','+angleEntreLesDeuxPointsDeArc+'','data-fnt':'actionMoveSelectionPtElement',cx:px2,cy:py2,r:rayonPoint,style:'fill:rgba(128,128,128,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1/3)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

    // points pour gérer rx et ry
    //  M 36 86 A 80 40 0 1 1 79 88 
//     console.log('globalSelectionPoints.tabAbsolu[i][1]=',globalSelectionPoints.tabAbsolu[i][1],'angleEntreLesDeuxPointsDeArc=',angleEntreLesDeuxPointsDeArc, globalSelectionPoints.tabAbsolu[i][1]/_dssvg.zoom1*Math.cos((angleEntreLesDeuxPointsDeArc)*Math.PI/180) );
     var px4=px1+globalSelectionPoints.tabAbsolu[i][1]*Math.cos((angleEntreLesDeuxPointsDeArc+ancienAngle-90)*Math.PI/180);
     var py4=py1+globalSelectionPoints.tabAbsolu[i][1]*Math.sin((angleEntreLesDeuxPointsDeArc+ancienAngle-90)*Math.PI/180); //+globalSelectionPoints.tabAbsolu[i][1]*Math.sin((angleEntreLesDeuxPointsDeArc)*Math.PI/180);
     if(poigneeAffichable(px4,py4)){
      var dotrx    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':i+',1,'+globalSelectionPoints.tabAbsolu[i][1]+','+px1+','+py1+'','data-fnt':'actionMoveSelectionPtElement',cx:px4,cy:py4,r:rayonPoint,style:'fill:purple;opacity:0.5;stroke:purple;stroke-width:'+(strokWit/_dssvg.zoom1/3)+';'}); // pink
      dotrx.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dotrx.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }
     
     if(poigneeAffichable(px1,py1) || poigneeAffichable(px4,py4) ){
      var line2 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+px1+ ' '+py1+ ' L ' + px4 + ' ' + py4 +'',style:'fill:transparent;stroke:#444; stroke:purple;stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

    
     var px5=px1+globalSelectionPoints.tabAbsolu[i][2]*Math.cos((angleEntreLesDeuxPointsDeArc+ancienAngle)*Math.PI/180);
     var py5=py1+globalSelectionPoints.tabAbsolu[i][2]*Math.sin((angleEntreLesDeuxPointsDeArc+ancienAngle)*Math.PI/180);
     if(poigneeAffichable(px5,py5)){
      var dotry    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':i+',2,'+globalSelectionPoints.tabAbsolu[i][1]+','+px1+','+py1+'','data-fnt':'actionMoveSelectionPtElement',cx:px5,cy:py5,r:rayonPoint,style:'fill:green;opacity:0.5;stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1/3)+';'}); // pink
      dotry.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
      dotry.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
     }
     
    
     if(poigneeAffichable(px1,py1) || poigneeAffichable(px5,py5) ){
      var line3 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+px1+ ' '+py1+ ' L ' + px5 + ' ' + py5 +'',style:'fill:transparent;stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }
    
 


     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][6];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][7];
     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='H' ){

     // point de fin
     pt0.x=globalSelectionPoints.tabAbsolu[i][1];
     pt0.y=pointFixePrecedent.y;
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche2='C1,'+(i+1);
     }

     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':recherche2,'data-indice':i+',1','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][1];

    }else if(globalSelectionPoints.tabAbsolu[i][0]=='V' ){

     // point de fin
     pt0.x=pointFixePrecedent.x;
     pt0.y=globalSelectionPoints.tabAbsolu[i][1];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche2='C1,'+(i+1);
     }

     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':recherche2,'data-indice':i+',1','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][1];

    }else if(globalSelectionPoints.tabAbsolu[i][0]=='T' ){

     // point de fin
     pt0.x=globalSelectionPoints.tabAbsolu[i][1];
     pt0.y=globalSelectionPoints.tabAbsolu[i][2];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche2='C1,'+(i+1);
     }

     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':recherche2,'data-indice':i+',1,2','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][1];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][2];
     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='Q' || globalSelectionPoints.tabAbsolu[i][0]=='S' ){
     
//     console.log('globalSelectionPoints.tabAbsolu[i]=',globalSelectionPoints.tabAbsolu[i]);
     ptPrec.x=pointFixePrecedent.x;
     ptPrec.y=pointFixePrecedent.y;
     ptPrec=ptPrec.matrixTransform(matrixRelatifVersAbsolu);
     
     // premier point de controle
     ptC1.x=globalSelectionPoints.tabAbsolu[i][1];
     ptC1.y=globalSelectionPoints.tabAbsolu[i][2];
//     console.log('ptC1=',ptC1);
     ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

     // point de fin
     pt0.x=globalSelectionPoints.tabAbsolu[i][3];
     pt0.y=globalSelectionPoints.tabAbsolu[i][4];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     // les lignes des points de controle partent du point central pour arriver au point de controle
     if(poigneeAffichable(ptPrec.x,ptPrec.y) || poigneeAffichable(ptC1.x,ptC1.y) ){
      var line1 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+ptPrec.x+ ' '+ptPrec.y+ ' L ' + ptC1.x + ' ' + ptC1.y+'',style:'fill:transparent;stroke:blue; stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }
     if(poigneeAffichable(pt0.x,pt0.y) || poigneeAffichable(ptC1.x,ptC1.y) ){
      var line2 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C2,'+i ,d:'M '+pt0.x   + ' '+pt0.y   + ' L ' + ptC1.x + ' ' + ptC1.y+'',style:'fill:transparent;stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

          
     if(poigneeAffichable(ptC1.x,ptC1.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C1,'+i,'data-recherche2':'C2,'+i,'data-indice':i+',1,2','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
     }


     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='Q'){
      recherche2='C1,'+(i+1);
     }
     

     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':'C1,'+i,'data-indice':i+',3,4','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][3];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][4];

     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='C' ){
     
     ptPrec.x=pointFixePrecedent.x;
     ptPrec.y=pointFixePrecedent.y;
     ptPrec=ptPrec.matrixTransform(matrixRelatifVersAbsolu);
     
     // point de fin
     pt0.x=globalSelectionPoints.tabAbsolu[i][5];
     pt0.y=globalSelectionPoints.tabAbsolu[i][6];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     // deuxième point de controle
     ptC2.x=globalSelectionPoints.tabAbsolu[i][3];
     ptC2.y=globalSelectionPoints.tabAbsolu[i][4];
     ptC2=ptC2.matrixTransform(matrixRelatifVersAbsolu);
     
     // premier point de controle
     ptC1.x=globalSelectionPoints.tabAbsolu[i][1];
     ptC1.y=globalSelectionPoints.tabAbsolu[i][2];
     ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);
     

     // les lignes des points de controle partent du point central pour arriver au point de controle
     if(poigneeAffichable(ptPrec.x,ptPrec.y) || poigneeAffichable(ptC1.x,ptC1.y) ){
      var line1 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+ptPrec.x+ ' '+ptPrec.y+ ' L ' + ptC1.x + ' ' + ptC1.y+'',style:'fill:transparent;stroke:blue; stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }
     if(poigneeAffichable(pt0.x,pt0.y) || poigneeAffichable(ptC2.x,ptC2.y) ){
      var line2 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C2,'+i ,d:'M '+pt0.x   + ' '+pt0.y   + ' L ' + ptC2.x + ' ' + ptC2.y+'',style:'fill:transparent;stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

     // premier point de contrôle
     if(poigneeAffichable(ptC1.x,ptC1.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C1,'+i,'data-indice':i+',1,2','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     // deuxième point de contrôle
     if(poigneeAffichable(ptC2.x,ptC2.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-indice':i+',3,4','data-fnt':'actionMoveSelectionPtElement',cx:ptC2.x,cy:ptC2.y,r:rayonPoint,style:'fill:rgba(0,255,0,0.5);stroke:blue;stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // green
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche2='C1,'+(i+1);
     }
     
     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':recherche2,'data-indice':i+',5,6','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
     }

     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][5];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][6];
     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='Z' ){
    }else{
     console.warn('Non traité : ' , globalSelectionPoints.tabAbsolu[i] );
    }
   }
  }
 }

 //========================================================================================================
 function touchDownSelectionIndiceArbre(e){
  e.stopPropagation();
  actionDownSelectionIndiceArbre(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownSelectionIndiceArbre(e){
  e.stopPropagation();
  actionDownSelectionIndiceArbre(e);
 }
 //========================================================================================================
 var globalSelectionPoints={
  pathChaineD    : null ,
  tabOriginal    : null ,
  tabAbsolu      : null ,
  autreReference : null ,
 }
 //========================================================================================================
 function actionDownSelectionIndiceArbre(e,idArbre){
//  console.log('mouseDownTranslate e=',e);
  if(e===null){
   if(idArbre!=_dssvg.idArbreCourant){
    globalIndicePoint=null;
    affPoi();
   }
   
   _dssvg.idArbreCourant=idArbre;
   globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
   
//   globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]')[0];
   globalSelectionPoints.autreReference=null; // pour le radialGradient
   globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
   if(globalGeneralSvgReferenceElement.length>1){
    globalSelectionPoints.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
//    console.log('globalSelectionPoints.autreReference=',globalSelectionPoints.autreReference)
   }
   globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
   
  }else{
   
   initPosxy=positionSouris(e);
   divlag1.innerHTML='Z='+_dssvg.zoom1+',sx='+initPosxy.sx + ',sy=' + initPosxy.sy;
   
   var temp=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
   if(_dssvg.idArbreCourant!==null){
    if(temp!=_dssvg.idArbreCourant){
//     console.log('ici temp=',temp);
     globalIndicePoint=null;
     _dssvg.idArbrPreceden=_dssvg.idArbreCourant;
     _dssvg.idArbreCourant=temp;
     affPoi();
    }
   }else{
    _dssvg.idArbreCourant=temp;
   }
   
   globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
//   globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]')[0];

   globalSelectionPoints.autreReference=null; // pour le radialGradient
   globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
   
   if(globalGeneralSvgReferenceElement.length>1){
    globalSelectionPoints.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
 //   console.log('globalSelectionPoints.autreReference=',globalSelectionPoints.autreReference)
   }
   globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
//  console.log('globalGeneralSvgReferenceElement=',globalGeneralSvgReferenceElement)  
   globalIndicePoint=0;
   afficheArbre0({init:false});
   var aSupp=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' hg"]')[0];
   try{
    if(aSupp!==null && aSupp!==undefined){
     aSupp.remove();
    }
   }catch(e1){
    console.warn('%cErreur à analyser e=','background:yellow;color:red;',e1)
   }
   return;
//   divLag2Complete();
  }
  globalSelectionPoints.tabOriginal=null;
  globalSelectionPoints.tabAbsolu=null;
  
//  console.log( 'globalGeneralSvgReferenceElement=',globalGeneralSvgReferenceElement);
  if(globalGeneralSvgReferenceElement!==undefined){
   globTranslateMatriceSvgInverse=refZnDessin.getScreenCTM().inverse();
   globTranslateMatriceAbsolueInverse=refZnDessin.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.getScreenCTM()).inverse();
   globTranslateMatriceAbsolueInverse.e=0;
   globTranslateMatriceAbsolueInverse.f=0;
   if( globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
    globalSelectionPoints.pathChaineD=globalGeneralSvgReferenceElement.getAttribute('d');
    var obj=getPointsFromSvgPath(globalSelectionPoints.pathChaineD);
    globalSelectionPoints.tabOriginal=obj.tabOri;
    globalSelectionPoints.tabAbsolu  =obj.tabAbs;
    affichePtsControlDetailDeElement('path');
   }else if( globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){
    globalSelectionPoints.pathChaineD=globalGeneralSvgReferenceElement.getAttribute('points');
    globalSelectionPoints.tabOriginal=globalSelectionPoints.pathChaineD.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    affichePtsControlDetailDeElement('polyline');
   }else if( globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){
    globalSelectionPoints.pathChaineD=globalGeneralSvgReferenceElement.getAttribute('points');
    globalSelectionPoints.tabOriginal=globalSelectionPoints.pathChaineD.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    affichePtsControlDetailDeElement('polygon');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('width')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('height'))];
    affichePtsControlDetailDeElement('rect');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image'){
    if(globalGeneralSvgReferenceElement.getAttribute('width') && globalGeneralSvgReferenceElement.getAttribute('height')){
     globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('width')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('height'))];
    }else{
     var rectBase=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
     if(rectBase){
      globalSelectionPoints.tabAbsolu=[
       parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')),
       parseFloat(rectBase.getAttribute('width')),parseFloat(rectBase.getAttribute('height'))
      ];
     }else{
      console.warn('a analyser','background:yellow;color:red;');
     }
    }
    affichePtsControlDetailDeElement('image');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='circle'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('r'))];
    affichePtsControlDetailDeElement('circle');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='radialgradient'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('r'))];
    affichePtsControlDetailDeElement('radialgradient');
    
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='ellipse'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('rx')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('ry'))];
    affichePtsControlDetailDeElement('ellipse');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('x1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('x2')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y2'))];
    affichePtsControlDetailDeElement('line');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='lineargradient'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('x1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('x2')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y2'))];
    affichePtsControlDetailDeElement('lineargradient');
   }
   var aSupp=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' hg"]')[0];
   try{
    if(e!==null){
     aSupp.remove();
    }
   }catch(e){
    console.warn('%cErreur à analyser e=','background:yellow;color:red;',e)
   }
  }
  
 }
 //========================================================================================================
 function actMovElementTaille(e){
 
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalSelectElementTaille.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalSelectElementTaille.mouseStart.x;
  pt0.y = current.y - globalSelectElementTaille.mouseStart.y;
  

  var newPointX=globalSelectElementTaille.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalSelectElementTaille.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );

//  divlag1.innerHTML='<span>depPLZ='+_dssvg.zoom1+'</span>,<span style="color:red;">x='+arrdi10000(newPointX)+'</span>,<span style="color:red;">y='+arrdi10000(newPointY)+'</span>';
  
  var deltaReel=refZnDessin.createSVGPoint();  
  deltaReel=pt0.matrixTransform(globalSelectElementTaille.matriceElementElementInverse).matrixTransform(globalSelectElementTaille.matriceRacine);
  deltaReel.x=deltaReel.x/_dssvg.parametres.diviseurDeplacement;;
  deltaReel.y=deltaReel.y/_dssvg.parametres.diviseurDeplacement;;
  
  
  var nouvelleWidth =arrdi10000(globalSelectElementTaille.rectangle.width+deltaReel.x);
  var nouvelleHeight=arrdi10000(globalSelectElementTaille.rectangle.height+deltaReel.y);
  
  
  var ancienneWidth =arrdi10000(globalSelectElementTaille.rectangle.width);
  var ancienneHeight=arrdi10000(globalSelectElementTaille.rectangle.height);
  
  


  
  
  
  
  
  
//  console.log('nouvelleWidth=',nouvelleWidth,'nouvelleHeight=',nouvelleHeight);

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  function calculDy1(refy,i){
   var dy=0;
   if(globalSelectElementTaille.rectangle.height!=0){
    var rapporty=nouvelleHeight/globalSelectElementTaille.rectangle.height;
    var distanceInity=globalSelectElementTaille.tableauOriginal[i][refy]-globalSelectElementTaille.rectangle.y;
    var distanceMaintenant=distanceInity*rapporty;
    dy=distanceMaintenant-distanceInity;
   }else{
    if(globalSelectElementTaille.tableauOriginal.length-1>0){
     dy=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleHeight;
    }else{
     dy=0;
    }
   }
   return {dy:dy,nouy:arrdi10000(globalSelectElementTaille.tableauOriginal[i][refy]+dy)}
  }
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  function calculDx1(refx,i){
   var dx=0;
   if(globalSelectElementTaille.rectangle.width!=0){
    var rapportx=nouvelleWidth/globalSelectElementTaille.rectangle.width;
    var distanceInitx=globalSelectElementTaille.tableauOriginal[i][refx]-globalSelectElementTaille.rectangle.x;
    var distanceMaintenant=distanceInitx*rapportx;
    dx=distanceMaintenant-distanceInitx;
   }else{
    if(globalSelectElementTaille.tableauOriginal.length-1>0){
     dx=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleWidth;
    }else{
     dx=0;
    }
   }
   return {dx:dx,noux:arrdi10000(globalSelectElementTaille.tableauOriginal[i][refx]+dx)}
  }
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  function calculDxDy1(refx,refy,i){
   var dx=0;
   if(globalSelectElementTaille.rectangle.width!=0){
    var rapportx=nouvelleWidth/globalSelectElementTaille.rectangle.width;
    var distanceInitx=globalSelectElementTaille.tableauOriginal[i][refx]-globalSelectElementTaille.rectangle.x;
    var distanceMaintenant=distanceInitx*rapportx;
    dx=distanceMaintenant-distanceInitx;
   }else{
    if(globalSelectElementTaille.tableauOriginal.length-1>0){
     dx=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleWidth;
    }else{
     dx=0;
    }
   }
   var dy=0;
   if(globalSelectElementTaille.rectangle.height!=0){
    var rapporty=nouvelleHeight/globalSelectElementTaille.rectangle.height;
    var distanceInity=globalSelectElementTaille.tableauOriginal[i][refy]-globalSelectElementTaille.rectangle.y;
    var distanceMaintenant=distanceInity*rapporty;
    dy=distanceMaintenant-distanceInity;
   }else{
    if(globalSelectElementTaille.tableauOriginal.length-1>0){
     dy=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleHeight;
    }else{
     dy=0;
    }
   }
   var noux=arrdi10000(globalSelectElementTaille.tableauOriginal[i][refx]+dx);
   var nouy=arrdi10000(globalSelectElementTaille.tableauOriginal[i][refy]+dy);
   return {dx:dx,dy:dy,noux:noux,nouy:nouy};
  }
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  
  if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='text' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='tspan' ){
   if(nouvelleHeight>=0.1){
    if(globalSelectElementTaille.tableauOriginal[1]===0){
     var rapport=nouvelleHeight;
    }else if(globalSelectElementTaille.tableauOriginal[1]>0){
     var rapport=nouvelleHeight/globalSelectElementTaille.tableauOriginal[1];
    }
    var ancienneFontSize=parseFloat(globalSelectElementTaille.tableauOriginal[0]['font-size']);
    if(ancienneFontSize<=0){
     ancienneFontSize=0.001;
    }
    var nouvelleFontSize=arrdi10000(ancienneFontSize*rapport);
    if(nouvelleFontSize<=0){
     nouvelleFontSize=0.001;
    }
    
    var ancienneStrokeWidth=parseFloat(globalSelectElementTaille.tableauOriginal[0]['stroke-width']);
//    console.log('ancienneStrokeWidth=', ancienneStrokeWidth , 'globalSelectElementTaille.tableauOriginal[0][stroke-width]=' , globalSelectElementTaille.tableauOriginal[0]['stroke-width'] );
    if(ancienneStrokeWidth<=0.01){
     ancienneStrokeWidth=0.01;
    }
    var nouvelleStrokeWidth=Math.round(ancienneStrokeWidth*rapport*100)/100;
    if(nouvelleStrokeWidth<=0.01){
     nouvelleStrokeWidth=0.01;
    }
    
    var sty='';
    for(var elem in globalSelectElementTaille.tableauOriginal[0]){
     if(elem==='font-size'){
      sty+='font-size:'+nouvelleFontSize+';';
     }else if(elem==='stroke-width'){
      sty+='stroke-width:'+nouvelleStrokeWidth+';';
     }else{
      sty+=elem+':'+globalSelectElementTaille.tableauOriginal[0][elem]+';';
     }
    }
//    console.log('sty=',sty,'ancienneFontSize=',ancienneFontSize,'nouvelleFontSize=',nouvelleFontSize,'rapport=',rapport)
    
//    console.log('sty=',sty);
    globalGeneralSvgReferenceElement.setAttribute('style'  , sty)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['style']=sty;

    divLag1Pour({t:'rszTxZ',l:'rszTxZ','ft':(Math.round(arrdi10000(nouvelleFontSize)*100))/100,'sw':arrdi10000(nouvelleStrokeWidth)});

   }

  
  }else if(
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image' || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use'   ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='filter' 
  ){
//   console.log('nouvelleWidth=',nouvelleWidth,'nouvelleHeight=',nouvelleHeight);
   if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use' && ( nouvelleWidth===0 || nouvelleHeight===0 ) ){
    return;
   }
   if(nouvelleWidth>=0){
    globalGeneralSvgReferenceElement.setAttribute('width'  ,nouvelleWidth)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['width']=nouvelleWidth;
   }
   if(nouvelleHeight>=0){
    globalGeneralSvgReferenceElement.setAttribute('height'  ,nouvelleHeight)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['height']=nouvelleHeight;
   }
   
//   console.log('globalSelectElementTaille.autreReference=',globalSelectElementTaille.autreReference);
   
   if(globalSelectElementTaille.autreReference!==null){
    globalSelectElementTaille.autreReference.setAttribute('width',nouvelleWidth);
    globalSelectElementTaille.autreReference.setAttribute('height',nouvelleHeight);
   }
   
   
   divLag1Pour({t:'rszReZ',l:'rszReZ','w':nouvelleWidth,'h':nouvelleHeight});
   


  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line'){
   
   var x2=arrdi10000(globalSelectElementTaille.tableauOriginal[2]+deltaReel.x);
   globalGeneralSvgReferenceElement.setAttribute('x2'  ,x2)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x2']=x2;

   var y2=arrdi10000(globalSelectElementTaille.tableauOriginal[3]+deltaReel.y);
   globalGeneralSvgReferenceElement.setAttribute('y2'  ,y2)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y2']=y2;

   if(globalSelectElementTaille.autreReference!==null){
    globalSelectElementTaille.autreReference.setAttribute('x2'  ,x2)
    globalSelectElementTaille.autreReference.setAttribute('y2'  ,y2)
   }

   divLag1Pour({t:'rszLiZ',l:'rszLiZ','x2':x2,'y2':y2});



  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='lineargradient'){
   
   var x2=arrdi10000(globalSelectElementTaille.tableauOriginal[2]+deltaReel.x);
   globalGeneralSvgReferenceElement.setAttribute('x2'  ,x2)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x2']=x2;

   var y2=arrdi10000(globalSelectElementTaille.tableauOriginal[3]+deltaReel.y);
   globalGeneralSvgReferenceElement.setAttribute('y2'  ,y2)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y2']=y2;

   divLag1Pour({t:'rszLgZ',l:'rszLiZ','x2':x2,'y2':y2});






  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='circle'){
   
   if(nouvelleWidth>=0 && nouvelleHeight>=0){
    var r=(nouvelleWidth+nouvelleHeight)/4;
    globalGeneralSvgReferenceElement.setAttribute('r'  ,r)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['r']=r;
    if(globalSelectElementTaille.autreReference!==null){
     globalSelectElementTaille.autreReference.setAttribute('r'  ,r)
    }
    
   }
   
   divLag1Pour({t:'rszCeZ',l:'rszCeZ','r':r});
//   divlag1.innerHTML='<span>2resizC Z='+arrdi10000(_dssvg.zoom1)+'</span>,<span>r='+ r + '';

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='radialgradient'){
   
   if(nouvelleWidth>=0 && nouvelleHeight>=0){
    var r=(nouvelleWidth+nouvelleHeight)/4;
    globalGeneralSvgReferenceElement.setAttribute('r'  ,r)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['r']=r;
   }
   
   divLag1Pour({t:'rszRgZ',l:'rszCeZ','r':r});


  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='ellipse'){
   
   if(nouvelleWidth>=0){
    var rx=(nouvelleWidth)/2;
    globalGeneralSvgReferenceElement.setAttribute('rx'  ,rx)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['rx']=rx;
   }
   
   if(nouvelleHeight>=0){
    var ry=(nouvelleHeight)/2;
    globalGeneralSvgReferenceElement.setAttribute('ry'  ,ry)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['ry']=ry;
   }
   divLag1Pour({t:'rszElZ',l:'rszElZ','rx':rx,'ry':ry});
   
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){

   var tt='';
   for(var i=0;i<globalSelectElementTaille.tableauOriginal.length;i+=2){

    var dx=0;
    if(globalSelectElementTaille.rectangle.width!=0){
     var rapportx=nouvelleWidth/globalSelectElementTaille.rectangle.width;
     var distanceInitx=globalSelectElementTaille.tableauOriginal[i]-globalSelectElementTaille.rectangle.x;
     var distanceMaintenant=distanceInitx*rapportx;
     dx=distanceMaintenant-distanceInitx;
    }else{
     if(globalSelectElementTaille.tableauOriginal.length-1>0){
      dx=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleWidth;
     }else{
      dx=0;
     }
    }
    var noux=arrdi10000(globalSelectElementTaille.tableauOriginal[i]+dx);

    var dy=0;
    if(globalSelectElementTaille.rectangle.height!=0){
     var rapporty=nouvelleHeight/globalSelectElementTaille.rectangle.height;
     var distanceInity=globalSelectElementTaille.tableauOriginal[i+1]-globalSelectElementTaille.rectangle.y;
     var distanceMaintenant=distanceInity*rapporty;
     dy=distanceMaintenant-distanceInity;
    }else{
     if(globalSelectElementTaille.tableauOriginal.length-1>0){
      dy=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleHeight;
     }else{
      dy=0;
     }
    }
    var nouy=arrdi10000(globalSelectElementTaille.tableauOriginal[i+1]+dy);

    tt+=' '+noux+' '+nouy+ ' ';

   }
   
   globalGeneralSvgReferenceElement.setAttribute('points'  ,tt)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

   divLag1Pour({t:'rszPlZ',l:'rszPlZ','nw':nouvelleWidth,'nh':nouvelleHeight});
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){

   var tt='';
   for(var i=0;i<globalSelectElementTaille.tableauOriginal.length;i+=2){

    var dx=0;
    if(globalSelectElementTaille.rectangle.width!=0){
     var rapportx=nouvelleWidth/globalSelectElementTaille.rectangle.width;
     var distanceInitx=globalSelectElementTaille.tableauOriginal[i]-globalSelectElementTaille.rectangle.x;
     var distanceMaintenant=distanceInitx*rapportx;
     dx=distanceMaintenant-distanceInitx;
    }else{
     if(globalSelectElementTaille.tableauOriginal.length-1>0){
      dx=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleWidth;
     }else{
      dx=0;
     }
    }
    var noux=arrdi10000(globalSelectElementTaille.tableauOriginal[i]+dx);

    var dy=0;
    if(globalSelectElementTaille.rectangle.height!=0){
     var rapporty=nouvelleHeight/globalSelectElementTaille.rectangle.height;
     var distanceInity=globalSelectElementTaille.tableauOriginal[i+1]-globalSelectElementTaille.rectangle.y;
     var distanceMaintenant=distanceInity*rapporty;
     dy=distanceMaintenant-distanceInity;
    }else{
     if(globalSelectElementTaille.tableauOriginal.length-1>0){
      dy=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleHeight;
     }else{
      dy=0;
     }
    }
    var nouy=arrdi10000(globalSelectElementTaille.tableauOriginal[i+1]+dy);

    tt+=' '+noux+' '+nouy+ ' ';

   }
   globalGeneralSvgReferenceElement.setAttribute('points'  ,tt)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

   divLag1Pour({t:'rszPgZ',l:'rszPgZ','nw':nouvelleWidth,'nh':nouvelleHeight});

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   
   var tt='';
   for(var i=0;i<globalSelectElementTaille.tableauOriginal.length;i++){
    
     
    if(globalSelectElementTaille.tableauOriginal[i][0]=='A' || globalSelectElementTaille.tableauOriginal[i][0]=='a' ){
     
     // M 44 82 A 44 30 0 1 0 44 52 
     var delta1=calculDxDy1( 6 , 7 , i );
     var delta2=calculDxDy1( 1 , 2 , i );
     
//     console.log( delta2.dx , delta2.dy );
     
     var tab=JSON.parse(JSON.stringify(globalSelectElementTaille.tableauOriginal[i]));
     tab[6]=delta1.noux;
     tab[7]=delta1.nouy;
     
     if(ancienneWidth>0 && ancienneHeight>0 && nouvelleWidth>0 && nouvelleHeight>0){
      var rapport=(nouvelleWidth/ancienneWidth+nouvelleHeight/ancienneHeight)/2;
//      console.log('rapport=',rapport);
      tab[1]=tab[1]*rapport;
      tab[2]=tab[2]*rapport;
     }
     
  
     
     
     tt+=tab.join(' ')+' ';
//     console.log('tt=',tt);
     
//     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' '+(delta1.noux)+' '+(delta1.nouy)+' '+(delta2.noux)+' '+(delta2.nouy)+' '+(delta3.noux)+' '+(delta3.nouy)+'  ';
     
    }else if(globalSelectElementTaille.tableauOriginal[i][0]=='C' || globalSelectElementTaille.tableauOriginal[i][0]=='c' ){

     var delta1=calculDxDy1( 1 , 2 , i );
     var delta2=calculDxDy1( 3 , 4 , i );
     var delta3=calculDxDy1( 5 , 6 , i );
     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' '+(delta1.noux)+' '+(delta1.nouy)+' '+(delta2.noux)+' '+(delta2.nouy)+' '+(delta3.noux)+' '+(delta3.nouy)+'  ';
     
    }else if(
     globalSelectElementTaille.tableauOriginal[i][0]=='q' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='Q' ||
     globalSelectElementTaille.tableauOriginal[i][0]=='s' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='S' 
    ){

     // M 14 38   q    78 -66 99 15    
     var delta1=calculDxDy1( 1 , 2 , i );
     var delta2=calculDxDy1( 3 , 4 , i );
     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' '+delta1.noux+' '+delta1.nouy+' '+delta2.noux+' '+delta2.nouy+'    ';
      
    }else if(
    
     globalSelectElementTaille.tableauOriginal[i][0]=='M' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='m' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='L' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='l' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='T' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='t' || 
     (globalSelectElementTaille.tableauOriginal[i][0]=='m' && i==0 ) ){
     
     var delta1=calculDxDy1( 1 , 2 , i );
     tt+=globalSelectElementTaille.tableauOriginal[i][0]+' '+(delta1.noux)+' '+(delta1.nouy)+'';
     
    }else if(globalSelectElementTaille.tableauOriginal[i][0]=='H' || globalSelectElementTaille.tableauOriginal[i][0]=='h' ){

     var delta1=calculDx1( 1 , i );
     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' '+delta1.noux+'    ';
      
      
    }else if(globalSelectElementTaille.tableauOriginal[i][0]=='V' || globalSelectElementTaille.tableauOriginal[i][0]=='v' ){

     var delta1=calculDy1( 1 , i );
     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' '+delta1.nouy+'    ';
      
      
    }else if(globalSelectElementTaille.tableauOriginal[i][0]=='Z' || globalSelectElementTaille.tableauOriginal[i][0]=='z' ){

     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' ';
     
    }else{
     console.warn('non prévu "',globalSelectElementTaille.tableauOriginal[i]);
     tt+=globalSelectElementTaille.tableauOriginal[i].join(' ')+' ';
     
    }
   }
//   console.log('tt=',tt);
   globalGeneralSvgReferenceElement.setAttribute('d',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['d']=tt;
   
   if(globalSelectElementTaille.rectangle && globalSelectElementTaille.rectangle.width!==0 && globalSelectElementTaille.rectangle.height!==0){
    var obj={t:'rszChZ',l:'rszChZ','nw':nouvelleWidth,'nh':nouvelleHeight,'px':Math.round(nouvelleWidth/globalSelectElementTaille.rectangle.width*100)/100,'py':Math.round(nouvelleHeight/globalSelectElementTaille.rectangle.height*100)/100};
   }else{
    var obj={t:'rszChZ',l:'rszChZ','nw':nouvelleWidth,'nh':nouvelleHeight};
   }
   
   
   divLag1Pour(obj);

  }
 }
 //========================================================================================================
 function touchDownSizeElement(e){
  e.stopPropagation();
  actionDownSizeElement(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownSizeElement(e){
  e.stopPropagation();
  actionDownSizeElement(e);
 }
 //========================================================================================================
 var globalSelectElementTaille={
  mouseStart:null,
  elementStart:null,
  matriceRacineInverse:null,
  rectangle:null,
  tableauOriginal:null,  
  matriceElementElementInverse:null,
  matriceRacine:null,
  autreReference:null,
 }
 //========================================================================================================
 function actionDownSizeElement(e){
  
  //  console.log('mouseDownTranslate e=',e.target,e);
  initPosxy=positionSouris(e);
  ecran_appuye='tailleElement';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  divlag1.innerHTML='<span>sEZ='+_dssvg.zoom1+'</span>,<span>sx='+arrdi10000(initPosxy.sx)+'</span>,<span>sy='+arrdi10000(initPosxy.sy)+'</span>';
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  var nouvelIdArbre=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
  if(_dssvg.idArbreCourant===nouvelIdArbre){
  }else{
   _dssvg.idArbrPreceden=_dssvg.idArbreCourant;
   _dssvg.idArbreCourant=nouvelIdArbre;
  }
  
  
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  
  globalSelectElementTaille.autreReference=null; // pour le radialGradient et filter
  if(globalGeneralSvgReferenceElement.length>1){
   globalSelectElementTaille.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
//   console.log('globalSelectElementTaille.autreReference=',globalSelectElementTaille.autreReference)
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0];  
  
  
  globalSelectElementTaille.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalSelectElementTaille.matriceElementElementInverse.e=0;
  globalSelectElementTaille.matriceElementElementInverse.f=0;
  
  globalSelectElementTaille.matriceRacine=refZnDessin.getScreenCTM();
  globalSelectElementTaille.matriceRacine.e=0;
  globalSelectElementTaille.matriceRacine.f=0;
  
  
  globalSelectElementTaille.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  
  
  globalSelectElementTaille.mouseStart=refZnDessin.createSVGPoint();
		globalSelectElementTaille.mouseStart.x = e.clientX; 
  globalSelectElementTaille.mouseStart.y = e.clientY;
  globalSelectElementTaille.mouseStart=globalSelectElementTaille.mouseStart.matrixTransform(globalSelectElementTaille.matriceRacineInverse);
  globalSelectElementTaille.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };
  
  globalSelectElementTaille.rectangle=null;
  var rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  if(rectangle){
   globalSelectElementTaille.rectangle={
    ref:rectangle,
    x:arrdi10000(parseFloat(rectangle.getAttribute('x'))),
    y:arrdi10000(parseFloat(rectangle.getAttribute('y'))),
    width:arrdi10000(parseFloat(rectangle.getAttribute('width'))),
    height:arrdi10000(parseFloat(rectangle.getAttribute('height'))),
   }
  }
  
  if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('d');
   var obj=getPointsFromSvgPath(pathDChaine);
   globalSelectElementTaille.tableauOriginal=obj.tabOri;
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('points');
   globalSelectElementTaille.tableauOriginal=pathDChaine.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('points');
   globalSelectElementTaille.tableauOriginal=pathDChaine.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);

  }else if(
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'   || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use'    ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='filter'
  ){
   
   globalSelectElementTaille.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')) ];
   
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='lineargradient'){
   
   globalSelectElementTaille.tableauOriginal=[ 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('x1')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('y1')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('x2')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('y2')) , 
   ];

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='circle'){
   
   globalSelectElementTaille.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('r')) ];

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='radialgradient'){
   
   globalSelectElementTaille.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('r')) ];


  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='ellipse'){
   
   globalSelectElementTaille.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('rx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('ry')) ];
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='text' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='tspan'){
   
   var obj1=recuperePropsCouleurs(_dssvg.idArbreCourant);
//   console.log('obj1=' , obj1 );
   
   globalSelectElementTaille.tableauOriginal=[ obj1 , parseFloat(rectangle.getAttribute('height'))];
//   console.log('globalSelectElementTaille.tableauOriginal=',globalSelectElementTaille.tableauOriginal)
   
  }
  
 }
 
 //========================================================================================================
 function actMovElementPosition(e){
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalSelectElementMove.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalSelectElementMove.mouseStart.x;
  pt0.y = current.y - globalSelectElementMove.mouseStart.y;
  
  var newPointX=globalSelectElementMove.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalSelectElementMove.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );

  divlag1.innerHTML='<span>depPLZ='+_dssvg.zoom1+'</span>,<span style="color:red;">x='+arrdi10000(newPointX)+'</span>,<span style="color:red;">y='+arrdi10000(newPointY)+'</span>';


  
  var deltaReel=refZnDessin.createSVGPoint();  
  deltaReel=pt0.matrixTransform(globalSelectElementMove.matriceElementElementInverse).matrixTransform(globalSelectElementMove.matriceRacine);
  deltaReel.x=deltaReel.x/_dssvg.parametres.diviseurDeplacement;;
  deltaReel.y=deltaReel.y/_dssvg.parametres.diviseurDeplacement;;
  
  
  
  if(
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='text'   || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='tspan'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image'  ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'   ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use'    ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='filter' 
  ){
   
   var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[0]+deltaReel.x);
   var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[1]+deltaReel.y);

 		globalGeneralSvgReferenceElement.setAttribute('x',newPosx);
 		globalGeneralSvgReferenceElement.setAttribute('y',newPosy);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x']=newPosx;
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y']=newPosy;

   if(globalSelectElementMove.autreReference!==null){
    globalSelectElementMove.autreReference.setAttribute('x',newPosx);
    globalSelectElementMove.autreReference.setAttribute('y',newPosy);
   }

   divLag1Pour({t:'depReZ',l:'depReZ','sx':arrdi10000(newPosx),'sy':arrdi10000(newPosy)});

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='circle' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='ellipse' || 'radialgradient' === globalGeneralSvgReferenceElement.nodeName.toLowerCase() ){
   
//   console.log('globalIndiceArbre=',globalIndiceArbre)
   var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[0]+deltaReel.x);
   var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[1]+deltaReel.y);
 		globalGeneralSvgReferenceElement.setAttribute('cx',newPosx);
 		globalGeneralSvgReferenceElement.setAttribute('cy',newPosy);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['cx']=newPosx;
   _dssvg.arbre0[globalIndiceArbre].data.attributes['cy']=newPosy;
   if(globalSelectElementMove.autreReference!==null){
    globalSelectElementMove.autreReference.setAttribute('cx',newPosx);
    globalSelectElementMove.autreReference.setAttribute('cy',newPosy);
    globalSelectElementMove.autreReferenceInverse.setAttribute('cx',newPosx);
    globalSelectElementMove.autreReferenceInverse.setAttribute('cy',newPosy);
   }

   divLag1Pour({t:'depCeZ',l:'depCeZ','x':newPosx,'y':newPosy});
   
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='line' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='lineargradient' ){
   
   var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[0]+deltaReel.x);
   var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[1]+deltaReel.y);
 		globalGeneralSvgReferenceElement.setAttribute('x1',newPosx);
 		globalGeneralSvgReferenceElement.setAttribute('y1',newPosy);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x1']=newPosx;
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y1']=newPosy;

   if(globalSelectElementMove.autreReference!==null){

    globalSelectElementMove.autreReference.setAttribute('x1',newPosx);
    globalSelectElementMove.autreReference.setAttribute('y1',newPosy);
   }

   var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[2]+deltaReel.x);
   var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[3]+deltaReel.y);
 		globalGeneralSvgReferenceElement.setAttribute('x2',newPosx);
 		globalGeneralSvgReferenceElement.setAttribute('y2',newPosy);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x2']=newPosx;
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y2']=newPosy;
   
   if(globalSelectElementMove.autreReference!==null){

    globalSelectElementMove.autreReference.setAttribute('x2',newPosx);
    globalSelectElementMove.autreReference.setAttribute('y2',newPosy);
   }

   divLag1Pour({t:'depLiZ',l:'depLiZ','x':newPosx,'y':newPosy});
   
   
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){

   var tt='';
   for(var i=0;i<globalSelectElementMove.tableauOriginal.length;i+=2){
    var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[i]+deltaReel.x);
    var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[i+1]+deltaReel.y);
    tt+=' '+(newPosx)+' '+(newPosy)+' ';
   }
 		globalGeneralSvgReferenceElement.setAttribute('points',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

   divLag1Pour({t:'depPlZ',l:'depPlZ','x':newPosx,'y':newPosy});


  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){

   var tt='';
   for(var i=0;i<globalSelectElementMove.tableauOriginal.length;i+=2){
    var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[i]+deltaReel.x);
    var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[i+1]+deltaReel.y);
    tt+=' '+(newPosx)+' '+(newPosy)+' ';
   }
 		globalGeneralSvgReferenceElement.setAttribute('points',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

   divLag1Pour({t:'depPgZ',l:'depPgZ','x':newPosx,'y':newPosy});

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   //    console.log('deltaReel=',deltaReel);
   
   divLag1Pour({t:'depChZ',l:'depChZ','x':arrdi10000(newPointX),'y':arrdi10000(newPointY)});
   
   var tt='';
   for(var i=0;i<globalSelectElementMove.tableauOriginal.length;i++){
   
    if(globalSelectElementMove.tableauOriginal[i][0]=='M' || globalSelectElementMove.tableauOriginal[i][0]=='L' || ( globalSelectElementMove.tableauOriginal[i][0]=='m' && i==0 )){
     var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]+deltaReel.y);
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+(newPosx)+' '+(newPosy)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='A' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]);
     var newPosx3=arrdi10000(globalSelectElementMove.tableauOriginal[i][5]);
     var newPosx4=arrdi10000(globalSelectElementMove.tableauOriginal[i][6]+deltaReel.x);
     var newPosy4=arrdi10000(globalSelectElementMove.tableauOriginal[i][7]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' '+arrdi10000(newPosx3)+' '+arrdi10000(newPosx4)+' '+arrdi10000(newPosy4)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='a' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]);
     var newPosx3=arrdi10000(globalSelectElementMove.tableauOriginal[i][5]);
     var newPosx4=arrdi10000(globalSelectElementMove.tableauOriginal[i][6]);
     var newPosy4=arrdi10000(globalSelectElementMove.tableauOriginal[i][7]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' '+arrdi10000(newPosx3)+' '+arrdi10000(newPosx4)+' '+arrdi10000(newPosy4)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='C' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]+deltaReel.y);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]+deltaReel.x);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]+deltaReel.y);
     var newPosx3=arrdi10000(globalSelectElementMove.tableauOriginal[i][5]+deltaReel.x);
     var newPosy3=arrdi10000(globalSelectElementMove.tableauOriginal[i][6]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' '+arrdi10000(newPosx3)+' '+arrdi10000(newPosy3)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='c' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]);
     var newPosx3=arrdi10000(globalSelectElementMove.tableauOriginal[i][5]);
     var newPosy3=arrdi10000(globalSelectElementMove.tableauOriginal[i][6]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' '+arrdi10000(newPosx3)+' '+arrdi10000(newPosy3)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='S' || globalSelectElementMove.tableauOriginal[i][0]=='Q' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]+deltaReel.y);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]+deltaReel.x);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='s' || globalSelectElementMove.tableauOriginal[i][0]=='q' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='l' || globalSelectElementMove.tableauOriginal[i][0]=='t' || globalSelectElementMove.tableauOriginal[i][0]=='m' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='L' || globalSelectElementMove.tableauOriginal[i][0]=='T' || globalSelectElementMove.tableauOriginal[i][0]=='M' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='v' || globalSelectElementMove.tableauOriginal[i][0]=='h' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='V'  ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='H' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='z' || globalSelectElementMove.tableauOriginal[i][0]=='Z' ){

     tt+=globalSelectElementMove.tableauOriginal[i].join(' ')+' ';

    }else{
     console.warn('Non prévu ' , globalSelectElementMove.tableauOriginal[i][0] , globalSelectElementMove.tableauOriginal[i] );
     tt+=globalSelectElementMove.tableauOriginal[i].join(' ')+' ';
    }
   }
//   console.log('tt='+tt);
 		globalGeneralSvgReferenceElement.setAttribute('d',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['d']=tt;
   
  }
  if(globalSelectElementMove.rectangle!==null){
   globalSelectElementMove.rectangle.ref.setAttribute('x',globalSelectElementMove.rectangle.x+deltaReel.x);
   globalSelectElementMove.rectangle.ref.setAttribute('y',globalSelectElementMove.rectangle.y+deltaReel.y);
  }   
  
  
  return;


 }
 //========================================================================================================
 
 var globalPathDChaine=null;
 var globTranslateMatriceSvgInverse=null;
 var globTranslateMatriceAbsolueInverse=null;
 var globalReferenceRectangle=null;
 
 var globalSelectElementMove={
  mouseStart:null,
  elementStart:null,
  matriceRacineInverse:null,
  matriceElementElementInverse:null,
  matriceRacine:null,
  rectangle:null,
  tableauOriginal:null,
  autreReference:null,
  autreReferenceInverse:null,
 }
 
 //========================================================================================================
 function touchDownMoveElement(e){
  e.stopPropagation();
  actionDownMoveElement(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownMoveElement(e){
  e.stopPropagation();
  actionDownMoveElement(e);
 }
 //========================================================================================================
 function actionDownMoveElement(e){
//  console.log('mouseDownTranslate e=',e.target,e);
  initPosxy=positionSouris(e);
  ecran_appuye='deplaceElement';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  divlag1.innerHTML='<span>mmEZ='+_dssvg.zoom1+'</span>,<span>sx='+initPosxy.sx + '</span>,<span>sy=' + initPosxy.sy+'</span>';
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  var nouvelIdArbre=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
  if(_dssvg.idArbreCourant===nouvelIdArbre){
  }else{
   _dssvg.idArbrPreceden=_dssvg.idArbreCourant;
   _dssvg.idArbreCourant=nouvelIdArbre;
  }
  
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
//  console.log('globalGeneralSvgReferenceElement=',globalGeneralSvgReferenceElement);
  
  globalSelectElementMove.autreReference=null; // pour le radialGradient ou filter
  if(globalGeneralSvgReferenceElement.length>1){
   globalSelectElementMove.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
   globalSelectElementMove.autreReferenceInverse=document.querySelectorAll('[id="inverse_de_'+_dssvg.idArbreCourant+'"]')[0];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0];  
  
  globalSelectElementMove.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalSelectElementMove.matriceElementElementInverse.e=0;
  globalSelectElementMove.matriceElementElementInverse.f=0;
  
  globalSelectElementMove.matriceRacine=refZnDessin.getScreenCTM();
  globalSelectElementMove.matriceRacine.e=0;
  globalSelectElementMove.matriceRacine.f=0;
  
  
  globalSelectElementMove.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  
  
  globalSelectElementMove.mouseStart=refZnDessin.createSVGPoint();
		globalSelectElementMove.mouseStart.x = e.clientX; 
  globalSelectElementMove.mouseStart.y = e.clientY;
  globalSelectElementMove.mouseStart=globalSelectElementMove.mouseStart.matrixTransform(globalSelectElementMove.matriceRacineInverse);
  globalSelectElementMove.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };
  
  globalSelectElementMove.rectangle=null;
  var rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  if(rectangle){
   globalSelectElementMove.rectangle={
    ref:rectangle,
    x:parseFloat(rectangle.getAttribute('x')),
    y:parseFloat(rectangle.getAttribute('y')),
   }
  }
  
  if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('d');
   var obj=getPointsFromSvgPath(pathDChaine);
   globalSelectElementMove.tableauOriginal=obj.tabOri;
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('points');
   globalSelectElementMove.tableauOriginal=pathDChaine.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('points');
   globalSelectElementMove.tableauOriginal=pathDChaine.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
   
  }else if( globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use' ){
   
   if(globalGeneralSvgReferenceElement.getAttribute('x')){
    globalSelectElementMove.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')) ];
   }else{
    globalSelectElementMove.tableauOriginal=[ 0 , 0 ];
   }
   
   
  }else if(
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='text'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='tspan' || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image' ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use'   ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='filter' 
  ){
  
   globalSelectElementMove.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')) ];
//   console.log('globalGeneralSvgReferenceElement=',globalGeneralSvgReferenceElement,'globalSelectElementMove.tableauOriginal=' , globalSelectElementMove.tableauOriginal );
  
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='circle' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='ellipse' || 'radialgradient' === globalGeneralSvgReferenceElement.nodeName.toLowerCase()){
   
   globalSelectElementMove.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')) ];

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line'  || 'lineargradient' === globalGeneralSvgReferenceElement.nodeName.toLowerCase()){
   
   globalSelectElementMove.tableauOriginal=[ 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('x1')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('y1')) ,
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('x2')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('y2')) ,
   ];
   
  }
  
  
 }
 //========================================================================================================
 function ajouterPointsDeControlePointsElements(){
  var pt0    = refZnDessin.createSVGPoint();
  var pt1    = refZnDessin.createSVGPoint();
  var pt2    = refZnDessin.createSVGPoint();
  var pt3    = refZnDessin.createSVGPoint();
  var pt4    = refZnDessin.createSVGPoint();
  var pt5    = refZnDessin.createSVGPoint();
//  var lst=refZnDessin.querySelectorAll('*');
  var lst=refZnDessin.querySelectorAll('[data-idarbre1]');
  
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='g' || nn==='stop' || nn==='filter' || nn==='fegaussianblur'  || nn==='use' || nn==='defs' ){
    continue;
   }
   if(lst[i].getAttribute('data-type') && ( lst[i].getAttribute('data-type')=='systeme' || lst[i].getAttribute('data-type')=='toRemove' )){
    continue;
   }
   
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' && extensions.dansDefs===true){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsPtE1' && extensions.dansDefs===false){
     continue;
    }
   }catch(e){
   }
   
   try{
    
    var col='red';
    if(_dssvg.mode_en_cours==='setModeSaisieDefsPtE1' ){
     col='yellow';
    }
    
    var idarbre1=lst[i].getAttribute('data-idarbre1');
    
    if(nn==='radialgradient'){
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
     var id=lst[i].getAttribute('id');
     // créer un cercle temporaire invisible
     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:'+(id!==null?'url(#'+id+')':'rgba(255,0,0,1)')+';stroke:blue;stroke-width:0;', // fill:url(#f)
       transform:transform
      }
     );
     var bounding=cercle.getBBox();
     cercle.remove();
    }else if(nn==='lineargradient'){     

     var xlink=lst[i].getAttribute('xlink:href');
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
     // créer un cercle temporaire invisible
     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'fill:rgba(255,0,0,1);stroke:blue;stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      }
     );
     var bounding=ligne.getBBox();
     ligne.remove();

    }else{
     var bounding=lst[i].getBBox(); // matrix
     var transform=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
    }
    if(lst[i].parentNode.nodeName.toLowerCase()!=='pattern'){
     var boite=ajouteElemDansElem(lst[i].parentNode,'rect',{'data-rectangle':idarbre1,'data-nn':nn,'data-type':'toRemove',transform:transform,x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(4/_dssvg.zoom1)+';fill:transparent;'});
    }
   }catch(e){
    if(String(e).indexOf('getBBox is not a function')>=0){
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }
  }
  for(var i=0;i<lst.length ;i++){
   var idarbre1=lst[i].getAttribute('data-idarbre1');
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='g' || nn==='stop' || nn==='filter' || nn==='fegaussianblur' || nn==='use' || nn==='defs'){
    continue;
   }
   if(lst[i].getAttribute('data-type') && ( lst[i].getAttribute('data-type')=='systeme' || lst[i].getAttribute('data-type')=='toRemove' )){
    continue;
   }
   
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' && extensions.dansDefs===true){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsPtE1' && extensions.dansDefs===false){
     continue;
    }
    if(extensions.hasOwnProperty('dansDefs') && extensions.dansDefs===true && !( nn==='clippath' &&  nn==='pattern' ) ){
     // cas du clipPath
     var monClone=lst[i].cloneNode(true);
     var t='';
     try{
      var m=lst[i].getScreenCTM();
      t='matrix('+m.a+','+m.b+','+m.c+','+m.d+',0,0) scale('+(1/_dssvg.zoom1)+','+(1/_dssvg.zoom1)+')';//'+m.e+','+m.f+')';
     }catch(e){
     }
     
     monClone.setAttribute('transform',t);
     monClone.setAttribute('data-idarbre1',idarbre1);
     monClone.setAttribute('data-type','toRemove');
     refZnDessin.prepend(monClone);
    }
    
    
    
   }catch(e){
   }
   
   
   try{
    
    if(nn==='radialgradient'){
//     console.log('ici');

     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
//     console.log(cascade);
     
     // il faut fabriquer un radialGradient inverse et assigner au cercle plus bas son url(id)
//     debugger;
     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform);
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');
     

     var id=lst[i].getAttribute('id');

     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:'+(id!==null?'url(#'+monClone.id+')':'rgba(255,0,0,1)')+';stroke:blue;stroke-width:0;',
       transform:transform
      },
      true // enPremier
     );
     var bounding=cercle.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(cercle.getScreenCTM());
     
     
    }else if(nn==='lineargradient'){
     
     

     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
//     console.log(cascade);
     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');

     var id=lst[i].getAttribute('id');

     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'stroke:url(#'+monClone.id+');stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      },
      true // enPremier
     );
     var bounding=ligne.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(ligne.getScreenCTM());
    }else{
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
     var bounding=lst[i].getBBox(); // matrix
    }
    
    pt1.x=bounding.x;
    pt1.y=bounding.y;
    pt1=pt1.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt2.x=bounding.x+bounding.width;
    pt2.y=bounding.y;
    pt2=pt2.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt3.x=bounding.x+bounding.width;
    pt3.y=bounding.y+bounding.height;  
    pt3=pt3.matrixTransform(matrixRelatifVersAbsolu);
    
    pt4.x=bounding.x;
    pt4.y=bounding.y+bounding.height;  
    pt4=pt4.matrixTransform(matrixRelatifVersAbsolu);

    var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt1.x-6/_dssvg.zoom1,y:pt1.y+3/_dssvg.zoom1,style:'fill:white;stroke:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
    var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' hg',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(0,255,0,0.2);stroke:blue;stroke-width:'+(3/_dssvg.zoom1)+';','data-fnt':'actionDownSelectionIndiceArbre'});
    dot.addEventListener('mousedown',mouseDownSelectionIndiceArbre,'dot')
    dot.addEventListener('touchstart',touchDownSelectionIndiceArbre,'dot')    
   
   }catch(e){
    if(String(e).indexOf('.getBBox is not a function')>=0 || String(e).indexOf('.getScreenCTM is not a function')>=0){ 
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }

  }
  
  if(_dssvg.idArbreCourant!==null){
   var aSupp=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' hg"]')[0];
   try{
    if(aSupp!==null && aSupp!==undefined){
     aSupp.remove();
//     debugger;
     actionDownSelectionIndiceArbre(null,_dssvg.idArbreCourant) ;   
    }
   }catch(e1){
    console.warn('%cErreur à analyser e=','background:yellow;color:red;',e1)
   }
  }
  
 }
 //========================================================================================================
 function ajouterPointsDeControleElements(){  // hugues
  var pt0    = refZnDessin.createSVGPoint();
  var pt1    = refZnDessin.createSVGPoint();
  var pt2    = refZnDessin.createSVGPoint();
  var pt3    = refZnDessin.createSVGPoint();
  var pt4    = refZnDessin.createSVGPoint();
  var pt5    = refZnDessin.createSVGPoint();
  var ptBoite= refZnDessin.createSVGPoint();
  
  var lst=refZnDessin.querySelectorAll('[data-idarbre1]');
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='g' || nn==='stop'  || nn=='fegaussianblur' || nn==='title' || nn==='defs' ){
    continue;
   }
   if(lst[i].getAttribute('data-type') && lst[i].getAttribute('data-type')=='systeme'){
    continue;
   }
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' && extensions.dansDefs===true){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsElt1' && extensions.dansDefs===false){
     continue;
    }
   }catch(e){
   }
   var col='red';
   if(_dssvg.mode_en_cours==='setModeSaisieDefsElt1' ){
    col='yellow';
   }
   
   try{
    var idarbre1=lst[i].getAttribute('data-idarbre1');
    if(nn==='filter'){
     var rectangleFiltre=ajouteElemDansElem(
      refZnDessin,
      'rect',
      {'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actMovElementPosition',
       x:lst[i].getAttribute('x'),
       y:lst[i].getAttribute('y'),
       width:lst[i].getAttribute('width'),
       height:lst[i].getAttribute('height'),
       style:'fill:rgba(255,0,0,1);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';',
      }
     );
     var bounding=rectangleFiltre.getBBox();
     var boite=ajouteElemDansElem(refZnDessin,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
     rectangleFiltre.remove();
    }else if(nn==='radialgradient'){
     var xlink=lst[i].getAttribute('xlink:href');
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
     // créer un cercle temporaire invisible
     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actMovElementPosition',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:rgba(255,0,0,1);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';',
       transform:transform
      }
     );
     var bounding=cercle.getBBox();
     var boite=ajouteElemDansElem(refZnDessin,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',transform:transform,x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
     cercle.remove();
      
    }else if(nn==='lineargradient'){

     var xlink=lst[i].getAttribute('xlink:href');
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
     // créer un cercle temporaire invisible
     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actMovElementPosition',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'fill:rgba(255,0,0,1);stroke:blue;stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      }
     );
     var bounding=ligne.getBBox();
     var boite=ajouteElemDansElem(refZnDessin,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
     ligne.remove();
      
    }else if(lst[i].parentNode.nodeName.toLowerCase()==='clippath' || lst[i].parentNode.nodeName.toLowerCase()==='pattern' ){
     var transform='';
     try{
      var m=lst[i].getScreenCTM();
      transform='matrix('+m.a+','+m.b+','+m.c+','+m.d+','+m.e+','+m.f+')';
     }catch(e){
     }
     var bounding=lst[i].getBBox(); // matrix
     var boite=ajouteElemDansElem(refZnDessin,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',transform:transform,x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
    }else{
     var bounding=lst[i].getBBox(); // matrix
     var transform=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
     var boite=ajouteElemDansElem(lst[i].parentNode,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',transform:transform,x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
    }
   }catch(e){
    if(String(e).indexOf('.getBBox is not a function')>=0){
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }
  }
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='g' || nn==='stop'  || nn=='fegaussianblur'  || nn==='title' || nn==='defs'){
    continue;
   }
   if(lst[i].getAttribute('data-type') && lst[i].getAttribute('data-type')=='systeme'){
//    console.log('data-type =',lst[i].getAttribute('data-type'));
    continue;
   }
   if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' && ( nn=='defs' )){
    continue;
   }
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' && extensions.dansDefs===true ){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsElt1' && extensions.dansDefs===false){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsElt1' && extensions.dansDefs===true && ( nn==='clippath' || nn==='pattern' ) ){
     continue;
    }
   }catch(e){
   }
//   console.log('extensions=',extensions)
   
   
   
   try{
    var idarbre1=lst[i].getAttribute('data-idarbre1');
    
    
    var extensionSymbole=lst[i].getAttribute('data-extensions');
    if(extensionSymbole){
     extensionSymbole=JSON.parse(extensionSymbole);
     if(extensionSymbole.hasOwnProperty('dansSymbol') && extensionSymbole.dansSymbol===true){
      var monClone=lst[i].cloneNode(true);
      refZnDessin.prepend(monClone);
     }
     if(extensionSymbole.hasOwnProperty('dansDefs') && extensionSymbole.dansDefs===true){
      // cas du clipPath et du pattern
      var monClone=lst[i].cloneNode(true);
      var t='';
      try{
       var m=lst[i].getScreenCTM();
       t='matrix('+m.a+','+m.b+','+m.c+','+m.d+',0,0) scale('+(1/_dssvg.zoom1)+','+(1/_dssvg.zoom1)+')';//'+m.e+','+m.f+')';
      }catch(e){
      }
      
      monClone.setAttribute('transform',t);
      monClone.setAttribute('data-idarbre1',idarbre1);
      monClone.setAttribute('data-type','toRemove');
      refZnDessin.prepend(monClone);
     }
    }
//    console.log('nn=' , nn);

    if(nn==='radialgradient'){
     
     
     
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
//     console.log(cascade);
     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');

//     console.log('transform=',transform);
     var id=lst[i].getAttribute('id');

     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:'+(id!==null?'url(#'+monClone.id+')':'rgba(255,0,0,1)')+';stroke:blue;stroke-width:0;', // fill:url(#f)
       transform:transform
      },
      true // enPremier
     );
     var bounding=cercle.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(cercle.getScreenCTM());
     
    }else if(nn==='lineargradient'){

     
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
//     console.log(cascade);
     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');

     var id=lst[i].getAttribute('id');

     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'stroke:url(#'+monClone.id+');stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      },
      true // enPremier
     );
     var bounding=ligne.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(ligne.getScreenCTM());
     
     
    }else if(nn==='filter'){
//     console.log(cascade);
     var rectangle=ajouteElemDansElem(
      refZnDessin,
      'rect',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x:lst[i].getAttribute('x'),
       y:lst[i].getAttribute('y'),
       width:lst[i].getAttribute('width'),
       height:lst[i].getAttribute('height'),
       style:'fill:transparent;stroke-width:'+(10/_dssvg.zoom1)+';stroke:red;stroke-opacity:0.1;',
      },
      true // enPremier
     );
     var bounding=rectangle.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(rectangle.getScreenCTM());
     
     
     
    }else{
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
     var bounding=lst[i].getBBox(); // matrix
    }
    pt1.x=bounding.x;
    pt1.y=bounding.y;
    pt1=pt1.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt2.x=bounding.x+bounding.width;
    pt2.y=bounding.y;
    pt2=pt2.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt3.x=bounding.x+bounding.width;
    pt3.y=bounding.y+bounding.height;  
    pt3=pt3.matrixTransform(matrixRelatifVersAbsolu);
    
    pt4.x=bounding.x;
    pt4.y=bounding.y+bounding.height;  
    pt4=pt4.matrixTransform(matrixRelatifVersAbsolu);

    
    var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt1.x-6/_dssvg.zoom1,y:pt1.y+3/_dssvg.zoom1,style:'fill:white;stroke:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
    var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove' ,'data-elem':''+idarbre1+' hg', 'data-fnt':'actMovElementPosition,mouseDownMoveElement',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(255,0,0,0.2);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownMoveElement,'dot');
    dot.addEventListener('touchstart',touchDownMoveElement,'dot');
    
    if(nn!=='use'){
     var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt3.x-6/_dssvg.zoom1,y:pt3.y+3/_dssvg.zoom1,style:'fill:white;stroke:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
     var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' bd', 'data-fnt':'actMovElementTaille,mouseDownSizeElement',cx:pt3.x,cy:pt3.y,r:rayonPoint,style:'fill:rgba(255,0,0,0.2);stroke:green;stroke-width:'+(1/_dssvg.zoom1)+';'});
     dot.addEventListener('mousedown',mouseDownSizeElement,'dot');
     dot.addEventListener('touchstart',touchDownSizeElement,'dot');
    }
    
   }catch(e){
    if(String(e).indexOf('.getScreenCTM is not a function')>=0){
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }
  }
 }
 //========================================================================================================
 function annuler1(e){
  if(_dssvg.historique1.length>1){
   var toto=_dssvg.historique1.pop(); 
//   console.log('toto=',toto);
   _dssvg.arbre0=_dssvg.historique1.pop();
   afficheArbre0({init:false});
  }  
 }

 
 //========================================================================================================
 function setModeSaisieEllipse1(){
  _dssvg.mode_en_cours='setModeSaisieEllipse1';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieCercle1(){
  _dssvg.mode_en_cours='setModeSaisieCercle1';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieRectangle1(){
  _dssvg.mode_en_cours='setModeSaisieRectangle1';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 
 //========================================================================================================
 function setModeSaisiePolyline1(){
  _dssvg.mode_en_cours='setModeSaisiePolyline1'; // chemin
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisiePolygon1(){
  _dssvg.mode_en_cours='setModeSaisiePolygon1'; // chemin
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieChemin1(){
  _dssvg.mode_en_cours='setModeSaisieChemin1'; // chemin
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
 }
 //========================================================================================================
 function setModeSaisieLigne2(){
  _dssvg.mode_en_cours='setModeSaisieLigne2';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieLigne1(){
  _dssvg.mode_en_cours='setModeSaisieLigne1';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieDeplace1(){
  _dssvg.mode_en_cours='setModeSaisieDeplace1'; //deplace
  globalIndicePoint=null;
  globalGeneralSvgReferenceElement=null;
  ecran_appuye=false;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  divlag1.innerHTML='<small>Vb3Z=</small><kbd>'+_dssvg.zoom1+' vB: </kbd><span style="color:red;">'+arrdi10000(_dssvg.viewBoxInit[0])+ '</span><span style="color:red;">'+arrdi10000(_dssvg.viewBoxInit[1])+ '</span><span>'+arrdi10000(_dssvg.viewBoxInit[2])+'</span><span style="color:red;">'+arrdi10000(_dssvg.viewBoxInit[3])+'</span>';
 }
 //========================================================================================================
 function setModeSaisieSelElt1(){
  _dssvg.mode_en_cours='setModeSaisieSelElt1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  affPoi();
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieEditionPoin1(){
  _dssvg.mode_en_cours='setModeSaisieEditionPoin1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  affPoi();
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieTranE1(){
  _dssvg.mode_en_cours='setModeSaisieTranE1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  globalGeneralSvgReferenceElement=null;
  affPoi();
  divLag2Complete();
 }
 //========================================================================================================
 function setModeSaisieGroupe1(){
  _dssvg.mode_en_cours='setModeSaisieGroupe1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  affPoi();
  globalGeneralSvgReferenceElement=null;
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieDefsElt1(){
  _dssvg.mode_en_cours='setModeSaisieDefsElt1';
  globalIndicePoint=null;
  majBout();
  globalGeneralSvgReferenceElement=null;
//  afficheArbre0({init:false});
  affPoi();
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieDefsPtE1(){
  _dssvg.mode_en_cours='setModeSaisieDefsPtE1';
  globalIndicePoint=null;
  majBout();
  globalGeneralSvgReferenceElement=null;
//  afficheArbre0({init:false});
  affPoi();
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieDefsTrE1(){
  _dssvg.mode_en_cours='setModeSaisieDefsTrE1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  globalGeneralSvgReferenceElement=null;
  affPoi();
  divLag2Complete();
 }
 
 //========================================================================================================
 function setModeSaisieDefsGrp1(){
  _dssvg.mode_en_cours='setModeSaisieDefsGrp1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  affPoi();
  globalGeneralSvgReferenceElement=null;
  divLag2Complete();  
 }
 
 //========================================================================================================
 function redrawCss(){
//  console.log('redrawCss');
  getSizes()
 
  wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
  he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
  var ss = document.styleSheets[0];
  for( var i=ss.cssRules.length-1;i>=2;i--){ // on garde les règles 0 et 1 qui sont  html et *
   ss.deleteRule(i);
  }
  
/*
css do not hide address bar on mobile browser
https://stackoverflow.com/questions/18061308/prevent-address-bar-hiding-in-mobile-browsers
html {background-color: red;overflow: hidden;width: 100%;}
body {height: 100%;
  position: fixed; / * prevent overscroll bounce * /
  background-color: lightgreen;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;/ * iOS velocity scrolling * /
}
*/  
  
  ss.insertRule('body{background-color:aliceblue;color:#333;font-family:verdana,arial,sans-serif;font-size:'+(_dssvg.parametres.taillePolice)+'px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;width:100%;position:fixed;touch-action:manipulation;height:100%;overscroll-behavior:none;overflow:hidden;-webkit-overflow-scrolling: touch;}' , ss.cssRules.length);
  ss.insertRule('*{scrollbar-color: #34d3f7 #bfe8ff;}' , ss.cssRules.length);
  ss.insertRule('*{scrollbar-width: thin;}' , ss.cssRules.length); // firefox !!!!
  ss.insertRule('*::-webkit-scrollbar {width:'+_dssvg.parametres.scroll_size+'px;height:'+_dssvg.parametres.scroll_size+'px;background:#bfe8ff;}' , ss.cssRules.length);
  ss.insertRule('*::-webkit-scrollbar-thumb {background-color: #34d3f7;}' , ss.cssRules.length);
  ss.insertRule('*::-webkit-scrollbar-corner{background-color: #34d3f7;}' , ss.cssRules.length);
  ss.insertRule('*::-webkit-resizer{background-color: #34d3f7;}' , ss.cssRules.length);  
  
  ss.insertRule('.butEnabled{display: inline-block; font-size: 0.9em; line-height: 1.0em; text-decoration: none; border: 1px #eee outset; padding    : 1px 0px 0px 1px; border-radius: 5px; box-shadow: 0px 0px 4px #aaa; color: #006c84; background: linear-gradient(to bottom,#beedff 0%, #7eddff 100%); outline: none;}' , ss.cssRules.length);  
  ss.insertRule('.butEnabled:active{  box-shadow : rgb(170 170 170) 0px 0px 0px; background : linear-gradient(rgb(121, 247, 131) 0%, rgb(190, 255, 219) 100%); border     : 1px inset rgb(238, 238, 238);}' , ss.cssRules.length);  
  ss.insertRule('.butDisabled{ display: inline-block; font-size: 0.9em; line-height: 1.0em; text-decoration: none; border: 1px #eee inset; padding    : 1px 0px 0px 1px;  border-radius: 5px; color: #a8b9bd; outline: none; box-shadow: none; background : linear-gradient(rgb(121, 247, 131) 0%, rgb(190, 255, 219) 100%);}  ' , ss.cssRules.length);  
  ss.insertRule('.butMenuGauche{width:'+(wi_of_the_menulft-2*wi_of_the_brds1-globalScrollWidth1)+'px;margin-bottom:'+(_dssvg.parametres.intervalleEntreBtns)+'px;min-height:'+_dssvg.parametres.hauteurMinBtnMenuGau+'px;max-height:'+_dssvg.parametres.hauteurMinBtnMenuGau+'px;overflow:hidden; }' , ss.cssRules.length);  
  ss.insertRule('.butMenuHaut{height:'+(he_of_the_menutpe-2*wi_of_the_brds1-globalScrollWidth1)+'px;margin-right:'+(_dssvg.parametres.intervalleEntreBtns)+'px;min-width: fit-content;width: min-content;display:inline-block;white-space:pre;}' , ss.cssRules.length);  
  ss.insertRule('#divlag1 {overflow:hidden;font-size:0.8em;}' , ss.cssRules.length);  
  ss.insertRule('#divlag1 span{display:inline-block;min-width:6em;}' , ss.cssRules.length);  
  ss.insertRule('#divlag2 {overflow:hidden;font-size:0.8em;background:white;border:1px #444 outset;}' , ss.cssRules.length);  
  ss.insertRule('#divlag2 button,#divlag2 div{display:inline-block;margin-right:3px;padding-right:3px;height:'+(he_of_the_menutpe-2*wi_of_the_brds1-globalScrollWidth1-2)+'px;}' , ss.cssRules.length);  
  ss.insertRule('.butpopUp{margin-right:'+(_dssvg.parametres.intervalleEntreBtns)+'px;min-width:'+(wi_of_the_menulft-2*wi_of_the_brds1-globalScrollWidth1)+'px;display:inline-block;}' , ss.cssRules.length);  
  

  ss.insertRule('#divlft{overflow-y:scroll;position:absolute;}' , ss.cssRules.length);  
  ss.insertRule('#divtpe{overflow: scroll hidden;position:absolute;display:flex;flex-flow: row nowrap;}' , ss.cssRules.length);  
  
  
  ss.insertRule('#popupContent1{z-index: 101;opacity: 0.9;position: absolute;background: white;overflow: scroll;    border-radius: 4px;box-shadow: 0px 0px 25px #000;}' , ss.cssRules.length);  
  
  
  ss.insertRule('#popupValue div{}' , ss.cssRules.length); 
  ss.insertRule('#popupValue label{margin-right:5px;}' , ss.cssRules.length);  
  ss.insertRule('#popupValue input{min-width:50px;padding:5px;}' , ss.cssRules.length);  
  ss.insertRule('#popupValue textarea{border:2px #eee inset;border-radius:4px;padding:4px;min-width:80%;}' , ss.cssRules.length);  
  
  ss.insertRule('.svgBoutonGauche1{max-height:'+(_dssvg.parametres.hauteurMinBtnMenuGau-2*wi_of_the_brds1-3)+'px;}' , ss.cssRules.length);  // pourquoi -3 ??
  ss.insertRule('.svgBoutonHaut1{min-width:'+_dssvg.parametres.largeurMinBtnMenuHau+'px;height:'+(_dssvg.parametres.hauteurMenuHaut-4*wi_of_the_brds1)+'px;}' , ss.cssRules.length);  
  ss.insertRule('.bckRouge{background:'+bckRouge+';color:yellow;}' , ss.cssRules.length);  
  ss.insertRule('.bckVert1{background:'+bckVert1+';}' , ss.cssRules.length);  
  ss.insertRule('.bckVert2{background:'+bckVert2+';}' , ss.cssRules.length);  
  ss.insertRule('.bckJaune{background:'+bckJaune+';color:red;}' , ss.cssRules.length);  
  ss.insertRule('.bckRose{background:'+bckRose+';color:red;}' , ss.cssRules.length);  
  
  
  
  
  
  ss.insertRule('.class_treediv1{ border:1px #F7F3CA outset; height:40px; overflow:hidden; display : flex;  flex-direction: row; justify-content: space-between; }' , ss.cssRules.length);  
  ss.insertRule('.class_treeIntervalldiv2{border:1px #F7F3CA solid;}' , ss.cssRules.length);  
  ss.insertRule('.class_treeTextContentdiv3{text-align:left;flex-grow:1;;font-size:0.9em;}' , ss.cssRules.length);  
  ss.insertRule('.class_treedivFolder1{border:0px lime solid;}' , ss.cssRules.length);  
  ss.insertRule('.class_treeFold1,.class_treeDelet1{ display:inline-block; float:left; height:30px; min-width:30px; border:1px #F7F3CA outset; text-align: center; text-decoration: none; font-size: 2em; line-height: 1.1em; border-radius:5px; color:black; font-weight:bold; cursor:pointer; font-family:monospace;}' , ss.cssRules.length);
  ss.insertRule('.class_treeHandle1{ border:1px #F7F3CA outset; display:inline-block; float:right; height:30px; width:30px; min-width:45px; text-align: center; text-decoration: none; font-size: 1.5em; line-height: 1.6em; border-radius:5px; font-family:monospace; cursor:pointer;}' , ss.cssRules.length);
  ss.insertRule('.class_tree_yydanger {    color: #FFFFFF!important;    background: linear-gradient(to bottom, #FF0000, #D30000)!important;    font-size: 1.5em;    display: inline-block;    text-decoration: none;    text-align: center;    border-radius: 5px;    font-family: verdana, arial, sans-serif;    cursor: pointer;    min-width: 40px;    min-height: 30px;    line-height: 30px;    border: 1px #F7F3CA outset;}' , ss.cssRules.length);
  ss.insertRule('#editTree1 td{ border:1px blue solid; margin:1px; padding:1px;}' , ss.cssRules.length);
  ss.insertRule('#editTree1 input,#editTree1 textarea{ border:2px #eee inset; margin:1px; padding:5px;width:100%;}' , ss.cssRules.length);
  
  
 }  
//========================================================================================================
 function getScrollWidth() { //setup globalScrollWidth1
  var div = document.createElement("div");
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'auto';
  div.style.opacity = 0.01;
  body.appendChild(div);
  var bag = document.createElement("div");
  var att1 = 'width:101px;height:101px;overflow:auto;';
  bag.style.width = '101px';
  bag.style.height = '101px';
  bag.style.overflow = 'auto';
  div.appendChild(bag);
  div.scrollTop = 100;
  globalScrollWidth1 = div.scrollTop - 1;
  div.removeChild(bag);
  body.removeChild(div);
 }
 //========================================================================================================
 function resize1(){
  getSizes();

  
  divtpe.style.top=(margns.t)+'px';
  divtpe.style.left=(wi_of_the_menulft+margns.l)+'px';
  divtpe.style.border=wi_of_the_brds1+'px red solid';
  divtpe.style.width=(xscreen-wi_of_the_menulft-margns.l-margns.r)+'px';
  divtpe.style.height=he_of_the_menutpe+'px';

  divlft.style.top=(margns.t)+'px';
  divlft.style.left=(margns.l)+'px';
  divlft.style.border=wi_of_the_brds1+'px red solid';
  divlft.style.width=(wi_of_the_menulft)+'px';
  divlft.style.height=(yscreen-margns.t-margns.b)+'px';
  
  divc1.style.top=(margns.t+he_of_the_menutpe+decal.t)+'px';
  divc1.style.left=(margns.l+wi_of_the_menulft+decal.l)+'px';
  divc1.style.border=wi_of_the_brds2+'px red solid';
  divc1.style.width=(xscreen-margns.l-wi_of_the_menulft-decal.l-margns.r)+'px';
  divc1.style.height=(yscreen-margns.t-he_of_the_menutpe-decal.t-margns.b)+'px';
  
  decalageX=margns.l+wi_of_the_menulft+decal.l+wi_of_the_brds2;
  decalageY=margns.t+he_of_the_menutpe+decal.t+wi_of_the_brds2;
  refZnDessin.style.top=0; //(margns.t+he_of_the_menutpe+decal.t+wi_of_the_brds2)+'px';
  refZnDessin.style.left=0; //(margns.l+wi_of_the_menulft+decal.l+wi_of_the_brds2)+'px';
  
  var largeurDessin=(xscreen-margns.l-wi_of_the_menulft-decal.l-margns.r-2*wi_of_the_brds2);
  refZnDessin.style.width=largeurDessin+'px';
  var hauteurDessin=(yscreen-margns.t-he_of_the_menutpe-decal.t-margns.b-2*wi_of_the_brds2);
  refZnDessin.style.height=hauteurDessin+'px';
  
  if(_dssvg.viewBoxInit===null){
   _dssvg.viewBoxInit=[-2,-2,largeurDessin/_dssvg.zoom1,hauteurDessin/_dssvg.zoom1];
  }else{
   _dssvg.viewBoxInit=[_dssvg.viewBoxInit[0],_dssvg.viewBoxInit[1],largeurDessin/_dssvg.zoom1,hauteurDessin/_dssvg.zoom1];
  }
//  refZnDessin.setAttribute('viewBox',_dssvg.viewBoxInit.join(' '));
  setAttributeViewBox();  


  divlag1.style.top=(margns.t+he_of_the_menutpe)+'px';
  divlag1.style.left=(margns.l+wi_of_the_menulft+decal.l)+'px';
  divlag1.style.border=wi_of_the_brds2+'px pink solid';
  divlag1.style.width=(xscreen-margns.l-wi_of_the_menulft-decal.l-margns.r)+'px';
  divlag1.style.height=(decal.t)+'px';
  
//  divlag2.style.top=(margns.t+he_of_the_menutpe+decal.t+yscreen-margns.t-he_of_the_menutpe-decal.t-margns.b)+'px';
  divlag2.style.bottom=0;
  divlag2.style.minHeight=(margns.b)+'px';
  divlag2.style.left='0px';
  divlag2.style.width=(xscreen-margns.l-margns.r)+'px';
  divlag2.style.height='fit-content';
  
  if(popUpIsDisplayed1!==''){
   resizePopup({from:popUpIsDisplayed1});
  }
  

  
 } 
 //========================================================================================================
 function debounce(func, wait, immediate) { // https://davidwalsh.name/javascript-debounce-function
  var timeout;
  return function() {
   var context = this, args = arguments;
   var later = function() {
    timeout = null;
    if (!immediate) func.apply(context, args);
   };
   var callNow = immediate && !timeout;
   clearTimeout(timeout);
   timeout = setTimeout(later, wait);
   if (callNow) func.apply(context, args);
  };
 }
 //========================================================================================================
 var myEffitFn=debounce(function(){
  resize1(); // All the taxing stuff you do
 }, 250);
 //========================================================================================================
 function _foldFunction1(idArbre){
//  console.log(idArbre);
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id===idArbre){
    _dssvg.arbre0[i].isOpen=_dssvg.arbre0[i].isOpen===1?0:1;
    oMyTree1.fold(idArbre);
    break;
   }
  }
  
 }
 //========================================================================================================
 function _editFunction1(idArbre){
  var values=null;
  var branche=null;
  var indiceArbre=null;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id==idArbre){
    indiceArbre=i;
    branche=_dssvg.arbre0[i];
//    console.log('branche=',branche);
    values=_dssvg.arbre0[i].data;
    break;
   }
  }
  
  var td1MaxWidth='width:20%';
  
//  console.log('edit node number '+idArbre+' values=',values );
  var elementsAffiches=[];
  var tt='';
  for(var i in values.attributes){
   tt+='<tr>';
   if(i=='data-extensions' ){
    tt+='<td style="background:lightgrey;'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td style="background:lightgrey;"><span>'+values.attributes[i]+'</span></td>';
   }else if(i=='data-idarbre1' ){
    tt+='<td style="background:lightgrey;'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td style="background:lightgrey;"><span>'+values.attributes[i]+'</span></td>';
//    tt+='<td></td>';
   }else if(i=='d'){
    tt+='<td style="'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td><textarea  data-attrib="'+i+'" cols="50" rows="3" style="overflow:hidden;">'+values.attributes[i]+'</textarea></td>';

   }else if(i==='stroke-linejoin'){
    tt+='<td style="'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td><input  id="bef_input_'+i+'"    data-attrib="'+i+'" value="'+values.attributes[i]+'" />';
    tt+='<br />';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'\'">null</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'round\'">round</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'miter\'">miter</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'bevel\'">bevel</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'miter-clip\'">miter-clip</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'arcs\'">arcs</button>';
    tt+='</td>';
   }else if(i==='stroke-linecap'){
    tt+='<td style="'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td><input  id="bef_input_'+i+'"    data-attrib="'+i+'" value="'+values.attributes[i]+'" />';
    tt+='<br />';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'\'">null</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'round\'">round</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'butt\'">butt</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'square\'">square</button>';
    tt+='</td>';
   }else{
    if(i==='style'){
     tt+='<td style="'+td1MaxWidth+';">'+i+'</td>';
     tt+='<td>';
     tt+='<textarea cols="50" rows="3" id="idtempstyle" data-attrib="'+i+'">'+values.attributes[i]+'</textarea>';
     tt+='<br /><button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'idtempstyle\').value=\'fill:red;stroke:blue;stroke-width:1;\'">default</button>';
     tt+='</td>';
    }else{
     tt+='<td style="'+td1MaxWidth+';">'+i+'</td><td><input     data-attrib="'+i+'" value="'+values.attributes[i]+'"></td>';
    }
   }
   tt+='</tr>';
   elementsAffiches.push(i);
  }
  if(branche.data.nodeName.toLowerCase()==='text' || branche.data.nodeName.toLowerCase()==='tspan' || branche.data.nodeName.toLowerCase()==='title' ){
   tt+='<tr>';
   tt+='<td style="'+td1MaxWidth+';">'+branche.data.nodeName.toLowerCase()+'</td>';
   var valeur=(branche.data[branche.data.nodeName]!==undefined?branche.data[branche.data.nodeName]:branche.data['text']);
   tt+='<td><textarea id="idtemptext" data-attrib="'+branche.data.nodeName.toLowerCase()+'" cols="50" rows="3">'+valeur+'';
   tt+='</textarea></td>';
   tt+='</tr>';
  }
  var lstAttribs=[];
  if(
   values.nodeName=='path'   || 
   values.nodeName=='g'      || 
   values.nodeName=='rect'   ||
   values.nodeName=='circle' ||
   values.nodeName=='polyline' ||
   values.nodeName=='polygon' ||
   false
  ){
   lstAttribs=['id','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform','line-cap','enable-background','filter','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-dasharray'];
  }
  
  if(values.nodeName=='text'           ){ lstAttribs=['id','x','y','font-family','font-size','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform'];  }
  if(values.nodeName=='tspan'          ){ lstAttribs=['id','x','y','font-family','font-size','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform'];  }
  if(values.nodeName=='circle'         ){ lstAttribs=['id','cx','cy','r'];  }

  if(values.nodeName=='radialGradient' ){ lstAttribs=['id','cx','cy','r'      ,'gradientUnits','gradientTransform','xlink:href'];  }
  if(values.nodeName=='linearGradient' ){ lstAttribs=['id','x1','x2','y1','y2','gradientUnits','gradientTransform','xlink:href'];  }
  
  if(values.nodeName=='path'           ){ lstAttribs.push('d'); }
  if(values.nodeName=='rect'           ){ lstAttribs.push('x'); lstAttribs.push('y'); lstAttribs.push('width'); lstAttribs.push('height'); lstAttribs.push('rx'); lstAttribs.push('ry'); }
  if(values.nodeName=='circle'         ){ lstAttribs.push('cx'); lstAttribs.push('cy'); lstAttribs.push('r'); }
  
  if(values.nodeName=='filter'         ){ lstAttribs=['id','color-interpolation-filters'];  }
  if(values.nodeName=='feGaussianBlur' ){ lstAttribs=['stdDeviation'];  }
  
  if(values.nodeName=='stop'   ){ lstAttribs=['offset','stop-color'];  }
  
  
  for(var i=0;i<lstAttribs.length;i++){
   var trouve=false;
   for(var j=0;j<elementsAffiches.length;j++){
    if(elementsAffiches[j]==lstAttribs[i]){
     trouve=true;
     break;
    }
   }
   if(trouve===false){
    tt+='<tr>';
    if(lstAttribs[i]==='style'){
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td>';
     tt+='<textarea  id="idtempstyle"   data-attrib="'+lstAttribs[i]+'"></textarea>';
     tt+='<br /><button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'idtempstyle\').value=\'fill:red;stroke:blue;stroke-width:1;\'">Def</button>';
     tt+='</td>';
    }else if(lstAttribs[i]==='d'){
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td><input      data-attrib="'+lstAttribs[i]+'" value="M 10 10 20 20"></td>';
    }else if(lstAttribs[i]==='stroke-linejoin'){
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td><input  id="input_'+i+'"    data-attrib="'+lstAttribs[i]+'" value="">';
     tt+='<br />';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'\'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'round\'">round</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'miter\'">miter</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'bevel\'">bevel</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'miter-clip\'">miter-clip</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\arcs\'">arcs</button>';
     tt+='</td>';
    }else if(lstAttribs[i]==='stroke-linecap'){
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td><input  id="input_'+i+'"    data-attrib="'+lstAttribs[i]+'" value="">';
     tt+='<br />';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'\'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'round\'">round</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'butt\'">butt</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'square\'">square</button>';
     tt+='</td>';
    }else{
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td><input      data-attrib="'+lstAttribs[i]+'" value=""></td>';
    }
    tt+='</tr>';
   }
  }
  tt+='<tr>';
  tt+='<td colspan="2" style="background:lightgrey;">'+trad['nouvelle_propriete_définie_manuellement']+'</td>';
  tt+='</tr>';
  tt+='<tr>';
  tt+='<td><input id="nouvellePropNom" type="text" value=""  placeholder="'+trad['entrez_un_nom']+'" /></td>';
  tt+='<td><input id="nouvellePropValeur" type="text" value=""  placeholder="'+trad['entrez_une_valeur']+'" /></td>';
  tt+='</tr>';
  
  dogid('editTree1').innerHTML='<table id="editTree1Table" border="1" style="border:1px blue solid;margin:1px;max-width:500px;width:100%;"><tr><td colspan="2" style="color:red;text-align:center;">'+idArbre+'</td></tr>'+tt+'</table>';
  
  dogid('updateTree1').setAttribute('data-idArbre' , idArbre);
  dogid('updateTree1').style.display='';
  dogid('annulerTree1').style.display='';
  dogid('reconstruireSvgEtFermer').style.display='none';
  
 }
 //========================================================================================================
 function myCallBackAction1(context,tree){
//  console.log(context);
  if(context.action.substr(0,7)==='delete|'){
  }else{
   switch(context.action){
    case 'afterReorganize' :
 //    console.log(tree , _dssvg.arbre0 );
     var newTree=[_dssvg.arbre0[0]];
     for(var i=0;i<tree.length;i++){
      newTree.push(tree[i]);
     }
     _dssvg.arbre0=newTree;
     
    break;
    
    case 'addBranch' :
 //    console.log(context,tree,_dssvg.arbre0);
    break;
    
    case 'afterFold' :
 //    console.log(tree);
    break;
    
    case 'init' :
 //    console.log(tree);
    break;
    
    case 'delete' :
 //    console.log(tree);
    break;
    
    default:
     console.warn('NON prévu : context=',context,'tree=',tree);
    break;
   }
   
  }
 }
 //========================================================================================================
 
 function _deleteFunction1(idToDelete){// if you want to delete a node
  if(!confirm(trad['Certain']+' ?')){
   return
  }
  
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id==idToDelete){
    _dssvg.arbre0.splice(i,1);
    break;
   }
  }
  
  // Here, do (ajax) database stuffs with idToDelete 
  // ......
  // and if success ...
  oMyTree1.delete(idToDelete); // ... update the tree view
 }
 //========================================================================================================
 function annulerTree1(e){
  dogid('editTree1').innerHTML='';
  dogid('reconstruireSvgEtFermer').style.display='';
  dogid('updateTree1').style.display='none';  
  dogid('annulerTree1').style.display='none';  
 }
 //========================================================================================================
 function nomProprieteValide(n){
  for(var i=0;i<n.length;i++){
   var c=n.substr(i,1);
   if(!((c>='0' && c<='9')||(c>='A' && c<='Z')||(c>='a' && c<='z')||(c==='-' || c==='_' || c===':'))){
    return false;
   }
  }
  return true;
 }
 //========================================================================================================
 function updatetree1(e){
  
  var elt=dogid(e.target.id);
  var idArbre=parseInt(elt.getAttribute('data-idarbre'),10);
  var newValues=[];
  var el=['input','textarea','td'];
  var txt='';

  var nouveauxAttributs={};  
  for(var l=0;l<el.length;l++){
   
   var lst=dogid('editTree1Table').getElementsByTagName(el[l]);
   for(var j=0;j<lst.length;j++){
    if(lst[j].getAttribute('data-attrib') && lst[j].value && lst[j].value !=''){
     if(lst[j].getAttribute('data-attrib')=='text' || lst[j].getAttribute('data-attrib')=='tspan' || lst[j].getAttribute('data-attrib')=='title'){
      txt=htm1(lst[j].value);
     }else{
      nouveauxAttributs[lst[j].getAttribute('data-attrib')]=htm1(lst[j].value);
     }
    }else if(lst[j].getAttribute('data-attrib') && lst[j].getAttribute('data-value') && lst[j].getAttribute('data-value')!=='' ){
     nouveauxAttributs[lst[j].getAttribute('data-attrib')]=htm1(lst[j].getAttribute('data-value'));
    }
   }
  }
  
  if(dogid('nouvellePropNom').value!==''){
   var nom=dogid('nouvellePropNom').value;
   if(nomProprieteValide(nom)){
    nouveauxAttributs[nom]=htm1(dogid('nouvellePropValeur').value);
   }else{
    alert('Le nom de la propriété ne coit contenir que des caractères "A...Z"  "a...z"  "0...9" "-" "_" ":" ')
    return;
   }
  }
  
//  console.log( 'nouveauxAttributs=' , nouveauxAttributs );
  
  
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id==idArbre){
    _dssvg.arbre0[i].data.attributes=JSON.parse(JSON.stringify(nouveauxAttributs));
    _dssvg.arbre0[i].data.text=txt;
    break;
   }
  }
  dogid('editTree1').innerHTML='';
  dogid('reconstruireSvgEtFermer').style.display='';
  dogid('updateTree1').style.display='none';
  dogid('annulerTree1').style.display='none';  
  
 }
 //========================================================================================================
 function ajouterGroupe(e){
  // do ajax database stuffs to get a new id and label and if success ...
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'g',
   level:0,
   type:'node',
   nodeName:'g',
   text:'',
   attributes:{'data-idarbre1':nouvelId},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
 }
 //========================================================================================================
 function ajouterDef(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'defs',
   level:0,
   type:'node',
   nodeName:'defs',
   text:'',
   attributes:{'data-idarbre1':nouvelId},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
 }
 //========================================================================================================
 function ajouterRadialGradient(e){
  var nouvelId=-1;
  var indiceDefs=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
   if(_dssvg.arbre0[i].data.nodeName==='defs'){
    indiceDefs=i;
   }
  }
  nouvelId+=1;
  if(indiceDefs<0){
   indiceDefs=nouvelId;
   var data={
    label:'defs',
    level:0,
    type:'node',
    nodeName:'defs',
    text:'',
    attributes:{'data-idarbre1':nouvelId},
    sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
   };
   
   var obj1={
    id:nouvelId,parentId:0,isOpen:1,
    data:data
   };
   _dssvg.arbre0.push(obj1);
   oMyTree1.addElement(obj1);
   nouvelId+=1;
  }
  
  var data={
   label:'radialGradient',
   level:0,
   type:'node',
   nodeName:'radialGradient',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'cx':0,'cy':0,'r':5,'id':nouvelId,'gradientTransform':'','gradientUnits':'userSpaceOnUse','xlink:href':''},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:indiceDefs,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  ajouterStop(null,{'parentId':nouvelId,'offset':0.00,'stop-color':'red'})
  ajouterStop(null,{'parentId':nouvelId,'offset':0.33,'stop-color':'green'})
  ajouterStop(null,{'parentId':nouvelId,'offset':0.66,'stop-color':'green'})
  ajouterStop(null,{'parentId':nouvelId,'offset':1.00,'stop-color':'blue'})
  
 }
 
 //========================================================================================================
 function ajouterLinearGradient(e){
  var nouvelId=-1;
  var indiceDefs=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
   if(_dssvg.arbre0[i].data.nodeName==='defs'){
    indiceDefs=i;
   }
  }
  nouvelId+=1;
  if(indiceDefs<0){
   indiceDefs=nouvelId;
   var data={
    label:'defs',
    level:0,
    type:'node',
    nodeName:'defs',
    text:'',
    attributes:{'data-idarbre1':nouvelId},
    sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
   };
   
   var obj1={
    id:nouvelId,parentId:0,isOpen:1,
    data:data
   };
   _dssvg.arbre0.push(obj1);
   oMyTree1.addElement(obj1);
   nouvelId+=1;
  }
  
  
  
  var data={
   label:'linearGradient',
   level:0,
   type:'node',
   nodeName:'linearGradient',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'x1':0,'y1':0,'x2':5,'y2':5,'id':nouvelId,'gradientTransform':'','gradientUnits':'userSpaceOnUse','xlink:href':''},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:indiceDefs,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  ajouterStop(null,{'parentId':nouvelId,'offset':0.00,'stop-color':'red'})
  ajouterStop(null,{'parentId':nouvelId,'offset':0.33,'stop-color':'green'})
  ajouterStop(null,{'parentId':nouvelId,'offset':0.66,'stop-color':'green'})
  ajouterStop(null,{'parentId':nouvelId,'offset':1.00,'stop-color':'blue'})
  
  
 }
 
 //========================================================================================================
 function ajouterPattern(e){
  var nouvelId=-1;
  var indiceDefs=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
   if(_dssvg.arbre0[i].data.nodeName==='defs'){
    indiceDefs=i;
   }
  }
  nouvelId+=1;
  if(indiceDefs<0){
   indiceDefs=nouvelId;
   var data={
    label:'defs',
    level:0,
    type:'node',
    nodeName:'defs',
    text:'',
    attributes:{'data-idarbre1':nouvelId},
    sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
   };
   
   var obj1={
    id:nouvelId,parentId:0,isOpen:1,
    data:data
   };
   _dssvg.arbre0.push(obj1);
   oMyTree1.addElement(obj1);
   nouvelId+=1;
  }
  
  
  
  var data={
   label:'pattern',
   level:0,
   type:'node',
   nodeName:'pattern',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'viewBox':'0,0,10,10','width':'10%','height':'10%'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:indiceDefs,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
  
  nouvelId+=1;
  var data={
   label:'path',
   level:0,
   type:'node',
   nodeName:'path',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId,'d':'M 0 0 L 0 5 0 10 5 0 10 10 10 5 10 0  5 10 0 0','stroke':'black','fill':'red'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:nouvelId-1,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
  
  
 }
 //========================================================================================================
 function ajouterSymbol(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  var data={
   label:'symbol',
   level:0,
   type:'node',
   nodeName:'symbol',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
  nouvelId+=1;
  
  var data={
   label:'path',
   level:1,
   type:'node',
   nodeName:'path',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'d':'M -1 -1 H 1 V 1 H -1 V -1'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:nouvelId-1,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterStop(e,par){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'stop',
   level:0,
   type:'node',
   nodeName:'stop',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'offset':(par===undefined?0:par['offset']),'stop-color':(par===undefined?0:par['stop-color'])},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:(par===undefined?0:par['parentId']),isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterFilter(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'filter',
   level:0,
   type:'node',
   nodeName:'filter',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId,'color-interpolation-filters':'sRGB'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterFeGaussianBlur(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'feGaussianBlur',
   level:0,
   type:'node',
   nodeName:'feGaussianBlur',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId,'stdDeviation':'0.5'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterImage(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'image',
   level:0,
   type:'node',
   nodeName:'image',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId,'xlink:href':'./kermit.jpg'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterTitle(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'title',
   level:0,
   type:'node',
   nodeName:'title',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'text':''},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }

 //========================================================================================================
 function insererTag(){
  var nomTag=document.getElementById('nomTag').value;
  if(nomTag!==''){
   var nouvelId=-1;
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].id>nouvelId){
     nouvelId=_dssvg.arbre0[i].id;
    }
   }
   nouvelId+=1;
   
   var data={
    label:nomTag,
    level:0,
    type:'node',
    nodeName:nomTag,
    text:'',
    attributes:{'data-idarbre1':nouvelId,'text':''},
    sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
   };
   
   var obj1={
    id:nouvelId,parentId:0,isOpen:1,
    data:data
   };
   _dssvg.arbre0.push(obj1);
   oMyTree1.addElement(obj1);
   
  }
  annulerTag();
 }
 //========================================================================================================
 function annulerTag(){
  document.getElementById('tag1').style.display='none';
 }
 //========================================================================================================
 function ajouterTag(){
  document.getElementById('tag1').style.display='';
 }
 //========================================================================================================
 function rechercherDansArbre(){
  dogid('resRechercherDansArbre').innerHTML='';
  var valeur=dogid('champRechercherDansArbre').value;
  var tabTrouves=[];
  if(valeur!==''){
   for(var i=0;i<_dssvg.arbre0.length;i++){
    var t=JSON.stringify(_dssvg.arbre0[i]);
    if(t.indexOf(valeur)>=0){
     tabTrouves.push(i);
    }
   }
   dogid('resRechercherDansArbre').innerHTML=tabTrouves.join(',');
  }
 }
 //========================================================================================================
 function popupArbo1(e){
//  console.log('ici')
  var contentOfPopup='<h3>'+trad['arbre']+'</h3>';
  contentOfPopup+='<div id="comandTop">';
  contentOfPopup+='<button id="ajouterGroupe"          class="butMenuHaut butEnabled butpopUp">+g</button>';
  contentOfPopup+='<button id="ajouterDef"             class="butMenuHaut butEnabled butpopUp">+defs</button>';
  contentOfPopup+='<button id="ajouterRadialGradient"  class="butMenuHaut butEnabled butpopUp">+radGrad</button>';
  contentOfPopup+='<button id="ajouterLinearGradient"  class="butMenuHaut butEnabled butpopUp">+linGrad</button>';
  contentOfPopup+='<button id="ajouterStop"            class="butMenuHaut butEnabled butpopUp">+stop</button>';
  contentOfPopup+='<button id="ajouterFilter"          class="butMenuHaut butEnabled butpopUp">+filter</button>';
  contentOfPopup+='<button id="ajouterFeGaussianBlur"  class="butMenuHaut butEnabled butpopUp">+feGaus</button>';
  contentOfPopup+='<button id="ajouterImage"           class="butMenuHaut butEnabled butpopUp">+image</button>';
  contentOfPopup+='<button id="ajouterTitle"           class="butMenuHaut butEnabled butpopUp">+title</button>';
  contentOfPopup+='<button id="ajouterPattern"         class="butMenuHaut butEnabled butpopUp">+pattern</button>';
  
  contentOfPopup+='<button id="ajouterSymbol"          class="butMenuHaut butEnabled butpopUp">+symbol</button>';
  contentOfPopup+='<button id="ajouterTag"             class="butMenuHaut butEnabled butpopUp bckJaune">+tag</button>';
  contentOfPopup+='<div>';
   contentOfPopup+='<input id="champRechercherDansArbre" placeholder="'+trad['rechercher']+'" style="max-width:100px;">';
   contentOfPopup+='<button id="rechercherDansArbre"    class="butMenuHaut butEnabled butpopUp bckJaune">'+trad['rechercher']+'</button>';
   contentOfPopup+='<div id="resRechercherDansArbre"    style="display:inline-block;min-width:100px;"></div>';
  contentOfPopup+='</div>';
  
  
  contentOfPopup+='</div>';
  contentOfPopup+='<div id="container1" style="max-width:85%;border:1px #000 solid;overflow-y:scroll;max-height:400px;">';
  contentOfPopup+='<div id="myTreeId1"></div>';
  contentOfPopup+='</div>';
  contentOfPopup+='<div id="editTree1"></div>';
  contentOfPopup+='<div id="tag1" style="display:none;">';
  contentOfPopup+='<table border="1" style="border:1px blue solid;margin:1px;max-width:500px;width:100%;">';
  contentOfPopup+=' <tbody>';
  contentOfPopup+='  <tr>';
  contentOfPopup+='   <td style="background:lightgrey;width:20%;">Nom du tag</td>';
  contentOfPopup+='   <td><input id="nomTag" value="" placeholder="'+trad['entrez_un_nom_de_tag_ici']+'" style="border: 2px inset rgb(238, 238, 238);  margin: 1px;  padding: 5px;width: 100%;"/></td>';
  contentOfPopup+='  </tr>';
  contentOfPopup+='  <tr>';
  contentOfPopup+='   <td colspan="2">';
  contentOfPopup+='    <button id="insererTag"             class="butMenuHaut butEnabled butpopUp bckJaune">'+trad['insérer']+'&nbsp;</button>';
  contentOfPopup+='    <button id="annulerTag"             class="butMenuHaut butEnabled butpopUp bckRouge">'+trad['annuler']+'&nbsp;</button>';
  contentOfPopup+='   </td>';
  contentOfPopup+='  </tr>';
  contentOfPopup+=' </tbody>';
  contentOfPopup+='</table>';
  contentOfPopup+='</div>';
  contentOfPopup+='<div id="comandTree1">';
  contentOfPopup+=' <button id="reconstruireSvgEtFermer"  class="butMenuHaut butEnabled">'+trad['reconstruire_le_svg_et_fermer']+'</button>';
  contentOfPopup+=' <button id="updateTree1" data-idArbre="" class="butMenuHaut butEnabled" style="display:none;">'+trad['enregistrer_la_modification']+'</button>';
  contentOfPopup+=' <button id="annulerTree1" data-idArbre="" class="butMenuHaut butEnabled" style="display:none;">'+trad['annuler']+'&nbsp;</button>';
  contentOfPopup+='</div>';

  popupValue.innerHTML=contentOfPopup;
  
  dogid('reconstruireSvgEtFermer').addEventListener('click',closePopup,'button');
  dogid('ajouterGroupe').addEventListener('click',ajouterGroupe,'button');
  dogid('ajouterDef').addEventListener('click',ajouterDef,'button');
  dogid('ajouterRadialGradient').addEventListener('click',ajouterRadialGradient,'button');
  dogid('ajouterLinearGradient').addEventListener('click',ajouterLinearGradient,'button');
  dogid('ajouterStop').addEventListener('click',ajouterStop,'button');
  dogid('ajouterFilter').addEventListener('click',ajouterFilter,'button');
  dogid('ajouterFeGaussianBlur').addEventListener('click',ajouterFeGaussianBlur,'button');
  dogid('ajouterImage').addEventListener('click',ajouterImage,'button');
  dogid('ajouterTitle').addEventListener('click',ajouterTitle,'button');
  dogid('ajouterTag').addEventListener('click',ajouterTag,'button');
  dogid('insererTag').addEventListener('click',insererTag,'button');
  dogid('ajouterSymbol').addEventListener('click',ajouterSymbol,'button');
  dogid('ajouterPattern').addEventListener('click',ajouterPattern,'button');  
  dogid('annulerTag').addEventListener('click',annulerTag,'button');
  dogid('rechercherDansArbre').addEventListener('click',rechercherDansArbre,'button');
  
  
  
  
  
  
  dogid('updateTree1').addEventListener('click',updatetree1,'button');
  dogid('annulerTree1').addEventListener('click',annulerTree1,'button');
  

  // these are the parameters you can tweek. add some if you wish ...
  var param1={
   sortOnly            : false                       , // here it is a tree, if it was a list, it would be true
   deleteFunctionName  : String(global_variable_name+'.deleteFunction1')   , // delete function name , see under , '' if no delete
   editFunctionName    : String(global_variable_name+'.editFunction1')     , // edit function name , see under , '' if no edit
   foldFunctionName    : String(global_variable_name+'.foldFunction1')     , // edit function name , see under , '' if no edit
   editButton          : true                        , // edit button ? true / false
   hideIdAfterLabel    : false                       , // true = one can't see the (id) of each element
   design              : {
   
    buttonsBorderWidthInPx      : parseInt('1px',10),   // default : 1px
    elementHeightInPx           : parseInt('35px',10),  // default and minimum advise : 35px
    elementBorderHeightInPx     : parseInt('1px',10),   // default : 1px
   
    branchesLeftOffsetInPixels  : parseInt('12px',10),  // default : 12px
    
    voidHeightInPixels          : parseInt('20px',10),  // default : 15px
    intervalHeightInPixels      : parseInt('1px',10),  // default : 15px
    intervalBorderNameStyle     : String('solid'),      // default : solid
    intervalBorderHeight        : parseInt('1px',10),   // default : 1px // should be 0 or 1 px but you can put nnnpx if you want !
    intervalBorderColor         : String('#eee'),       // default : #eee
    thinBorderColor             : String('blue'),       // default : blue   or  globalCssSettings1.main.thinBorderColor.hexValue            if it exists
    editBackground              : String('red'),        // default : red    or  globalCssSettings1.backgrounds.editBackground.hexValue      if it exists
    successBackgroundColor      : String('green'),      // default : green  or  globalCssSettings1.backgrounds.successBackground.hexValue   if it exists
    headerBackgroundColor       : String('yellow'),     // default : yellow or  globalCssSettings1.table.headerBackgroundColor.hexValue     if it exists
    
   }
  }
  if(_dssvg.arbre0.length==0){
   _dssvg.arbre0[0]={id:0,parentId:-1,isOpen:1,data:{label:'svg',level:-1,type:'root',nodeName:'@root',text:'',attributes:{},sizes:{minx:null,miny:null,maxx:null,maxy:null}}}
  }
  // then call the building of the tree with 
  oMyTree1=new cMyTree1(
   'oMyTree1',  // this self object name
   'myTreeId1', // the id of the html < div > you want to fill
   _dssvg.arbre0,   // the data
   param1,      // the parameters
   myCallBackAction1 // ==== MUST ==== exist callback function name
  );
  showPopUp('popupArbo1');
 }
 //========================================================================================================
 function zoomWheelSvg(e){
//  console.log('e=',e)
  if(e.deltaY<0){
   zoomPlusMoins(2);
  }else{
   zoomPlusMoins(0.5);
  }
 }
 //========================================================================================================
 function menuTopWheel(e){
  if(e.deltaY<0){
   divtpe.scrollTo(divtpe.scrollLeft+10,0);
  }else{
   divtpe.scrollTo(divtpe.scrollLeft-10,0);
  }
 }

 // ===========
 // colorPicker
 // ===========


 //========================================================================================================
 var timerLongClick=null;
 var tempsSuperieurA300=false;
 var movingButton={initX:0,initY:0,isMoving:false};
 var ecranCouleursAffiche=false;
 //========================================================================================================
 
 //========================================================================================================
 function startStrokeStyleColor(e){
  movingButton.isMoving=false;
  if(e.touches){
   e=e.touches[0];
  }
  movingButton.initX=e.clientX;
  movingButton.initY=e.clientY;
  tempsSuperieurA300=false;
  timerLongClick=setTimeout( function(){
   tempsSuperieurA300=true;
   if(movingButton.isMoving===false){
//    console.log(e);
    e.target.style.borderColor='red';
   }
  } , 300);
 }
 
 //========================================================================================================
 function _callBackColorPicker(e){
  
  var absColor=dogid('colorInput').value;
  if(absColor==='transp' || absColor=='rgba(0, 0, 0, 0.00)'){
   colorPickerData.value='transparent';
  }else{
   if(absColor.toLowerCase().substr(0,5)=='rgba('){
    colorPickerData.value=absColor.toLowerCase();
   }else{
    var thecolor=dogid('colorValueChosen').value;
    var shortColor=thecolor.substr(0,1)=='#'?thecolor.substr(1):thecolor;
    for(var numColWeb=0;numColWeb<tabWebCol0.length ;numColWeb++){
     if(tabWebCol0[numColWeb][0].length>6){
  //    console.log( tabWebCol0[numColWeb][0]  , tabWebCol0[numColWeb][0].substr(0,6).toLowerCase() , shortColor.toLowerCase() );
      if(tabWebCol0[numColWeb][0].substr(0,6).toLowerCase()==shortColor.toLowerCase()){
       thecolor=tabWebCol0[numColWeb][0].substr(6).toLowerCase();
       break;
      }
     }
    }
    colorPickerData.value=thecolor;
   }
  }
  
  
  
  if(colorPickerData.context=='strokeElement'){
//   console.log('dans _callBackColorPicker, colorPickerData=',colorPickerData);    // {value: 'red', id: null, context: 'strokeElement', opac: 1, numArbre: 1}
   majPropArbre(colorPickerData.numArbre , 'stroke' , colorPickerData.value );
  }
  if(colorPickerData.context=='fillElement'){
//   console.log('dans _callBackColorPicker, colorPickerData=',colorPickerData);    // {value: 'red', id: null, context: 'strokeElement', opac: 1, numArbre: 1}
   majPropArbre(colorPickerData.numArbre , 'fill' , colorPickerData.value );
  }
  

  if(colorPickerData.context=='setStrokeStylColor'){
   dogid(colorPickerData.id).style.color=colorPickerData.value;
   _dssvg.strokeColor1=colorPickerData.value;
   
   // mettre à jour _dssvg.strokCols
   var indiceTab=parseInt(colorPickerData.id.replace('setStrokeStylColor1_',''),10);
   _dssvg.strokCols[indiceTab]=colorPickerData.value;
/*   
   if(false && indiceObjSelect1>=0){
    draw_state.elementsToDraw2[indiceObjSelect1].strokeColor1=colorPickerData.value;
   }
*/   
   saveStte();
   highliteStrokeStyle();
  }
  if(colorPickerData.context=='setFillStylColor'){
   dogid(colorPickerData.id).style.color=colorPickerData.value;
   draw_state.fillStyle1=colorPickerData.value;
/*   
   if(false && indiceObjSelect1>=0){
    draw_state.elementsToDraw2[indiceObjSelect1].fillStyle1=colorPickerData.value;
   }
*/   
   saveStte();
  }
//  console.log('indiceObjSelect1='+indiceObjSelect1)
  
  
  closePopup();
 }
 
 
 function touchMoveButton(e){
//  console.log(e.touches[0] , movingButton)
  if(Math.abs(e.touches[0].clientX-movingButton.initX)>=2 || Math.abs(e.touches[0].clientY-movingButton.initY)>=2){

   movingButton.isMoving=true;
  }
 }
 
 //========================================================================================================
 function rgb2hex(rgb){
  var ret=rgb;
  if (/^#[0-9A-F]{6}$/i.test(rgb)){
   return rgb;
  }
  try{
   rgb=rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
   ret="#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }catch(e){}
  return ret;
 } 
 //========================================================================================================
 function RGBAToHexA(rgba) {
  let sep = rgba.indexOf(",") > -1 ? "," : " "; 
  rgba = rgba.substr(5).split(")")[0].split(sep);
                
  // Strip the slash if using space-separated syntax
  if (rgba.indexOf("/") > -1)
    rgba.splice(3,1);

  for (let R in rgba) {
    let r = rgba[R];
    if (r.indexOf("%") > -1) {
      let p = r.substr(0,r.length - 1) / 100;

      if (R < 3) {
        rgba[R] = Math.round(p * 255);
      } else {
        rgba[R] = p;
      }
    }
  }
  let r = (+rgba[0]).toString(16),
      g = (+rgba[1]).toString(16),
      b = (+rgba[2]).toString(16),
      a = Math.round(+rgba[3] * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;
  var ret='#' + r + g + b + a;
//  console.log(ret);
  return ret;
   
 }
 
 //========================================================================================================
 function _selColor1(c){
//  console.log(c);
  dogid('colorInput').value=c.substr(0,6);
  if(c==='transparent'){
   kellyColor1.setColor('rgba(0,0,0,0)');
  }else{
   kellyColor1.setColor(dogid('colorInput').value);
  }

  if(c.length>6){
   if(c==='transparent'){
    dogid('colorName').innerHTML=c;
   }else{
    dogid('colorName').innerHTML=c.substr(6);
   }
  }else{
   dogid('colorName').innerHTML='';
  }
 }
 
 
 //========================================================================================================
 function popupCouleurs(e){
  var t='';
  
  var bodySize=body.getBoundingClientRect();
  var w1=(bodySize.width-2*marginPopup)+'px'; 
  var h1=(yscreen-2*marginPopup)+'px'; 

  
  var largeurCanvas=parseInt(w1,10)-20;
  if(largeurCanvas>360){
   largeurCanvas=360;
  }
  var largeur=parseInt(w1,10)-20;
  if(largeur>600){
   largeur=600;
  }
  var hauteurCanvas=largeurCanvas-24;
  
  
  
  
  
  t+='<div id="zoneInput" style="border:1px red solid;margin:0 auto;position:fixed;top:'+(marginPopup+2)+';left:'+(marginPopup+2)+'px;width:'+(parseInt(w1,10)-2)+'px;background:#e8eef2;z-index:102;">';
  t+= '<input type="text" size="7" id="colorInput" style="max-width:73px;font-family:monospace;" value=""/>';
  t+= '<button id="copyColor" class="cmdbtn" style="lin-width:18px;min-height:24px;">⇦</button>';
  t+= '<input type="text" size="7" maxlength="7" id="colorValueChosen" disabled style="max-width:80px;font-size:0.8em;max-width:61px;font-family:monospace;" />';
  t+= '<button class="cmdbtn cmdbtnup" id="chooseColor" style="font-size: 1em;background:yellow;margin-left:0;width:2.6em;border:2px outset white;" >✅</button>'; // LightGoldenRodYellow
  t+= '<span id="colorName" style="font-size:0.8em;" ></span>'; // LightGoldenRodYellow
  t+='</div>';
  t+='<div style="border:1px red solid;width:'+(largeurCanvas+2)+'px;height:'+(hauteurCanvas+2)+'px;margin:35px auto 0 auto;">';
  t+=' <canvas id="colPick1" width="'+largeurCanvas+'" height="'+hauteurCanvas+'" style="width:'+largeurCanvas+'px;height:'+hauteurCanvas+'px;"></canvas>';
  t+='</div>';

//  button_size:35,
//  border_button_size:1,

  var countCouleursUtilisees=0;
  var largeurBtns=wi_of_the_menulft-2*wi_of_the_brds1-globalScrollWidth1;
  var nbCoulParLigne=Math.round((largeur-2)/(largeurBtns));
  var count1=0;
  var breakDone=false;
  var border1='border:1px white outset;padding:0;height:'+(largeurBtns)+'px;width:'+(largeurBtns)+'px;';
  
  
/*  
  if(false){ // affichage des couleurs actuellement utilisées
   t+='<table cellpadding="0" cellspacing="0" summary="" style=" border:1px blue solid;margin:0 auto;">';
   t+='<tr><td><span>Used</span></td></tr>';
   var colsTab=[];
   var colVal='';
   var trouve=false;
   var trouve2=false;
   var eltList=['strokeColor1','fillStyle1'];
   for(var elt in eltList){
    for(var i=0;i<draw_state.elementsToDraw2.length;i++){
     colVal=draw_state.elementsToDraw2[i][eltList[elt]];
     trouve=false;
     for(var j=0;j<colsTab.length;j++){
      if(colsTab[j].colVal==colVal){
       trouve=true;
       trouve2=false;
       for(var k=0;k<colsTab[j].objList.length;k++){
        if(colsTab[j].objList[k]==i){
         trouve2=true;
         break;
        }
       }
       if(trouve2===false){
        colsTab[j].objList.push(i);
       }
       
       break;
      }
     }
     if(trouve===false){
      colsTab.push({colVal:colVal,objList:[i]})
     }
    }
   }
 //  console.log('colsTab=',colsTab);
   for(var i=0;i<colsTab.length;i++){
    t+='<tr>';
    
    t+='<td style="vertical-align:middle;border:1px blue solid;padding:2px;">';
    t+=''+colsTab[i].colVal;
    t+='</td>';

    t+='<td style="vertical-align:middle;border:1px blue solid;padding:2px;">';
    t+='<div style="display:inline-block;'+border1+'background:'+colsTab[i].colVal+';"></div>';
    t+='</td>';

    t+='<td style="vertical-align:middle;border:1px blue solid;padding:2px;">';
    for(var j=0;j<colsTab[i].objList.length;j++){
     t+=' <button style="margin-top:-4px;" id="countObj_'+countCouleursUtilisees+'" data-obj="'+colsTab[i].objList[j]+'" class="cmdbtn cmdbtnleft">'+colsTab[i].objList[j]+'</button>';
     countCouleursUtilisees++;
    }
    t+='</td>';

    t+='</tr>';
    
   }
   t+='</table>';
  } // fin des couleurs actuellement utilisées
*/  
  
  t+='<table cellpadding="0" cellspacing="0" summary="" style=" border:1px blue solid;margin:0 auto;">';
  t+='<tr><td colspan="'+nbCoulParLigne+'"><span>WEB named</span><button class="butEnabled butMenuHaut" style="margin-left: 10px;" onclick="'+global_variable_name+'.selColor1(\'transparent\')">transparent</button></td></tr>';
  for(var j=0;j<tabWebCol0.length;j++){
   if((count1%nbCoulParLigne)==0){
    t+='<tr>';
   }
   t+='<td id="tab_'+tabWebCol0[j][0]+'"';
   t+=' style="color:'+tabWebCol0[j][1][2]+';background-color:#'+tabWebCol0[j][0].substr(0,6)+';'+border1+'"';
   t+=' onclick="'+global_variable_name+'.selColor1(\''+tabWebCol0[j][0]+'\')" ></td>'; //  //   onmouseout="show(\''.$k1.'\')"
   count1++;
   if(count1==140 && breakDone===false){
    breakDone=true;
    t+='</tr><tr><td colspan="'+nbCoulParLigne+'"><span>WEB not named</span></td></tr>';
//    nbCoulParLigne=6;
    count1=0;
   }else{
    if(((count1)%nbCoulParLigne)==0){
     t+='</tr>';
    }
   }
  } 
  t+='</table>';
  
  count1=0;
  t+='<table cellpadding="0" cellspacing="0" summary="" style=" border:1px blue solid;margin:0 auto;">';
  var famillePrec='';
  var famille='';
  for(j=0;j<tabMaterial.length;j++){
   famille=tabMaterial[j][0];
   if(famille!=famillePrec){
    if(j>0){ 
     t+='</tr>';
    }
    t+='<tr>';
    t+='<td style="font-size:0.8em;width:90px;">';
    t+=famille;
    t+='</td>';
    famillePrec=famille;
   }
   border1='border:1px white outset;padding:0;height:18px;width:18px;';
   t+='<td style="background-color:'+tabMaterial[j][2]+';'+border1+'"';
   t+=' onclick="'+global_variable_name+'.selColor1(\''+tabMaterial[j][2].substr(1)+'\')" ';
   t+=' title="'+tabMaterial[j][0]+' '+tabMaterial[j][1]+'" ';
   t+=' ></td>'; //  // onmouseout="show(\''.$k1.'\')"
   count1++;
  } 
  t+='</tr>';
  t+='</table>';
  
  popupValue.innerHTML=t;

  showPopUp('popupCouleurs')  ;;

  var initColor=colorPickerData.value;
//  console.log('trfa',(colorPickerData.value.substr(0,1) == '#' && colorPickerData.value.substr(1)>='000000' ))// && colorPickerData.value.substr(1)<='FFFFFF'));
  if(initColor.substr(0,1) == '#' && initColor.substr(1).toUpperCase()>='000000'&&initColor.substr(1).toUpperCase()<='FFFFFF'){
   initColor=initColor.substr(1);
   dogid('chooseColor').style.background=initColor;
   dogid('colorValueChosen').value      =initColor;
   dogid('colorInput').value            =initColor;
  }else{
   var trouve=false;
   for(var numColWeb=0;numColWeb<tabWebCol0.length && trouve==false ;numColWeb++){
    if(tabWebCol0[numColWeb][0].length>6){
     if(tabWebCol0[numColWeb][0].substr(6).toLowerCase()==initColor.toLowerCase()){
      initColor=tabWebCol0[numColWeb][0].substr(0,6);
      dogid('colorName').innerHTML=tabWebCol0[numColWeb][0].substr(6);
      dogid('chooseColor').style.background=tabWebCol0[numColWeb][0].substr(6);
      dogid('colorValueChosen').value='#'+initColor;
      dogid('colorInput').value='#'+initColor;
      trouve=true;
     }
    }
   }
   if(trouve==false){ 
    initColor=colorPickerData.value;
    dogid('chooseColor').style.background=colorPickerData.value;
    dogid('colorInput').value=initColor;
    dogid('colorValueChosen').value=initColor;
   }
  }
  kellyColor1=new KellyColorPicker({
   place       : 'colPick1', 
   size        : hauteurCanvas, 
   input       : 'colorInput',  
   inputColor  : false,
   alphaSlider : true,
   userEvents : { 
    change : function(handler) {
     var c=handler.getCurColorHex().substr(1).toUpperCase();
//     console.log('change',handler.getCurColorHex() , c  ); 
//     dogid('chooseColor').style.display='none';
     if(c>='000000' && c <= 'FFFFFF'){
      dogid('colorName').innerHTML='';
      dogid('chooseColor').style.background='#'+c;
      dogid('colorValueChosen').value='#'+c.toUpperCase();
     }
     
    },
   }   
  });


  dogid('chooseColor').addEventListener('click',_callBackColorPicker , 'button');
  dogid('copyColor').addEventListener('click',copyColor , 'button');
  
  for(var i=0;i<countCouleursUtilisees;i++){
   dogid('countObj_'+i).addEventListener('click',selectObjFromColor , 'button');
  }
  setTimeout(  
   function(){
    if(colorPickerData.value.indexOf('rgb')<0){
     dogid('colorName').innerHTML=colorPickerData.value;
    }
   },500
  );
   
  
  

 }

 //========================================================================================================
 function setPickerForColor(cont,e){
  
//  console.log('clickdroit',e);
  colorPickerData.context=cont;
  colorPickerData.id=e.target.id;
  var colorButton=dogid(e.target.id).style.color;
  if(colorButton.substr(0,4)=='rgb('){
   var cols=colorButton.substr(4).replace(/\)/,'').split(',');
   var txt='rgba('+cols[0]+','+cols[1]+','+cols[2]+',1)';
   var val=RGBAToHexA(txt);
   colorPickerData.value=colorButton; //val.substr(0,7);
   colorPickerData.opac=1;
  }else if(colorButton.substr(0,5)=='rgba('){
   var cols=colorButton.substr(4).replace(/\)/,'').split(',');
   var txt='rgba('+cols[0]+','+cols[1]+','+cols[2]+','+cols[3]+')';
   var val=RGBAToHexA(txt);
   colorPickerData.value=colorButton; //val.substr(0,7);
//   colorPickerData.opac=cols[3];
  }else{
   colorPickerData.opac=1;
   var value = rgb2hex(dogid(e.target.id).style.color);
   if(value===null){
    colorPickerData.value='#ff00ff';
   }else{
    colorPickerData.value=value;
   }
  }
//  console.log('colorPickerData=',colorPickerData);
  popupCouleurs(e);
 }
 
 //========================================================================================================
 function highliteStrokeStyle(e){
  var elt=null;
/*  
  var elt=dogid('strostyl_transp');
  if(_dssvg.strokeColor1=='transparent'){
   elt.style.background=bckVert1;
   elt.style.borderStyle='inset';
  }else{
   elt.style.background='';
   elt.style.borderStyle='';
  }
*/  
  for(var i=0;i<_dssvg.strokCols.length;i++){
   elt=dogid('setStrokeStylColor1_'+i);
   elt.style.borderColor='';
   if(_dssvg.strokeColor1==elt.style.color){
    elt.style.background=bckVert1;
    elt.style.borderStyle='inset';
   }else{
    elt.style.background='';
    elt.style.borderStyle='';
   }
  }
 }
 //========================================================================================================
 function setStrokeStyle(e){
  if(e!==null){
//   console.log(e);
   if(e.target.id=='strostyl_transp' || e.target.parentElement.id=='strostyl_transp'){
    _dssvg.strokeColor1='transparent';
   }else{
    _dssvg.strokeColor1='black';
    for(var i=0;i<_dssvg.strokCols.length;i++){
     if(buttons[i].id==e.target.id){
      _dssvg.strokeColor1=dogid(e.target.id).style.color;
      break;
     }
    }
   }
  }
 
//  if(false){ //indiceObjSelect1!=-1){
//   _dssvg.elementsToDraw2[indiceObjSelect1].strokeColor1=draw_state.strokeColor1;
//  }
  
  highliteStrokeStyle();
  saveStte();
 } 
 //========================================================================================================
 function useColor(e){
//  console.log('use color ',e,colorPickerData);
  if(e.target.id.indexOf('setStrokeStylColor')>=0){
   _dssvg.strokeColor1=dogid(e.target.id).style.color;
   highliteStrokeStyle();
  }else if(e.target.id.indexOf('setFillStylColor2')>=0){
   draw_state.fillStyle1=dogid(e.target.id).style.color;
   highliteFillStyle();
  }
/*
  if(false ){ // && indiceObjSelect1>=0
   if(e.target.id.indexOf('setStrokeStylColor')>=0){
    _dssvg.strokeColor1=dogid(e.target.id).style.color;
    _dssvg.elementsToDraw2[indiceObjSelect1].strokeColor1=draw_state.strokeColor1;
    highliteStrokeStyle();
   }else if(e.target.id.indexOf('setFillStylColor2')>=0){
    _dssvg.fillStyle1=dogid(e.target.id).style.color;
    _dssvg.elementsToDraw2[indiceObjSelect1].fillStyle1=draw_state.fillStyle1;
    highliteFillStyle();
   }
  }
*/  
  saveStte();
 }

 //========================================================================================================
 function setStrokeStylColor(e){
//  console.log(e);
  if(e.cancelable){e.preventDefault();}
  e.stopPropagation();
  if(movingButton.isMoving===false){
   if(e.button==2){ // rightClick
    setPickerForColor('setStrokeStylColor',e);
   }else{
    if(tempsSuperieurA300===true){
     setPickerForColor('setStrokeStylColor',e);
    }else{
     useColor(e);
    }
   }
  }
  tempsSuperieurA300=false;
 }
 
 //========================================================================================================
 function clickDownDivLag2(e){
  e.stopPropagation();
//  console.log('e=',e.target,e.target.nodeName)
  if(e.target.nodeName.toLowerCase()==='button'){
   var action=e.target.getAttribute('data-action');
   if(action){
    // suppAttribGraDuGroupe1
    traiterAction(action);
   }
  }
  return;
 }
 //========================================================================================================
 function init(){
  var ver=document.getElementById('mscr').src;
  ver=ver.substr(ver.indexOf('?v=')+3);
  var scr=document.createElement('script');
  scr.type='text/javascript';
  scr.onload=function(){
   
   if(navigator.language.toLowerCase().indexOf('fr')>=0){
    lang='fr';
    setTrad_fr();
   }else{
    lang='en';
    setTrad_en();
   }
//   setTrad_en();    console.log('trad=',trad);
   init0(lang);
  }
  scr.src='trad.js?v='+ver;
  body.appendChild(scr);
  
 }
 //========================================================================================================
 function init0(lang){
//  console.log('init début');
  
  var draw_stateTxt=localStorage.getItem('_dssvg');
  if(draw_stateTxt!==null){
   try{
    var jsonDs=JSON.parse(draw_stateTxt);
    if(jsonDs.hasOwnProperty('parametres')){
     for(var n in _dssvg.parametres){
      if(jsonDs.parametres.hasOwnProperty(n)){
       _dssvg.parametres[n]=jsonDs.parametres[n];
       if('lang'===n){
        if(lang!==jsonDs.parametres.lang){
         if(jsonDs.parametres.lang==='fr'){
          setTrad_fr();
         }else{
          setTrad_en();
         }
        }
       }
      }
     }
    }
   }catch(e1){
   }
  }
//  console.log('_dssvg.parametres=' , _dssvg.parametres );
  getScrollWidth();
  redrawCss();
  _dssvg.parametres.scroll_size=globalScrollWidth1;
  he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
  wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
  
//  console.log('globalScrollWidth1=',globalScrollWidth1);
  
  
  
  divc1=document.createElement('div');
  divc1.id='divc1';
  divc1.style.position='absolute';
  body.appendChild(divc1);
  
  
  refZnDessin=document.createElementNS(xmlns,'svg');
  refZnDessin.setAttribute('id','refZnDessin');
  refZnDessin.setAttribute('transform','rotate(0 0 0)'); // rotate(3
  refZnDessin.style.border='0px blue solid';
  refZnDessin.style.position='relative';
  refZnDessin.style.background='transparent'; //'#def2ff';
  divc1.appendChild(refZnDessin);
  refZnDessin.addEventListenerBase('wheel', zoomWheelSvg);  

  refZnDessin.addEventListenerBase( 'mousedown', mouseDownZoneDessin , false );
  refZnDessin.addEventListenerBase('mousemove', mouseMoveZoneDessin , false );
  window.addEventListenerBase('mouseup'  , mouseUpFenetre   , false );
  
  
  refZnDessin.addEventListenerBase( 'touchstart', touchDownZoneDessin , false );
  refZnDessin.addEventListenerBase('touchmove', touchMoveZoneDessin , false );
  window.addEventListenerBase('touchend'  , touchUpFenetre   , false );
  groupeActif.refGroupe=refZnDessin;
  
  divtpe=document.createElement('div');
  divtpe.id='divtpe';
  body.appendChild(divtpe);
  divtpe.addEventListenerBase('wheel', menuTopWheel);  
  
  divlft=document.createElement('div');
  divlft.id='divlft';
  body.appendChild(divlft);  
  
  
  divlag1=document.createElement('div');
  divlag1.id='divlag1';
  divlag1.style.position='absolute';
  body.appendChild(divlag1);  

  divlag2=document.createElement('div');
  divlag2.id='divlag2';
  divlag2.style.position='absolute';
  body.appendChild(divlag2);  
  divlag2.addEventListenerBase( 'click' , clickDownDivLag2 , false );



  
  var boutons=[
   // =================== MENU GAUCHE =====================  
  {id:'popupArbo1'                , position:'menuGauche' , libelle:trad['arbre']                               , action:popupArbo1                  , svg:'<svg class="svgBoutonGauche1" viewBox="-2 1  34.8828 36.5"><text x="-2" y="29" style="font-size:30px;stroke-width:1.21;stroke:black;fill:black;stroke-opacity:1;fill-opacity:1;">🌲</text></svg>'},
  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;'},
  {id:'popupForme1'               , position:'menuGauche' , libelle:trad['selection']                           , action:popupForme1                 , svg:svgEtoile},
  {id:'setModeSaisieChemin1'      , position:'menuGauche' , libelle:trad['chemin']                              , action:setModeSaisieChemin1        , svg:'<svg class="svgBoutonGauche1" viewBox="-27 -18  52 41"><path stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent" d=" M -26 -17 C -18 -14 -11 -5 -15 2 C -20 13 -7 17 -1 17  C 5 17 10 15 13 10 C 15 5 16 2 12 -4 C 5 -13 19 -13 19 -13"></path></svg>'},
  
  {id:'setModeSaisieDeplace1'     , position:'menuGauche' , libelle:trad['deplacer']                            , action:setModeSaisieDeplace1       , svg:'<svg class="svgBoutonGauche1" viewBox="-2 -1.25  54.80 38.75"><text x="19" y="31" font-family="Verdana" style="font-size:36px;stroke:red;fill:yellow;stroke-width:1;stroke-opacity:1;fill-opacity:1;">⇲</text><text x="-2" y="25" stroke="red" font-family="Verdana" style="font-size:36px;stroke-width:1;stroke:red;fill:yellow;stroke-opacity:1;fill-opacity:1;">⇱</text></svg>'},

  {id:'setModeSaisieSelElt1'      , position:'menuGauche' , libelle:trad['selelts']                             , action:setModeSaisieSelElt1        , svg:'<svg class="svgBoutonGauche1" viewBox="-5.5 -5.5  25 26"><rect x="0" y="0" width="13" height="14" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="0" cy="0" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle><circle cx="13" cy="14" r="3.5" stroke="green" stroke-width="3" fill="transparent"></circle></svg>'},
  {id:'setModeSaisieEditionPoin1' , position:'menuGauche' , libelle:trad['selptselts']                          , action:setModeSaisieEditionPoin1   , svg:'<svg class="svgBoutonGauche1" viewBox="-12.5 13.5  34 29"><path stroke="black" stroke-width="3" fill="transparent" d=" M -7 18 C -4 37 11 40 16 22 "></path><circle cx="10" cy="36" r="3.5" stroke="blue" stroke-width="2" fill="green"></circle><circle cx="-7" cy="19" r="3.5" stroke="red" stroke-width="2" fill="pink"></circle><circle cx="-4" cy="37" r="3.5" stroke="green" stroke-width="2" fill="blue"></circle><circle cx="16" cy="23" r="3.5" stroke="red" stroke-width="2" fill="pink"></circle><path d="M -7,19 L -4,36" stroke="rgb(0, 0, 255)" stroke-width="1" fill="transparent"></path><path d="M 16,23 L 10,36" stroke="rgb(0, 255, 0)" stroke-width="1" fill="transparent"></path></svg>'},
  {id:'setModeSaisieTranE1'       , position:'menuGauche' , libelle:trad['seltranselts']                        , action:setModeSaisieTranE1         , svg:'<svg class="svgBoutonGauche1" viewBox="-9 -9  35 36"><rect x="0" y="0" width="13" height="14" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="0" cy="0" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle><path stroke="green" stroke-width="3" fill="transparent" d=" M 18 0 L 23 -7 L 13 -7 L 18 0 C 18 14 10 19 0 19  L -7 24 L -7 14 L 0 19"></path></svg>'},
  {id:'setModeSaisieGroupe1'      , position:'menuGauche' , libelle:trad['selgrps']                             , action:setModeSaisieGroupe1        , svg:'<svg class="svgBoutonGauche1" viewBox="-18.5 -9.5  46.5 46.5"><rect x="0" y="0" width="13" height="13" stroke="red" stroke-width="3" fill="transparent" transform="rotate(45 0 0 ) "></rect><rect x="7" y="15" width="13" height="14" stroke="red" stroke-width="3" fill="transparent" transform="rotate(0 0 0 ) "></rect><rect x="-13" y="-4" width="36" height="36" stroke="gold" stroke-width="3" fill="transparent"></rect><circle cx="-13" cy="-4" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle></svg>'},

  {id:'setZoomPlus1'              , position:'menuGauche' , libelle:'zoom+'                                     , action:setZoomPlus1                , svg:'<svg class="svgBoutonGauche1" viewBox="0 0.75  53.55078125 49.5"><text x="0" y="40" style="font-size:39px;stroke-width:1.55;stroke:black;fill:blue;stroke-opacity:1;fill-opacity:1;">🔍</text><polygon points=" 18 12  18 18  12 18  12 22  18 22  18 28  22 28  22 22  28 22  28 18  22 18  22 12 " stroke="red" stroke-width="2" fill="yellow"></polygon></svg>'},
  {id:'setZoomMoins1'             , position:'menuGauche' , libelle:'zoom-'                                     , action:setZoomMoins1               , svg:'<svg class="svgBoutonGauche1" viewBox="0 0.75  53.55078125 49.5"><text x="0" y="40" style="font-size:39px;stroke-width:1.55;stroke:black;fill:blue;stroke-opacity:1;fill-opacity:1;">🔍</text><polygon points=" 18 18  18 18  12 18  12 22  18 22  18 22  22 22  22 22  28 22  28 18  22 18  22 18 " stroke="red" stroke-width="2" fill="yellow"></polygon></svg>'},

  {id:'setModeSaisieDefsElt1'     , position:'menuGauche' , libelle:trad['seleltsdefs']                         , action:setModeSaisieDefsElt1       , svg:'<svg class="svgBoutonGauche1" viewBox="-5.5 -5.5  25 26"><rect x="0" y="0" width="13" height="14" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="0" cy="0" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle><circle cx="13" cy="14" r="3.5" stroke="green" stroke-width="3" fill="transparent"></circle></svg>' },
  {id:'setModeSaisieDefsPtE1'     , position:'menuGauche' , libelle:trad['selptseltsdefs']                      , action:setModeSaisieDefsPtE1       , svg:'<svg class="svgBoutonGauche1" viewBox="-12.5 13.5  34 29"><path stroke="black" stroke-width="3" fill="transparent" d=" M -7 18 C -4 37 11 40 16 22 "></path><circle cx="10" cy="36" r="3.5" stroke="blue" stroke-width="2" fill="green"></circle><circle cx="-7" cy="19" r="3.5" stroke="red" stroke-width="2" fill="pink"></circle><circle cx="-4" cy="37" r="3.5" stroke="green" stroke-width="2" fill="blue"></circle><circle cx="16" cy="23" r="3.5" stroke="red" stroke-width="2" fill="pink"></circle><path d="M -7,19 L -4,36" stroke="rgb(0, 0, 255)" stroke-width="1" fill="transparent"></path><path d="M 16,23 L 10,36" stroke="rgb(0, 255, 0)" stroke-width="1" fill="transparent"></path></svg>'},
  {id:'setModeSaisieDefsTrE1'     , position:'menuGauche' , libelle:trad['seltranseltsdefs']                    , action:setModeSaisieDefsTrE1       , svg:'<svg class="svgBoutonGauche1" viewBox="-9 -9  35 36"><rect x="0" y="0" width="13" height="14" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="0" cy="0" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle><path stroke="green" stroke-width="3" fill="transparent" d=" M 18 0 L 23 -7 L 13 -7 L 18 0 C 18 14 10 19 0 19  L -7 24 L -7 14 L 0 19"></path></svg>' },
  {id:'setModeSaisieDefsGrp1'     , position:'menuGauche' , libelle:trad['selgrpsdefs']                         , action:setModeSaisieDefsGrp1       , svg:'<svg class="svgBoutonGauche1" viewBox="-18.5 -9.5  46.5 46.5"><rect x="0" y="0" width="13" height="13" stroke="blue" stroke-width="3" fill="transparent" transform="rotate(45 0 0 ) "></rect><rect x="7" y="15" width="13" height="14" stroke="blue" stroke-width="3" fill="transparent" transform="rotate(0 0 0 ) "></rect><rect x="-13" y="-4" width="36" height="36" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="-13" cy="-4" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle></svg>' },
  
//  {id:'strostyl_transp'           , position:'menuGauche' , contenu:'✎Tr'  , libelle:'trait transparent'                          , func : setStrokeStyle             }, //, svg:'svgstroketransparent' ,color:'transparent' , cssText:'color:black;font-size:1em;max-height:23px;min-height:23px;padding-left:4px;' },  
  
  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;'},

  {id:'aimanterPixel1'            , position:'menuGauche' , libelle:trad['aimpix']                              , action:aimanterPixel1              , contenu:'px' },
  {id:'popupParametres1'          , position:'menuGauche' , libelle:trad['gerpar']                              , action:popupParametres1            , svg:'<svg class="svgBoutonGauche1" viewBox="3.5 4.5  94 91.5"><g id="cog1"><path stroke="blue" stroke-width="2" fill-opacity="1" fill="blue" d="M50.5 5.5 L 44.63 5.88 L 42.74 21.52 L 39.02 22.78 L 35.5 24.52 L 23.11 14.8 L 18.68 18.68 L 14.8 23.11 L 24.52 35.5 L 22.78 39.02 L 21.52 42.74 L 5.88 44.63 L 5.5 50.5 L 5.88 56.37 L 21.52 58.26 L 22.78 61.98 L 24.52 65.5 L 14.8 77.89 L 18.68 82.32 L 23.11 86.2 L 35.5 76.48 L 39.02 78.22 L 40.93 73.6A 25 25 0 1 1 60.07 73.6 L 61.98 78.22 L 65.5 76.48 L 77.89 86.2 L 82.32 82.32 L 86.2 77.89 L 76.48 65.5 L 78.22 61.98 L 79.48 58.26 L 95.12 56.37 L 95.5 50.5 L 95.12 44.63 L 79.48 42.74 L 78.22 39.02 L 76.48 35.5 L 86.2 23.11 L 82.32 18.68 L 77.89 14.8 L 65.5 24.52 L 61.98 22.78 L 58.26 21.52 L 56.37 5.88 L 50.5 5.5 Z"></path><path stroke="green" stroke-width="2" fill-opacity="1" fill="green" d="M 38 46 L 38 38 C 78 28, 72 63, 54 69 L 54 77 L 46.5 77 L 46.5 65 C 62 64, 70 34, 38 46 Z"></path><path stroke="green" stroke-width="2" fill-opacity="1" fill="green" d="M 46.5 82 L 46.5 90 L 54 90 L 54 82 Z"></path></g></svg>'},

  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;' },

  {id:'suppTout'                  , position:'menuGauche' , libelle:trad['supp_et_recharge']                    , action:suppTout                    , contenu:'×'    , class:'butEnabled butMenuGauche bckRouge' , oldcssText:'background:red;'  },
  
  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;'},

  {id:'setStrokeStylColor1'       , position:'menuGauche' , libelle:trad['coultrait']                           , action:setStrokeStylColor          , contenu:'✎'    , contextFunct:startStrokeStyleColor }, // type:'strokCols' , noContextMenu:true   , func, , color:'#FF00FF' , cssText:'font-size:1.3em;max-height:23px;min-height:23px;text-shadow: 1px 1px 3px black;'  },  

  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;'},

  {id:'integrerModifManuelle1'    , position:'menuGauche' , libelle:trad['integrmodifman']                      , action:integrerModifManuelle1      , contenu:'MM'   },

   // =================== MENU HAUT =====================  
  {id:'annuler1'                  , position:'menuHaut'   , libelle:trad['annuler']                             , action:annuler1                    , svg:'<svg class="svgBoutonHaut1" viewBox="0 -20  220 240"><path stroke="blue" stroke-width="5" fill="red" d=" M 100 0 A 100 100 0 1 1 0 100 H 40 A 60 60 1 1 0 100 40 V 60  L 66 20 L 100 -20 Z"></path></svg>'                   }, // ⟳ = bouton fleche arrondie sens horaire
  {id:'pousserVersHaut1'          , position:'menuHaut'   , libelle:trad['pousser_vers_le_haut']                , action:pousserVersHaut1            , svg:'<svg class="svgBoutonHaut1" viewBox="-35 -7  75 102"><polygon points=" 0 -1 -28 33  -10 33   -10 81 10 81 10 33 27 33 27 33" stroke="blue" stroke-width="5" fill="red"></polygon></svg>'          }, // // ⇧ = fleche vers le haut remonter l'element dans la hierarchie
  {id:'pousserVersBas1'           , position:'menuHaut'   , libelle:trad['pousser_vers_le_bas']                 , action:pousserVersBas1             , svg:'<svg class="svgBoutonHaut1" viewBox="-35 -88  73 100"><polygon points=" 0 -1 -28 33  -10 33   -10 81 10 81 10 33 27 33 27 33" stroke="blue" stroke-width="5" fill="red" transform="rotate(-180 0 0 ) "></polygon></svg>' }, // // ⇩ = fleche vers le bas redescendre l'element dans la hierarchie
  {id:'dupliquerElement1'         , position:'menuHaut'   , libelle:trad['dupliquer_element']                   , action:dupliquerElement1           , svg:'<svg class="svgBoutonHaut1" viewBox="-28 -28  77.87628555297852 94"><rect x="-24" y="-25" width="50" height="75" stroke="rgb(0, 0, 255)" stroke-width="5" fill="white"></rect><rect x="-4" y="-12" width="50" height="75" stroke="rgb(0, 0, 255)" stroke-width="5" fill="bisque" stroke-dasharray="10"></rect><polygon points=" -12 2  22 2  22 -10  44 15  22 38  22 27  -12 27 " stroke="rgb(0, 0, 255)" stroke-width="4" fill="yellow" transform="rotate(22 0 0 ) translate(4 1 ) "></polygon></svg>'          }, // // ⎘ = dupliquer
  {id:'dupliquerGroupe1'          , position:'menuHaut'   , libelle:trad['dupliquer_groupe']                    , action:dupliquerGroupe1            , svg:'<svg class="svgBoutonHaut1" viewBox="-28 -28  77.87628555297852 94"><rect x="-24" y="-25" width="50" height="75" stroke="rgb(0, 0, 255)" stroke-width="5" fill="white"></rect><rect x="-4" y="-12" width="50" height="75" stroke="rgb(0, 0, 255)" stroke-width="5" fill="bisque" stroke-dasharray="10"></rect><polygon points=" -12 2  22 2  22 -10  44 15  22 38  22 27  -12 27 " stroke="rgb(0, 0, 255)" stroke-width="4" fill="yellow" transform="rotate(22 0 0 ) translate(4 1 ) "></polygon></svg>'          }, // // ⎘ = dupliquer},
  {id:'poigneesVoisines1'         , position:'menuHaut'   , libelle:trad['afficher_les_poignées_voisines']      , action:poigneesVoisines1           , contenu:trad['afficher_les_poignées_voisines'] },
  
  
  {id:'break0'                    , position:'menuHaut'   , cssText:'width:15px;display: inline-block;'},
  {id:'supprimeElement1'          , position:'menuHaut'   , libelle:trad['supprimer_élément']                   , action:supprimeElement1            , contenu:'&nbsp;&nbsp;&times;&nbsp;&nbsp;'        , class:'butEnabled butMenuHaut bckRouge' , cssText:'width: fit-content;padding: 0px 3px;'},
  {id:'supprimeGroupe1'           , position:'menuHaut'   , libelle:trad['supprimer_groupe']                    , action:supprimeGroupe1             , contenu:'&nbsp;&nbsp;&times;&nbsp;&nbsp;'        , cssText:'background:red;color:yellow;'  },

  {id:'break0'                    , position:'menuHaut'   , cssText:'width:15px;display: inline-block;'},
  {id:'allera000'                 , position:'menuHaut'   , libelle:trad['aller_en_0_0']                        , action:allera000                   , svg:'<svg class="svgBoutonHaut1" viewBox="-2 -2  35 35"><polyline points=" 1 1  32 1 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><polyline points=" 1 1  1 32 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><circle cx="14" cy="14" r="5" fill="transparent" style="stroke:blue;fill:transparent;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></circle></svg>'},
  {id:'allera5050'                , position:'menuHaut'   , libelle:trad['aller_en_50_50']                      , action:allera5050                  , class:'butEnabled butMenuHaut bckJaune' , svg:'<svg class="svgBoutonHaut1" viewBox="-2 -2  35 35"><polyline points=" 1 1  32 1 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><polyline points=" 1 1  1 32 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><circle cx="14" cy="14" r="5" fill="transparent" style="stroke:blue;fill:transparent;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></circle></svg>'},
  {id:'popGroupeActif1'           , position:'menuHaut'   , libelle:trad['selectionner_le_groupe_en_cours']     , action:popGroupeActif1             , contenu:trad['groupe_courant'] }, //globalGroupeActif  

  {id:'exporterSvg1'              , position:'menuHaut'   , libelle:trad['exporter_le_svg']                     , action:exporterSvg1                , contenu:trad['exporter_le_svg']                        },
  {id:'popupImportSvg1'           , position:'menuHaut'   , libelle:trad['importer_un_svg']                     , action:popupImportSvg1             , contenu:trad['importer_un_svg']                        },
  {id:'popupSpecial1'             , position:'menuHaut'   , libelle:trad['opérations_spéciales']                , action:popupSpecial1               , contenu:trad['opérations_spéciales']                   },
  
  
  ];
  
  for(var i=0;i<boutons.length;i++){ // class
   if(boutons[i].id=='setStrokeStylColor1'){
    
    
      for(var nbElts=0;nbElts<_dssvg.strokCols.length;nbElts++){
       
       var butt=document.createElement('button');
       butt.id=boutons[i].id+'_'+nbElts;
       butt.type='button'
       butt.className='butEnabled butMenuGauche';
       butt.innerHTML=boutons[i].contenu;
       butt.title=boutons[i].libelle;
//       console.log(_dssvg.strokCols[nbElts]);
       butt.style.color=_dssvg.strokCols[nbElts]; // attention un rgba avec opacite = 1 => trasnformé en rgb
       
       butt.addEventListenerBase( 'contextmenu' , function(e){e.preventDefault();e.stopPropagation();return false;} ); 
       butt.addEventListenerBase( 'mouseup'     , boutons[i].action );         
       butt.addEventListenerBase( 'mousedown'   , boutons[i].contextFunct ); 
       butt.addEventListenerBase( 'touchmove'   , touchMoveButton );
       butt.addEventListenerBase( 'touchend'    , boutons[i].action );         
       butt.addEventListenerBase( 'touchstart'  , boutons[i].contextFunct ); 
       
       
       divlft.appendChild(butt);
       
       
       
      }
    
    
    
   }else if(boutons[i].id==='break0'){
    
    var div=document.createElement('div');
    if(boutons[i].hasOwnProperty('cssText')){
     div.style.cssText=boutons[i].cssText;
    }
    if(boutons[i].position=='menuGauche'){
     divlft.appendChild(div);
    }else if(boutons[i].position=='menuHaut'){
     divtpe.appendChild(div);
    }
   }else{
    var btn=document.createElement('button');
    btn.id=boutons[i].id;
    btn.type='button'
    btn.style.display='';
    if(boutons[i].hasOwnProperty('svg') && boutons[i].svg!==''){
     btn.innerHTML=boutons[i].svg;
    }else{
     btn.innerHTML=boutons[i].contenu;
    }
    btn.title=boutons[i].libelle;
    if(boutons[i].position=='menuGauche'){
     if(boutons[i].hasOwnProperty('class')){
      btn.className=boutons[i].class;
     }else{
      btn.className='butEnabled butMenuGauche';
     }
     
     divlft.appendChild(btn);
    }else if(boutons[i].position=='menuHaut'){
     if(boutons[i].hasOwnProperty('class')){
      btn.className=boutons[i].class;
     }else{
      btn.className='butEnabled butMenuHaut';
     }
     divtpe.appendChild(btn);
    }
    if(boutons[i].hasOwnProperty('cssText')){
     btn.style.cssText=boutons[i].cssText;
    }
    btn.addEventListenerBase('click',boutons[i].action,false);
   }
  }
  
  
  resize1();
  getScrollWidth();
  if(globalScrollWidth1!==_dssvg.parametres.scroll_size){
//   alert(globalScrollWidth1); 8 en dur dans firefox
   _dssvg.parametres.scroll_size=globalScrollWidth1; //parseInt(dogid('parLargeurScrollSize').value,10);
   he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
   wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
   redrawCss();
   resize1();
  }
  
  
  window.addEventListenerBase('resize', myEffitFn);
  
  if(draw_stateTxt!==null){
   try{
    var jsonDs=JSON.parse(draw_stateTxt);
    
//    console.log('dans init, jsonDs=',jsonDs);
    
    
    if(jsonDs.hasOwnProperty('parametres') && jsonDs.parametres.hasOwnProperty('rayonReference')){
     _dssvg.parametres.rayonReference=jsonDs.parametres.rayonReference;
    }
    if(jsonDs.hasOwnProperty('mode_en_cours')){
     _dssvg.mode_en_cours=jsonDs.mode_en_cours;
    }
    if(jsonDs.hasOwnProperty('idArbreCourant')){
     _dssvg.idArbreCourant=jsonDs.idArbreCourant;
    }
    
    if(jsonDs.hasOwnProperty('zoom1')){
     _dssvg.zoom1=jsonDs.zoom1;
    }
    rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
    strkWiTexteSousPoignees=rayonPoint/20;
    fontSiTexteSousPoignees=rayonPoint;
    if(jsonDs.hasOwnProperty('aimanterPixel1')){
     _dssvg.aimanterPixel1=jsonDs.aimanterPixel1;
    }
    
    if(jsonDs.hasOwnProperty('historique1')){
     _dssvg.historique1=jsonDs.historique1;
    }
    if(jsonDs.hasOwnProperty('strokeColor1')){
     _dssvg.strokeColor1=jsonDs.strokeColor1;
    }
    if(jsonDs.hasOwnProperty('strokCols')){
     _dssvg.strokCols=jsonDs.strokCols;
     for(var i=0;i<_dssvg.strokCols.length;i++){
      dogid('setStrokeStylColor1_'+i).style.color=_dssvg.strokCols[i];
     }
    }
    
    
    
    
    
    if(jsonDs.hasOwnProperty('viewBoxInit')){
     _dssvg.viewBoxInit=jsonDs.viewBoxInit;
//     console.log(_dssvg.viewBoxInit);
     var width =(xscreen-margns.l-wi_of_the_menulft-decal.l-margns.r-2*wi_of_the_brds2)/_dssvg.zoom1;
     var height=(yscreen-margns.t-he_of_the_menutpe-decal.t-margns.b-2*wi_of_the_brds2)/_dssvg.zoom1;

//     console.log(width,height);
     if(_dssvg.viewBoxInit[2]>width){
      _dssvg.viewBoxInit[2]=width;
     }
     if(_dssvg.viewBoxInit[3]>height){
      _dssvg.viewBoxInit[3]=height;
     }
//     refZnDessin.setAttribute('viewBox',_dssvg.viewBoxInit.join(' '));
     setAttributeViewBox();  
    }
    
    if(jsonDs.hasOwnProperty('arbre0') && jsonDs.arbre0.length>0){
     for(var i=jsonDs.arbre0.length-1;i>0;i--){
      if(jsonDs.arbre0[i].data.attributes.hasOwnProperty('data-type') && jsonDs.arbre0[i].data.attributes['data-type']=='toRemove'){
       jsonDs.arbre0.splice(i,1);
      }
     }
     _dssvg.arbre0=jsonDs.arbre0;
    }else{
/*     
     if(jsonDs.hasOwnProperty('innerSvg') && jsonDs.innerSvg!==''){
      _dssvg.innerSvg=jsonDs.innerSvg;
      refZnDessin.innerHTML=jsonDs.innerSvg;
      getSvgTree({init:true})
     }else{
      if(jsonDs.hasOwnProperty('outerSvg') && jsonDs.outerSvg!==''){
       _dssvg.outerSvg=jsonDs.outerSvg;
       refZnDessin.outerHTML=jsonDs.outerSvg;
       getSvgTree({init:true})
      }
     }
*/     
    }
   }catch(e){}
  }
  
  
  var hidden, state, visibilityChange; 
  if (typeof document.hidden !== "undefined") {
   hidden = "hidden";
   visibilityChange = "visibilitychange";
   state = "visibilityState";
  } else if (typeof document.mozHidden !== "undefined") {
   hidden = "mozHidden";
   visibilityChange = "mozvisibilitychange";
   state = "mozVisibilityState";
  } else if (typeof document.msHidden !== "undefined") {
   hidden = "msHidden";
   visibilityChange = "msvisibilitychange";
   state = "msVisibilityState";
  } else if (typeof document.webkitHidden !== "undefined") {
   hidden = "webkitHidden";
   visibilityChange = "webkitvisibilitychange";
   state = "webkitVisibilityState";
  }
  document.addEventListenerBase(visibilityChange, function() {
   
//   if(document[state]=='visible'){
//    console.log('I am visible');
//   }
   
  }, false);
//  if(initObj1.isLocalhost===false){
//   window.oncontextmenu=function(e){e.preventDefault();e.stopPropagation();return false;}; 
//  }
  popupBackground1=document.createElement('div');
  popupBackground1.id='popupBackground1';
  popupBackground1.style.display='none';
  popupBackground1.style.zIndex=100;
  popupBackground1.style.opacity=0.4;
  popupBackground1.style.position='absolute';
  popupBackground1.style.top=0; 
  popupBackground1.style.left=0; 
  popupBackground1.style.background='black'; 
  body.appendChild(popupBackground1);
  
  
  //   ss.insertRule('#popupContent1{z-index: 101;opacity: 0.9;position: absolute;background: white;overflow: scroll;    border-radius: 4px;box-shadow: 0px 0px 25px #000;}' , ss.cssRules.length);  

  popupContent1=document.createElement('div');
  popupContent1.id='popupContent1';
  popupContent1.style.display='none';
  popupContent1.style.top=0; 
  popupContent1.style.left=0; 
  body.appendChild(popupContent1);
  var t='';
  t+='<button id="BtnclosPop" type="button" class="butEnabled bckRouge" style="position:fixed;color:yellow;width:35px;height:35px;z-index:200;">&times;</button>';
  t+='<div style="margin-top:0px;border:1px red solid;padding-bottom:200px;border-radius: 4px;" id="popupValue"></div>';
  popupContent1.innerHTML=t;
  
  
  
  popupBackground1.addEventListenerBase('click', closePopup);
  dogid('BtnclosPop').addEventListenerBase('click', closePopup);
  
  afficheArbre0({init:true});
  
  var ver=document.getElementById('mscr').src;
  ver=ver.substr(ver.indexOf('?v=')+3);
  
  var tab=['hdtree','html5kellycolorpicker.min','path-simplification03'];
  for(var i=0;i<tab.length;i++){
   var scr=document.createElement('script');
   scr.type='text/javascript';
   scr.src=tab[i]+'.js?v='+ver;
   body.appendChild(scr);
  }
  try{
   if(navigator.language!=='fr'){
    document.documentElement.setAttribute('lang', 'en');
   }
  }catch(e){
  }
  
  setTimeout(apresInit,250);
  
  
  
  
//  console.log('init fin');  
 }
 //========================================================================================================
 function apresInit(){
  if(_dssvg.mode_en_cours=='setModeSaisieSelElt1' ){
   setModeSaisieSelElt1();
  }else if( 'setModeSaisieDefsElt1' == _dssvg.mode_en_cours ){
   affPoi();
  }else if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ){
   affPoi();
  }else if(_dssvg.mode_en_cours==='setModeSaisieTranE1'){
   setModeSaisieTranE1();
  }else if(_dssvg.mode_en_cours==='setModeSaisieDefsTrE1'){
   setModeSaisieDefsTrE1();
  }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
   setModeSaisieGroupe1();
  }
  
  majBout();
    
 }
 //========================================================================================================
 function recalculBBoxes(){
  var pt1    = refZnDessin.createSVGPoint();  
  var lst=refZnDessin.querySelectorAll('*');
  for(var i=0;i<lst.length ;i++){
   if(lst[i].getAttribute('data-type') && ( lst[i].getAttribute('data-type')=='systeme' || lst[i].getAttribute('data-type')=='toRemove')){
    continue;
   }
   
   var nn=lst[i].nodeName.toLowerCase();
   if( nn==='stop' || nn=='lineargradient' || nn=='filter' || nn=='fegaussianblur' || nn==='radialgradient'){
    continue;
   }
   
   
   if(lst[i].id && lst[i].id=='refZnDessin'){
    
    continue; // plus tard
    
   }else{
    var idArbre=parseInt(lst[i].getAttribute('data-idarbre1'),10);
    var indiceArbre=recupereIndiceArbre(idArbre);
//    console.log('idArbre='+idArbre,'indiceArbre=',indiceArbre);
   }

   try{   
    var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
    
    var bounding=lst[i].getBBox(); // matrix
    var minx=999999;
    var miny=999999;   
    var maxx=-999999;
    var maxy=-999999;   
    
 //   console.log('bounding=',bounding);
    
    var tab=[[bounding.x,bounding.y],[bounding.x+bounding.width,bounding.y],[bounding.x+bounding.width,bounding.y+bounding.height],[bounding.x,bounding.y+bounding.height]];
 //   console.log('tab=',tab);
    for(var j=0;j<tab.length;j++){
     
     pt1.x=tab[j][0];
     pt1.y=tab[j][1];
     pt1=pt1.matrixTransform(matrixRelatifVersAbsolu);
     if(pt1.x<minx){ minx=pt1.x;}
     if(pt1.y<miny){ miny=pt1.y;}
     if(pt1.x>maxx){ maxx=pt1.x;}
     if(pt1.y>maxy){ maxy=pt1.y;}
    }
    var sizes={
     minx:minx,
     maxx:maxx,
     miny:miny,
     maxy:maxy,
    }
    _dssvg.arbre0[indiceArbre].data.sizes=sizes;
   }catch(e){
    if(String(e).indexOf('getScreenCTM is not a function')>=0){
    }else{
     console.warn('lst['+i+'].getScreenCTM() a échoué sur ' , lst[i] , e )
    }
   }
   
  }
  if(_dssvg.arbre0.length>0){
   _dssvg.arbre0[0].data.sizes={minx:null,miny:null,maxx:null,maxy:null};
   for(var i=1,l=_dssvg.arbre0.length;i<l;i++){
    try{
     if(_dssvg.arbre0[0].data.sizes.minx===null || _dssvg.arbre0[i].data.sizes.minx<_dssvg.arbre0[0].data.sizes.minx){
      _dssvg.arbre0[0].data.sizes.minx=_dssvg.arbre0[i].data.sizes.minx;
     }
     if(_dssvg.arbre0[0].data.sizes.miny===null || _dssvg.arbre0[i].data.sizes.miny<_dssvg.arbre0[0].data.sizes.miny){
      _dssvg.arbre0[0].data.sizes.miny=_dssvg.arbre0[i].data.sizes.miny;
     }
     if(_dssvg.arbre0[0].data.sizes.maxx===null || _dssvg.arbre0[i].data.sizes.maxx>_dssvg.arbre0[0].data.sizes.maxx){
      _dssvg.arbre0[0].data.sizes.maxx=_dssvg.arbre0[i].data.sizes.maxx;
     }
     if(_dssvg.arbre0[0].data.sizes.maxy===null || _dssvg.arbre0[i].data.sizes.maxy>_dssvg.arbre0[0].data.sizes.maxy){
      _dssvg.arbre0[0].data.sizes.maxy=_dssvg.arbre0[i].data.sizes.maxy;
     }
    }catch(e){
    }
   }
  }
 }
 //========================================================================================================
 function supptransform1(idArbre,indTransform){
  try{
   var indA=recupereIndiceArbre(idArbre);
   var elem=document.querySelectorAll('[data-idarbre1="'+idArbre+'"]');
   var nomDuTransform='transform';
//   console.log('elem=',elem)
   
   if(elem.length>1){ // probablement un radialGradient
    if(elem[elem.length-1].nodeName.toLowerCase()==='radialgradient'){
     elem=elem[elem.length-1];
     globalGeneralSvgReferenceElement=elem;
     nomDuTransform='gradientTransform';
     var tr=elem.getAttribute(nomDuTransform)?elem.getAttribute(nomDuTransform):'';
    }else if(elem[elem.length-1].nodeName.toLowerCase()==='lineargradient'){
     elem=elem[elem.length-1];
     globalGeneralSvgReferenceElement=elem;
     nomDuTransform='gradientTransform';
     var tr=elem.getAttribute(nomDuTransform)?elem.getAttribute(nomDuTransform):'';
    }else{
     console.warn('%ctodo','background:yellow;color:red;',elem[elem.length-1].nodeName.toLowerCase())
    }
   }else{
    elem=elem[0];
    var tr=elem.getAttribute(nomDuTransform)?elem.getAttribute(nomDuTransform):'';
   }
   var objTransform=convertirTransformEnTableau(tr,[]);
   var tt='';
   for(var i=0;i<objTransform.tab.length;i++){
    if(i==indTransform){
    }else{
     tt+=objTransform.tab[i][0]+'(';
     for(var j=0;j<objTransform.tab[i][1].length;j++){
      tt+=objTransform.tab[i][1][j]+' ';
     }
     tt+=') ';
    }
   }
//   console.log('tt=',tt);
   elem.setAttribute(nomDuTransform,tt);
   _dssvg.arbre0[indA].data.attributes[nomDuTransform]=tt;
   
   return {statut:true,elem:elem};

  }catch(e){
//   console.log('e=',e);
  }
  return {statut:false};
 }
 
 //========================================================================================================
 function recupRelatifVersAbsolu( indPoint , tbOriginal, tbAbsolu , nuArbr ){
  var ttemp=JSON.parse(JSON.stringify(tbOriginal[indPoint]));
  var dx=0;
  var dy=0;
  var xDetermine=false;
  var yDetermine=false;
  for(var j=indPoint-1;j>=0 && !( xDetermine===true && yDetermine===true );j--){
   if(tbAbsolu[j].length>=3){
    if(xDetermine===false){
     xDetermine=true;
     dx=tbAbsolu[j][tbAbsolu[j].length-2];
    }
    if(yDetermine===false){
     yDetermine=true;
     dy=tbAbsolu[j][tbAbsolu[j].length-1];
    }          
   }else if(tbAbsolu[j].length==2){
    if(tbAbsolu[j][0]==='H'){
     if(xDetermine===false){
      xDetermine=true;
      dx=tbAbsolu[j][tbAbsolu[j].length-1];
     }
    }else if(tbAbsolu[j][0]==='V'){
     if(yDetermine===false){
      yDetermine=true;
      dy=tbAbsolu[j][tbAbsolu[j].length-1];
     }
    }
   }
  }
  ttemp[0]=ttemp[0].toLowerCase();
//         console.log('dx=',dx,'dy=',dy);
  if(ttemp[0]=='c'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
   ttemp[5]=arrdi10000(ttemp[5]-dx);
   ttemp[6]=arrdi10000(ttemp[6]-dy);
  }else if(ttemp[0]=='s'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
  }else if(ttemp[0]=='l'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='v'){
   ttemp[1]=arrdi10000(ttemp[1]-dy);
  }else if(ttemp[0]=='h'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
  }else if(ttemp[0]=='q'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
  }else if(ttemp[0]=='t'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='m'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='a'){
   ttemp[6]=arrdi10000(ttemp[6]-dx);
   ttemp[7]=arrdi10000(ttemp[7]-dy);
  }else if(ttemp[0]=='z'){
  }else{
   console.warn('%ctraiter ttemp[0]=','color:purple;',ttemp[0])
   todo();
  }
  var tt=''+ttemp[0]+ ' ';
  for(var i=1;i<ttemp.length;i++){
   tt+=''+arrdi10000(ttemp[i])+'&nbsp;';
  }
  
  var bout='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"pointEnRelatif","numArbre":'+nuArbr+',"indicePoint":'+indPoint+',"nouvPoint":"'+ttemp.join(' ')+'"}')+'">'+tt+'</button>'; // ttemp.join(' ')+
  if(ttemp[0].toLowerCase()=='a'){
   
   var ttori=JSON.parse(JSON.stringify(tbOriginal[indPoint]));
   ttori[4]=ttori[4]==0?1:0;
   bout+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"largeArc","numArbre":'+nuArbr+',"indicePoint":'+indPoint+',"nouvPoint":"'+ttori.join(' ')+'"}')+'">lrgAr '+(ttori[4])+'</button>';
   
   var ttori=JSON.parse(JSON.stringify(tbOriginal[indPoint]));
   ttori[5]=ttori[5]==0?1:0;
   bout+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"sweepFlag","numArbre":'+nuArbr+',"indicePoint":'+indPoint+',"nouvPoint":"'+ttori.join(' ')+'"}')+'">swpF '+(ttori[5])+'</button>';
  }
  
  return {bout:bout, nouvelleDefinition:ttemp.join(' ')};         
 } 
 
 //========================================================================================================
 function recuperePropsCouleurs(numArbre){
  var couleurs={};
  try{
   var ind=recupereIndiceArbre(numArbre);
   var eltd=_dssvg.arbre0[ind].data.attributes;
 //  console.log('eltd=',eltd);
   // on récupére TOUS LES ATTRIBUTS de la propriété "style"
   var attributStyle=eltd.hasOwnProperty('style')?eltd.style:null;
   if(attributStyle!==null && attributStyle!==''){
    var tab1=attributStyle.split(';');
    for(var i=0;i<tab1.length;i++){
     var prop=tab1[i].split(':');
     if(prop.length===2){
      if(prop[1]!==''){
       couleurs[prop[0].trim()]=prop[1];
      }
     }
    }
   }
   // puis on ajoute ceux du tableau ci dessous , y compris si ils sont définis par des propriétés individuelles
   var tab=[
    ['stroke'         , null , 'black'],
    ['fill'           , null , 'transparent'],
    ['stroke-width'   , null , 1],
    ['stroke-opacity' , null , 1],
    ['fill-opacity'   , null , 1],
    ['font-size'      , null , _dssvg.parametres.taillePolice],
    ['opacity'        , null , 1],
   ];
   for(var i=0;i<tab.length;i++){
    // l'élément a-t-il déjà été défini dans la propriété style
    if(couleurs.hasOwnProperty(tab[i][0])){
     // oui, rien à faire, le style est prioritaire sur la propriété individuelle
    }else{
     tab[i][1]=eltd.hasOwnProperty(tab[i][0])?(eltd[tab[i][0]]!==''?eltd[tab[i][0]]:null):null;
     // l'élément a-t-il une propriété individuelle non vide
     if(tab[i][1]!==null){
      couleurs[tab[i][0]]=tab[i][1]; // oui, on la renseigne
     }else{
      couleurs[tab[i][0]]=tab[i][2]; // non, on met la valeur par défaut
     }
    }
    
    
   }
  }catch(e){
  }
  return couleurs;
 }
 //========================================================================================================
 function supprimeAttrib(ind,nom){
  var nouveauAttributs={};
  for(var n in _dssvg.arbre0[ind].data.attributes){
   if(n!==nom){
    nouveauAttributs[n]=_dssvg.arbre0[ind].data.attributes[n];
   }
  }
//  console.log('JSON.parse(JSON.stringify(nouveauAttributs))=',JSON.parse(JSON.stringify(nouveauAttributs)));
  _dssvg.arbre0[ind].data.attributes=JSON.parse(JSON.stringify(nouveauAttributs));
 }
 //========================================================================================================
 function majPropArbre(numArbre , type , valeur ){
  var ind=recupereIndiceArbre(numArbre);
  var eltd=_dssvg.arbre0[ind].data;
//  console.log('eltd=',eltd);
  var couleurs=recuperePropsCouleurs(numArbre);
//  console.log('couleurs=',couleurs , 'type=',type , 'valeur=', valeur);
  
  
  var nouveaStyle1={};
  for(var n in couleurs){
   if(type==n){
    nouveaStyle1[n]=valeur;
   }else{
    nouveaStyle1[n]=couleurs[n]
   }
  }
  var nouveaStyle2={};
  for(var n in couleurs){
   if( eltd.nodeName==='text' || eltd.nodeName==='tspan' ){
    if(n==='font-size' || n==='font-family' || n==='stroke'  || n==='stroke-width' || n==='stroke-opacity' || n==='fill'  || n==='fill-opacity' ){
     nouveaStyle2[n]=nouveaStyle1[n];
    }
   }else if( eltd.nodeName==='image' ){
    if(n==='opacity'){
     nouveaStyle2[n]=nouveaStyle1[n];
    }
   }else{
    if(!( n==='font-size' ) ){
     nouveaStyle2[n]=nouveaStyle1[n];
    }
   }
  }
  
//  console.log('nouveaStyle2=' , nouveaStyle2 );
  var tt='';
  for(var n in nouveaStyle2){
   tt+=''+n+':'+nouveaStyle2[n]+';'
  }
  
  _dssvg.arbre0[ind].data.attributes.style=tt;
  afficheArbre0({init:false});
  
 }
 
 //========================================================================================================
 function divLag2Complete(){
  var t='';
  if(globalGeneralSvgReferenceElement){
   var numArbre=globalGeneralSvgReferenceElement.getAttribute('data-idarbre1');
   t+='<div>'+globalGeneralSvgReferenceElement.nodeName+ '('+numArbre+')<span style="font-size:0.6rem;">prec='+_dssvg.idArbrPreceden+'</span></div>';
   
   var extensions=null;
   var extensionsTxt=globalGeneralSvgReferenceElement.getAttribute('data-extensions');
   if(extensionsTxt){
    extensions=JSON.parse(extensionsTxt);
//    console.log('extensions=',extensions);
    
   }
   
   if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='radialgradient' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='lineargradient' ){
    
    var tr=globalGeneralSvgReferenceElement.getAttribute('gradientTransform')?globalGeneralSvgReferenceElement.getAttribute('gradientTransform'):'';
    
   }else{
    
    var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
    
   }
    var objTransform=convertirTransformEnTableau(tr,[]);
   if(extensions && extensions.tableauArbre.includes('clipPath') || extensions && extensions.tableauArbre.includes('pattern') ){
    t+='Le clipPath/pattern contient des transformations';
   }else{
 //   console.log('objTransform=',objTransform);
    for(var i=0;i<objTransform.tab.length;i++){
     t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"supptransform1","numArbre":'+numArbre+',"numTransform":'+i+'}')+'">'+objTransform.tab[i][0]+'(';
     for(var j=0;j<objTransform.tab[i][1].length;j++){
      t+=objTransform.tab[i][1][j]+' ';
     }
     t+=')</button>';
    }
   }
    
   if((_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ) && globalIndicePoint!==null){
    
    if(
     ( globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='polyline' || 
       globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='polygon' 
     ) && globalSelectionPoints.tabOriginal!==null
    ){
     
     t+='<div>P'+(globalIndicePoint/2)+'</div>'; // c'est une liste de positions x y
     t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointPolyAvant","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">'+trad['ajouter_point_avant']+'</button>';
     t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointPolyApres","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">'+trad['ajouter_point_apres']+'</button>';
     if(globalIndicePoint>0){
      t+='<button class="butEnabled butMenuHaut bckRouge" data-action="'+htm1('{"action":"supprimerPointPolyline","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">'+trad['supprimer_point']+'</button>';
     }
     
     
    }else if(
     globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='path' &&
     globalSelectionPoints.tabOriginal !==null &&
     globalSelectionPoints.tabAbsolu   !==null
    ){
     
     t+='<div style="color:red;">P'+globalIndicePoint+'</div>';
     
     t+='<div>';
     t+=globalSelectionPoints.tabOriginal[globalIndicePoint][0]+'&nbsp;';
     for(var i=1;i<globalSelectionPoints.tabOriginal[globalIndicePoint].length;i++){
      t+=''+arrdi10000(globalSelectionPoints.tabOriginal[globalIndicePoint][i])+'&nbsp;&nbsp;';
     }
     t+='</div>'

     if(globalIndicePoint>=0){
      
      
      if(globalSelectionPoints.tabOriginal[globalIndicePoint][0]===globalSelectionPoints.tabOriginal[globalIndicePoint][0].toLowerCase()){

       // si c'est un segment relatif ( en minuscule )
       var tt=''+globalSelectionPoints.tabAbsolu[globalIndicePoint][0]+ ' ';
       // globalSelectionPoints.tabAbsolu[globalIndicePoint]
       for(var i=1;i<globalSelectionPoints.tabAbsolu[globalIndicePoint].length;i++){
        tt+=''+arrdi10000(globalSelectionPoints.tabAbsolu[globalIndicePoint][i])+' &nbsp;&nbsp;';
       }
       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"pointEnAbsolu","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"nouvPoint":"'+globalSelectionPoints.tabAbsolu[globalIndicePoint].join(' ')+'"}')+'">'+tt+'</button>';
       
       if(globalSelectionPoints.tabOriginal[globalIndicePoint][0]=='a'){
        
        var ttori=JSON.parse(JSON.stringify(globalSelectionPoints.tabOriginal[globalIndicePoint])); //globalSelectionPoints.tabOriginal[globalIndicePoint];
        ttori[4]=ttori[4]==1?0:1;
        t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"largeArc","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"nouvPoint":"'+ttori.join(' ')+'"}')+'">lrgA'+(ttori[4])+'</button>';
        var ttori=JSON.parse(JSON.stringify(globalSelectionPoints.tabOriginal[globalIndicePoint])); //globalSelectionPoints.tabOriginal[globalIndicePoint];
        ttori[5]=ttori[5]==1?0:1;
        t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"sweepFlag","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"nouvPoint":"'+ttori.join(' ')+'"}')+'">swpFlg'+(ttori[4])+'</button>';
        
       }
       
      }else if(globalSelectionPoints.tabOriginal[globalIndicePoint][0]===globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()){

       // si c'est un segment absolu ( en majuscule )
       var obj=recupRelatifVersAbsolu(globalIndicePoint , globalSelectionPoints.tabOriginal , globalSelectionPoints.tabAbsolu , numArbre );
       t+=obj.bout;
       
      }
     }
     t+='<button class="butEnabled butMenuHaut bckVert2" data-action="'+htm1('{"action":"cheminCompletEnRelatif","numArbre":'+numArbre+'}')+'">'+trad['relatif']+'</button>';
     t+='<button class="butEnabled butMenuHaut bckVert2" data-action="'+htm1('{"action":"cheminCompletEnAbsolu","numArbre":'+numArbre+'}')+'">'+trad['absolu']+'</button>';

     // supprimer un point d'un chemin
     
     if(globalIndicePoint!==0){
       
      if(globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()=='C'){
       // on ne peut pas supprimer un C suivi par un S
       
       if(globalIndicePoint<globalSelectionPoints.tabOriginal.length-1 && globalSelectionPoints.tabOriginal[globalIndicePoint+1][0].toUpperCase()=='S'){
       }else{
        t+='<button class="butEnabled butMenuHaut bckRouge" data-action="'+htm1('{"action":"SupprimerPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'"> &times; P '+(globalIndicePoint)+'</button>';
       }
       
      }else if(globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()=='Q'){
       // on ne peut pas supprimer un Q suivi par un T
       
       if(globalIndicePoint<globalSelectionPoints.tabOriginal.length-1 && globalSelectionPoints.tabOriginal[globalIndicePoint+1][0].toUpperCase()=='T'){
       }else{
        t+='<button class="butEnabled butMenuHaut bckRouge" data-action="'+htm1('{"action":"SupprimerPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'"> &times; P '+(globalIndicePoint)+'</button>';
       }
       
       
      }else{
       t+='<button class="butEnabled butMenuHaut bckRouge" data-action="'+htm1('{"action":"SupprimerPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'"> &times; P '+(globalIndicePoint)+'</button>';
      }
     }

     // ajouter un point à un chemin
     var typePointChemin=['M','L','C','Q','H','V','A','T','S','Z'];
     for(var i=0;i<typePointChemin.length;i++){
      if(typePointChemin[i]=='T'){
       if(globalSelectionPoints.tabAbsolu[globalIndicePoint][0]=='T' || globalSelectionPoints.tabAbsolu[globalIndicePoint][0]=='Q' ){
        t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"typePointChemin":"'+typePointChemin[i]+'"}')+'"> + '+typePointChemin[i]+' </button>';
       }
      }else if(typePointChemin[i]=='S'){
       if(globalSelectionPoints.tabAbsolu[globalIndicePoint][0]=='S' || globalSelectionPoints.tabAbsolu[globalIndicePoint][0]=='C' ){
        t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"typePointChemin":"'+typePointChemin[i]+'"}')+'"> + '+typePointChemin[i]+' </button>';
       }
      }else{
       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"typePointChemin":"'+typePointChemin[i]+'"}')+'"> + '+typePointChemin[i]+' </button>';
      }
     }
     
     var strkWidth=parseFloat(window.getComputedStyle(globalGeneralSvgReferenceElement)['stroke-width']);
     if(strkWidth>0){
      t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"simplifierChemin1","numArbre":'+numArbre+',"strkWidth":'+strkWidth+'}')+'">'+trad['simplifier_ce_chemin']+'</button>';
     }

     if(globalIndicePoint!==0){
      if(globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()==='H' || globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()==='V'){
       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"hOuVenL1","numArbre":'+numArbre+'}')+'">'+trad['H_ou_V_en_L']+'</button>';
      }
      if(globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()!=='C' && globalIndicePoint>0){
       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"enC1","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">'+trad['X_en_C']+'</button>';
      }
     }


    }
   }
//   console.log('_dssvg.mode_en_cours=' , _dssvg.mode_en_cours ); // 
   if(
     (_dssvg.mode_en_cours==='setModeSaisieSelElt1' || 'setModeSaisieDefsElt1'===_dssvg.mode_en_cours) ||
     ( (_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ) && globalIndicePoint!==null )
   ){

    var couleurs=recuperePropsCouleurs(numArbre);
//    console.log('couleurs=',couleurs);
    if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='image'){
      t+='<button class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"wiEtHeImageVide" ,"numArbre":'+numArbre+'}')+'">raz hauteur et largeur</button>';
      t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"opacity" ,"numArbre":'+numArbre+',"valeur":"'+couleurs['opacity']         +'"}')+'">opac:'+couleurs['opacity']+'</button>';
    }else{
     if(couleurs['stroke'] && couleurs['stroke'].indexOf('url(')<0){
      t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"strokeElement" ,"numArbre":'+numArbre+',"valeur":"'+couleurs['stroke']         +'"}')+'">strk:'+couleurs['stroke']+'</button>';
     }
     t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"stroke-width"  ,"numArbre":'+numArbre+',"valeur":"'+couleurs['stroke-width']   +'"}')+'">strk-wi:'+couleurs['stroke-width']+'</button>';
     t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"stroke-opacity","numArbre":'+numArbre+',"valeur":"'+couleurs['stroke-opacity'] +'"}')+'">strk-opa:'+couleurs['stroke-opacity']+'</button>';
     if(couleurs['fill'].indexOf('url(')<0){
      t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"fillElement"   ,"numArbre":'+numArbre+',"valeur":"'+couleurs['fill']           +'"}')+'">fill:'+couleurs['fill']+'</button>';
     }
     t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"fill-opacity"  ,"numArbre":'+numArbre+',"valeur":"'+couleurs['fill-opacity']   +'"}')+'">fill-opa:'+couleurs['fill-opacity']+'</button>';
    }
    t+='<button class="butEnabled butMenuHaut bckRouge" style="min-width: fit-content;" data-action="'+htm1('{"action":"suppAttribGra1"  ,"numArbre":'+numArbre+'}')+'">supp attr gra</button>';
    
   }
   if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' ){
    t+='<button class="butEnabled butMenuHaut bckRouge" style="min-width: fit-content;" data-action="'+htm1('{"action":"suppAttribGraDuGroupe1"  ,"numArbre":'+numArbre+'}')+'">'+trad['supp_attr_gra_grp']+'</button>';
    t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"popupPropEltsGrp1"  ,"numArbre":'+numArbre+'}')+'">'+trad['Modifier_propriétés_du_groupe']+'</button>';
    t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"redimEltsGrp"  ,"numArbre":'+numArbre+'}')+'">'+trad['redimentionner_les_éléments_du_groupe']+'</button>';
   }
   
   
  }
  if(
     (_dssvg.mode_en_cours==='setModeSaisieSelElt1' || 'setModeSaisieDefsElt1'===_dssvg.mode_en_cours) ||
     ( (_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ) && globalIndicePoint!==null )
  ){
   t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"redimElt1"  ,"numArbre":'+numArbre+'}')+'">'+trad['redimentionner_élément']+'</button>';
  }
  if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' && _dssvg.idArbreCourant!==null){
   /*
   Dans le cas ci dessous, on a deux groupes qui sont supperposés l'un sur l'autre, celui actif est le groupe 3 mais on voulait peut être sélectionner le groupe 2

   _dssvg.mode_en_cours==='setModeSaisieGroupe1'
   _dssvg.idArbreCourant = 3, !== null

   // <circle data-type="toRemove" data-elem="2 hg" cx="296" cy="671" r="0.75" style="fill:rgba(255,0,0,0.2);stroke:blue;stroke-width:0.0625;" data-action="selectionnerElementAtransformer"></circle>
   // <circle data-action="fElementTransformTranslate1" data-angle="0" data-angleg="0" data-type="toRemove" data-elem="3 hg" cx="296" cy="671" r="0.75" style="fill:rgba(255,255,0,0.5);stroke:red;stroke-width:0.0625;"></circle>
   */
   var cx=null;
   var cy=null;
   var lst1=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' hg"]');
   for(var i=0;i<lst1.length;i++){
    if(lst1[i].nodeName==='circle'){
     if(lst1[i].getAttribute('cx')){
      cx=parseFloat(lst1[i].getAttribute('cx'));
      cy=parseFloat(lst1[i].getAttribute('cy'));
     }
    }
   }
//   console.log('cx=',cx,'cy=',cy);
   if(cx!==null && cy!==null){
    var lst=document.querySelectorAll('[data-action="selectionnerElementAtransformer"]'); // data-elem=""2 hg"
    for(var i=0;i<lst.length;i++){
     if(lst[i].nodeName==='circle'){
      var attrDe=lst[i].getAttribute('data-elem');
      if(attrDe.indexOf(' hg')>=0 && lst[i].getAttribute('cx')){
       var cx1=parseFloat(lst[i].getAttribute('cx'));
       var cy1=parseFloat(lst[i].getAttribute('cy'));
       if(cx1>=cx-0.5 && cx1<=cx+0.5 && cy1>=cy-0.5 && cy1<=cy+0.5 ){
//        console.log('lst['+i+']=',lst[i]);
        var idAutre=parseInt(attrDe.substr(0,attrDe.indexOf(' hg')),10);
//        console.log('idAutre=',idAutre)
        t+='<button class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"selectionnerGroupeDessous1"  ,"idAutre":'+idAutre+',"idCourant":'+_dssvg.idArbreCourant+'}')+'">'+trad['selectionner_le_groupe']+' '+idAutre+' '+trad['sous_le']+' '+_dssvg.idArbreCourant+' ('+trad['sous_le']+')</button>';
       }
      }
     }
    }
   }
  }
  
  
  
  
  divlag2.innerHTML=t;
  var taille=divlag2.getBoundingClientRect();
//  console.log('taille=',taille)
  divlft.style.paddingBottom=taille.height+'px';
  
 }
 
 //========================================================================================================
 function saveStte(){
  
 
  
  var nouvelArbre=[];
  for(var i=_dssvg.arbre0.length-1;i>=0;i--){
   if(_dssvg.arbre0[i].data.attributes.hasOwnProperty('data-type') && (  _dssvg.arbre0[i].data.attributes['data-type']=='toRemove' ||  _dssvg.arbre0[i].data.attributes['data-type']=='systeme' )){    
   }else{
    nouvelArbre.push(_dssvg.arbre0[i]);
   }
  }
  var nouvelArbre2=[];
  for(var i=nouvelArbre.length-1;i>=0;i--){
   nouvelArbre2.push(nouvelArbre[i]);
  }
  _dssvg.arbre0=nouvelArbre2;


  var ancienArbreText=null;
  var draw_stateTxt=localStorage.getItem('_dssvg');
  if(draw_stateTxt){
   try{
    var jsonDs=JSON.parse(draw_stateTxt);
    if(jsonDs.historique1.length>0){
     ancienArbreText=JSON.stringify(jsonDs.historique1[jsonDs.historique1.length-1]);
    }
   }catch(e){
   }
  }

  var nouvelArbreTexte=JSON.stringify(_dssvg.arbre0);
  if(_dssvg.arbre0.length>0 && nouvelArbreTexte!=ancienArbreText){
   _dssvg.historique1.push(JSON.parse(JSON.stringify(nouvelArbre2)));
   if(_dssvg.historique1.length>10){
    _dssvg.historique1.splice(0,1);
   }
  }
  

  
  try{
   localStorage.setItem('_dssvg', JSON.stringify(_dssvg)); 
  }catch(e){
  }
 } 
 //========================================================================================================
 function afficheIndicateurFleche(){
  var x0=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2]/2;
  var y0=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]/2;
  var x1=_dssvg.arbre0[0].data.sizes.minx+(_dssvg.arbre0[0].data.sizes.maxx-_dssvg.arbre0[0].data.sizes.minx)/2;
  var y1=_dssvg.arbre0[0].data.sizes.miny+(_dssvg.arbre0[0].data.sizes.maxy-_dssvg.arbre0[0].data.sizes.miny)/2;
  var line= ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':0,d:'M '+x0+' '+y0+' L '+x1+' '+y1+'',style:'fill:transparent;stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';'});
 }
 //========================================================================================================
 function afficheIndicateurBoite(){
  var x1=_dssvg.arbre0[0].data.sizes.minx;
  var y1=_dssvg.arbre0[0].data.sizes.miny;
  var w1=(_dssvg.arbre0[0].data.sizes.maxx-_dssvg.arbre0[0].data.sizes.minx);
  var h1=(_dssvg.arbre0[0].data.sizes.maxy-_dssvg.arbre0[0].data.sizes.miny);
  var rect= ajouteElemDansElem(refZnDessin,'rect',{'data-type':'toRemove','data-elem':0,x:x1,y:y1,width:w1,height:h1,style:'fill:rgba(0,255,0,0.5);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';'});
 }
 //========================================================================================================
 function afficheArbre0(option){

  var obj=looptree(0,{afficherTout:true}); // =='setModeSaisieDefsElt1'
//  console.log('looptree obj=',obj);
  refZnDessin.innerHTML=obj.txt;
  recalculBBoxes();
  saveStte();
  var obj=looptree(0,{afficherTout:false,mode:_dssvg.mode_en_cours});
//  console.log('looptree obj=',obj);
//  console.log('_dssvg.arbre0=',_dssvg.arbre0); // hugues
  etatPoigneesVoisines1=false;
  majBout();
//  console.log('obj.txt=' , obj.txt );
  refZnDessin.innerHTML=obj.txt;
  
  var absy= ajouteElemDansElem(refZnDessin,'polyline',{'data-type':'systeme',points:'0 0 101 0','stroke-dasharray':'5',style:'fill:transparent;stroke:red;stroke-width:'+(1/_dssvg.zoom1/4)+';'}); // 
  var ordo= ajouteElemDansElem(refZnDessin,'polyline',{'data-type':'systeme',points:'0 0 0 101','stroke-dasharray':'5',style:'fill:transparent;stroke:red;stroke-width:'+(1/_dssvg.zoom1/4)+';'}); // 
  
  if('setModeSaisieDeplace1'==_dssvg.mode_en_cours){
   if(obj.nbObjAff==0 && _dssvg.arbre0.length>1){
    afficheIndicateurFleche();
    afficheIndicateurBoite();
   }else if(obj.nbObjAff<_dssvg.arbre0.length-1){
    afficheIndicateurBoite();
   }
  }else{
   if(obj.nbObjAff==0 && _dssvg.arbre0.length>1){
    afficheIndicateurFleche();
   }else{
    affPoi();
/*    
    //  déclenche des poignées en double
    if(_dssvg.mode_en_cours=='setModeSaisieEditionPoin1' || _dssvg.mode_en_cours=='setModeSaisieDefsPtE1' ){
     if(_dssvg.idArbreCourant!==null){
      debugger;
      actionDownSelectionIndiceArbre(null,_dssvg.idArbreCourant);
     }   
    }
*/    
   }
  }
  divLag2Complete();
  
 }
 //========================================================================================================
 function looptree(parentId,option){
  var txt='';
  var nbObjAff=0;
  var afficherObjet=true;
  
  for(var i=0;i<_dssvg.arbre0.length;i++){

   if(_dssvg.arbre0[i].parentId==parentId){

    if(!option.tableauArbre){
     option.tableauArbre=[_dssvg.arbre0[i].data.nodeName];
    }else{
     option.tableauArbre.push(_dssvg.arbre0[i].data.nodeName);
    }
//    console.log(option.tableauArbre);
    
    if('#comment'==_dssvg.arbre0[i].data.nodeName){
    }else{
     afficherObjet=true;
     if(option.afficherTout===true || ( _dssvg.arbre0[i].data.hasOwnProperty('sizes') && _dssvg.arbre0[i].data.sizes.maxx==-999999 ) ){ // on a inséré un g, il faudra le recalculer plus tard
     }else{
      if(_dssvg.arbre0[i].data.hasOwnProperty('sizes')){
       if(_dssvg.arbre0[i].data.sizes.maxx<_dssvg.viewBoxInit[0]){ // *_dssvg.zoom1
        afficherObjet=false;
       }else if(_dssvg.arbre0[i].data.sizes.minx>(_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2])){ // *_dssvg.zoom1
        afficherObjet=false;
       }else if(_dssvg.arbre0[i].data.sizes.maxy<_dssvg.viewBoxInit[1]){
        afficherObjet=false;
       }else if(_dssvg.arbre0[i].data.sizes.miny>(_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3])){
        afficherObjet=false;
       }
      }
     }
     var nn=_dssvg.arbre0[i].data.nodeName.toLowerCase();
/*     
     if(nn==='defs' || nn==='stop' || nn=='lineargradient' || nn=='filter' || nn=='fegaussianblur' || nn==='radialgradient'){
      afficherObjet=true;
     }
*/     
     if(afficherObjet===false && ( option.tableauArbre[0]==='defs' || option.tableauArbre[option.tableauArbre.length-1]==='g' || option.tableauArbre[0]==='symbol'  ) ){ 
      // on doit afficher les groupes car quand on dessine dans un groupe, il faut que je puisse comparer 
      // la matrice générée et la matrice réelle
      afficherObjet=true;
     }
     
     
     
     if(afficherObjet===false){
//      console.log('masquer obj i='+i,_dssvg.viewBoxInit , _dssvg.arbre0[i].data.sizes);
     }else{
      if(nn==='g' || option.tableauArbre[0]==='defs' || option.tableauArbre[0]==='metadata' ){
      }else{
       nbObjAff++;
      }
     }
     if(afficherObjet===true){
      for(var j in _dssvg.arbre0[i].data.attributes){
       if(j==='data-type' && (_dssvg.arbre0[i].data.attributes[j]==='systeme' || _dssvg.arbre0[i].data.attributes[j]==='toRemove' ) ){
        afficherObjet=false;
        break;
       }
      }
     }
    
     var extensions={
      dansDefs:false,
      dansSymbol:false,
      tableauArbre:option.tableauArbre,
     }
     if(afficherObjet===true){
      if( option.tableauArbre[0]==='defs'){// || _dssvg.arbre0[i].data.nodeName==='defs'){
       extensions.dansDefs=true;
      }
      if( option.tableauArbre[0]==='symbol'){// || _dssvg.arbre0[i].data.nodeName==='defs'){
       extensions.dansSymbol=true;
      }
      
      
      txt+='<'+_dssvg.arbre0[i].data.nodeName ;
      if(option.hasOwnProperty('sansDataIdArbre') && option.sansDataIdArbre===true){
      }else{
       txt+=' data-idarbre1="'+(_dssvg.arbre0[i].id)+'" data-extensions="'+htm1(JSON.stringify(extensions))+'" ';
      }
      for(var j in _dssvg.arbre0[i].data.attributes){
       if( (option.hasOwnProperty('sansDataIdArbre') && option.sansDataIdArbre===true) && (j==='data-idarbre1' || j=='data-extensions' ) ){
       }else{
        txt+=' '+j+'="'+htm1(_dssvg.arbre0[i].data.attributes[j])+'"'
       }
      }
      txt+='>';

      var obj=looptree(_dssvg.arbre0[i].id,option);
      nbObjAff+=obj.nbObjAff;
      
      txt+=obj.txt;
      
      if(_dssvg.arbre0[i].data.nodeName==='text' || _dssvg.arbre0[i].data.nodeName==='tspan' || _dssvg.arbre0[i].data.nodeName==='title'){
       txt+=_dssvg.arbre0[i].data.text;
      }
      txt+='</'+_dssvg.arbre0[i].data.nodeName+'>';
      
     }
    }
    if(option.tableauArbre){
     option.tableauArbre.pop();
    }
   }
  }
  return {txt:txt,nbObjAff:nbObjAff};
 } 
 //========================================================================================================
 function myParseSvg(xml,elt,init){
  let dom = null;
//  let elementId='';
  if(elt===null){
   if (window.DOMParser){
     dom = (new DOMParser()).parseFromString(xml, "image/svg+xml");
   }else if (window.ActiveXObject) {
     dom = new ActiveXObject('Microsoft.XMLDOM');
     dom.async = false;
     if (!dom.loadXML(xml)) throw dom.parseError.reason + " " + dom.parseError.srcText;
   }else{
    throw new Error("cannot parse xml string!");
   }
  }

  //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  function parseNode(xmlNode,  result2 , level , nodeRef , init) {
   if(xmlNode.nodeName == "#text" || xmlNode.nodeName == "#tspan") {
    let v = xmlNode.nodeValue;
    if (v.trim() && result2.length-2>=0){
     result2[result2.length-2].data.text=v.trim();
    }
    result2.pop();
    return;
   }
   if(xmlNode.attributes){
    for (let attribute of xmlNode.attributes){
     if(attribute.nodeName=='data-type' && ( attribute.nodeValue=='toRemove' || attribute.nodeValue=='systeme' ) ){
      result2.pop();
      return;
     }
     if(attribute.nodeValue==parseFloat(attribute.nodeValue)){
//      console.log('float pour attribut=',attribute.nodeName);
      result2[result2.length-1].data.attributes[attribute.nodeName]=parseFloat(attribute.nodeValue);
     }else{
      result2[result2.length-1].data.attributes[attribute.nodeName]=attribute.nodeValue;
     }
    }
   }
//   console.log(xmlNode.getScreenCTM());
   try{
    xmlNode.setAttribute('data-idarbre1',result2.length-1);
    level++;
    var par=result2[result2.length-1].id;
    for (let node of xmlNode.childNodes){
     if('#comment'===node.nodeName){
     }else{
      result2.push({id:result2.length,parentId:par,isOpen:1,data:{label:node.nodeName,level:level,type:(node.nodeName=='#text'?'text':(node.nodeName=='#comment'?'comment':'node')),nodeName:node.nodeName,text:'',attributes:{},nodeRef:nodeRef,sizes:{minx:null,miny:null,maxx:null,maxy:null}}});
      parseNode(node, result2 , level , nodeRef,init);
     }
    }
    level--;
   }catch(e){
    if(xmlNode.nodeName==='#comment'){
    }else{
     console.warn('Erreur de setAttribute sur xmlNode=',xmlNode)
    }
   }
  }
  //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  var level=-1;
  
  let result2 = [{id:0,parentId:-1,isOpen:1,data:{label:'svg',level:level,type:'root',nodeName:'@root',text:'',attributes:{},sizes:{minx:null,miny:null,maxx:null,maxy:null}}}];
  level++;
  if(elt===null){
   for(let node of dom.childNodes){
    result2.push({id:result2.length,parentId:0,isOpen:1,data:{label:node.nodeName,level:level,type:(node.nodeName=='#text'?'text':(node.nodeName=='#comment'?'comment':'node')),nodeName:node.nodeName,text:'',attributes:{},nodeRef:null,sizes:{minx:null,miny:null,maxx:null,maxy:null}}});
    parseNode(node,  result2 , level , null , init);
   }
  }else{
   if(elt.attributes){
    for(let attribute of elt.attributes){
     result2[result2.length-1].data.attributes[attribute.nodeName]=attribute.nodeValue;
    }
   }
   
   for(let node of elt.childNodes){
    result2.push({id:result2.length,parentId:0,isOpen:1,data:{label:node.nodeName,level:level,type:(node.nodeName=='#text'?'text':(node.nodeName=='#comment'?'comment':'node')),nodeName:node.nodeName,text:'',attributes:{},nodeRef:node,sizes:{minx:null,miny:null,maxx:null,maxy:null}}});
    parseNode(node,  result2 , level , node , init );
   }
  }
  level--;

  return result2;
 }
 //========================================================================================================
 function getSvgTree(option){
  var ttt=refZnDessin.innerHTML;
  var xmlStr=ttt.replace(/<!--[\s\S]*?-->/g,'');
//  console.log('xmlStr='+xmlStr);
  var cleanXmlStr=cleanXml(xmlStr);
//  console.log('cleanXmlStr='+cleanXmlStr);
  _dssvg.arbre0=[];
  _dssvg.arbre0=myParseSvg(cleanXmlStr,refZnDessin,option.init);
//  console.log('dans getSvgTree, _dssvg.arbre0=', _dssvg.arbre0 );
 }
 //========================================================================================================
 function cleanXml(str){// remove tags like inkscape:labels 
  var t='';
  var inStr=false;
  var goon=false;
  var goon2=true;
  var c='';
  var d='';
  for(var i=0;i<str.length;i++){
   c=str.substr(i,1);
   if(c==':'){
    if(inStr){
     t+=c;
    }else{
     goon2=true;
     for(var j=t.length-1;j>=0 && goon2==true;j--){
      d=t.substr(j,1);
      if(d==' ' || d=='\r' ||  d=='\n' ||  d=='\t'){
       t=t.substr(0,j);
       goon=true;
       for(var k=i;k<str.length && goon ;k++){
        if(str.substr(k,1)=='"'){ // on trouve le début de "
         for(var l=k+1;l<str.length && goon;l++){
          if(str.substr(l,1)=='"'){
           i=l;
           goon=false;
           break;
          }
         }
        }
       }       
       break;
      }else if(d=='<'){
       t=t.substr(0,j);
       goon2=true;
       var inStr2=false;
       for(var k=i;k<str.length && goon2 ;k++){
        var c1=str.substr(k,1);
        if(c1=='"'){
         if(inStr2==false){
          inStr2=true;
         }else{
          inStr2=false;
         }
        }else if(c1=='>'){
         if(inStr2){
         }else{
          i=k;
          goon=false;
          goon2=false;
          break;
         }
        }
       }
        
      }
     }

    }
   }else if(c=='"'){
    if(inStr){
     inStr=false;
    }else{
     inStr=true;
    }
    t+=c;
   }else{
    t+=c;
   }
  }
//  console.log('clean xml t='+t);
  return t;
 } 
 //========================================================================================================
 function getPointsFromSvgPath(str){
     var tabOri=[];
     var tabAbs=[];
     var tabPts=[];
     var lastx=null;
     var lasty=null;
     var minx=+999999.0;
     var maxx=-999999.0;
     var miny=+999999.0;
     var maxy=-999999.0;
     var px=0,py=0;
     var str0 = str.replace(/[0-9]+-/g, function(v){ return v.slice(0, -1) + " -"; }).replace(/\.[0-9]+/g, function(v){return v.match(/\s/g) ? v : v + " ";});
     str0=str0.replace(/ e/g,'e');
     var keys  = str0.match(/[ZzMmLlHhVvZzCcAaQqTtSs]/g);
     var paths = str0.split(/[ZzMmLlHhVvZzCcAaQqTtSs]/g).filter(
      function(v){ 
       if(v.trim().length > 0){
        return true;
       }else{
        return false;
       }
      }
     ).map(
      function(v){return v.trim()}
     );
//     console.log('str0='+str0+'\nkeys='+keys+'\npaths.length='+paths.length+'\nkeys.length='+keys.length+' paths=',paths);
     var x = 0, y = 0;
     for(var i = 0,indicePath=-1; i<keys.length ; i++){
         indicePath++;
         switch(keys[i]){
             case "z": case "Z": 
             indicePath--;
             if(tabOri.length>0){
              tabOri.push([keys[i]])
              tabAbs.push(['Z']);
              // il faut remonter au dernier M
              for(var j=tabPts.length-1;j>=0;j--){
               if(tabPts[j][0]=='M'){
                tabPts.push(['L',tabPts[j][1],tabPts[j][2]]);
                lastx=tabPts[j][1];
                lasty=tabPts[j][2];
                break;
               }
              }
             }
             break;
             case "M": case "m": case "L": case "l": case "C": case "c": case "Q": case "q": case "T": case "t": case "S": case "s":
 //                console.log( 'paths['+indicePath+']=' + paths[indicePath] );
                 try{
                  var arr = paths[indicePath].split(/[\s,]+/).filter(function(v) { return v.length > 0 }).map(function(v){return parseFloat(v.trim())});
                 }catch(e){
                  console.warn( str , str0 );
                  debugger;
                 }
                 
                 if(keys[i].toLowerCase()=='t'){ // quadratique short
                  var tousLesTableaux=[];
                  if(arr.length==2){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%2===0){
                    for(ll=0;ll<arr.length/2;ll++){
                     tousLesTableaux.push([arr[ll*2+0],arr[ll*2+1]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,str0)//str
                   }
                  }
                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];
                   if(keys[i]=='t'){
                    lastx=lastx+parseFloat(arr[0]);
                    lasty=lasty+parseFloat(arr[1]);
                   }else{
                    lastx=parseFloat(arr[0]);
                    lasty=parseFloat(arr[1]);
                   }
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) ]);
                   
                   tabAbs.push(['T' , lastx , lasty  ]);
                   tabPts.push(['L',lastx,lasty]);

                   
                  }
                  
                 }else if(keys[i].toLowerCase()=='s'){ // comme t mais non quadratique
                 
                  // S x2 y2, x y
 //                   console.log( lastx , lasty );
                  var tousLesTableaux=[];
                  if(arr.length==4){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%4===0){
                    for(ll=0;ll<arr.length/4;ll++){
                     tousLesTableaux.push([arr[ll*4+0],arr[ll*4+1],arr[ll*4+2],arr[ll*4+3]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,str0)//str
                   }
                  }

                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];
                   
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) ]);
                   if(keys[i]=='s'){
                    tabAbs.push(['S' , parseFloat(arr[0])+lastx , parseFloat(arr[1])+lasty , parseFloat(arr[2])+lastx , parseFloat(arr[3])+lasty   ]);
                   }else{
                    tabAbs.push(['S' ,  parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) ]);
                   }
                   if(keys[i]=='s'){
                    lastx=lastx+parseFloat(arr[2]);
                    lasty=lasty+parseFloat(arr[3]);
                   }else{
                    lastx=parseFloat(arr[2]);
                    lasty=parseFloat(arr[3]);
                   }
                   tabPts.push(['L',lastx,lasty]);
                  }
                  
                 }else if(keys[i].toLowerCase()=='q'){
                 
                  var tousLesTableaux=[];
                  if(arr.length==4){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%4===0){
                    for(ll=0;ll<arr.length/4;ll++){
                     tousLesTableaux.push([arr[ll*4+0],arr[ll*4+1],arr[ll*4+2],arr[ll*4+3]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,str0) // str
                   }
                  }
                  
                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];
                   
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) ]);
                   if(keys[i]=='Q'){
                    tabAbs.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) ]);
                   }else{
                    tabAbs.push(['Q' , parseFloat(arr[0])+lastx , parseFloat(arr[1])+lasty , parseFloat(arr[2])+lastx , parseFloat(arr[3])+lasty ]);
                   }
                   if(keys[i]=='q'){
                    lastx=lastx+parseFloat(arr[2]);
                    lasty=lasty+parseFloat(arr[3]);
                   }else{
                    lastx=parseFloat(arr[2]);
                    lasty=parseFloat(arr[3]);
                   }
                   tabPts.push(['L',lastx,lasty]);
                   
                  }
                  
                 }else if(keys[i].toLowerCase()=='c'){
                  
                  var tousLesTableaux=[];
                  if(arr.length==6){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%6===0){
                    for(ll=0;ll<arr.length/6;ll++){
                     tousLesTableaux.push([arr[ll*6+0],arr[ll*6+1],arr[ll*6+2],arr[ll*6+3],arr[ll*6+4],arr[ll*6+5]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,'\n\nstr0='+str0,'\n\nstr='+str,arr.length) // str
                   }
                  }
                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];
                   
                   
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5]) ]);
                   if(keys[i]=='C'){
                    tabAbs.push(['C' , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5]) ]);
                   }else{
                    tabAbs.push(['C' , parseFloat(arr[0])+lastx , parseFloat(arr[1])+lasty , parseFloat(arr[2])+lastx , parseFloat(arr[3])+lasty , parseFloat(arr[4])+lastx , parseFloat(arr[5])+lasty ]);
                   }

                   if(keys[i]=='c'){
                    lastx=lastx+parseFloat(arr[4]);
                    lasty=lasty+parseFloat(arr[5]);
                   }else{
                    lastx=parseFloat(arr[4]);
                    lasty=parseFloat(arr[5]);
                   }
                   tabPts.push(['L',lastx,lasty]);
                   
                  }
                  
                 }else if(keys[i].toLowerCase()=='m'){
                  
                  var tousLesTableaux=[];
                  if(arr.length==2){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%2===0){
                    for(ll=0;ll<arr.length/2;ll++){
                     tousLesTableaux.push([arr[ll*2+0],arr[ll*2+1]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,'\n\nstr0='+str0,'\n\nstr='+str,arr.length) // str
                   }
                  }
                  if(lastx===null){
                   lastx=0;
                  }
                  if(lasty===null){
                   lasty=0;
                  }
                  //OK M 10,10 20 20 30 30 M 50,60
                  //OK m 10,10 20 20 30 30 M 50,60
                  //m 10,10 20 20 30 30 m 10,0
                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];

                   if(i===0 && ll==0 && keys[i]=='m'){
                    // si c'est le premier élément du chemin et que c'est un 'm', on considère que la position de départ est absolue
                    tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) ]);
                    tabAbs.push(['M' , parseFloat(arr[0]) , parseFloat(arr[1])]);
                    lastx=parseFloat(arr[0]);
                    lasty=parseFloat(arr[1]);
                   }else{
                    if(ll>=1){ // si il y a plusieurs points, les suivants sont comme un L/l
                     tabOri.push([keys[i]==='m'?'l':'L' , parseFloat(arr[0]) , parseFloat(arr[1]) ]);
                     if(keys[i]==='M'){
                      tabAbs.push(['L' , parseFloat(arr[0])       , parseFloat(arr[1])]);
                      lastx=parseFloat(arr[0]);
                      lasty=parseFloat(arr[1]);
                     }else{
                      tabAbs.push(['L' , lastx+parseFloat(arr[0]) , lasty+parseFloat(arr[1])]);
                      lastx=parseFloat(arr[0])+lastx;
                      lasty=parseFloat(arr[1])+lasty;
                     }
                    }else{
                     tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) ]);
                     if(keys[i]==='M'){
                      tabAbs.push(['M' , parseFloat(arr[0])       , parseFloat(arr[1])]);
                      lastx=parseFloat(arr[0]);
                      lasty=parseFloat(arr[1]);
                     }else{
                      tabAbs.push(['M' , lastx+parseFloat(arr[0]) , lasty+parseFloat(arr[1])]);
                      lastx=parseFloat(arr[0])+lastx;
                      lasty=parseFloat(arr[1])+lasty;
                     }
                    }
                   }
                   tabPts.push(['M',lastx,lasty]);
                   
                  }

                 }else if(keys[i].toLowerCase()=='l'){
                  
                  for(var t = 0, lenPaths = arr.length ; t < lenPaths ; t+=2){
                   x = (keys[i] == "l" ? lastx : 0) + parseFloat(arr[t]);
                   y = (keys[i] == "l" ? lasty : 0) + parseFloat(arr[t+1]);

                   tabOri.push([keys[i] , parseFloat(arr[t]) , parseFloat(arr[t+1]) ]);
                   if(keys[i] == "l"){
                    tabAbs.push(['L' , lastx+parseFloat(arr[t]) , lasty+parseFloat(arr[t+1])]);
                   }else{
                    tabAbs.push(['L' , parseFloat(arr[t]) , parseFloat(arr[t+1])]);
                   }
                   
                   lastx=x;
                   lasty=y;
                   tabPts.push(['L',lastx,lasty]);
                   
                  }
                  
                 }else{
                  console.warn('%cPourquoi ?','color:yellow;background:red;')
 //                 console.log('X arr=',arr);
                  for(var t = 0, lenPaths = arr.length ; t < lenPaths ; t++){
                   if(t%2 === 0){
                    x = (keys[i] == "l" ? x : 0) + parseFloat(arr[t]);
                    lastx=x;
                   }else{
                    y = (keys[i] == "l" ? y : 0) + parseFloat(arr[t]);
                    lasty=y;
                   }
                   tabPts.push(['L',lastx,lasty]);
                  }
                 }
                 break;
                 
             case "a" : case 'A' :
                 // console.log('TODO arc keys[i]='+keys[i]+' paths[indicePath]='+paths[indicePath]+' str='+str);
                 //   0       1      2               3              4          5       6
                 // a rx      ry     x-axis-rotation large-arc-flag sweep-flag dx      dy     rx      ry     x-axis-rotation large-arc-flag sweep-flag dx      dy
                 // a 3.243   7.691  0               1              1          -6.487  0      3.243   7.691  0               1 1 6.487  0 
                 // a 3       7      0               1              1          -6      0      3       7      0               1 1 6.487  0 
                  var arr = paths[indicePath].split(/[\s,]+/).filter(function(v) { return v.length > 0 });
                  var tousLesTableaux=[];
                  if(arr.length==7){
 //                  console.log('lastx='+lastx+' lasty='+lasty+' , arr=',arr,arr.length );
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5]) , parseFloat(arr[6]) ]);
                   if(keys[i]=='a'){
                    // 183, 96,    350, 105,    167.2423391369542, 167.2423391369542, 0, 1, 0, {}
                    
                    // dex    dey    fix    fiy   rax  ray  ang   grc  ant obj
                    //  0      1      2      3     4    5    6     7    8   9
                    
                    tabAbs.push(['A'     , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5])+lastx , parseFloat(arr[6])+lasty ]);
//                    var ret=computeArcPoints(lastx,lasty,parseFloat(arr[0]),parseFloat(arr[1]),arr[2],arr[3]  , arr[4],lastx+parseFloat(arr[5]),lastx+parseFloat(arr[6]) );
//                    console.log('ret arc relatif=',ret);
                    lastx+=parseFloat(arr[5]);
                    lasty+=parseFloat(arr[6]);
                   }else{
                    tabAbs.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5]) , parseFloat(arr[6]) ]);
//                    var ret=computeArcPoints(lastx,lasty,parseFloat(arr[0]),parseFloat(arr[1]),arr[2],arr[3]  , arr[4],parseFloat(arr[5]),parseFloat(arr[6]) );
                    lastx=parseFloat(arr[5]);
                    lasty=parseFloat(arr[6]);
                   }
                   tabPts.push(['L',lastx,lasty]);
                   
                   
                  }else{
                   if(arr.length%7===0){
                    for(ll=0;ll<arr.length/7;ll++){
                     if(keys[i]=='a'){
                      tabOri.push([keys[i] , parseFloat(arr[ll*7+0]) , parseFloat(arr[ll*7+1]) , parseFloat(arr[ll*7+2]) , parseFloat(arr[ll*7+3]) , parseFloat(arr[ll*7+4]) , parseFloat(arr[ll*7+5])       , parseFloat(arr[ll*7+6])       ]);
                      tabAbs.push(['A'     , parseFloat(arr[ll*7+0]) , parseFloat(arr[ll*7+1]) , parseFloat(arr[ll*7+2]) , parseFloat(arr[ll*7+3]) , parseFloat(arr[ll*7+4]) , parseFloat(arr[ll*7+5])+lastx , parseFloat(arr[ll*7+6])+lasty ]);

                      lastx+=parseFloat(arr[ll*7+5]);
                      lasty+=parseFloat(arr[ll*7+6]);
                     }else{
                      tabOri.push([keys[i] , parseFloat(arr[ll*7+0]) , parseFloat(arr[ll*7+1]) , parseFloat(arr[ll*7+2]) , parseFloat(arr[ll*7+3]) , parseFloat(arr[ll*7+4]) , parseFloat(arr[ll*7+5])       , parseFloat(arr[ll*7+6])       ]);
                      tabAbs.push(['A'     , parseFloat(arr[ll*7+0]) , parseFloat(arr[ll*7+1]) , parseFloat(arr[ll*7+2]) , parseFloat(arr[ll*7+3]) , parseFloat(arr[ll*7+4]) , parseFloat(arr[ll*7+5])       , parseFloat(arr[ll*7+6])       ]);

                      lastx=parseFloat(arr[ll*7+5]);
                      lasty=parseFloat(arr[ll*7+6]);
                     }
                     tabPts.push(['L',lastx,lasty]);
                     
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,str0) // str
                   }
                  }
             
                 break;
             case "V":
                 y = parseFloat(paths[indicePath]);
                 tabOri.push(['V' , y ]);
                 tabAbs.push(['V' , y ]);
                 lasty=y;
                 tabPts.push(['L',lastx,lasty]);
                 break;
             case "v":
                 y=lasty+ parseFloat(paths[indicePath]);

                 tabOri.push([keys[i] , parseFloat(paths[indicePath]) ]);
                 tabAbs.push(['V' , y ]);
                 lasty=y;
                 tabPts.push(['L',lastx,lasty]);
                 break;
             case "H":
                 x = parseFloat(paths[indicePath]);
                 tabOri.push(['H' , x ]);
                 tabAbs.push(['H' , x ]);
                 lastx=x;
                 tabPts.push(['L',lastx,lasty]);
                 break;
             case "h":
                 x=lastx+ parseFloat(paths[indicePath]);
                 tabOri.push([keys[i] , parseFloat(paths[indicePath]) ]);
                 tabAbs.push(['H' , x ]);
                 lastx=x;
                 tabPts.push(['L',lastx,lasty]);
                 break;
             default:
                console.error('non prévu "'+keys[i]+'" str0='+str0)
                break;
                
         }
         if(lastx<minx){minx=lastx;}
         if(lastx>maxx){maxx=lastx;}
         if(lasty<miny){miny=lasty;}
         if(lasty>maxy){maxy=lasty;}
//         console.log('lastx,lasty=',lastx,lasty);
     }
     return { tabOri:tabOri , tabAbs:tabAbs , tabPts:tabPts, sizes:{minx:minx , maxx:maxx , miny:miny , maxy:maxy} };
 }
 //========================================================================================================
 function closePopup(){
//  console.log( 'popUpIsDisplayed1=',popUpIsDisplayed1 );
  if('popupCouleurs'===popUpIsDisplayed1){
   majBout();
  }
  if('popupArbo1'==popUpIsDisplayed1){
   dogid('popupValue').innerHTML='Veuillez patienter svp!'
//   console.log('_dssvg.arbre0=',_dssvg.arbre0);
   afficheArbre0({prendreTout:false});
  }
  popupBackground1.style.display='none'; 
  popupContent1.style.display='none'; 
  popUpIsDisplayed1='';
  dogid('popupValue').innerHTML='';
  
 }
 //========================================================================================================
 function resizePopup(param){
  getSizes();
//  var scrollTopCurrent1=document.documentElement.scrollTop;
  popupBackground1.style.width=xscreen+'px'; 
  popupBackground1.style.height=yscreen+'px'; 
  popupBackground1.style.top=(document.documentElement.scrollTop) + 'px';
  var bodySize=body.getBoundingClientRect();
  
  popupContent1.style.width=(bodySize.width-2*marginPopup)+'px'; 
  popupContent1.style.height=(yscreen-2*marginPopup)+'px'; 
  popupContent1.style.top=(document.documentElement.scrollTop+marginPopup) + 'px';
  popupContent1.style.left=marginPopup+'px';

//  body.style.top=(-scrollTopCurrent1) + 'px';
//  body.style.position='fixed'; 
  dogid('BtnclosPop').style.right=0+'px';
  dogid('BtnclosPop').style.top=-0+'px';
 }
 //========================================================================================================
 function showPopUp(action){
  resizePopup({from:action});
  popupBackground1.style.display='block'; 
  popupContent1.style.display='block'; 
  popUpIsDisplayed1=action;
 }
 //========================================================================================================
 function arrdi10000(x){
  x=Math.round(x*10000)/10000;
  if(_dssvg.aimanterPixel1!==0){
   x=Math.round((x*_dssvg.aimanterPixel1))/_dssvg.aimanterPixel1;
  }
  return x;
 }
 //========================================================================================================
 function getSizes(){
  xscreen = window.innerWidth || document.documentElement.clientWidth || body.clientWidth,
  yscreen = window.innerHeight|| document.documentElement.clientHeight|| body.clientHeight;
//  console.log( xscreen , yscreen )
 } 
 //========================================================================================================
 init();
 //========================================================================================================
 return {
  selColor1           : function(a){ return _selColor1(a);},
  importerSvgEtFermer : function(){importerSvgEtFermer();},
  chargerTest         : function(i){_chargerTest(i);},
  deleteFunction1     : function(i){_deleteFunction1(i);},
  foldFunction1       : function(i){_foldFunction1(i);},
  editFunction1       : function(i){_editFunction1(i);},
  getVariableName     : function(){ return global_variable_name;},
  nop                 : function(){ return null;},
 }
}
var maVariable01=new myObj1({varname:'maVariable01'});