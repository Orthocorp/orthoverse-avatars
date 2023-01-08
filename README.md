# README

Welcome to Ready Player Doomed (the Orthoverse Avatar Designer)!

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (>=14.19.x <=16.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then change into that directory and start the development server:

```
yarn redwood dev
```

Your browser will automatically open to http://localhost:8910 where you'll see a failure message because you don't have Postgres installed and configured correctly.

## Installing and configuring Postgres

Run the following in a terminal:

```
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql.service
```

Switch to the postgres user, and create the orthoverse user with a strong password, like `orthoverse`, and the Orthoverse database:

```
sudo -i -u postgres
createuser -P -s -e orthoverse
createdb -O orthoverse orthoverse
```

Install DBeaver so you can see what is going on. Download it from [their website](https://https://dbeaver.io/download)

Remember that a .deb package is installed with `sudo dpkg -i <package name>`

Finally, perform the first migration to make sure the database has the right tables:

```
yarn rw prisma migrate dev
```





