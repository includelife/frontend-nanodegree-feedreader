/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* The test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* The test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty and the name's type is string.
         */
         it('names are defined', function() {
             for (var i = 0; i < allFeeds.length; i++) {
                 expect(allFeeds[i].name).toBeDefined();
                 expect(allFeeds[i].name.length).not.toBe(0);
                 expect(typeof allFeeds[i].name).toBe("string");
             }
         });
    });


    /* A new test suite named "The menu" */
    describe('The menu', function() {
        //get the body and menuIcon
        var body = document.body;
        var menuIcon = document.querySelector(".menu-icon-link");

        /* The test that ensures the menu element is
         * hidden by default. By analyze the className with or without
         'menu-hidden' determine it's display or hidden.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });

        /* The test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('icon is clicked to display or hide', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass("menu-hidden")).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });

    });


    /* A new test suite named "Initial Entries" */
    describe('Initial', function() {

        /* The test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        // Avoid duplicated setup and Before loading feed
        beforeEach(function(done) {
            loadFeed(0, function() {
            done();
            });
        });

        /* When the Load "loadFeed" function is called and completesthe
         * the .feed contianer should at least one .entry element
         */
        it('is succeeded', function(done) {
            var entries = document.querySelector(".feed").getElementsByClassName("entry");
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });


    /* A new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* The test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        // Avoid duplicated setup and Initial loaded feed setup
        var initFeedSelection;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initFeedSelection = document.querySelector(".feed").innerHTML;
                loadFeed(1, function() {
                   done();
                });
            });
        });

        /* The loadFeed(0) and loadFeed(1) should have different content
        */
        it('is loaded by the loadFeed function that the content actually changes', function(done) {
            var newFeedSelection = document.querySelector(".feed").innerHTML;
            expect(initFeedSelection).not.toBe(newFeedSelection);
            done();
        });
    });

}());
