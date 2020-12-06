import { Observable } from "rxjs";

// Example#1 - basic observer and observable
/**
 * Stream - values/events that are emitted over time
 * Observable
 * - Observables are lazy Push collections of multiple values.
 * - Observables are push, because they push values to observers.
 * - Observables are lazy, because until they are subscribed, their body is not executed, that is they dont push values.
 * - At the time of instantiating observable, it's body takes a function, this function is the observer.
 * - This observer has 3 methods - next, error, complete.
 * - Body of the observable will call them.
 * - subscribing to observables is analogous to calling a function.
 * - while subscribing, we provide the implementation of next, error and complete methods.
 * - subscribing to an observable triggers the execution of it's body.
 * - observable.subscribe() return the observer.
 * - you can have multiple observer for one observable.
 * - each observer subscription triggers a new execution of observable body.
 */
var observable1 = new Observable((observer: any) => {
    observer.next('1st value from observable 1')
})

//here the object passed to subscribe has the implementation of next method.
observable1.subscribe((x: any) => addItem(x));

//Example2 - error, next and complete
var observable2 = new Observable((observer: any) => {
    try {
        observer.next('1st value from observable 2');
        //we use try catch to throw the error to observer
        //observer.error('error thrown');
        observer.complete();
        observer.next('this value will not be emitted');
    } catch (err) {
        observer.error(err);
    }

});

observable2.subscribe(
    (value: string) => addItem(value),//impl of next() method
    (error: string) => addItem(error),//impl of error() method
    () => addItem('Completed')//impl of complete() method
);

//Example 3 - how the observer can stop receiving the values OR cancel the subscription
var observable3 = new Observable((observer: any) => {
    //will repeat the code for every 1 second
    setInterval(() => { 
        observer.next('Emitting from observable 3') 
    }, 1000);
});

var observer3 = observable3.subscribe((value: string) => addItem(value));

//will execute after 3 seconds
setTimeout(() => {
    observer3.unsubscribe();
}, 3000);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}

