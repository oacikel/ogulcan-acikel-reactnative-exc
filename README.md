# FinanceGraph App (name not final :))
 
FinanceGraph is an Expo-based app for interactive financial data visualization, offering tooltips and time filters for in-depth analysis.

## Features

- **Dynamic Graphs:** Visualize financial data interactively using Skia and D3.  
- **Tooltip Mode:** Long-press to display date, price, and split the graph into colored and grayscale sections.  
- **Time Filters:** Toggle between "Last 7 Days" and "Last 30 Days" with persistent selection.  
- **State Management:** Redux with persistent storage.  
- **Multilingual Support:** Built-in translations.

## Tech Stack

- **Framework:** Expo  
- **Graphics:** React Native Skia  
- **Data Scaling:** D3.js  
- **State Management:** Redux  

## Installation

1. Clone the shared repository to your computer
2. navigate to project root and run npx expo start
3. press i for ios, a for android build (needs android studio to be opened)

## Acknowledgments

- **Expo:** For providing a robust framework for building React Native applications.
- **React Native Skia:** For enabling high-performance graphics rendering.
- **D3.js:** For powerful data visualization tools.
- **Redux:** For state management solutions.
- **Community Contributors:** For their valuable feedback and contributions.

## Room for Improvement

- **Enhanced Tooltip Features:** Tooltip can overflow from the edges if user pans too much to the left / right. A dynamic solution can be implemented.
- **Price Utils:** There are some room for improvement for the Price utils. Left as todo comments.

## Contact

For questions or inquiries, feel free to reach out:
ogulcan.acikel@gmail.com