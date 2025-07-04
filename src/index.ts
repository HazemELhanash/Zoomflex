function validateEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

interface User {
  name: string;
  email: string;
  password: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm") as HTMLFormElement;
  const signupForm = document.getElementById("signupForm") as HTMLFormElement;
  const toggleLink = document.getElementById("toggleLink") as HTMLAnchorElement;
  const toggleText = document.getElementById("toggleText")!;
  const formTitle = document.getElementById("formTitle")!;

  let isLogin = true;

  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
      loginForm.classList.remove("d-none");
      signupForm.classList.add("d-none");
      formTitle.textContent = "🎬 Login to ZoomFlex";
      toggleText.textContent = "Don't have an account?";
      toggleLink.textContent = "Sign up here";
    } else {
      loginForm.classList.add("d-none");
      signupForm.classList.remove("d-none");
      formTitle.textContent = "🎬 Sign up for ZoomFlex";
      toggleText.textContent = "Already have an account?";
      toggleLink.textContent = "Login here";
    }
  });

  // 🔐 Handle Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value.trim();

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      alert(`✅ Welcome back, ${foundUser.name}!`);
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      window.location.href = "home.html";
      // window.location.href = "home.html"; // optional redirect
    } else {
      alert("❌ Invalid email or password.");
    }
  });

  // ✍️ Handle Signup
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = (document.getElementById("name") as HTMLInputElement).value.trim();
    const email = (document.getElementById("signupEmail") as HTMLInputElement).value.trim();
    const password = (document.getElementById("signupPassword") as HTMLInputElement).value.trim();

    if (!name || !validateEmail(email) || password.length < 6) {
      alert("❌ Please fill all fields correctly.");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const alreadyExists = users.some(user => user.email === email);

    if (alreadyExists) {
      alert("❌ Email already registered.");
      return;
    }

    const newUser: User = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ Account created! You can now log in.");

    // Switch to login view
    toggleLink.click();
  });
  const quoteEl = document.getElementById("dynamicQuote")!;
const quotes = [
  `"Movies touch our hearts and awaken our vision." – Martin Scorsese`,
  `"Cinema is a matter of what's in the frame and what's out." – Martin Scorsese`,
  `"Life is like a box of chocolates." – Forrest Gump`,
  `"Why so serious?" – The Dark Knight`,
  `"I’ll be back." – The Terminator`,
  `"May the Force be with you." – Star Wars`,
];

let index = 0;
setInterval(() => {
  quoteEl.textContent = quotes[index];
  index = (index + 1) % quotes.length;
}, 4000);
});
