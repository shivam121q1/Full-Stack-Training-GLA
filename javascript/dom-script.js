// ==========================================
// DOCUMENT OBJECT MODEL (DOM) & FORM HANDLING
// ==========================================
// This script contains detailed notes, explanations, and practice code for
// interacting with HTML elements (DOM) and capturing user inputs via forms.

/* 
  ---------------------------------------------------------
  1. WHAT IS THE DOM?
  ---------------------------------------------------------
  The Document Object Model (DOM) is a programming interface for web documents.
  It represents the page so that programs can change the document structure, style, and content.
  The DOM represents the document as a tree of nodes (objects).
*/

// =========================================================
// SECTION A: SELECTING DOM ELEMENTS
// =========================================================
// To manipulate an element, we must first "find" or "select" it in the document.

// 1. By ID: returns a single element (the fastest selector)
// const element = document.getElementById('element-id');

// 2. By Class Name: returns an HTMLCollection (array-like, not a true array)
// const elements = document.getElementsByClassName('class-name');

// 3. By Tag Name: returns an HTMLCollection of all matching tags
// const paragraphs = document.getElementsByTagName('p');

// 4. Query Selector: returns the FIRST element matching a CSS selector
// const firstBtn = document.querySelector('.btn-primary');
// const heading = document.querySelector('#main-title');

// 5. Query Selector All: returns a static NodeList of ALL matching elements (can use .forEach() on it)
// const allBoxes = document.querySelectorAll('.box');


// =========================================================
// SECTION B: MANIPULATING DOM ELEMENTS
// =========================================================

// 1. Changing Text & HTML Content:
// - element.textContent: Gets/sets the text inside (ignores HTML tags, safe from XSS)
// - element.innerHTML: Gets/sets HTML markup inside (parses HTML tags, use with caution)
// - element.innerText: Gets/sets rendered text content (aware of CSS layout/visibility)

// 2. Modifying Styles (Inline CSS):
// - element.style.property = "value"; (Note: Use camelCase for hyphenated properties, e.g., backgroundColor)

// 3. Modifying Classes (Recommended way to style):
// - element.classList.add('className');
// - element.classList.remove('className');
// - element.classList.toggle('className'); // adds if missing, removes if present
// - element.classList.contains('className'); // returns true or false

// 4. Modifying Attributes:
// - element.setAttribute('attr', 'value');
// - element.getAttribute('attr');
// - element.removeAttribute('attr');


// =========================================================
// SECTION C: CREATING & DELETING ELEMENTS DYNAMICALLY
// =========================================================

// 1. Create a new element:
// const newDiv = document.createElement('div');

// 2. Configure the new element:
// newDiv.textContent = "I am a new element!";
// newDiv.className = "alert alert-success";

// 3. Append (add) it to a parent element in the DOM:
// parentElement.appendChild(newDiv); // adds as the last child
// parentElement.prepend(newDiv);     // adds as the first child

// 4. Removing an element:
// elementToRemove.remove();


// =========================================================
// SECTION D: DOM EVENT LISTENERS
// =========================================================
// Events are "actions" or "occurrences" that happen in the system you are programming,
// which the system tells you about so you can respond to them if desired.

/*
  Syntax:
  element.addEventListener('event_type', callback_function);

  Common Events:
  - 'click' : Triggered when clicked
  - 'dblclick' : Triggered when double-clicked
  - 'keyup' / 'keydown' : Triggered when typing
  - 'submit' : Triggered when a form is submitted (crucial for forms!)
  - 'change' : Triggered when checkboxes, radio buttons, or select lists change state
  - 'input' : Triggered in real-time as a user types into an input field
*/


// =========================================================
// PRACTICE WORKSPACE - EXECUTABLE INTERACTION CODE
// =========================================================

// Wait for the DOM content to fully load before running the scripts
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed. Let's practice!");

    // --- PRACTICE 1: Text & Style Manipulations ---
    const mainHeader = document.getElementById('practice-header');
    const colorBtn = document.getElementById('change-color-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (colorBtn && mainHeader) {
        colorBtn.addEventListener('click', () => {
            // Generate a random hex color
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            
            // Apply inline style
            mainHeader.style.color = randomColor;
            mainHeader.textContent = `Current Header Color: ${randomColor}`;
            
            // Add a visual CSS class toggle
            mainHeader.classList.add('pulse-effect');
        });
    }

    if (resetBtn && mainHeader) {
        resetBtn.addEventListener('click', () => {
            mainHeader.style.color = '#333333';
            mainHeader.textContent = "DOM Manipulation & Form Practice Hub";
            mainHeader.classList.remove('pulse-effect');
        });
    }


    // --- PRACTICE 2: Creating and Deleting Elements (Dynamic Todo List) ---
    const itemInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    if (addBtn && itemInput && todoList) {
        // Function to add a todo item
        const addTodoItem = () => {
            const taskText = itemInput.value.trim();
            
            // Validation: Don't add empty entries
            if (taskText === "") {
                alert("Please type a valid task!");
                return;
            }

            // 1. Create elements
            const li = document.createElement('li');
            const span = document.createElement('span');
            const deleteBtn = document.createElement('button');

            // 2. Configure elements
            span.textContent = taskText;
            deleteBtn.textContent = '❌';
            deleteBtn.className = 'delete-task-btn';
            deleteBtn.title = 'Delete task';

            li.className = 'todo-item';
            
            // 3. Assemble components
            li.appendChild(span);
            li.appendChild(deleteBtn);

            // 4. Add interactive events for the new element
            // Toggle finished class when clicking the text
            span.addEventListener('click', () => {
                span.classList.toggle('completed-task');
            });

            // Delete the item when clicking the delete button
            deleteBtn.addEventListener('click', () => {
                li.classList.add('fade-out');
                // Remove from DOM after a short fade animation
                setTimeout(() => li.remove(), 300);
            });

            // 5. Append to parent container (UL)
            todoList.appendChild(li);

            // 6. Clear input box and focus back
            itemInput.value = "";
            itemInput.focus();
        };

        // Click event
        addBtn.addEventListener('click', addTodoItem);

        // Keypress event (Pressing Enter inside input field)
        itemInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodoItem();
            }
        });
    }


    // =========================================================
    // SECTION E: FORM HANDLING & VALIDATION
    // =========================================================
    /*
      When handling forms:
      1. Use 'submit' event listener on the <form> element (not 'click' on the submit button).
      2. Always call `event.preventDefault()` to stop the browser from reloading the page.
      3. Extract values using element selectors or `new FormData(formElement)`.
      4. Perform input validation (length, regex patterns, empty checks).
      5. Display targeted errors next to invalid inputs or a general status summary.
    */

    const practiceForm = document.getElementById('registration-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const courseSelect = document.getElementById('course-select');
    const termsCheckbox = document.getElementById('terms-checkbox');
    const successContainer = document.getElementById('form-success-message');

    // Select dynamic error containers
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const termsError = document.getElementById('terms-error');

    if (practiceForm) {
        practiceForm.addEventListener('submit', (event) => {
            // STEP 1: Prevent automatic submission & full page refresh!
            event.preventDefault();

            // Reset previous messages
            resetErrorsAndSuccess();

            let isValid = true;

            // STEP 2: Fetch and Validate Username
            const usernameValue = usernameInput.value.trim();
            if (usernameValue.length < 3) {
                usernameError.textContent = "Username must be at least 3 characters long.";
                usernameInput.classList.add('input-error-border');
                isValid = false;
            }

            // STEP 3: Fetch and Validate Email (Simple Regex validation)
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                emailError.textContent = "Please enter a valid email address.";
                emailInput.classList.add('input-error-border');
                isValid = false;
            }

            // STEP 4: Fetch and Validate Password
            const passwordValue = passwordInput.value;
            if (passwordValue.length < 6) {
                passwordError.textContent = "Password must be at least 6 characters long.";
                passwordInput.classList.add('input-error-border');
                isValid = false;
            }

            // STEP 5: Select Dropdown value
            const selectedCourse = courseSelect.value;

            // STEP 6: Checkbox Validation
            const termsChecked = termsCheckbox.checked;
            if (!termsChecked) {
                termsError.textContent = "You must accept the terms and conditions.";
                isValid = false;
            }

            // STEP 7: Fetch selected radio button value (Gender)
            const genderRadio = document.querySelector('input[name="gender"]:checked');
            const genderValue = genderRadio ? genderRadio.value : "Not specified";

            // If form passes all validation checks
            if (isValid) {
                console.log("Form successfully validated and submitted!");
                
                // Show beautiful success block with submitted details
                successContainer.innerHTML = `
                    <h3>🎉 Registration Successful!</h3>
                    <p>Below is the data we collected from the DOM:</p>
                    <ul>
                        <li><strong>Username:</strong> ${escapeHtml(usernameValue)}</li>
                        <li><strong>Email:</strong> ${escapeHtml(emailValue)}</li>
                        <li><strong>Course Selected:</strong> ${escapeHtml(selectedCourse)}</li>
                        <li><strong>Gender:</strong> ${escapeHtml(genderValue)}</li>
                    </ul>
                    <p class="small-hint">Note: Standard browser submit reload was prevented using <code>event.preventDefault()</code>.</p>
                `;
                successContainer.classList.remove('hidden');

                // Optional: Reset form fields after successful submit
                practiceForm.reset();
            }
        });
    }

    // Helper functions for validation UI
    function resetErrorsAndSuccess() {
        // Clear text inside all error divs
        usernameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        termsError.textContent = "";

        // Remove red borders from inputs
        usernameInput.classList.remove('input-error-border');
        emailInput.classList.remove('input-error-border');
        passwordInput.classList.remove('input-error-border');

        // Hide success message
        successContainer.classList.add('hidden');
        successContainer.innerHTML = "";
    }

    // Security helper to escape inputs to prevent basic dynamic XSS when rendering user details back
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // --- REAL-TIME INPUT VALIDATION PRACTICE ---
    // Let's validate the username on input (as the user types!)
    if (usernameInput) {
        usernameInput.addEventListener('input', () => {
            const val = usernameInput.value.trim();
            if (val.length > 0 && val.length < 3) {
                usernameError.textContent = "Typing... Need at least 3 chars.";
                usernameInput.classList.add('input-warn-border');
            } else {
                usernameError.textContent = "";
                usernameInput.classList.remove('input-warn-border');
            }
        });
    }
});
