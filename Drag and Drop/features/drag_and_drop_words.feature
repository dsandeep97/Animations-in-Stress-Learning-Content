Feature: Drag and Drop words
  In order to learn the parts of the Neuron
  As a student
  I want to drag and drop words to the appropriate blanks and
  receive feedback

  Scenario: Parts of the Neuron are correctly labeled
    Given I am on slide 24
    When I drag and drop words to the blanks "correctly"
    Then I should see "Correct!"