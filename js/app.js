let usabile = true;
let arrayVPP = [0, 0, 0]

if(localStorage.getItem('vittorie') === null){

    localStorage.setItem('vittorie', 0)
    localStorage.setItem('pareggi', 0)
    localStorage.setItem('perdite', 0)

    let h1Array = document.querySelectorAll('h1')
    let vittorie = h1Array[0]
    let pareggi = h1Array[1]
    let perdite = h1Array[2]

    vittorie.innerHTML = 'Vittorie : ' + arrayVPP[0]
    pareggi.innerHTML = 'Pareggi : ' + arrayVPP[1]
    perdite.innerHTML = 'Perdite : ' + arrayVPP[2]


    arrayVPP = [0, 0, 0]
}else{
    let h1Array = document.querySelectorAll('h1')
    let vittorie = h1Array[0]
    let pareggi = h1Array[1]
    let perdite = h1Array[2]


    vittorie.innerHTML = vittorie.innerHTML.substring(0, vittorie.innerHTML.lastIndexOf('\n')-1)+ " " + localStorage.getItem('vittorie', 0)
    pareggi.innerHTML = pareggi.innerHTML.substring(0, pareggi.innerHTML.lastIndexOf('\n')-1)+ " " + localStorage.getItem('pareggi', 0)
    perdite.innerHTML = perdite.innerHTML.substring(0, perdite.innerHTML.lastIndexOf('\n')-1)+ " " + localStorage.getItem('perdite', 0)
    arrayVPP = [localStorage.getItem('vittorie', 0), localStorage.getItem('pareggi', 0), localStorage.getItem('perdite', 0)]
}

let btnArray = document.querySelectorAll('button')

let sasso = btnArray[0]
let carta = btnArray[1]
let forbici = btnArray[2]
let giocaNuovamente = btnArray[3]

sasso.addEventListener('click', (event)=>{
    event.preventDefault()
    let i = sasso.querySelector('i')
    if(i.getAttribute('class').substring(0, i.getAttribute('class').indexOf(' ')) === 'fa-regular'){
        i.setAttribute('class', 'fa-solid '+i.getAttribute('class').substring(i.getAttribute('class').indexOf(' ')))
    }else{
        i.setAttribute('class', 'fa-regular '+i.getAttribute('class').substring(i.getAttribute('class').indexOf(' ')))
        strClass = 'fa-solid'
    }

    if(usabile){
        isVittoria('sasso')
    }
    carta.disabled = true
    forbici.disabled = true
})
carta.addEventListener('click', (event)=>{
    event.preventDefault()
    let i = carta.querySelector('i')
        i.setAttribute('class', 'fa-solid '+i.getAttribute('class').substring(i.getAttribute('class').indexOf(' ')))
    
    if(usabile){
        isVittoria('carta')
    }
    sasso.disabled = true
    forbici.disabled = true
})
forbici.addEventListener('click', (event)=>{
    event.preventDefault()
    let i = forbici.querySelector('i')
    if(i.getAttribute('class').substring(0, i.getAttribute('class').indexOf(' ')) === 'fa-regular'){
        i.setAttribute('class', 'fa-solid '+i.getAttribute('class').substring(i.getAttribute('class').indexOf(' ')))
    }else{
        i.setAttribute('class', 'fa-regular '+i.getAttribute('class').substring(i.getAttribute('class').indexOf(' ')))
        strClass = 'fa-solid'
    }
    if(usabile){
        isVittoria('forbice')
    }
    sasso.disabled = true
    carta.disabled = true
})


function isVittoria(strMossa){
    let mossa_AI = (Math.round(Math.random() * 3)) == 1 ? 'sasso' : (Math.round(Math.random() * 3)) == 2 ? 'carta' : 'forbice'
    let risultato = ""

    switch (strMossa) {
        case 'sasso':

            switch(mossa_AI){
                case 'sasso':
                    risultato = 'pareggio'
                    arrayVPP[1]++ 
                    break;
                case 'carta':
                    risultato = 'perdita'
                    arrayVPP[2]++ 
                    break;
                default:
                    risultato = 'vittoria'
                    arrayVPP[0]++ 
                    break;
            }
            break;
        case 'carta':
            switch(mossa_AI){
                case 'sasso':
                    risultato = 'vittoria'
                    arrayVPP[0]++ 
                    break;
                case 'carta':
                    risultato = 'pareggio'
                    arrayVPP[1]++ 
                    break;
                default:
                    risultato = 'perdita'
                    arrayVPP[2]++ 
                    break;
            }
            break;
        default:
            switch(mossa_AI){
                case 'sasso':
                    risultato = 'perdita'
                    arrayVPP[2]++ 
                    break;
                case 'carta':
                    risultato = 'vittoria'
                    arrayVPP[0]++ 
                    break;
                default:
                    risultato = 'pareggio'
                    arrayVPP[1]++ 
                    break;
            }
            break;
    }
    //console.log(risultato)
    document.querySelector('.risultato').innerHTML = 'Risultato: ' + risultato
    giocaNuovamente.disabled = false;

    let h1Array = document.querySelectorAll('h1')
    let vittorie = h1Array[0]
    let pareggi = h1Array[1]
    let perdite = h1Array[2] 

    vittorie.innerHTML = 'Vittorie : ' + arrayVPP[0]
    pareggi.innerHTML = 'Pareggi : ' + arrayVPP[1]
    perdite.innerHTML = 'Perdite : ' + arrayVPP[2]

    localStorage.setItem('vittorie', arrayVPP[0])
    localStorage.setItem('pareggi', arrayVPP[1])
    localStorage.setItem('perdite', arrayVPP[2])
    usabile = false;
}

giocaNuovamente.addEventListener('click', (event)=>{
    event.preventDefault()

    sasso.disabled = false
    carta.disabled = false
    forbici.disabled = false

    document.querySelector('.risultato').innerHTML = 'Risultato: '
    usabile = true;
    giocaNuovamente.disabled = true;
})