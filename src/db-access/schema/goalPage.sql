CREATE TABLE IF NOT EXISTS GoalPage (
  id TEXT PRIMARY KEY, 
  name TEXT NOT NULL, 
  deadline TEXT, 
  icon_url TEXT, 
  banner_url TEXT
);

CREATE TABLE IF NOT EXISTS UserGoal (
  user_id TEXT, 
  goal_id TEXT, 
  role TEXT, 
  UNIQUE (user_id, goal_id), 
  FOREIGN KEY (user_id) REFERENCES User (id)
    ON DELETE CASCADE, 
  FOREIGN KEY (goal_id) REFERENCES GoalPage (id)
    ON DELETE CASCADE
)