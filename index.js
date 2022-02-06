

const searchButton = document.getElementById('search-button');
const showinfo = document.getElementById('container-info')
const showError = document.getElementById('errorMessge')
const searchTheUserButton = document.getElementById('searchingUser')
const userName = document.getElementById('userName')
const API_Key = "uPhudeqCwQTA3gwfbquN"

const searchUserinfo = (e) => {
    // console.log(userName.value)
    const validatePlayerNameCheck = infoCheckFields(userName.value)
    if(!validatePlayerNameCheck) {return}
    ResetPageInfo()
    showInfoBox(false)
    searchingUser()
    const platform = document.getElementById('all-platforms');
    

    let userPlatform = platform.value
    let playerName = userName.value 

    // console.log(`user: ${playerName}`)
    console.log(`platform: ${userPlatform}`)
    fetchingData(userPlatform,playerName)
    //resetting the data
    //userPlatform = ""
    
    
}

const fetchingData = (userPlatform, player) => {
    fetch(`https://api.mozambiquehe.re/bridge?version=5&platform=${userPlatform}&player=${player}&auth=${API_Key}`)
    .then(resp => resp.json())
    .then(resp => ShowResponse(resp))
    .catch(err => ErrorMessage(err))
    userName.value = ""
}



const searchingUser = (found = false) =>{
    if(found){return searchTheUserButton.classList.add('hideInfo') }
    if(!found){return searchTheUserButton.classList.remove('hideInfo') }
}



const ErrorMessage = (err) => {
    searchTheUserButton.classList.add('hideInfo')
    const errorDiv = document.getElementById('errorMessge')
    const errorTitle = document.createElement('h1')
    errorTitle.textContent = err
    errorDiv.append(errorTitle)
    showInfoBox(false)
    showError.classList.remove('hideInfo')
    setTimeout( () => {
        showError.classList.add('hideInfo')
        errorTitle.remove()
    }, 2000);
    
}

const infoCheckFields = (playerAccount) => {
    console.log(playerAccount.length)
    if(playerAccount.length <= 0 ) {
        ErrorMessage("need to enter username")
        return false
    }
    if(playerAccount.length > 0 ) {
        return true
    }
}

const showInfoBox = (bool) => {
    if(bool) {return showinfo.classList.remove('hideInfo') }
    if(!bool) {return showinfo.classList.add('hideInfo') }
}

const showRankImage = (rankImg) => {
    const container = document.getElementById('rank-container')
    const newRankImg = document.createElement('img')
    newRankImg.id = "rank-img"
    newRankImg.src = rankImg
    container.appendChild(newRankImg)
}

const showChampImage = (champImg) => {
    const container = document.getElementById('champ-container')
    const newChampImg = document.createElement('img')
    newChampImg.id = "champ-img"
    newChampImg.src = champImg
    container.append(newChampImg)
}



const ShowResponse = (info) => {
    if(info.Error) {
        ErrorMessage(info.Error)
        return
    }
    showError.classList.add('hideInfo')
    searchingUser(true)
    showInfoBox(true)
    showPlayerData(info)
    showRankImage(info.global.rank.rankImg)
    showChampImage(info.legends.selected.ImgAssets.icon)
    
}

const showPlayerData = (info) => {
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
    kills.textContent = info.legends.selected.data[0].value
    level.textContent = info.global.level
    battlePass.textContent = info.global.battlepass.level
    rank.textContent = `${rankName} and div ${rankDiv} `
}



const ResetPageInfo = () => {
    const rankElement = document.getElementById('rank-img')
    const champElement = document.getElementById('champ-img')
    const checkingElements = document.body.contains(rankElement) || document.body.contains(champElement);
    if(checkingElements){
        rankElement.remove()
        champElement.remove()
    }
}



searchButton.addEventListener('click',searchUserinfo)
userName.addEventListener('keyup',(e) =>{
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
      console.log("searching")
      searchUserinfo(e)
      e.preventDefault();
     
    }
  })
