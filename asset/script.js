document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calculateButton').onclick = function () {
        calculateAndDisplayPlan();
    };

    function calculateAndDisplayPlan() {
        // Get input values
        const weight = parseFloat(document.getElementById('weight').value);
        const heightFt = parseFloat(document.getElementsByName('heightFt')[0].value);
        const heightIn = parseFloat(document.getElementsByName('heightIn')[0].value);
        const age = parseFloat(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const activityLevel = document.getElementById('activityLevel').value;
        const goal = document.getElementById('goal').value;

        // Convert height to centimeters
        const height = (heightFt * 30.48) + (heightIn * 2.54);

        // Validate inputs
        if (weight <= 0 || height <= 0 || age <= 0) {
            alert("All inputs must be above 0.");
            return;
        }

        // Calculate BMR (Basal Metabolic Rate)
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight * 0.453592) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight * 0.453592) + (3.098 * height) - (4.330 * age);
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        const activityMultipliers = {
            sedentary: 1.2,
            light: 1.375,
            moderate: 1.55,
            active: 1.725,
            veryActive: 1.9
        };
        const tdee = bmr * activityMultipliers[activityLevel];

        // Adjust TDEE based on goal
        let calories;
        if (goal === 'maintenance') {
            calories = tdee;
        } else if (goal === 'loss') {
            calories = tdee - 500; // Approx 1 lb per week loss
        } else {
            calories = tdee + 500; // Approx 1 lb per week gain
        }

        // Calculate macros
        const protein = weight * 0.8; // Protein intake in grams (0.8g per pound of body weight)
        const fat = (calories * 0.25) / 9; // Fat intake in grams (25% of total calories)
        const carbs = (calories - (protein * 4) - (fat * 9)) / 4; // Remaining calories for carbs

        // Display daily macros
        const macrosDisplay = `
            <p><strong>Daily Macronutrient Breakdown:</strong></p>
            <p>Calories: ${calories.toFixed(2)} kcal</p>
            <p>Protein: ${protein.toFixed(2)} g</p>
            <p>Fat: ${fat.toFixed(2)} g</p>
            <p>Carbohydrates: ${carbs.toFixed(2)} g</p>
        `;
        document.getElementById('macrosDisplay').innerHTML = macrosDisplay;

        // Suggest macros per meal (assuming 3 meals + 1 snack)
        const mealPlan = `
            <p><strong>Suggested Macronutrients Per Meal:</strong></p>
            <p>Meal 1: ${(protein * 0.3).toFixed(2)}g Protein, ${(carbs * 0.3).toFixed(2)}g Carbs, ${(fat * 0.3).toFixed(2)}g Fat</p>
            <p>Meal 2: ${(protein * 0.3).toFixed(2)}g Protein, ${(carbs * 0.3).toFixed(2)}g Carbs, ${(fat * 0.3).toFixed(2)}g Fat</p>
            <p>Meal 3: ${(protein * 0.3).toFixed(2)}g Protein, ${(carbs * 0.3).toFixed(2)}g Carbs, ${(fat * 0.3).toFixed(2)}g Fat</p>
            <p>Snack: ${(protein * 0.1).toFixed(2)}g Protein, ${(carbs * 0.1).toFixed(2)}g Carbs, ${(fat * 0.1).toFixed(2)}g Fat</p>
        `;
        document.getElementById('mealPlanDisplay').innerHTML = mealPlan;
    }
});
