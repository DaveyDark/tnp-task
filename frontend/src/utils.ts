import axios from "axios";

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Function to get the ordinal suffix
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th"; // Catch all 11th-13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Construct the final formatted date
  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}
export async function deletePost(id: number, token: string) {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function editPost(params: {
  id: number;
  title: string;
  content: string;
  tags: string;
  type: string;
  token: string;
}) {
  const { id, title, content, tags, type, token } = params;
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/posts/${id}`,
      { title, content, tags, type },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (err) {
    console.error(err);
  }
}
