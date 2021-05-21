var myObject ={
    value: 0 ;
    increment: function (inc) {
    this.value +=typeof inc === 'number'? inc : 1;
    }    
};
    myobject.increment ();
document.writeln (myObject.value); //1
myObject.increment (2);
document.writeln(myObject.value) ; //3
