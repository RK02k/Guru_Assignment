function distributeUsers(users, astrologers) {
    const topAstrologers = astrologers.filter(a => a.isTopAstrologer);
    const regularAstrologers = astrologers.filter(a => !a.isTopAstrologer);
  
    const totalAstrologers = astrologers.length;
    let userIndex = 0;
  
    while (userIndex < users.length) {
      for (const astrologer of topAstrologers) {
        if (userIndex >= users.length) break;
        assignUserToAstrologer(users[userIndex], astrologer);
        userIndex++;
      }
  
      for (const astrologer of regularAstrologers) {
        if (userIndex >= users.length) break;
        assignUserToAstrologer(users[userIndex], astrologer);
        userIndex++;
      }
    }
  }
  
  function assignUserToAstrologer(user, astrologer) {
    astrologer.totalConnections++;
    console.log(`Assigned user ${user.name} to astrologer ${astrologer.name}`);
  }
  
  module.exports = distributeUsers;