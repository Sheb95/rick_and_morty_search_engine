
async function getRickAndMorty(){
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data;

}
    //store info in variable

async function getAllRickAndMortyCharacters(){
    const data = await getRickAndMorty();
    const totalPages = data.info.pages;
    let page = 1;
    let collectedData = []; 
    const nextPageURL = data.info.next;
    let active = true;
    try {
        while(active){
            if (page <= totalPages){
                const fetchedData = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
                const newData = await fetchedData.json();
                const characterData = newData.results;
                collectedData.push(characterData);
                page += 1;
            } else {
                active = false; 
                console.log(collectedData);
                return (collectedData);
            }

        } 
    } catch(err){
        console.log(err);
    }
  
}

//function build character card  



   
async function characterInfo(){
    let collectedData =  await getAllRickAndMortyCharacters();
       //gets name
    let html = ``;  
    function getCharacterName(item){
        function buildCharacterCard(character){
            
            html += `
                <div class = "character-card" id=${character.id}>
                    <div class = "character-name">
                        <h2>${character.name}</h2>
                    </div>
                    <div class = "character-img">
                        <img src = "${character.image}" alt = "character photo">
                    </div>
                    <div class = "character-species">
                        <p>Species: ${character.species}</p>
                    </div>
                    <div class = "character-origin">
                        <p>Origin: ${character.origin.name}</p>
                    </div>
                    <div class = "character-status">
                        <p>Status: ${character.status}</p>
                    </div>
                </div>
            `
            console.log(character.name);
        }
        item.forEach(buildCharacterCard);
    }




 collectedData.forEach(getCharacterName);
  
 const characterCards = document.querySelector(".all-characters");

 characterCards.innerHTML = html;

    

}



characterInfo();