//Coffee Machine

let input = require('sync-input');

function Coffee() {
}

let espresso = new Coffee();
espresso.name = "espresso";
espresso.water = 250;
espresso.coffeeBeans = 16;
espresso.money = 4;

let latte = new Coffee();
latte.name = "latte";
latte.water = 350;
latte.milk = 75;
latte.coffeeBeans = 20;
latte.money = 7;

let cappuccino = new Coffee();
cappuccino.name = "cappuccino";
cappuccino.water = 200;
cappuccino.milk = 100;
cappuccino.coffeeBeans = 12;
cappuccino.money = 6;

function CoffeeMachine() {
    this.water = 400;
    this.milk = 540;
    this.coffeeBeans = 120;
    this.disposableCups = 9;
    this.money = 550;
}

function machineStatus(coffeeMachine) {
    console.log("\nThe coffee machine has:");
    console.log(`${coffeeMachine.water} ml of water`);
    console.log(`${coffeeMachine.milk} ml of milk`);
    console.log(`${coffeeMachine.coffeeBeans} ml of coffee beans`);
    console.log(`${coffeeMachine.disposableCups} disposable cups`);
    console.log(`$${coffeeMachine.money} of money\n`);
}

function fill(coffeeMachine) {
    coffeeMachine.water += parseInt(input("Write how many ml of water you want to add:\n"));
    coffeeMachine.milk += parseInt(input("Write how many ml of milk you want to add:\n"));
    coffeeMachine.coffeeBeans += parseInt(input("Write how many grams of coffee beans you want to add:\n"));
    coffeeMachine.disposableCups += parseInt(input("Write how many disposable cups you want to add:\n"));
}

function amountDecrease(coffeeMachine, coffee) {
    coffeeMachine.water -= coffee.water;
    coffeeMachine.coffeeBeans -= coffee.coffeeBeans;
    coffeeMachine.money += coffee.money;
    coffeeMachine.disposableCups--;
}

function checkIngredientsAmount(coffeeMachine, coffee) {

    let allCupNeeds = Math.min(coffeeMachine.water - coffee.water, coffeeMachine.coffeeBeans - coffee.coffeeBeans, coffeeMachine.disposableCups);

    let milkAmount = coffeeMachine.milk - coffee.milk;

    if (coffee.name === "espresso" && allCupNeeds >= 0) {
        return true;
    }

    return (coffee.name === "latte" || coffee.name === "cappuccino") && allCupNeeds >= 0 && milkAmount >= 0;

}

function enoughResourcesPrint() {
    console.log("I have enough resources, making you a coffee!\n");
}

function notEnoughResources(coffeeMachine, coffee) {

    if (coffeeMachine.water < coffee.water) {
        console.log("Sorry, not enough water!\n");
    }
    if (coffeeMachine.coffeeBeans < coffee.coffeeBeans) {
        console.log("Sorry, not enough milk!\n");
    }
    if (coffeeMachine.disposableCups === 0) {
        console.log("Sorry, not enough coffee beans!\n");
    }
    if (coffee.name !== "espresso") {
        if (coffeeMachine.milk < coffee.milk) {
            console.log("Sorry, not enough disposable cups!\n");
        }
    }

}


let coffeeMachine = new CoffeeMachine();

do {

    let action = input("Write action (buy, fill, take, remaining, exit):\n");

    if (action === "remaining") {
        machineStatus(coffeeMachine);
    } else if (action === "exit") {
        break;
    } else if (action === "buy") {

        let action = input("\nWhat do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:\n");

        if (action === "back") {
            continue;
        }

        switch (parseInt(action)) {
            case 1:
                if (checkIngredientsAmount(coffeeMachine, espresso)) {
                    enoughResourcesPrint();
                    amountDecrease(coffeeMachine, espresso);
                } else {
                    notEnoughResources(coffeeMachine, espresso);
                }
                break;
            case 2:
                if (checkIngredientsAmount(coffeeMachine, latte)) {
                    enoughResourcesPrint();
                    amountDecrease(coffeeMachine, latte);
                    coffeeMachine.milk -= latte.milk;
                } else {
                    notEnoughResources(coffeeMachine, latte);
                }
                break;
            case 3:
                if (checkIngredientsAmount(coffeeMachine, cappuccino)) {
                    enoughResourcesPrint();
                    amountDecrease(coffeeMachine, cappuccino);
                    coffeeMachine.milk -= cappuccino.milk;
                } else {
                    notEnoughResources(coffeeMachine, cappuccino);
                }
                break;
            default:
                console.log("wrong input");
        }

    } else if (action === "fill") {
        fill(coffeeMachine);
    } else if (action === "take") {
        console.log("I gave you " + coffeeMachine.money);
        coffeeMachine.money = 0;
    } else {
        console.log("wrong input");
    }

} while (true);