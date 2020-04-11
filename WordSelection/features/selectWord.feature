Feature: Select Word Choices

    Scenario: Load Answer(s)
        Given a list of answers: ["This", "is", "a", "test"]
        When I choose the correct answers ["This", "is", "a", "test"]
        Then the answer validation should return true