# KPI Intelligence - Full-stack Developer Test 🛠 

Hi! We're glad you want to join KPI Intelligence! We've designed this test so that *you* can show us how you think about a problem and how you implement its solution. We'll discuss about it during our next meeting.

## Project

Paris Region wants to have a web application to track the investments it makes for its high schools buildings. They provided you the [`dataset.json`](dataset.json) files containing the existing investments.

### Stage 1: REST API

Write a REST API to retrieve the investments data:

* List all the investments
* List investments filtered by `ville` and/or by `etat_d_avancement`
* Get a single investment by id

Pay attention to the HTTP methods and status codes you use.

### Stage 2: Web application

Implement a simple web application to show the investments:

* Display the list of investments in the form of a table
* Add a form so that we can trigger the API filters
* Add a page to show the details of a single investment

### Bonus stages

> Those are not required but can be cool to do!

* Add an endpoint to edit an investment
* Deploy your application to Heroku
* Display some graphs or interesting figures in the web application
* Have some cool idea? Go on 👍

## Modalities

* You are free to use the languages and tools you are more comfortable with
* Create a repository on GitHub to store your source code and send us the link by e-mail once you've finished
* Please provide a `README` with instructions to run your project

## Setup

All that needs is to have docker/docker-compose installed. It can be up and running just by:

`docker-compose up`

It should take some minutes to build the docker images.

Some screenshots:

![1](screenshots/1.png)
![2](screenshots/2.png)
![3](screenshots/3.png)
## License

This project is released under the MIT License.

The dataset was released under Open Licence by Région Île-de-France: https://www.data.gouv.fr/fr/datasets/operations-de-construction-et-de-renovation-dans-les-lycees-francilens/
