/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

function assertFeedsHaveAttribute(attribute) {
  allFeeds.forEach(function (feed) {
    var value = feed[attribute];
    expect(value).toBeDefined();
    expect(value).toBeTruthy();
  });
}

var bodySelector = $('body');

var checkSideMenuVisibility = function checkSideMenuVisibility() {
  return bodySelector.hasClass('menu-hidden');
};

var menuIconLinkSelector = $('.menu-icon-link');

var clickMenuIconLink = function clickMenuIconLink() {
  menuIconLinkSelector.trigger('click');
};

function checkEqualFeeds(thisFeedEntries, thatFeedEntries) {
  if (thisFeedEntries.length !== thatFeedEntries.length) {
    return false;
  }
  return [].every.call(thisFeedEntries, function (thisFeedEntry, index) {
    return thisFeedEntry['href'] === thatFeedEntries[index]['href'];
  });
}

var extractFeedEntries = function () {
  return $('.feed').children();
};
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */

    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    it('should have a url for each feed', function () {
      assertFeedsHaveAttribute('url');
    });

    it('should have a name for each feed', function () {
      assertFeedsHaveAttribute('name');
    });
  });


  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', function () {

    beforeEach(function () {
      bodySelector.addClass('menu-hidden');
    });

    it('should have the menu element hidden by default', function () {
      // todo how do you start from a fresh webpage
      expect(checkSideMenuVisibility()).toBeTruthy();
    });

    it('should have the menu changes visibility when the menu icon is clicked', function () {
      clickMenuIconLink();
      const isFirstClickVisible = checkSideMenuVisibility();

      clickMenuIconLink();
      const isSecondClickVisible = checkSideMenuVisibility();

      expect(isFirstClickVisible).toBeFalsy();
      expect(isSecondClickVisible).toBeTruthy();
    });
  });

  describe('Initial Entries', function () {
    /**
     * Loads an arbitrary entry
     */
    beforeEach(function callLoadFeed(done) {
      loadFeed(0, done);
    });

    it('should contain an entry element within the feed container', function (done) {
      expect(extractFeedEntries().length).toBeGreaterThan(0);
      done();
    });
  });

  describe('New Feed Selection', function () {
    var originalFeedEntries;

    /**
     * This setups one feed first and record it's contents, then you loads a second one
     */
    beforeEach(function callLoadFeed(done) {
      loadFeed(0, function () {
        originalFeedEntries = extractFeedEntries();
        loadFeed(1, done);
      });
    });


    it('should ensure that the content changes when a new feed is loaded', function (done) {
      var newFeedEntries = extractFeedEntries();
      expect(checkEqualFeeds(originalFeedEntries, newFeedEntries)).toBeFalsy();
      done();
    });
  });
}());
