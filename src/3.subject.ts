import { Subject } from 'rxjs';

/**
 * 
 * Subject
 * - they are subclass of observables
 * - it can both emit and handle values, it's both observer and observable 
 * - Obervable is unicast by default - every observer triggers a new execution or 
 * owns a single execution of observable
 * - Subject is multicast by default - all observers share a single execution of observable,
 * so every observer receives same data.
 * - when subscribe is called, a new execution is not triggerred, simply, given observer is addded
 * to list of observers.
 * 
 * IMPORTANT :
 * If you ever encounter the scenario where your
 * Observable subscriptions receive different values, and you want them to receive same value,
 * use Subjects.
 * 
 * @see https://medium.com/@luukgruijs/understanding-rxjs-subjects-339428a1815b
 */

var subject = new Subject();

//1st observer
var observer1 = subject.subscribe((emittedValue: any) => {
    console.log(emittedValue + ' from observer 1');
});

//2nd observer
var observer2 = subject.subscribe((emittedValue: any) => {
    console.log(emittedValue + ' from observer 2');
});

subject.next('Hello ');//triggers next() of all observers, single execution shared by all.

//3rd observer - this will not receive value 'hello', since values are pushed before 
// this observer subscribed.
subject.subscribe((emittedValue: any) => {
    console.log(emittedValue + ' from observer 3');
});

//observer 2 will not recieve value '2nd hello'
observer2.unsubscribe();

//observer 1 and observer 3 will receive '2nd hello'
subject.next('2nd Hello')

