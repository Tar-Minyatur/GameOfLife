var gameOfLife = {

	cols: 10,
	rows: 4,
	generation: 0,
	globalCellState: true,

	getNextGeneration: function () {
		this.globalCellState = !this.globalCellState;
		return this;
	},

	isCellAlive: function (col, row) {
		return this.globalCellState;
	},

	setCellAlive: function (col, row, isAlive) {

	}

};