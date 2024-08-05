function toggleHeightInput() {
    const heightUnit = document.getElementById('heightUnit').value;
    document.getElementById('heightCmGroup').classList.add('hidden');
    document.getElementById('heightFtInGroup').classList.add('hidden');
    if (heightUnit === 'cm') {
        document.getElementById('heightCmGroup').classList.remove('hidden');
    } else {
        document.getElementById('heightFtInGroup').classList.remove('hidden');
    }
}

function showModal() {
    if (validateInputs()) {
        document.getElementById('myModal').style.display = "block";
    }
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

function validateInputs() {
    let weight = parseFloat(document.getElementById('weight').value);
    const heightUnit = document.getElementById('heightUnit').value;
    const heightCm = heightUnit === 'cm' ? parseFloat(document.getElementById('heightCm').value) : null;
    const heightFt = heightUnit === 'feetInches' ? parseFloat(document.getElementById('heightFt').value) : null;
    const heightIn = heightUnit === 'feetInches' ? parseFloat(document.getElementById('heightIn').value) : null;
    const age = parseInt(document.getElementById('age').value);

    if (isNaN(weight) || weight <= 0) {
        alert('Please enter a valid weight greater than 0.');
        return false;
    }

    if (heightUnit === 'cm' && (isNaN(heightCm) || heightCm <= 0)) {
        alert('Please enter a valid height in cm greater than 0.');
        return false;
    } else if (heightUnit === 'feetInches' && (isNaN(heightFt) || heightFt < 0 || isNaN(heightIn) || heightIn < 0)) {
        alert('Please enter a valid height in feet and inches, where both values are greater than or equal to 0.');
        return false;
    }

    if (isNaN(age) || age <= 0) {
        alert('Please enter a valid age greater than 0.');
        return false;
    }

    return true;
}

function calculateMacros() {
    let weight = parseFloat(document.getElementById('weight').value);
    const heightUnit = document.getElementById('heightUnit').value;
    let heightCm;
    const heightFt = parseFloat(document.getElementById('heightFt').value);
    const heightIn = parseFloat(document.getElementById('heightIn').value);
    const age = parseInt(document.getElementById('age').value);
    const activityLevel = document.getElementById('activityLevel').value;
    const weightUnit = document.getElementById('weightUnit').value;

    if (heightUnit === 'cm') {
        heightCm = parseFloat(document.getElementById('heightCm').value);
        if (isNaN(heightCm) || heightCm <= 0) {
            alert('Please enter a valid height in cm.');
            return;
        }
    } else {
        if (isNaN(heightFt) || isNaN(heightIn) || heightFt < 0 || heightIn < 0) {
            alert('Please enter a valid height in feet and inches.');
            return;
        }
        heightCm = heightFt * 30.48 + heightIn * 2.54;
    }

    // Convert weight to kg if needed
    if (weightUnit === 'lbs') {
        weight = weight * 0.453592;
    }

    // Calculate BMR (Basal Metabolic Rate) using the Mifflin-St Jeor Equation
    const bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5; // For men
    // const bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161; // For women

    // Calculate TDEE (Total Daily Energy Expenditure)
    let activityMultiplier;
    switch (activityLevel) {
        case 'sedentary':
            activityMultiplier = 1.2;
            break;
        case 'light':
            activityMultiplier = 1.375;
            break;
        case 'moderate':
            activityMultiplier = 1.55;
            break;
        case 'active':
            activityMultiplier = 1.725;
            break;
        case 'veryActive':
            activityMultiplier = 1.9;
            break;
        default:
            activityMultiplier = 1.2;
    }

    const tdee = bmr * activityMultiplier;
    const tdeeForWeightLoss = tdee - 1000; // Caloric deficit for 2 pounds weight loss per week

    // Calculate macros
    const protein = weight * 2; // Protein intake in grams (2 grams per kg of body weight)
    const fat = weight * 0.9; // Fat intake in grams (0.9 grams per kg of body weight)
    const carbs = (tdeeForWeightLoss - (protein * 4 + fat * 9)) / 4; // Carbohydrates intake

    // Display results
    const resultText = `
        <h2>Recommended Macros:</h2>
        <p>Protein: ${protein.toFixed(2)} grams</p>
        <p>Fat: ${fat.toFixed(2)} grams</p>
        <p>Carbohydrates: ${carbs.toFixed(2)} grams</p>
        <p>Daily Caloric Intake: ${tdeeForWeightLoss.toFixed(2)} calories</p>
    `;
    document.getElementById('result').innerHTML = resultText;

    // Close modal after submission
    closeModal();
}

function submitResults() {
    // Handle form submission for email or cell number
    const emailOrCell = document.getElementById('emailOrCell').value;
    if (!emailOrCell) {
        alert('Please enter your email or cell number.');
        return;
    }
    // Optionally, you can add logic to send results to the provided email or cell number here

    // Perform calculations and display results
    calculateMacros();
}

function generateMealPlan(macros) {
    // Number of meals
    const meals = 3; // Breakfast, lunch, dinner

    const mealsPlan = {
        breakfast: {
            protein: (macros.protein / meals).toFixed(2),
            fat: (macros.fat / meals).toFixed(2),
            carbs: (macros.carbs / meals).toFixed(2)
        },
        lunch: {
            protein: (macros.protein / meals).toFixed(2),
            fat: (macros.fat / meals).toFixed(2),
            carbs: (macros.carbs / meals).toFixed(2)
        },
        dinner: {
            protein: (macros.protein / meals).toFixed(2),
            fat: (macros.fat / meals).toFixed(2),
            carbs: (macros.carbs / meals).toFixed(2)
        }
    };

    return mealsPlan;
}
