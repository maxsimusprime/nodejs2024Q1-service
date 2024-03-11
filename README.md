# Home Library Service

## Downloading
- Download application by zip or by command
  ```
  git clone git@github.com:maxsimusprime/nodejs2024Q1-service.git
  ```
- Check develop branch by command
  ```
  git checkout develop
  ```


## Installing
- Install dependencies
  ```
  npm install
  ```
- create .env file in root directory according to .env.example with 4000 port (api.yaml used 4000 port)

## Using application
- Start application server by command
  ```
  npm start
  ```
- In order to send command you can use tools like **Insomnia** or **Postman**
- Just import api.yaml schema in that tools and you can use cozy UI interface
- Screenshot instruction (Insomnia):

  ![](https://i.ibb.co/2W8FGY0/image.png)
  
  ![](https://i.ibb.co/SdYDKF5/image.png)

## Testing
- To run all tests without authorization

  ```
  npm run test
  ```