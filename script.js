function calculateAge(event) {
  event.preventDefault();

  let birthDay = document.getElementById("day-input").value;
  let birthMonth = document.getElementById("month-input").value;
  let birthYear = document.getElementById("year-input").value;

  let dayError = document.getElementById("day-error");
  let monthError = document.getElementById("month-error");
  let yearError = document.getElementById("year-error");

  // Reset styles and error messages
  document.getElementById("day-input").style.borderColor = "";
  document.getElementById("month-input").style.borderColor = "";
  document.getElementById("year-input").style.borderColor = "";
  dayError.innerHTML = "";
  monthError.innerHTML = "";
  yearError.innerHTML = "";

  // Validate inputs
  if (!birthDay || !birthMonth || !birthYear) {
    if (!birthDay) {
      document.getElementById("day-input").style.borderColor = "red";
      dayError.innerHTML = "Day input required";
    }
    if (!birthMonth) {
      document.getElementById("month-input").style.borderColor = "red";
      monthError.innerHTML = "Month input required";
    }
    if (!birthYear) {
      document.getElementById("year-input").style.borderColor = "red";
      yearError.innerHTML = "Year input required";
    }
    return; 
  }

  // Convert input values to integers
  birthDay = parseInt(birthDay);
  birthMonth = parseInt(birthMonth);
  birthYear = parseInt(birthYear);

  // Check if input values are valid numbers
    if (isNaN(birthDay) || birthDay < 1 || birthDay > 31) {
      document.getElementById("day-input").style.borderColor = "red";
      dayError.innerHTML = "Invalid day";
    }

    else if (isNaN(birthMonth) || birthMonth < 1 || birthMonth > 12) {
      document.getElementById("month-input").style.borderColor = "red";
      monthError.innerHTML = "Invalid month";
    }

    else if (isNaN(birthYear)) {
      document.getElementById("year-input").style.borderColor = "red";
      yearError.innerHTML = "Invalid year";
    }

  

  // Check if birth year is higher than current year
  let currentYear = new Date().getFullYear();
  if (birthYear > currentYear) {
    document.getElementById("year-input").style.borderColor = "red";
    yearError.innerHTML = "Invalid birth year";
    return;
  }

  // Check if birthdate is in the future
  let currentDate = new Date();
  if (
    birthYear > currentDate.getFullYear() ||
    (birthYear === currentDate.getFullYear() &&
      birthMonth - 1 > currentDate.getMonth()) ||
    (birthYear === currentDate.getFullYear() &&
      birthMonth - 1 === currentDate.getMonth() &&
      birthDay > currentDate.getDate())
  ) {
    document.getElementById("year-input").style.borderColor = "red";
    document.getElementById("month-input").style.borderColor = "red";
    document.getElementById("day-input").style.borderColor = "red";
    yearError.innerHTML = "Birthdate cannot be in the future";
    return;
  }



  // Age calculation
  let userBirthDate = new Date(birthYear, birthMonth - 1, birthDay); 
  let yearsOld = currentDate.getFullYear() - userBirthDate.getFullYear();
  let monthsOld = (currentDate.getMonth() + 12) - userBirthDate.getMonth(); 

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < userBirthDate.getMonth() ||
    (currentDate.getMonth() === userBirthDate.getMonth() &&
      currentDate.getDate() < userBirthDate.getDate())
  ) {
    yearsOld--;
  }

  // Calculate days difference
  let daysOld = currentDate.getDate() - userBirthDate.getDate();
  if (daysOld < 0) {
    monthsOld--; 
    // Calculate the remaining days in the last month
    let lastMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    daysOld += lastMonthDays;
  }

  // Update result in the HTML
  document.getElementById("years-result").textContent = yearsOld;
  document.getElementById("months-result").textContent = monthsOld;
  document.getElementById("day-result").textContent = daysOld;
}


document.getElementById('btn').addEventListener("click", calculateAge);