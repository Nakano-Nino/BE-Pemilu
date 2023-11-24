# Backend Pemilu

1. Create .env file first at root directory to contain cloudinary config, db config, and auth secret key
   
    db config contain DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME

    cloudinary config contain CLOUD_NAME, API_KEY, API_SECRET

    auth secret key contain SECRET_KEY

2. Create migration file with command `npm run migration:generate`
3. Run migration file with command `npm run migration:run`
4. To start the server, run command `npm start`


