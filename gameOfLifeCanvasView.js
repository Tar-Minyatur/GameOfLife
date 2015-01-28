/**
 * Requires a GameOfLife object that needs to support:
 * - getColumns(): int (number of columns in the grid)
 * - getRows(): int (number of rows in the grid)
 * - isCellAlive(col, row): boolean (obtain single cell's status)
 *
 * Observer pattern:
 * If your GameOfLife object supports addListener(listener), this
 * view will register as an observer and wait for update notifications
 * submitted via notify(gameOfLife).
 */
var gameOfLifeCanvasView = function (gameOfLife, targetElement) {
    'use strict';
    
    this.cellWidth = 15;
    this.cellHeight = 15;
    this.cellSpacing = 1;
    this.fontSize = 14;
    this.gridColor = "rgb(180, 180, 180)";
    this.aliveCellColor = "rgb(100, 200, 100)";
    
    this.gameOfLife = gameOfLife;
    
    if (gameOfLife.hasOwnProperty('addListener')) {
        gameOfLife.addListener(this);
    }
    
    var canvas = document.createElement('canvas');
    canvas.width = (this.cellWidth + this.cellSpacing) * gameOfLife.getColumns();
    canvas.height = (this.cellHeight + this.cellSpacing) * gameOfLife.getRows() + this.fontSize;

    this.textYPosition = this.gameOfLife.getRows() * (this.cellHeight + this.cellSpacing) + this.fontSize;
    
    targetElement.appendChild(canvas);
    
    this.canvasContext = canvas.getContext('2d');
    this.initializeGrid();
    this.updateGrid();
};

gameOfLifeCanvasView.prototype.initializeGrid = function () {
    'use strict';
    
    this.mapGrid(function (position, canvasContext, view) {
        canvasContext.fillStyle = view.gridColor;
        canvasContext.fillRect(position.x, position.y, view.cellWidth, view.cellHeight);
    });
};

gameOfLifeCanvasView.prototype.updateGrid = function () {
    'use strict';
    
    this.mapGrid(function (position, canvasContext, view) {
        var cellColor = view.gridColor;
        if (view.gameOfLife.isCellAlive(position.col, position.row)) {
            cellColor = view.aliveCellColor;
        }
        canvasContext.fillStyle = cellColor;
        canvasContext.fillRect(position.x, position.y, view.cellWidth, view.cellHeight);
    });
    
    this.canvasContext.fillStyle = "rgb(255, 255, 255)";
    this.canvasContext.fillRect(0, this.textYPosition - this.fontSize, this.canvasContext.canvas.width, this.fontSize);
    this.canvasContext.fillStyle = "rgb(0, 0, 0)";
    this.canvasContext.font = this.fontSize + "px serif";
    this.canvasContext.fillText("Generation: " + this.gameOfLife.getGeneration(), this.cellSpacing, this.textYPosition);
};

gameOfLifeCanvasView.prototype.mapGrid = function (callback) {
    'use strict';
    
    var col, row, x, y, position;
    
    for (col = (this.gameOfLife.getColumns() - 1); col >= 0; col = col - 1) {
        for (row = (this.gameOfLife.getRows() - 1); row >= 0; row = row - 1) {
            x = col * (this.cellWidth + this.cellSpacing);
            y = row * (this.cellHeight + this.cellSpacing);
            position = {
                x: x,
                y: y,
                col: col,
                row: row
            };
            callback(position, this.canvasContext, this);
        }
    }
};

gameOfLifeCanvasView.prototype.notify = function (gameOfLife) {
    'use strict';
    
    if (gameOfLife === this.gameOfLife) {
        this.updateGrid();
    }
};