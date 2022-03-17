![Coding](https://user-images.githubusercontent.com/60680170/158721163-6d95f1df-fb2a-473e-8a27-919ed79037c3.png)

# Express Implementation

## 🏁 Goal

The goal of this project is to be an "express like" application without using any framework, thus all the features were created using native module.

This project is divided in two parts:

The first one is inside the "lib" folder. Inside it there are many classes that provide features similar to express, including routers, parsers, middlewares, etc.

The second one is inside "src" folder. Inside it there is an example of implementation using our "custom express library". The implementation is just a user's CRUD. Each operation explores a functionality of our library, just as query parameters, path parameters and body parsing.

## 👨‍💻 Technologies

The main idea of this application is to use less external libraries as possible, so I did it without any. As you can see in ```package.json``` file there are only dev dependencies installed.

For this project I chose to use TypeScript just because of preference.
In order to standardize the codebase through linting and formatting, I went with the classic couple: ESLint + Prettier.
For universal code formatting in every editor, I also configured editor config.
And finally for git hooks I picked Husky, configuring ESLint analysis before every commit.

### TL;DR;
- TypeScript
- ESLint
- Prettier
- Editor Config
- Husky

## ▶️ Running the project

Running the project is quite simple, just clone the repository and run the following commands:

```
$ pnpm install;
$ pnpm start;
```

There are 4 endpoints available:

- To list all users:
```
GET /users
```

- To create a user:
```
POST /users
```

- To update a user:
```
PUT /users/:id
```

- To delete a user:
```
DELETE /users/:id
```

OBS: For both creating and updating a user, you must send a JSON body defining the property "name".
