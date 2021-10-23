let uzycie = 0
let maszt = 0
let statki = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
let statekid;
let rotated = false;
let game_start_parametr = false; // potem zmienic na false
let r_gracza = true

let bonus_u = false


const tablica = JSON.parse(JSON.stringify(Array(10).fill(Array(10).fill(0))))
const tablica_strzalow_u = JSON.parse(JSON.stringify(Array(11).fill(Array(11).fill(0))))
const tablica_strzalow_komputer = JSON.parse(JSON.stringify(Array(10).fill(Array(10).fill(0))))

function check(pos) {
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            try {
                if (tablica[pos[0] + i][pos[1] + j] == 1) {
                    return false
                }
            } catch (e) { }
        }
    }
    return true
}

function check_statek(pos) {

    for (let k = 0; k < maszt; k++) {
        if (rotated) {
            if (!(check([pos[0] + k, pos[1]]))) {
                return false
            }
        } else {
            if (!(check([pos[0], pos[1] + k]))) {
                return false
            }
        }
    }
    return true
}


function draw_board() {
    document.getElementById("box").innerHTML = ""
    for (let i = 0; i < tablica.length; i++) {
        for (let j = 0; j < tablica[i].length; j++) {
            let div = document.createElement("div")
            div.classList.add("kwadracik")
            div.id = i + "_" + j
            if (tablica[i][j] == 1) div.classList.add("statek_onboard")
          
            document.getElementById("box").appendChild(div)
            div.addEventListener("mouseover", function () {
                const pos = [i, j]
                if (!rotated && pos[1] + maszt > 10) {
                    pos[1] = 10 - maszt
                } else if (rotated && pos[0] + maszt > 10) {
                    pos[0] = 10 - maszt

                }
                if (check_statek(pos)) {
                    for (let k = 0; k < maszt; k++) {
                        document.getElementById(rotated ? `${pos[0] + k}_${pos[1]}` : `${pos[0]}_${pos[1] + k}`).classList.add("statek_mouseover")
                    }
                } else {
                    for (let k = 0; k < maszt; k++) {
                        document.getElementById(rotated ? `${pos[0] + k}_${pos[1]}` : `${pos[0]}_${pos[1] + k}`).classList.add("statek_mouseoverr")
                    }
                }



                div.addEventListener("click", function () {
                    if(game_start_parametr == false){
                    const pos = [i, j]
                    if (!rotated && pos[1] + maszt > 10) {
                        pos[1] = 10 - maszt
                    } else if (rotated && pos[0] + maszt > 10) {
                        pos[0] = 10 - maszt

                    }


                    if (check_statek(pos)) {
                        for (let k = 0; k < maszt; k++) {
                            if (rotated) {
                                tablica[pos[0] + k][pos[1]] = 1
                            } else {
                                tablica[pos[0]][pos[1] + k] = 1
                            }
                        }
                        let sz = document.getElementById("box1").children

                        for (let i = 0; i < sz.length; i++) {

                            if (sz[i].id == statekid) {
                                sz[i].classList.add("none")
                            }

                        }

                        if (game_start()) {
                            
                            let start_button = document.createElement("div")
                            if(document.getElementById("box3").children.length == 0){
                               
                                start_button.textContent = "Zacznij grę"
                                start_button.classList.add("button_start")
                                document.getElementById("box3").innerHTML = ""
                                document.getElementById("box3").appendChild(start_button)
                            }
                            
                           
                            start_button.addEventListener("click", function () {

                                start_button.classList.add("none")
                                game_start_parametr = true



                            })
                        }
                        maszt = 0

                    }


                    if(game_start_parametr == false){
                        draw_board()
                    }
                }else{
                    alert("Nie ta plansza") /// prawy gorny rog wywoluje to 5 razy fixme!!!
                    
                }
                })
            })
            div.addEventListener("mouseout", function () {

                if(game_start_parametr == false){
                    draw_board()
                }
            })
        }
    }
}



function statek(wielkosc) {
    uzycie += 1
    let statek_box = document.createElement("div")
    for (let i = 0; i < wielkosc; i++) {
        statek_box.id = "statek_box" + uzycie
        let statek = document.createElement("div")
        statek.id = "statek" + uzycie
        statek.classList.add("statek")
        document.getElementById("box1").appendChild(statek_box)
        document.getElementById("statek_box" + uzycie).appendChild(statek)
        statek.addEventListener("click", function () {

            let x = document.getElementsByClassName("statek")
            maszt = 0
            for (let z = 0; z <= x.length - 1; z++) {
                x[z].classList.remove("statek_click")
            }
            for (let i = 0; i < statek_box.children.length; i++) {
                if (statek_box.children[i].classList.contains("statek_click")) {
                    statek_box.children[i].classList.remove("statek_click")
                } else {
                    statek_box.children[i].classList.add("statek_click")
                    maszt++
                }
            }


            return statekid = statek_box.id
        })
        statek.addEventListener("mouseover", function () {
            for (let i = 0; i < statek_box.children.length; i++) {
                statek_box.children[i].classList.add("statek_mouseover")
            }

        })
        statek.addEventListener("mouseout", function () {
            for (let i = 0; i < statek_box.children.length; i++) {
                statek_box.children[i].classList.remove("statek_mouseover")
            }

        })







    }

}
function generuj_statki() {
    for (let i = 0; i < statki.length; i++) {
        statek(statki[i])

    }
}



draw_board()
generuj_statki()


document.getElementById("box").addEventListener("contextmenu", function (ev) {
    ev.preventDefault()
    rotated = !rotated

    draw_board()

}, false)


///// box1

let tablica_b1 = [];
var wym = 10
let dostepne = []
let polozenie;
let maszty = 4;
let losx, losy;

function Render_Tablicy() {
    for (let i = 0; i <= wym + 1; i++) {
        tablica_b1[i] = []
        for (let x = 0; x <= wym + 1; x++) {

            tablica_b1[i][x] = 0;

        }
    }
    for (let i = 1; i <= wym; i++) {
        for (let x = 1; x <= wym; x++) {

            let div = document.createElement("div");
            div.classList.add("kwadracik")
            div.id = i + "-" + x;

            document.getElementById("box2").appendChild(div)
            div.addEventListener("click", function () {

                if (game_start_parametr) {
                   
                    if (r_gracza) {
                        console.log(r_gracza)
                        r_gracz(tablica_b1[i][x], div)
                        console.log(r_gracza)
                       if(!r_gracza){
                     

                        var myfunc03 = function(tablica) {
                            setTimeout(function(){ r_komp(tablica) }, 1000)
                        };
                        
                        var myFunc01 = function() {
                          myfunc03(tablica);
                          
                          setTimeout(function() {
                            if (r_gracza == false) {
                              myFunc01();
                            }
                          }, 1000);
                        }
                        
                        myFunc01();


                    }
                       
                        
                    } else {
                        alert("teraz ruch komputera !")
                        
                       
                    }}
                       
                       
                       
                        // bonusowy strzal dla komputera brak --
                    

                 else {
                    alert("dodaj wszystkie statki !")
                }



            })

        }
    }
}
function polozenie_f() {
    polozenie = Math.floor(Math.random() * (5 - 1) + 1)
    if (polozenie % 2 == 0) {
        return true
    } else {
        return false
    }
}

function check_poziom(maszty) {
    dalej = false
    while (dalej == false) {
        dalej = true
        losx = Math.floor(Math.random() * ((11 - maszty) - 1)) + 1
        losy = Math.floor(Math.random() * (11 - 1) + 1)
       

        for (let i = 0; i < maszty; i++) {
            if (tablica_b1[losx + i][losy] == 0) {

            } else {
                dalej = false;

            }

        }

    }
    return dalej
}
function check_pion(maszty) {
    dalej = false
    while (dalej == false) {
        dalej = true
        losx = Math.floor(Math.random() * (11 - 1) + 1)
        losy = Math.floor(Math.random() * ((11 - maszty) - 1)) + 1
       
        for (let i = 0; i < maszty; i++) {
            if (tablica_b1[losx][losy + i] == 0) {

            }
            else {

                dalej = false;
                

            }

        }
    }
    return dalej
}


function losuj(maszty) {
    if (polozenie_f()) {
        check_poziom(maszty)
        if (dalej) {
            for (let i = -1; i <= maszty; i++) {
                for (let g = -1; g <= 1; g++) {
                    tablica_b1[losx + i][losy + g] = 1
                }
            }
         
       
            for (let i = 0; i < maszty; i++) {
                tablica_b1[losx + i][losy] = 2
                

                document.getElementById((losx + i) + "-" + losy).style.backgroundColor = "red"

            }
        }
    } else {
        check_pion(maszty)
        if (dalej) {
            for (let i = -1; i <= maszty; i++) {
                for (let g = -1; g <= 1; g++) {
                    tablica_b1[losx + g][losy + i] = 1
                }
            }
            for (let i = 0; i < maszty; i++) {
                tablica_b1[losx][losy + i] = 2
                document.getElementById(losx + "-" + (losy + i)).style.backgroundColor = "red"
            }
        }
    }
}
/// gra
function game_start() {

    let elementy = document.getElementById("box1").children

    for (let i = 0; i < elementy.length; i++) {
        if (!(elementy[i].classList.contains("none"))) {
            return false;
        }
    }
    return true;
}
function r_gracz(miejsce, div) {
    let dana1
    let dana2
    if(div.id.length==5){
        dana1 = div.id.substring(0,2)
        dana2 = div.id.substring(3,5)
    }else if(div.id.length ==4 && div.id.substring(0,2)=="10"){
        dana1 = div.id.substring(0,2)
        dana2 = div.id.substring(3,4)
    }else if(div.id.length ==4 && div.id.substring(0,2)=="1-"){
        dana1 = div.id.substring(0,1)
        dana2 = div.id.substring(2,4)
    }else{
        dana1 = div.id.substring(0,1)
        dana2 = div.id.substring(2,3)
    }
    if(tablica_strzalow_u[dana1][dana2] == 0){
        if (miejsce == 2) {
            tablica_strzalow_u[dana1][dana2] = 2
            div.textContent = "X"
            return r_gracza = true
            
        } else{
            tablica_strzalow_u[dana1][dana2] = 1
           
            div.textContent = "o"
            return r_gracza = false
           
        }
    }else{
       
        
        alert("juz strzelales tutaj")
        return r_gracza = true
    }

    
}

function r_komp(miejsce) {
    losmx = Math.floor(Math.random() * (10))
    losmy = Math.floor(Math.random() * (10))
   
 
    if(tablica_strzalow_komputer[losmx][losmy] == 0){
    if (miejsce[losmx][losmy] == 1) {
        console.log("Gratulacje trafiles")
        tablica_strzalow_komputer[losmx][losmy] = 2
        document.getElementById(`${losmx}_${losmy}`).classList.add("traf")
        document.getElementById(`${losmx}_${losmy}`).textContent = "X"
        return r_gracza = false
     

    } else {
        console.log("pudlo")
        tablica_strzalow_komputer[losmx][losmy] = 1
        document.getElementById(`${losmx}_${losmy}`).classList.add("pudlo")
        document.getElementById(`${losmx}_${losmy}`).textContent = "o"
        return r_gracza = true

    }}else{
        return r_gracza = false
    }
        
   
    
   
    

}







Render_Tablicy()



losuj(4)
losuj(3)
losuj(3)
losuj(2)
losuj(2)
losuj(1)
losuj(1)
losuj(1)
losuj(1)

