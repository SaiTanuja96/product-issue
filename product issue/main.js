document.getElementById('issueinputform').addEventListener('submit',saveIssue);
function saveIssue(e) {
    var issueDesc = document.getElementById('issuedescription').value;
    var issueseverity = document.getElementById('issueseverity').value;
     var issueassignedTo = document.getElementById('issueassignedTo').value;
    var issueID = chance.guid();
    var issueStatus = 'Open';
    
    var issue = {
        id:issueID,
        description:issueDesc,
        severity:issueseverity,
        assignedTo:issueassignedTo,
        status:issueStatus
         }
   if(localStorage.getItem('issues')== null){
       var issues =[];
       issues.push(issue);
       localStorage.setItem('issues',JSON.stringify(issues));
   } else{
       var issues =JSON.parse(localStorage.getItem('issues'));
       issues.push(issue);
       localStorage.setItem('issues',JSON.stringify(issues)); 
   }
   document.getElementById('issueinputform').reset();
    fetchIssues();
    e.preventDefault();
}

function setStatusClosed(id){
  var issues = JSON.parse(localStorage.getItem('issues'));   
    
   for(var i=0;i< issues.length;i++){
       if(issues[i].id==id){
           issues[i].status='Closed';
       }
   } 
     localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
}

function deleteissue(id){
  var issues = JSON.parse(localStorage.getItem('issues'));   
    
   for(var i=0;i< issues.length;i++){
       if(issues[i].id==id){
           issues.splice(i,1);
       }
   } 
     localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
}


function fetchIssues() {
    
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issueList = document.getElementById('issueList');
    
    issueList.innerHTML='';
    for(var i=0;i<issues.length;i++) {
       var id =issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status= issues[i].status;
        
        issueList.innerHTML += '<div class="well">'+
                      '<h6>Issue ID:' + id + '</h6>'+
             '<h6>Status:' + status + '</h6>'+
                 '<p><span class= "glyphicon glyphicon-time"></span>' + severity + '</p>'+
         '<p><span class= "glyphicon glyphicon-user"></span>' + assignedTo + '</p>'+
            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
         '<a href="#" onclick="deleteissue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
            '</div>'
            
    } 
    
    
}