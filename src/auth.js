// src/utils/auth.js
export function getSession() {
    return !!localStorage.getItem('session'); 
  }
  
  export function setSession(value) {
    localStorage.setItem('session', value); 
  }
  
  export function removeSession() {
    localStorage.removeItem('session'); 
  }
  