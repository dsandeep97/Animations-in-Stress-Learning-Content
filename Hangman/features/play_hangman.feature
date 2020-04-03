Feature: Play Hangman
    
    Scenario Outline: Load hangman word(s)
        Given a formatted sentence <sentence>
        When I load the hangman words
        Then the list of words should be <words>

        Examples: 
            | sentence                                                              | words                     |
            | "This doesn't have any words to guess"                                | n/a                       | 
            | "Guess the next word: ?test?"                                         | test;                     |
            | "Try filling in this ?blank? without getting ?hanged?"                | blank;hanged;             |
            | "The...made up of ?nerves? and has...the ?autonomic? and ?somatic?"   | nerves;autonomic;somatic; |

    # Scenario: Guess letters
    #     Given a formatted sentence "Try filling in this ?blank? without getting ?hanged?" 
    #     When I load the hangman words
    #     And I guess the following letters
    #         | l | 
    #         | a | 
    #         | r | 
    #         | t | 
    #         | z | 
    #     Then I should see Wrong Guesses: 3 of 8