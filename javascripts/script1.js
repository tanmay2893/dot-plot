var app = angular.module('plotStore', [ ]);
app.controller('plotStoreCtrl',function($http,$scope){
$('.span2').slider();
var slide=$('.span2').slider('getValue');
slide.val("1");
$scope.total=0;
	
	$scope.evaluate=function(){
		$scope.total+=1;
		var slide=$('.span2').slider('getValue');
		var name1=$scope.typo1;
		var name2=$scope.typo2;
		var stringency=$scope.typo3;
		console.log(typeof $scope.typo3);
		if(stringency==undefined || stringency==""){
		stringency=slide.val();
		}
		//$scope.typo1="";
		//$scope.typo2="";
		//$scope.typo3="";
			var w=600;
			var h=600;
			var padding=40;
			/*var zoom = d3.behavior.zoom()
    			.scaleExtent([1, 10])
    			.on("zoom", zoomed);*/
			/*var zoom = d3.behavior.zoom()
           .on('zoom', zoomed,false)
           .on('zoomstart', function() {
               if (d3.event.sourceEvent.type != 'mousewheel') {
                   $('#a'+$scope.total).css('pointer-events', 'none');
               }
            })
           .on('zoomend', function() {
               if (d3.event.sourceEvent != null) {
                   $('#a'+$scope.total).css('pointer-events', 'all');
               }
            });*/
			dataset1=[]
			var s=slide.val();
			for(var i=0;i<name1.length-s+1;i++){
					var k=name1.substr(i,s);
				for(var j=0;j<=name2.length-s+1;j++){
					var t=compare(k,name2.substr(j,s),stringency);
					if (t!=false)
						dataset1.push([i+t[0],j+t[1]]);
				}
			}
			var data=name1.split("");
			dataset=[];
			for (i=0;i<data.length;i++){
				dataset.push([data[i],data[i]]);
			}
			data=name2.split("");
			dataset2=[];
			for (i=0;i<data.length;i++){
				dataset2.push([data[i],data[i]]);
			}
			console.log(dataset.length);
			var xScale=d3.scale.linear()
						.domain([0,dataset.length-1])
						.range([padding,(h-padding)])
						.nice();
			var xScale1=d3.scale.linear()
						.domain([0,d3.max(dataset1, function(d) { return d[0]; })])
						.range([padding,(h-padding)])
						.nice();
			var yScale=d3.scale.linear()
						.domain([0,dataset2.length-1])
						.range([(h-padding),padding])
						.nice();
			var yScale1=d3.scale.linear()
						.domain([0,d3.max(dataset1, function(d) { return d[1]; })])
						.range([(h-padding),padding])
						.nice();
			
			var rect_w=xScale(2)-xScale(1);
			var rect_h=yScale(1)-yScale(2);
			//selecting body element and assigning its reference to variable body
			var body=d3.select("body").append("div").attr("id",'b'+$scope.total);
			//adding svg element to body
			body.append("img").attr("class",$scope.total).attr("src","/javascripts/remove-icon.png").on("click",function(){
				var t=d3.select(this).attr("class");
				console.log(t);
				d3.select("#b"+t).remove();
			});
			body.append("svg")
			.attr('class','image')
			.attr("id",'a'+$scope.total)
			.attr('width',w)
			.attr('height',h);
			//selecting svg element
			var svg=d3.select("#a"+$scope.total);
			//var container = svg.append("g");
			/*var container=d3.select("svg");
			function zoomed() {
  				container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			}*/
			var line=svg.selectAll("line");
			var lineX=line.data(dataset1).enter();
			lineX
            .append("line")
            .attr("x1",function(d,i){return xScale(d[0]);})
            .attr("y1",function(d,i){return (h-padding);})
            .attr("x2",function(d,i){return xScale(d[0]);})
            .attr("y2",function(d,i){return yScale(d[1]);})
			.attr("id",function(d,i){return (i.toString()+"1");})
			.style("opacity", 0);
			
			var lineY=line.data(dataset1).enter();
			lineY
			.append("line")
            .attr("x1",function(d,i){return padding;})
            .attr("y1",function(d,i){return yScale(d[1]);})
            .attr("x2",function(d,i){return xScale(d[0]);})
            .attr("y2",function(d,i){return yScale(d[1]);})
			.attr("id",function(d,i){return (i.toString()+"2");})
            .attr('stroke',"black")
			.style("opacity",0);
			var xAxis=d3.svg.axis();
			xAxis.scale(xScale);
			xAxis.orient("bottom")
			.ticks(dataset.length);
			var yAxis=d3.svg.axis();
			yAxis.scale(yScale);
			yAxis.orient("left")
			.ticks(dataset2.length);
			svg.selectAll("rect")
			.data(dataset1)
			.enter()
			.append("rect")
			.attr("x",function(d,i){
				return xScale(d[0])-(rect_w/2);
			})
			.attr("y",function(d,i){
				return yScale(d[1])-(rect_h/2);
			})
			.attr("width",rect_w)
			.attr("height",rect_h)
			.attr("fill",function(d,i){
				if(d[0]==d[1])
					return "green";
				return "black";
			})
			.attr("id",$scope.total)
			.on("mouseover",function(d,i){
				var tk=d3.select(this).attr("id");
				console.log("$$$$$$$$$$$$$$$$$$");
				d3.select(this)
				.attr("fill",function(d){
				yAxisG.selectAll(".tick")
						.each(function(d2,i2){
						if(d2>=dataset2.length)
						return;
						if(d[1]==d2){
					
						d3.select(this)
						.select("text")
						.attr("font-weight", "bold")
						.attr("font-size", "20px")
						.attr("fill","blue");
						}
						});
				xAxisG.selectAll(".tick")
						.each(function(d2,i2){
						if(d2>=dataset.length)
						return;
						if(d[0]==d2){
						console.log(d[0]);
						d3.select(this)
						.select("text")
						.attr("font-weight", "bold")
						.attr("font-size", "20px")
						.attr("fill","blue");
						}
						});
					if(d[0]==d[1]){			
						d3.selectAll("line").each( function(d1, i1){
						if(d3.select(this)[0][0].parentNode.id.substr(1,1)==tk){
							if(i+"1" == d3.select(this).attr("id")){
							d3.select(this).attr("stroke","green")
							.style("opacity",1);
							}}
						})
						d3.selectAll("line").each( function(d, i1){
						if(d3.select(this)[0][0].parentNode.id.substr(1,1)==tk){
							if(i+"2" == d3.select(this).attr("id")){
								d3.select(this).attr("stroke","green")
									.style("opacity",1);
							}}
						})
						
						
						return "rgb(0,200,0)";
					}
					return "black";
				});
				d3.selectAll("line").each( function(d, i1){
					if(d3.select(this)[0][0].parentNode.id.substr(1,1)==tk){
					if(i+"1" == d3.select(this).attr("id")){
					if(d3.select(this).style("opacity")==0){
					d3.select(this).attr("stroke","red")
					.style("opacity",1);
					}}}
				})
				d3.selectAll("line").each( function(d, i1){
					if(d3.select(this)[0][0].parentNode.id.substr(1,1)==tk){
					if(i+"2" == d3.select(this).attr("id")){
					if(d3.select(this).style("opacity")==0){
					d3.select(this).attr("stroke","red")
									.style("opacity",1);
					}}}
				})
				})
			.on("mouseout",function(d,i){
				d3.select(this)
				.transition()
				.duration(250)
				.attr("fill",function(d){
				yAxisG.selectAll(".tick")
						.transition()
						.duration(250)
						.each(function(d2,i2){
						if(d2>=dataset2.length)
						return;
						if(d[1]==d2){
						console.log(d[0]);
						d3.select(this)
						.select("text")
						.attr("font-weight", "normal")
						.attr("font-size", "11px")
						.attr("fill","black");
						}
						});
				xAxisG.selectAll(".tick")
						.each(function(d2,i2){
						if(d2>=dataset.length)
						return;
						if(d[0]==d2){
						console.log(d[0]);
						d3.select(this)
						.select("text")
						.attr("font-weight", "normal")
						.attr("font-size", "11px")
						.attr("fill","black");
						}
						});
					if(d[0]==d[1])
						return "green";
					return "black";				
				})
				d3.selectAll("line").each( function(d, i1){
					if(i+"2" == d3.select(this).attr("id")){
					d3.select(this)
									.transition()
									.duration(50)
								   .style("opacity",0);
					}
				})
				d3.selectAll("line").each( function(d, i1){
					if(i+"1" == d3.select(this).attr("id")){
					d3.select(this)
									.transition()
									.duration(50)
								   .style("opacity",0);
					}
				})
				
			});
			var xAxisG=svg.append("g")
			.attr("class","axis")
			.attr("transform","translate(0,"+(h-padding)+")")
			.call(xAxis);
			var yAxisG=svg.append("g")
			.attr("class","axis")
			.attr("transform","translate("+padding+",0)")
			.call(yAxis);
			xAxisG.selectAll(".tick")
			.each(function(d,i){
			if(d>=dataset.length)
				return ;
				d3.select(this)
				.select("text")
				.attr("font-size", "11px")
				.text(dataset[i][0]);
			})
			yAxisG.selectAll(".tick")
			.each(function(d,i){
			if(d>=dataset2.length)
				return;
			d3.select(this)
			.select("text")
			.attr("font-size", "11px")
			.text(dataset2[i][1]);
			})
  
	};
	
	$scope.window=function(){
		$scope.total+=1;
		var slide=$('.span2').slider('getValue');
		var name1=$scope.typo1;
		var name2=$scope.typo2;
		var stringency=$scope.typo3;
		console.log(typeof $scope.typo3);
		if(stringency==undefined || stringency==""){
		stringency=slide.val();
		}
		$scope.typo1="";
		$scope.typo2="";
		$scope.typo3="";
			var w=600;
			var h=600;
			var padding=40;
			/*var zoom = d3.behavior.zoom()
    			.scaleExtent([1, 10])
    			.on("zoom", zoomed);*/
			dataset1=[]
			var s=slide.val();
			for(var i=0;i<name1.length-s+1;i++){
					var k=name1.substr(i,s);
				for(var j=0;j<=name2.length-s+1;j++){
					var t=compare(k,name2.substr(j,s),stringency);
					if (t!=false)
						dataset1.push([i+t[0],j+t[1]]);
				}
			}
			dataset=[];
			for (i=0;i<name1.length;i++){
				var t=name1.charAt(i);
				dataset.push([t,t]);
			}
			dataset2=[];
			for (i=0;i<name2.length;i++){
				var t=name2.charAt(i);
				dataset2.push([t,t]);
			}
			console.log(dataset.length);
			var xScale=d3.scale.linear()
						.domain([0,dataset.length-1])
						.range([padding,(h-padding)])
						.nice();
			var xScale1=d3.scale.linear()
						.domain([0,d3.max(dataset1, function(d) { return d[0]; })])
						.range([padding,(h-padding)])
						.nice();
			var yScale=d3.scale.linear()
						.domain([0,dataset2.length-1])
						.range([(h-padding),padding])
						.nice();
			var yScale1=d3.scale.linear()
						.domain([0,d3.max(dataset1, function(d) { return d[1]; })])
						.range([(h-padding),padding])
						.nice();
			
			var rect_w=xScale(2)-xScale(1);
			var rect_h=yScale(1)-yScale(2);
			//selecting body element and assigning its reference to variable body
			var body=d3.select("#svg");
			console.log(body);
			var body1=d3.select("body");
			//adding svg element to body
			body.append("svg")
			.attr('class','image')
			.attr("id",'a'+$scope.total)
			.attr('width',w)
			.attr('height',h);
			body1.append("div")
			.attr("id","svgdataurl"+$scope.total)
			.attr("class","svgdataurl");
			//selecting svg element
			var svg=d3.select("#a"+$scope.total);
			//var container = svg.append("g");
			/*var container=d3.select("svg");
			function zoomed() {
  				container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			}*/
			
			var xAxis=d3.svg.axis();
			xAxis.scale(xScale);
			xAxis.orient("bottom")
			.ticks(dataset.length);
			var yAxis=d3.svg.axis();
			yAxis.scale(yScale);
			yAxis.orient("left")
			.ticks(dataset2.length);
			svg.selectAll("rect")
			.data(dataset1)
			.enter()
			.append("rect")
			.attr("x",function(d,i){
				return xScale(d[0])-(rect_w/2);
			})
			.attr("y",function(d,i){
				return yScale(d[1])-(rect_h/2);
			})
			.attr("width",rect_w)
			.attr("height",rect_h)
			.attr("fill",function(d,i){
				if(d[0]==d[1])
					return "green";
				return "black";
			})
			.attr("id",$scope.total);
			
			
			var xAxisG=svg.append("g")
			.attr("class","axis")
			.attr("transform","translate(0,"+(h-padding)+")")
			.call(xAxis);
			var yAxisG=svg.append("g")
			.attr("class","axis")
			.attr("transform","translate("+padding+",0)")
			.call(yAxis);
			xAxisG.selectAll(".tick")
			.each(function(d,i){
			if(d>=dataset.length)
				return ;
				d3.select(this)
				.select("text")
				.attr("font-size", "11px")
				.text(dataset[i][0]);
			})
			yAxisG.selectAll(".tick")
			.each(function(d,i){
			if(d>=dataset2.length)
				return;
			d3.select(this)
			.select("text")
			.attr("font-size", "11px")
			.text(dataset2[i][1]);
			})
			 var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;
		console.log(html);
        var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
		console.log(imgsrc);
  var img = '<img class="data" src="'+imgsrc+'"><abbr title="Remove" class="initialism"><img class="boot" src="http://icons.iconarchive.com/icons/dryicons/aesthetica-2/16/remove-icon.png" id="svgdataurlbutton'+$scope.total+'" onclick="remov(\'svgdataurl'+$scope.total+'\')"></img></abbr>'; 
  d3.select("#svgdataurl"+$scope.total).html(img);
  d3.select("#a"+$scope.total).remove();
  
	};
		
	var compare=function(a,b,stringency){
		var count=0;
		var la=a.length;
		for(i=0;i<la;i++){
			if (a[i]==b[i]){
				count+=1
				if(count==stringency){
				console.log(a);
				console.log(b)
				console.log(i);
				console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
					return [i,i];
					}
			}
		}
		return false;			
	};
	
});
function remov(a){
		console.log(a);
		d3.select("#"+a).remove();
	};

