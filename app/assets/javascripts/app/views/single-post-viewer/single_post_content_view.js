// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-v3-or-Later

app.views.SinglePostContent = app.views.Base.extend({
  templateName: 'single-post-viewer/single-post-content',
  tooltipSelector: "time, .post_scope",

  subviews : {
    "#single-post-actions" : "singlePostActionsView",
    '#single-post-moderation': "singlePostModerationView",
    '#real-post-content' : 'postContentView',
    ".oembed" : "oEmbedView",
    ".opengraph" : "openGraphView",
    ".status-message-location" : "postLocationStreamView",
    '.poll': 'pollView',
  },

  initialize : function() {
    this.singlePostActionsView = new app.views.SinglePostActions({model: this.model});
    this.singlePostModerationView = new app.views.SinglePostModeration({model: this.model});
    this.oEmbedView = new app.views.OEmbed({model : this.model});
    this.openGraphView = new app.views.SPVOpenGraph({model : this.model});
    this.postContentView = new app.views.ExpandedStatusMessage({model: this.model});
    this.pollView = new app.views.Poll({ model: this.model });
  },

  postLocationStreamView : function(){
    return new app.views.LocationStream({ model : this.model});
  },

  presenter : function() {
    return _.extend(this.defaultPresenter(), {
      authorIsCurrentUser :app.currentUser.isAuthorOf(this.model),
      showPost : this.showPost(),
      text : app.helpers.textFormatter(this.model.get("text"), this.model.get("mentioned_people"))
    });
  },

  showPost : function() {
    return (app.currentUser.get("showNsfw")) || !this.model.get("nsfw");
  },

  map: function() {
    var coordinates = this.model.get("coordinates");

    // if (coordinates != "" && tileserver.enable) {  // for when the tileserver is set via the diaspora.yml
    if (coordinates.lat) {
      $( ".map" ).append( "<div id='map'></div>" ); // this needs a new subview?
      var tileLayerSource = "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}";
      var map = L.map("map").setView([coordinates.lat, coordinates.lng], 16);
      var attribution = "Map data &copy; <a href='http://openstreetmap.org'>OpenStreetMap</a> contributors, " +
                        "<a href='http://creativecommons.org/licenses/by-sa/2.0/''>CC-BY-SA</a>, " +
                        "Imagery © <a href='http://mapbox.com'>Mapbox</a>";

      L.tileLayer(tileLayerSource, {
        attribution:  attribution,
        maxZoom: 18,
        id: "zaziemo.mpn66kn8",
        accessToken: "pk.eyJ1IjoiemF6aWVtbyIsImEiOiI3ODVjMzVjNmM2ZTU3YWM3YTE5YWYwMTRhODljM2M1MSJ9.-nVgyS4PLnV4m9YkvMB5wA"
      }).addTo(map);
      
      var markerOnMap = L.marker(coordinates).addTo(map);

      return map;
    }
  },

  postRenderTemplate : function(){
    _.defer(_.bind(this.map, this));
  }
});
// @license-end
