// utils/ownership.js
function isOwner(resourceUser, currentUserId) {
  if (!resourceUser || !currentUserId) return false;

  // Handle if resourceUser is populated object or ObjectId
  if (typeof resourceUser.equals === "function") {
    return resourceUser.equals(currentUserId);
  }

  // Fallback for string comparison
  return resourceUser?.toString() === currentUserId?.toString();
}

module.exports = { isOwner };
