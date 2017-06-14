var chxbtn = document.querySelector("#chicken")
	  , runbtn = document.querySelector("#roadRunner")
	  , stuffbtn = document.querySelector("#secretStuff")
	  , remchx = document.querySelector("#remChx")
	  , remruns = document.querySelector("#remRuns")
	  , remstuff = document.querySelector("#remStuff")
	  , chxTot = document.querySelector("#chxTot")
	  , runnerTot = document.querySelector("#runnerTot")
	  , stuffTot = document.querySelector("#stuffTot")
	  , tot = document.querySelector("#tot")
	  , chxCookie = Cookies.get("chx")
	  , runsCookie = Cookies.get("runs")
	  , stuffCookie = Cookies.get("stuff")
	  , totalCookie = Cookies.get("total")
	  , reset = document.querySelector("#newCustomer")
	  , customerInput = document.querySelector("#name")
	  , customerDisplay = document.querySelector("#customer")
	  // , customer = Cookies.get("customer")
	  , form = document.querySelector("form");


function Register(){
	this.customers = [];
	this.customerName = customerInput.value;
	this.chicken = ~~chxCookie;
	this.roadRunner = ~~runsCookie;
	this.secretStuff = ~~stuffCookie;
	this.total = ~~totalCookie;
	chxTot.innerText = this.chicken;
	runnerTot.innerText = this.roadRunner;
	stuffTot.innerText = this.secretStuff;
	tot.innerText = this.total;
}

Register.prototype.addCustomer = function(cust){
	 if(cust instanceof Customer){
    	this.customers.push(cust);
    	document.getElementById("list").innerHTML += "<li class='formCust'>" + cust.name + ": " + cust.chxOrder + " chicken, " + cust.roadOrder + " Road Runner, " + cust.stuffOrder + " Michael's Secret Stuff = $" + cust.totOrder + "</li>";
    	
    }else{
    	return false;
    };
};

function Customer(name, chxOrder, roadOrder, stuffOrder,totOrder){
	this.name = name;
	this.chxOrder = chxOrder;
	this.roadOrder = roadOrder;
	this.stuffOrder = stuffOrder;
	this.totOrder = totOrder;
}

Register.prototype.checkInput = function(){
	var customer = Cookies.get("customer")
	console.log("customer:", customer)
	if(customer){
		$("form").hide();
		customerDisplay.innerText = customer;
	}else{
		customerDisplay.innerText = "";
		customerInput.value = null;
		$("form").show();
	};
};

Register.prototype.assignCustomer = function(){
	Cookies.set("customer", customerInput.value);
	this.checkInput();
}

Register.prototype.addChicken = function(){
		this.chicken += 1;
		this.total += 6;
		chxTot.innerText = this.chicken;
		tot.innerText = this.total;
}
Register.prototype.removeChicken = function(){
	if(this.chicken > 0){
		this.chicken -= 1;
		this.total -= 6;
		chxTot.innerText = this.chicken;
		tot.innerText = this.total;
	}else{
		this.chicken = 0;
	}
}

Register.prototype.addRunner = function(){
		this.roadRunner += 1;
		this.total += 9;
		runnerTot.innerText = this.roadRunner;
		tot.innerText = this.total;
}
Register.prototype.removeRunner = function(){
	if(this.roadRunner > 0){
		this.roadRunner -= 1;
		this.total -= 9;
		runnerTot.innerText = this.roadRunner;
		tot.innerText = this.total;
	}else{
		this.roadRunner =0;
	}
}

Register.prototype.addStuff = function(){
		this.secretStuff += 1;
		this.total += 150;
		stuffTot.innerText = this.secretStuff;
		tot.innerText = this.total;
}
Register.prototype.removeStuff = function(){
	if(this.secretStuff > 0){
		this.secretStuff -= 1;
		this.total -= 150;
		stuffTot.innerText = this.secretStuff;
		tot.innerText = this.total;
	}else{
		this.secretStuff = 0;
	}
}
Register.prototype.updateCookies = function(){
	Cookies.set("chx", this.chicken);
	Cookies.set("runs", this.roadRunner);
	Cookies.set("stuff", this.secretStuff);
	Cookies.set("total", this.total);
}

var tunes = new Register();

document.addEventListener("DOMContentLoaded", function(){

	tunes.checkInput();

	$("#drop").click(function(){
    	$(".wrapper").slideDown(1000);
	});
    $("#hide").click(function(){
    	$(".wrapper").slideUp(1000);
    });

	form.addEventListener("submit", function(event){
		console.log('submit');
		event.preventDefault();
		tunes.assignCustomer();
	})
	chxbtn.addEventListener("click",function(){
		tunes.addChicken();
		tunes.updateCookies();
	});
	remchx.addEventListener("click", function(){
		tunes.removeChicken();
		tunes.updateCookies();
	});
	runbtn.addEventListener("click",function(){
		tunes.addRunner();
		tunes.updateCookies();
	});
	remruns.addEventListener("click",function(){
		tunes.removeRunner();
		tunes.updateCookies();
	});
	stuffbtn.addEventListener("click",function(){
		tunes.addStuff();
		tunes.updateCookies();
	});
	remstuff.addEventListener("click",function(){
		tunes.removeStuff();
		tunes.updateCookies();
	});
	reset.addEventListener("click", function(){
		tunes.addCustomer(new Customer(Cookies.get("customer"),Cookies.get("chx"),Cookies.get("runs"),Cookies.get("stuff"),Cookies.get("total")));
		Cookies.expire("chx");
		Cookies.expire("runs");
		Cookies.expire("stuff");
		Cookies.expire("total");
		Cookies.expire("customer");
		tunes.checkInput();
		// location.reload();
		tunes = new Register();
	});
});