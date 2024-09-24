# self-help-journal
>
> ***The app targets node 18.7.0***\
> link to website can be found here: <https://otu-heart.netlify.app/>

## Start here

To use the app, you would need mongodb, nodejs and npm installed.\

### How to set up MongoDB

> Install mongodb on your machine.\
> Refer to the <a href="https://www.mongodb.com/docs/manual/installation">*www.mongodb.com*</a> for instructions on installation for your operation system.
>Afterwards, start the mongod service in your cmd.

## Alternative (Docker)
> Alternatively, you can set up Docker for MongoDB. If docker is not installed in your machine, follow the guide here <a href='https://docs.docker.com/guidesgetting-started'>docker guide</a>.

>Run the command:
```bash
    docker-compose up -e DB_NAME=<name-of-db-as-set-in-env-file>
```
>Substitute 'name-of-db-as-set-in-env-file' for the name of your database which must be the same name as that in your env file.
>Access the mongodb database
### How to set up Nodejs
>
>Install nodejs from <a href="https://nodejs.org">*nodejs.org*</a>. Likewise, follow the instructions for your operating system.
>
#### Installation of nodejs and npm on different Operating Systems

*windows*
>Install using the link above and follow the instructions.

*macOS*
>Install nodejs and npm using Homebrew. Open the terminal and run;

```bash
    brew install node
```

*Linux*
>Use apt to install nodejs and npm. In the terminal run;

```bash
    sudo apt update
    sudo apt install nodejs npm
```


### Steps to run project


1. *Clone the Repository*

``` bash
    git clone https://github.com/Lonercode/self-help-journal.git
    cd self-help-journal
```

2. *Backend Setup*

```bash
    cd Backend
    npm install
```

3. *Frontend Setup*

```bash
    cd ../Frontend
    npm install
```

4. *Environment variables*

> Create a .env file using the .env.example file as a guide.
> Create your PORT and DB_URI env variables depending on your setup.


5. *Start the Application*

>Start both backend and frontend servers. In each run:

```bash
    npm run dev
```

