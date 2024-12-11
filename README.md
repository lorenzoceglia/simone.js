# Simone Mouse Mover

![Simone Mouse Mover](public/simone.png)

## Description

Simone Mouse Mover is a simple script that automatically moves your mouse after detecting inactivity. It monitors your mouse position, and when no movement is detected within a set time, it moves the mouse to a random position on the screen. This is ideal for keeping the system active or preventing screensavers from triggering.

## Features

- Monitors mouse activity every second.
- Moves the mouse to a random position if no activity is detected for 60 seconds.
- Fully customizable time interval for mouse movement.
- Lightweight and easy to use.

## Requirements

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [Electron](https://electronjs.org/)
- [pnpm](https://pnpm.io/it/)
- A screen with resolution supported by `iohook`.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/lorenzoceglia/simone-mouse-mover.git
   cd simone-mouse-mover
   ```

2. Install dependencies using pnpm:

   ```bash
   pnpm install
   ```

## Running the Script

To start the script, simply run the following command:

```bash
pnpm start
```
