// import React, { useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';

// export default function LoginSignup() {
//   const { login } = useAuth();
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.text = "function switchAuthTab(target) {\n    const heading = document.getElementById('auth-heading');\n    const subheading = document.getElementById('auth-subheading');\n    const signinSec = document.getElementById('signin-section');\n    const signupSec = document.getElementById('signup-section');\n    const tabSignin = document.getElementById('tab-signin');\n    const tabSignup = document.getElementById('tab-signup');\n    dismissAlert();\n\n    if (target === 'signup') {\n      heading.innerText = 'Create your account';\n      subheading.innerText = 'Spin up an enterprise event gateway in seconds.';\n      signinSec.classList.add('hidden');\n      signupSec.classList.remove('hidden');\n\n      tabSignup.className = 'flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 bg-surface-container-lowest text-on-surface shadow-sm';\n      tabSignin.className = 'flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 text-on-surface-variant hover:text-on-surface';\n    } else {\n      heading.innerText = 'Welcome back';\n      subheading.innerText = 'Sign in to your Hookdeck workspace.';\n      signupSec.classList.add('hidden');\n      signinSec.classList.remove('hidden');\n\n      tabSignin.className = 'flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 bg-surface-container-lowest text-on-surface shadow-sm';\n      tabSignup.className = 'flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 text-on-surface-variant hover:text-on-surface';\n    }\n  }\n\n  function togglePasswordVisibility(fieldId, btn) {\n    const field = document.getElementById(fieldId);\n    const icon = btn.querySelector('.material-symbols-outlined');\n    if (field.type === 'password') {\n      field.type = 'text';\n      icon.innerText = 'visibility_off';\n    } else {\n      field.type = 'password';\n      icon.innerText = 'visibility';\n    }\n  }\n\n  function validateSignInEmail(val) {\n    const emailErr = document.getElementById('signin-email-error');\n    const emailStatus = document.getElementById('signin-email-status');\n    const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val);\n\n    if (!val) {\n      emailErr.classList.add('hidden');\n      emailStatus.classList.add('hidden');\n      return;\n    }\n\n    if (isValid) {\n      emailErr.classList.add('hidden');\n      emailStatus.classList.remove('hidden');\n    } else {\n      emailErr.classList.remove('hidden');\n      emailStatus.classList.add('hidden');\n    }\n  }\n\n  function validateSignUpEmail(val) {\n    // Optional live feedback for signup\n  }\n\n  function checkPasswordStrength(val) {\n    const m1 = document.getElementById('meter-1');\n    const m2 = document.getElementById('meter-2');\n    const m3 = document.getElementById('meter-3');\n    const m4 = document.getElementById('meter-4');\n    const label = document.getElementById('strength-label');\n\n    const meters = [m1, m2, m3, m4];\n    meters.forEach(m => {\n      m.className = 'h-1 rounded-full bg-surface-container-high transition-colors';\n    });\n\n    if (!val) {\n      label.innerText = 'Min 8 chars';\n      label.className = 'font-code-sm text-code-sm text-outline';\n      return;\n    }\n\n    let score = 0;\n    if (val.length >= 8) score++;\n    if (/[A-Z]/.test(val)) score++;\n    if (/[0-9]/.test(val)) score++;\n    if (/[^A-Za-z0-9]/.test(val)) score++;\n\n    if (score === 1) {\n      m1.className = 'h-1 rounded-full bg-error transition-colors';\n      label.innerText = 'Weak';\n      label.className = 'font-code-sm text-code-sm text-error';\n    } else if (score === 2) {\n      m1.className = 'h-1 rounded-full bg-secondary transition-colors';\n      m2.className = 'h-1 rounded-full bg-secondary transition-colors';\n      label.innerText = 'Moderate';\n      label.className = 'font-code-sm text-code-sm text-secondary';\n    } else if (score === 3) {\n      m1.className = 'h-1 rounded-full bg-primary-container transition-colors';\n      m2.className = 'h-1 rounded-full bg-primary-container transition-colors';\n      m3.className = 'h-1 rounded-full bg-primary-container transition-colors';\n      label.innerText = 'Good';\n      label.className = 'font-code-sm text-code-sm text-primary';\n    } else if (score >= 4) {\n      meters.forEach(m => m.className = 'h-1 rounded-full bg-primary transition-colors');\n      label.innerText = 'Strong';\n      label.className = 'font-code-sm text-code-sm text-primary';\n    }\n  }\n\n  function showAlert(msg, isSuccess = true) {\n    const alertBox = document.getElementById('auth-alert');\n    const alertMsg = document.getElementById('auth-alert-msg');\n    const alertIcon = document.getElementById('auth-alert-icon');\n\n    alertMsg.innerText = msg;\n    if (isSuccess) {\n      alertIcon.innerText = 'check_circle';\n      alertIcon.className = 'material-symbols-outlined text-base text-primary';\n    } else {\n      alertIcon.innerText = 'warning';\n      alertIcon.className = 'material-symbols-outlined text-base text-error';\n    }\n    alertBox.classList.remove('hidden');\n  }\n\n  function dismissAlert() {\n    const alertBox = document.getElementById('auth-alert');\n    if (alertBox) {\n      alertBox.classList.add('hidden');\n    }\n  }\n\n  function handleSignIn(e) {\n    e.preventDefault();\n    const email = document.getElementById('signin-email').value;\n    const pwd = document.getElementById('signin-password').value;\n\n    if (!email || !pwd) {\n      showAlert('Please enter both email and workspace credentials.', false);\n      return;\n    }\n    showAlert('Authenticating session token & routing to dashboard...');\n    const btn = document.getElementById('btn-signin-submit');\n    btn.disabled = true;\n    btn.innerHTML = `<span class=\"inline-block w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin\"></span><span>Connecting...</span>`;\n    setTimeout(() => {\n      btn.disabled = false;\n      btn.innerHTML = `<span>Sign In to Workspace</span><span class=\"material-symbols-outlined text-base\">arrow_forward</span>`;\n      showAlert('Authentication verified. Redirecting...', true);\n    }, 1200);\n  }\n\n  function handleSignUp(e) {\n    e.preventDefault();\n    const pwd = document.getElementById('signup-password').value;\n    const confirm = document.getElementById('signup-confirm').value;\n\n    if (pwd !== confirm) {\n      showAlert('Password confirmation does not match.', false);\n      return;\n    }\n    showAlert('Provisioning dedicated tenant ingestion pipe...');\n    const btn = document.getElementById('btn-signup-submit');\n    btn.disabled = true;\n    btn.innerHTML = `<span class=\"inline-block w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin\"></span><span>Spinning Cluster...</span>`;\n    setTimeout(() => {\n      btn.disabled = false;\n      btn.innerHTML = `<span>Create Account &amp; Cluster</span><span class=\"material-symbols-outlined text-base\">rocket_launch</span>`;\n      showAlert('Cluster ready. Verification link dispatched.', true);\n    }, 1400);\n  }\n\n  function handleSSOLogin() {\n    showAlert('Redirecting to Identity Provider SAML gateway...', true);\n  }\n\n  function triggerForgotPasswordToast() {\n    showAlert('Self-service password recovery token sent to authorized contacts.', true);\n  }";
//     document.body.appendChild(script);
//     return () => script.remove();
//   }, []);

//   return <div className="source-screen"><main className={"min-h-screen w-full flex items-center justify-center p-space-lg"}><div className={"flex flex-col w-full items-center justify-center py-space-xl px-space-md"}>{"\n"}{"\n"}<div className={"relative w-full max-w-md flex flex-col items-center"}>{"\n"}<div className={"absolute -top-12 -inset-x-8 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"}></div>{"\n"}{"\n"}<div className={"w-full bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden relative"}>{"\n"}{"\n"}<div className={"w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"}></div>{"\n"}{"\n"}<div className={"pt-space-xl pb-space-md px-space-xl flex flex-col items-center text-center"}>{"\n"}{"\n"}<div className={"relative w-12 h-12 mb-space-md flex items-center justify-center rounded-lg bg-surface-container-high shadow-md"}>{"\n"}<img alt={"Hookdeck Monogram Logo"} className={"w-8 h-8 object-contain"} src={"https://lh3.googleusercontent.com/aida/AEtjO1W8n4HhRyIDGyiUYrS6IYBX3yC0_OZIRCObmT6M6wqmsbMzwJzbM3ka-KngNYw85fV3TFDicfcDg1jFbgMloV1NyNXqR5V0COpmFPT2_q9IFZcIiWNTn9Ii9C3y-a8J_VqmeZdxbxXkNdKhwFltgFK-Na9pjm4NObZud_VrB14wRKE_KhIEirynT0pbPAwwQ9FqVUmemRzBJ5KvBYR0E3Joo8W4q40XeGRIeYL5FIfg6naZEpN8av8-gWfp"} />{"\n"}</div>{"\n"}{"\n"}<div className={"inline-flex items-center gap-space-xs px-2 py-0.5 mb-space-sm bg-surface-container rounded-full"}>{"\n"}<span className={"w-1.5 h-1.5 rounded-full bg-primary animate-pulse"}></span>{"\n"}<span className={"font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider"}>{"Broker Region: us-east-1 (Live)"}</span>{"\n"}</div>{"\n"}<h1 className={"font-headline-lg text-headline-lg text-on-surface"} id={"auth-heading"}>{"Welcome back"}</h1>{"\n"}<p className={"font-body-sm text-body-sm text-on-surface-variant mt-1"} id={"auth-subheading"}>{"Sign in to your Hookdeck workspace."}</p>{"\n"}</div>{"\n"}{"\n"}<div className={"px-space-xl pb-space-md"}>{"\n"}<div className={"grid grid-cols-2 p-1 bg-surface-container-high rounded-lg gap-1"}>{"\n"}<button className={"flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 bg-surface-container-lowest text-on-surface shadow-sm"} id={"tab-signin"} onClick={(event) => { switchAuthTab('signin') }} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-sm"}>{"login"}</span>{"\n"}<span>{"Sign In"}</span>{"\n"}</button>{"\n"}<button className={"flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 text-on-surface-variant hover:text-on-surface"} id={"tab-signup"} onClick={(event) => { switchAuthTab('signup') }} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-sm"}>{"person_add"}</span>{"\n"}<span>{"Sign Up"}</span>{"\n"}</button>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"px-space-xl pb-space-xl flex flex-col gap-space-md"} id={"signin-section"}>{"\n"}<form className={"flex flex-col gap-space-md"} noValidate={true} onSubmit={(event) => { handleSignIn(event) }}>{"\n"}{"\n"}<div className={"flex flex-col gap-1.5"}>{"\n"}<div className={"flex items-center justify-between"}>{"\n"}<label className={"font-label-sm text-label-sm text-on-surface-variant"} htmlFor={"signin-email"}>{"Email"}</label>{"\n"}<span className={"hidden font-code-sm text-code-sm text-primary"} id={"signin-email-status"}>{"Valid format"}</span>{"\n"}</div>{"\n"}<div className={"relative flex items-center"}>{"\n"}<span className={"absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none"}>{"mail"}</span>{"\n"}<input className={"w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-9 pr-3 py-2 rounded-lg placeholder-outline focus:bg-surface-container focus:text-on-surface outline-none transition-colors"} id={"signin-email"} onInput={(event) => { validateSignInEmail(event.target.value) }} placeholder={"admin@acme.io"} type={"email"} />{"\n"}</div>{"\n"}<p className={"hidden font-code-sm text-code-sm text-error"} id={"signin-email-error"}>{"Please enter a valid work email."}</p>{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-1.5"}>{"\n"}<div className={"flex items-center justify-between"}>{"\n"}<label className={"font-label-sm text-label-sm text-on-surface-variant"} htmlFor={"signin-password"}>{"Password"}</label>{"\n"}<a className={"font-label-sm text-label-sm text-primary hover:underline"} href={"javascript:void(0)"} onClick={(event) => { triggerForgotPasswordToast() }}>{"Forgot password?"}</a>{"\n"}</div>{"\n"}<div className={"relative flex items-center"}>{"\n"}<span className={"absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none"}>{"key"}</span>{"\n"}<input className={"w-full bg-surface-container-low text-on-surface font-code-md text-code-md pl-9 pr-10 py-2 rounded-lg placeholder-outline focus:bg-surface-container outline-none transition-colors"} id={"signin-password"} placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"} type={"password"} />{"\n"}<button className={"absolute right-2 p-1 text-outline hover:text-on-surface transition-colors flex items-center justify-center"} onClick={(event) => { togglePasswordVisibility('signin-password', event.currentTarget) }} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-base"}>{"visibility"}</span>{"\n"}</button>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}{"\n"}{"\n"}<button className={"mt-2 w-full py-2.5 px-4 bg-primary text-on-primary font-headline-sm text-headline-sm rounded-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm font-medium"} id={"btn-signin-submit"} type={"submit"}>{"\n"}<span>{"Sign In to Workspace"}</span>{"\n"}<span className={"material-symbols-outlined text-base"}>{"arrow_forward"}</span>{"\n"}</button>{"\n"}</form>{"\n"}{"\n"}</div>{"\n"}{"\n"}<div className={"hidden px-space-xl pb-space-xl flex flex-col gap-space-md"} id={"signup-section"}>{"\n"}<form className={"flex flex-col gap-space-sm"} noValidate={true} onSubmit={(event) => { handleSignUp(event) }}>{"\n"}{"\n"}<div className={"flex flex-col gap-1"}>{"\n"}<label className={"font-label-sm text-label-sm text-on-surface-variant"} htmlFor={"signup-name"}>{"Full Name"}</label>{"\n"}<div className={"relative flex items-center"}>{"\n"}<span className={"absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none"}>{"badge"}</span>{"\n"}<input className={"w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-9 pr-3 py-1.5 rounded-lg placeholder-outline focus:bg-surface-container outline-none transition-colors"} id={"signup-name"} placeholder={"Devon Vance"} required={true} type={"text"} />{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-1"}>{"\n"}<label className={"font-label-sm text-label-sm text-on-surface-variant"} htmlFor={"signup-email"}>{"Email"}</label>{"\n"}<div className={"relative flex items-center"}>{"\n"}<span className={"absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none"}>{"mail"}</span>{"\n"}<input className={"w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-9 pr-3 py-1.5 rounded-lg placeholder-outline focus:bg-surface-container outline-none transition-colors"} id={"signup-email"} onInput={(event) => { validateSignUpEmail(event.target.value) }} placeholder={"devon@acme-corp.io"} required={true} type={"email"} />{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"flex flex-col gap-1"}>{"\n"}</div>{"\n"}<div className={"flex flex-col gap-1"}>{"\n"}<div className={"flex items-center justify-between"}>{"\n"}<label className={"font-label-sm text-label-sm text-on-surface-variant"} htmlFor={"signup-password"}>{"Password"}</label>{"\n"}<span className={"font-code-sm text-code-sm text-outline"} id={"strength-label"}>{"Min 8 chars"}</span>{"\n"}</div>{"\n"}<div className={"relative flex items-center"}>{"\n"}<span className={"absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none"}>{"lock"}</span>{"\n"}<input className={"w-full bg-surface-container-low text-on-surface font-code-md text-code-md pl-9 pr-10 py-1.5 rounded-lg placeholder-outline focus:bg-surface-container outline-none transition-colors"} id={"signup-password"} onInput={(event) => { checkPasswordStrength(event.target.value) }} placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"} type={"password"} />{"\n"}<button className={"absolute right-2 p-1 text-outline hover:text-on-surface transition-colors flex items-center justify-center"} onClick={(event) => { togglePasswordVisibility('signup-password', event.currentTarget) }} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-base"}>{"visibility"}</span>{"\n"}</button>{"\n"}</div>{"\n"}{"\n"}</div>{"\n"}{"\n"}<button className={"mt-2 w-full py-2.5 px-4 bg-primary text-on-primary font-headline-sm text-headline-sm rounded-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm font-medium"} id={"btn-signup-submit"} type={"submit"}>{"\n"}<span>{"Create Account & Cluster"}</span>{"\n"}<span className={"material-symbols-outlined text-base"}>{"rocket_launch"}</span>{"\n"}</button>{"\n"}</form>{"\n"}</div>{"\n"}{"\n"}<div className={"hidden mx-space-xl mb-space-md p-2.5 rounded-lg bg-surface-container flex items-center gap-2 transition-all"} id={"auth-alert"}>{"\n"}<span className={"material-symbols-outlined text-base text-primary"} id={"auth-alert-icon"}>{"info"}</span>{"\n"}<span className={"font-code-sm text-code-sm text-on-surface flex-1"} id={"auth-alert-msg"}>{"Ready"}</span>{"\n"}<button className={"text-outline hover:text-on-surface"} onClick={(event) => { dismissAlert() }} type={"button"}>{"\n"}<span className={"material-symbols-outlined text-sm"}>{"close"}</span>{"\n"}</button>{"\n"}</div>{"\n"}{"\n"}<div className={"px-space-xl py-space-sm bg-surface-container-low flex items-center justify-between"}>{"\n"}<div className={"flex items-center gap-2"}>{"\n"}<span className={"material-symbols-outlined text-primary text-sm"}>{"verified_user"}</span>{"\n"}<span className={"font-code-sm text-code-sm text-on-surface-variant"}>{"SOC 2 Type II Certified"}</span>{"\n"}</div>{"\n"}<div className={"flex items-center gap-3"}>{"\n"}<a className={"font-code-sm text-code-sm text-outline hover:text-on-surface transition-colors"} href={"javascript:void(0)"}>{"API Docs"}</a>{"\n"}<span className={"text-outline/40"}>{"\u2022"}</span>{"\n"}<a className={"font-code-sm text-code-sm text-outline hover:text-on-surface transition-colors"} href={"javascript:void(0)"}>{"CLI Ingest"}</a>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}{"\n"}<div className={"mt-space-lg w-full flex flex-wrap items-center justify-between text-on-surface-variant px-space-xs gap-space-sm"}>{"\n"}<div className={"flex items-center gap-2"}>{"\n"}<span className={"inline-block w-2 h-2 rounded-full bg-primary-container"}></span>{"\n"}<span className={"font-body-sm text-body-sm text-on-surface-variant"}>{"All Systems Operational"}</span>{"\n"}</div>{"\n"}<div className={"flex items-center gap-4"}>{"\n"}<a className={"font-body-sm text-body-sm text-outline hover:text-on-surface transition-colors flex items-center gap-1"} href={"javascript:void(0)"}>{"\n"}<span className={"material-symbols-outlined text-sm"}>{"hub"}</span>{"\n"}<span>{"Message Broker"}</span>{"\n"}</a>{"\n"}<a className={"font-body-sm text-body-sm text-outline hover:text-on-surface transition-colors flex items-center gap-1"} href={"javascript:void(0)"}>{"\n"}<span className={"material-symbols-outlined text-sm"}>{"terminal"}</span>{"\n"}<span>{"hookdeck login"}</span>{"\n"}</a>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}</div>{"\n"}</main></div>;
// }


import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    if (!email || !password) {
      showAuthAlert("Please enter both email and password.", false);
      return;
    }

    const btn = document.getElementById("btn-signin-submit");

    try {
      btn.disabled = true;
      btn.innerHTML = "Connecting...";

      showAuthAlert("Authenticating...", true);

      const data = await login(email, password);
      navigate("/endpoints");

      console.log("Login response:", data);

      showAuthAlert("Login successful!", true);
    } catch (error) {
      console.error("Login error:", error);
      showAuthAlert(error.message || "Login failed.", false);
    } finally {
      btn.disabled = false;

      btn.innerHTML =
        '<span>Sign In to Workspace</span>' +
        '<span class="material-symbols-outlined text-base">arrow_forward</span>';
    }
  };

  const showAuthAlert = (message, isSuccess = true) => {
    const alertBox = document.getElementById("auth-alert");
    const alertMsg = document.getElementById("auth-alert-msg");
    const alertIcon = document.getElementById("auth-alert-icon");

    alertMsg.innerText = message;

    if (isSuccess) {
      alertIcon.innerText = "check_circle";
      alertIcon.className =
        "material-symbols-outlined text-base text-primary";
    } else {
      alertIcon.innerText = "warning";
      alertIcon.className =
        "material-symbols-outlined text-base text-error";
    }

    alertBox.classList.remove("hidden");
  };

  async function handleSignUp(e) {
    e.preventDefault();

    const name = document.getElementById("signup-name").value;

    const email = document.getElementById("signup-email").value;

    const password = document.getElementById("signup-password").value;

    if (!name || !email || !password) {
      showAuthAlert(
        "Please fill in all required fields.",
        false
      );
      return;
    }

    const btn = document.getElementById("btn-signup-submit");

    try{
      btn.disabled = true;

      btn.innerHTML =
        '<span class="inline-block w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></span>' +
        '<span>Spinning Cluster...</span>';

        showAuthAlert("Creating Your Account...", true);

        const data = await signup(name, email, password);

        showAuthAlert("Account Created Succesfully!", true);
    }
    catch(error){
      console.log("Signup error : ", error);

      showAuthAlert(error.message || "Signup failed", false);
    }
    finally{
      btn.disabled = false;
  
      btn.innerHTML =
        '<span>Create Account &amp; Cluster</span>' +
        '<span class="material-symbols-outlined text-base">rocket_launch</span>';
    }
  }

  useEffect(() => {
    const script = document.createElement("script");

    script.text = `
        function switchAuthTab(target) {
            const heading = document.getElementById("auth-heading");
            const subheading = document.getElementById("auth-subheading");
            const signinSec = document.getElementById("signin-section");
            const signupSec = document.getElementById("signup-section");
            const tabSignin = document.getElementById("tab-signin");
            const tabSignup = document.getElementById("tab-signup");

            dismissAlert();

            if (target === "signup") {
                heading.innerText = "Create your account";
                subheading.innerText =
                    "Spin up an enterprise event gateway in seconds.";

                signinSec.classList.add("hidden");
                signupSec.classList.remove("hidden");

                tabSignup.className =
                    "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 bg-surface-container-lowest text-on-surface shadow-sm";

                tabSignin.className =
                    "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 text-on-surface-variant hover:text-on-surface";
            } else {
                heading.innerText = "Welcome back";
                subheading.innerText =
                    "Sign in to your Hookdeck workspace.";

                signupSec.classList.add("hidden");
                signinSec.classList.remove("hidden");

                tabSignin.className =
                    "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 bg-surface-container-lowest text-on-surface shadow-sm";

                tabSignup.className =
                    "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 text-on-surface-variant hover:text-on-surface";
            }
        }

        function togglePasswordVisibility(fieldId, btn) {
            const field = document.getElementById(fieldId);
            const icon = btn.querySelector(".material-symbols-outlined");

            if (field.type === "password") {
                field.type = "text";
                icon.innerText = "visibility_off";
            } else {
                field.type = "password";
                icon.innerText = "visibility";
            }
        }

        function validateSignInEmail(val) {
            const emailErr =
                document.getElementById("signin-email-error");

            const emailStatus =
                document.getElementById("signin-email-status");

            const isValid =
                /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val);

            if (!val) {
                emailErr.classList.add("hidden");
                emailStatus.classList.add("hidden");
                return;
            }

            if (isValid) {
                emailErr.classList.add("hidden");
                emailStatus.classList.remove("hidden");
            } else {
                emailErr.classList.remove("hidden");
                emailStatus.classList.add("hidden");
            }
        }

        function validateSignUpEmail(val) {
            // Optional live feedback for signup
        }

        function checkPasswordStrength(val) {
            const m1 = document.getElementById("meter-1");
            const m2 = document.getElementById("meter-2");
            const m3 = document.getElementById("meter-3");
            const m4 = document.getElementById("meter-4");
            const label = document.getElementById("strength-label");

            const meters = [m1, m2, m3, m4];

            meters.forEach((m) => {
                if (m) {
                    m.className =
                        "h-1 rounded-full bg-surface-container-high transition-colors";
                }
            });

            if (!val) {
                label.innerText = "Min 8 chars";
                label.className =
                    "font-code-sm text-code-sm text-outline";
                return;
            }

            let score = 0;

            if (val.length >= 8) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            if (score === 1) {
                if (m1) {
                    m1.className =
                        "h-1 rounded-full bg-error transition-colors";
                }

                label.innerText = "Weak";
                label.className =
                    "font-code-sm text-code-sm text-error";
            } else if (score === 2) {
                if (m1) {
                    m1.className =
                        "h-1 rounded-full bg-secondary transition-colors";
                }

                if (m2) {
                    m2.className =
                        "h-1 rounded-full bg-secondary transition-colors";
                }

                label.innerText = "Moderate";
                label.className =
                    "font-code-sm text-code-sm text-secondary";
            } else if (score === 3) {
                if (m1) {
                    m1.className =
                        "h-1 rounded-full bg-primary-container transition-colors";
                }

                if (m2) {
                    m2.className =
                        "h-1 rounded-full bg-primary-container transition-colors";
                }

                if (m3) {
                    m3.className =
                        "h-1 rounded-full bg-primary-container transition-colors";
                }

                label.innerText = "Good";
                label.className =
                    "font-code-sm text-code-sm text-primary";
            } else if (score >= 4) {
                meters.forEach((m) => {
                    if (m) {
                        m.className =
                            "h-1 rounded-full bg-primary transition-colors";
                    }
                });

                label.innerText = "Strong";
                label.className =
                    "font-code-sm text-code-sm text-primary";
            }
        }

        function showAlert(msg, isSuccess = true) {
            const alertBox =
                document.getElementById("auth-alert");

            const alertMsg =
                document.getElementById("auth-alert-msg");

            const alertIcon =
                document.getElementById("auth-alert-icon");

            alertMsg.innerText = msg;

            if (isSuccess) {
                alertIcon.innerText = "check_circle";
                alertIcon.className =
                    "material-symbols-outlined text-base text-primary";
            } else {
                alertIcon.innerText = "warning";
                alertIcon.className =
                    "material-symbols-outlined text-base text-error";
            }

            alertBox.classList.remove("hidden");
        }

        function dismissAlert() {
            const alertBox =
                document.getElementById("auth-alert");

            if (alertBox) {
                alertBox.classList.add("hidden");
            }
        }

        function handleSSOLogin() {
            showAlert(
                "Redirecting to Identity Provider SAML gateway...",
                true
            );
        }

        function triggerForgotPasswordToast() {
            showAlert(
                "Self-service password recovery token sent to authorized contacts.",
                true
            );
        }
    `;

    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <div className="source-screen">
      <main
        className={
          "min-h-screen w-full flex items-center justify-center p-space-lg"
        }
      >
        <div
          className={
            "flex flex-col w-full items-center justify-center py-space-xl px-space-md"
          }
        >
          <div
            className={
              "relative w-full max-w-md flex flex-col items-center"
            }
          >
            {/* Background glow */}
            <div
              className={
                "absolute -top-12 -inset-x-8 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"
              }
            ></div>

            {/* Main Card */}
            <div
              className={
                "w-full bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden relative"
              }
            >
              {/* Top border */}
              <div
                className={
                  "w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                }
              ></div>

              {/* Header */}
              <div
                className={
                  "pt-space-xl pb-space-md px-space-xl flex flex-col items-center text-center"
                }
              >
                {/* Logo */}
                <div
                  className={
                    "relative w-12 h-12 mb-space-md flex items-center justify-center rounded-lg bg-surface-container-high shadow-md"
                  }
                >
                  <img
                    alt="Hookdeck Monogram Logo"
                    className="w-8 h-8 object-contain"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1W8n4HhRyIDGyiUYrS6IYBX3yC0_OZIRCObmT6M6wqmsbMzwJzbM3ka-KngNYw85fV3TFDicfcDg1jFbgMloV1NyNXqR5V0COpmFPT2_q9IFZcIiWNTn9Ii9C3y-a8J_VqmeZdxbxXkNdKhwFltgFK-Na9pjm4NObZud_VrB14wRKE_KhIEirynT0pbPAwwQ9FqVUmemRzBJ5KvBYR0E3Joo8W4q40XeGRIeYL5FIfg6naZEpN8av8-gWfp"
                  />
                </div>

                {/* Region */}
                <div
                  className={
                    "inline-flex items-center gap-space-xs px-2 py-0.5 mb-space-sm bg-surface-container rounded-full"
                  }
                >
                  <span
                    className={
                      "w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                    }
                  ></span>

                  <span
                    className={
                      "font-code-sm text-code-sm text-on-surface-variant uppercase tracking-wider"
                    }
                  >
                    Broker Region: us-east-1 (Live)
                  </span>
                </div>

                {/* Heading */}
                <h1
                  className={
                    "font-headline-lg text-headline-lg text-on-surface"
                  }
                  id="auth-heading"
                >
                  Welcome back
                </h1>

                <p
                  className={
                    "font-body-sm text-body-sm text-on-surface-variant mt-1"
                  }
                  id="auth-subheading"
                >
                  Sign in to your Hookdeck workspace.
                </p>
              </div>

              {/* Auth Tabs */}
              <div className="px-space-xl pb-space-md">
                <div
                  className={
                    "grid grid-cols-2 p-1 bg-surface-container-high rounded-lg gap-1"
                  }
                >
                  <button
                    className={
                      "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 bg-surface-container-lowest text-on-surface shadow-sm"
                    }
                    id="tab-signin"
                    onClick={() =>
                      switchAuthTab("signin")
                    }
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">
                      login
                    </span>

                    <span>Sign In</span>
                  </button>

                  <button
                    className={
                      "flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md font-label-md text-label-md transition-all duration-150 text-on-surface-variant hover:text-on-surface"
                    }
                    id="tab-signup"
                    onClick={() =>
                      switchAuthTab("signup")
                    }
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">
                      person_add
                    </span>

                    <span>Sign Up</span>
                  </button>
                </div>
              </div>

              {/* Sign In Section */}
              <div
                className="px-space-xl pb-space-xl flex flex-col gap-space-md"
                id="signin-section"
              >
                <form
                  className="flex flex-col gap-space-md"
                  noValidate
                  onSubmit={handleSignIn}
                >
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-sm text-label-sm text-on-surface-variant"
                        htmlFor="signin-email"
                      >
                        Email
                      </label>

                      <span
                        className="hidden font-code-sm text-code-sm text-primary"
                        id="signin-email-status"
                      >
                        Valid format
                      </span>
                    </div>

                    <div className="relative flex items-center">
                      <span className="absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none">
                        mail
                      </span>

                      <input
                        className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-9 pr-3 py-2 rounded-lg placeholder-outline focus:bg-surface-container focus:text-on-surface outline-none transition-colors"
                        id="signin-email"
                        onInput={(event) =>
                          validateSignInEmail(
                            event.target.value
                          )
                        }
                        placeholder="admin@acme.io"
                        type="email"
                      />
                    </div>

                    <p
                      className="hidden font-code-sm text-code-sm text-error"
                      id="signin-email-error"
                    >
                      Please enter a valid work email.
                    </p>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-sm text-label-sm text-on-surface-variant"
                        htmlFor="signin-password"
                      >
                        Password
                      </label>

                      <a
                        className="font-label-sm text-label-sm text-primary hover:underline"
                        href="javascript:void(0)"
                        onClick={() =>
                          triggerForgotPasswordToast()
                        }
                      >
                        Forgot password?
                      </a>
                    </div>

                    <div className="relative flex items-center">
                      <span className="absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none">
                        key
                      </span>

                      <input
                        className="w-full bg-surface-container-low text-on-surface font-code-md text-code-md pl-9 pr-10 py-2 rounded-lg placeholder-outline focus:bg-surface-container outline-none transition-colors"
                        id="signin-password"
                        placeholder="••••••••••••"
                        type="password"
                      />

                      <button
                        className="absolute right-2 p-1 text-outline hover:text-on-surface transition-colors flex items-center justify-center"
                        onClick={(event) =>
                          togglePasswordVisibility(
                            "signin-password",
                            event.currentTarget
                          )
                        }
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">
                          visibility
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    className="mt-2 w-full py-2.5 px-4 bg-primary text-on-primary font-headline-sm text-headline-sm rounded-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm font-medium"
                    id="btn-signin-submit"
                    type="submit"
                  >
                    <span>Sign In to Workspace</span>

                    <span className="material-symbols-outlined text-base">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </div>

              {/* Sign Up Section */}
              <div
                className="hidden px-space-xl pb-space-xl flex flex-col gap-space-md"
                id="signup-section"
              >
                <form
                  className="flex flex-col gap-space-sm"
                  noValidate
                  onSubmit={handleSignUp}
                >
                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-label-sm text-label-sm text-on-surface-variant"
                      htmlFor="signup-name"
                    >
                      Full Name
                    </label>

                    <div className="relative flex items-center">
                      <span className="absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none">
                        badge
                      </span>

                      <input
                        className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-9 pr-3 py-1.5 rounded-lg placeholder-outline focus:bg-surface-container outline-none transition-colors"
                        id="signup-name"
                        placeholder="Devon Vance"
                        required
                        type="text"
                      />
                    </div>
                  </div>

                  {/* Signup Email */}
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-label-sm text-label-sm text-on-surface-variant"
                      htmlFor="signup-email"
                    >
                      Email
                    </label>

                    <div className="relative flex items-center">
                      <span className="absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none">
                        mail
                      </span>

                      <input
                        className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md pl-9 pr-3 py-1.5 rounded-lg placeholder-outline focus:bg-surface-container outline-none transition-colors"
                        id="signup-email"
                        onInput={(event) =>
                          validateSignUpEmail(
                            event.target.value
                          )
                        }
                        placeholder="devon@acme-corp.io"
                        required
                        type="email"
                      />
                    </div>
                  </div>

                  {/* Empty spacer */}
                  <div className="flex flex-col gap-1"></div>

                  {/* Signup Password */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <label
                        className="font-label-sm text-label-sm text-on-surface-variant"
                        htmlFor="signup-password"
                      >
                        Password
                      </label>

                      <span
                        className="font-code-sm text-code-sm text-outline"
                        id="strength-label"
                      >
                        Min 8 chars
                      </span>
                    </div>

                    <div className="relative flex items-center">
                      <span className="absolute left-3 material-symbols-outlined text-outline text-base pointer-events-none">
                        lock
                      </span>

                      <input
                        className="w-full bg-surface-container-low text-on-surface font-code-md text-code-md pl-9 pr-10 py-1.5 rounded-lg placeholder-outline focus:bg-surface-container outline-none transition-colors"
                        id="signup-password"
                        onInput={(event) =>
                          checkPasswordStrength(
                            event.target.value
                          )
                        }
                        placeholder="••••••••••••"
                        type="password"
                      />

                      <button
                        className="absolute right-2 p-1 text-outline hover:text-on-surface transition-colors flex items-center justify-center"
                        onClick={(event) =>
                          togglePasswordVisibility(
                            "signup-password",
                            event.currentTarget
                          )
                        }
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">
                          visibility
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Signup Submit */}
                  <button
                    className="mt-2 w-full py-2.5 px-4 bg-primary text-on-primary font-headline-sm text-headline-sm rounded-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-sm font-medium"
                    id="btn-signup-submit"
                    type="submit"
                  >
                    <span>
                      Create Account &amp; Cluster
                    </span>

                    <span className="material-symbols-outlined text-base">
                      rocket_launch
                    </span>
                  </button>
                </form>
              </div>

              {/* Alert */}
              <div
                className="hidden mx-space-xl mb-space-md p-2.5 rounded-lg bg-surface-container flex items-center gap-2 transition-all"
                id="auth-alert"
              >
                <span
                  className="material-symbols-outlined text-base text-primary"
                  id="auth-alert-icon"
                >
                  info
                </span>

                <span
                  className="font-code-sm text-code-sm text-on-surface flex-1"
                  id="auth-alert-msg"
                >
                  Ready
                </span>

                <button
                  className="text-outline hover:text-on-surface"
                  onClick={() => dismissAlert()}
                  type="button"
                >
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </button>
              </div>

              {/* Footer inside card */}
              <div className="px-space-xl py-space-sm bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">
                    verified_user
                  </span>

                  <span className="font-code-sm text-code-sm text-on-surface-variant">
                    SOC 2 Type II Certified
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    className="font-code-sm text-code-sm text-outline hover:text-on-surface transition-colors"
                    href="javascript:void(0)"
                  >
                    API Docs
                  </a>

                  <span className="text-outline/40">
                    •
                  </span>

                  <a
                    className="font-code-sm text-code-sm text-outline hover:text-on-surface transition-colors"
                    href="javascript:void(0)"
                  >
                    CLI Ingest
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="mt-space-lg w-full flex flex-wrap items-center justify-between text-on-surface-variant px-space-xs gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary-container"></span>

                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  All Systems Operational
                </span>
              </div>

              <div className="flex items-center gap-4">
                <a
                  className="font-body-sm text-body-sm text-outline hover:text-on-surface transition-colors flex items-center gap-1"
                  href="javascript:void(0)"
                >
                  <span className="material-symbols-outlined text-sm">
                    hub
                  </span>

                  <span>Message Broker</span>
                </a>

                <a
                  className="font-body-sm text-body-sm text-outline hover:text-on-surface transition-colors flex items-center gap-1"
                  href="javascript:void(0)"
                >
                  <span className="material-symbols-outlined text-sm">
                    terminal
                  </span>

                  <span>hookdeck login</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}