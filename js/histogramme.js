let maxCol = 10;
let nombreDeBatton = 2;
let correctionAmpli = 1;

// init tableau
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


// Gestion tableau HTML
/*
    Creer un TD dans le doc html avec sont contenue
*/
function addTD (idTr,type){
    const newTd = document.createElement('td');
    newTd.id = idTr+"-c" + (nombreDeBatton-1);
    document.getElementById(idTr).appendChild(newTd);
    if (type >= 2){
        return newTd.appendChild(newSpan(idTr,type))
    }
    newTd.appendChild(newInput(idTr, type))
}

/*
    Creer et renvoie une balise input
 */
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

/*
    Creer et renvoie une balise span
 */
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


/*
    Prend en paramêtre les id des tr parents et ajout les TD necessaires
 */
function ajoutCol(idTr1, idTr2, idTr3, idTitre){
    if (maxCol === nombreDeBatton)
        return ;
    nombreDeBatton++;
    addTD(idTr1,0);
    addTD(idTr2,1);
    addTD(idTr3,2)
    addTD(idTitre, 3)
}


//Gestion tableau

/*
    Recuperation et sauvegarde des données entrais par l'utilisateur
 */
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
    initCorerctionAmpli();
    ActuGraphique();
    recuperationTailleGraph();
    graduationBot();
}

/*
    Recupere les intervalles et calcul l'amplitude donnée par l'utlisateur
 */
function recupInterVal (indiceTab){
    const str = document.getElementById(("classes-input-"+indiceTab)).value;
    tableau[indiceTab].borneInf = str.match(/(\d+[\s]*[\-])/g).toString().match(/\d+/g)
    tableau[indiceTab].borneSupp = str.match(/([\-][\s]*[]*\d+)/g).toString().match(/\d+/g)
    tableau[indiceTab].amplitude = Math.abs((tableau[indiceTab].borneSupp - tableau[indiceTab].borneInf));
    document.getElementById("ampli-"+indiceTab).innerText = ""+tableau[indiceTab].amplitude
// regex borneInf = /(\d{1,}[\s]*[\-])/g        borneSupp = /(\-[\s]*[]*\d+)/g      olnydigit = /\d+/g
}

/*
    initialise le corecteur pour gerer la hauteur des baton
 */
function initCorerctionAmpli(){
    correctionAmpli = tableau[0].amplitude;
    for (let i = 0; i < nombreDeBatton; i++) {
        if (tableau[i].amplitude < correctionAmpli )
            correctionAmpli = tableau[i].amplitude;
    }
}



//  Gestion visuelle graphique
/*
    Actualise visuelement le grahpique en html / Css
 */
function ActuGraphique(){
    graphique.innerHTML = '';
    for (let i = 0; i < nombreDeBatton; i++) {
        let newDiv = document.createElement('div')
        newDiv.setAttribute("style","width : "+(tableau[i].pourcentageAmpli*100)+
            "%; height : "+(tableau[i].frequence*100/tableau[i].amplitude*correctionAmpli)+"%; --hauteur : "
            +(tableau[i].frequence*100/tableau[i].amplitude*correctionAmpli)+"%;")
        graphique.appendChild(newDiv);
    }

}

/*
    Actualise la taille du graphique html et actualise les barres des de graduation d'ordonnée
 */
function recuperationTailleGraph(){
    let taille = document.getElementById("graphique").clientWidth;
    document.getElementById("histogramme").setAttribute("style", "--taille-graphique : " + (taille + 3) +"px;")
}

/*
    Actualise les graduation des absisse
 */
function graduationBot() {
    let elm = document.getElementById("graduationAbs");
    elm.innerHTML = '';
    for (let i = 0; i < nombreDeBatton; i++) {
        elm.append(newDiv(i,false))
    }
    elm.append(newDiv(i-1,true))
}

/*
    Retourne une div html avec un nombre a l'interieure
 */
function newDiv(indice, dernier) {
    const newDiv = document.createElement("div")
    if (!dernier) {
        newDiv.innerText = tableau[indice].borneInf;
        const correcteur = tableau[indice].borneInf.toString().length
        newDiv.setAttribute("style", "margin-right : calc("+ tableau[indice].pourcentageAmpli*100 + "% - "+(10*correcteur+((indice%2)*10))+"px)");
        return newDiv
    }
    newDiv.innerText = tableau[indice].borneSupp;
    return newDiv
}


//  Teste
/*
nombreDeBaton = 5
tableau = [
    {
        "borneInf": [
            "0"
        ],
        "borneSupp": [
            "10"
        ],
        "effectifs": "25",
        "amplitude": 10,
        "pourcentageAmpli": 0.14285714285714285,
        "frequence": 0.09090909090909091
    },
    {
        "borneInf": [
            "10"
        ],
        "borneSupp": [
            "20"
        ],
        "effectifs": "75",
        "amplitude": 10,
        "pourcentageAmpli": 0.14285714285714285,
        "frequence": 0.2727272727272727
    },
    {
        "borneInf": [
            "20"
        ],
        "borneSupp": [
            "40"
        ],
        "effectifs": "100",
        "amplitude": 20,
        "pourcentageAmpli": 0.2857142857142857,
        "frequence": 0.36363636363636365
    },
    {
        "borneInf": [
            "40"
        ],
        "borneSupp": [
            "50"
        ],
        "effectifs": "50",
        "amplitude": 10,
        "pourcentageAmpli": 0.14285714285714285,
        "frequence": 0.18181818181818182
    },
    {
        "borneInf": [
            "50"
        ],
        "borneSupp": [
            "70"
        ],
        "effectifs": "25",
        "amplitude": 20,
        "pourcentageAmpli": 0.2857142857142857,
        "frequence": 0.09090909090909091
    },
    {
        "borneInf": 10,
        "borneSupp": 12,
        "effectifs": 10,
        "amplitude": 2,
        "pourcentageAmpli": 0,
        "frequence": 0
    },
    {
        "borneInf": 12,
        "borneSupp": 14,
        "effectifs": 10,
        "amplitude": 2,
        "pourcentageAmpli": 0,
        "frequence": 0
    },
    {
        "borneInf": 14,
        "borneSupp": 16,
        "effectifs": 10,
        "amplitude": 2,
        "pourcentageAmpli": 0,
        "frequence": 0
    },
    {
        "borneInf": 16,
        "borneSupp": 18,
        "effectifs": 10,
        "amplitude": 2,
        "pourcentageAmpli": 0,
        "frequence": 0
    },
    {
        "borneInf": 18,
        "borneSupp": 20,
        "effectifs": 10,
        "amplitude": 2,
        "pourcentageAmpli": 0,
        "frequence": 0
    }
]

*/


