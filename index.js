class Car {
    name;
    count;
}

function addCar() {

    console.log("Click");

    var car = document.getElementById("newCar").value
    document.getElementById("newCar").value = '';

    if (car !== '') {
        var lsCar = new Car();
        lsCar.name = car;
        lsCar.count = 0;
        createCounter(lsCar);
        saveCar(lsCar);

    } else {
        alert("Enter a Car");
    }


}

function createCounter(lsCar) {


    var carList = document.getElementById("car-list");
    var carRow = document.createElement("div");
    var newCar = document.createElement("span");
    var carAdd = document.createElement('button');
    var carSub = document.createElement('button');
    var cartotal = document.createElement("span");

    carRow.setAttribute("id", `${lsCar.name}`)

    carAdd.innerText = "+";
    carAdd.setAttribute('onClick', "add(this.parentNode.id)");

    carSub.innerText = "-";
    carSub.setAttribute('onClick', "subtract(this.parentNode.id)");

    cartotal.setAttribute('id', `${lsCar.name}Total`);


    newCar.innerText = lsCar.name;
    cartotal.innerText = lsCar.count;
    carRow.appendChild(newCar);
    carRow.appendChild(carAdd);
    carRow.appendChild(carSub);
    carRow.appendChild(cartotal);

    carList.appendChild(carRow);

}


async function add(id) {
    var carTotal = document.getElementById(`${id}Total`);
    
    var cars = await getCars();
    var specificCar = cars.findIndex(car => car.name === id);
    cars[specificCar].count += 1;
    carTotal.innerText = cars[specificCar].count;
    localStorage.setItem('test1', JSON.stringify(cars));
}

async function subtract(id) {
    var carTotal = document.getElementById(`${id}Total`);
    var cars = await getCars();
    var specificCar = cars.findIndex(car => car.name === id);
    cars[specificCar].count -= 1;
    carTotal.innerText = cars[specificCar].count;
    localStorage.setItem('test1', JSON.stringify(cars));
}


async function saveCar(car) {
    var cars = await getCars();
    cars.push(car);
    localStorage.setItem('test1', JSON.stringify(cars));
}

async function getCars() {
    var cars = await JSON.parse(localStorage.getItem('test1'));
    if (cars !== null) {
        return cars;
    } else {
        cars = [];
        return cars;
    }
}

async function startUp() {
    document.getElementById("car-list").innerHTML = '';

    var cars = await getCars();

    if (cars !== null) {
        cars.forEach(car => {
            createCounter(car);
        });
    } else {
        // ADD A message to add a todo!
    }

}
startUp();