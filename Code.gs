/* This file contains the server-side JavaScript functions */

function doGet() {
// Serve html to browser
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('Create Trips for Inbox by Gmail')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename) {
// Include html from file
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function sendEmail(reservation) {
// Send reservation email to user's address
  var htmlBody = '<html><body><script type="application/ld+json">'+JSON.stringify(reservation)+'</script>'+
    '<br>This message was sent by <a href="https://script.google.com/macros/s/AKfycbx7XyklxcWdxh9QJk3aS7k5LukoMoTxC3DRvJZMGq3PCnvVSluP/exec">Trip Maker</a>.</body></html>'
  var useraddress = Session.getActiveUser().getEmail();
  
  var subject;
  if (typeof reservation.reservationFor.address === 'undefined') {   //todo make this more beautiful
    subject = 'Flight to ' + reservation.reservationFor.arrivalAirport.name + ', ' + reservation.reservationFor.flightNumber;
  }else{ 
     subject = 'Reservation at ' + reservation.reservationFor.name + ', ' + reservation.reservationFor.address.addressLocality;
  }
  MailApp.sendEmail({
    to: useraddress,
    subject: subject,
    htmlBody: htmlBody,
  });

  var message = 'To: '+useraddress+'<br>'+
    'Subject: '+subject+'<br>'+
    'HTML Body: '+htmlBody.replace(/</g,'&lt').replace(/>/g,'&gt');
;

  return message
}
