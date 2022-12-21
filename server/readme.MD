# HomeWork-Maker

This project simply do a little search about a theme you can choose and produces a .pdf file containing it. 

## Demonstration

https://user-images.githubusercontent.com/98204950/202872080-ce79f767-3363-4bd1-b22b-4833c54a557c.mp4


## Features and Used Tools

- TypeScript
- NodeJS
- Puppeteer (for Web Scrapping)
- ejs (for creating dynamic html files)
- html-pdf (for converting html to pdf files)

## Flow

This application works based on an await funtioning, following theese 5 steps:

1. Catch Users request (Search Prefix and Term) using Node Readline.
2. Search the request on Google and go to the first wikipedia result found using Puppeteer.
3. Get the paragraphs of content on the wikipedia page using Puppeteer.
4. Search the images on Google Images and get the src and alt from first 7 ones.
5. Create an HTML with the content Amount and transform it using ‘html-pdf’.

## How to use on your machine?

First of all, clone github repository with git clone, start app with yarn init and add all dependencies:

```tsx
"dependencies": {
    "@types/ejs": "^3.1.1",
    "@types/html-pdf": "^3.0.0",
    "@types/puppeteer": "^7.0.4",
    "ejs": "^3.1.8",
    "html-pdf": "^3.0.1",
    "nodemon": "^2.0.20",
    "pupeteer": "^0.0.1",
    "puppeteer-tsd": "^0.0.2",
    "sucrase": "^3.29.0",
    "typescript": "^4.9.3",
    "vitest": "^0.25.2"
  }
```

After, start application with ‘yarn dev‘ and insert what info you want to search:

![image](https://i.ibb.co/ngjzBFr/Whats-App-Image-2022-11-19-at-17-45-15.jpg)

I used 'Egipt' as an example;

To the good functioning of the sistem, please search to a non specific and general term.

After, select the prefix of your search (you can change them or add them one whenever you want):

![image](https://i.ibb.co/g4KkKJN/prefix-selecting.jpg)

And then the app with start executing.

The result argmuments of your search will be printed on console and the final pdf file will be generated on the ‘results’ directory;

## Important Advice! ⚠

This project is still in development, features like

- Pdf stilization
- Tests 

Aren't still complete

# Enjoy 🗿
