Rails.logger.info '🎬 Seeding projects...'

joel  = User.find_by!(name: 'Joel Robinson')
mike  = User.find_by!(name: 'Mike Nelson')
crow  = User.find_by!(name: 'Crow T. Robot')
servo = User.find_by!(name: 'Tom Servo')
gypsy = User.find_by!(name: 'Gypsy')

projects = [
  {
    title: 'Manos: The Hands of Fate',
    video_host: 'youtube',
    video_id: 'GnFTHbR1bko',
    visibility: 'public',
    owner: joel
  },
  {
    title: 'Santa Claus Conquers the Martians',
    video_host: 'youtube',
    video_id: 'J4j3pgVFSts',
    visibility: 'public',
    owner: mike
  },
  {
    title: 'The Incredibly Strange Creatures Who Stopped Living and Became Mixed-Up Zombies',
    video_host: 'youtube',
    video_id: '5XzftGZBqk4',
    visibility: 'public',
    owner: crow
  },
  {
    title: 'Time Chasers',
    video_host: 'youtube',
    video_id: 'O7U8T5Avrz8',
    visibility: 'public',
    owner: servo
  },
  {
    title: 'The Final Sacrifice',
    video_host: 'youtube',
    video_id: 'X8JpWC12oxQ',
    visibility: 'public',
    owner: gypsy
  }
]

projects.each do |proj_data|
  Project.find_or_create_by!(
    title: proj_data[:title],
    owner: proj_data[:owner]
  ) do |project|
    project.video_host = proj_data[:video_host]
    project.video_id   = proj_data[:video_id]
    project.visibility = proj_data[:visibility]
  end
end

Rails.logger.info '✅ Projects seeded.'
