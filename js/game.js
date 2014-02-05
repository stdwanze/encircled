
Encircled = window.Encircled || {};

(function (Encircled){
	"use strict";
	
	Encircled.Config = {
		MovementSpeed : 2,
		DifferentialSpeed : 2
	};
	
	
	Encircled.Game = (function (){
		
		
		function createPaddle(game,arc)
		{
				return (new Encircled.PaddlePair(new CanvasKit.Point(game.canvas.width/2, game.canvas.height/2)
				,100
				,new CanvasKit.Point(40, 20)
				,arc));
		}
		function createBall(game)
		{
			return new Encircled.Ball(new CanvasKit.Point(game.canvas.width/2, game.canvas.height/2),5, new CanvasKit.Point(1,1));
		}
		
		
		function game (canvas)
		{
			this.canvas = canvas;
			this.engine = new CanvasKit.EngineBase(this.canvas);
			
			this.engine.keyHandler = this.keyDown.bind(this);
			this.engine.processBegin = this.processBegin.bind(this);
			this.engine.processEnd = this.processEnd.bind(this);
			
			// intermidiate
			this.shapes = [];
			this.paddle = null;
			this.circle = null;
			this.ball = null;
			this.currArc = 0;
			this.setup();
		}
		game.prototype = {
			
			run: function ()
			{
				this.engine.setState(CanvasKit.EngineStates.RUN);
			},
			setup: function ()
			{
				this.circle = new CanvasKit.Circle(new CanvasKit.Point(this.canvas.width/2, this.canvas.height/2),100);
				this.ball = createBall(this);
				this.paddle = createPaddle(this,0);
				
				this.shapes.push(this.circle);
				this.shapes.push(this.paddle);
				this.shapes.push(this.ball);
				
			},
			keyDown : function (event)
			{
				switch(event.keyCode)
				{
					case 37: this.paddle.move(Encircled.Config.MovementSpeed); break;
					case 38: this.paddle.paddleSpaceChange(Encircled.Config.DifferentialSpeed); break;
					case 39: this.paddle.move(-Encircled.Config.MovementSpeed); break;
					case 40: this.paddle.paddleSpaceChange(-Encircled.Config.DifferentialSpeed); break;
					
					
				}
				
			},
			processBegin : function ()
			{
				
				if(this.ball.isOut() || this.paddle.collideBall(this.ball) != null)
				{
					this.ball = createBall(this);
				}
				
				this.shapes = [];
				this.shapes.push(this.circle);
				this.shapes.push(this.paddle);
				this.shapes.push(this.ball);
				
				this.engine.shapes = this.shapes;
			},
			processEnd : function ()
			{
				
			}
		};
		
		return game;
	}());
	return Encircled;
}(window.Encircled || {}));
