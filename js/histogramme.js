const maxCol = 10;
let nombreDeBatton = 2;
let tableau = Array(maxCol);
for (let i = 0; i <maxCol; i++) {
    tableau[i] = {
        borneInf : i*2,
        borneSupp : (i+1)*2,
        effectifs : 10,
        amplitude : 2,
        pourcentageAmpli : 0,
        frequence : 0
    }
}

function addTD (idTr,type){
    const newTd = document.createElement('td');
    newTd.id = idTr+"-c" + (nombreDeBatton-1);
    document.getElementById(idTr).appendChild(newTd);
    if (type >= 2){
        return newTd.appendChild(newSpan(idTr,type))
    }
    newTd.appendChild(newInput(idTr, type))
}

function newInput(idTr, type){
    const input = document.createElement('input');
    input.id = idTr+"-input-"+(nombreDeBatton-1)
    if(type === 0){
        input.type = "text";
        input.placeholder = "]0 - 2]"
    }
    else {
        input.type = "number";
        input.min = 0;
        input.placeholder = "..."
    }
    return input;
}

function newSpan(idTr, type){
    const span = document.createElement('span')
    if(type === 2){
        span.id = "ampli-"+(nombreDeBatton-1);
        span.innerText = 0
    }
    else{
        span.id = "titre-"+(nombreDeBatton-1);
        span.innerText = "Batton "+nombreDeBatton
    }
    return span;
}


function ajoutCol(idTr1, idTr2, idTr3, idTitre){
    if (maxCol === nombreDeBatton)
        return ;
    nombreDeBatton++;
    addTD(idTr1,0);
    addTD(idTr2,1);
    addTD(idTr3,2)
    addTD(idTitre, 3)
}

function saveDonnee(){
    let sommeEffectifs = 0
    let sommeAmplitude = 0
    for (let i = 0; i < nombreDeBatton; i++) {
        recupInterVal(i)
        tableau[i].effectifs = document.getElementById("effectifs-input-"+i).value;
        sommeEffectifs += parseInt(tableau[i].effectifs)
        sommeAmplitude += parseInt(tableau[i].amplitude)
    }
    for (let i = 0; i < nombreDeBatton; i++) {
        tableau[i].frequence = tableau[i].effectifs / sommeEffectifs;
        tableau[i].pourcentageAmpli = tableau[i].amplitude / sommeAmplitude;
    }
    ActuGraphique()
    recuperationTailleGraph()
    graduationBot()
}

function recupInterVal (indiceTab){
    const str = document.getElementById(("classes-input-"+indiceTab)).value;
    tableau[indiceTab].borneInf = str.match(/(\d+[\s]*[\-])/g).toString().match(/\d+/g)
    tableau[indiceTab].borneSupp = str.match(/(\-[\s]*[]*\d+)/g).toString().match(/\d+/g)
    tableau[indiceTab].amplitude = Math.abs((tableau[indiceTab].borneSupp - tableau[indiceTab].borneInf));
    document.getElementById("ampli-"+indiceTab).innerText = ""+tableau[indiceTab].amplitude
// regex borneInf = /(\d{1,}[\s]*[\-])/g        borneSupp = /(\-[\s]*[]*\d+)/g      olnydigit = /\d+/g
}

function ActuGraphique(){
    graphique.innerHTML = '';
    for (let i = 0; i < nombreDeBatton; i++) {
        let newDiv = document.createElement('div')
        newDiv.setAttribute("style","width : "+(tableau[i].pourcentageAmpli*100)+
            "%; height : "+(tableau[i].frequence*100/tableau[i].amplitude)+"%;")
        graphique.appendChild(newDiv);
    }

}
// Afaire
//Supprimer toute les div de graphhique avant de relance Actugraphique

function recuperationTailleGraph(){
    const taille = graphique.clientWidth
    histogramme.setAttribute("style", "--taille-graphique : " + (taille + 3) +"px;")
}

function graduationBot() {
    graduationAbs.innerHTML = '';
    for (let i = 0; i < nombreDeBatton; i++) {
        graduationAbs.append(newDiv(i,false))
    }
    graduationAbs.append(newDiv(i-1,true))
}

function newDiv(indice, dernier) {
    const newDiv = document.createElement("div")
    if (!dernier) {
        newDiv.innerText = tableau[indice].borneInf;
        newDiv.setAttribute("style", "margin-right : "+ tableau[indice].pourcentageAmpli*100 + "%;");
        return newDiv
    }
    newDiv.innerText = tableau[indice].borneSupp;
    return newDiv
}


// newDiv.setAttribute("style", "margin-right : "+ tableau[indice].pourcentageAmpli + "%;");
// newDiv.style.marginRight = tableau[indice].pourcentageAmpli;