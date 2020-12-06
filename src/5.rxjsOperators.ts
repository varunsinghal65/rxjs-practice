/**
 * What is a rxjs operator ?
 * 
 * - They are pure functions
 * - These methods modify the original observable in some way and return a new one.
 * - Original obervable is untouched, thus they are also called pure functions 
 * - (will not modify any external variables)
 * - Syntax for using rxjs operators op2()(op1()(obs))
 * - OR op1()(observable)
 * 
 * Pipeable operators
 * - A Pipeable Operator is a function that takes an Observable as its input and 
 * returns another Observable. 
 * - Subscribing to the output Observable will also subscribe to the input Observable.
 * 
 * Creational operators
 * - Creation Operators are the other kind of operator, 
 * which can be called as standalone functions to create a new Observable.
 * 
 * You should know how to read marble diagrams.
 * Remember:
 * -black horizontal line is observable.
 * -Black vetical line is complete()
 * -the box in between is the operator
 * -the small circles are values emitted from the observable.
 * 
 * @see https://rxjs-dev.firebaseapp.com/guide/operators
 * @see https://coursetro.com/posts/code/150/RxJS-Operators-Tutorial---Learn-How-to-Transform-Observables
 * 
 */

import { Observable, merge, of } from "rxjs";
import { first, map, pluck } from "rxjs/operators";

//Merge operator - creational operator - merges the body of 2 observables - it's a combinational operator
//https://rxjs-dev.firebaseapp.com/api/index/function/merge
var observable1 = new Observable((observer: any) => {
    observer.next('Hello from 1st obervable');
});

var observable2 = new Observable((observer: any) => {
    observer.next('Hello from 2nd obervable');
});

var mergedObservable = merge(observable1, observable2);

mergedObservable.subscribe((emittedValue: string) => {
    console.log(emittedValue + ' from merged observable');
});

//What is piping ?
//https://rxjs-dev.firebaseapp.com/api/operators/map
//https://rxjs-dev.firebaseapp.com/guide/operators

var observable3: Observable<number> = new Observable((observer: any) => {
    observer.next(2);
    observer.next(3);
    observer.next(4);
});

//Syntax for using rxjs operators op2()(op1()(obs))
first()(map((x: number) => x * x)(observable3));

//to avoid complexity, once can achieve exact same thing by piping operator
observable3.pipe(
    map((x: number) => x * x),
    map((x: number) => x + x)
).subscribe((pushedValue: number) => {
    console.log(pushedValue + ' from observer subscribed to obervable based on pipe');
});

//Pluck operator 
//see the marble diagram - https://rxjs-dev.firebaseapp.com/api/operators/pluck
var observable4 = new Observable((observer: any) => {
    observer.next({ name: 'Varun', age: 11 });
    observer.next({ name: 'Alpha', age: 40 });
    observer.next({ name: 'Bravo', age: 23 });
});

//requirement i want that obs4 should emit only VARUN, ALPHA and BRAVO
observable4 = observable4.pipe(
    map((obj: any) => {
        obj.name = obj.name.toUpperCase();
        return obj;
    }),
    pluck('name')
);

observable4.subscribe((pushedValue: string) => {
    console.log(pushedValue + ' from observer subscribed to observable based on pluck operator');
});