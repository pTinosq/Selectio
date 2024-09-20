<div align="center">
  <img src="https://raw.githubusercontent.com/pTinosq/Selectio/refs/heads/main/design/github-banner.jpg">
  <br>
  <br>
  <h1>Selectio - Smart text selection for VS Code</h1>
</div>

## Introduction

**Selectio** is a VSCode extension designed to enhance the text selection experience for developers. With live, character-based selection, you can now expand selections effortlessly by simply typing the characters you're looking for. No need to pick up your mouse or shift-select - **Selectio** does the work for you!

### ✨ Features

- **Live Selection as You Type**: Watch the selection expand in real-time as you type the characters.
- **Keybinding Support**: Activate Selectio with a single key combination (`Ctrl+K, CTRL+;` by default).
- **Seamless Navigation**: Quickly jump to specific characters, fine-tuning your selection with precision.
- **Easy Undo**: If you make a mistake, easily revert to the original selection with the `Escape` key.
- **Effortless Integration**: Works naturally within VSCode - just activate and start selecting!

### 🎥 Example
#### Select until the semicolon character (`;`):
![Selectio example GIF](https://raw.githubusercontent.com/pTinosq/Selectio/refs/heads/main/design/gifs/selectio-example.gif)

## ⚡ Quick Start

### Installation

To install **Selectio**:

1. Open **VSCode**.
2. Navigate to the Extensions panel (`Ctrl+Shift+X`).
3. Search for "**Selectio**".
4. Click "**Install**".

Alternatively, you can install it directly from the VSCode Marketplace [here](#).

### Usage

Once installed, start using **Selectio** by following these simple steps:

- **Activate Selectio Type Mode**:
  - `Ctrl+K, CTRL+;` (or your configured shortcut).
- **Type Characters**:

  - Begin typing the characters you want to select until. The selection will update live as you type!

- **Confirm the Selection**:

  - Press `Enter` to confirm your selection.

- **Revert to Original Selection**:
  - Press `Escape` at any time to revert to your original selection or cursor position.

## 🛠️ Commands

- **`selectio.startSelectioTypeMode`**: Activates Selectio's live type mode.
- **`selectio.confirmSelectioTypeMode`**: Confirms the current selection and exits type mode.
- **`selectio.exitSelectioTypeMode`**: Cancels type mode and reverts to the original selection.

## 🧑‍💻 Contributing

**Selectio** is always looking for contributors! To get started:

1. **Fork the repository** and clone your fork.
2. **Install dependencies**: `npm install`.
3. Make your changes.
4. Submit a **pull request**!

Make sure to follow our [contribution guidelines](#) for detailed instructions.

## 🛡️ Support

For any questions or issues, feel free to open a GitHub Issue or [reach out to the author](https://x.com/pTinosq).
