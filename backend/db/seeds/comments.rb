# db/seeds/comments.rb

puts "💬 Seeding comments..."

# Fetch users
servo = User.find_by(name: "Tom Servo")
crow = User.find_by(name: "Crow T. Robot")
joel = User.find_by(name: "Joel Robinson")
mike = User.find_by(name: "Mike Nelson")
gypsy = User.find_by(name: "Gypsy")
frank = User.find_by(name: "TV's Frank")
brain_guy = User.find_by(name: "Observer (Brain Guy)")

# Fetch projects
manos = Project.find_by(title: "Manos: The Hands of Fate")
santa = Project.find_by(title: "Santa Claus Conquers the Martians")
zombies = Project.find_by(title: "The Incredibly Strange Creatures Who Stopped Living and Became Mixed-Up Zombies")
time_chasers = Project.find_by(title: "Time Chasers")
final_sacrifice = Project.find_by(title: "The Final Sacrifice")

# Fetch some riffs
random_riff = Riff.first
another_riff = Riff.second

# Project comments
Comment.create!(
  user: crow,
  commentable_type: "Project",
  commentable_id: manos.id,
  content: "I can't believe this movie wasn't lost in a basement fire somewhere."
)

Comment.create!(
  user: servo,
  commentable_type: "Project",
  commentable_id: santa.id,
  content: "Coming up next: Santa vs. the Martian Revenue Service!"
)

Comment.create!(
  user: frank,
  commentable_type: "Project",
  commentable_id: zombies.id,
  content: "And now, the thrilling sequel: 'The Incredibly Confused Zombies Who Just Wanted Coffee.'"
)

Comment.create!(
  user: gypsy,
  commentable_type: "Project",
  commentable_id: time_chasers.id,
  content: "Science fact: mullets improve time travel."
)

Comment.create!(
  user: mike,
  commentable_type: "Project",
  commentable_id: final_sacrifice.id,
  content: "This movie answers the age-old question: What if Canada had no budget?"
)

# Riff comments
Comment.create!(
  user: joel,
  commentable_type: "Riff",
  commentable_id: random_riff.id,
  content: "Classic Servo. Peak confusion energy."
)

Comment.create!(
  user: brain_guy,
  commentable_type: "Riff",
  commentable_id: another_riff.id,
  content: "I'm sensing this riff could use 30% more smugness."
)

puts "✅ Comments seeded."
