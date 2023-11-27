# BACKEND PEMILU

## TABLE OF CONTENT
1. [USER](#user)
2. [ARTICLE](#article)


## **USER**
### REGISTER
* URL : `http://localhost:5000/api/v1/user/register`
* Method : `POST`
* Require Token : `No`
* Request Body :
```json
{
    "fullName": "John Doe",
    "address": "Victoria St.",
    "gender": "Laki-laki",
    "username": "johndoe",
    "password": "12345678"
}
```
* Response :
```Json
{
    "message": "Register Successfull",
    "result": {
        "fullName": "Sulthony",
        "address": "Jl. Pancoran",
        "gender": "Laki-laki",
        "username": "mrnegative",
        "password": "$2b$10$hAn91Tqu/aF36Je4zPQWe.Dlxw0WbZQiBifLlTT2icuMC.qPbwyKe", // Encrypted with bcrypt
        "role": "user",
        "id": 6
    }
}
```


### LOGIN
* URL : `http://localhost:5000/api/v1/user/login`
* Method : `POST`
* Require Token : `No`
* Request Body :
```json
{
    "username": "mrnegative",
    "password": "12345678"
}
```
* Response :
```Json
{
    "message": "Login Success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJmdWxsTmFtZSI6IlN1bHRob255Iiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzAxMDYwNDM3LCJleHAiOjE3MDEwNjE2Mzd9.CyVOunZy6vHD36bQ0JxwkijLzp4KXBl03_Cu-MyIQpo" // Encrypted generated token
}
```


### CHECK SESSION
* URL : `http://localhost:5000/api/v1/user/check`
* Method : `GET`
* Require Token : `Yes`
* Response :
```Json
{
    "message": "Authorized",
    "user": {
        "id": 6,
        "fullName": "Sulthony",
        "address": "Jl. Pancoran",
        "gender": "Laki-laki",
        "username": "mrnegative",
        "password": "$2b$10$hAn91Tqu/aF36Je4zPQWe.Dlxw0WbZQiBifLlTT2icuMC.qPbwyKe",
        "role": "user"
    }
}
```



## **ARTICLE**
### GET ALL ARTICLE
* URL : `http://localhost:5000/api/v1/artikel`
* Method : `GET`
* Require Token : `No`
* Response :
```Json
{
    {
        "id": 6,
        "articleName": "Black Bull maju",
        "description": "Lorem ipsum dolor sir amet",
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1701062013/artikel/m37cvckdreenbs0mj8y5.jpg", 
        "author": "Sulthony",
        "createdAt": "2023-11-27T05:13:34.700Z"
    }
}
```


### GET ARTICLE BY ID
* URL : `http://localhost:5000/api/v1/artikel/:id`
* Method : `GET`
* Require Token : `No`
* Response :
```Json
{
    "id": 6,
    "articleName": "Black Bull maju",
    "description": "Lorem ipsum dolor sir amet",
    "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1701062013/artikel/m37cvckdreenbs0mj8y5.jpg",
    "author": "Sulthony",
    "createdAt": "2023-11-27T05:13:34.700Z",
    "User": {
        "id": 6,
        "fullName": "Sulthony",
        "address": "Jl. Pancoran",
        "gender": "Laki-laki",
        "username": "mrnegative",
        "password": "$2b$10$hAn91Tqu/aF36Je4zPQWe.Dlxw0WbZQiBifLlTT2icuMC.qPbwyKe",
        "role": "user"
    }
}
```


### CREATE NEW ARTICLE
* URL : `http://localhost:5000/api/v1/artikel`
* Method : `POST`
* Require Token : `Yes`
* Request Body :
```json
{
    "articleName": "Black Bull Maju",
    "description": "Lorem ipsum dolor sir amet",
    "image": //Image file
}
```
* Response :
```Json
{
    {
        "articleName": "Black Bull maju",
        "description": "Lorem ipsum dolor sir amet",
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1701062013/artikel/m37cvckdreenbs0mj8y5.jpg", // Image uploaded to cloudinary
        "author": "Sulthony",
        "createdAt": "2023-11-27T05:13:34.700Z",
        "User": 6,
        "id": 6
    }
}
```


### UPDATE ARTICLE BY ID
* URL : `http://localhost:5000/api/v1/artikel/:id`
* Method : `PUT`
* Require Token : `Yes`
* Request Body :
```json
{
    "articleName": "PASLON DUMBWAYS",
    "description": "Lorem ipsum dolor sir amet",
    "image": //Image file
}
```
* Response :
```Json
{
    {
        "id": 6,
        "articleName": "PASLON DUMBWAYS",
        "description": "Lorem ipsum dolor sir amet",
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1701062434/artikel/wayqv5ehfk16cjhdda2d.bmp",
        "author": "Sulthony",
        "createdAt": "2023-11-27T05:13:34.700Z",
        "User": 6
    }
}
```

### DELETE ARTICLE BY ID
* URL : `http://localhost:5000/api/v1/artikel/:id`
* Method : `DELETE`
* Require Token : `Yes`



## **PASLON**
### GET ALL PASLON
* URL : `http://localhost:5000/api/v1/paslon`
* Method : `GET`
* Require Token : `No`
* Response :
```Json
[
    {
        "orderNum": 1,
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700680887/paslon/w8kz8ngf95yhistcf231.bmp",
        "vissionMission": "Maju terus pantang mundur",
        "coalition": [
            {
                "name": "Yggdrasil"
            },
            {
                "name": "PIN"
            }
        ]
    }
]
```


### GET PASLON BY ID
* URL : `http://localhost:5000/api/v1/paslon/:id`
* Method : `GET`
* Require Token : `No`
* Response :
```Json
{
    "id": 21,
    "name": "Nurhadi",
    "orderNum": 1,
    "VissionMission": "Maju terus pantang mundur",
    "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700680887/paslon/w8kz8ngf95yhistcf231.bmp",
    "Partai": [
        {
            "id": 4,
            "name": "Yggdrasil",
            "ketum": "Loki",
            "vissionMission": "Duduk terus",
            "address": "Jl. Glodok",
            "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700680731/partai/r4utpac3ppmm2rrkan4v.bmp"
        },
        {
            "id": 9,
            "name": "PIN",
            "ketum": "Surya",
            "vissionMission": "Maju maju",
            "address": "Jl. Maju terus",
            "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700798289/partai/oqsz8akkwucr7mhimgk6.bmp"
        }
    ]
}
```


### CREATE NEW PASLON
* URL : `http://localhost:5000/api/v1/paslon`
* Method : `POST`
* Require Token : `Yes` 
* Request Body :
```json
{
    "name": "Dendisyah",
    "orderNum": "2",
    "VissionMission": "Lobel semakin maju",
    "image": // Image file
}
```
* Response :
```Json
{
    {
        "id": 23,
        "name": "Dendisyah",
        "orderNum": "2",
        "VissionMission": "Lobel semakin maju",
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700682941/paslon/jc11vief5oetl5kem0dq.jpg"
    }
}
```


### UPDATE PASLON BY ID
* URL : `http://localhost:5000/api/v1/paslon/:id`
* Method : `PUT`
* Require Token : `Yes`
* Request Body :
```json
{
    "name": "Dendisyah",
    "orderNum": "2",
    "VissionMission": "Lobel semakin sukses",
    "image": // Image file
}
```
* Response :
```Json
{
    {
        "id": 23,
        "name": "Dendisyah",
        "orderNum": "2",
        "VissionMission": "Lobel semakin sukses",
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700682941/paslon/jc11vief5oetl5kem0dq.jpg"
    }
}
```

### DELETE PASLON BY ID
* URL : `http://localhost:5000/api/v1/paslon/:id`
* Method : `DELETE`
* Require Token : `Yes`



## **PARTAI**
### GET ALL PARTAI
* URL : `http://localhost:5000/api/v1/partai`
* Method : `GET`
* Require Token : `No`
* Response :
```Json
[
    {
        "id": 4,
        "name": "Yggdrasil",
        "ketum": "Loki",
        "vissionMission": "Duduk terus",
        "address": "Jl. Glodok",
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700680731/partai/r4utpac3ppmm2rrkan4v.bmp"
    },
    {
        "id": 5,
        "name": "Gerinda",
        "ketum": "Thor",
        "vissionMission": "Mundur mundur",
        "address": "Jl. Maju mundur",
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700681339/partai/liwq3vqzjvsxtjqwsi1m.jpg"
    },
    {
        "id": 9,
        "name": "PIN",
        "ketum": "Surya",
        "vissionMission": "Maju maju",
        "address": "Jl. Maju terus",
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700798289/partai/oqsz8akkwucr7mhimgk6.bmp"
    },
    {
        "id": 7,
        "name": "Black Bull",
        "ketum": "Yami",
        "vissionMission": "Maju terus Black Bull",
        "address": "Jl. Gajah Mada",
        "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700798343/partai/oqw0klhnd6znt4p55mey.jpg"
    }
]
```


### GET PARTAI BY ID
* URL : `http://localhost:5000/api/v1/partai/:id`
* Method : `GET`
* Require Token : `No`
* Response :
```Json
{
    "id": 7,
    "name": "Black Bull",
    "ketum": "Yami",
    "vissionMission": "Maju terus Black Bull",
    "address": "Jl. Gajah Mada",
    "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700798343/partai/oqw0klhnd6znt4p55mey.jpg"
}
```


### CREATE NEW PARTAI
* URL : `http://localhost:5000/api/v1/partai`
* Method : `POST`
* Require Token : `Yes`
* Request Body :
```json
{
    "name": "PIN",
    "ketum": "Surya",
    "vissionMission": "Maju maju",
    "address": "Jl. Maju terus",
    "image": "example.jpg", // Image file
    "PaslonId": 21
}
```
* Response :
```Json
{
    "id": 9,
    "name": "PIN",
    "ketum": "Surya",
    "vissionMission": "Maju maju",
    "address": "Jl. Maju terus",
    "image": "https://res.cloudinary.com/dsbrglrly/image/upload/v1700798289/partai/oqsz8akkwucr7mhimgk6.bmp",
    "PaslonId": 21
}
```


### UPDATE PARTAI BY ID
* URL : `http://localhost:5000/api/v1/partai/:id`
* Method : `PUT`
* Require Token : `Yes`
* Request Body :
```json
{
    "name": "PIN",
    "ketum": "Ahmad",
    "vissionMission": "Maju maju",
    "address": "Jl. Maju terus",
    "image": "example.jpg", // Image file
    "PaslonId": 21
}
```
* Response :
```Json
{
    "id": 9,
    "name": "PIN",
    "ketum": "Ahmad",
    "vissionMission": "Maju maju",
    "address": "Jl. Maju terus",
    "image": "example.jpg", // Image file
    "PaslonId": 21
}
```

### DELETE PARTAI BY ID
* URL : `http://localhost:5000/api/v1/partai/:id`
* Method : `DELETE`
* Require Token : `Yes`



## **VOTERS**
### GET ALL VOTERS
* URL : `http://localhost:5000/api/v1/voter`
* Method : `GET`
* Require Token : `No`
* Response :
```Json
{
    "listVoters": [
        {
            "name": "Dandi Setiawan",
            "address": "Jl. Margonda",
            "gender": "Laki-laki",
            "paslon": "Dendisyah"
        },
        {
            "name": "Yudha Prastyo",
            "address": "Jl. Gajah Mada",
            "gender": "Laki-laki",
            "paslon": "Nurhadi"
        }
    ],
    "VoteCount": 2
}
```


### VOTE
* URL : `http://localhost:5000/api/v1/voter`
* Method : `POST`
* Require Token : `Yes`
* Request Body :
```json
{
    "orderNum": 1
}
```
* Response :
```Json
{
    "userId": 6,
    "paslonId": 21,
    "id": 36
}
```