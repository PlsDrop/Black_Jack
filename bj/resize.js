//  1080*1.7777777777777777 = 1920
//  1920/1.7777777777777777 = 1080
//  1920/10.4918033 = 183
//  1080/4.21875 = 256

//  if w/h < 1.77 = w<h
//  if w/h > 1.77 = w>h

window.onload = function () {
	let blockElement = document.querySelector('.test3');
	let cardElement = document.querySelectorAll('.test');

	let textElement = document.querySelectorAll('.ttt2');
	
	textElement.forEach((item) => {
		item.style.fontSize = (this.innerWidth / 16 * 9) / 36 + 'px';
	}); 

	if (this.innerWidth / this.innerHeight < 1.7777777777777777){
		blockElement.style.width = this.innerWidth + 'px';
		blockElement.style.height = (this.innerWidth / 16 * 9) + 'px';
	
		/* cardElement.forEach((item) => {
			item.style.width = (this.innerWidth / 10.4918033) + 'px';
			item.style.height = ((this.innerWidth / 16 * 9) / 4.21875)+ 'px';
		});  */
	} 
	else {
		
		blockElement.style.height = this.innerHeight + 'px';
		blockElement.style.width = (this.innerHeight / 9 * 16) + 'px';
		blockElement.style.left = (this.innerWidth - (this.innerHeight / 9 * 16)) / 2 + 'px'; 

		cardElement.forEach((item) => {
			item.style.width = ((this.innerHeight / 9 * 16) / 10.4918033)+ 'px';
			item.style.height = (this.innerHeight / 4.21875) + 'px';
		});  

	}
	window.onresize = function () {
		//console.log(textElement);
		textElement.forEach((item) => {
			item.style.fontSize = (this.innerWidth / 16 * 9) / 36 + 'px';
		});
		
		if (this.innerWidth / this.innerHeight < 1.7777777777777777){
			blockElement.style.width = this.innerWidth + 'px';
			blockElement.style.height = (this.innerWidth / 16 * 9) + 'px';
		
			/* cardElement.forEach((item) => {
				item.style.width = (this.innerWidth / 10.4918033) + 'px';
				item.style.height = ((this.innerWidth / 16 * 9) / 4.21875)+ 'px';
			});  */
		} 
		else {
			blockElement.style.height = this.innerHeight + 'px';
			blockElement.style.width = (this.innerHeight / 9 * 16) + 'px';
			blockElement.style.left = (this.innerWidth - (this.innerHeight / 9 * 16)) / 2 + 'px'; 
		
			/* cardElement.forEach((item) => {
				item.style.width = ((this.innerHeight / 9 * 16) / 10.4918033)+ 'px';
				item.style.height = (this.innerHeight / 4.21875) + 'px';
			});  */

		}
	}

} 