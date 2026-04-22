# Volery

This app is designed to allow for easy drag-and-drop deployment of a conference schedule website.

## Local development

To start the app locally, run `npm run dev` from the project root.

There is an `example-schedule.csv` file within `/public` that can be used to test the CSV upload functionality.

The generated website will be downloaded to your computer as a ZIP containing the website files. 

You can open this zip and test the generated website by opening `index.html`. **Some features (such as JSON/CSV/plaintext export) will not work when running the website this way.** In order to test these features locally, you will need to run a web server. One way to run a web server is to run `python -m http.server` in the generated website directory.

## Deployment

Once you have the website ZIP file, you can decompress it to get a folder with all the necessary build artifacts for your website.

You can then drag and drop this folder into a hosting service like Netlify, Neocities, Vercel, GitHub Pages, etc. That's all you need to do!