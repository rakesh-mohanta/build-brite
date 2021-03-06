var github = require('octonode')
	, j5 = require('johnny-five');


var board = j5.Board();



//add your github token
var client = github.client('xxxxxxxx');

//enter your repository, it must be a repository where you have pull rights, and it needs to have CI incorporated. 
var repo = client.repo('username/reponame');


var lights = function(status){

//create two instances of LEDs and toggle	
var red = new j5.Led({pin : 9});
var green = new j5.Led({pin : 10})
if(status == 'success'){

	green.on();
	red.off();
}
else{	
	red.on();
	green.off();
}

}


var get_status = function(){
	repo.statuses('master', function(err, status, body){
 	//do whatever you'd like with the most recent status!
	console.log(status[0].state);
	//change the color based on the last status
	lights(status[0].state);
 })};


board.on('ready', function (){
	setInterval(get_status, 500);
});



