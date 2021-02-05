
function* genFunc(){
    yield 1;
    yield 2;
    yield 3;
}
const generator = genFunc();
console.log(Symbol.iterator in generator);
console.log('next' in generator);
/**
 * 제너레이터 객체는 이터러블이면서 동시에 이터레이터다.
 * 다시 말해, 제너레이터 객체는 Symbol.iterator메서드를 상속받는 이터러블이면서 value, done프로퍼티를 갖는 
 * 이터레이터 리절트 객체를 반환하는 next 메서드를 소유하는 이터레이터다.
 * 제너레이터 객체는 next메서드를 가지는 이터레이터이므로 Symbol.iterator메서드를 호출해서 별도로 이터레이터를 생성할 필요가 없다.
 * 
 * 제너레이터 객체는 next메서드를 갖는 이터레이터이지만 이터레이터에는 없는 return, throw 메서드를 갖는다. 
 * 제너레이터 객체의 세 개의 메서드를 호출하면 다음과 같이 동작한다.
 * 
 * next메서드를 호출하면 제너레이터 함수의 yield표현식까지 코드 블록을 실행하고 yield된 값을 value프로퍼티 값으로,
 * false를 done프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.
 * 
 * return 메서드를 호출하면 인수로 전달받은 value 프로퍼티 값으로, true를 done프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.
 */