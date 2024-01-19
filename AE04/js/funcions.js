let respostaApi = [];

function obtindrePersonatgesAPIPublica() {

    // Aquesta funcio fa una peticio a la API de Harry Potter i guarda la resposta en una variable global.

    fetch('https://hp-api.onrender.com/api/characters')

        .then(response => response.json()) // Transformem la resposta a JSON
        .then(data => {
            if (data && data.length > 0) { 
                // Si la resposta es valida, guardem la resposta en una variable global i mostrem les tarjetes.
                respostaApi = data;
                mostraTarjetes();
            } else {
                // Si la resposta no es valida, mostrem un missatge d'error.
                alert('No se pudo obtener respuesta de la API.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los personajes: ', error);
        });
    ;
}




function mostraTarjetes() {
    // Aquesta funcio mostra les tarjetes de la API publica de Harry Potter.

    const contenidorTarjetes = document.getElementById('tarjetasContainer'); // Obtenim el contenidor de les tarjetes
    contenidorTarjetes.innerHTML = ''; // Esborrem el contingut del contenidor

    for (let i = 0; i < 23 && i < respostaApi.length; i++) { // Recorrem els 23 primers personatges de la resposta, ja que son els que tenen imatge associada.
        const personaje = respostaApi[i];

        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';

        const continguts = document.createElement('div');
        continguts.className = 'contingut';

        //He escollit aquests atributs perque son els que considere mes relevants.
        const atributos = ['Nom', 'Gènere', 'Es Mag', 'Casa', 'Data de Naixement', 'Patronus', 'Actor'];
        atributos.forEach(atributo => {
            // Per cada atribut, creem un element <p> i l'afegim al contenidor.
            const atributoElemento = document.createElement('p');
            atributoElemento.className = 'atributo';
            atributoElemento.textContent = `${atributo}: ${personaje[obtindreNomAtribut(atributo)]}`;
            continguts.appendChild(atributoElemento);
        });

        // Creem un element <img> i l'afegim al contenidor.
        const imagen = document.createElement('img');
        imagen.src = personaje.image;
        imagen.className = 'imagenPersonaje';
        continguts.appendChild(imagen);


        // Creem un element <button> i l'afegim al contenidor.
        const guardarBtn = document.createElement('button');
        guardarBtn.textContent = 'Guardar a la meua API';
        guardarBtn.className = 'botonGuardar';
        guardarBtn.addEventListener('click', function () {
            guardarPersonatge(personaje);
        });
        continguts.appendChild(guardarBtn);

        // Afegim el contingut al contenidor de la tarjeta i la tarjeta al contenidor de les tarjetes.
        tarjeta.appendChild(continguts);
        contenidorTarjetes.appendChild(tarjeta);
    }
}




function mostrarTarjetasBD(data) {

    // Aquesta funcio mostra les tarjetes de la nostra API.
    // El funcionament és pràcticament igual al de la funció anterior, sense el botó de guardar.	

    const tarjetasBDContainer = document.getElementById('tarjetasBDContainer');
    tarjetasBDContainer.innerHTML = '';
    for (let i = 0;i < data.length; i++) {
        const personajeBD = data[i];

        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjetaBD';

        const container = document.createElement('div');
        container.className = 'contingut';

        const atributos = ['Nom', 'Genere', 'Es Mag', 'Casa', 'Data Naixement', 'Patronus', 'Actor'];
        atributos.forEach(atributo => {
            const atributoElemento = document.createElement('p');
            atributoElemento.className = 'atributo';
            atributoElemento.textContent = `${atributo}: ${personajeBD[obtindreNomAtributBD(atributo)]}`;
            container.appendChild(atributoElemento);
        });

        const imagen = document.createElement('img');
        imagen.src = personajeBD.url_imatge;
        imagen.className = 'imagenPersonaje';
        container.appendChild(imagen);

        tarjeta.appendChild(container);
        tarjetasBDContainer.appendChild(tarjeta);
    }
}




function obtindreNomAtribut(atribut) {
    // Aquesta funcio retorna el nom de l'atribut de la API de Harry Potter que correspon a l'atribut que li passem per parametre.
    //L'utilitze per posar els noms en valencià, i afegir espais i majúscules.
    const mapeigAtributs = {
        'Nom': 'name',
        'Gènere': 'gender',
        'Casa': 'house',
        'Data de Naixement': 'dateOfBirth',
        'Patronus': 'patronus',
        'Actor': 'actor',
        'Es Mag': 'wizard',
    };
    return mapeigAtributs[atribut] || atribut;
}


function obtindreNomAtributBD(atribut) {
    // Aquesta funcio retorna el nom de l'atribut de la nostra API que correspon a l'atribut que li passem per parametre.
    //L'utilitze per posar espais i majuscules.
    const mapeigAtributs = {
        'Nom': 'nom',
        'Genere': 'genere',
        'Es Mag': 'es_magic',
        'Casa': 'casa',
        'Data Naixement': 'data_naixement',
        'Patronus': 'patronus',
        'Actor': 'actor',
    };
    return mapeigAtributs[atribut] || atribut;
}

function guardarPersonatge(personaje) {
    // Aquesta funcio guarda el personatge que li passem per parametre a la nostra API.
    $.ajax({
        type: "POST",
        url: "./php/guardaPersonatge.php",
        data: {
            // Aquesta es la informacio que li passem a la nostra API.
            nombre: personaje.name,
            genero: personaje.gender,
            es_magico: personaje.wizard,
            casa: personaje.house,
            fecha_nacimiento: personaje.dateOfBirth,
            patronus: personaje.patronus,
            actor: personaje.actor,
            imagen_url: personaje.image
        },
        success: function (response) {
            alert(response);
        },
        error: function ( error) {
            alert('Error al guardar el personaje:', error);
        }
    });
}


function navegarPag2() {
    // Aquesta funcio navega a la pagina 2.
    window.location.href = "pag2.html";
}

function tornaEnrere(){
    // Aquesta funcio torna a la pagina principal.
    window.location.href = "index.html";
}


function buscarPersonatges() {
    // Aquesta funcio recull el nom que s'ha introduit a la barra de busqueda i crida a la funcio que busca els personatges per nom.
    const nomBusqueda = document.getElementById('barraBusqueda').value;
    buscaPersonatgesPerNom(nomBusqueda);
}

function buscaPersonatgesPerNom(nombre) {
    // Aquesta funcio busca els personatges de la nostra API que contenen el nom que li passem per parametre.
    const url = `./php/recuperaPersonatges.php?nombre=${nombre}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de xarxa: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert('Error al buscar personatges:', data.error);
            } else {
                mostrarTarjetasBD(data.personajes);
            }
        })
        .catch(error => {
            alert('Error al buscar personatges:', error);
        });
}

function obtindreTotsBD() {
    // Aquesta funcio obté tots els personatges de la nostra API.
    const url = './php/recuperaTots.php';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarTarjetasBD(data.personajes);
        })
        .catch(error => {
            alert('Error al obtener personajes de la BD:', error);
        });
}

function eliminaTots() {
    // Aquesta funcio elimina totes les entrades de personatges de la nostra API.
    $.ajax({
        type: "GET",
        url: "./php/eliminaTot.php",
        success: function (response) {
            alert(response.mensaje);
        },
        error: function (error) {
            alert("Error al truncar la tabla: " + error.responseJSON.error);
        }
    });
}
