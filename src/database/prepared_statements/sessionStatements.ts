const SESSION_PREPARED_STATEMENTS = {
  createSession: {
    name: "insert_session",
    text: `
          INSERT INTO auth.sessions (user_id, session_token, ip, device_hash, attempts, expired_at)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id AS "userId";
        `,
  },

  getSession: {
    name: "get_session",
    text: `
      SELECT
        user_id AS "userId"
      FROM auth.sessions 
      WHERE session_token = $1
        AND revoked = FALSE
        AND expired_at > NOW() 
    `,
  },
};

export default SESSION_PREPARED_STATEMENTS