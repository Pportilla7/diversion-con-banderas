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
        img.addEventListener('click',()=>{
            const ventana=document.createElement('ventana-emergente')
            ventana.innerHTML = `
                <div id="ventana-emergente">
                    <button class="close-btn">Cerrar</button>
                    <img src=${pais.flags[1]}></img>
                    <p>Nombre: ${pais.name.official}</p>
                    <p>Capital: ${pais.capital}</p>
                    <p>Población: ${pais.population}</p>
                    <p>Lado de la carretera: ${pais.car}</p>
                </div>
            `;
            
            console.log(ventana)
            const closeBtn = ventana.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                ventana.remove();
            });

            countriesList.appendChild(ventana);
        });
        let parr_nombre=document.createElement('p');
        parr_nombre.textContent=`${pais.name.official}`

        li.appendChild(img);
        li.appendChild(parr_nombre);
        ul.appendChild(li);
    })

    
    
    countriesList.appendChild(ul);
}


  

