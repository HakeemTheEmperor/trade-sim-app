const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const fetchUserById = async () => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/users/user`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  if (response.ok && result.data) {
    return result.data;
  } else {
    throw result;
  }
};

const handleEdit = async (credentials: {
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
}) => {
  const token = localStorage.getItem("token");
  const url = `${BASE_URL}/users/user/edit`;
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
  if (response.ok && result.user) {
    localStorage.setItem("user", JSON.stringify(result.user));
  } else {
    throw result;
  }
};

export { fetchUserById, handleEdit };
