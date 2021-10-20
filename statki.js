let uzycie = 0
let maszt = 0
let statki = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
let statekid;
let rotated = false;

const tablica = JSON.parse(JSON.stringify(Array(10).fill(Array(10).fill(0))))

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
                        maszt = 0

                    }


                    draw_board()
                })
            })
            div.addEventListener("mouseout", function () {

                draw_board()
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