var chxbtn = document.querySelector("#chicken")
	  , runbtn = document.querySelector("#roadRunner")
	  , stuffbtn = document.querySelector("#secretStuff")
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
	  , customer = Cookies.get("customer")
	  , form = document.querySelector("form");


function Register(){
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

Register.prototype.assignCustomer = function(){
	Cookies.set("customer", customerInput.value);
	location.reload();
}

Register.prototype.addChicken = function(){
		this.chicken += 1;
		this.total += 6;
		chxTot.innerText = this.chicken;
		tot.innerText = this.total;
}

Register.prototype.addRunner = function(){
		this.roadRunner += 1;
		this.total += 9;
		runnerTot.innerText = this.roadRunner;
		tot.innerText = this.total;
}

Register.prototype.addStuff = function(){
		this.secretStuff += 1;
		this.total += 150;
		stuffTot.innerText = this.secretStuff;
		tot.innerText = this.total;
}
Register.prototype.updateCookies = function(){
	Cookies.set("chx", this.chicken);
	Cookies.set("runs", this.roadRunner);
	Cookies.set("stuff", this.secretStuff);
	Cookies.set("total", this.total);
}

var tunes = new Register();

document.addEventListener("DOMContentLoaded", function(){

	if(customer){
		$("form").hide();
		customerDisplay.innerText = customer;
	}else{
		customerDisplay.innerText = "";
		$("form").show();
	}

	form.addEventListener("submit", function(event){
		event.preventDefault();
		tunes.assignCustomer();
	})
	chxbtn.addEventListener("click",function(){
		tunes.addChicken();
		tunes.updateCookies();
	});
	runbtn.addEventListener("click",function(){
		tunes.addRunner();
		tunes.updateCookies();
	});
	stuffbtn.addEventListener("click",function(){
		tunes.addStuff();
		tunes.updateCookies();
	});
	reset.addEventListener("click", function(){
		Cookies.expire("chx");
		Cookies.expire("runs");
		Cookies.expire("stuff");
		Cookies.expire("total");
		Cookies.expire("customer")
		location.reload();
	})
});