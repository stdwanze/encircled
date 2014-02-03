Encircled = window.Encircled || {};

(function (Encircled){
	"use strict";
	Encircled.Paddle = (function (){
		
		function updatePos(paddle)
		{
			paddle.cosX =  Math.cos(paddle.currArcPosInRad);
			paddle.sinY =  Math.sin(paddle.currArcPosInRad);
		}
		
		function paddle (center,radius,size,arc)
		{
			this.color = "#000000";
			this.paddleSize = size;
			this.cosX = 0;
			this.sinY = 0;
			this.currArcPosInArc = arc;
			this.currArcPosInRad = 0;
			this.setPosInArc( arc );
			updatePos(this);
			
			CanvasKit.EngineElement.call(this,center,radius);
		}
		
		paddle.prototype = new CanvasKit.EngineElement();
		paddle.prototype.constructor = paddle;
		
		paddle.prototype.setPosInArc = function (arc)
		{
			this.currArcPosInArc = arc % 360;
			this.currArcPosInRad = arc*Math.PI/180;
			updatePos(this);
		};
		
		paddle.prototype.render = function (canvas, ctxt)
		{
			ctxt.save();
			ctxt.translate( this.location.x + (this.sinY*this.size) , this.location.y+(this.cosX*this.size));
			ctxt.rotate( -this.currArcPosInRad);
			ctxt.fillStyle = this.color;
			ctxt.fillRect(-this.paddleSize.x/2, -this.paddleSize.y/2, this.paddleSize.x, this.paddleSize.y);
			ctxt.restore();
		};
		
		return paddle;
	}());
	
	Encircled.PaddlePair = (function (){
		
		function paddlepair (center,radius,size,arc)
		{
			this.paddleSpace = 180;
			this.paddle1 = new Encircled.Paddle(center,radius,size,arc);
			this.paddle2 = new Encircled.Paddle(center,radius,size,arc+this.paddleSpace);
			
			CanvasKit.EngineElement.call(this,center,radius);
		}
		paddlepair.prototype = new CanvasKit.EngineElement();
		paddlepair.prototype.constructor = paddlepair;
		
		paddlepair.prototype.render = function (canvas, ctxt)
		{
			this.paddle1.render(canvas,ctxt);
			this.paddle2.render(canvas,ctxt);
			
		};
		paddlepair.prototype.move = function (arcChange)
		{
			var oldPos = this.paddle1.currArcPosInArc;
			this.paddle1.setPosInArc(oldPos + arcChange);
			this.paddle2.setPosInArc(oldPos + arcChange + this.paddleSpace);
		};
		paddlepair.prototype.paddleSpaceChange = function (arcChange)
		{
			this.paddleSpace = (this.paddleSpace + arcChange) % 360;
			this.move(0);
		};
		paddlepair.prototype.getAABB = function ()
		{
			return new [this.paddle1.getAABB(), this.paddle2.getAABB()];
		};
		return paddlepair;
		
	}());
	return Encircled;
}(window.Encircled || {}));
