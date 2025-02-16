# cra-template-tailwindcss-typescript

Hi! I am using a template, and a description of it can be found below.

Now, I'll guide you on how to clone my repo and run the application on your local machine.

First, open your terminal (Git Bash) directlyy in your development environment (VSCode) and run the following command:

```bash
git clone https://github.com/ChewBaccaYeti/todo_list_task.git
```

After cloning the repo, navigate to the project directory by running:

```bash
cd todo_list_task 
```

If you didn't open Git Bash from within VSCode, you can run the following command to open VSCode:

SKIP THIS IF YOU ARE IN VSCODE

```bash
code .
```

Next, run the following command to install the dependencies:

```bash
npm install
```

After the installation is complete, run the application with:

```bash
npm run full
```

This command uses concurrently to run multiple scripts at the same time, and nodemon is used for hot-reloading on the server.

!Important reminder for project - click twice on task title to redact it

I used POSTMAN to check every http request

<--TEMPLATE DESCRIPTION-->

A streamlined [Tailwind CSS v3.1](https://tailwindcss.com) template for [Create React App](https://github.com/facebook/create-react-app) in [TypeScript](https://www.typescriptlang.org/).

> This template installs and sets up [Tailwind CSS](https://tailwindcss.com) with TypeScript support.

## Usage

```bash
npx create-react-app --template tailwindcss-typescript
```

## Credits

This project was made possible thanks to the following projects.

1. [GeoffSelby/cra-template-tailwindcss](https://github.com/GeoffSelby/cra-template-tailwindcss) - A streamlined Tailwind CSS template for Create React App (in JavaScript).
2. [cra-template-typescript](https://github.com/facebook/create-react-app/tree/master/packages/cra-template-typescript) - An official TypeScript template for create-react-app.

## License

MIT © [Sung M. Kim](https://sung.codes)
