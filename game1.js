// Original: https://stackoverflow.com/questions/347734/gauss-legendre-algorithm-in-python

// To-do list:
// Make the progress bar work (likely requires a complete rework of the main loop)
// Make the highlight digit feature work
// Make the stop button work (might also be hard)
// Make the "go" and "stop" buttons equal sizes

// These cryptic names are apparently what's normally used.
var a;
var b;
var t;
var p;

var an;
var pi;
var piOld;

var success;

var progressBar = $("#main-progress");

function setProgress(progress) {
    progressBar.css("width", progress + "%");
    progressBar.attr("aria-valuenow", "" + progress); // Makeshift int to string
}

function countMatchingChars(str1, str2) {
    // Based on: https://stackoverflow.com/questions/1966476/how-can-i-process-each-letter-of-text-using-javascript/1967132#1967132
    var leastLength = Math.min(str1.length, str2.length);
    var count;
    for (count = 0; count < leastLength; count++) {
        if (str1.charAt(count) !== str2.charAt(count)) {
            break;
        }
    }
    return count;
}

// Possible progress bar fix
function forceUpdate(elem) {
    /* elem.height(elem.height() + 1);
    elem.height(elem.height() - 1); */
}

// Function to bypass the interface and force
// the calculator to start using the console.
function generatePi(precision) {
    // Reset progress bar
    setProgress(0);
    $("#progress-text").text("Starting...")
    // Set appropriate number of decimal places
    console.log("Setting precision...")
    // var precision = 10000; // Number of decimal places wanted
    BigNumber.config({ DECIMAL_PLACES: precision + 2 });

    // Set the variables to the appropriate values
    console.log("Setting variables...")
    a = new BigNumber(1); // a is 1
    b = new BigNumber(2); // b is 2
    b = b.sqrt(); // b is sqrt(2)
    b = a.div(b); // b is 1/sqrt(2)
    t = a.div(4); // t is 1/4
    p = new BigNumber(1); // p is 1
    success = false;
    pi = new BigNumber(0) // Not undefined

    var progressDigits;
    var finalDigits = precision + 2;
    var progressPercent;
    var progressString;

    // We don't need a lot of iterations because the algorithm calculates
    // double the number of digits every time.
    for (let i = 0; i < 100; i++) {
        console.log("Calculating iteration " + (i + 1) + "...");

        an = a.plus(b).div(2);
        // .div(1) is used to round the number to the set amount of decimal places.
        // Without it, there would be an excessive number of decimal places before
        // the square root is applied, and a massive performance hit would result.
        b = a.times(b).div(1).sqrt();
        t = t.minus(p.times(a.minus(an).pow(2))); // A bit of a monstrosity
        a = an; p = p.times(2);
        piOld = pi; // Older value of pi
        pi = a.plus(b).pow(2).div(t.times(4)); // Newer value of pi
        // pi.eq(piOld); // Test

        // Determine progress
        progressDigits = countMatchingChars(pi.toString(), piOld.toString());
        progressPercent = 100 * progressDigits / finalDigits;
        progressString = progressPercent.toFixed(2) + "%";
        // progressDigits -= 2; // Remove the leading "3."
        // console.log(progressDigits);
        // Show progress
        // NOTE: Progress is not showing until the very end
        // setProgress(i * 10);
        setProgress(progressPercent);
        $("#progress-text").text(progressString);
        console.log(progressString);
        // Update progress/action section
        // forceUpdate($("progress-action"));

        if (pi.eq(piOld)) { // Check if the difference made is negligible
            success = true;
            break;
        }
    }

    // success = false;

    if (!success) { // Error
        console.log("Out of iterations!");
        alert("Error!");
        $("#pi-output").text("Pi calculation failed!");
        $("#progress-text").text("Error!");
    } else { // Transfer everything to the HTML page
        console.log("Preparing string value...");
        var piString = pi.toString();
        piString = piString.slice(0, precision + 2); // Remove the last few possibly incorrect digits
        console.log("Writing to HTML...");
        $("#pi-output").text(piString);
        // document.write("<p>" + piString + "</p>")
        console.log("Done!");
        $("#progress-text").text("Done!");
        // console.log(piString.length);
    }
}

// Button code (event listener)
$("#button-go").on("click", function () {
    // Get value from input section
    var wantedDigits = parseInt($("#pi-digits-wanted").val());
    console.log(wantedDigits)
    // Check for a "falsy" value
    if (!wantedDigits || wantedDigits < 0) {
        alert("Invalid number of digits!")
    } else {
        generatePi(wantedDigits)
    }
})