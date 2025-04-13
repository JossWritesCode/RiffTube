# db/seeds/projects.rb

puts "🎬 Seeding projects..."

projects = [
  {
    title: "Manos: The Hands of Fate",
    video_host: "youtube",
    video_id: "GnFTHbR1bko", 
    visibility: "public",
    owner: User.find_by(name: "Joel Robinson")
  },
  {
    title: "Santa Claus Conquers the Martians",
    video_host: "youtube",
    video_id: "J4j3pgVFSts", 
    visibility: "public",
    owner: User.find_by(name: "Mike Nelson")
  },
  {
    title: "The Incredibly Strange Creatures Who Stopped Living and Became Mixed-Up Zombies",
    video_host: "youtube",
    video_id: "5XzftGZBqk4", 
    visibility: "public",
    owner: User.find_by(name: "Crow T. Robot")
  },
  {
    title: "Time Chasers",
    video_host: "youtube",
    video_id: "O7U8T5Avrz8", 
    visibility: "public",
    owner: User.find_by(name: "Tom Servo")
  },
  {
    title: "The Final Sacrifice",
    video_host: "youtube",
    video_id: "X8JpWC12oxQ", 
    visibility: "public",
    owner: User.find_by(name: "Gypsy")
  }
]

projects.each do |proj_data|
  next unless proj_data[:owner].present? # skip if owner not found

  Project.find_or_create_by!(title: proj_data[:title]) do |project|
    project.video_host = proj_data[:video_host]
    project.video_id = proj_data[:video_id]
    project.visibility = proj_data[:visibility]
    project.owner_id = proj_data[:owner].id
  end
end

puts "✅ Projects seeded."
