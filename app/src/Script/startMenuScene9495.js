function startMenuScene() {
	var choice = 0;
	var breath = 0;
}


startMenuScene.prototype = {
	down: function (coordinate) {
		switch (this.choice) {
			case 1: 
				if (mapFileOk && (mapFileType == "DY" || musicFileOk)) {
					scene = new loadingScene();
					scene.init(mapFileType);
				
				}
				else if (musicFileOk){
					scene = new settingsForNewMapScene();
				}
				break;
			
			case 2: 
				mapFileElement.focus();
				mapFileElement.click();
				break;
				
			case 3: 
				musicFileElement.focus();
				musicFileElement.click();
				break;
		}
	},
	up: function(coordinate) {
		
	},
	move: function(coordinate) {
		var onOne = false;
		if (inArea(mainMouse.coordinate, windowWidth * 0.42, windowHeight * 0.60, windowWidth * 0.16, windowHeight * 0.023)) {
			this.choice = 1;
			onOne = true;
		}
		
		if (inArea(mainMouse.coordinate, windowWidth * 0.25, windowHeight * 0.415, windowWidth * 0.50, windowHeight * 0.04)) {
			this.choice = 2;
			onOne = true;
		}
		
		if (inArea(mainMouse.coordinate, windowWidth * 0.25, windowHeight * 0.510, windowWidth * 0.50, windowHeight * 0.04)) {
			this.choice = 3;
			onOne = true;
		}
		
		if (! onOne) {
			this.choice = 0;
		}
	},
	refresh: function() {
		
		
		this.breath = Math.abs(frameCount - 54) / 54;
		drawBox(ctx, windowWidth * 0.2, windowHeight * 0.3146, windowWidth * 0.6, windowHeight * 0.3708, 1, 18);
		
		// drawBox(ctx, windowWidth * 0.45, windowHeight * 0.5, windowWidth * 0.1, windowHeight * 0.0618, 1, 10);
		
		
		//pointJudge
		switch (this.choice) {
			case 1:
				ctx.fillStyle = rgba(0, 255, 255, 0.3 + this.breath * 0.1);
				break;
		}
		
		//
		ctx.font = "32px Dynamix";
		ctx.textAlign = "left";
		ctx.textBaseline = "alphabetic";
		ctx.fillStyle = "#0FF";
		
		
		if(typeof FileReader == 'undefined'){
			ctx.textAlign = "center";
			ctx.fillText("ERROR", windowWidth * 0.50, windowHeight * 0.42);
			ctx.fillText("Your explorer doesn't support fileAPI.", windowWidth * 0.50, windowHeight * 0.50);
			ctx.fillText("Why not use a higher version of " + getBrowser() + " ?", windowWidth * 0.50, windowHeight * 0.54);
		}
		else {
			drawJBox(ctx, windowWidth * 0.25, windowHeight * 0.445, windowWidth * 0.50, windowHeight * 0.01, 0, windowHeight * 0.445, 0, windowHeight * 0.445 + 10, rgba(0, 255, 255, 0.0), "#0FF");
			drawJBox(ctx, windowWidth * 0.25, windowHeight * 0.540, windowWidth * 0.50, windowHeight * 0.01, 0, windowHeight * 0.54, 0, windowHeight * 0.54 + 10, rgba(0, 255, 255, 0.0), "#0FF");
			ctx.fillStyle = "#0FF";
			
			
			
			if (this.choice == 2) {
				//ctx.fillRect(windowWidth * 0.25, windowHeight * 0.415, windowWidth * 0.50, windowHeight * 0.04);
				ctx.fillStyle = "#0F0";
			}
			
			//map browse
			ctx.fillText("Map Browse (.dy/.xml/.json/XTTT)", windowWidth * 0.25, windowHeight * 0.4);
			if (mapFileCtrl) {
				ctx.textAlign = "right";
				ctx.fillStyle = "#0FF";
				if (mapFileCtrl.length == 4) {
					xmlJson = false;
					var xmlCount = 0;
					var txtCount = 0;
					for (var i = 0; i <= 3; ++i) {
						var firstName = mapFileCtrl[i].name.substr(-4, 4).toUpperCase();
						if (firstName == ".XML") {
							xmlCount++;
						}
						else if (firstName == ".TXT") {
							txtCount++;
						}
					}
					if (xmlCount == 1 && txtCount == 3) {
						mapFileOk = true;
						ctx.fillText(mapFileCtrl[0].name + " " + mapFileCtrl[1].name + " " +  mapFileCtrl[2].name + " " +  mapFileCtrl[3].name, windowWidth * 0.75, windowHeight * 0.45);
					}
					else {
						ctx.fillStyle = "#F00";
						mapFileOk = false;
						ctx.fillText("don't fit XTTT", windowWidth * 0.75, windowHeight * 0.45);
					}
				}
				else if (mapFileCtrl.length == 1) {
					xmlJson = true;				
					// if (mapFileCtrl[0].name.substr(-4, 4).toUpperCase() != ".XML" && mapFileCtrl[0].name.substr(-5, 5).toUpperCase() != ".JSON") {
					// 	mapFileOk = false;
					// 	ctx.fillStyle = "#F00";
					// 	ctx.fillText(mapFileCtrl[0].name  + " is unusable", windowWidth * 0.75, windowHeight * 0.45);
					// }
					// else {
					// 	mapFileOk = true;
					// 	ctx.fillText(mapFileCtrl[0].name, windowWidth * 0.75, windowHeight * 0.45);
					// }
					/////////////
					var mapFileNameSplit = mapFileCtrl[0].name.split("."),
						mapFileExName = mapFileNameSplit[mapFileNameSplit.length - 1].toUpperCase();
					switch (mapFileExName) {
						case "DY":
							mapFileOk = true;
							ctx.fillText(mapFileCtrl[0].name, windowWidth * 0.75, windowHeight * 0.45);
						case "XML":
							mapFileOk = true;
							ctx.fillText(mapFileCtrl[0].name, windowWidth * 0.75, windowHeight * 0.45);
						case "JSON":
							ctx.fillStyle = "#0FF";
							ctx.fillText(mapFileCtrl[0].name, windowWidth * 0.75, windowHeight * 0.45);
							mapFileType = mapFileExName;
							break;
						default:
							mapFileType = false;
							ctx.fillStyle = "#F00";
							ctx.fillText(mapFileCtrl[0].name  + " is unusable", windowWidth * 0.75, windowHeight * 0.45);
							mapFileType = false;
							break;
					}
					///////////////////
				}
				else {
					mapFileOk = false;
				}

				ctx.textAlign = "left";
			}
			
			
			//music browse
			ctx.fillStyle = "#0FF";
			if (this.choice == 3) {
				//ctx.fillRect(windowWidth * 0.25, windowHeight * 0.510, windowWidth * 0.50, windowHeight * 0.04);
				ctx.fillStyle = "#0F0";
			}
			ctx.fillText("Audio/Video Browse (.ogg/.wav/.mp3/[.mp4])", windowWidth * 0.25, windowHeight * 0.5);
			if (musicFileCtrl) {
				ctx.textAlign = "right";
				ctx.fillStyle = "#0FF";
				var musicFileName = musicFileCtrl.name;
				if (musicFileName.substr(-4, 4).toUpperCase() != ".WAV" && musicFileName.substr(-4, 4).toUpperCase() != ".OGG" && musicFileName.substr(-4, 4).toUpperCase() != ".MP3" && musicFileName.substr(-4, 4).toUpperCase() != ".MP4") {
					musicFileOk = false;
					ctx.fillStyle = "#F00";
					ctx.fillText(musicFileName  + " is unusable", windowWidth * 0.75, windowHeight * 0.545);
				}
				else {
					musicUrl = URL.createObjectURL(musicFileCtrl);
					musicFileOk = true;
					isVideo = musicFileName.substr(-4, 4).toUpperCase() == ".MP4";
					ctx.fillText(musicFileName, windowWidth * 0.75, windowHeight * 0.545);
				}
				ctx.textAlign = "left";
			}
			
			ctx.textAlign = "center";
			ctx.fillStyle = "#0FF";
			ctx.font = "40px Dynamix";
			ctx.fillText("DynaMaker by omegaPi", windowWidth * 0.5, windowHeight * 0.75);
			
			ctx.textAlign = "center";
			ctx.fillStyle = "#0FF";
			ctx.font = "20px Dynamix";
			ctx.fillText("Modified by Jmak, Jono997, Vertrak, TLC and keanucode", windowWidth * 0.5, windowHeight * 0.79);
			
			ctx.font = "25px Dynamix";
			if (isFullScreen) {
				var tx = "??";
				switch  (browser) {
					case "Chrome": 
						tx = "[ F11 ] or [ Alt ] to toggle fullscreen";
						break;
					
					case "Firefox":
						tx = "[ F11 ] or [ Alt ] to toggle fullscreen";
						break;
						
					case "Edge":
						tx = "[ F11 ] or [ Alt ] to toggle fullscreen";
						break;
					
					case "IE":
						tx = "[ F11 ] or [ Alt ] to toggle fullscreen";
						break;
				}
				
				ctx.fillText(tx, windowWidth * 0.5, windowHeight * 0.83);
				ctx.fillText("if your pointer can't be always above the green point, keep adjusting", windowWidth * 0.5, windowHeight * 0.86);
			}
			else {
				var tx = "?"
				switch  (browser) {
					case "Chrome": 
						tx = "[ F11 ] or [ Alt ] to toggle fullscreen";
						break;
					
					case "Firefox":
						tx = "[ F11 ] or [ Alt ] to toggle fullscreen";
						break;
						
					case "Edge":
						tx = "[ F11 ] or [ Alt ] to toggle fullscreen";
						break;
					
					case "IE":
						tx = "[ F11 ] or [ Alt ] to toggle fullscreen";
						break;
				}
				ctx.fillText(tx, windowWidth * 0.5, windowHeight * 0.84);
			}
			
			if (this.choice == 1 && musicFileOk) {
				ctx.fillStyle = "#0F0";
			}
			ctx.textAlign = "center";
			if (mapFileOk && (mapFileType == "DY" || musicFileOk)) {
				ctx.fillText("[ Edit map ]", windowWidth * 0.5, windowHeight * 0.62);	
			}
			else if (musicFileOk){
				ctx.fillText("[ New map ]", windowWidth * 0.5, windowHeight * 0.62);	
			}
			else {
				ctx.fillText("Browse and select a music file to create a new map", windowWidth * 0.5, windowHeight * 0.62);	
			};
			
						ctx.textAlign = "center";
			ctx.fillStyle = "#0FF";
			ctx.font = "40px Dynamix";
			ctx.fillText("We recommend using .ogg/.wav to minimise offset error.", windowWidth * 0.5, windowHeight * 0.90)
		}
		
			
		ctx.fillStyle = "#0FF";
		ctx.font = "25px Dynamix";
		ctx.textAlign = "center";
		ctx.fillText("Version 1.21.3", windowWidth * 0.5, windowHeight - 35);
		
		ctx.font = "180px Dynamix";
		ctx.textAlign = "center";
		ctx.fillStyle = rgba(0, 255, 255, this.breath * 0.1 + 0.2);
		ctx.fillText("DynaMaker by omegaPi", windowWidth * 0.5 + windowWidth*(-1 + 2*(absFrameCount%50/50)), windowHeight*0.03);
		ctx.fillText("DynaMaker by omegaPi", windowWidth * 0.5 + windowWidth*(-1 + 2*((absFrameCount + 25)%50/50)), windowHeight*0.03);
		ctx.fillText("DynaMaker by omegaPi", windowWidth * 0.5 + windowWidth*(1 - 2*(absFrameCount%50/50)), windowHeight*1.05);
		ctx.fillText("DynaMaker by omegaPi", windowWidth * 0.5 + windowWidth*(1 - 2*((absFrameCount + 25)%50/50)), windowHeight*1.05);
		

		

	
		
		ctx.fillStyle = rgba(0, 255, 0, 1);
		if (mainMouse.coordinate && isFullScreen) {
			ctx.fillRect(mainMouse.coordinate.x - 7, mainMouse.coordinate.y - 7, 15,15);
			//ctx.fillText(mainMouse.coordinate.x + "," + mainMouse.coordinate.y, mainMouse.coordinate.x, mainMouse.coordinate.y);
			if (mainMouse.e) {
				ctx.fillStyle = "red";
				//ctx.fillRect(mainMouse.e.clientX - 7, mainMouse.e.clientY - 7, 15,15);
				//ctx.fillText("Client:" + mainMouse.e.clientX + "," + mainMouse.e.clientY, mainMouse.e.clientX, mainMouse.e.clientY+30);
				//ctx.fillStyle = "yellow";
				//ctx.fillRect(mainMouse.e.pageX - 7, mainMouse.e.pageY - 7, 15,15);
				//ctx.fillText("Page:" + mainMouse.e.pageX + "," + mainMouse.e.pageY, mainMouse.e.pageX, mainMouse.e.pageY+60);
				//ctx.fillStyle = "blue";
				//ctx.fillRect(mainMouse.e.screenX - 7, mainMouse.e.screenY - 7, 15,15);
				//ctx.fillText("Page:" + mainMouse.e.screenX + "," + mainMouse.e.screenY, mainMouse.e.screenX, mainMouse.e.screenY);
				//ctx.fillText("SCREEN:" + window.screen.width + "," +window.screen.height, 200, 200);

			}
		}
	}
}