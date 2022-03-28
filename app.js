
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

const promiseMunicipios = fetch(urlA);
const promisePolos = fetch(urlB);

const promiseAgencias =         fetch(url1);
const promiseAcamp =            fetch(url2);
const promiseCasasEsp =         fetch(url3);
const promiseCentroConven =     fetch(url4);
const promiseEmpreenApoio =     fetch(url5);
const promiseEmpreenEntreteni = fetch(url6);
const promiseGuiaMEI =          fetch(url7);
const promiseGuiaPF =           fetch(url8);
const promiseLocadoraVeiculo =  fetch(url9);
const promiseMeioHosp =         fetch(url10);
const promiseOrganiEvent =      fetch(url11);
const promiseParqueTema =       fetch(url12);
const promisePrestEsp =         fetch(url13);
const promisePrestServInfra =   fetch(url14);
const promiseRestBarCafe =      fetch(url15);
const promiseTranspTur =        fetch(url16);

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

// Having fetched all information from the JSON files, now we begin working with them

setTimeout(main, 1000); // 1 sec timeout to allow info be fetched

function main() {


    let indicadores = ["agencias", //this array will be used to dynamically count values and insert them into indicadores
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
    
    const datalistMunicipios = document.querySelector("#municipios");
    
    ///////////////////// populate polos list

    const datalistPolos = document.querySelector("#polos");
    polos.forEach( polo => {
        let option = document.createElement("option");
        option.value = polo.polo_name;
        option.textContent = polo.polo_name
        datalistPolos.appendChild(option);
    });

    /////////////////// populate with municipios by polo

    let municipioByPoloList = [];


    function getPoloIDFromName(poloName) {
        let poloID = "";
        if(poloName == "Estado") {
            return "Estado";
        } else {
            
            polos.forEach(polo => {
                if (poloName === polo.polo_name) {
                    poloID = polo.polo_id;
                    
                }
            });
        }
        return poloID;
    }

    function updateMunicipioByPoloList () {

        let selectedPolo = inputPolo.value;

        municipioByPoloList = [];

        let foundPoloID = getPoloIDFromName(selectedPolo);
        console.log(foundPoloID);
        
        if (foundPoloID == "Estado"){
            municipios.forEach( municipio => {
                municipioByPoloList.push(municipio.municipio_nome);
            });
        } else {            
            municipios.forEach( municipio => {
                if (municipio.polo_id == foundPoloID){
                    municipioByPoloList.push(municipio.municipio_nome);
                }
            });
        }        
    }


    function populateMunicipioByPolo () {

        deleteAllChildren(); // begin by clearing out all children in the select input tag

        updateMunicipioByPoloList();

        let totalOption = document.createElement("option");
        totalOption.value = "Todos os Municípios";
        totalOption.textContent = "Todos os Municípios";
        datalistMunicipios.appendChild(totalOption);

        for(let municipio of municipioByPoloList) {
                let option = document.createElement("option");
                option.value = municipio;
                option.textContent = municipio;
                datalistMunicipios.appendChild(option);
        }
        updateIndicadorByPolo();
    }
    
    
    /////////////// Update each indicador

    // using the push method from the populateMunicipioByPolo() we can now calculate individually

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
    // we use this to repopulate select tags appropriately
    
    function deleteAllChildren() {
        
        let child = datalistMunicipios.lastElementChild; 
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

    inputMuni.addEventListener("change", () => {
       let municipio = inputMuni.value;
       
       updateIndicador(municipio);

        if(municipio === "Todos os Municípios") {
            updateMunicipioByPoloList();
            updateIndicadorByPolo();
        } else {
            municipioByPoloList = [];
            municipioByPoloList.push(municipio);
        }
        setFilters();
    
    })
    populateMunicipioByPolo();

    inputPolo.addEventListener("change", () => {
        
        cleanMuni();
        populateMunicipioByPolo();
        setFilters();
        
    })

    ///////// Count indicador
    // this function counts each indicador and returns the result to updateIndicador later on

    function countIndicador(municipio, indicador) {
        
        let count = 0;
        eval(indicador).forEach(indi => {
            if(indi["Município"] === municipio){
                count++;
            }
        });
        return count;
    }

    //////// Update Indicador
    // after counting the indicadores from countIndicador, we dynamically set the values for each of them

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



    const elemH1 = document.querySelector("h1");
    const backgroundDiv = document.querySelector(".background");

    const backBtn = document.createElement("img");
    backBtn.src = "./images/back.png"
    backBtn.classList.add("back-btn");

    function generateCardsFromIndicador(indicador, titulo) {

        // console.log(inputPolo.value);
        // console.log(inputMuni.value);

        const fonteSegmentada = segmentarArquivosJSON(municipioByPoloList);

        let indicadorSelecionado = "";

        for(let fonte of fonteSegmentada) {
            if(indicador === fonte["Nome do Indicador"]) {
                indicadorSelecionado = fonte;
            }
        }
        
        console.log(fonteSegmentada);
        console.log(indicadorSelecionado);

        backgroundDiv.insertBefore(backBtn, elemH1);
        elemH1.textContent = titulo;
        toggleSelectorAndIndicadores();
        const entriesContainer = document.createElement("div");
        entriesContainer.classList.add("entries-container");

        const filterMSGContainer = document.createElement("div");
        filterMSGContainer.classList.add("filter-div");
        const filterMSGElem = document.createElement("p");
        filterMSGElem.textContent = getFilterMSG();
        filterMSGContainer.appendChild(filterMSGElem);
        entriesContainer.appendChild(filterMSGContainer);

        
            if(indicadorSelecionado["Nome do Indicador"] == "guiaPF") {

                for(let i = 0; i < indicadorSelecionado.Entradas.length; i++){
                    let entryDiv = document.createElement("div");
                    let entryTitle = document.createElement("h4");
                    let entryNumber = document.createElement("span");
                    let entryEmail = document.createElement("span");
                    let entryWebsite = document.createElement("span");
    
                    entryTitle.textContent = indicadorSelecionado.Entradas[i]["Nome Completo"];
                    entryNumber.textContent = `Telefone: ${indicadorSelecionado.Entradas[i]["Telefone"]};`
                    entryEmail.textContent = `Email: ${indicadorSelecionado.Entradas[i]["E-mail Alternativo/Comercial"]}`;
                    entryWebsite.textContent = `Website: ${indicadorSelecionado.Entradas[i]["Website"]}`;
    
                    entryDiv.appendChild(entryTitle);
                    entryDiv.appendChild(entryNumber);
                    entryDiv.appendChild(entryEmail);
                    entryDiv.appendChild(entryWebsite);
    
                    entryDiv.classList.add("card");
                    entryDiv.classList.add("flex-item");
    
                    entriesContainer.appendChild(entryDiv);
                }

            } else {
                for(let i = 0; i < indicadorSelecionado.Entradas.length; i++){
                    let entryDiv = document.createElement("div");
                    let entryTitle = document.createElement("h4");
                    let entryNumber = document.createElement("span");
                    let entryAddress = document.createElement("span");
                    let entryEmail = document.createElement("span");
                    let entryWebsite = document.createElement("span");
    
                    entryTitle.textContent = indicadorSelecionado.Entradas[i]["Nome Fantasia"];
                    entryNumber.textContent = `Telefone: ${indicadorSelecionado.Entradas[i]["Telefone Comercial"]};`
                    entryAddress.textContent = `Endereço: ${indicadorSelecionado.Entradas[i]["Endereço Completo Comercial"]}`;
                    entryEmail.textContent = `Email: ${indicadorSelecionado.Entradas[i]["E-mail Comercial"]}`;
                    entryWebsite.textContent = `Website: ${indicadorSelecionado.Entradas[i]["Website"]}`;
    
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
   
    let filtroLocal = "";
    let filtroRegional = "";

    function setFilters() {
        filtroLocal = inputMuni.value;
        filtroRegional = inputPolo.value;

        console.log(getFilterMSG());
    }

    setFilters();
    
    function getFilterMSG() {
        let filterMSG = "Resultados: ";

        if (filtroRegional === "Estado" && filtroLocal === "Todos os Municípios") {
            filterMSG += "todo o Maranhão";
        } else if (filtroRegional !== "Estado" && filtroLocal === "Todos os Municípios") {
            filterMSG += filtroRegional;
        } else {
            filterMSG += filtroLocal;
        }

        return filterMSG;
    }    
    
    function segmentarArquivosJSON(arrayOfMunicipios) {

        const dadosSegmentados = [];

        for(let indicador of indicadores) {
            const indicadorSegmentado = {                
                "Nome do Indicador": indicador,
                "Entradas": []
            }
            for(let i = 0; i < eval(indicador).length; i++){
                arrayOfMunicipios.forEach( municipio => {
                    if(municipio === eval(indicador)[i]["Município"]) {                    
                        indicadorSegmentado.Entradas.push(eval(indicador)[i]);
                    }
                })
                
            }
            dadosSegmentados.push(indicadorSegmentado);
        }
        return dadosSegmentados;
    }   

}