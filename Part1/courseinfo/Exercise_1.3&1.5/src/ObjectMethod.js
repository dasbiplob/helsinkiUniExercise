const arto = {
    name : 'Sneha Ghosh',
    age: 30,
    occupation: 'Teacher',

    greet: function (){
        console.log('hello, my name is ' + this.name);
    },

    doAddition: function(a,b){
        console.log(a+b)
    }
}

arto.growOld = function(){
    this.age +=1
}


arto.greet()
console.log(arto.age)

setTimeout(arto.greet.bind(arto), 1000)

arto.growOld()
console.log(arto.age)
arto.doAddition(7, 9)

const referenceToAddition = arto.doAddition
referenceToAddition(10, 25)
