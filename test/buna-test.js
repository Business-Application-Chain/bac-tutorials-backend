const request = require('request');
const assert = require('assert');
let printAndVar = "var a = 1; print a;";
let func = "fun test(n){ print n; } test(1);"
let statAndState = 'var a; var b; a = "assigned"; print a; print b;';
let ifStat = 'var a = 1;if(a == 1){  print "ifStat";}else{  print "elseStat";}'
let elseStat = 'var a = 1;if(a == 2){  print "ifStat";}else{  print "elseStat";}'
let whereCheck = 'var a = 0;var b = 1;while (a < 5) {  print a;  var temp = a;  a = b;  b = temp + b;}'
let forCheck = 'for (var i = 0; i < 3; i = i + 1) print i;'
let funClosure = 'fun makePoint(x, y) { fun closure(method) { if (method == "x") return x; if (method == "y") return y; print "unknown method " + method; } return closure; } var point = makePoint(2, 3); print point("x"); print point("y");'
let classCheck = 'class Foo { init() {  print this; } } var foo = Foo(); print foo.init();'
let staticScope = 'var a = "global";{  fun showA() {    print a;  }  showA();  var a = "block";  showA();}'
let inheritance = 'class A { method() {print "A method"; }} class B < A { method() { print "B method";} test() {super.method(); } } class C < B {} C().test();'
let errorCheck = 'var a; var b; a = "assigned"; print a; print b'

describe('#router buna', () => {
    describe('buna', () => {
        it('print and var, should return 1', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: printAndVar }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal("1", bodyParse.stdout);
                    done();
                })
        })

        it('function, should return 1', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: func }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal("1", bodyParse.stdout);
                    done();
                })
        })

        it('statAndState, should return assigned and nil', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: statAndState }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal(["assigned","nil"].toString(), bodyParse.stdout.toString());
                    done();
                })
        })

        it('if statement, should return [A method]', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: ifStat }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal(["ifStat"].toString(), bodyParse.stdout.toString());
                    done();
                })
        })

        it('else statement, should return [A method]', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: elseStat }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal(["elseStat"].toString(), bodyParse.stdout.toString());
                    done();
                })
        })

        it('where, should return [0,1,1,2,3]', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: whereCheck }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal(["0","1","1","2","3" ].toString(), bodyParse.stdout.toString());
                    done();
                })
        })

        it('for, should return [0,1,2]', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: forCheck }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal(["0","1","2" ].toString(), bodyParse.stdout.toString());
                    done();
                })
        })

        it('function Closure, should return [2,3]', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: funClosure }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal(["2", "3" ].toString(), bodyParse.stdout.toString());
                    done();
                })
        })

        it('static scope, should return [global,global]', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: staticScope }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal(["global", "global" ].toString(), bodyParse.stdout.toString());
                    done();
                })
        })
        
        it('class check, should return [Foo instance,Foo instance, Foo instance]', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: classCheck }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal(["Foo instance", "Foo instance", "Foo instance" ].toString(), bodyParse.stdout.toString());
                    done();
                })
        })
        
        it('class inheritance, should return [A method]', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: inheritance }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    assert.equal(["A method"].toString(), bodyParse.stdout.toString());
                    done();
                })
        })

        it('error check, should return [string error]', function (done) {
            request
                .get({
                    url: 'http://127.0.0.1:3000/buna',
                    qs: { code: errorCheck }
                }, function (error, response, body) {
                    let bodyParse = JSON.parse(body);
                    assert.equal(1, bodyParse.code);
                    done();
                })
        })
        
    })
})