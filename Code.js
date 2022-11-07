function doGet(request) {
  return HtmlService.createTemplateFromFile("index").evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function checkLogin(username, password) {
  // extension | username | password | int_id
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName("credentials");
  const dataRange = ws.getRange("A1").getDataRegion();
  const data = dataRange.getDisplayValues();

  var user = [];

  // check if username and password match
  for (var i = 1; i < data.length; i++) {
    console.log(data[i][1], data[i][2]);
    if (data[i][1] == username && data[i][2] == password) {
      user.push({
        extension: data[i][0],
        int_id: data[i][3],
      });
    }
  }

  return user;
}

function processForm(formObject) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName("database");
  const dataRange = ws.getRange("A1").getDataRegion();
  const data = dataRange.getDisplayValues();

  if (data.length > 1) {
    var lastRow = data.pop();
    var lastId = parseInt(lastRow[0]);
    var newId = lastId + 1;
  } else {
    var newId = 1500000;
  }

  var currentDate = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });

  try {
    ws.appendRow([
      newId,
      formObject.access_code,
      formObject.first_name || "",
      formObject.last_name || "",
      formObject.employee_id || "",
      formObject.call_center_id || "",
      formObject.language || "",
      formObject.int_id || "",
      formObject.start || "",
      currentDate,
      formObject.extension || "",
      formObject.init_timestamp || "",
    ]);
  } catch (error) {
    console.log(error);
  }
}

function processFormRouter(formObject) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName("routers_db");
  const dataRange = ws.getRange("A1").getDataRegion();
  const data = dataRange.getDisplayValues();

  if (data.length > 1) {
    var lastRow = data.pop();
    var lastId = parseInt(lastRow[0]);
    var newId = lastId + 1;
  } else {
    var newId = 1500000;
  }

  var currentDate = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });

  try {
    ws.appendRow([
      newId,
      formObject.access_code_router,
      formObject.first_name_router || "",
      formObject.last_name_router || "",
      formObject.employee_id_router || "",
      formObject.call_center_id_router || "",
      formObject.language_router || "",
      formObject.int_id_router || "",
      formObject.start_router || "",
      currentDate,
      formObject.extension_router || "",
      formObject.init_timestamp_router || "",
    ]);
  } catch (error) {
    console.log(error);
  }
}

// Get Access Codes (B Column) and H Column
function getAccessCodesAndIntIds() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName("client_data");
  const dataRange = ws.getRange("A1").getDataRegion();
  const data = dataRange.getDisplayValues();

  var accessCodesAndIntIds = [];
  for (var i = 1; i < data.length; i++) {
    accessCodesAndIntIds.push({
      access_code: data[i][1],
      int_id: data[i][7],
    });
  }

  return accessCodesAndIntIds;
}

// Return Languages Name (A Column)
function getLanguages() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName("languages");
  const dataRange = ws.getRange("A1").getDataRegion();
  const data = dataRange.getDisplayValues();

  var languages = [];
  for (var i = 1; i < data.length; i++) {
    languages.push(data[i][0]);
  }

  return languages;
}

// Return interpreters where Language (J Column) = language is parameter
function getInterpreters(language) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ws = ss.getSheetByName("interpreters");
  const dataRange = ws.getRange("A1").getDataRegion();
  const data = dataRange.getDisplayValues();

  var interpreters = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][9] == language) {
      interpreters.push({
        id: data[i][0],
        iid: data[i][1],
        name: data[i][3],
      });
    }
  }

  return interpreters;
}
