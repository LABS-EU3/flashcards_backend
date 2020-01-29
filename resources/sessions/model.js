const db = require('../../data/dbConfig');

exports.createSession = sessionData => {
  return db('sessions')
    .insert(sessionData, 'id')
    .then(ids => {
      const [id] = ids;
      return this.findSessionById(id);
    });
};

exports.findSessionById = id => {
  return db('sessions as s')
    .leftJoin('sessions_tracker as st', 'st.session_id', 's.id')
    .select(
      's.id',
      's.deck_id',
      's.user_id',
      's.isCompleted',
      's.last_used',
      db.raw('array_to_json(ARRAY_AGG( DISTINCT st)) as reviewed_cards')
    )
    .groupBy('s.id', 's.deck_id', 's.user_id', 's.isCompleted', 's.last_used')
    .where({ 's.id': id })
    .first();
};

exports.deleteSession = id => {
  return db('sessions')
    .where({ id })
    .del();
};

exports.updateSession = (id, sessionData) => {
  const updateFields = Object.keys(sessionData);
  return db('sessions')
    .where({ id })
    .update(sessionData, updateFields);
};

exports.getAllSessionsByUser = userId => {
  return db('sessions as s')
    .leftJoin('sessions_tracker as st', 'st.session_id', 's.id')
    .select(
      's.id',
      's.deck_id',
      's.user_id',
      's.isCompleted',
      's.last_used',
      db.raw('array_to_json(ARRAY_AGG( DISTINCT st)) as reviewed_cards')
    )
    .groupBy('s.id', 's.deck_id', 's.user_id', 's.isCompleted', 's.last_used')
    .where({ 's.user_id': userId })
    .orderBy('s.last_used', 'asc')
    .limit(15);
};

exports.markCardReviewed = data => {
  return db('sessions_tracker')
    .insert(data, 'id')
    .then(ids => {
      const [id] = ids;
      return this.findReviewById(id);
    });
};

exports.findReviewById = id => {
  return db('sessions_tracker')
    .where({ id })
    .first();
};
