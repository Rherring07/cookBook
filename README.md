<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="./client/src/partials/Header/images/logo.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">CookBook</h3>

  <p align="center">
    Breathing Life into Cooking through Collaboration
    <br />
    <a href="https://github.com/Rherring07/cookBook"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://cookbook-production-5a06.up.railway.app/">View Demo</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)
 
 I very much enjoy cooking in my free time. I've worked in and out of kitchens as a sous chef and pizza chef for a majortiy of my life
 and have accumulated many cool bits of knowledge and recipes over time. I wanted to make a place to store them, and share them with
 family members or friends, as well as save my grandparent's recipes to use down the road. So I made this app.
 
 CookBook is a simple fullstack web application made to store recipes. Users will be able to log in and upload their recipes, as well as 
 explore, like, and bookmark other user recipes. Options to search, organize recipes by criteria such as type of food, country of origin, or 
 allergen specific, and other quality of life options will be implemented in the future.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Node][Node]][Node-url]
* [![ExpressJS][ExpressJS]][ExpressJS-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![Mongoose][Mongoose]][Mongoose-url]
* [![Passport][Passport]][Passport-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Feel free to clone and/or download this repo to tweek, edit, or do whatever with. 

### Prerequisites

In order to run this code locally, you will need your own MongoDB, cloudinary, and set a few 
variables in a process.env folder

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Rherring07/cookBook.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a process.env file in the source folder of the client side, and add these variables
   ```js
   PORT = /* port of your choice */;
   VITE_PROXY = 'http://localhost:' /* your port */
   ```
4. In the config folder on the server side, add a process.env file and add these variables
   ```js
   PORT = /* your port */
   DB_STRING = /* your MongoDB DB String */
   CLOUD_NAME = /* cloudinary name */
   API_KEY = /* cloudinary API Key */
   API_SECRET = /* cloudinary API secret */
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Ryan Herrington - [@RHerring07](https://twitter.com/Rherring07) - Herrington.Ryan.P@gmail.com

Project Link: [https://github.com/Rherring07/cookBook](https://github.com/Rherring07/cookBook)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/Rherring07
[product-screenshot]: images/cookBookCapture.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[ExpressJS]: https://img.shields.io/badge/ExpressJS-0769AD?style=for-the-badge&logo=express&logoColor=white
[ExpressJS-url]: https://expressjs.com
[Node]: https://img.shields.io/badge/Node-FF2D20?style=for-the-badge&logo=node&logoColor=white
[Node-url]: https://nodejs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-4A4A55?style=for-the-badge&logo=mongoDB&logoColor=FF3E00
[MongoDB-url]: https://www.mongodb.com/
[Mongoose]: https://img.shields.io/badge/Mongoose-DD0031?style=for-the-badge&logo=mongoose&logoColor=white
[Mongoose-url]: https://mongoosejs.com/
[Passport]: https://img.shields.io/badge/Passport-35495E?style=for-the-badge&logo=passport&logoColor=4FC08D
[Passport-url]: https://www.passportjs.org/
