

const searchButton = document.getElementById('search-button');
const showinfo = document.getElementById('container-info')
const showError = document.getElementById('errorMessge')
const searchTheUser = document.getElementById('searchingUser')
const API_Key = "uPhudeqCwQTA3gwfbquN"

const searchUserinfo = (e) => {
    showInfoBox(false)
    searchingUser()
    const platform = document.getElementById('all-platforms');
    const userName = document.getElementById('userName');

    let userPlatform = platform.value
    let playerName = userName.value 

    console.log(`user: ${playerName}`)
    console.log(`platform: ${userPlatform}`)
    fetchingData(userPlatform,playerName)
    //resetting the data
    userPlatform = ""
    playerName = ""
    
}

const fetchingData = (userPlatform, player) => {
    fetch(`https://api.mozambiquehe.re/bridge?version=5&platform=${userPlatform}&player=${player}&auth=${API_Key}`)
    .then(resp => resp.json())
    .then(resp => showStats(resp))
    .catch(err => ErrorMessage(err))
}

const searchingUser = (found = false) =>{
    if(found){return searchTheUser.classList.add('hideInfo') }
    if(!found){return searchTheUser.classList.remove('hideInfo') }
}



const ErrorMessage = (err) => {
    console.log(`this is a error message ${err.message}`)
    showInfoBox(false)
    showError.classList.remove('hideInfo')
    setTimeout( () => {
        showError.classList.add('hideInfo')
    }, 3000);
    
}

const showInfoBox = (bool) => {
    if(bool) {return showinfo.classList.remove('hideInfo') }
    if(!bool) {return showinfo.classList.add('hideInfo') }
}



const showStats = (info) => {
    showError.classList.add('hideInfo')
    searchingUser(true)
    showInfoBox(true)
    const player = document.getElementById('player');
    const champ = document.getElementById('champ');
    const kills = document.getElementById('kills');
    const level = document.getElementById('level');
    const battlePass = document.getElementById('battle-pass');
    const rank = document.getElementById('rank');

    const rankName = info.global.rank.rankName 
    const rankDiv = info.global.rank.rankDiv

    player.textContent = info.global.name
    champ.textContent = info.legends.selected.LegendName
    kills.textContent = info.total.kills.value
    level.textContent = info.global.level
    battlePass.textContent = info.global.battlepass.level
    rank.textContent = `${rankName} and div ${rankDiv} `
    
}


searchButton.addEventListener('click',searchUserinfo)