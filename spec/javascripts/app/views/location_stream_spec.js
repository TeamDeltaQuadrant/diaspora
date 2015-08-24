describe("app.views.LocationMap", function() {
  beforeEach(function(){
    this.post = factory.post();
    this.view = new app.views.LocationStream({model : this.post});
  });

  describe("toggleMap", function() {
    context("with location provided", function() {
      beforeEach(function(){
        this.post.set({location : factory.location()}); // set location
        gon.appConfig = { map: {enabled: true, mapbox: {enabled: true, id: "yourID", accessToken: "yourAccessToken" }} };
        this.view.render();
      });

      it("should contain a map container", function() {
        expect(this.view.$el[0]).toContainElement(".mapContainer");
      });

      it("should initialize map", function() {
        expect(this.view.$el.find(".mapContainer")[0]).toHaveClass("empty");
        this.view.toggleMap();
        expect(this.view.$el.find(".mapContainer")[0]).not.toHaveClass("empty");
      });

      it("should change display status on every click", function() {
        // this.view.toggleMap();
        // console.log($(".mapContainer"));
        // expect($(".mapContainer")).toHaveCss({display: "none"});
        // expect($(".mapContainer")[0]).toBeVisible();
        // this.view.toggleMap();
        // console.log($(".mapContainer"));
        // expect($(".mapContainer")).toHaveCss({display: "none"});
        expect(this.view.$(".mapContainer")[0]).not.toBeVisible();
        console.log(this.view.$(".mapContainer")[0]);
        this.view.toggleMap();
        console.log(this.view.$(".mapContainer")[0]);
        expect(this.view.$(".mapContainer")[0]).toBeVisible();
        this.view.toggleMap();
        expect(this.view.$(".mapContainer")[0]).not.toBeVisible();
      });
    }),
    context("without location provided", function() {
      it("should not initialize the map", function() {
        expect(this.view.$el[0]).not.toContainElement(".mapContainer");
      });
    });
  });
});
