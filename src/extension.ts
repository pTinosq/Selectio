import * as vscode from "vscode";
import { LinkedList } from "./LinkedList";

function processLinkedKeyList(
  linkedList: LinkedList<string>,
  editor: vscode.TextEditor
) {
  const cursorStartPosition = editor.selection.start;
  const text = editor.document.getText();

	// slice the text after the cursor position
  const textAfterCursor = text.slice(
    editor.document.offsetAt(cursorStartPosition)
  );

  let currentNode = linkedList.getHead();

  while (currentNode !== null) {
    const value = currentNode.value;

    const indexOfChar = textAfterCursor.indexOf(value);

    if (indexOfChar !== -1) {
      const nextCharPosition = editor.document.positionAt(
        editor.document.offsetAt(cursorStartPosition) + indexOfChar
      );

      const selection = new vscode.Selection(
        cursorStartPosition,
        nextCharPosition
      );
			
      editor.selection = selection;

      break;
    }

    currentNode = linkedList.getNext(currentNode);
  }
}

export function activate(context: vscode.ExtensionContext) {
  let isTypeMode = false;
  let linkedKeyList: LinkedList<string> | null = null;

  function setTypeMode(value: boolean) {
    isTypeMode = value;
    vscode.commands.executeCommand("setContext", "selectio.isTypeMode", value);
  }

  const selectioTypeDisposable = vscode.commands.registerCommand(
    "type",
    (args) => {
      if (!isTypeMode) {
        vscode.commands.executeCommand("default:type", args);
        return;
      }

      const editor = vscode.window.activeTextEditor;
      const char: string = args.text;

      if (linkedKeyList) {
        linkedKeyList.add(char);
      }
    }
  );

  context.subscriptions.push(selectioTypeDisposable);

  const selectioTypeModeDisposable = vscode.commands.registerCommand(
    "extension.startSelectioTypeMode",
    () => {
      console.log("type");
      setTypeMode(true);
      linkedKeyList = new LinkedList<string>();
    }
  );

  context.subscriptions.push(selectioTypeModeDisposable);

  const exitSelectioTypeModeDisposable = vscode.commands.registerCommand(
    "extension.exitSelectioTypeMode",
    () => {
      console.log("exit");
      setTypeMode(false);
      linkedKeyList = null;
    }
  );

  context.subscriptions.push(exitSelectioTypeModeDisposable);

  const confirmSelectioTypeModeDisposable = vscode.commands.registerCommand(
    "extension.confirmSelectioTypeMode",
    () => {
      if (
        linkedKeyList &&
        !linkedKeyList.isEmpty() &&
        vscode.window.activeTextEditor
      ) {
        processLinkedKeyList(linkedKeyList, vscode.window.activeTextEditor);
      }

      setTypeMode(false);
      linkedKeyList = null;
    }
  );

  context.subscriptions.push(confirmSelectioTypeModeDisposable);
}

export function deactivate() {}
