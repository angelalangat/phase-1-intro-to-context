// Your code here
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      date: date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
      type: 'TimeOut',
      date: date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((total, event) => {
      return total + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
      return total + allWagesFor(record);
    }, 0);
  }
  
