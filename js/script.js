const url = 'https://restcountries.com/v3/all';
const paisObjeto={
    name:'',
    capital:'',
    flags:'',
    population:'',
    car:''
}
const arr_paises=[]


async function getDatos() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No es posible obtener respuesta');
        }
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        throw error;
    }
}

async function getBanderas() {
    try {
        const resultado = await getDatos(url);
        return resultado;
    } catch (error) {
        console.error(error);
    }
}

const arr_banderas=new Promise(async (resolved,rejected)=>{
    try{
        const datos=await getBanderas();
    resolved(datos);
    }
    catch(error){
        rejected(error)
    }
})

arr_banderas.then((datos)=>{
    crearObjetoPais(datos);
})


function crearObjetoPais(arr){
    arr.forEach(element => {
        const { name, capital, flags, population, car } = element;
        const pais = { name, capital, flags, population, car };
        arr_paises.push(pais);
    });
    arr_paises.sort();
    crearListaHtml();
}

function crearListaHtml(){
    const countriesList = document.getElementById('countries-list');
    const ul = document.createElement('ul');
    arr_paises.forEach(pais => {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = pais.flags[1];
        
        li.appendChild(img);

        ul.appendChild(li);
    });
    countriesList.appendChild(ul);
}

