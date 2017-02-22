let game,
    campaign_name,
    description,
    charity_name,
    charity_url,
    image_url,
    hashtag;

function _(x) {
  return document.getElementById(x);
}
function processPhase1() {
  game = _("game").value;
  if(game) {
  _("phase1").style.display = "none";
  _("phase2").style.display = "block";
  } else {
    alert("Please select a game")
  }
}
function processPhase2() {
  campaign_name = _("campaign_name").value;
  description = _("description").value;
  if(campaign_name.length > 0 && description.length > 0) {
  _("phase2").style.display = "none";
  _("phase3").style.display = "block";
  } else {
    alert("Please provide a campaign name and description")
  }
}
function processPhase3() {
  charity_id = _("charity_id").value
  // charity_name = _("charity_name").value;
  // charity_url = _("charity_url").value;
  if(charity_id.length > 0  ) {
  _("phase3").style.display = "none";
  _("phase4").style.display = "block";
  } else {
    alert("Please provide a charity name and donation link")
  }
}
function processPhase4() {
  image_url = _("image_url").value;
  hashtag = _("hashtag").value;
  if(image_url.length > 0 && hashtag.length > 0) {
  _("phase4").style.display = "none";
  _("show_all_data").style.display = "block";
  _("display_game").innerHTML = game;
  _("display_campaign_name").innerHTML = campaign_name;
  _("display_description").innerHTML = description;
  _("display_charity_id").innerHTML = charity_id;
  _("display_image_url").innerHTML = image_url;
  _("display_hashtag").innerHTML = hashtag;
  } else {
    alert("Please provide an image link and Twitter handle")
  }
}
function submitForm() {
  _("multiphase").method = "post";
  _("multiphase").action = "/campaigns";
  _("multiphase").submit();
}
