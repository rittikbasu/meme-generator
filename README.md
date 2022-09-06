# MemeGenerator
> This project was completed as a part of the [Scrimba React JS Course](https://scrimba.com/learn/learnreact).

## About the project

A simple meme generator that lets you choose a template from the 100 most popular memes from [Imgflip](https://imgflip.com) and create your own meme by adding text to it. You can also generate a random meme created by the Imgflip AI Meme generator.

<table align="center">
  <tr>
    <td><img src="https://ik.imagekit.io/zwcfsadeijm/usergenmeme_Vka42oHVS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662477833852" alt="User generated meme" width=300 height=600></td>
    <td><img src="https://ik.imagekit.io/zwcfsadeijm/aimeme_oQW7O0x2i.png?ik-sdk-version=javascript-1.4.3&updatedAt=1662477792090" alt="AI generated meme" width=300 height=600></td>
  </tr>
  <tr>
    <td align="center">User generated meme</td>
    <td align="center">AI generated meme</td>
  </tr>
</table>

### AI Meme Generator API
> As of the making of this project Imgflip does not provide an API for its AI Meme Generator.

* Made an API with python using flask to scrape the top AI generated memes on the Imgflip website.
* **API Endpoint:** GET https://memescraper.rittikbasu.repl.co/aimemes
* The API returns a JSON object containing the URL of the top 130 AI generated memes.
  ```javascript
  {
    "memes": [
      {
        "id": "",
        "url": "https://i.imgflip.com/6r9vf7.jpg"
      },
      {
        "id": "",
        "url": "https://i.imgflip.com/6r9qb3.jpg"
      },
      {
        "id": "",
        "url": "https://i.imgflip.com/6r9abo.jpg"
      },
      ...
    ]
  }

  ```
* This list updates every hour.

## Built With

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Python][Python.com]][Python-url]

## How to set up and run the project?

### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
  
### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/rittikbasu/meme-generator.git
   ```
2. cd in to the directory
   ```sh
   cd meme-generator
   ```
3. Install the required packages
   ```sh
   npm install
   ```
4. Go to https://imgflip.com/signup and make an account to use the Imgflip API. Then go to `src/credentials.js` and enter your credentials
   ```sh
   export const username = "your imgflip username"
   export const password = "your imgflip password"
   ```
5. Run the **MemeGenerator** on your localhost
   ```sh
   npm start
   ```

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Python.com]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://python.org
