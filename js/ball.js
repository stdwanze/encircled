Encircled = window.Encircled || {};

(function (Encircled){
	"use strict";
	Encircled.Ball = (function (){
		
		function ball (center,radius,movementvector)
		{
			this.movement = movementvector;
			CanvasKit.Circle.call(this,center,radius);
		}
		ball.prototype = new CanvasKit.Circle();
		ball.prototype.constructor = ball;
		ball.prototype.tick = function ()
		{
			this.location.x += this.movement.x;
			this.location.y += this.movement.y;
		};
		ball.prototype.isOut = function ()
		{
			if(this.location.x > 400 || this.location.x < 0 || this.location.y> 400 || this.location.y < 0)
			{return true;}
			else return false;
		};
		return ball;
	}());
	
	return Encircled;
}(window.Encircled || {}));
