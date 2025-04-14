
puts "🏷️ Linking projects with tags..."

# Fetch projects
manos = Project.find_by(title: "Manos: The Hands of Fate")
santa = Project.find_by(title: "Santa Claus Conquers the Martians")
zombies = Project.find_by(title: "The Incredibly Strange Creatures Who Stopped Living and Became Mixed-Up Zombies")
time_chasers = Project.find_by(title: "Time Chasers")
final_sacrifice = Project.find_by(title: "The Final Sacrifice")

# Define project to tags mapping
project_tags = {
  manos => ["badmovies", "horror", "cheese", "creatures"],
  santa => ["badmovies", "santa", "space", "cheese"],
  zombies => ["badmovies", "horror", "musicals", "mind-control"],
  time_chasers => ["sci-fi", "badmovies", "cold-war", "future-shock"],
  final_sacrifice => ["badmovies", "martial-arts", "monsters", "1950s"]
}

# Assign tags
project_tags.each do |project, tag_names|
  tag_names.each do |tag_name|
    tag = Tag.find_by(name: tag_name)
    if tag && project
      ProjectTag.find_or_create_by!(project_id: project.id, tag_id: tag.id)
    else
      puts "⚠️ Warning: Missing tag or project for #{tag_name}."
    end
  end
end

puts "✅ Project tags linked."
