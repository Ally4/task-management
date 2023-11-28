# task-management

## This is a platform that facilitates organisation to assign tasks to different employees, I used NODEjs for its development, and with it , I also used:

### BCRYPT: Crypting the password
### JSONWEBTON: For token creation
### POSTGRESQL: for database,
### SEQUELIZE: for ORM,
### CLOUDINARY: For uploading images and pdf to the cloud then staore the link in the database
### JOI: For validations
### BABEL: compile in S6 and S7

## In the environment (.env file)

### DEV_DATABASE_URL=postgres://<your-username>:<your-password>@127.0.0.1:5432/<your-database>
### PORT =<your-port>
### SECRET_KEY=<your-key>

## After you have create the database run the script following in this particular order:

- npm i
- npm sequelize init
- npm run migrate:rest
- npm run dev

