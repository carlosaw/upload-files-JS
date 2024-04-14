let inputTypeFile = document.querySelector("input[type='file']");
let selectedImg;
let condition = true;
let hasEdit = false;

function starUpload(){
    inputTypeFile.click();
    inputTypeFile.value = "";
    condition = true;
    clicou();
}

function clicou() {
    if (condition == true) {
        let p =  new Promise((resolve, reject) => {
            if (inputTypeFile.value == "") {
                null
            } else {
                resolve('Imagem Carregada');
                    condition = false;
            }
        });
        p.then(function() {
            let image = inputTypeFile.files[0];
            let url = URL.createObjectURL(image);
            let divPrevious = document.querySelector(".add-img");    
            divPrevious.innerHTML = '';
            divPrevious.style.backgroundImage = `url('${url}')`;
            divPrevious.style.backgroundSize = 'cover'
            divPrevious.style.backgroundPosition = 'center'

            selectedImg = url;
        });
        p.catch();
    }
    
}

setInterval(clicou, 1000);

function salvarThumb(title, description, image) {
    let url;
    if (hasEdit == false) {
        title = document.getElementById("img-title").value;
        description = document.getElementById("img-resume").value;
        image = selectedImg;
        let areaHTML = document.querySelector(".area");
        let contentHTML =  `<div class="item-thumbnail">
                                <img src="${selectedImg}" alt="">
                                <div class="texts">
                                    <h3>${title}</h3>
                                    <p>${description}</p>
                                </div>
                                <div class="item-options">
                                    <span class="material-icons" title="Editar" onclick="editElement(this)">edit</span>
                                    <span class="material-icons" title="Deletar" onclick="deleteElement(this)">delete</span>
                                </div>
                            </div>`    
        areaHTML.innerHTML += contentHTML;
    } else {
        title = document.getElementById("img-title").value;
        description = document.getElementById("img-resume").value;
        document.querySelector(".editSelected .texts h3").textContent = title;
        document.querySelector(".editSelected .texts p").textContent = description;
        document.querySelector(".editSelected img").setAttribute('src', selectedImg);

    } 

    limparPreenchimento();
    limparClasses();
}

function limparPreenchimento() {
    document.getElementById("img-title").value = '';
    document.getElementById("img-resume").value = '';
    document.querySelector(".add-img").style.background = 'rgb(247, 247, 255)';
    document.querySelector(".add-img").innerHTML = `<span class="material-icons">upload_file</span><p>Add Imagem</p>`;
}

function limparClasses() {
    function clearClass(element) {
        element.classList.remove("editSelected");
    }
    document.querySelectorAll(".editSelected").forEach(clearClass);
    hasEdit = false;
}

function editElement(element) {
    hasEdit = true;
    let dadElement = element.parentNode;
    dadElement = dadElement.parentNode;
    dadElement = dadElement.classList.add("editSelected");
    let imageToEdit = document.querySelector(".editSelected img").currentSrc;
    let titleToEdit = document.querySelector(".editSelected .texts h3").textContent;
    let resumeToEdit = document.querySelector(".editSelected .texts p").textContent;

    function upToEdit(i,t,r) {
        i = imageToEdit;
        t = titleToEdit;
        r = resumeToEdit;
        document.getElementById("img-title").value = t;
        document.getElementById("img-resume").value = r;
        document.querySelector(".add-img").innerHTML = '';
        document.querySelector(".add-img").style.backgroundImage = `url('${i}')`;
        document.querySelector(".add-img").style.backgroundSize = 'cover';
        document.querySelector(".add-img").style.backgroundPosition = 'center';
    }
    upToEdit();   
}

function deleteElement(element) {
    let dadElement = element.parentNode;
    dadElement = dadElement.parentNode;
    dadElement.remove();
}