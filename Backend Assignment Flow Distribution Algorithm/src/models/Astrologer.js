class Astrologer {
    constructor(id, name, isTopAstrologer = false) {
      this.id = id;  // Unique identifier for the astrologer
      this.name = name;  // Name of the astrologer
      this.totalConnections = 0;  // Track number of user connections
      this.isTopAstrologer = isTopAstrologer;  // Boolean flag for top astrologer
    }
  }
  
  module.exports = Astrologer;