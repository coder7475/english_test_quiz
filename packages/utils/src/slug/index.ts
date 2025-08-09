export class Slug {
  /**
   * Convert a string to a URL-friendly slug.
   * @param text Input string to slugify.
   * @returns Slugified string.
   */
  static slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove non-word characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/--+/g, "-"); // Remove duplicate hyphens
  }

  /**
   * Generate a unique slug not found in the existing set.
   * @param text Input string to slugify.
   * @param existingSlugs Set of already-taken slugs.
   * @returns Unique slug.
   */
  static uniqueSlugify(text: string, existingSlugs: Set<string>): string {
    const baseSlug = Slug.slugify(text);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (existingSlugs.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  }

  /**
   * Append a slugified suffix to an existing slug.
   * @param baseSlug The original slug.
   * @param suffix The string to append, which will be slugified.
   * @returns New combined slug.
   */
  static appendToSlug(baseSlug: string, suffix: string): string {
    const cleanSuffix = Slug.slugify(suffix);
    return `${baseSlug}-${cleanSuffix}`;
  }
}

// ? Example Usage
// const base = Slug.slugify("My Post");
// console.log(base); // "my-post"

// const withSuffix = Slug.appendToSlug(base, "2025 July");
// console.log(withSuffix); // "my-post-2025-july"

// const unique = Slug.uniqueSlugify("My Post", new Set(["my-post", "my-post-1"]));
// console.log(unique); // "my-post-2"
