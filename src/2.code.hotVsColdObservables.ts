import {Observable} from 'rxjs';

/**
 * EACH subscription causes a new execution of the OBSERVABLE
 * 
 * - Observables are lazy in the sense that they only execute values when 
 * something subscribes to it.
 * 
 * HOT VS COLD observables
 * 
 * Cold observable 
 * - data is produced within the observable OR by it, its produces only when somebody subsribes
 * - the subscribers might receive different value, because each time a subscriber subscibes, 
 * observable body is executed and fresh data may be produced.
 * - sharing of data not possible.
 * - also called unicast
 * Hot observable 
 * - data is produced outside the observable.
 * - as a result, same data can be shared among subscribers.
 * - also called multicast
 * 
 * Usecase: 
 * -for emitting dom events, hot observables are used.
 * 
 *@see https://medium.com/@luukgruijs/understanding-hot-vs-cold-observables-62d04cf92e03
 */

 var cold_observable = new Observable((observer: any)=>{
    observer.next(Math.random());// data produced within the observable.
 });

//1st subscriber, triggers a new execution of observable body
 cold_observable.subscribe((emittedValue:number)=>{
     console.log("From cold_observable: " + emittedValue);
 });

//2nd subscriber, triggers a new execution of observable body
 cold_observable.subscribe((emittedValue:number)=>{
    console.log("From cold_observable: " + emittedValue);
});

const sharedData = Math.random();
var hot_observable = new Observable((observer: any)=>{
    observer.next(sharedData);
});

//1st subscriber, triggers a new execution of observable body
hot_observable.subscribe((emittedValue:number)=>{
    console.log("From hot_observable: " + emittedValue);
});

//2nd subscriber, triggers a new execution of observable body
hot_observable.subscribe((emittedValue:number)=>{
    console.log("From hot_observable: " + emittedValue);
});