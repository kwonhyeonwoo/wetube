export const formatHashtags = (tags: any) => {
  let tagsArray = tags;

  // 1. 프론트엔드 FormData에서 JSON 문자열로 넘어온 경우 파싱
  if (typeof tags === "string") {
    try {
      tagsArray = JSON.parse(tags);
    } catch (e) {
      tagsArray = [tags];
    }
  }

  // 2. 배열이 아니면 빈 배열 반환
  if (!Array.isArray(tagsArray)) {
    return [];
  }

  // 3. 데이터 세탁 및 포맷팅
  return tagsArray
    .flat(Infinity) // ✨ 핵심: 이중 배열 [['태그']] 가 들어와도 ['태그'] 로 납작하게 펴줍니다.
    .filter((tag) => typeof tag === "string" || typeof tag === "number") // 혹시 모를 null이나 객체 방어
    .map((tag) => {
      const trimmed = String(tag).trim(); // 무조건 문자열로 취급하여 에러 방지

      if (!trimmed) return ""; // 공백만 있던 태그는 무시하기 위해 빈 문자열 반환

      return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
    })
    .filter((tag) => tag !== ""); // 위에서 빈 문자열("")이 된 쓰레기 값들을 최종적으로 걸러냅니다.
};
