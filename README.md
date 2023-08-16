# NRGforum web app with Angular

    Forum web application based on asking questions and writing answers.

## Technology and overview:

    "NRGforum" is web application built with Angular.
    Uses google cloud API for file storage and also provides functionality for two types of users:
        - registered ones
        - guests

    Private part - for registered members
        Registered and logged in user can:
            1. create new theme/topic he wants to start discussion on.
            2. preview each theme in details
                - can view themes' posts and likes
                - can create posts on themes
            3. like/unlike other users' posts on a certain theme
                - can like/unlike his own posts as well
            4. subscribe/unsubscribe to themes
                - user can't use subscription functionality on his own themes
            5. view and update his profile information
            5. every user can upload profile picture

    Public part - accessible to all site visitors
    All visitors can:
        1. view brief information about published themes
        2. use search - filter themes by typing theme title
        3. preview each theme in details
            - can only preview themes' posts likes and subscription
