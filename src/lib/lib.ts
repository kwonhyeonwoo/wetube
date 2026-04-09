export const formatHashtags = (tags: any) => {
  let tagsArray = tags;
  if (typeof tags === "string") {
    try {
      tagsArray = JSON.parse(tags);
    } catch (e) {
      tagsArray = [tags];
    }
  }

  if (!Array.isArray(tagsArray)) {
    return [];
  }

  return tagsArray.map((tag) => {
    const trimmed = tag.trim();
    return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  });
};
