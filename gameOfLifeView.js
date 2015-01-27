var gameOfLifeView = {

	viewTable: null,

	initialize: function (gameOfLife) {
		var tableRows = gameOfLife.rows,
			tableCols = gameOfLife.cols;

		this.viewTable = this.createTable(tableCols, tableRows);
		return this.viewTable;
	},

	updateView: function (gameOfLife) {
		var tableRows = gameOfLife.rows,
			tableCols = gameOfLife.cols,
			currentCell = null;

		for (var row = 0; row < tableRows; row++) {
			for (var col = 0; col < tableCols; col++) {				
				this.updateCell(col, row, gameOfLife.isCellAlive(col, row));
			}
		}				
	},

	createTable: function (cols, rows) {
		var table = document.createElement('table'),
			newRow = null,
			newCell = null;
		table.border = 1;
		for (var row = 0; row < rows; row++) {
			newRow = table.insertRow();
			for (var col = 0; col < cols; col++) {
				newCell = newRow.insertCell();
				newCell.width = 10;
				newCell.height = 10;
			}
		}
		return table;
	},

	updateCell: function (col, row, isAlive) {
		var currentRow = this.viewTable.childNodes[0].childNodes[row],
			currentCell = currentRow.cells[col];
			backgroundColor = '#000000';

		if (isAlive) {
			backgroundColor = '#ff0000';
		}

		currentCell.style.background = backgroundColor;
	}

};