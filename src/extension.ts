import * as vscode from "vscode";

let originalSelection: vscode.Selection | null = null;

function processTypedCharacter(char: string, editor: vscode.TextEditor) {
  const cursorSelectionStartPosition = editor.selection.start;
  const cursorSelectionEndPosition = editor.selection.end;

  const text = editor.document.getText();
  let currentPos = cursorSelectionEndPosition;

  // Tracks the cumulative offset of the current position
  let offset = editor.document.offsetAt(currentPos);

  // Search for the most recent character
  const textAfterOffset = text.slice(offset);
  const indexOfChar = textAfterOffset.indexOf(char);

  if (indexOfChar !== -1) {
    const newSelectionPos = editor.document.positionAt(
      offset + indexOfChar + 1
    );

    // Update the selection to the new char position
    const selection = new vscode.Selection(
      cursorSelectionStartPosition,
      newSelectionPos
    );

    editor.selection = selection;
  }
}

export function activate(context: vscode.ExtensionContext) {
  let isTypeMode = false;

  function setTypeMode(value: boolean) {
    isTypeMode = value;
    vscode.commands.executeCommand("setContext", "selectio.isTypeMode", value);
  }

  const selectioTypeDisposable = vscode.commands.registerCommand(
    "type",
    (args) => {
      const editor = vscode.window.activeTextEditor;

      // Only process the typed character if type mode is enabled
      if (!editor || !isTypeMode) {
        vscode.commands.executeCommand("default:type", args);
        return;
      }

      processTypedCharacter(args.text, editor);
    }
  );

  context.subscriptions.push(selectioTypeDisposable);

  // Start selection type mode
  const selectioTypeModeDisposable = vscode.commands.registerCommand(
    "extension.startSelectioTypeMode",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        // Store the original selection when type mode starts
        // We do this so that we can restore the selection if the user exits type mode
        originalSelection = editor.selection;
      }
      setTypeMode(true);
    }
  );

  context.subscriptions.push(selectioTypeModeDisposable);

  // Exit selection type mode
  const exitSelectioTypeModeDisposable = vscode.commands.registerCommand(
    "extension.exitSelectioTypeMode",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor && originalSelection) {
        // When the user exits type mode, restore the original selection
        editor.selection = originalSelection;
        originalSelection = null;
      }
      setTypeMode(false);
    }
  );

  context.subscriptions.push(exitSelectioTypeModeDisposable);

  // Confirm selection type mode
  const confirmSelectioTypeModeDisposable = vscode.commands.registerCommand(
    "extension.confirmSelectioTypeMode",
    () => {
      originalSelection = null;
      setTypeMode(false);
    }
  );

  context.subscriptions.push(confirmSelectioTypeModeDisposable);
}

export function deactivate() {}
