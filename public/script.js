//console.clear();
console.log('Hello from Script.js');

create();
function doOnce(id,func){
var interval = setInterval(function(){
	console.log('Searching..')

var ele =document.getElementById('b2');
if(ele!== null && ele!==undefined){
	clearInterval(interval);
	func();


}
},500);

}

var villageID='';




async function start() {
	// body...
var villageID='';	
villageID += document.getElementById('b0').value.split(' ')[0];
villageID += document.getElementById('b1').value.split(' ')[0];
villageID += document.getElementById('b2').value.split(' ')[0];
var start= parseInt(document.getElementById('start').value);
var stop= parseInt(document.getElementById('stop').value);
document.getElementById('startbtn').style.display='none';
var totalstr = "data:text/csv;charset=utf-8,"+'\ufeff';
for (var i = start; i <= stop; i++) {

	var data = await getKhasra(villageID,i);
	//console.log(data);
	var csvObj = parseData(data);
	var csvstr = i+','+csvObj.area+','+csvObj.name+','+csvObj.fname+'\n';
	totalstr+=csvstr;
	document.getElementById('progress').innerHTML='Getting Plot No.'+i;

}
console.log(totalstr)
var encodedUri = encodeURI(totalstr);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download",document.getElementById('b2').value.split(' ')[1]+'('+start+' to '+stop+").csv");
document.body.appendChild(link); // Required for FF
document.getElementById('startbtn').style.display='block';
document.getElementById('progress').innerHTML='';

link.click(); // This will download the data file named "my_data.csv".


}


function parseData(data){
	try{

	var area = data.split('Area : ')[1].split(' Hectare')[0];
	if(data.split('Area : ').length>2){
		var areaobjs = data.split('Area : ');
		areaobjs.shift();
		var total=0;
		for (var i = 0; i < areaobjs.length; i++) {
			var arr = areaobjs[i].split(' Hectare')[0];
			total+=parseFloat(arr);
		}
	area=total;
	
	}
	var name = data.split('1 :-  नाम :   ')[1].split('संरक्षक का नाम :')[0];
	var fname = data.split('संरक्षक का नाम : ')[1].split('निवास स्थान :')[0];
	var obj = {area:area,name:name,fname:fname};
	}
	catch(e){
	var obj = {area:'0',name:'-',fname:'-'};

	}
	
	return obj;
}


function create(argument) {
	// body...
	var body = document.getElementsByTagName('body')[0];
	var divele = document.createElement('div');
	divele.id='mydiv';
	divele.style='width:250px;margin:auto;';
	var button =document.createElement('div');
	button.innerHTML='<br>Starting Plot No.<br>';
	button.id='buttons'
	divele.append(button);
	var input = document.createElement('input');
	input.type='number';
	input.classList.add('form-select');
	input.classList.add('mb-2')
	input.id='start';
	input.value=1;
	divele.append(input);
	button =document.createElement('div');
	button.innerHTML='Last Plot No.<br>';
	button.id='button2'
	divele.append(button);
	input = document.createElement('input');
	input.type='number';
	input.classList.add('form-select');
	input.classList.add('mb-2')
	input.id='stop';
	divele.append(input);
	divele.innerHTML+='<br>'
	
	var startbtn = document.createElement('button');
	startbtn.innerHTML='START';
	startbtn.classList.add('btn');
	divele.append(startbtn);
	startbtn.style='border:1px solid black;'
	startbtn.onclick=start;
	startbtn.id='startbtn';
	startbtn.classList.add('showBtn');
	var progress = document.createElement('div');
	progress.id='progress';
	progress.innerHTML='';
	divele.append(progress);
	body.append(divele);
}


function getKhasra(villageID,gata) {
	return new Promise(function(res,rej){
		getRequest('https://upbhunaksha.gov.in/v1/mapView/MapViewAjaxApiCall/plot_info/'+villageID+'?plotNo='+gata,(y)=>{
			res(y);
		})

	})

}

function  getRequest(url,func) {
	fetch(url).then(x => x.text()).then(y => func(y));
	// body...
}
