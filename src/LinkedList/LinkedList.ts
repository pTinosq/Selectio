import { Node } from "./Node";

export class LinkedList<T> {
  private head: Node<T> | null = null;

  public isEmpty(): boolean {
    return this.head === null;
  }

  public getHead(): Node<T> | null {
    return this.head;
  }

  public getNext(current: Node<T> | null): Node<T> | null {
    return current?.next ?? null;
  }

  public add(value: T): void {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
    } else {
      let current: Node<T> | null = this.head;
      while (current?.next !== null) {
        current = current?.next ?? null;
      }
      current.next = newNode;
    }
  }

  public remove(value: T): boolean {
    if (this.isEmpty()) {
      return false;
    }

    if (this.head?.value === value) {
      this.head = this.head.next;
      return true;
    }

    let current: Node<T> | null = this.head;

    while (current?.next !== null) {
      if (current?.next.value === value) {
        current.next = current.next.next;
        return true;
      }
      current = current?.next ?? null;
    }

    return false;
  }

  public print(): void {
    if (this.isEmpty()) {
      console.log("List is empty");
      return;
    }

    let current: Node<T> | null = this.head;
    const values: T[] = [];

    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }

    console.log(values.join(" -> "));
  }
}
