function populate(selectTeam, selectPlayer) {
  var team = document.getElementById(selectTeam);
  var player = document.getElementById(selectPlayer);
  player.innerHTML = "";
  if(team.value == JSON.stringify(home_id) ) {
    var optionArray = JSON.stringify(home_roster)
  } else if(team.value == JSON.stringify(away_id) ) {
    var optionArray = JSON.stringify(away_roster) 
  }
  for(var index in optionArray) {
    var newOption = document.createElement("option");
    newOption.value = optionArray[index].id
    newOption.innerHTML = optionArray[index].name
    player.options.add(newOption);
  }
}
