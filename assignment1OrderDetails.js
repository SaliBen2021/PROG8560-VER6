
//flag variable to distinguish between meals
var flag;
const Order = require("./assignment1Order");
// elements of the order object
const OrderState = Object.freeze(
    {
        WELCOMING: Symbol("welcoming"),
        MEAL: Symbol("meal"),
        SAUCE: Symbol("sauce"),
        SIZE: Symbol("size"),
        TOPPINGS: Symbol("toppings"),
        DRINKS: Symbol("drinks"),
        PHONE: Symbol("phone"),
        SALAD: Symbol("salad")
    });
    
module.exports = class ShwarmaOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sMeal = "";
        this.sSauce = "";
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sPhone = "";
        this.sSalad = "";
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.MEAL;
                //this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Sali's resturant.");
                aReturn.push("What meal would you like from the following list:" + "\n" + "1- Salmon--$10" + "\n" + "2- Shawarma--$7" + "\n" + "3- Cuscos-$13");
                break;
            case OrderState.MEAL:
                if (sInput == "salmon" || sInput == "SALMON" || sInput == "Salmon") {
                    flag = 0;
                    this.stateCur = OrderState.SAUCE
                    this.sMeal = sInput;
                    this.sItem = "Salmon";
                    aReturn.push("What sauce would you like?");
                }
                else if (sInput == "shawarma" || sInput == "SHAWARMA" || sInput == "Shawarma") {
                    flag = 1;
                    this.stateCur = OrderState.SIZE
                    this.sMeal = sInput;
                    this.sItem = "Shawarma";
                    aReturn.push("What size would you like?");
                }
                else if (sInput == "cuscos" || sInput == "CUSCOS" || sInput == "Cuscos") {
                    flag = 2;
                    this.stateCur = OrderState.SIZE
                    this.sMeal = sInput;
                    this.sItem = "Cuscos";
                    aReturn.push("What size would you like?");
                }
                break;
            case OrderState.SAUCE:
                this.stateCur = OrderState.SALAD
                this.sSauce = sInput;
                aReturn.push("Would you like salad with that?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SALAD
                this.sToppings = sInput;
                aReturn.push("Would you like salad with that?");
                break;
            case OrderState.SALAD:
                this.stateCur = OrderState.DRINKS
                if (sInput.toLowerCase() != "no") {
                    this.sSalad = sInput;
                }
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.stateCur = OrderState.PHONE
                if (sInput.toLowerCase() != "no") {
                    this.sDrinks = sInput;
                }
                aReturn.push("Please enter your phone number:");
                break;
            case OrderState.PHONE:
                this.sPhone = sInput;
                this.isDone(true);
                aReturn.push("Thank-you for your order of");
                if (flag == 0) {
                    aReturn.push(`${this.sSauce} ${this.sItem}`);
                }
                if (flag == 1)
                    aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if (flag == 2)
                    aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if (this.sDrinks) {
                    aReturn.push(this.sDrinks);
                }
                if (this.sSalad) {
                    aReturn.push(this.sSalad + " salad");
                }
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`We will call your phone:${this.sPhone}`);
                aReturn.push(`to pick the order at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}