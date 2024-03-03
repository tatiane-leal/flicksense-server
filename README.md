This project is the backend for `FlickSense`, an application for analyzing sentiments in movie reviews. It is built using Node.js and Express.js, and utilizes MongoDB for the database and JWT authentication.

[![MongoDB](https://img.shields.io/badge/-MongoDB-4DB33D?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)[![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)[![Node.js](https://img.shields.io/badge/-Node.js-43853d?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

## Prerequisites

Before you start, make sure you have installed:

- Node.js 20.11.0 or higher

## Initial Setup

1. Clone the repository to your local machine:

```bash
 git clone https://github.com/your-username/flicksense-server.git
 cd flicksense-server
```

```
npm install
```

```
npm run dev
```

`.env` needed to run locally:
```javascript
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
DATABASE_URI=mongodb+srv://...
GOOGLE_API_KEY=
```
