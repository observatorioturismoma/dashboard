
let municipios = "";
let polos = "";

let agencias = "";
let acampamentos = "";
let casasEsp = "";
let centroConven = "";
let empreenApoio = "";
let empreenEntreteni = "";
let guiaMEI = "";
let guiaPF = "";
let locadoraVeiculo = "";
let meioHosp = "";
let organiEvent = "";
let parqueTema = "";
let prestEsp = "";
let prestServInfra = "";
let restBarCafe = "";
let transpTur = "";

let urlA = './data/dimension-tables/municipios.json';
let urlB = './data/dimension-tables/polos.json';

let url1  = './data/fact-tables/agencias.json';
let url2  = './data/fact-tables/acampamentos.json';
let url3  = './data/fact-tables/casasEsp.json';
let url4  = './data/fact-tables/centroConven.json';
let url5  = './data/fact-tables/empreenApoio.json';
let url6  = './data/fact-tables/empreenEntreteni.json';
let url7  = './data/fact-tables/guiaMEI.json';
let url8  = './data/fact-tables/guiaPF.json';
let url9  = './data/fact-tables/locadoraVeiculo.json';
let url10 = './data/fact-tables/meioHosp.json';
let url11 = './data/fact-tables/organiEvent.json';
let url12 = './data/fact-tables/parqueTema.json';
let url13 = './data/fact-tables/prestEsp.json';
let url14 = './data/fact-tables/prestServInfra.json';
let url15 = './data/fact-tables/restBarCafe.json';
let url16 = './data/fact-tables/transpTur.json';

const promiseMunicipios = Promise.resolve(fetch(urlA))
const promisePolos = Promise.resolve(fetch(urlB))

const promiseAgencias =         Promise.resolve(fetch(url1))
const promiseAcamp =            Promise.resolve(fetch(url2));
const promiseCasasEsp =         Promise.resolve(fetch(url3));
const promiseCentroConven =     Promise.resolve(fetch(url4));
const promiseEmpreenApoio =     Promise.resolve(fetch(url5));
const promiseEmpreenEntreteni = Promise.resolve(fetch(url6));
const promiseGuiaMEI =          Promise.resolve(fetch(url7));
const promiseGuiaPF =           Promise.resolve(fetch(url8));
const promiseLocadoraVeiculo =  Promise.resolve(fetch(url9));
const promiseMeioHosp =         Promise.resolve(fetch(url10));
const promiseOrganiEvent =      Promise.resolve(fetch(url11));
const promiseParqueTema =       Promise.resolve(fetch(url12));
const promisePrestEsp =         Promise.resolve(fetch(url13));
const promisePrestServInfra =   Promise.resolve(fetch(url14));
const promiseRestBarCafe =      Promise.resolve(fetch(url15));
const promiseTranspTur =        Promise.resolve(fetch(url16));

Promise.all([promiseMunicipios,
            promisePolos,
            promiseAgencias,
            promiseAcamp,
            promiseCasasEsp,
            promiseCentroConven, 
            promiseEmpreenApoio, 
            promiseEmpreenEntreteni,
            promiseGuiaMEI, 
            promiseGuiaPF, 
            promiseLocadoraVeiculo,
            promiseMeioHosp,
            promiseOrganiEvent,
            promiseParqueTema, 
            promisePrestEsp,
            promisePrestServInfra,
            promiseRestBarCafe, 
            promiseTranspTur]).then(res => {
    
        res[0]  .json().then(res => {municipios = res});
        res[1]  .json().then(res => {polos = res});
        res[2]  .json().then(res => {agencias = res});
        res[3]  .json().then(res => {acampamentos = res});
        res[4]  .json().then(res => {casasEsp = res});
        res[5]  .json().then(res => {centroConven = res});
        res[6]  .json().then(res => {empreenApoio = res});
        res[7]  .json().then(res => {empreenEntreteni = res});
        res[8]  .json().then(res => {guiaMEI = res});
        res[9]  .json().then(res => {guiaPF = res});
        res[10] .json().then(res => {locadoraVeiculo = res});
        res[11] .json().then(res => {meioHosp= res});
        res[12] .json().then(res => {organiEvent = res});
        res[13] .json().then(res => {parqueTema = res});
        res[14] .json().then(res => {prestEsp = res});
        res[15] .json().then(res => {prestServInfra = res});
        res[16] .json().then(res => {restBarCafe = res});
        res[17] .json().then(res => {transpTur = res});

});

setTimeout(main, 1000);


function main() {

    

    ////////////////////// populate municipios list
    
    const datalistMunicipios = document.querySelector("#municipios");
    
    function populateAllMuni() {
        
        municipios.forEach( municipio => {
            let option = document.createElement("option");
            option.value = municipio.municipio_nome;
            option.textContent = municipio.municipio_nome;
            datalistMunicipios.appendChild(option);
        });
    }
    populateAllMuni();

    ///////////////////// populate polos list

    const datalistPolos = document.querySelector("#polos");
    polos.forEach( polo => {
        let option = document.createElement("option");
        option.value = polo.polo_name;
        option.textContent = polo.polo_name
        datalistPolos.appendChild(option);
    });

    /////////////////// populate with municipios by polo
    function populateMunicipioByPolo (poloX) {

        deleteAllChildren();
        let foundPoloId = "";
        polos.forEach(polo => {
            if (poloX === polo.polo_name) {
                 foundPoloId = polo.polo_id;
            }
        })

        municipioByPoloList = [];


        let totalOption = document.createElement("option");
                    totalOption.value = "Total";
                    totalOption.textContent = "Total";
                    datalistMunicipios.appendChild(totalOption);
        
        

        municipios.forEach( municipio => {
                if (municipio.polo_id == foundPoloId){
                    let option = document.createElement("option");
                    option.value = municipio.municipio_nome;
                    option.textContent = municipio.municipio_nome;
                    municipioByPoloList.push(municipio.municipio_nome); //using this loop to populate a list and calculate total sum of individual counts
                    datalistMunicipios.appendChild(option);

                }
            })
        updateIndicadorByPolo();
        
    }
    
    let municipioByPoloList = [];

    function updateIndicadorByPolo () {

        let totalCount = 0;
        
       
            for (let indicador of indicadores) {
                
                totalCount = 0;
                
                for(let municipio of municipioByPoloList) {  
                    let indicadorSelected = document.querySelector(`#${indicador}`);
                    
                    if (municipio == null){
                        indicadorSelected.value = "-";
                    } else {
                        totalCount += countIndicador(municipio, indicador);
                        indicadorSelected.value = totalCount;
                    }
            }
       }
    }
    


    ////////////////// remove child nodes 
    function deleteAllChildren() {
        
        //e.firstElementChild can be used.
        var child = datalistMunicipios.lastElementChild; 
        while (child) {
            datalistMunicipios.removeChild(child);
            child = datalistMunicipios.lastElementChild;
        }
    }
    
    const inputPolo = document.querySelector("#polos");
    const inputMuni = document.querySelector("#municipios");
    

    function cleanMuni () {
        inputMuni.value = "";
    }
    function cleanPolo () {
        inputPolo.value = "";
    }


    const closeBtnMuni = document.querySelector(".close-btn-muni");
    closeBtnMuni.addEventListener("click", () => {
        cleanMuni();
        updateIndicador(null);
    });

    const closeBtnPolo = document.querySelector(".close-btn-polo");
    closeBtnPolo.addEventListener("click", () => {
        populateAllMuni();
        cleanMuni();
        cleanPolo();
        updateIndicador(null);
    });
        

    inputMuni.addEventListener("change", () => {
       let municipio = inputMuni.value;
       
       updateIndicador(municipio);
       if(inputMuni.value === "Total") {
        updateIndicadorByPolo ();
    }
    
    })





    

    inputPolo.addEventListener("change", () => {
        let polo = inputPolo.value;
        cleanMuni();
        populateMunicipioByPolo(polo);
        
    })

    





    function countIndicador(municipio, indicador) {
        
        let count = 0;
        eval(indicador).forEach(indi => {
            if(indi["Município"] === municipio){
                count++;
            }
        });
        return count;
    }
    function updateIndicador(municipio) {
        for (let indicador of indicadores) {
            let indicadorSelected = document.querySelector(`#${indicador}`);
            if (municipio == null){
                indicadorSelected.value = "-";
            } else {
                indicadorSelected.value = countIndicador(municipio, indicador);
            }
        }
    }

    let indicadores = ["agencias",
    "acampamentos",
    "casasEsp",
    "centroConven",
    "empreenApoio",
    "empreenEntreteni",
    "guiaMEI",
    "guiaPF",
    "locadoraVeiculo",
    "meioHosp",
    "organiEvent",
    "parqueTema",
    "prestEsp",
    "prestServInfra",
    "restBarCafe",
    "transpTur"]

    const elemH1 = document.querySelector("h1");
    const backgroundDiv = document.querySelector(".background");

    const backBtn = document.createElement("img");
    backBtn.src = "./images/back.png"
    backBtn.classList.add("back-btn");

    function generateCardsFromIndicador(indicador, titulo) {

        
        backgroundDiv.insertBefore(backBtn, elemH1);

        elemH1.textContent = titulo;

        toggleSelectorAndIndicadores();

        const entriesContainer = document.createElement("div");
        

        entriesContainer.classList.add("entries-container");

        if (indicador == "guiaPF") {
            for(let i = 0; i < eval(indicador).length; i++){
            let entryDiv = document.createElement("div");
            let entryTitle = document.createElement("h4");
            let entryNumber = document.createElement("span");
            let entryEmail = document.createElement("span");
            let entryWebsite = document.createElement("span");

            entryTitle.textContent = eval(indicador)[i]["Nome Completo"];
            entryNumber.textContent = `Telefone: ${eval(indicador)[i]["Telefone"]};`
            entryEmail.textContent = `Email: ${eval(indicador)[i]["E-mail Alternativo/Comercial"]}`;
            entryWebsite.textContent = `Website: ${eval(indicador)[i]["Website"]}`;

            entryDiv.appendChild(entryTitle);
            entryDiv.appendChild(entryNumber);
            entryDiv.appendChild(entryEmail);
            entryDiv.appendChild(entryWebsite);

            entryDiv.classList.add("card");
            entryDiv.classList.add("flex-item");

            entriesContainer.appendChild(entryDiv);
        }
        } else {

            for(let i = 0; i < eval(indicador).length; i++){

                let entryDiv = document.createElement("div");
                let entryTitle = document.createElement("h4");
                let entryNumber = document.createElement("span");
                let entryAddress = document.createElement("span");
                let entryEmail = document.createElement("span");
                let entryWebsite = document.createElement("span");

                entryTitle.textContent = eval(indicador)[i]["Nome Fantasia"];
                entryNumber.textContent = `Telefone: ${eval(indicador)[i]["Telefone Comercial"]};`
                entryAddress.textContent = `Endereço: ${eval(indicador)[i]["Endereço Completo Comercial"]}`;
                entryEmail.textContent = `Email: ${eval(indicador)[i]["E-mail Comercial"]}`;
                entryWebsite.textContent = `Website: ${eval(indicador)[i]["Website"]}`;


                entryDiv.appendChild(entryTitle);
                entryDiv.appendChild(entryAddress);
                entryDiv.appendChild(entryNumber);
                entryDiv.appendChild(entryEmail);
                entryDiv.appendChild(entryWebsite);

                entryDiv.classList.add("card");
                entryDiv.classList.add("flex-item");

                entriesContainer.appendChild(entryDiv);
                
            }
        }
        backgroundDiv.appendChild(entriesContainer);


    }
    // const body = document.querySelector("body");
    // body.addEventListener("click", toggleSelectorAndIndicadores);


    function removeEntries () {
        const entriesContainer = document.querySelector(".entries-container")
        backgroundDiv.removeChild(entriesContainer);
        backgroundDiv.removeChild(backBtn);
    }

    backBtn.addEventListener("click", () => {
        elemH1.textContent = "Indicadores Turismo MA"
        removeEntries();
        toggleSelectorAndIndicadores();
    })


    const agenciasCard = document.querySelector(".card-agencias");
    const acampamentosCard = document.querySelector(".card-acampamentos");
    const casasEspCard = document.querySelector(".card-casasEsp");
    const centroConvenCard = document.querySelector(".card-centroConven");
    const empreenApoioCard = document.querySelector(".card-empreenApoio");
    const empreenEntreteniCard = document.querySelector(".card-empreenEntreteni");
    const guiaMEICard = document.querySelector(".card-guiaMEI");
    const guiaPFCard = document.querySelector(".card-guiaPF");
    const locadoraVeiculoCard = document.querySelector(".card-locadoraVeiculo");
    const meioHospCard = document.querySelector(".card-meioHosp");
    const organiEventCard = document.querySelector(".card-organiEvent");
    const parqueTemaCard = document.querySelector(".card-parqueTema");
    const prestEspCard = document.querySelector(".card-prestEsp");
    const prestServInfraCard = document.querySelector(".card-prestServInfra");
    const restBarCafeCard = document.querySelector(".card-restBarCafe");
    const transpTurCard = document.querySelector(".card-transpTur");


    agenciasCard.addEventListener("click", () => {
        let titulo = "Agências";
        generateCardsFromIndicador(indicadores[0], titulo);
    });

    acampamentosCard.addEventListener("click", () => {
        let titulo = "Acampamentos";
        generateCardsFromIndicador(indicadores[1], titulo);
    });
    
    casasEspCard.addEventListener("click", () => {
        let titulo = "Casas de Espetáculo";
        generateCardsFromIndicador(indicadores[2], titulo);
    });
    
    centroConvenCard.addEventListener("click", () => {
        let titulo = "Centros de Convenções";
        generateCardsFromIndicador(indicadores[3], titulo);
    });
    
    empreenApoioCard.addEventListener("click", () => {
        let titulo = "Empreendimentos de Apoio ao Turismo";
        generateCardsFromIndicador(indicadores[4], titulo);
    });
    
    empreenEntreteniCard.addEventListener("click", () => {
        let titulo = "Empreendimentos de Entretenimento";
        generateCardsFromIndicador(indicadores[5], titulo);
    });
    
    guiaMEICard.addEventListener("click", () => {
        let titulo = "Guias Turísticos MEI";
        generateCardsFromIndicador(indicadores[6], titulo);
    });
    
    guiaPFCard.addEventListener("click", () => {
        let titulo = "Guias Turísticos Pessoa Física";
        generateCardsFromIndicador(indicadores[7], titulo);
    });
    
    locadoraVeiculoCard.addEventListener("click", () => {
        let titulo = "Locadoras de Veículos";
        generateCardsFromIndicador(indicadores[8], titulo);
    });
    
    meioHospCard.addEventListener("click", () => {
        let titulo = "Meios de Hospedagem";
        generateCardsFromIndicador(indicadores[9], titulo);
    });
    
    organiEventCard.addEventListener("click", () => {
        let titulo = "Organizadoras de Eventos";
        generateCardsFromIndicador(indicadores[10], titulo);
    });
    
    parqueTemaCard.addEventListener("click", () => {
        let titulo = "Parques Temáticos";
        generateCardsFromIndicador(indicadores[11], titulo);
    });
    
    prestEspCard.addEventListener("click", () => {
        let titulo = "Prestadores de Serviços Especializados";
        generateCardsFromIndicador(indicadores[12], titulo);
    });
    
    prestServInfraCard.addEventListener("click", () => {
        let titulo = "Prestadores de Serviços de Infraestrutura";
        generateCardsFromIndicador(indicadores[13], titulo);
    });
    
    restBarCafeCard.addEventListener("click", () => {
        let titulo = "Restaurantes, Bares & Afins";
        generateCardsFromIndicador(indicadores[14], titulo);
    });
    
    transpTurCard.addEventListener("click", () => {
        let titulo = "Transportadoras Turísticas";
        generateCardsFromIndicador(indicadores[15], titulo);
    });
    
    


    function toggleSelectorAndIndicadores () {
        const selectorDiv = document.querySelector(".selector");
        const indicadoresSection = document.querySelector(".indicadores");

        selectorDiv.classList.toggle("opacity-zero");
        indicadoresSection.classList.toggle("opacity-zero");
       // elemH1.classList.toggle("opacity-zero")

        setTimeout(() => {
            selectorDiv.classList.toggle("display-none");
            indicadoresSection.classList.toggle("display-none");
        //    elemH1.classList.toggle("display-none");
        },1000);
    }
    
}
       



