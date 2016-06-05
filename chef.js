function helpCustomer(name, foodDone) {
    console.log('Going to help ' + name);

    // This function will be called ofter 5 seconds (5000 miliseconds)
    setTimeout(function(){

        console.log('food done for ' + name);
        foodDone(name); // Call the callback function

    }, 5000);
}

function startEating(name) {
    console.log(name + ' will now start eating');
}

helpCustomer('Samir', startEating);
helpCustomer('Marwa', startEating);
helpCustomer('Hadi', startEating);

