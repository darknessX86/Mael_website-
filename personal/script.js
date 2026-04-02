// --- 1. SCROLL ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


// --- 2. SELECTION LOGIC (Using HTML Textareas) ---
const subjectSelect = document.getElementById('subject-select');
const resultBox = document.getElementById('subject-result');

subjectSelect.addEventListener('change', (e) => {
    const selectedValue = e.target.value;
    
    resultBox.classList.remove('active');

    // If the user picks a valid project
    if (selectedValue && selectedValue !== 'none') {
        // Formats the ID: "Hello World" -> "code-Hello-World"
        const formattedId = "code-" + selectedValue.replace(/\s+/g, '-');
        const hiddenSource = document.getElementById(formattedId);
        
        if (hiddenSource) {
            setTimeout(() => {
                resultBox.innerHTML = `
                    <p style="margin-bottom: 15px; font-weight: bold; color: #2d3436;">
                        Source Code for: ${selectedValue}
                    </p>
                    <div class="code-container">
                        <button class="copy-btn" onclick="copyCode()">Copy Code 📋</button>
                        <pre><code id="code-to-copy"></code></pre>
                    </div>
                `;
                
                // PULL the raw code from the textarea
                const codeElement = document.getElementById('code-to-copy');
                codeElement.textContent = hiddenSource.value.trim();
                
                resultBox.style.backgroundColor = "#4ECDC4"; 
                resultBox.classList.add('active');
            }, 150);
        } else {
            console.warn("Could not find a <textarea> with ID: " + formattedId);
        }
    }
});


// --- 3. COPY TO CLIPBOARD FUNCTIONS ---
function copyCode() {
    const codeElement = document.getElementById('code-to-copy');
    if (!codeElement) return;

    // Use .textContent to ensure we get the raw HTML tags correctly
    const codeText = codeElement.textContent;
    const btn = document.querySelector('.copy-btn');

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeText).then(() => {
            showSuccess(btn);
        }).catch(err => {
            fallbackCopy(codeText, btn);
        });
    } else {
        fallbackCopy(codeText, btn);
    }
}

function showSuccess(btn) {
    const originalText = btn.innerText;
    btn.innerText = "Copied! ✅";
    btn.style.backgroundColor = "#2d3436";
    btn.style.color = "#fff";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = ""; 
        btn.style.color = "";
    }, 2000);
}

function fallbackCopy(text, btn) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showSuccess(btn);
    } catch (err) {
        console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
}