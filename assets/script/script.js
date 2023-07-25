// declarando valores
var dirtyEnergy = 0;
var cleanEnergy = 0;
var halfCoin = 0;
var fullCoin = 0;
var level = 1;

// declarando sistema de nivel
var upLevel = 0;

// declarando elementos html
var energySaida = document.querySelector(".energy");
var cleanEnergySaida = document.querySelector(".cleanEnergy");
var halfCoinSaida = document.querySelector(".halfCoin");
var coinSaida = document.querySelector(".coin");
var levelSaida = document.querySelector(".level");

// declarando delay
var delayDirty = false;
var delayClean = false;
var delayMine = false;
var delayBuild = false;
var noDelay = false;

// sistema de upar level
function sistemaLevel() {
    if(upLevel == 100) {
        upLevel = 0;
        level += 1;
        levelSaida.innerHTML = level;
        alerta(`You <span class="colored">leveled up</span> from level to level <span class="colored">${level}</span>!`, 4000);
        salvarDados();
    } else {
        upLevel += 1;
        salvarDados();
    }
}

// coletar energia suja
function collectDirtyEnergy() {
    const chanceClear = Math.floor(Math.random() * (500-2) + 2);
    
    if(noDelay == false && delayDirty == false) {
        if(chanceClear <= level) {
            cleanEnergy += 1;
            cleanEnergySaida.innerHTML = cleanEnergy;
            sistemaLevel();
            salvarDados();
            delayDirty = true;

            setTimeout(() => {
                delayDirty = false;
            }, 2000);
        } else {
            dirtyEnergy += 1;
            energySaida.innerHTML = dirtyEnergy;
            sistemaLevel();
            salvarDados();  
            delayDirty = true;  
            
            setTimeout(() => {
                delayDirty = false;
            }, 2000);
        }
    } else if(noDelay == true) {
        if(chanceClear <= level) {
            cleanEnergy += 1;
            cleanEnergySaida.innerHTML = cleanEnergy;
            sistemaLevel();
            salvarDados();
        } else {
            dirtyEnergy += 1;
            energySaida.innerHTML = dirtyEnergy;
            sistemaLevel();
            salvarDados();  
        }
    } else {
        alerta(`You need to wait <span class="colored">2 seconds</span> before collect energy again`, 2000);
    }
}

// limpar energia
function clearEnergy() {
    
    if(noDelay == false && delayClean == false) {
        if(dirtyEnergy >= 10) {
            dirtyEnergy -= 10;
            cleanEnergy += 1;
            cleanEnergySaida.innerHTML = cleanEnergy;
            energySaida.innerHTML = dirtyEnergy;
            sistemaLevel();
            salvarDados();
            delayClean = true;  

            setTimeout(() => {
                delayClean = false;
            }, 5000)
        } else {
            alerta(`You don't have <span class="colored">enough energy</span> to clean it (10 dirty energy)`, 4000);
        }
    } else if(noDelay == true) {
        if(dirtyEnergy >= 10) {
            dirtyEnergy -= 10;
            cleanEnergy += 1;
            cleanEnergySaida.innerHTML = cleanEnergy;
            energySaida.innerHTML = dirtyEnergy;
            sistemaLevel();
            salvarDados();
        } else {
            alerta(`You don't have <span class="colored">enough energy</span> to clean it (10 dirty energy)`, 4000);
        }
    } else {
        alerta(`You need to wait <span class="colored">5 seconds</span> before clear energy again`, 4000);
    }
}

// minerar moeda
function mineCrypto() {
    const chanceCoin = Math.floor(Math.random() * (1000-2) + 2);
    
    if(noDelay == false && delayMine == false) {
        if(chanceCoin <= level && cleanEnergy >= 50) {
            cleanEnergy -= 50;
            halfCoin += 1;
            halfCoinSaida.innerHTML = halfCoin;
            cleanEnergySaida.innerHTML = cleanEnergy;
            sistemaLevel();
            salvarDados();
            delayMine = true;   

            setTimeout(() => {
                delayMine = false;
            }, 10000);
        } else if(cleanEnergy >= 50) {
            cleanEnergy -= 50;
            halfCoin += 1;
            halfCoinSaida.innerHTML = halfCoin;
            cleanEnergySaida.innerHTML = cleanEnergy;
            sistemaLevel();
            salvarDados();
            delayMine = true;   

            setTimeout(() => {
                delayMine = false;
            }, 10000);
        } else {
            alerta(`You don't have <span class="colored">enough energy</span> to mine it. (50 clean energy)`, 4000);
        }
    } else if(noDelay == true) {
        if(chanceCoin <= level && cleanEnergy >= 50) {
            cleanEnergy -= 50;
            halfCoin += 1;
            halfCoinSaida.innerHTML = halfCoin;
            cleanEnergySaida.innerHTML = cleanEnergy;
            sistemaLevel();
            salvarDados();
        } else if(cleanEnergy >= 50) {
            cleanEnergy -= 50;
            halfCoin += 1;
            halfCoinSaida.innerHTML = halfCoin;
            cleanEnergySaida.innerHTML = cleanEnergy;
            sistemaLevel();
            salvarDados();
        } else {
            alerta(`You don't have <span class="colored">enough energy</span> to mine it. (50 clean energy)`, 4000);
        }
    } else {
        alerta(`You need to wait <span class="colored">10 seconds</span> before mine a half coin again`, 4000);
    }
}

// fabricar moeda
function buildCrypto() {
    
    if(noDelay == false && delayMine == false) {
        if(halfCoin >= 100) {
            halfCoin -= 100;
            fullCoin += 1;
            coinSaida.innerHTML = fullCoin;
            halfCoinSaida.innerHTML = halfCoin;
            sistemaLevel();
            salvarDados();
            delayMine = true;   

            setTimeout(() => {
                delayMine = false;
            }, 20000);
        } else {
            alerta(`You don't have <span class="colored">enough half coins</span> to mine it. (100 half crypto)`, 4000);
        }
    } else if(noDelay == true) {
        if(halfCoin >= 100) {
            halfCoin -= 100;
            fullCoin += 1;
            coinSaida.innerHTML = fullCoin;
            halfCoinSaida.innerHTML = halfCoin;
            sistemaLevel();
            salvarDados();
        } else {
            alerta(`You don't have <span class="colored">enough half coins</span> to mine it. (100 half crypto)`, 4000);
        }
    } else {
        alerta(`You need to wait <span class="colored">20 seconds</span> before mine a half coin again`, 2000);
    }
}

// alerta
function alerta(texto, tempo) {
    var divAlerta = document.createElement("div");
    var pAlerta = document.createElement("p");

    pAlerta.innerHTML = texto;

    divAlerta.classList.add("alerta");

    document.body.appendChild(divAlerta);
    divAlerta.appendChild(pAlerta);

    setTimeout(() => {
        divAlerta.remove();
    }, tempo);
}

// funcao header scroll
const header = document.querySelector(".header")
let scrollAntigo = 0;

window.addEventListener("scroll", function() {
  const scrollAtual = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollAtual < scrollAntigo) {
    header.style.position = "fixed";
  } else {
    header.style.position = "absolute";
  }

  scrollAntigo = scrollAtual;
});


// buy level
function buyLevel() {
    if(halfCoin >= 350) {
        halfCoin -= 350;
        level += 1;
        levelSaida.innerHTML = level;
        halfCoinSaida.innerHTML = halfCoin;
        salvarDados();
    } else if(fullCoin >= 50) {
        fullCoin -= 50;
        level += 1;
        levelSaida.innerHTML = level;
        coinSaida.innerHTML = fullCoin;
        salvarDados();
    } else {
        alerta(`You <span class="colored">don't have</span> the necessary items to buy it.`, 4000);
    }
}

// buy delay
function buyDelay() {
    if(halfCoin >= 450) {
        halfCoin -= 450;
        noDelay = true;
        setTimeout(() => {
            noDelay = false;
            alerta(`Your item <span class="colored">"no delay"</span> has run out.`, 4000)
        }, 300000)
        halfCoinSaida.innerHTML = halfCoin;
        salvarDados();
    } else if(fullCoin >= 70) {
        fullCoin -= 70;
        noDelay = true;
        setTimeout(() => {
            noDelay = false;
            alerta(`Your item <span class="colored">"no delay"</span> has run out.`, 4000)
        }, 300000)
        coinSaida.innerHTML = fullCoin;
        salvarDados();
    } else {
        alerta(`You <span class="colored">don't have</span> the necessary items to buy it.`, 4000);
    }
}

// Salvar dados
function salvarDados() {
    var salvarDirtyEnergy = dirtyEnergy;
    var salvarCleanEnergy = cleanEnergy;
    var salvarHalfCoin = halfCoin;
    var salvarFullCoin = fullCoin;
    var salvarLevel = level;
    var salvarUpLevel = upLevel;
    var salvarDelay = noDelay;
  
    var arrayDados = [];
    arrayDados.push(salvarDirtyEnergy, salvarCleanEnergy, salvarHalfCoin, salvarFullCoin, salvarLevel, salvarUpLevel, salvarDelay);
  
    var dadosToJson = JSON.stringify(arrayDados);
  
    localStorage.setItem("dados", dadosToJson);
  }
  
  // Recuperar dados
  
  function recuperarDados() {
    var dados = localStorage.getItem("dados");
    var dadosToArray = JSON.parse(dados);
  
    if (Array.isArray(dadosToArray) && dadosToArray.length === 7) {
      dirtyEnergy = dadosToArray[0];
      cleanEnergy = dadosToArray[1];
      halfCoin = dadosToArray[2];
      fullCoin = dadosToArray[3];
      level = dadosToArray[4];
      upLevel = dadosToArray[5];
      noDelay = dadosToArray[6];
  
      energySaida.innerHTML = dirtyEnergy;
      cleanEnergySaida.innerHTML = cleanEnergy;
      halfCoinSaida.innerHTML = halfCoin;
      coinSaida.innerHTML = fullCoin;
      levelSaida.innerHTML = level;
    }
  }
  
  recuperarDados();

// bug no delay
if(noDelay ==  true) {
    setTimeout(() => {
        noDelay = false;
        alerta(`Your item <span class="colored">"no delay"</span> has run out.`, 4000)
    }, 300000)
}