# ALPRO-Project (Chess)

This repository contains the source code for the final project of the Algorithm Programming course.

## Getting Started

To get started with the project, follow these instructions:

### Clone the Repository

First, clone the repository to your local machine using git:
```
git clone https://github.com/IRedDragonICY/ALPRO-Project.git
```

### Install Node.js and npm
Make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from the official Node.js website: https://nodejs.org

### Install Electron

Next, you need to install Electron as a development dependency for your project. Run the following command in your project's root directory:
```
npm install electron --save-dev
```

### Install Electron Forge

Electron Forge is a tool for creating Electron applications. Install it as a development dependency by running the following command:
```
npm install --save-dev @electron-forge/cli
```

### Import Existing Project

If you already have an existing project, you can use Electron Forge's conversion script to import it into your Electron project. Run the following command in your project's root directory:
```
npx electron-forge import
```

### Create a Distributable

To create a distributable version of your application, you can use the make script provided with Electron Forge. Run the following command in your project's root directory:
```
npm run make
```

This will build your application and create distributable packages based on your platform.

## Additional Information

For more details and advanced usage of Electron and Electron Forge, refer to their official documentation:

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Forge Documentation](https://www.electronforge.io/docs)

## Case Study

The program implements the following features as part of the case study requirements:

### 1. Mandatory Requirements
a. Implementation of a 2-dimensional array to represent the chessboard.

b. Implementation of a sorting feature using a sorting algorithm of choice. (Specify the chosen sorting algorithm and how it is used in the program.)

c. Implementation of a searching feature using a searching algorithm of choice. (Specify the chosen searching algorithm and how it is used in the program.)

### 2. Additional Features
In addition to the mandatory requirements, the program also includes a graphical user interface (GUI) implemented using Electron JS. The GUI enhances the user experience by providing an interactive and visually appealing chess game interface.


## Contributor
This project is developed and maintained by the following contributors:

- [Mohammad Farid Hendianto]([https://github.com/johndoe](https://github.com/IRedDragonICY))
- [Rendie Abdi Saputra]([https://github.com/janesmith](https://github.com/RendieRYU))

And others:
- Syifa’ Ayu Sulistyowati – 2200018064
- Kemas Khairunsyah – 2200018155
- Dzakiyyah Hanan Izdihar – 2200018202
- Laila Nur’azizah - 2200018400
- Reyhanssan Islamey – 2200018411
- M. Jaka Nopriansyah – 2200018451
- Fadhil Raifan Andika – 2200018458
- Princessca Yudha Cahayanie – 2200018474

We would like to express our gratitude to Dr. Ardiansyah S.T., M.Cs for his guidance and expertise throughout the development of this project.


## License

This project is licensed under the [MIT License](LICENSE).
