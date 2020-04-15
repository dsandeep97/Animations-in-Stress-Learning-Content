Feature: Select Word Choices
    In order to learn about commmunication in my body
    As a student
    I want to select the appropriate word in the sentences and
    recieve feedback on whether I am right or wrong. 

    Scenario: Select Correct Answer(s)
        Given I am on slide 33
        When I select the "correct" answers and submit
        Then I should recieve feedback that I am "correct"

    Scenario: Select Incorrect Answer(s)
        Given I am on slide 33
        When I select the "incorrect" answers and submit
        Then I should recieve feedback that I am "incorrect"

    Scenario: Feedback clears when new selection made
        Given I am on slide 33
        When I select the "correct" answers and submit
        Then I should recieve feedback that I am "correct"
        And clicking a new choice removes the feedback