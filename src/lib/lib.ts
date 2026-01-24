export const formatHashtags = (tags: string[]) => {
    return tags.map((tag) => {
        const trimemd = tag.trim();
        return trimemd.startsWith('#') ? trimemd : `#${trimemd}`;
    })
}