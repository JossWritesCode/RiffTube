# db/seeds/riffs.rb

puts "🎤 Seeding riffs and riff versions..."

# Grab users
servo = User.find_by(name: "Tom Servo")
crow = User.find_by(name: "Crow T. Robot")
joel = User.find_by(name: "Joel Robinson")
mike = User.find_by(name: "Mike Nelson")
gypsy = User.find_by(name: "Gypsy")
cambot = User.find_by(name: "Cambot")
frank = User.find_by(name: "TV's Frank")

# Grab projects
manos = Project.find_by(title: "Manos: The Hands of Fate")
santa = Project.find_by(title: "Santa Claus Conquers the Martians")
zombies = Project.find_by(title: "The Incredibly Strange Creatures Who Stopped Living and Became Mixed-Up Zombies")
time_chasers = Project.find_by(title: "Time Chasers")
final_sacrifice = Project.find_by(title: "The Final Sacrifice")

# Define riffs
riffs_data = [
  {
    project: manos,
    creator: servo,
    start_time: 45.0,
    end_time: 50.0,
    text: "Torgo walks like every floor is made of hot coals."
  },
  {
    project: manos,
    creator: crow,
    start_time: 90.0,
    end_time: 95.0,
    text: "He's got the knees of a praying mantis!"
  },
  {
    project: manos,
    creator: mike,
    start_time: 120.0,
    end_time: 125.0,
    text: "Every frame of this movie smells faintly of mildew."
  },
  {
    project: santa,
    creator: gypsy,
    start_time: 30.0,
    end_time: 35.0,
    text: "Santa's workshop looks suspiciously like a Kmart clearance aisle."
  },
  {
    project: santa,
    creator: joel,
    start_time: 60.0,
    end_time: 65.0,
    text: "Martian fashion: When your mom knits your armor."
  },
  {
    project: zombies,
    creator: cambot,
    start_time: 15.0,
    end_time: 20.0,
    text: "Ah yes, the time-honored zombie dance-off."
  },
  {
    project: zombies,
    creator: crow,
    start_time: 75.0,
    end_time: 80.0,
    text: "Thrill! As our hero loses a fistfight with his own shirt!"
  },
  {
    project: time_chasers,
    creator: mike,
    start_time: 100.0,
    end_time: 105.0,
    text: "I'm just a simple Vermont time traveler... with a mullet."
  },
  {
    project: final_sacrifice,
    creator: frank,
    start_time: 10.0,
    end_time: 15.0,
    text: "Meanwhile, somewhere deep in the Canadian woods... confusion reigns."
  },
  {
    project: final_sacrifice,
    creator: servo,
    start_time: 70.0,
    end_time: 75.0,
    text: "Somewhere, a director is watching this and quietly weeping."
  }
]

riffs_data.each do |riff_info|
  riff = Riff.create!(
    created_by: riff_info[:creator].id,
    title: "Riff by #{riff_info[:creator].name}",
    current_version: 1
  )

  riff_version = RiffVersion.create!(
    riff_id: riff.id,
    version_number: 1,
    text_content: riff_info[:text],
    changed_by: riff_info[:creator].id
  )

  riff.update!(latest_revision_id: riff_version.id)

  ProjectRiff.create!(
    project_id: riff_info[:project].id,
    riff_id: riff.id,
    start_time: riff_info[:start_time],
    end_time: riff_info[:end_time]
  )
end

puts "✅ Riffs and riff versions seeded."
