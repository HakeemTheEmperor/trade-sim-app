import { apiFetch } from "./apiClient";

const fetchUserById = async () => {
  const response = await apiFetch(`/users/user`, { method: "GET" });
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
  const response = await apiFetch(`/users/user/edit`, {
    method: "POST",
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
