# Exscientia Code Challenge

This is a monorepo containing the front-end and back-end of the Exscientia code challenge (`exscientia-fe` and `exscientia-be` directories, respectively). Details of the decisions made, technologies used, and potential improvements can be found in the respective `README.md` files for both the front-end and back-end (`exscientia-fe/README.md` and `exscientia-be/README.md`).

## The Application

Using the provided data, I have created a full-stack application which allows users to view molecular structures based on their SMILES representation.

### Front-end

The front-end is a React application which makes use of a third-party package to parse SMILES strings and draw their molecular structure. There are **two** main features of the front-end which make use of this functionality:

- **SMILES Parser**: Users can input their own SMILES strings into a textbox and see the appropriate molecule drawn in real-time.
- **Server Molecules**: On page load, the application will send a GET request to the back-end for the compounds given in the brief (these have been seeded into the database which the back-end interacts with). It will then display these molecules, along with their molecular weight and molecular formula, as cards in a grid format.

The front-end is somewhat responsive, as the above grid-layout will adjust to screen size. However, due to a limitation of the SMILES parsing package, the site would need much more work to be truly responsive (e.g. makes heavy use of `<canvas>` with specific pixel counts).

### Back-end

The back-end is comprised of a Go HTTP server and a Mongo database. These are both dockerized, and can be brought up with a single `docker-compose up` command (see `exscientia-be/README.md` for details). The database will be automatically seeded on start-up with the `compounds.json` data which was provided, using a seeding script.

## Usage

- `cd` into the `exscientia-fe` and `exscientia-be` directories, and follow the instructions laid out in the respective `README.md` files to bring up each part of the application.
- Note, both the front-end and back-end must be brought up for full functionality of the application.

## Improvements to the Application

As this challenge was somewhat time-bound, there are a few areas which would need particular attention and some improvements which should be made if this was to be a "real" application. I have detailed these in the respective `README.md` files for the front/back-end, however the lists are not exhaustive.

I have also made heavy use of comments in code to explain decisions or suggest alterations I would have made if this was an application to be maintained for a long time.

## Brief

_Below is the brief given for this challenge._

You’ve been given a data set as a json file with 100 records in it, the challenge is to
showcase some interesting software engineering with the data set.

### The Data Set

The data set is all about compounds and their assay results which represent a much
simplified view of the data we deal with in the drug discovery domain. Don’t worry if
you don’t have a clue about drug discovery, it’s all just pictures, strings and numbers
the same as every other business. Each compound can have one or more assay
result so it’s just a standard master detail scenario.

There are two files, compounds.json is the data file and schema.json describes the
data (fields, types and so on).
There is also a subfolder called images which contains 100 png images, one for
each record in the data set.

### The Rules

- Don’t incur any costs, free tools are available.
- Use whatever tech stack you prefer that will show off your skills to the max.
- You have up to 1 week to complete the challenge, we appreciate you are busy with life and work so if you need longer let us know early on or consider doing something simple.

### The Deliverables

- Please check your solution into github (or similar) and share the repository with
  **REDACTED EMAIL**.
- The repository must contain a README file (.md is good) that describes the
  very simple and easy to follow steps needed to use / start up your solution.
- Include in your repo any build / deploy scripts, we are interested in your whole solution.

### Stuck?

If you are a backend sort of person why not create a script that loads the compounds.json data into a database then expose the data via an API.

If you are a front end sort of a person why not render compounds.json in a master detail web app, there are enough fields in the file to create a gitlab runners simple chart too.
