# Home Library Service - Part 2

## Downloading
- Download application by zip or by command
  ```
  git clone git@github.com:maxsimusprime/nodejs2024Q1-service.git
  ```
- Check containerization-database-orm branch by command
  ```
  git checkout containerization-database-orm
  ```


## Installing
- Install docker on your machine. Docker Desktop on Windows (WSL)
- create .env file in root directory according to .env.example with 4000 port (api.yaml used 4000 port)

## Using application
- Start docker developing server by command inside root directory
  ```
  docker-compose up
  ```
- In order to send command you can use tools like **Insomnia** or **Postman** ( ⚠️ or you can use http://localhost:4000/doc/ SwaggerUI instead )
- Just import api.yaml schema in that tools and you can use cozy UI interface
- Screenshot instruction (Insomnia):

  ![](https://i.ibb.co/2W8FGY0/image.png)
  
  ![](https://i.ibb.co/SdYDKF5/image.png)


## Testing
- To run all tests without authorization

  - install dependencies (in order to get jest)
    ```
    npm install
    ```

  - run test by command
    ```
    npm run test
    ```


## Docker Hub images
https://hub.docker.com/r/maxsin/home-library/tags
- TAG **dev** - for develop version:
- TAG **prod** - for production version:


## Images vulnerability scanning
- run command
  ```
  npm run scan
  ```
