// utils/ownership.js
function isOwner(resourceUser, currentUserId) {
  // Ensure both values are present and valid types
  if (
    !resourceUser ||
    !currentUserId ||
    (typeof resourceUser !== 'string' &&
      typeof resourceUser !== 'object') ||
    (typeof currentUserId !== 'string' &&
      typeof currentUserId !== 'object')
  ) {
    return false;
  }

  // If resourceUser is a Mongoose ObjectId or populated document
  if (typeof resourceUser.equals === 'function') {
    return resourceUser.equals(currentUserId);
  }

  // Fallback string comparison
  return resourceUser.toString() === currentUserId.toString();
}

module.exports = isOwner;