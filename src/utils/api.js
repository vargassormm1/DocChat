const createUrl = (path) => {
  return window.location.origin + path;
};

export const getAIResponse = async (fileName, userQuestion) => {
  try {
    const res = await fetch(
      new Request(createUrl(`/api/chat/${fileName}`), {
        method: "POST",
        body: JSON.stringify(userQuestion),
      })
    );
    if (res.ok) {
      const data = await res.json();
      return data.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw new Error("Failed to fetch AI response");
  }
};
