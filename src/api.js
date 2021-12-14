export const getSearchData = (key) => {
  const db = [
    "apple",
    "banana",
    "mango",
    "apple pie",
    "apple smoothie",
    "apple slush",
    "apple juice",
    "apple device",
    "mango slush",
    "banana smoothie"
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(db.filter((data) => data.includes(key)).slice(0, 5)); // returns 5 suggestions
    }, Math.random() * 1000);
  });
};
