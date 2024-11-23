const carousel = document.getElementById("carousel")

let endereco_1 = "slides/img_gon.jpg"
let endereco_2 = "slides/img_killua.jpg"
let endereco_3 = "slides/img_kurapika.jpg"
let endereco_4 = "slides/img_leorio.jpg"

let array_enderecos = [endereco_1, endereco_2, endereco_3, endereco_4]
const array_elementos = []

function passa_slide (array, sentido){
    let elemento_atual = false
    let elemento_proximo = false
    if (sentido == "right"){
        for (ind in array){
            if (array[ind].show === "on"){
                elemento_atual = array[ind]

                if (parseInt(ind) === array.length-1){
                    elemento_proximo = array[0]
                    elemento_atual.show = ""
                    elemento_proximo.show = "on"

                    animacao(elemento_atual, elemento_proximo, sentido, ind)
                } else {
                    elemento_proximo = array[parseInt(ind)+1]
                    elemento_atual.show = ""
                    elemento_proximo.show = "on"

                    animacao(elemento_atual, elemento_proximo, sentido, ind)
                    break
                }
            } 
        }
    } else {
        for (ind in array){
            if (array[ind].show === "on"){
                elemento_atual = array[ind]

                if (parseInt(ind) === 0){
                    elemento_proximo = array[array.length-1]
                    elemento_atual.show = ""
                    elemento_proximo.show = "on"

                    animacao(elemento_atual, elemento_proximo, sentido, ind)
                    break
                } else {
                    elemento_proximo = array[parseInt(ind)-1]
                    elemento_atual.show = ""
                    elemento_proximo.show = "on"

                    animacao(elemento_atual, elemento_proximo, sentido, ind)
                }
            } 
        }
    }
    
}

function animacao (atual, proximo, sentido, indice){
    atual.style.zIndex = 98
    proximo.style.zIndex = 99
    contador = 0

    if (sentido == 'right'){
        proximo.style.left = "300px"
        atual.style.left = "0px"
        let intervalo = setInterval(()=>{
            proximo.style.left = `${300-contador}px`
            atual.style.left = `${-contador}px`

            contador += 10
            if (contador == 310){
                atual.style.zIndex = indice
                atual.style.left = "0px"
                clearInterval(intervalo)
            }
        }, 10)
    } else {
        proximo.style.left = "-300px"
        atual.style.left = "0px"
        let intervalo = setInterval(()=>{
            proximo.style.left = `${-300+contador}px`
            atual.style.right = `${+contador}px`

            contador += 10
            if (contador == 310){
                atual.style.zIndex = indice
                atual.style.left = "0px"
                clearInterval(intervalo)
            }
        }, 10)
    }
}

for (ele in array_enderecos){
    let elemento = document.createElement("img")
    elemento.setAttribute("src", `${array_enderecos[ele]}`)
    elemento.classList.add("slide")
    elemento.setAttribute("id", `elemento_${parseInt(ele)+1}`)
    elemento.setAttribute("style",`z-index:${parseInt(ele)+1}; top:${ele*-204}px`)
    elemento.show = ""
    array_elementos.push(elemento)
    carousel.appendChild(elemento)
}
array_elementos[array_elementos.length-1].show = "on"

let icon_1 = document.createElement("img")
let icon_2 = document.createElement("img")
icon_1.setAttribute("src", "icon.png")
icon_2.setAttribute("src", "icon.png")

icon_1.classList.add("icon")
icon_2.classList.add("icon")
icon_1.setAttribute("id", "icon_1")
icon_2.setAttribute("id", "icon_2")
icon_1.setAttribute("style", `z-index:100; top:${-1*(-76+(200*array_elementos.length))}px;`)
icon_2.setAttribute("style", `z-index:100; top:${-1*(-76+(200*array_elementos.length))}px;`)
carousel.appendChild(icon_2)
carousel.appendChild(icon_1)

icon_1.addEventListener('click', ()=>{
    passa_slide(array_elementos, "right")
})
icon_2.addEventListener('click', ()=>{
    passa_slide(array_elementos, "left")
})


