function doGet(request) {
  return HtmlService.createTemplateFromFile("index").evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
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

  console.log(accessCodesAndIntIds);

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

  console.log("cuidosiahasdsa:" + language);

  return interpreters;
}
