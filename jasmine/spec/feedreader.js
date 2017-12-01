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

var INITIAL_VISIBILITY = bodySelector.attr('class');

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
    return thisFeedEntry.href === thatFeedEntries[index].href;
  });
}

var extractFeedEntries = function () {
  return $('.feed .entry-link');
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


  describe('The menu', function () {

    /**
     * For this test suite, we would like the visibility of the menu to be constant throughout each
     * test. In order to do this, we first retrieve the state of the menu, which was done initially.
     * Using that initial state, we will ensure that each test will have that state using a nested
     * test spec. This will ensure that all the test are independent. More info about this can be
     * found here:
     * https://discussions.udacity.com/t/feed-reader-persistent-state/459522
     */

    beforeEach(function resetInitialVisibility() {
      bodySelector.removeClass();
      bodySelector.addClass(INITIAL_VISIBILITY);
    });

    it('should have the menu element hidden by default', function () {
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

  describe('Entries', function () {
    /**
     * This beforeEach statement will ensure the initial entry, will be the same for all the entries
     * tests. This is necessary for all tests to be independent
     */
    beforeEach(function callLoadFeed(done) {
      const initialFeedEntry = 0;
      loadFeed(initialFeedEntry, done);
    });

    /**
     * This is a comprehensive test that all the feed entries will be nonempty
     */
    describe('Initial Entries', function () {
      for (var i = 0; i < allFeeds.length; i++) {
        const feedId = i;
        describe('go through feed ' + feedId, function () {
          beforeEach(function callLoadFeed(done) {
            loadFeed(feedId, done);
          });
          it('should contain an entry element within the feed container', function () {
            expect(extractFeedEntries().length).toBeGreaterThan(0);
          });
        });
      }
    });

    describe('New Feed Selection', function () {
      var originalFeedEntries;

      /**
       * This records the contents of the initial feed, then loads a second one
       */
      beforeEach(function callLoadFeed(done) {
        originalFeedEntries = extractFeedEntries();
        loadFeed(1, done);
      });

      it('should ensure that the content changes when a new feed is loaded', function () {
        var newFeedEntries = extractFeedEntries();
        expect(checkEqualFeeds(originalFeedEntries, newFeedEntries)).toBeFalsy();
      });
    });
  });
}());
