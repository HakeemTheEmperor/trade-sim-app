const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function handleSignUp(credentials: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

export async function handleLogin(credentials: {
  email: string;
  password: string;
}) {
  console.log(BASE_URL);
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw data;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

export async function logout() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (response.ok) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/welcome";
  } else {
    throw result;
  }
}

export async function handlePasswordChange(credentials: {
  old_password: string;
  new_password: string;
}) {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/auth/reset-password`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (response.ok) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/welcome";
    alert("Password changed successfully");
  } else {
    throw result;
  }
}
