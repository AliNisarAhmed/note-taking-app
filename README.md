
# Note Taking App - Using Docker to developer and deploy
 

## DOCKER Commands used

#### DOCKER Commands for running mongo

`docker run --name my-mongo -d -v data:/data/db -p 27017:27017 mongo`

##### IP = 172.17.0.2


#### DOCKER commands for building the node app

`docker build --tag=note-taking-app .`



#### DOCKER command for running the above image 

`docker run -p 3000:3000 note-taking-app`

#### After adding `docker-compose.yml` file, the following command was executed

`sudo docker-compose up`



---

## ================= API =========================

### Auth
**POST**:   /api/auth/register : User can enter username (unique) and password to signup.

**POST**:   /api/auth/login : User logins using username & password

### Notes

**GET**:    /api/notes                => get all notes for a user

**POST**:   /api/notes/create         => User can create a note, only after logging in

**DELETE**: /api/notes/:noteId        => User can delete a note

**PUT**:    /api/notes/:noteId        => Modify a note

---

## Development with auto reloading

* `npm run dev`
* Visit http://localhost:3000

## Run

* `npm start`
* Visit http://localhost:3000
