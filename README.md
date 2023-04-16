# MEGA ACE Hackathon Open Innovation Challenge

## Decentralized Crowdsourcing using Algorand

This project makes use of the Beaker API and a react application to allow users to interact with it.
We implement a BoxMapping based storage system to allow anyone to commit their data to a shared collection, which can also be viewed by anyone with an algorand account. 

Our application supports 6 different types of algorand wallets, and can be accessed by anyone with an Algorand account and an internet connection. A more detailed writeup about the project is available [here](https://docs.google.com/document/d/e/2PACX-1vRkwCyFfmqKn26NqDoPNunmh3oINRlPen1B4nxI_O6pzHKBEUzyPjv7cHPY1XG9h-EM35ohMlGiwxUL/pub)

## Project Layout

[crowdsource-app-backend](crowdsource-app-backend)
This directory contains the code for the Beaker application, as well as the code for compiling/testing on a local network. To run this project, one should refer to [this guide](https://developer.algorand.org/algokit/) to install the necessary dependencies. Ones algokit is installed, the rest of the application dependencies can be installed in a python virtual environment (Python version must be higher than 3.10) or install in their local environment. 

To just compile the project, one can run `python build.py`, which will populate the `artifacts` folder with necessary files. To test the project as well as building, one can run `python demo.py` to witness the application's basic functionalities by observing the output on the terminal.

[crowdsource-app-frontend](crowdsource-app-frontend)

This directory contains the code for the React application. `NPM == 8.5.0`  and `node.js == 16.14.2` was used to develop the project. To run the application locally, one can run `yarn start` or `npm run start` in the root folder of the frontend directory. To test integration with a different version of a deployed contract, the values of the creator's account, deployed contract account and deployed contract id must be updated in `index.js` of the `src` folder. 

