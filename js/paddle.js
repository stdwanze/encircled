Encircled = window.Encircled || {};

(function (Encircled){
	"use strict";
	Encircled.Paddle = (function (){
		
		function updatePos(paddle)
		{
			paddle.cosX =  Math.cos(paddle.currArcPosInRad);
			paddle.sinY =  Math.sin(paddle.currArcPosInRad);
			
			paddle.location = new CanvasKit.Point(paddle.center.x + (paddle.sinY*paddle.radius) , paddle.center.y+(paddle.cosX*paddle.radius));
		}
		
		function paddle (center,radius,size,arc)
		{
			this.color = "#000000";
			this.paddleSize = size;
			this.radius = radius;
			this.center = center;
			this.cosX = 0;
			this.sinY = 0;
			this.currArcPosInArc = arc;
			this.currArcPosInRad = 0;
			this.setPosInArc( arc );
			
			CanvasKit.EngineElement.call(this,center,this.paddleSize);
			updatePos(this);
		}
		
		paddle.prototype = new CanvasKit.EngineElement();
		paddle.prototype.constructor = paddle;
		
		paddle.prototype.setPosInArc = function (arc)
		{
			this.currArcPosInArc = arc % 360;
			this.currArcPosInRad = arc*Math.PI/180;
			updatePos(this);
		};
		
		paddle.prototype.getAABB = function ()
		{
			var topLeft = new CanvasKit.Point(this.location.x-this.paddleSize.x/2, this.location.y-this.paddleSize.y/2);
			return new CanvasKit.AABB(topLeft,this.paddleSize);
		};
		paddle.prototype.render = function (canvas, ctxt)
		{
			ctxt.save();
			ctxt.translate( this.location.x,this.location.y);
			ctxt.rotate( -this.currArcPosInRad);
			ctxt.fillStyle = this.color;
			ctxt.fillRect(-this.paddleSize.x/2, -this.paddleSize.y/2, this.paddleSize.x, this.paddleSize.y);
			ctxt.restore();
			
		/*	var aabb = this.getAABB();
			ctxt.fillStyle = this.color;
			ctxt.fillRect(aabb.x,aabb.y,aabb.width, aabb.height);
			*/
			
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
		paddlepair.prototype.collideBall = function (ball)
		{
			var collide = function (paddle,ball)
			{
				var rotMat = CanvasKit.Algorithm.getRotationMatrixFor(paddle.currArcPosInArc);
				var center = paddle.location.clone().reverse();
				
				var ballLocClone = ball.location.clone();
				ballLocClone.translate(center);
				ballLocClone = rotMat.mult(ballLocClone);
				ballLocClone.translate(center.reverse());
				
				var collidableBall = new CanvasKit.Circle(ballLocClone, ball.size);
				
				if(CanvasKit.Algorithm.collideElements(collidableBall,paddle)) return true;
				else return false;
			};
			
			if(collide(this.paddle1,ball))
			{
				return this.paddle1;
			}
			else if(collide(this.paddle2,ball))
			{
				return this.paddle2;
			}
			return null;
		};
		return paddlepair;
		
	}());
	return Encircled;
}(window.Encircled || {}));
