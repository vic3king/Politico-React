module.exports = {
  'Title is Politico': browser => {
    // Browser is the browser that is being controlled
    browser
      .url('http://localhost:8080') // Navigate to the url
      .waitForElementVisible('body', 5000) // Wait until you can see the body element.
      .verify.title('Politico') // Verify that the title is 'Politico'
      // .assert.attributeEquals('#showcase > img', 'http://localhost:8080/assets/images/bb3a85e829ed968bb81ff5114c2be0fe-election-vote-ballot.jpg')
      .end(); // This must be called to close the browser at the end
  },
};
