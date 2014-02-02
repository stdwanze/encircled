
Encircled = window.Encircled || {};

(function (Encircled){
	"use strict";
	Encircled.Game = (function (){
		
		function game (canvas)
		{
			this.canvas = canvas;
			this.engine = new CanvasKit.EngineBase(this.canvas);
			
			this.engine.keyHandler = this.keyDown.bind(this);
			this.engine.processBegin = this.processBegin.bind(this);
			this.engine.processEnd = this.processEnd.bind(this);
			
			// intermidiate
			this.shapes = [];
			
			this.setup();
		}
		game.prototype = {
			
			run: function ()
			{
				this.engine.setState(CanvasKit.EngineStates.RUN);
			},
			setup: function ()
			{
				this.shapes.push(new CanvasKit.Circle(new CanvasKit.Point(this.canvas.width/2, this.canvas.height/2),100));
				
			},
			keyDown : function ()
			{
				
			},
			processBegin : function ()
			{
				this.engine.shapes = this.shapes;
			},
			processEnd : function ()
			{
				
			}
		};
		
		return game;
	}());
	
}(window.Encircled || {}));
