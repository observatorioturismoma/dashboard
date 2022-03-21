
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


}
       




