/**
 * Input validation utilities
 */

/**
 * Validates title
 */
export const validateTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return { valid: false, error: 'Title is required' };
  }

  const trimmed = title.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Title cannot be empty' };
  }

  if (trimmed.length > 200) {
    return { valid: false, error: 'Title must be 200 characters or less' };
  }

  return { valid: true };
};

/**
 * Validates content
 */
export const validateContent = (content) => {
  if (!content || typeof content !== 'string') {
    return { valid: false, error: 'Content is required' };
  }

  const trimmed = content.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Content cannot be empty' };
  }

  // Check for reasonable content length (10MB limit for text)
  const maxLength = 10 * 1024 * 1024; // 10MB
  if (trimmed.length > maxLength) {
    return { valid: false, error: 'Content is too large (max 10MB)' };
  }

  return { valid: true };
};

/**
 * Validates tags
 */
export const validateTags = (tags) => {
  if (!Array.isArray(tags)) {
    return { valid: false, error: 'Tags must be an array' };
  }

  if (tags.length > 20) {
    return { valid: false, error: 'Maximum 20 tags allowed' };
  }

  for (const tag of tags) {
    if (typeof tag !== 'string') {
      return { valid: false, error: 'All tags must be strings' };
    }

    const trimmed = tag.trim();
    if (trimmed.length === 0) {
      return { valid: false, error: 'Tags cannot be empty' };
    }

    if (trimmed.length > 50) {
      return { valid: false, error: 'Each tag must be 50 characters or less' };
    }

    // Validate tag format (alphanumeric, dash, underscore)
    if (!/^[a-zA-Z0-9\-_]+$/.test(trimmed)) {
      return { valid: false, error: 'Tags can only contain letters, numbers, dashes, and underscores' };
    }
  }

  return { valid: true };
};

/**
 * Validates category
 */
export const validateCategory = (category) => {
  const validCategories = ['text', 'code', 'note', 'other'];
  
  if (!category || typeof category !== 'string') {
    return { valid: false, error: 'Category is required' };
  }

  if (!validCategories.includes(category)) {
    return { valid: false, error: 'Invalid category' };
  }

  return { valid: true };
};

/**
 * Validates language
 */
export const validateLanguage = (language) => {
  if (!language || typeof language !== 'string') {
    return { valid: true, language: 'text' }; // Default to text
  }

  return { valid: true, language };
};

/**
 * Validates a complete paste object
 */
export const validatePaste = (paste) => {
  const errors = [];

  const titleValidation = validateTitle(paste.title);
  if (!titleValidation.valid) {
    errors.push(titleValidation.error);
  }

  const contentValidation = validateContent(paste.content);
  if (!contentValidation.valid) {
    errors.push(contentValidation.error);
  }

  const categoryValidation = validateCategory(paste.category);
  if (!categoryValidation.valid) {
    errors.push(categoryValidation.error);
  }

  const tagsValidation = validateTags(paste.tags || []);
  if (!tagsValidation.valid) {
    errors.push(tagsValidation.error);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
