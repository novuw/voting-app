    var search2 = '{"name":"' + window.location.search.substring(11) + '"}';
    var addElement; 
function vote(){
   $.ajax({
            url: 'https://api.mlab.com/api/1/databases/voterpro/collections/surveys?q=' + search2 + '&apiKey=XwubhE1vzrlUofAGyt_OzccWmOuUFQPl', /*+process.env.mongoAPIKEY*/
            type: "PUT",
            data: JSON.stringify({$inc:{'oOne.votes': 1}}),
            contentType: "application/json" 
          }); 
    //addElement = parseInt(document.getElementById("firstV").textContent);
    //console.log(addElement);
    
    /*addElement++;
    $('#firstV').text(addElement.toString());*/
  alert('Thanks for voting!');
  document.location.reload();
}
function vote2(){
  $.ajax({
            url: 'https://api.mlab.com/api/1/databases/voterpro/collections/surveys?q=' + search2 + '&apiKey=XwubhE1vzrlUofAGyt_OzccWmOuUFQPl', /*+process.env.mongoAPIKEY*/
            type: "PUT",
            data: JSON.stringify({$inc:{'oTwo.votes': 1}}),
            contentType: "application/json" 
          }); 
    //addElement = parseInt(document.getElementById("secondV"));
    /*addElement++;
    $('#secondV').text(addElement.toString());*/
    alert('Thanks for voting!');
    document.location.reload();
}