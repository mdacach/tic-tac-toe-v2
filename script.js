const DOMStuff = (function() {
	const gridContainerDiv = document.querySelector(".grid");

	function createCell() {
		const div = document.createElement("div");
		div.classList.add("cell");
		gridContainerDiv.appendChild(div);
		return div;
	}

	return {
		gridContainerDiv,
		createCell
	};
})();

const gameBoard = (function() {
	let boardArray = [
		["", "", ""],
		["", "", ""],
		["", "", ""]
	];

	let divsArray = createDivsArray();
	addClickHandler();

	function createDivsArray() {
		let divsArray = [];
		for (let i = 0; i < 3; i++) {
			let currentRow = [];
			for (let j = 0; j < 3; j++) {
				const cell = DOMStuff.createCell();
				currentRow.push(cell);
			}
			divsArray.push(currentRow);
		}
		return divsArray;
	}

	function addClickHandler() {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				divsArray[i][j].addEventListener("click", function(e) {
					e.preventDefault();
					if (boardArray[i][j] === "" && !gameFlow.winner) {
						boardArray[i][j] = gameFlow.turn;
						divsArray[i][j].classList.add(gameFlow.turn);
						gameFlow.turn === "x"
							? (gameFlow.turn = "o")
							: (gameFlow.turn = "x");
						gameFlow.update(); 
					}
				});
			}
		}
	}

	return {
		boardArray,
		divsArray
	};
})();

const gameFlow = (function() {
	let turn = "x";
	let winner = ''; 

	function checkWinner() { 
		function allEqual (array) {
			if (!array[0]) return false; // this one is not marked 

			if ((array[0] === array[1]) && (array[1] === array[2])){
				return array[0];
			}
		}
		
		function checkRows () {
			for (let i = 0; i < 3; i++){
				let winner = allEqual(gameBoard.boardArray[i])
				if (winner) return winner; 
			}
		}
		
		function checkCols () {
			for (let i = 0; i < 3; i++){
				let currentCol = [] 
				for (let j = 0; j < 3; j++){
					currentCol.push(gameBoard.boardArray[j][i]);
				}
				let winner = allEqual(currentCol); 
				if (winner) return winner; 
			}
		}

		function checkDiag () {
			diag = []
			for (let i = 0; i < 3; i++){
				diag.push(gameBoard.boardArray[i][i])
			}
			let winner = allEqual (diag);
			if (winner) return winner; 
		}

		function checkSecondDiag () { 
			secDiag = []
			for (let i = 0; i < 3; i++){
				secDiag.push(gameBoard.boardArray[i][2 - i])
			}
			let winner = allEqual(secDiag)
			if (winner) return winner; 
		}

		let winner = checkRows(); 
		if (winner) return winner; 
		winner = checkCols();
		if (winner) return winner; 
		winner = checkDiag();
		if (winner) return winner;
		winner = checkSecondDiag();
		if (winner) return winner; 

		return false; 
	}

	function checkDraw () {
		if (!gameFlow.winner) {
			for (let i =0; i < 3; i ++ ){
				for (let j = 0; j < 3; j++){
					if (gameBoard.boardArray[i][j] === '') return false; 
				}
			}
			return true; 
		}
		return false; 
	}

	function update() {
		gameFlow.winner = checkWinner();
		if (gameFlow.winner) console.log(gameFlow.winner + ' won!');
		if (checkDraw()) console.log('draw!!')
	}
	return {
		turn,
		winner, 
		update, 
	};
})();

