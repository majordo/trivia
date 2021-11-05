# trivia
Trivia game.



#### Done:
- Yarn monorepo
- Basic front-end
- Mock-up data

## Install
    git clone https://github.com/majordo/trivia.git
    cd trivia
    yarn install
    yarn start
    
## Roadmap

### Front-end  

- Add react-router 
- Improve interface
    - Add Header
    - Add Left side menu
    - Add Leaderboard page
- Improve security
    - Custom hook for managing score calculation
    - Use IIFE for scoping calculation


### Back-end  
- API server with Express
    - Storage SQLite or https://github.com/typicode/lowdb?
    - GET trivia: retrieve data from https://opentdb.com
    - POST user: create new user => username, password, score 
    - PUT user: update user's score => score
    - GET leaders: retrieve leaders list

- ...if time
- Setup dockerized MongoDB
- Setup GraphQL