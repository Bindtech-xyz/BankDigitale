function FancyTableCtrl($scope, $http) {

  this.isArray = Array.isArray;

  this.isClickable = function () {
    return $scope.properties.isBound('selectedRow');
  };
    
    
/*    
  var moreInfo = function(id){
      return $http.get('/bonita/API/bpm/archivedFlowNode?p=0&c=10&o=archivedDate%20DESC&f=caseId%3d'+id+'&f=isTerminal%3dtrue&d=executedBy&d=executedBySubstitute')
  }  
  
 */
  this.selectRow = function (row) {
    if (this.isClickable()) {
        
      $scope.properties.selectedRow = row;
      
      this.iframeUrl = "../../../../../resource/processInstance/Case%20Submission%20via%20web/4.3/content/?id="+row.processId;
      /*
        moreInfo(row.processId).then(function(response){
           
            var taskDone = [];
            
            response.data.forEach(function(data){    
                taskDone.push({
                    displayName : data.displayName,
                    description : data.description,
                    archivedDate : data.archivedDate,
                    executedBy : data.executedBy
                });
                
            });
            $scope.taskDone = taskDone;
        });
       
    	*/	
    		//Get the A tag
    		var id = "#dialog";
    		//Get the screen height and width
    		//var maskHeight = $(document).height();
    		var maskHeight = $(window).height();
    		var maskWidth = $(window).width();
    	
    		//Set heigth and width to mask to fill up the whole screen
    		$('#mask').css({'width':maskWidth,'height':maskHeight});
    		
    		//transition effect		
    		$('#mask').fadeIn(1000);	
    		$('#mask').fadeTo("slow",0.8);	
    	
    		//Get the window height and width
    		var winH = $(window).height();
    		var winW = $(window).width();
                  
    		//Set the popup window to center
    		$(id).css('top',  winH/5-$(id).height()/5);
    		$(id).css('left', winW/2-$(id).width()/2);
    	
    		//transition effect
    		$(id).fadeIn(2000); 
    	
    	
    	
    	//if close button is clicked
    	$('.window .close').click(function (e) {
    		//Cancel the link behavior
    		e.preventDefault();
    		
    		$('#mask').hide();
    		$('.window').hide();
    	});		
    	
    	//if mask is clicked
    	$('#mask').click(function () {
    		$(this).hide();
    		$('.window').hide();
    	});			
    
    	$(window).resize(function () {
    	 
     		var box = $('#boxes .window');
     
            //Get the screen height and width
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();
          
            //Set height and width to mask to fill up the whole screen
            $('#mask').css({'width':maskWidth,'height':maskHeight});
                   
            //Get the window height and width
            var winH = $(window).height();
            var winW = $(window).width();
    
            //Set the popup window to center
            box.css('top',  winH/2 - box.height()/2);
            box.css('left', winW/2 - box.width()/2);
    	 
    	});

    }
  };
  

 
}
