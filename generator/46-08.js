/**
 * 제너레이터의 일시 중지와 재개
 * 제너레이터는 yield키워드와 next메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재ㅐ할 수 있다. 
 * 일반 함수는 호출 이후 제어권을 함수가 독점하지만 제너레이터는 함수 호출자에게 제어권을 양도하여 필요한 시점에 함수 실행을 재개할 수 있다.
 * 제너레이터 함수를 호출하면 제너레이터 함수의 코드 블록이 실행되는 거이 아니라 제너레이터 객체를 반환한다고 했다.
 * 이터러블이면서 동시에 이터레이터인 제너레이터 객체는 next메서드를 갖는다. 제너레이터 객체의 next메서드를 호출하면 제너레이터 함수의 코드 블록을 실행한다.
 * 단, 일반 함수처럼 한 번에 코드 블록의 모든 코드를 일괄 실행하는 것이 아니라 yield표현식까지만 실행한다.
 * yield키워드는 제너레이터 함수의 실행을 일시 중지시키거나 yield키워드 뒤에오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다.
 */
function* genFunc(){
    yield 1;
    yield 2;
    yield 3;
    return 'hi';
}
const generator=genFunc();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
/**
 * 제너레이터 객체의 next메서드를 호출하면 yield 표현식까지 실행되고 일시 중지된다. 이때 함수의 제어권이 호출자로 양도된다.
 * 이후 필요한 시점에 호출자가 또다시 next메서드를 호출하면 일시 중지된 코드부터 실행을 재개하기 시작하여 다음 yield표현식까지 실행되고 또 다시 일시 중지된다.
 * 이때 제너레이터 객체의 next메서드는 vaule, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다.
 * next메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 yield 표현식에서 yield된 값(yield 키워드 뒤의 값)이 할당되고 done프로퍼티에는
 * 제너레이터 함수가 끝까지 실행되었는지를 나타내는 불리언 값이 할당된다.
 * 
 * 이처럼 next메서드를 반복 호출하면 yield 표현식까지 실행과 일시 중지를 반복하다가 제너레이터 함수가 끝까지 실행되면 next메서드가 반환하는
 * 이터레이터 리절트 객체의 value 프로퍼티에는 제너레이터 함수의 반환값이 할당되고 done 프로퍼티에는 제너레이터 함수가 끝까지 실행되었음을 나타내는 false가 할당된다.
 * 
 * 이터레이터의 next 메서드와 달리 제너레이터 객체의 next메서드에는 인수를 전달할 수 있다. 제너레이터 객체의 next메서드에 전달한 인수는
 * 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다. yield 표현식을 할당받는 변수에 yield 표현식의 평가 결과가 할당되지 않는 것에 주의하기 바람
 */
function* genFunc2(){
    //처음 next메서드를 호출하면 첫 번째 yield표현식까지 실행되고 일시 중지된다.
    //이때 yield된 값 1은 next메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당된다.
    //x변수에는 아직 아무것도 할당되지 않았다. x변수의 값은 next 메서드가 두 번째 호출될 때 결정된다.
    
    const x=yield 1;
    //두 번째 next메서드를 호출할 때 전달한 인수 10은 첫 번째 yield표현식을 할당받는 x변수에 할당된다.
    //즉, const x=yield 1;은 두 번째 next메서드를 호출했을 때 완료된다. 
    //두 번쨰 next메서드를 호출하면 두 번째 yield표현식까지 실행되고 일시 중지된다.
    //이때 yield된 값 x+10은 next 메서드가 반환한 이터레이터 리절트 객체의 value프로퍼티에 할당된다.
    const y=yield (x+10);

    //세 번째 next메서드를 호출할 떄 전달한 인수 20은 두 번째 yield표현식을 할당받는 y변수에 할당된다.
    //즉, const y=yield (x+10);는 세 번째 next메서드를 호출했을 때 완료된다.
    //세 번째 next 메서드를 호출하면 함수 끝까지 실행된다.
    //이때 제너레이터 함수의 반환값 x+y는 next메서드가반환한 이터레이터 리절트 객체의 value프로퍼티에 할당된다.
    //일반적으로 제너레이터의 반환값은 의미가 없다. 따라서 제너레이터에서는 값을 반환할 필요가 없고 return은 종료의 의미로만 사용해야 한다.
    return x+y;
}
const generator2=genFunc2(100);
//처음 호출하는 next메서드에는 인수를 전달하지 않는다.
//만약 처음 호출하는 next메서드에 인수를 전달하면 무시된다.
//next메서드가 반환한 이터레이터 리절트 객체의 value프로퍼티에는 첫 번째 yield된 값 1이 할당된다.
let res=generator2.next();
console.log(res);

//next메서드에 인수로 전달한 10은 genFunc2 함수의 x변수에 할당된다.
//next메서드가 반환한 이터레이터 리절트 객체의 value프로퍼티에는 두 번째 yield된 값 20이 할당된다.
res=generator2.next(10);
console.log(res);

//next메서드에 인수로 전달한 20은 genFunc 함수의 y변수에 할당된다.
//next메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에는 제너레이터 함수의 반환값 30이 할당된다.
res=generator2.next(20);
console.log(res);