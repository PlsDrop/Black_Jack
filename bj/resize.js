//  1080*1.7777777777777777 = 1920
//  1920/1.7777777777777777 = 1080

//  if w/h < 1.77 = w<h(16/9)
//  if w/h > 1.77 = w>h(16/9)

// Тут я сделал скрипт который будет масштабировать блок и весь текст в нужном мне соотношении в зависимости от размеров окна
//(нужно для того что бы все элементы красиво масштабировались вместе с фоновым изображением)

window.onload = function () {
	let blockElement = document.querySelector('.test3');
	let textElement = document.querySelectorAll('.ttt2');
	
	textElement.forEach((item) => {
		item.style.fontSize = (this.innerWidth / 16 * 9) / 36 + 'px';
	}); 

	if (this.innerWidth / this.innerHeight < 1.7777777777777777){
		blockElement.style.width = this.innerWidth + 'px';
		blockElement.style.height = (this.innerWidth / 16 * 9) + 'px';
	} 
	else {
		blockElement.style.height = this.innerHeight + 'px';
		blockElement.style.width = (this.innerHeight / 9 * 16) + 'px';
		blockElement.style.left = (this.innerWidth - (this.innerHeight / 9 * 16)) / 2 + 'px'; 
	}
	
	window.onresize = function () {
		
		textElement.forEach((item) => {
			item.style.fontSize = (this.innerWidth / 16 * 9) / 36 + 'px';
		});
		//console.log(this);
		
		if (this.innerWidth / this.innerHeight < 1.7777777777777777){
			blockElement.style.width = this.innerWidth + 'px';
			blockElement.style.height = (this.innerWidth / 16 * 9) + 'px';
		} 
		else {
			blockElement.style.height = this.innerHeight + 'px';
			blockElement.style.width = (this.innerHeight / 9 * 16) + 'px';
			blockElement.style.left = (this.innerWidth - (this.innerHeight / 9 * 16)) / 2 + 'px'; 
		}
	}
} 