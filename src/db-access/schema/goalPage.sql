CREATE TABLE IF NOT EXISTS GoalPage (
  id TEXT PRIMARY KEY, 
  user_id TEXT, 
  name TEXT NOT NULL, 
  deadline TEXT, 
  icon_url TEXT, 
  banner_url TEXT,
  FOREIGN KEY (user_id) REFERENCES User (id)
    ON DELETE CASCADE
);