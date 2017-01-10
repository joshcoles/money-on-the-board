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
  _("phase1").style.display = "none";
  _("phase2").style.display = "block";
}
function processPhase2() {
  campaign_name = _("campaign_name").value;
  description = _("description").value;
  _("phase2").style.display = "none";
  _("phase3").style.display = "block";
}
function processPhase3() {
  charity_name = _("charity_name").value;
  charity_url = _("charity_url").value;
  _("phase3").style.display = "none";
  _("phase4").style.display = "block";
}
function processPhase4() {
  image_url = _("image_url").value;
  hashtag = _("hashtag").value;
  _("phase4").style.display = "none";
  _("show_all_data").style.display = "block";
  _("display_game").innerHTML = game;
  _("display_campaign_name").innerHTML = campaign_name;
  _("display_description").innerHTML = description;
  _("display_charity_name").innerHTML = charity_name;
  _("display_charity_url").innerHTML = charity_url;
  _("display_image_url").innerHTML = image_url;
  _("display_hashtag").innerHTML = hashtag;
}
function submitForm() {
  _("multiphase").method = "post";
  _("multiphase").action = "/campaigns";
  _("multiphase").submit();
}