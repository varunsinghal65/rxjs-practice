/**
 * Behavioural subject
 * - a variation of subject that will push the last value emitted from subject to 
 * the new subscriber.
 * 
 * ReplaySubject(X), ReplaySubject(X, ms)
 * - allows us to specify the designated number of values that were emitted before the new subscription and
 *  should be pushed to the newly created subscriber
 * - ms allows us to specify a time window, push all values that were emitted before 3 seconds
 * of new subscription
 * 
 * AsyncSubject
 * - will push the last emitted value to a subscriber only after complete is called.
 * 
 * @see https://medium.com/@luukgruijs/understanding-rxjs-behaviorsubject-replaysubject-and-asyncsubject-8cc061f1cfc0
 */

import { BehaviorSubject, AsyncSubject } from "rxjs";

var bSubject = new BehaviorSubject('First');

bSubject.next('1st hello');

//will receieve both 1st hello and 2nd hello
bSubject.subscribe((pushedValue: any) => {
    console.log(pushedValue);
});

bSubject.next('2nd hello');

var aSubject = new AsyncSubject();

aSubject.next('3rd hello');
aSubject.next('4th hello');
aSubject.next('5th hello');

//this observer will not receieve the value, since complete has not been called.
aSubject.subscribe((pushedValue: any) => {
    console.log(pushedValue + ' from async subject based observer fired');
});

//this observer will receieve the last value emitted, since complete has been called.
aSubject.subscribe((pushedValue: any) => {
    console.log(pushedValue + ' from async subject based observer fired');
});

//remove this and the 2 observers will not reveive any value.
aSubject.complete();


