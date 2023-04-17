
## Installation and running
* Install packages with npm install
* Run with npm start

### algorithmic_tasks
Implementation of tasks 1-4: all input data must be passed through a single JSON file. The response should be written to another JSON file.

#### task 1: Number Transformation Game using Divide-by-2 or Subtract-by-1 Algorithm

This is a command-line application for a number transformation game where the user inputs two integers and the program checks whether it's possible to transform the first number into the second number using only two operations:

Divide by 2 (if the number is even)
Subtract 1 (if the number is odd and not equal to 1)
The application uses a recursive function to check if the transformation is possible and logs the result into a JSON file with additional information about the transformation attempt.

To run the application, navigate to the project directory and run node index.js. The user will be prompted to enter two numbers separated by a space.

#### task 2: Finding Repeating Element in an Array using Floyd's Tortoise and Hare Algorithm

Description: This program reads an input file containing multiple arrays of integers and uses Floyd's Tortoise and Hare algorithm to find any repeating elements in each array. The algorithm works by using two pointers, one moving at a slower pace (the tortoise) and the other moving at a faster pace (the hare), until they meet at the same element. Then, another pointer is set to the beginning of the array and moved at the same pace as the tortoise, until it reaches the same element as the hare and identifies the repeating element. The program logs the repeating element to the console and saves it to an output file.


#### task 3-1: "Finding Optimal Disk Combination for Barbell Weightlifting"

This program uses the weight of the previous record and a set of pre-defined disk weights to determine the optimal combination of disks to add to a barbell to lift a heavier weight. The program converts the weight of the disks from pounds to kilograms, sorts the weights in descending order, and then iteratively adds disks to each side of the barbell until the target weight is reached. If the target weight exceeds the maximum possible weight, the program returns an error message. Finally, the program logs the optimal disk combination to lift the weight and the total weight of the barbell. The program also writes the result to a JSON file.

#### task 3-2: "T-Shirt Distribution Algorithm for Sports Teams"

This code implements an algorithm for distributing T-shirts to members of a sports team based on their preferred sizes. The algorithm reads input from a JSON file containing an array of T-shirt sizes and an array of player objects with their preferred sizes. It then calculates the number of T-shirts available for each size and assigns T-shirts to each player based on their preferred sizes. If a player has only one preferred size, that size is assigned to them. If a player has two preferred sizes, the algorithm assigns the size that has more T-shirts available. If there are not enough T-shirts for all players, the algorithm returns an error message. The output is saved to a JSON file.

#### task 4: "Counting Available Positions for Spotlight Placement using Brute Force Algorithm"

The script reads a scene from a JSON file that represents a stage with actors and empty cells. The goal is to count the number of good positions for a spotlight. A position is considered good if it has at least one actor in each of the four directions (up, down, left, and right). The solution uses a brute force algorithm that checks all the empty cells of the stage and counts the good positions. Finally, the result is saved to a JSON file