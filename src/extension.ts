import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let isTypeMode = false;

  function setTypeMode(value: boolean) {
    isTypeMode = value;
    vscode.commands.executeCommand("setContext", "selectio.isTypeMode", value);
  }

  const selectioTypeDisposable = vscode.commands.registerCommand(
    "type",
    (args) => {
      if (!isTypeMode) {
				vscode.commands.executeCommand('default:type', args);
        return;
      }

      console.log("051772", isTypeMode);
      const editor = vscode.window.activeTextEditor;
      const char: string = args.text;

      switch (char) {
        case "\r": // "return" key (Enter)
          console.log("return");
          break;
        case "\u001b": // "escape" key (Esc)
          console.log("escape");
          break;
        default:
          console.log("xxx:", char);
          break;
      }
    }
  );

  context.subscriptions.push(selectioTypeDisposable);

  const selectioTypeModeDisposable = vscode.commands.registerCommand(
    "extension.startSelectioTypeMode",
    () => {
      setTypeMode(true);
      console.log("type");
    }
  );

  context.subscriptions.push(selectioTypeModeDisposable);

  const exitSelectioTypeModeDisposable = vscode.commands.registerCommand(
    "extension.exitSelectioTypeMode",
    () => {
      setTypeMode(false);
      console.log("exit");
    }
  );

  context.subscriptions.push(exitSelectioTypeModeDisposable);

  const confirmSelectioTypeModeDisposable = vscode.commands.registerCommand(
    "extension.confirmSelectioTypeMode",
    () => {
      console.log("confirm");
    }
  );

  context.subscriptions.push(confirmSelectioTypeModeDisposable);
}

export function deactivate() {}
