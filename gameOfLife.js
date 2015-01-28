var gameOfLife = {

	cols: 30,
	rows: 30,
	generation: 0,
	globalCellState: true,
    listeners: [],

	getNextGeneration: function () {
		this.globalCellState = !this.globalCellState;
        this.generation = this.generation + 1;
        this.notifyAll();
		return this;
	},

	isCellAlive: function (col, row) {
		return Math.random() > 0.5;
	},

	setCellAlive: function (col, row, isAlive) {

	},
    
    getColumns: function () {
        return this.cols;
    },
    
    getRows: function () {
        return this.rows;
    },
    
    getGeneration: function () {
        return this.generation;
    },
    
    addListener: function (listener) {
        this.listeners.push(listener);
    },
    
    notifyAll: function () {
        this.listeners.forEach(function (listener) {
            listener.notify(gameOfLife);
        });
    }

};