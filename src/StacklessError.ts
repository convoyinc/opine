export default class StacklessError extends Error {
  hideStack:boolean;

  constructor(message?:string) {
    super(message);
    this.hideStack = true;
  }

}
