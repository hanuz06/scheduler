# Interview Scheduler

This app was built as an assignment according to LHL Full Stack Web Development Course. 

To see production version on Netlify please go to: [Scheduler](https://jolly-poincare-537e66.netlify.com)

## Short Description

User can set/edit/delete an interview appointment as well as choose and change an interviewer.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## To reset DB

```sh
http://localhost:8001/api/debug/reset
```

## Screenshot of app development schema

Web developer pushes changes to Github repository master branch. 

When CircleCI detects changes it automatically tests the app. If the app test fails it notifies the developer(either on CircleCI site, or via email). If the test is successful the app changes are pushed to Github repository production branch. 

When Netlify detects changes in Github repository production branch it automatically reflects those changes in its own repository.

!["Screenshot of production schema"](https://github.com/hanuz06/scheduler/blob/master/public/images/scheduler-production-schema.png?raw=true)

## Screenshot with the set appointment and a form for making the appointments

!["Screenshot of front page"](https://github.com/hanuz06/scheduler/blob/master/public/images/scheduler-front-page.png?raw=true)

## Screenshot with warning messages

!["Screenshot of the page for mobiles"](https://github.com/hanuz06/scheduler/blob/master/public/images/Scheduler-3.png?raw=true)

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- axios 0.19.0
- classnames 2.2.6
- normalize.css 8.0.1
- react 16.9.0
- react-dom 16.9.0
- react-scripts 3.0.0
