Rails.logger.info '🏷️ Linking projects with tags...'

# Fetch projects
manos = fetch_project!('Manos: The Hands of Fate')
santa = fetch_project!('Santa Claus Conquers the Martians')
zombies = fetch_project!('The Incredibly Strange Creatures Who Stopped Living and Became Mixed-Up Zombies')
time_chasers = fetch_project!('Time Chasers')
final_sacrifice = fetch_project!('The Final Sacrifice')

# Define project to tags mapping
project_tags = {
  manos => %w[badmovies horror cheese creatures],
  santa => %w[badmovies santa space cheese],
  zombies => %w[badmovies horror musicals mind-control],
  time_chasers => %w[sci-fi badmovies cold-war future-shock],
  final_sacrifice => %w[badmovies martial-arts monsters 1950s]
}

# Assign tags
project_tags.each do |project, tag_names|
  tag_names.each do |tag_name|
    tag = Tag.find_by(name: tag_name)
    if tag && project
      ProjectTag.find_or_create_by!(project_id: project.id, tag_id: tag.id)
    else
      Rails.logger.warn "⚠️ Warning: Missing tag or project for #{tag_name}."
    end
  end
end

Rails.logger.info '✅ Project tags linked.'
