# frozen_string_literal: true

Rails.logger.info '🎙️ Seeding media files (real MP3s)...'

# Fetch users
servo = User.find_by!(name: 'Tom Servo')
crow = User.find_by!(name: 'Crow T. Robot')
gypsy = User.find_by!(name: 'Gypsy')

# Fetch riffs
riffs = Riff.limit(5)

# Define media files
media_files = [
  {
    user: servo,
    file_type: 'audio',
    bucket: 'public-domain',
    object_path: 'Sci-Fi_Robot_Sound.mp3',
    public_url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/SoundBiblecom/SoundBiblecom/Sci-Fi_Robot_Sound.mp3',
    duration_seconds: 4.2
  },
  {
    user: crow,
    file_type: 'audio',
    bucket: 'public-domain',
    object_path: 'Small_Crowd_Laughter.mp3',
    public_url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/SoundBiblecom/SoundBiblecom/Small_Crowd_Laughter.mp3',
    duration_seconds: 5.8
  },
  {
    user: gypsy,
    file_type: 'audio',
    bucket: 'public-domain',
    object_path: 'Sad_Trombone.mp3',
    public_url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/SoundBiblecom/SoundBiblecom/Sad_Trombone.mp3',
    duration_seconds: 3.1
  },
  {
    user: crow,
    file_type: 'audio',
    bucket: 'public-domain',
    object_path: 'Fast_Whoosh.mp3',
    public_url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/SoundBiblecom/SoundBiblecom/Fast_Whoosh.mp3',
    duration_seconds: 2.5
  },
  {
    user: servo,
    file_type: 'audio',
    bucket: 'public-domain',
    object_path: 'Evil_Laugh.mp3',
    public_url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/SoundBiblecom/SoundBiblecom/Evil_Laugh.mp3',
    duration_seconds: 3.8
  }
]

media_files.each_with_index do |mf_data, index|
  media_file = MediaFile.create!(
    user_id: mf_data[:user].id,
    file_type: mf_data[:file_type],
    provider: 'url',
    bucket: mf_data[:bucket],
    object_path: mf_data[:object_path],
    public_url: mf_data[:public_url],
    duration_seconds: mf_data[:duration_seconds]
  )

  # Link media file to a riff version
  riff = riffs[index]
  if riff&.latest_revision_id
    riff_version = RiffVersion.find_by(id: riff.latest_revision_id)
    riff_version&.update!(media_file_id: media_file.id)
  end
end

Rails.logger.info '✅ Real MP3 media files seeded and linked to riff versions.'
