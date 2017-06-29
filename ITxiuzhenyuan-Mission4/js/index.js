var arr=[2,3,4,2,3,5,6,4,3,2];
var unique= function(arr){
	for (var i = 0; i < arr.length; i++) {
		var Next=function (){
			for (var j = i+1 ; j < arr.length; j++) {
				if(arr[i]==arr[j]){
					delete arr[j];
				}
			}
		}
		Next();
	}
	var crr=[];
	for (var i = 0; i < arr.length; i++) {
		if(!arr[i]) continue;
		crr.push(arr[i]);
	}
	return crr;
}
console.log(unique(arr));
