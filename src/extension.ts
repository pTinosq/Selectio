import * as vscode from "vscode";
import { LinkedList } from "./LinkedList";

function processLinkedKeyList(linkedList: LinkedList<string>) {
  linkedList.print();
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
      if (linkedKeyList && !linkedKeyList.isEmpty()) {
        processLinkedKeyList(linkedKeyList);
      }

      setTypeMode(false);
      linkedKeyList = null;
    }
  );

  context.subscriptions.push(confirmSelectioTypeModeDisposable);
}

export function deactivate() {}
