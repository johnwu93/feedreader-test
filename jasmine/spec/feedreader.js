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

var checkSideMenuVisibility = function (bodySelector) {
  return $(bodySelector).hasClass('menu-hidden');
};

var menuIconLinkSelector = $('.menu-icon-link');

var clickMenuIconLink = function () {
  $(menuIconLinkSelector).trigger('click');
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
      var bodySelector = $('body');
      expect(checkSideMenuVisibility(bodySelector)).toBeTruthy();
    });

    it('should have the menu changes visibility when the menu icon is clicked', function () {
      var bodySelector = $('body');
      clickMenuIconLink();
      expect(checkSideMenuVisibility(bodySelector)).toBeFalsy();

      clickMenuIconLink();
      expect(checkSideMenuVisibility(bodySelector)).toBeTruthy();
    });
  });

  /* TODO: Write a new test suite named "Initial Entries" */

  /* TODO: Write a test that ensures when the loadFeed
   * function is called and completes its work, there is at least
   * a single .entry element within the .feed container.
   * Remember, loadFeed() is asynchronous so this test will require
   * the use of Jasmine's beforeEach and asynchronous done() function.
   */

  /* TODO: Write a new test suite named "New Feed Selection" */

  /* TODO: Write a test that ensures when a new feed is loaded
   * by the loadFeed function that the content actually changes.
   * Remember, loadFeed() is asynchronous.
   */
}());
